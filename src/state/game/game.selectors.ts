import { GlobalState as GS } from "../createStore"
import { createSelector } from "reselect"
import { ResolvedCard, CriteriaName } from "./game.props"
import { CARDS, CRITERIA_TRUMP_ORDER, CRITERIA_CARD_ORDERS } from "./game.state"
import first from "lodash/first"
import last from "lodash/last"

export const getCardIndex = (state: GS) => state.game.cardIndex

const getCriteriaIndex = (state: GS) => state.game.criteriaTrumpIndex

export const getScore = (state: GS) => last(state.game.scores) || 0

export const getInitialScore = (state: GS) => first(state.game.scores) || 0

export const getRoundScore = (state: GS) =>
  last(state.game.scoresPerRound) || null

export const getScoreHistory = (state: GS) => state.game.scores

export const getTrumpCriteria = createSelector(
  getCriteriaIndex,
  criteriaIndex =>
    CRITERIA_TRUMP_ORDER.get(
      criteriaIndex % CRITERIA_TRUMP_ORDER.size
    ) as CriteriaName
)

export const getCriteriaOrder = createSelector(getCardIndex, cardIndex => {
  const entry = CRITERIA_CARD_ORDERS.find(v => cardIndex < v.threshold)
  return entry ? entry.order : null
})

export const getCurrentCard = createSelector<
  GS,
  number,
  ResolvedCard | undefined
>(getCardIndex, cardIndex => CARDS.get(cardIndex))

export const getIsGameComplete = createSelector(
  getCardIndex,
  index => index >= CARDS.size
)
