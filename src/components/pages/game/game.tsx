import React, { FC } from "react"
import { DndProvider } from "react-dnd"
import Html5Backend from "react-dnd-html5-backend"
import { RouteComponentProps } from "@reach/router"
import Hudbar from "../../hudbar"
import styles from "./game.module.css"
import GameStage from "../../game-stage"

const Game: FC<RouteComponentProps> = () => (
  <DndProvider backend={Html5Backend}>
    <div className={styles.component}>
      <GameStage className={styles.stage}>Stage</GameStage>
      <Hudbar className={styles.hudbar} />
    </div>
  </DndProvider>
)

export default Game
