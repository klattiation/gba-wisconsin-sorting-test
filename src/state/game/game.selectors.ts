import { GlobalState as GS } from "../createStore"
import { createSelector } from "reselect"
import { ResolvedCard, GameState, CriteriaName } from "./game.props"
import { CARDS, CRITERIA_ORDER } from "./game.state"

const getBase = (state: GS) => state.game

const getCardIndex = createSelector<GS, GameState, number>(
  getBase,
  game => game.cardIndex
)

// const getCombo = createSelector<GS, GameState, number>(
//   getBase,
//   game => game.combo
// )

export const getCriteria = createSelector<GS, GameState, CriteriaName>(
  getBase,
  game =>
    CRITERIA_ORDER.get(game.criteriaIndex % CRITERIA_ORDER.size) as CriteriaName
)

export const getCurrentCard = createSelector<
  GS,
  number,
  ResolvedCard | undefined
>(getCardIndex, cardIndex => CARDS.get(cardIndex))
