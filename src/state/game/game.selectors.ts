import { GlobalState as GS } from "../createStore"
import { createSelector } from "reselect"
import { ResolvedCard, CriteriaName } from "./game.props"
import { CARDS, CRITERIA_TRUMP_ORDER, CRITERIA_CARD_ORDERS } from "./game.state"
import last from "lodash/last"

const getCardIndex = (state: GS) => state.game.cardIndex

const getCriteriaIndex = (state: GS) => state.game.criteriaTrumpIndex

export const getScore = (state: GS) => last(state.game.scores) || 0

export const getScoreHistory = (state: GS) => state.game.scores

export const getTrumpCriteria = createSelector<GS, number, CriteriaName>(
  getCriteriaIndex,
  criteriaIndex =>
    CRITERIA_TRUMP_ORDER.get(
      criteriaIndex % CRITERIA_TRUMP_ORDER.size
    ) as CriteriaName
)

export const getCriteriaOrder = createSelector<GS, number, CriteriaName[]>(
  getCardIndex,
  cardIndex => {
    const entry = CRITERIA_CARD_ORDERS.find(v => cardIndex < v.threshold)
    if (!entry) {
      throw Error(`Could not find criteria order for cardIndex: ${cardIndex}`)
    }
    return entry.order
  }
)

export const getCurrentCard = createSelector<
  GS,
  number,
  ResolvedCard | undefined
>(getCardIndex, cardIndex => CARDS.get(cardIndex))
