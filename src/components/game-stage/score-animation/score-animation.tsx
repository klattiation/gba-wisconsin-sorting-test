import React, { FC, useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group"
import styles from "./score-animation.module.css"
import { useSelector } from "react-redux"
import { getCardIndex, getRoundScore } from "../../../state/game/game.selectors"

interface ScoreAnimationProps {}

const ScoreAnimation: FC<ScoreAnimationProps> = () => {
  const [visible, setVisible] = useState(false)
  const round = useSelector(getCardIndex)
  const roundScore = useSelector(getRoundScore)

  const handleEntered = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (round > 0) {
      setVisible(true)
    }
  }, [round])

  const isPositive = roundScore && roundScore > 0
  const sign = isPositive ? "+" : ""

  return (
    <div className={styles.component}>
      {roundScore && (
        <CSSTransition
          in={visible}
          timeout={500}
          onEntered={handleEntered}
          classNames={styles}
        >
          <div
            className={isPositive ? styles.positive : styles.negative}
          >{`${sign}${roundScore}`}</div>
        </CSSTransition>
      )}
    </div>
  )
}

export default ScoreAnimation
