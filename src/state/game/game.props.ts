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
