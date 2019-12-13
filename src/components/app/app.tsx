import React, { FC } from "react"
import { Router } from "@reach/router"
import styles from "./app.module.css"
import Intro from "../pages/intro"
import { Route } from "../../constants/routes"
import Game from "../pages/game"
import Result from "../pages/result"

const App: FC = () => (
  <div className={styles.component}>
    <Router>
      <Intro path={Route.Intro} />
      <Game path={Route.Game} />
      <Result path={Route.Result} />
    </Router>
  </div>
)

export default App
