import React, { FC } from "react"
import styles from "./target.module.css"
import CriteriaList from "../../criteria-list"
import {
  ResolvedCriteriaAssignment,
  CardDragItem,
} from "../../../state/game/game.props"
import { useDrop } from "react-dnd"
import { DragItem } from "../../../constants/drag-items"
import { useDispatch, useSelector } from "react-redux"
import { playCard } from "../../../state/game/game.actions"
import { getTrumpCriteria } from "../../../state/game/game.selectors"
import { DEFAULT_CRITERIA_ORDER } from "../../../state/game/game.state"

interface TargetAvatarProps {
  idx: number
  data: ResolvedCriteriaAssignment
  imageUrl: string
}

const TargetAvatar: FC<TargetAvatarProps> = ({ idx, data, imageUrl }) => {
  const dispatch = useDispatch()
  const criteria = useSelector(getTrumpCriteria)
  const [{ isOver }, ref] = useDrop({
    accept: DragItem.Card,
    drop: (card: CardDragItem) => {
      dispatch(playCard(data, card.data, criteria))
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
    }),
  })

  return (
    <div ref={ref} className={styles.component}>
      <CriteriaList
        data={data}
        filled={isOver}
        order={DEFAULT_CRITERIA_ORDER}
      />
      <img src={imageUrl} alt={"Hier steht ein Avatar"} />
    </div>
  )
}

export default TargetAvatar
