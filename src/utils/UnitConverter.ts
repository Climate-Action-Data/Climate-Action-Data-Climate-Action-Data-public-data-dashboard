const TCO2_MTCO2_RATIO = 1000000

export const convertToMtCO2 = (tCO2e: number, toRound = false, decimals: number | undefined = undefined): number => {
  let MtCO2 = tCO2e / TCO2_MTCO2_RATIO
  if (decimals) {
    MtCO2 = Number(MtCO2.toFixed(decimals))
  }
  if (toRound) {
    MtCO2 = Math.round(MtCO2)
  }
  return MtCO2
}

export const convertTotCO2 = (MtCO2e: number): number => {
  const tCO2 = MtCO2e * TCO2_MTCO2_RATIO
  return tCO2
}
