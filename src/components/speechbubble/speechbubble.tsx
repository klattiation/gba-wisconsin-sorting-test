import React, { FC } from "react"
import cn from "classnames"
import styles from "./speechbubble.module.css"

interface SpeechbubbleProps {
  className?: string
}

const Speechbubble: FC<SpeechbubbleProps> = ({ children, className }) => (
  <div className={cn(styles.component, className)}>{children}</div>
)

export default Speechbubble
