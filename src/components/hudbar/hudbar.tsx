import React, { FC } from "react"
import cn from "classnames"
import styles from "./hudbar.module.css"

interface HudbarProps {
  className?: string
}

const Hudbar: FC<HudbarProps> = ({ children, className }) => (
  <div className={cn(styles.component, className)}>{children}</div>
)

export default Hudbar
