import React, { FC, useEffect } from "react"
import { DndProvider } from "react-dnd"
import Html5Backend from "react-dnd-html5-backend"
import { RouteComponentProps, navigate } from "@reach/router"
import Hudbar from "../../hudbar"
import styles from "./game.module.css"
import GameStage from "../../game-stage"
import { useSelector } from "react-redux"
import { getIsGameComplete } from "../../../state/game/game.selectors"
import { Route } from "../../../constants/routes"

const Game: FC<RouteComponentProps> = () => {
  const isGameComplete = useSelector(getIsGameComplete)
  useEffect(() => {
    console.log("complete", isGameComplete)
    if (isGameComplete) {
      const t = setTimeout(() => navigate(Route.Result), 500)
      return () => clearTimeout(t)
    }
  }, [isGameComplete])
  return (
    <DndProvider backend={Html5Backend}>
      <div className={styles.component}>
        <GameStage className={styles.stage}>Stage</GameStage>
        <Hudbar className={styles.hudbar} />
      </div>
    </DndProvider>
  )
}

export default Game
