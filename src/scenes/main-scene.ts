import Phaser, { Cameras, GameObjects, Scene, Tweens } from "phaser"
import {
  ATLAS,
  ASSET_PATH,
  GAME_WIDTH,
  GAME_HEIGHT,
  SCENE,
  EVENTS,
  GAME_CENTER,
  INITIAL_SCORE,
} from "../constants"
import Avatar from "../game-objects/avatars/avatar"
import Product from "../game-objects/product"
import { playCard } from "../state/game/game.actions"
import { AUDIENCE } from "../state/game/game.state"
import { Game } from ".."
import { AnyAction } from "redux"
import Stand from "../game-objects/stand"
import {
  getTrumpCriteria,
  getIsGameComplete,
  getScore,
  getGameResults,
} from "../state/game/game.selectors"
import CheerScore from "../game-objects/cheer-score"
import ErrorFlash from "../game-objects/error-flash"
import Instructor from "../game-objects/avatars/instructor"
import BushFront from "../game-objects/landscape/bush-front"
import BushBack from "../game-objects/landscape/bush-back"
import SkyscrapersBack from "../game-objects/landscape/skyscrapers-back"
import SkyscrapersFront from "../game-objects/landscape/skyscrapers-front"
import Sky from "../game-objects/landscape/sky"
import Floor from "../game-objects/landscape/floor"
import ConfettiController from "../controllers/confetti-ctrl"
import { GameEvent } from "../state/game-manager"
import { GlobalState } from "../state/create-store"
import Blackboard from "../game-objects/blackboard"
import { getGameManager } from "../utils"
import { saveResult } from "../services/api-srv"

export enum SectionName {
  INTRO = "intro",
  GAME = "game",
  RESULT = "result",
}

const SECTION_POSITIONS = {
  [SectionName.INTRO]: -GAME_WIDTH,
  [SectionName.GAME]: 0,
  [SectionName.RESULT]: GAME_WIDTH,
}

class MainScene extends Scene {
  private stand: Stand | undefined
  private flash: ErrorFlash | undefined
  private blackboard: Blackboard | undefined
  private camTween: Tweens.Tween | undefined
  private instructor: Instructor | undefined
  private confettiCtrl: ConfettiController | undefined
  private avatars: Avatar[] = []

  constructor() {
    super({ key: SCENE.MAIN })
  }

  preload() {
    this.loadAtlas(ATLAS.AVATARS)
    this.loadAtlas(ATLAS.LEVEL)
    this.loadAtlas(ATLAS.PRODUCTS)
    this.loadAtlas(ATLAS.UI)
    this.tweenCamera(SectionName.INTRO, 0, 0)
  }

  create() {
    this.add.existing(new Sky({ scene: this }))
    this.add.existing(new SkyscrapersBack({ scene: this, scrollFactor: 0.1 }))
    this.add.existing(new SkyscrapersFront({ scene: this, scrollFactor: 0.11 }))
    this.add.existing(new BushBack({ scene: this, scrollFactor: 0.7 }))
    this.add.existing(new BushFront({ scene: this, scrollFactor: 0.9 }))
    this.add.existing(new Floor({ scene: this }))

    this.instructor = new Instructor({
      scene: this,
      x: -GAME_WIDTH + 320,
      y: GAME_HEIGHT - 200,
    })
    this.instructor.showBubble(true, 300)
    this.instructor.on("done", () => {
      this.tweenCamera(SectionName.GAME, 1000, 0)
    })
    this.add.existing(this.instructor)

    this.avatars = AUDIENCE.map((data, idx) => {
      const avatar = new Avatar({
        scene: this,
        avatarId: `${idx}`.padStart(2, "0"),
        data,
        x: 120 + idx * 220,
        y: GAME_HEIGHT - 200,
      })
      avatar.setVisible(false)
      this.add.existing(avatar)
      return avatar
    })

    this.stand = new Stand({ scene: this, x: 1340, y: 670 })
    this.add.existing(this.stand)

    this.blackboard = new Blackboard({
      scene: this,
      x: GAME_WIDTH + GAME_CENTER.x,
      y: GAME_HEIGHT - 220,
    })
    this.add.existing(this.blackboard)

    this.flash = new ErrorFlash({ scene: this })
    this.add.existing(this.flash)

    this.confettiCtrl = new ConfettiController({ scene: this })

    this.input.on("dragenter", this.handleDragEnterAvatar)
    this.input.on("dragleave", this.handeDragLeaveAvatar)
    this.input.on("dragend", this.handeDragEnd)
    this.input.on("drop", this.handleDropOnAvatar)

    this.on(EVENTS.EXPLAIN_AUDIENCE, this.handleExplainAudience)
    this.on(EVENTS.EXPLAIN_CATEGORIES, this.handleExplainCategories)
    this.on(EVENTS.EXPLAIN_PRODUCT, this.handleExplainProduct)
    this.on(EVENTS.START_GAME, this.handleStartGame)

    getGameManager(this).on(GameEvent.STORE_UPDATE, this.handleStoreUpdate)
  }

  private tweenCamera(section: SectionName, duration = 1000, delay = 500) {
    this.stopCamera()
    return new Promise(resolve => {
      this.camTween = this.tweens.add({
        targets: this.cameras.main,
        props: {
          scrollX: {
            value: SECTION_POSITIONS[section],
            duration,
            ease: "Cubic.easeOut",
          },
        },
        delay,
        onComplete: () => {
          this.events.emit(EVENTS.SHOW_SECTION, section)
          resolve()
        },
      })
    })
  }

  private on(eventName: string, fn: Function, ctx?: any) {
    this.scene.get(SCENE.MAIN).events.on(eventName, fn, ctx)
    this.scene.get(SCENE.HUD).events.on(eventName, fn, ctx)
  }

  private stopCamera() {
    if (this.camTween && this.camTween.isPlaying) {
      this.camTween.stop()
    }
  }

  private handleDragEnterAvatar = (
    pointer: any,
    product: any,
    dropZone: GameObjects.Zone
  ) => {
    const avatar: Avatar = dropZone.parentContainer as Avatar
    avatar.animateDragOver()
  }

  private handeDragLeaveAvatar = (
    pointer: any,
    product: any,
    dropZone: GameObjects.Zone
  ) => {
    const avatar: Avatar = dropZone.parentContainer as Avatar
    avatar.animateDragOut()
  }

  private handeDragEnd = (
    pointer: any,
    product: Product,
    droppedOnAvatar: boolean
  ) => {
    this.stand?.resetProductPosition()
  }

  private handleDropOnAvatar = (
    pointer: Phaser.Input.Pointer,
    product: Product,
    dropZone: GameObjects.Zone
  ) => {
    const avatar = dropZone.parentContainer as Avatar
    const avatarData = avatar.data.getAll() as any
    const trump = getTrumpCriteria(getGameManager(this).state)
    const isCorrect = avatarData[trump].id === product.cardData[trump].id
    const score = isCorrect ? 500 : -500 // TODO: bad -> should use score value from store instead

    const { upX, upY } = pointer
    this.playCheerScore(score, upX, upY)

    avatar.animateDragOut()

    if (isCorrect) {
      this.playConfetti(upX, upY)
    } else if (this.flash) {
      this.flash.animate()
    }

    this.dispatch(playCard(avatarData, product.cardData, trump))
  }

  private handleExplainAudience = () => {
    this.avatars.forEach((avatar, idx) => {
      const delay = idx * 32
      avatar.show(delay)
    })
  }

  private handleExplainCategories = () => {
    this.avatars.forEach((avatar, idx) => {
      const delay = idx * 100
      avatar.showTooltip(delay)
    })
  }

  private handleExplainProduct = () => {
    this.stand?.showProduct()
  }

  private handleStartGame = () => {
    this.stand?.activateDnd()
  }

  private handleStoreUpdate = async (state: GlobalState) => {
    const isGameOver = getIsGameComplete(state)
    if (isGameOver) {
      this.instructor?.setX(GAME_WIDTH + 350)
      this.instructor?.gotoPointingPose()

      const result = getGameResults(state)
      await saveResult(result)

      await this.tweenCamera(SectionName.RESULT)

      const gm = getGameManager(this)
      const resultScore = getScore(gm.state)
      await this.blackboard?.setBudget(resultScore)

      const diffScore = resultScore - INITIAL_SCORE
      await this.blackboard?.setProfit(diffScore)
    }
  }

  private playConfetti(x: number, y: number) {
    this.confettiCtrl?.explode(30, x, y)
  }

  private playCheerScore(score: number, x: number, y: number) {
    const gameObject = new CheerScore({ scene: this, score, x, y })
    this.add.existing(gameObject)
  }

  private loadAtlas = (atlas: ATLAS) => {
    this.load.multiatlas(atlas, `${ASSET_PATH}/${atlas}.json`, ASSET_PATH)
  }

  private dispatch(action: AnyAction) {
    getGameManager(this).dispatch(action)
  }
}

export default MainScene
