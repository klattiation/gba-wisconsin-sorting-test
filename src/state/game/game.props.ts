import { DragObjectWithType } from "react-dnd"
import { ActionCreator, AnyAction } from "redux"

export enum CriteriaName {
  Category = "category",
  Design = "design",
  Channel = "channel",
  Value = "value",
  Price = "price",
}

export interface CriteriaValue {
  id: string
  label: string
}

export interface CriteriaAssignment {
  category: string
  channel: string
  design: string
  price: string
  value: string
}

export interface CardConfig extends CriteriaAssignment {
  image: string
}

export interface ResolvedCriteriaAssignment {
  category: CriteriaValue
  channel: CriteriaValue
  design: CriteriaValue
  price: CriteriaValue
  value: CriteriaValue
}

export interface ResolvedCard extends ResolvedCriteriaAssignment {
  image: string
}

export interface GameState {
  cardIndex: number
  criteriaIndex: number
  combo: number
  score: number
}

export interface PlayCardPayload {
  avatarData: ResolvedCriteriaAssignment
  cardData: ResolvedCriteriaAssignment
  criteria: CriteriaName
}

export type PlayCardActionCreator = ActionCreator<
  AnyAction & { payload: PlayCardPayload }
>

export interface CardDragItem extends DragObjectWithType {
  data: ResolvedCard
}
