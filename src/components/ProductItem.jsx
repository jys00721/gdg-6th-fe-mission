import { useProductStore } from '../store/productStore'

function ProductItem({ item }) {
  const itemName = item.itemName
  const count = useProductStore((state) => state.cartCounts[itemName] ?? '')
  const remainingQuantity = useProductStore(
    (state) => state.inventory[itemName] ?? item.quantity ?? 0
  )
  const isAddedToCart = useProductStore(
    (state) => state.cartItems[itemName] !== undefined
  )
  const setCartCount = useProductStore((state) => state.setCartCount)
  const addToCart = useProductStore((state) => state.addToCart)

  const handleCountChange = (e) => {
    setCartCount(itemName, e.target.value)
  }

  const handleCartClick = () => {
    const result = addToCart(item)

    if (result.message) {
      alert(result.message)
    }
  }

  const isDisabled = count === '' || isAddedToCart || remainingQuantity === 0

  return (
    <div className={styles.itemBox}>
      <div className={styles.infoArea}>
        <h3 className={styles.itemName}>{item.itemName}</h3>

        <div className={styles.detailArea}>
          <span className={styles.price}>{item.price} 원</span>

          <span>남은 수량: {remainingQuantity}개</span>
        </div>
      </div>

      <div className={styles.controlArea}>
        <input
          type="text"
          inputMode="numeric"
          placeholder="개수 입력..."
          value={count}
          onChange={handleCountChange}
          disabled={isAddedToCart || remainingQuantity === 0}
          className={
            isAddedToCart || remainingQuantity === 0
              ? styles.disabledInput
              : styles.countInput
          }
        />

        <button
          type="button"
          disabled={isDisabled}
          onClick={handleCartClick}
          className={isDisabled ? styles.disabledButton : styles.activeButton}
        >
          장바구니
        </button>
      </div>
    </div>
  )
}

export default ProductItem

const styles = {
  itemBox: `
    flex w-full max-w-[760px]
    items-center justify-between
    rounded-lg border border-gray-200
    px-6 py-5
    shadow-sm
  `,

  infoArea: `
    flex flex-col gap-2
  `,

  itemName: `
    m-0
    text-lg font-bold text-gray-800
  `,

  detailArea: `
    flex gap-5
    text-sm text-gray-500
  `,

  price: `
    font-medium text-gray-700
  `,

  controlArea: `
    flex items-center gap-3
  `,

  countInput: `
    h-10 w-32
    rounded-lg border border-gray-300
    px-4
    text-sm
    outline-none
  `,

  disabledInput: `
    h-10 w-32
    rounded-lg border border-gray-200
    bg-gray-100
    px-4
    text-sm text-gray-400
    outline-none
  `,

  activeButton: `
    h-10 w-28
    rounded-lg
    bg-blue-500
    text-sm text-white
    transition
    hover:bg-blue-600
  `,

  disabledButton: `
    h-10 w-28
    rounded-lg
    bg-gray-200
    text-sm text-gray-400
    cursor-not-allowed
  `,
}
