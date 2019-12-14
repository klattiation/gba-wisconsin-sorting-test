import React, { FC } from "react"
import { DndProvider } from "react-dnd"
import Html5Backend from "react-dnd-html5-backend"
import { RouteComponentProps } from "@reach/router"
import Hudbar from "../../hudbar"
import styles from "./game.module.css"
import GameStage from "../../game-stage"
import Card from "../../card"
import { ResolvedCard } from "../../../state/game/game.props"
import { useSelector } from "react-redux"
import { getCurrentCard } from "../../../state/game/game.selectors"

const Game: FC<RouteComponentProps> = () => {
  const card = useSelector(getCurrentCard)
  return (
    <DndProvider backend={Html5Backend}>
      <div className={styles.component}>
        <GameStage className={styles.stage}>Stage</GameStage>
        <Hudbar className={styles.hudbar}>
          {card && <Card className={styles.card} data={card as ResolvedCard} />}
        </Hudbar>
      </div>
    </DndProvider>
  )
}

export default Game
