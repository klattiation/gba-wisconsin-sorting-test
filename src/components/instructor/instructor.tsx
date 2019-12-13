import React, { FC } from "react"
import cn from "classnames"
import { ReactComponent as InstructorSVG } from "../../images/instructor.svg"
import styles from "./instructor.module.css"

interface InstructorProps {
  className?: string
}

const Instructor: FC<InstructorProps> = ({ className }) => (
  <div className={cn(styles.component, className)}>
    <InstructorSVG />
  </div>
)

export default Instructor
