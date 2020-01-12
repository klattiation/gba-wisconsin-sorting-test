import React, { FC, useState } from "react"
import { useDrop } from "react-dnd"
import noop from "lodash/noop"
import cn from "classnames"
import styles from "./target.module.css"
import CriteriaList from "../../criteria-list"
import {
  ResolvedCriteriaAssignment,
  CardDragItem,
} from "../../../state/game/game.props"
import { DragItem } from "../../../constants/drag-items"
import { useDispatch, useSelector } from "react-redux"
import { playCard } from "../../../state/game/game.actions"
import { getTrumpCriteria } from "../../../state/game/game.selectors"
import { DEFAULT_CRITERIA_ORDER } from "../../../state/game/game.state"
import ScoreAnimation from "../../game-stage/score-animation"

interface TargetAvatarProps {
  data: ResolvedCriteriaAssignment
  imageUrl: string
  imageUrlActive: string
  onCorrectDrop?: () => void
  onWrongDrop?: () => void
  style?: any
}

const TargetAvatar: FC<TargetAvatarProps> = ({
  data,
  imageUrl,
  imageUrlActive,
  onCorrectDrop = noop,
  onWrongDrop = noop,
  style,
}) => {
  const dispatch = useDispatch()
  const criteria = useSelector(getTrumpCriteria)
  const [isHovering, setIsHovering] = useState(false)
  const [dropCount, setDropCount] = useState(0)
  const [{ isOver }, ref] = useDrop({
    accept: DragItem.Card,
    drop: (card: CardDragItem) => {
      dispatch(playCard(data, card.data, criteria))
      const isCorrect = card.data[criteria].id === data[criteria].id
      isCorrect ? onCorrectDrop() : onWrongDrop()
      setDropCount(count => count + 1)
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
    }),
  })

  const isTooltipHidden = !isOver && !isHovering

  return (
    <div
      ref={ref}
      className={styles.component}
      style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={cn(styles.tooltip, isTooltipHidden && styles.tooltipHidden)}
      >
        <CriteriaList
          data={data}
          order={DEFAULT_CRITERIA_ORDER}
          withTransition
          className={styles.list}
        />
      </div>
      <img
        src={isOver ? imageUrlActive : imageUrl}
        alt={"Hier steht ein Avatar"}
        className={styles.avatar}
      />
      <ScoreAnimation round={dropCount} />
    </div>
  )
}

export default TargetAvatar
