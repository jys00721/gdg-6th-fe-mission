import { useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import { useProductStore } from '../store/productStore'

function PriceFilter() {
  const lowPrice = useProductStore((state) => state.lowPrice)
  const highPrice = useProductStore((state) => state.highPrice)
  const filteredItems = useProductStore((state) => state.filteredPriceItems)
  const loadPriceItems = useProductStore((state) => state.loadPriceItems)
  const setLowPrice = useProductStore((state) => state.setLowPrice)
  const setHighPrice = useProductStore((state) => state.setHighPrice)
  const applyPriceFilter = useProductStore((state) => state.applyPriceFilter)

  useEffect(() => {
    loadPriceItems()
  }, [loadPriceItems])

  return (
    <main className={styles.page}>
      <div className={styles.filterArea}>
        <input
          type="text"
          value={lowPrice}
          onChange={(e) => setLowPrice(e.target.value)}
          className={styles.priceInput}
        />

        <input
          type="text"
          value={highPrice}
          onChange={(e) => setHighPrice(e.target.value)}
          className={styles.priceInput}
        />

        <button
          type="button"
          onClick={applyPriceFilter}
          className={styles.searchButton}
        >
          검색
        </button>
      </div>

      <p className={styles.sectionTitle}>내 구매 내역</p>

      <div className={styles.itemList}>
        {filteredItems.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}

export default PriceFilter

const styles = {
  page: `
    flex flex-col items-center
    pt-16 pb-20
  `,

  filterArea: `
    mb-16
    flex items-center gap-4
  `,

  priceInput: `
    h-10 w-[180px]
    rounded-lg border border-gray-300
    px-4
    text-sm
    outline-none
  `,

  searchButton: `
    h-10 w-32
    rounded-lg
    bg-blue-500
    text-sm text-white
    transition
    hover:bg-blue-600
  `,

  sectionTitle: `
    mb-3
    w-full max-w-[760px]
    text-right text-sm text-gray-600
  `,

  itemList: `
    flex w-full flex-col
    items-center gap-5
  `,
}
