export const enum Region {
  ASIA = `asia`,
  AFRICA = `africa`,
  AMERICAS = `americas`,
  EUROPE = `europe`,
  OCEANIA = `oceania`,
}

export const enum SubRegion {
  SOUTHERN_ASIA = `southern-asia`,
  NORTHERN_EUROPE = `northern-europe`,
  SOUTHERN_EUROPE = `southern-europe`,
  NORTHERN_AFRICA = `northern-africa`,
  POLYNESIA = `polynesia`,
  SUB_SAHARAN_AFRICA = `sub-saharan-africa`,
  LATIN_AMERICA_AND_THE_CARIBBEAN = `latin-america-and-the-caribbean`,
  WESTERN_ASIA = `western-asia`,
  AUSTRALIA_AND_NEW_ZEALAND = `australia-and-new-zealand`,
  WESTERN_EUROPE = `western-europe`,
  EASTERN_EUROPE = `eastern-europe`,
  NORTHERN_AMERICA = `northern-america`,
  SOUTH_EASTERN_ASIA = `south-eastern-asia`,
  EASTERN_ASIA = `eastern-asia`,
  MELANESIA = `melanesia`,
  MICRONESIA = `micronesia`,
  CENTRAL_ASIA = `central-asia`,
  WORLD = `world`,
}

export interface Country {
  name?: string
  alpha2?: string
  alpha3: string
  countryCode?: string
  iso31662?: string
  region?: Region
  subRegion?: SubRegion
  intermediateRegion?: string
  regionCode?: string
  subRegionCode?: string
  intermediateRegionCode?: string
}
