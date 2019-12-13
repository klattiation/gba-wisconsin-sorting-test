import React, { FC, ButtonHTMLAttributes } from "react"
import styles from "./button.module.css"

const Button: FC<ButtonHTMLAttributes<any>> = ({ children, ...rest }) => (
  <button className={styles.btnPrimary} {...rest}>
    {children}
  </button>
)

export default Button
