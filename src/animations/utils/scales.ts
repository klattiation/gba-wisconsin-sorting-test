export const scaleLinear = (
  value: number,
  oMin: number,
  oMax: number,
  tMin: number,
  tMax: number
) => {
  // calculate pct in original range
  const oDist = oMax - oMin
  const pct = (value - oMin) / oDist

  // apply pct value to target range
  const tDist = tMax - tMin
  return tDist * pct + tMin
}
