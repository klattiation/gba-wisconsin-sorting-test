import React, { FC } from "react"
import { ResolvedCard, CriteriaName } from "../../state/game/game.props"
import styles from "./stand.module.css"
import CriteriaList from "../criteria-list"
import { useDrag } from "react-dnd"
import { DragItem } from "../../constants/drag-items"

interface StandProps {
  card: ResolvedCard
  order: CriteriaName[]
}

const Stand: FC<StandProps> = ({ card, order }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: DragItem.Card,
      data: card,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <div className={styles.component}>
      <div className={styles.roof}>
        <img src="/images/stand-roof.svg" alt="roof" />
      </div>
      <div className={styles.product}>
        <img
          ref={dragRef}
          src={`/images/products/${card.image}`}
          alt="Product"
          style={{ opacity: isDragging ? 0 : 1 }}
        />
      </div>
      <div className={styles.description}>
        <h2>{"[Product name]"}</h2>
        <CriteriaList data={card} order={order} transparent />
      </div>
    </div>
  )
}

export default Stand
