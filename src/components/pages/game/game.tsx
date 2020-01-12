import React, { FC, useEffect } from "react"
import { DndProvider } from "react-dnd"
import Html5Backend from "react-dnd-html5-backend"
import { RouteComponentProps, navigate } from "@reach/router"
import Hudbar from "../../hudbar"
import styles from "./game.module.css"
import GameStage from "../../game-stage"
import { useSelector } from "react-redux"
import {
  getIsGameComplete,
  getGameResults,
} from "../../../state/game/game.selectors"
import { Route } from "../../../constants/routes"
import { AUDIENCE } from "../../../state/game/game.state"
import { saveResult } from "../../../services/api"

const Game: FC<RouteComponentProps> = () => {
  const audience = useAudience()
  const isGameComplete = useSelector(getIsGameComplete)
  const gameResult = useSelector(getGameResults)

  useEffect(() => {
    const save = async () => {
      const success = await saveResult(gameResult)
      if (success) {
        navigate(Route.Result)
      } else {
        // TODO: show error page or message
      }
    }

    if (isGameComplete) {
      save()
    }
  }, [gameResult, isGameComplete])

  return (
    <DndProvider backend={Html5Backend}>
      <div className={styles.component}>
        <GameStage className={styles.stage} audience={audience} withStand />
        <Hudbar className={styles.hudbar} />
      </div>
    </DndProvider>
  )
}

const useAudience = () => AUDIENCE

export default Game
