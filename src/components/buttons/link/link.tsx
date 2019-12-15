import React, { FC } from "react"
import { Link as ReachLink } from "@reach/router"
import styles from "./link.module.css"
import { Route } from "../../../constants/routes"

interface LinkProps {
  appearance?: LinkAppearance
  onClick?: (evt: any) => void
  to: Route
}

export enum LinkAppearance {
  ButtonPrimary = "btnPrimary",
  Link = "link",
}

const Link: FC<LinkProps> = ({
  appearance = LinkAppearance.Link,
  ...props
}) => <ReachLink className={styles[appearance]} {...props} />

export default Link
