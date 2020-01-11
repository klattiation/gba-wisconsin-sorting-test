import React, { FC } from "react"
import styles from "./stand.module.css"
import CriteriaList from "../criteria-list"
import { useDrag } from "react-dnd"
import { DragItem } from "../../constants/drag-items"
import { useSelector } from "react-redux"
import {
  getCriteriaOrder,
  getCurrentCard,
} from "../../state/game/game.selectors"

interface StandProps {}

const Stand: FC<StandProps> = () => {
  const order = useSelector(getCriteriaOrder)
  const card = useSelector(getCurrentCard)
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
        {card && (
          <img
            ref={dragRef}
            src={`/images/products/${card.image}`}
            alt="Product"
            style={{ opacity: isDragging ? 0 : 1 }}
          />
        )}
      </div>
      <div className={styles.description}>
        <h2>{"[Product name]"}</h2>
        {card && order && (
          <CriteriaList data={card} order={order} transparent />
        )}
      </div>
    </div>
  )
}

export default Stand
