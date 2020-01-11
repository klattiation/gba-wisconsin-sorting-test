import React, { FC, useState } from "react"
import { useDrop } from "react-dnd"
import noop from "lodash/noop"
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
  const [{ isOver }, ref] = useDrop({
    accept: DragItem.Card,
    drop: (card: CardDragItem) => {
      dispatch(playCard(data, card.data, criteria))
      const isCorrect = card.data[criteria].id === data[criteria].id
      isCorrect ? onCorrectDrop() : onWrongDrop()
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
    }),
  })

  return (
    <div
      ref={ref}
      className={styles.component}
      style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CriteriaList
        data={data}
        hidden={!isOver && !isHovering}
        order={DEFAULT_CRITERIA_ORDER}
        withTransition
        className={styles.list}
      />
      <img
        src={isOver ? imageUrlActive : imageUrl}
        alt={"Hier steht ein Avatar"}
        className={styles.avatar}
      />
    </div>
  )
}

export default TargetAvatar
