import React, { FC, useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group"
import cn from "classnames"
import styles from "./score-animation.module.css"
import { useSelector } from "react-redux"
import { getRoundScore } from "../../../state/game/game.selectors"

interface ScoreAnimationProps {
  round: number
}

const ScoreAnimation: FC<ScoreAnimationProps> = ({ round }) => {
  const [visible, setVisible] = useState(false)
  // const round = useSelector(getCardIndex)
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
  const value = roundScore ? `${sign}${roundScore}` : ""

  return (
    <div className={styles.component}>
      <CSSTransition
        in={visible}
        timeout={500}
        onEntered={handleEntered}
        classNames={styles}
      >
        <div
          className={cn(
            styles.inner,
            isPositive ? styles.positive : styles.negative
          )}
        >
          {value}
        </div>
      </CSSTransition>
    </div>
  )
}

export default ScoreAnimation
