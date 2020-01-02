import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Layout from "../../layout"
import Instructor from "../../instructor"
import Speechbubble from "../../speechbubble"
import Link, { LinkAppearance } from "../../buttons/link"
import styles from "./intro.module.css"
import { Route } from "../../../constants/routes"

const IntroPage: FC<RouteComponentProps> = () => (
  <Layout>
    <Instructor className={styles.instructor} />
    <Speechbubble className={styles.speechbubble}>
      <p>{`Herzlichen Glückwunsch zu deiner neuen Stelle als Marketing Director!`}</p>
      <p>{`  Ich freue mich, dich in unserem Team willkommen zu heißen. Ich hoffe, du bist voller neuer Ideen und Enthusiasmus und hast Lust, direkt loszulegen.`}</p>
      <p>{`Wie du weißt, ist es das oberste Ziel unserer Agentur, die Produkte unserer Auftraggeber so erfolgreich wie möglich zu vermarkten.  Aktuell sind wir dabei, eine neue Marketingstrategie auszuprobieren und sind dabei auf deine Hilfe angewiesen.`}</p>
      <p>{`Bist du bereit, gleich deine erste Aufgabe zu übernehmen?`}</p>
      <Link to={Route.Game} appearance={LinkAppearance.ButtonPrimary}>
        {"Weiter"}
      </Link>
    </Speechbubble>
  </Layout>
)

export default IntroPage
