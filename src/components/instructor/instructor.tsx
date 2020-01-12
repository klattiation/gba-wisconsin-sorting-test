import React, { FC, useState } from "react"
import cn from "classnames"
import styles from "./instructor.module.css"
import Speechbubble from "../speechbubble"
import Link, { LinkAppearance } from "../buttons/link"
import Button from "../buttons/button"

export enum InstructorPose {
  Standard,
  Pointing,
}

export enum DialogActionName {
  NAVIGATE = "navigate",
  NEXT = "next",
}

export interface Dialog {
  action: {
    name: DialogActionName
    data?: any
  }
  paragraphs: string[]
}

interface InstructorProps {
  className?: string
  pose?: InstructorPose
  dialogs?: Dialog[]
}

const Instructor: FC<InstructorProps> = ({
  className,
  pose = InstructorPose.Standard,
  dialogs = [],
}) => {
  const [dialogIdx, setDialogIdx] = useState(0)
  const dialog = dialogs[dialogIdx]

  const takeNextDialog = () => setDialogIdx(idx => idx + 1)

  return (
    <div className={cn(styles.component, className)}>
      {pose === InstructorPose.Standard && (
        <img src="/images/avatars/instructor-pose_00.svg" alt="Instructor" />
      )}
      {pose === InstructorPose.Pointing && (
        <img src="/images/avatars/instructor-pose_00.svg" alt="Instructor" />
      )}
      {dialog && (
        <Speechbubble className={styles.speechbubble}>
          {dialog.paragraphs.map(text => (
            <p key={text}>{text}</p>
          ))}
          {dialog.action.name === DialogActionName.NEXT && (
            <Button onClick={() => takeNextDialog()}>{"Weiter"}</Button>
          )}
          {dialog.action.name === DialogActionName.NAVIGATE && (
            <Link
              to={dialog.action.data}
              appearance={LinkAppearance.ButtonPrimary}
            >
              {"Los geht's!"}
            </Link>
          )}
        </Speechbubble>
      )}
    </div>
  )
}

export default Instructor
