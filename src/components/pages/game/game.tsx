import React, { FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import Hudbar from "../../hudbar"
import styles from "./game.module.css"
import GameStage from "../../game-stage"
import Card from "../../card"
import { CARDS } from "../../../state/game/game.state"

const Game: FC<RouteComponentProps> = () => {
  const [index, setIndex] = useState(0)
  const card = CARDS.get(index)
  return (
    <div className={styles.component}>
      <GameStage className={styles.stage}>Stage</GameStage>
      <Hudbar className={styles.hudbar}>
        {card ? (
          <Card className={styles.card} data={card} />
        ) : (
          "Es ist keine Karte mehr übrig."
        )}
      </Hudbar>
    </div>
  )
}

export default Game
