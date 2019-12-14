import { List } from "immutable"
import {
  CriteriaValue,
  CriteriaName,
  CardConfig,
  ResolvedCriteriaAssignment,
  CriteriaAssignment,
  GameState,
  ResolvedCard,
} from "./game.props"

const { Channel, Category, Price, Design, Value } = CriteriaName

const CATEGORIES: Record<string, CriteriaValue> = {
  adventure: {
    id: "adventure",
    label: "Erlebnis",
  },
  luxury: {
    id: "luxury",
    label: "Luxus",
  },
  trend: {
    id: "trend",
    label: "Trend",
  },
  leisure: {
    id: "leisure",
    label: "Freizeit",
  },
  routine: {
    id: "routine",
    label: "Alltag",
  },
}

const DESIGNS: Record<string, CriteriaValue> = {
  classic: {
    id: "classic",
    label: "Klassisch",
  },
  modern: {
    id: "modern",
    label: "Modern",
  },
  innovative: {
    id: "innovative",
    label: "Innovativ",
  },
  minimal: {
    id: "minimal",
    label: "Minimalistisch",
  },
  extravagant: {
    id: "extravagant",
    label: "Extravagant",
  },
}

const PRICES: Record<string, CriteriaValue> = {
  advanced: {
    id: "advanced",
    label: "Gehoben",
  },
  sale: {
    id: "sale",
    label: "Sale",
  },
  installments: {
    id: "installments",
    label: "Ratenzahlung",
  },
  regular: {
    id: "regular",
    label: "Regulär",
  },
  discount: {
    id: "discount",
    label: "Discount",
  },
}

const VALUES: Record<string, CriteriaValue> = {
  fairness: {
    id: "fairness",
    label: "Fairness",
  },
  quality: {
    id: "quality",
    label: "Qualität",
  },
  health: {
    id: "health",
    label: "Gesundheit",
  },
  image: {
    id: "image",
    label: "Image",
  },
  sustainability: {
    id: "sustainability",
    label: "Nachhaltigkeit",
  },
}

const CHANNELS: Record<string, CriteriaValue> = {
  social: {
    id: "social",
    label: "Soziale Medien",
  },
  print: {
    id: "print",
    label: "Printmedien",
  },
  tele: {
    id: "tele",
    label: "Telemarketing",
  },
  tv: {
    id: "tv",
    label: "Fernsehwerbung",
  },
  outdoor: {
    id: "outdoor",
    label: "Außenwerbung",
  },
}

const CARD_CONFIGS: CardConfig[] = [
  {
    [Channel]: "social",
    [Category]: "luxury",
    [Price]: "sale",
    [Design]: "classic",
    [Value]: "fairness",
    image: "uhr",
  },
  {
    [Channel]: "print",
    [Category]: "adventure",
    [Price]: "installments",
    [Design]: "modern",
    [Value]: "quality",
    image: "benzinroller",
  },
  {
    [Channel]: "tele",
    [Category]: "trend",
    [Price]: "advanced",
    [Design]: "innovative",
    [Value]: "health",
    image: "skates",
  },
  {
    [Channel]: "tv",
    [Category]: "leisure",
    [Price]: "installments",
    [Design]: "innovative",
    [Value]: "image",
    image: "bike",
  },
  {
    [Channel]: "outdoor",
    [Category]: "leisure",
    [Price]: "advanced",
    [Design]: "classic",
    [Value]: "image",
    image: "tennisschlaeger",
  },
  {
    [Channel]: "social",
    [Category]: "routine",
    [Price]: "advanced",
    [Design]: "minimal",
    [Value]: "fairness",
    image: "komode",
  },
  {
    [Channel]: "print",
    [Category]: "luxury",
    [Price]: "regular",
    [Design]: "modern",
    [Value]: "sustainability",
    image: "mikrowelle",
  },
  {
    [Channel]: "tele",
    [Category]: "luxury",
    [Price]: "regular",
    [Design]: "modern",
    [Value]: "health",
    image: "stuhl",
  },
  {
    [Channel]: "tv",
    [Category]: "routine",
    [Price]: "sale",
    [Design]: "modern",
    [Value]: "fairness",
    image: "staubsauger",
  },
  {
    [Channel]: "outdoor",
    [Category]: "routine",
    [Price]: "advanced",
    [Design]: "minimal",
    [Value]: "image",
    image: "rasenmaeher",
  },
  {
    [Channel]: "social",
    [Category]: "leisure",
    [Price]: "installments",
    [Design]: "extravagant",
    [Value]: "fairness",
    image: "thermobecher",
  },
  {
    [Channel]: "print",
    [Category]: "trend",
    [Price]: "installments",
    [Design]: "innovative",
    [Value]: "quality",
    image: "couch",
  },
  {
    [Channel]: "tele",
    [Category]: "leisure",
    [Price]: "advanced",
    [Design]: "innovative",
    [Value]: "image",
    image: "topf",
  },
  {
    [Channel]: "tv",
    [Category]: "trend",
    [Price]: "regular",
    [Design]: "minimal",
    [Value]: "sustainability",
    image: "kopfhoerer_big",
  },
  {
    [Channel]: "outdoor",
    [Category]: "luxury",
    [Price]: "installments",
    [Design]: "minimal",
    [Value]: "image",
    image: "kaffeemaschine",
  },
  {
    [Channel]: "social",
    [Category]: "adventure",
    [Price]: "sale",
    [Design]: "classic",
    [Value]: "quality",
    image: "sitzball",
  },
  {
    [Channel]: "print",
    [Category]: "routine",
    [Price]: "advanced",
    [Design]: "modern",
    [Value]: "fairness",
    image: "telefon",
  },
  {
    [Channel]: "tele",
    [Category]: "adventure",
    [Price]: "advanced",
    [Design]: "modern",
    [Value]: "health",
    image: "kicker",
  },
  {
    [Channel]: "tv",
    [Category]: "adventure",
    [Price]: "sale",
    [Design]: "modern",
    [Value]: "sustainability",
    image: "kopfhoerer",
  },
  {
    [Channel]: "outdoor",
    [Category]: "leisure",
    [Price]: "installments",
    [Design]: "modern",
    [Value]: "quality",
    image: "tischlampe",
  },
  {
    [Channel]: "social",
    [Category]: "routine",
    [Price]: "advanced",
    [Design]: "innovative",
    [Value]: "health",
    image: "hanteln",
  },
  {
    [Channel]: "print",
    [Category]: "trend",
    [Price]: "regular",
    [Design]: "extravagant",
    [Value]: "sustainability",
    image: "kuechengeraet",
  },
  {
    [Channel]: "tele",
    [Category]: "luxury",
    [Price]: "sale",
    [Design]: "innovative",
    [Value]: "image",
    image: "grill",
  },
  {
    [Channel]: "tv",
    [Category]: "adventure",
    [Price]: "installments",
    [Design]: "modern",
    [Value]: "health",
    image: "zelt",
  },
  {
    [Channel]: "social",
    [Category]: "leisure",
    [Price]: "advanced",
    [Design]: "classic",
    [Value]: "fairness",
    image: "basketball",
  },
  {
    [Channel]: "print",
    [Category]: "luxury",
    [Price]: "installments",
    [Design]: "innovative",
    [Value]: "image",
    image: "kronleuchter",
  },
  {
    [Channel]: "tele",
    [Category]: "leisure",
    [Price]: "regular",
    [Design]: "extravagant",
    [Value]: "image",
    image: "rollschuhe",
  },
  {
    [Channel]: "outdoor",
    [Category]: "luxury",
    [Price]: "installments",
    [Design]: "modern",
    [Value]: "health",
    image: "uhr2",
  },
  {
    [Channel]: "outdoor",
    [Category]: "trend",
    [Price]: "advanced",
    [Design]: "minimal",
    [Value]: "sustainability",
    image: "yogamatte",
  },
  {
    [Channel]: "social",
    [Category]: "adventure",
    [Price]: "sale",
    [Design]: "extravagant",
    [Value]: "sustainability",
    image: "wanderschuhe",
  },
  {
    [Channel]: "print",
    [Category]: "adventure",
    [Price]: "advanced",
    [Design]: "modern",
    [Value]: "sustainability",
    image: "roller",
  },
  {
    [Channel]: "tele",
    [Category]: "adventure",
    [Price]: "sale",
    [Design]: "extravagant",
    [Value]: "image",
    image: "campingstuhl",
  },
  {
    [Channel]: "tele",
    [Category]: "trend",
    [Price]: "installments",
    [Design]: "innovative",
    [Value]: "health",
    image: "smartwatch",
  },
  {
    [Channel]: "tv",
    [Category]: "routine",
    [Price]: "regular",
    [Design]: "minimal",
    [Value]: "image",
    image: "staubsauger2",
  },
  {
    [Channel]: "social",
    [Category]: "adventure",
    [Price]: "installments",
    [Design]: "extravagant",
    [Value]: "health",
    image: "actioncam",
  },
  {
    [Channel]: "print",
    [Category]: "routine",
    [Price]: "regular",
    [Design]: "extravagant",
    [Value]: "image",
    image: "toaster",
  },
  {
    [Channel]: "tele",
    [Category]: "trend",
    [Price]: "regular",
    [Design]: "minimal",
    [Value]: "quality",
    image: "rucksack",
  },
  {
    [Channel]: "tv",
    [Category]: "leisure",
    [Price]: "regular",
    [Design]: "classic",
    [Value]: "image",
    image: "rolle",
  },
  {
    [Channel]: "outdoor",
    [Category]: "routine",
    [Price]: "advanced",
    [Design]: "modern",
    [Value]: "health",
    image: "waschmaschine",
  },
  {
    [Channel]: "social",
    [Category]: "luxury",
    [Price]: "regular",
    [Design]: "classic",
    [Value]: "health",
    image: "kaffeemaschine2",
  },
  {
    [Channel]: "print",
    [Category]: "luxury",
    [Price]: "regular",
    [Design]: "classic",
    [Value]: "image",
    image: "handmixer",
  },
  {
    [Channel]: "tele",
    [Category]: "adventure",
    [Price]: "advanced",
    [Design]: "minimal",
    [Value]: "image",
    image: "photocamera",
  },
  {
    [Channel]: "tv",
    [Category]: "routine",
    [Price]: "regular",
    [Design]: "modern",
    [Value]: "health",
    image: "laptop",
  },
  {
    [Channel]: "outdoor",
    [Category]: "trend",
    [Price]: "advanced",
    [Design]: "classic",
    [Value]: "health",
    image: "nikoncamera",
  },
  {
    [Channel]: "social",
    [Category]: "leisure",
    [Price]: "regular",
    [Design]: "extravagant",
    [Value]: "sustainability",
    image: "balkonstuhl",
  },
  {
    [Channel]: "print",
    [Category]: "adventure",
    [Price]: "discount",
    [Design]: "classic",
    [Value]: "quality",
    image: "rollkoffer",
  },
  {
    [Channel]: "tele",
    [Category]: "leisure",
    [Price]: "regular",
    [Design]: "modern",
    [Value]: "quality",
    image: "sportrucksack",
  },
  {
    [Channel]: "tele",
    [Category]: "adventure",
    [Price]: "discount",
    [Design]: "minimal",
    [Value]: "sustainability",
    image: "minigrill",
  },
  {
    [Channel]: "outdoor",
    [Category]: "leisure",
    [Price]: "sale",
    [Design]: "modern",
    [Value]: "fairness",
    image: "waage",
  },
  {
    [Channel]: "social",
    [Category]: "luxury",
    [Price]: "regular",
    [Design]: "minimal",
    [Value]: "sustainability",
    image: "buegeleisen",
  },
  {
    [Channel]: "print",
    [Category]: "trend",
    [Price]: "advanced",
    [Design]: "innovative",
    [Value]: "sustainability",
    image: "sessel",
  },
  {
    [Channel]: "tele",
    [Category]: "luxury",
    [Price]: "discount",
    [Design]: "innovative",
    [Value]: "health",
    image: "foehn",
  },
  {
    [Channel]: "tv",
    [Category]: "trend",
    [Price]: "installments",
    [Design]: "minimal",
    [Value]: "fairness",
    image: "wasserkocher",
  },
  {
    [Channel]: "outdoor",
    [Category]: "luxury",
    [Price]: "sale",
    [Design]: "modern",
    [Value]: "sustainability",
    image: "komode2",
  },
  {
    [Channel]: "social",
    [Category]: "adventure",
    [Price]: "installments",
    [Design]: "minimal",
    [Value]: "quality",
    image: "schuhe",
  },
  {
    [Channel]: "print",
    [Category]: "adventure",
    [Price]: "advanced",
    [Design]: "classic",
    [Value]: "image",
    image: "brieftasche",
  },
  {
    [Channel]: "tele",
    [Category]: "trend",
    [Price]: "sale",
    [Design]: "innovative",
    [Value]: "quality",
    image: "tragetasche",
  },
  {
    [Channel]: "tv",
    [Category]: "leisure",
    [Price]: "installments",
    [Design]: "modern",
    [Value]: "fairness",
    image: "uhr3",
  },
  {
    [Channel]: "outdoor",
    [Category]: "leisure",
    [Price]: "advanced",
    [Design]: "modern",
    [Value]: "sustainability",
    image: "regenschirm",
  },
  {
    [Channel]: "social",
    [Category]: "adventure",
    [Price]: "advanced",
    [Design]: "minimal",
    [Value]: "sustainability",
    image: "wecker",
  },
  {
    [Channel]: "print",
    [Category]: "routine",
    [Price]: "discount",
    [Design]: "extravagant",
    [Value]: "fairness",
    image: "bett",
  },
  {
    [Channel]: "tele",
    [Category]: "adventure",
    [Price]: "sale",
    [Design]: "modern",
    [Value]: "quality",
    image: "kissen",
  },
  {
    [Channel]: "tv",
    [Category]: "adventure",
    [Price]: "installments",
    [Design]: "minimal",
    [Value]: "image",
    image: "hammock",
  },
  {
    [Channel]: "outdoor",
    [Category]: "trend",
    [Price]: "sale",
    [Design]: "classic",
    [Value]: "quality",
    image: "belt",
  },
]

const AUDIENCE_CONFIGS: CriteriaAssignment[] = [
  {
    [Channel]: "social",
    [Category]: "trend",
    [Price]: "discount",
    [Design]: "modern",
    [Value]: "image",
  },
  {
    [Channel]: "print",
    [Category]: "leisure",
    [Price]: "sale",
    [Design]: "minimal",
    [Value]: "health",
  },
  {
    [Channel]: "tele",
    [Category]: "routine",
    [Price]: "installments",
    [Design]: "classic",
    [Value]: "sustainability",
  },
  {
    [Channel]: "tv",
    [Category]: "luxury",
    [Price]: "advanced",
    [Design]: "extravagant",
    [Value]: "quality",
  },
  {
    [Channel]: "outdoor",
    [Category]: "adventure",
    [Price]: "regular",
    [Design]: "innovative",
    [Value]: "fairness",
  },
]

export const CRITERIA_TRUMP_ORDER = List([
  Category,
  Value,
  Price,
  Channel,
  Design,
  Value,
  Price,
])

export const DEFAULT_CRITERIA_ORDER = [Channel, Category, Price, Design, Value]

export const CRITERIA_CARD_ORDERS = List([
  { threshold: 24, order: DEFAULT_CRITERIA_ORDER },
  { threshold: 34, order: [Price, Value, Design, Channel, Category] },
  { threshold: 44, order: [Design, Channel, Value, Category, Price] },
  { threshold: 54, order: [Value, Price, Category, Channel, Design] },
  { threshold: 64, order: [Category, Design, Channel, Value, Price] },
])

const makeResolver = (haystack: Record<string, any>) => (id: string) => {
  const cat = haystack[id]
  if (!cat) {
    throw Error(`Could not resolve id: "${id}"`)
  }
  return cat
}

const resolveIds = (cards: CriteriaAssignment[]) => {
  const category = makeResolver(CATEGORIES)
  const channel = makeResolver(CHANNELS)
  const design = makeResolver(DESIGNS)
  const price = makeResolver(PRICES)
  const value = makeResolver(VALUES)
  return List<ResolvedCriteriaAssignment>(
    cards.map(card => ({
      ...card,
      category: category(card.category),
      channel: channel(card.channel),
      design: design(card.design),
      price: price(card.price),
      value: value(card.value),
    }))
  )
}

export const AUDIENCE = resolveIds(AUDIENCE_CONFIGS)

export const CARDS = resolveIds(CARD_CONFIGS) as List<ResolvedCard>

export const initialState: GameState = Object.freeze({
  cardIndex: 0,
  criteriaOrderIndex: 0,
  criteriaTrumpIndex: 0,
  combo: 0,
  scores: [10000],
})
