import { useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import { useProductStore } from '../store/productStore'

function ProductSort() {
  const sortType = useProductStore((state) => state.sortType)
  const items = useProductStore((state) => state.sortedItems)
  const loadSortedItems = useProductStore((state) => state.loadSortedItems)
  const setSortType = useProductStore((state) => state.setSortType)

  useEffect(() => {
    loadSortedItems()
  }, [loadSortedItems])

  return (
    <main className={styles.page}>
      <div className={styles.selectWrapper}>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className={styles.select}
        >
          <option value="">정렬 기준 선택</option>
          <option value="name">이름순</option>
          <option value="price">가격순</option>
        </select>
      </div>

      <p className={styles.sectionTitle}>내 구매 내역</p>

      <div className={styles.itemList}>
        {items.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}

export default ProductSort

const styles = {
  page: `
    flex flex-col items-center
    pt-16 pb-20
  `,

  selectWrapper: `
    mb-16
    w-full max-w-[760px]
  `,

  select: `
    h-10 w-[200px]
    rounded-lg border border-gray-300
    px-4
    text-sm text-gray-500
    outline-none
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
