import React, { FC, SVGProps } from "react"
import { CriteriaName } from "../../../state/game/game.props"
import { ReactComponent as IconCategory } from "../../../images/icon-category.svg"
import { ReactComponent as IconChannel } from "../../../images/icon-channel.svg"
import { ReactComponent as IconDesign } from "../../../images/icon-design.svg"
import { ReactComponent as IconPrice } from "../../../images/icon-price.svg"
import { ReactComponent as IconValue } from "../../../images/icon-value.svg"
import styles from "./criteria.module.css"

const icons: Record<CriteriaName, FC<SVGProps<SVGSVGElement>>> = {
  [CriteriaName.Category]: IconCategory,
  [CriteriaName.Channel]: IconChannel,
  [CriteriaName.Design]: IconDesign,
  [CriteriaName.Price]: IconPrice,
  [CriteriaName.Value]: IconValue,
}

interface CriteriaIconProps {
  criteria: CriteriaName
}

const CriteriaIcon: FC<CriteriaIconProps> = ({ criteria }) => {
  const Icon = icons[criteria]
  return <Icon className={styles.component} />
}

export default CriteriaIcon
