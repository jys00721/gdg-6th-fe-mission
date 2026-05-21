export const getItems = async () => {
  const response = await fetch('/data/item.json')
  const data = await response.json()

  return data
}

export const getCategoryItems = async () => {
  const response = await fetch('/data/category.json')
  const data = await response.json()

  return data
}

export const getPriceSelectedItems = async () => {
  const response = await fetch('/data/priceSelected.json')
  const data = await response.json()

  return data
}

export const getSortedItems = async () => {
  const response = await fetch('/data/sorted.json')
  const data = await response.json()

  return data
}
