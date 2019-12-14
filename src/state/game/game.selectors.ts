import { GlobalState as GS } from "../createStore"
import { createSelector } from "reselect"
import { ResolvedCard, CriteriaName } from "./game.props"
import { CARDS, CRITERIA_ORDER } from "./game.state"

const getCardIndex = (state: GS) => state.game.cardIndex

const getCriteriaIndex = (state: GS) => state.game.criteriaIndex

export const getScore = (state: GS) => state.game.score

export const getCriteria = createSelector<GS, number, CriteriaName>(
  getCriteriaIndex,
  criteriaIndex =>
    CRITERIA_ORDER.get(criteriaIndex % CRITERIA_ORDER.size) as CriteriaName
)

export const getCurrentCard = createSelector<
  GS,
  number,
  ResolvedCard | undefined
>(getCardIndex, cardIndex => CARDS.get(cardIndex))
