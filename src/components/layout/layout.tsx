import React, { FC } from "react"
import styles from "./layout.module.css"

const Layout: FC = ({ children }) => (
  <main className={styles.main}>{children}</main>
)

export default Layout
