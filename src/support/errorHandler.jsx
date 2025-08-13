export function handleError(err, ctx='') {
  console.error('[CityEasy]', ctx, err?.message || err)
}
