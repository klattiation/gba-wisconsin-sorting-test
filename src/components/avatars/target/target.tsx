import React, { FC } from "react"
import styles from "./target.module.css"

interface TargetAvatarProps {
  imageUrl: string
}

const TargetAvatar: FC<TargetAvatarProps> = ({ imageUrl }) => (
  <div className={styles.component}>
    <img src={imageUrl} />
  </div>
)

export default TargetAvatar
