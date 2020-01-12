import { Reducer, AnyAction } from "redux"
import last from "lodash/last"
import { GameState, PlayCardPayload } from "./game.props"
import { initialState } from "./game.state"
import { PLAY_CARD, RESET } from "./game.actions"

const game: Reducer<GameState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_CARD:
      return playCard(state, action.payload)
    case RESET:
      return initialState
    default:
      return state
  }
}

const SCORE_WIN = 500
const SCORE_LOSE = -500

const playCard = (state: GameState, payload: PlayCardPayload): GameState => {
  const { avatarData, cardData, criteria } = payload
  const isCorrect = avatarData[criteria].id === cardData[criteria].id
  const cardIndex = state.cardIndex + 1
  const newCombo = isCorrect ? state.combo + 1 : 0
  const lastScore = last(state.scores) || 0
  const isCriteriaChange = newCombo >= 7
  return {
    ...state,
    cardIndex,
    criteriaChanges: isCriteriaChange
      ? [...state.criteriaChanges, cardIndex]
      : state.criteriaChanges,
    criteriaTrumpIndex: isCriteriaChange
      ? state.criteriaTrumpIndex + 1
      : state.criteriaTrumpIndex,
    combo: isCriteriaChange ? 0 : newCombo,
    scores: [
      ...state.scores,
      isCorrect ? lastScore + SCORE_WIN : lastScore + SCORE_LOSE,
    ],
    scoresPerRound: [
      ...state.scoresPerRound,
      isCorrect ? SCORE_WIN : SCORE_LOSE,
    ],
  }
}

export default game
