import React, { FC } from "react"
import { useDrag } from "react-dnd"
import cn from "classnames"
import styles from "./card.module.css"
import { ResolvedCard } from "../../state/game/game.props"
import CriteriaList from "../criteria-list"
import { DragItem } from "../../constants/drag-items"
import { getCriteriaOrder } from "../../state/game/game.selectors"
import { useSelector } from "react-redux"

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
  const order = useSelector(getCriteriaOrder)

  return (
    <div
      className={cn(styles.component, isDragging && styles.dragging, className)}
      ref={ref}
    >
      <div className={styles.image}>
        <img src={imgUrl(data.image)} alt="Produkt" />
      </div>
      {data && order && (
        <CriteriaList data={data} order={order} filled noTopRadius />
      )}
    </div>
  )
}

const imgUrl = (filename: string) => `/images/products/${filename}`

export default Card
