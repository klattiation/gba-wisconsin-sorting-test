import React, { FC } from "react"
import { useDrag } from "react-dnd"
import cn from "classnames"
import styles from "./card.module.css"
import { ResolvedCard } from "../../state/game/game.props"
import CriteriaList from "../criteria-list"
import { DragItem } from "../../constants/drag-items"

interface CardProps {
  className?: string
  data: ResolvedCard
}

const Card: FC<CardProps> = ({ data, className }) => {
  const [{ isDragging }, ref] = useDrag({
    item: {
      type: DragItem.Card,
      data,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <div
      className={cn(styles.component, isDragging && styles.dragging, className)}
      ref={ref}
    >
      <div className={styles.image}>{data.image}</div>
      <CriteriaList data={data} filled noTopRadius />
    </div>
  )
}

export default Card
