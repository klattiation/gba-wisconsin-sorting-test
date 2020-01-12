import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import styles from "./result.module.css"
import Instructor from "../../instructor"
import { InstructorPose } from "../../instructor/instructor"
import GameStage from "../../game-stage"

const Result: FC<RouteComponentProps> = () => (
  <div className={styles.component}>
    <GameStage
      className={styles.stage}
      renderInstructor={() => (
        <Instructor
          className={styles.instructor}
          pose={InstructorPose.Pointing}
        />
      )}
      withBlackboard
    />
  </div>
)

export default Result
