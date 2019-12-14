import React, { FC } from "react"
import { Provider } from "react-redux"
import { Router } from "@reach/router"
import styles from "./app.module.css"
import Intro from "../pages/intro"
import { Route } from "../../constants/routes"
import Game from "../pages/game"
import Result from "../pages/result"
import createStore from "../../state/createStore"

const store = createStore()

const App: FC = () => (
  <Provider store={store}>
    <div className={styles.component}>
      <Router>
        <Intro path={Route.Intro} />
        <Game path={Route.Game} />
        <Result path={Route.Result} />
      </Router>
    </div>
  </Provider>
)

export default App
