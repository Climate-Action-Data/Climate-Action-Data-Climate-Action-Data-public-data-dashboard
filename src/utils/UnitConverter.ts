const THOUSAND = 1e3
const MILLION = 1e6
const BILLION = 1e9
const TRILLION = 1e12
const TCO2_MTCO2_RATIO = 1000000
const PRECISION_CONFIG = 3

export const convertToMtCO2 = (tCO2e: number, toRound = false, decimals: number | undefined = undefined): number => {
  let MtCO2 = tCO2e / TCO2_MTCO2_RATIO
  if (toRound) {
    MtCO2 = Math.round(MtCO2)
  }
  if (decimals) {
    MtCO2 = Number(MtCO2.toFixed(decimals))
  }
  return MtCO2
}

export const convertTotCO2 = (MtCO2e: number): number => {
  return MtCO2e * TCO2_MTCO2_RATIO
}

export const toCompactValueAndSuffix = (n: number): [string, string] => {
  if (n < THOUSAND) {
    return [n.toPrecision(PRECISION_CONFIG), ``]
  }

  if (n >= THOUSAND && n < MILLION) {
    return [(n / THOUSAND).toPrecision(PRECISION_CONFIG), `K`]
  }

  if (n >= MILLION && n < BILLION) {
    return [(n / MILLION).toPrecision(PRECISION_CONFIG), `MM`]
  }

  if (n >= BILLION && n < TRILLION) {
    return [(n / BILLION).toPrecision(PRECISION_CONFIG), `B`]
  }

  if (n >= TRILLION) {
    return [(n / TRILLION).toPrecision(PRECISION_CONFIG), `T`]
  }

  return [`0`, ``]
}
