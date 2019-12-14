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
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "fairness",
    image: "uhr",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "quality",
    image: "benzinroller",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "health",
    image: "skates",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "image",
    image: "bike",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "image",
    image: "tennisschlaeger",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "fairness",
    image: "komode",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "sustainability",
    image: "mikrowelle",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "health",
    image: "stuhl",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "fairness",
    image: "staubsauger",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "image",
    image: "rasenmaeher",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "fairness",
    image: "thermobecher",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "quality",
    image: "couch",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "image",
    image: "topf",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "sustainability",
    image: "kopfhoerer_big",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "image",
    image: "kaffeemaschine",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "quality",
    image: "sitzball",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "fairness",
    image: "telefon",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "health",
    image: "kicker",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "sustainability",
    image: "kopfhoerer",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "quality",
    image: "tischlampe",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "health",
    image: "hanteln",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "sustainability",
    image: "kuechengeraet",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "image",
    image: "grill",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "health",
    image: "zelt",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "fairness",
    image: "basketball",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "image",
    image: "kronleuchter",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "image",
    image: "rollschuhe",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "health",
    image: "uhr2",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "sustainability",
    image: "yogamatte",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "sustainability",
    image: "wanderschuhe",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "sustainability",
    image: "roller",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "image",
    image: "campingstuhl",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "health",
    image: "smartwatch",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "image",
    image: "staubsauger2",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "health",
    image: "actioncam",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "image",
    image: "toaster",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "quality",
    image: "rucksack",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "image",
    image: "rolle",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "health",
    image: "waschmaschine",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "health",
    image: "kaffeemaschine2",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "image",
    image: "handmixer",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "image",
    image: "photocamera",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "health",
    image: "laptop",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "health",
    image: "nikoncamera",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "sustainability",
    image: "balkonstuhl",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "discount",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "quality",
    image: "rollkoffer",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "quality",
    image: "sportrucksack",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "discount",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "sustainability",
    image: "minigrill",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "fairness",
    image: "waage",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "sustainability",
    image: "buegeleisen",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "sustainability",
    image: "sessel",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "discount",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "health",
    image: "foehn",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "fairness",
    image: "wasserkocher",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "sustainability",
    image: "komode2",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "quality",
    image: "schuhe",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "image",
    image: "brieftasche",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "quality",
    image: "tragetasche",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "fairness",
    image: "uhr3",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "sustainability",
    image: "regenschirm",
  },
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "sustainability",
    image: "wecker",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "discount",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "fairness",
    image: "bett",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "quality",
    image: "kissen",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "image",
    image: "hammock",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "quality",
    image: "belt",
  },
]

const AUDIENCE_CONFIGS: CriteriaAssignment[] = [
  {
    [CriteriaName.Channel]: "social",
    [CriteriaName.Category]: "trend",
    [CriteriaName.Price]: "discount",
    [CriteriaName.Design]: "modern",
    [CriteriaName.Value]: "image",
  },
  {
    [CriteriaName.Channel]: "print",
    [CriteriaName.Category]: "leisure",
    [CriteriaName.Price]: "sale",
    [CriteriaName.Design]: "minimal",
    [CriteriaName.Value]: "health",
  },
  {
    [CriteriaName.Channel]: "tele",
    [CriteriaName.Category]: "routine",
    [CriteriaName.Price]: "installments",
    [CriteriaName.Design]: "classic",
    [CriteriaName.Value]: "sustainability",
  },
  {
    [CriteriaName.Channel]: "tv",
    [CriteriaName.Category]: "luxury",
    [CriteriaName.Price]: "advanced",
    [CriteriaName.Design]: "extravagant",
    [CriteriaName.Value]: "quality",
  },
  {
    [CriteriaName.Channel]: "outdoor",
    [CriteriaName.Category]: "adventure",
    [CriteriaName.Price]: "regular",
    [CriteriaName.Design]: "innovative",
    [CriteriaName.Value]: "fairness",
  },
]

export const CRITERIA_ORDER = List([
  CriteriaName.Category,
  CriteriaName.Value,
  CriteriaName.Price,
  CriteriaName.Channel,
  CriteriaName.Design,
  CriteriaName.Value,
  CriteriaName.Price,
])

const makeResolver = (haystack: Record<string, any>) => (id: string) => {
  const cat = haystack[id]
  if (!cat) {
    debugger
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
  criteriaIndex: 0,
  combo: 0,
  scores: [10000],
})
