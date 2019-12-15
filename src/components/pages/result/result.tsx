import React, { FC } from "react"
import Layout from "../../layout"
import { RouteComponentProps } from "@reach/router"
import Blackboard from "../../blackboard"
import styles from "./result.module.css"
import Instructor from "../../instructor"
import { InstructorPose } from "../../instructor/instructor"
import Link, { LinkAppearance } from "../../buttons/link"
import { Route } from "../../../constants/routes"
import { useDispatch } from "react-redux"
import { reset } from "../../../state/game/game.actions"

const Result: FC<RouteComponentProps> = () => {
  const dispatch = useDispatch()
  return (
    <Layout>
      <div className={styles.component}>
        <div className={styles.instructor}>
          <Instructor pose={InstructorPose.Pointing} />
        </div>
        <div className={styles.blackboard}>
          <Blackboard isBig />
          <Link
            to={Route.Game}
            appearance={LinkAppearance.ButtonPrimary}
            onClick={() => dispatch(reset())}
          >
            {"Nochmal"}
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Result
