import React, { FC } from "react"
import { DndProvider } from "react-dnd"
import Html5Backend from "react-dnd-html5-backend"
import { RouteComponentProps } from "@reach/router"
import styles from "./intro.module.css"
import GameStage from "../../game-stage"
import Hudbar from "../../hudbar"
import { Route } from "../../../constants/routes"
import Instructor from "../../instructor"
import { DialogActionName, Dialog } from "../../instructor/instructor"

const IntroPage: FC<RouteComponentProps> = () => {
  const dialogs = useDialogs()
  return (
    <DndProvider backend={Html5Backend}>
      <div className={styles.component}>
        <GameStage
          className={styles.stage}
          renderInstructor={() => (
            <Instructor className={styles.instructor} dialogs={dialogs} />
          )}
        />
        <Hudbar className={styles.hudbar} />
      </div>
    </DndProvider>
  )
}

const useDialogs = () => DIALOGS

const DIALOGS: Dialog[] = [
  {
    action: {
      name: DialogActionName.NEXT,
    },
    paragraphs: [
      `Herzlichen Glückwunsch zu deiner neuen Stelle als Marketing Director!`,
      `  Ich freue mich, dich in unserem Team willkommen zu heißen. Ich hoffe, du bist voller neuer Ideen und Enthusiasmus und hast Lust, direkt loszulegen.`,
      `Wie du weißt, ist es das oberste Ziel unserer Agentur, die Produkte unserer Auftraggeber so erfolgreich wie möglich zu vermarkten.  Aktuell sind wir dabei, eine neue Marketingstrategie auszuprobieren und sind dabei auf deine Hilfe angewiesen.`,
      `Bist du bereit, gleich deine erste Aufgabe zu übernehmen?`,
    ],
  },
  {
    action: {
      name: DialogActionName.NEXT,
    },
    paragraphs: [
      `Um Kosten gering zu halten und die Inhalte unserer Werbekampagnen noch effizienter gestalten zu können, sollen sich unsere Marketingkampagnen zukünftig nur an jeweils eine ausgewählte Zielgruppe richten.`,
      `Hier ein Überblick über unsere wichtigsten Zielgruppen...`,
    ],
  },
  {
    action: {
      name: DialogActionName.NEXT,
    },
    paragraphs: [
      `Wie du sehen kannst, haben die Zielgruppen unterschiedliche Präferenzen bezüglich des Kommunikationskanals, der Produktkategorie, der Preisgestaltung, des Produktdesigns und ihrer Werte.`,
    ],
  },
  {
    action: {
      name: DialogActionName.NAVIGATE,
      data: Route.Game,
    },
    paragraphs: [
      `Ordne nun bitte jedes der folgenden Produkte derjenigen Zielgruppe zu, die dir dafür am geeignetsten erscheint. Aufgrund der unterschiedlichen Ansprüche und Bedürfnisse ist es nicht immer offensichtlich, welche Zielgruppe am besten angesprochen werden sollte. Im Anschluss an jede Zuordnung erfährst du, ob du mit deiner Marketingkampagne einen Gewinn oder Verlust erzielt hast. Dadurch kannst du erkennen, welche Strategie erfolgbringend ist.`,
      `Sei dir jedoch bewusst, dass sich Kundenbedürfnisse auch manchmal ändern können und dann eine neue Strategie erfordern!`,
      `Den aktuellen Stand deiner Ausgaben/Einnahmen wird dir (rechts unten) angezeigt. Du startest mit einem Budget von 10.000€ und das Ziel ist es natürlich, den Gewinn zu maximieren.`,
    ],
  },
]

export default IntroPage
