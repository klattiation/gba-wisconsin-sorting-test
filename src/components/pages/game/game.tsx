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

const Game: FC<RouteComponentProps> = () => {
  const audience = useAudience()
  const isGameComplete = useSelector(getIsGameComplete)
  const gameResult = useSelector(getGameResults)

  useEffect(() => {
    if (isGameComplete) {
      console.log("result", gameResult)
      const t = setTimeout(() => navigate(Route.Result), 500)
      return () => clearTimeout(t)
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
