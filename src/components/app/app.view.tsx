import React, { FC } from "react"
import logo from "../../images/logo.svg"
import styles from "./app.module.css"

const App: FC = () => (
  <div className={styles.component}>
    <header className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <p>
        Edit <code>your mom</code> and save to reload.
      </p>
      <a
        className={styles.appLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
)

export default App
