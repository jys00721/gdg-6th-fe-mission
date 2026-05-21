import { useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import { useProductStore } from '../store/productStore'

function CategoryFilter() {
  const selectedCategory = useProductStore((state) => state.selectedCategory)
  const items = useProductStore((state) => state.categoryItems)
  const loadCategoryItems = useProductStore((state) => state.loadCategoryItems)
  const setSelectedCategory = useProductStore(
    (state) => state.setSelectedCategory
  )

  useEffect(() => {
    loadCategoryItems()
  }, [loadCategoryItems])

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items

  return (
    <main className={styles.page}>
      <div className={styles.selectWrapper}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">카테고리 선택</option>
          <option value="의류">의류</option>
          <option value="전자기기">전자기기</option>
          <option value="주방용품">주방용품</option>
          <option value="식품">식품</option>
        </select>
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

export default CategoryFilter

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
