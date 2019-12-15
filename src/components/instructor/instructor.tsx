import React, { FC } from "react"
import cn from "classnames"
import { ReactComponent as InstructorSVG } from "../../images/instructor.svg"
import { ReactComponent as InstructorPointingSVG } from "../../images/instructor-pointing.svg"
import styles from "./instructor.module.css"

export enum InstructorPose {
  Standard,
  Pointing,
}

interface InstructorProps {
  className?: string
  pose?: InstructorPose
}

const Instructor: FC<InstructorProps> = ({
  className,
  pose = InstructorPose.Standard,
}) => (
  <div className={cn(styles.component, className)}>
    {pose === InstructorPose.Standard && <InstructorSVG />}
    {pose === InstructorPose.Pointing && <InstructorPointingSVG />}
  </div>
)

export default Instructor
