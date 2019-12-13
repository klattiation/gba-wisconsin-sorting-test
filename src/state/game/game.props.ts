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

export interface CardConfig {
  category: string
  channel: string
  design: string
  price: string
  value: string
  image: string
}

export interface ResolvedCard {
  category: CriteriaValue
  channel: CriteriaValue
  design: CriteriaValue
  price: CriteriaValue
  value: CriteriaValue
  image: string
}
