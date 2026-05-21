import { create } from 'zustand'

import {
  getCategoryItems,
  getItems,
  getPriceSelectedItems,
  getSortedItems,
} from '../api/productApi'

const API_URL = 'http://10.90.5.53:8080/admin/products'

const getItemKey = (item) => item.itemName

const mergeInventory = (inventory, items) => {
  return items.reduce(
    (acc, item) => {
      const key = getItemKey(item)

      if (acc[key] === undefined) {
        acc[key] = item.quantity ?? 0
      }

      return acc
    },
    { ...inventory }
  )
}

const isNumberText = (value) => /^\d*$/.test(value)

export const useProductStore = create((set, get) => ({
  items: [],
  categoryItems: [],
  priceItems: [],
  filteredPriceItems: [],
  sortedItems: [],
  originalSortedItems: [],

  keyword: '',
  resultItem: null,
  selectedCategory: '',
  lowPrice: '',
  highPrice: '',
  sortType: '',

  inventory: {},
  cartCounts: {},
  cartItems: {},

  adminForm: {
    registerName: '',
    registerPrice: '',
    registerQuantity: '',
    registerCategory: '',
    stockName: '',
    stockQuantity: '',
    deleteName: '',
  },

  loadItems: async () => {
    const items = await getItems()

    set((state) => ({
      items,
      inventory: mergeInventory(state.inventory, items),
    }))
  },

  loadCategoryItems: async () => {
    const categoryItems = await getCategoryItems()

    set((state) => ({
      categoryItems,
      inventory: mergeInventory(state.inventory, categoryItems),
    }))
  },

  loadPriceItems: async () => {
    const data = await getPriceSelectedItems()

    set((state) => ({
      lowPrice: String(data.low),
      highPrice: String(data.high),
      priceItems: data.items,
      filteredPriceItems: data.items,
      inventory: mergeInventory(state.inventory, data.items),
    }))
  },

  loadSortedItems: async () => {
    const sortedItems = await getSortedItems()

    set((state) => ({
      sortedItems,
      originalSortedItems: sortedItems,
      inventory: mergeInventory(state.inventory, sortedItems),
    }))
  },

  setKeyword: (keyword) => set({ keyword }),

  searchItem: () => {
    const { keyword, items } = get()
    const trimmedKeyword = keyword.trim()
    const resultItem =
      items.find((item) => item.itemName === trimmedKeyword) ?? null

    set({ resultItem })
  },

  setSelectedCategory: (selectedCategory) => {
    if (selectedCategory !== '') {
      console.log(`${selectedCategory} 카테고리 클릭`)
    }

    set({ selectedCategory })
  },

  setLowPrice: (lowPrice) => {
    if (isNumberText(lowPrice)) {
      set({ lowPrice })
    }
  },

  setHighPrice: (highPrice) => {
    if (isNumberText(highPrice)) {
      set({ highPrice })
    }
  },

  applyPriceFilter: () => {
    const { lowPrice, highPrice, priceItems } = get()
    const low = Number(lowPrice)
    const high = Number(highPrice)
    const filteredPriceItems = priceItems.filter((item) => {
      return item.price >= low && item.price <= high
    })

    set({ filteredPriceItems })
  },

  setSortType: (sortType) => {
    const sortedItems = [...get().originalSortedItems]

    if (sortType === 'name') {
      sortedItems.sort((a, b) => a.itemName.localeCompare(b.itemName))
    }

    if (sortType === 'price') {
      sortedItems.sort((a, b) => a.price - b.price)
    }

    set({ sortType, sortedItems })
  },

  setCartCount: (itemName, count) => {
    if (!isNumberText(count)) {
      return
    }

    set((state) => ({
      cartCounts: {
        ...state.cartCounts,
        [itemName]: count,
      },
    }))
  },

  addToCart: (item) => {
    const itemName = getItemKey(item)
    const selectedCount = Number(get().cartCounts[itemName] ?? '')
    const remainingQuantity = get().inventory[itemName] ?? item.quantity ?? 0

    if (selectedCount <= 0) {
      return { success: false }
    }

    if (selectedCount > remainingQuantity) {
      return {
        success: false,
        message: '재고 수량보다 많은 개수를 선택할 수 없습니다.',
      }
    }

    set((state) => ({
      inventory: {
        ...state.inventory,
        [itemName]: remainingQuantity - selectedCount,
      },
      cartItems: {
        ...state.cartItems,
        [itemName]: {
          ...item,
          count: selectedCount,
        },
      },
    }))

    return { success: true }
  },

  setAdminField: (field, value) => {
    set((state) => ({
      adminForm: {
        ...state.adminForm,
        [field]: value,
      },
    }))
  },

  setAdminNumberField: (field, value) => {
    if (!isNumberText(value)) {
      return
    }

    get().setAdminField(field, value)
  },

  registerProduct: async () => {
    const { registerName, registerPrice, registerQuantity } = get().adminForm

    if (!registerName || !registerPrice || !registerQuantity) {
      throw new Error('상품명, 가격, 수량, 카테고리를 모두 입력해주세요.')
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: registerName,
        productPrice: Number(registerPrice),
        remainQuantity: Number(registerQuantity),
      }),
    })

    if (!response.ok) {
      throw new Error('상품 등록 실패')
    }

    const data = await response.json()

    set((state) => ({
      adminForm: {
        ...state.adminForm,
        registerName: '',
        registerPrice: '',
        registerQuantity: '',
      },
    }))

    return data
  },

  addStock: async () => {
    const { stockName, stockQuantity } = get().adminForm

    if (!stockName || !stockQuantity) {
      throw new Error('상품명과 수량을 모두 입력해주세요.')
    }

    const response = await fetch(`${API_URL}/${stockName}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        addQuantity: Number(stockQuantity),
      }),
    })

    if (!response.ok) {
      throw new Error('재고 추가 실패')
    }

    const data = await response.json()

    set((state) => ({
      adminForm: {
        ...state.adminForm,
        stockName: '',
        stockQuantity: '',
      },
    }))

    return data
  },

  deleteProduct: async () => {
    const { deleteName } = get().adminForm

    if (!deleteName) {
      throw new Error('삭제할 상품명을 입력해주세요.')
    }

    const response = await fetch(
      `${API_URL}/${encodeURIComponent(deleteName)}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('상품 삭제 실패')
    }

    set((state) => ({
      adminForm: {
        ...state.adminForm,
        deleteName: '',
      },
    }))
  },
}))
