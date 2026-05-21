import { useProductStore } from '../store/productStore'

function Admin() {
  const {
    registerName,
    registerPrice,
    registerQuantity,
    registerCategory,
    stockName,
    stockQuantity,
    deleteName,
  } = useProductStore((state) => state.adminForm)
  const setAdminField = useProductStore((state) => state.setAdminField)
  const setAdminNumberField = useProductStore(
    (state) => state.setAdminNumberField
  )
  const registerProduct = useProductStore((state) => state.registerProduct)
  const addStock = useProductStore((state) => state.addStock)
  const deleteProduct = useProductStore((state) => state.deleteProduct)

  const handleRegister = async () => {
    try {
      const data = await registerProduct()

      console.log('상품 등록 성공:', data)
      alert('상품이 등록되었습니다.')
    } catch (error) {
      console.error('상품 등록 중 오류 발생:', error)
      alert(error.message || '상품 등록에 실패했습니다.')
    }
  }

  const handleAddStock = async () => {
    try {
      const data = await addStock()

      console.log('재고 추가 성공:', data)
      alert('재고가 추가되었습니다.')
    } catch (error) {
      console.error('재고 추가 중 오류 발생:', error)
      alert(error.message || '재고 추가에 실패했습니다.')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProduct()

      console.log('상품 삭제 성공')
      alert('상품이 삭제되었습니다.')
    } catch (error) {
      console.error('상품 삭제 중 오류 발생:', error)
      alert(error.message || '상품 삭제에 실패했습니다.')
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <h2 className={styles.title}>상품 등록</h2>

        <div className={styles.formBox}>
          <div className={styles.row}>
            <label className={styles.label}>상품명</label>
            <input
              type="text"
              placeholder="상품명 입력..."
              value={registerName}
              onChange={(e) => setAdminField('registerName', e.target.value)}
              className={styles.input}
            />

            <label className={styles.label}>수량</label>
            <input
              type="text"
              placeholder="0"
              value={registerQuantity}
              onChange={(e) =>
                setAdminNumberField('registerQuantity', e.target.value)
              }
              className={styles.input}
            />
          </div>

          <div className={styles.row}>
            <label className={styles.label}>가격</label>
            <input
              type="text"
              placeholder="가격 입력..."
              value={registerPrice}
              onChange={(e) =>
                setAdminNumberField('registerPrice', e.target.value)
              }
              className={styles.input}
            />

            <label className={styles.label}>카테고리</label>
            <input
              type="text"
              placeholder="카테고리 선택"
              value={registerCategory}
              onChange={(e) =>
                setAdminField('registerCategory', e.target.value)
              }
              className={styles.input}
            />
          </div>

          <p className={styles.helperText}>
            * 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.
          </p>

          <div className={styles.buttonArea}>
            <button
              type="button"
              onClick={handleRegister}
              className={styles.blueButton}
            >
              등록
            </button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>재고 추가</h2>

        <div className={styles.formBox}>
          <div className={styles.row}>
            <label className={styles.label}>상품명</label>
            <input
              type="text"
              placeholder="상품명 입력..."
              value={stockName}
              onChange={(e) => setAdminField('stockName', e.target.value)}
              className={styles.input}
            />

            <label className={styles.label}>수량</label>
            <input
              type="text"
              placeholder="0"
              value={stockQuantity}
              onChange={(e) =>
                setAdminNumberField('stockQuantity', e.target.value)
              }
              className={styles.input}
            />
          </div>

          <div className={styles.buttonArea}>
            <button
              type="button"
              onClick={handleAddStock}
              className={styles.blueButton}
            >
              추가
            </button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>상품 삭제</h2>

        <div className={styles.formBox}>
          <div className={styles.row}>
            <label className={styles.label}>상품명</label>
            <input
              type="text"
              placeholder="상품명 입력..."
              value={deleteName}
              onChange={(e) => setAdminField('deleteName', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.buttonArea}>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.redButton}
            >
              삭제
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin

const styles = {
  page: `
    flex flex-col items-center
    pt-16 pb-20
  `,

  section: `
    mb-14
    w-full max-w-[760px]
  `,

  title: `
    mb-4
    text-lg font-bold
    text-gray-800
  `,

  formBox: `
    rounded-lg border border-gray-300
    p-6
  `,

  row: `
    mb-4
    flex items-center gap-4
  `,

  label: `
    w-20
    text-sm font-medium
    text-gray-700
  `,

  input: `
    h-10 flex-1
    rounded-lg border border-gray-300
    px-4
    text-sm
    outline-none
  `,

  buttonArea: `
    mt-5 flex justify-end
  `,

  blueButton: `
    h-10 w-32
    rounded-lg
    bg-blue-500
    text-sm text-white
    transition
    hover:bg-blue-600
  `,

  redButton: `
    h-10 w-32
    rounded-lg
    bg-red-500
    text-sm text-white
    transition
    hover:bg-red-600
  `,

  helperText: `
    mt-3
    text-sm text-gray-400
  `,
}
