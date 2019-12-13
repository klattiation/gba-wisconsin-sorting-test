import React, { FC, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import Hudbar from "../../hudbar"
import styles from "./game.module.css"
import GameStage from "../../game-stage"
import Card from "../../card"
import { CARDS } from "../../../state/game/game.state"
import { ResolvedCard } from "../../../state/game/game.props"

const Game: FC<RouteComponentProps> = () => {
  const [index] = useState(0)
  const card = CARDS.get(index)
  return (
    <div className={styles.component}>
      <GameStage className={styles.stage}>Stage</GameStage>
      <Hudbar className={styles.hudbar}>
        {card && <Card className={styles.card} data={card as ResolvedCard} />}
      </Hudbar>
    </div>
  )
}

export default Game
