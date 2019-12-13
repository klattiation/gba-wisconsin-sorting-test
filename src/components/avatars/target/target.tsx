import React, { FC } from "react"
import styles from "./target.module.css"
import CriteriaList from "../../criteria-list"
import { ResolvedCriteriaAssignment } from "../../../state/game/game.props"

interface TargetAvatarProps {
  data: ResolvedCriteriaAssignment
  imageUrl: string
}

const TargetAvatar: FC<TargetAvatarProps> = ({ data, imageUrl }) => (
  <div className={styles.component}>
    <CriteriaList data={data} />
    <img src={imageUrl} alt={"Hier steht ein Avatar"} />
  </div>
)

export default TargetAvatar
