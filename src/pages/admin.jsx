import { useState } from "react";

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
};

function Admin() {
  const [registerName, setRegisterName] = useState("");
  const [registerPrice, setRegisterPrice] = useState("");
  const [registerQuantity, setRegisterQuantity] = useState("");
  const [registerCategory, setRegisterCategory] = useState("");

  const [stockName, setStockName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [deleteName, setDeleteName] = useState("");

  const handleNumberInput = (e, setter) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleRegister = () => {
    const newItem = {
      id: Date.now(),
      itemName: registerName,
      price: Number(registerPrice),
      quantity: Number(registerQuantity),
      category: registerCategory,
    };

    console.log("등록된 상품:", newItem);
    console.log(
      `${newItem.itemName} ${newItem.price}원 ${newItem.category} 상품이 등록되었습니다.`
    );

    setRegisterName("");
    setRegisterPrice("");
    setRegisterQuantity("");
    setRegisterCategory("");
  };

  const handleAddStock = () => {
    console.log(`${stockName} ${stockQuantity}개 추가되었습니다.`);

    setStockName("");
    setStockQuantity("");
  };

  const handleDelete = () => {
    console.log(`${deleteName}가 삭제되었습니다.`);

    setDeleteName("");
  };

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
              onChange={(e) => setRegisterName(e.target.value)}
              className={styles.input}
            />

            <label className={styles.label}>수량</label>
            <input
              type="text"
              placeholder="0"
              value={registerQuantity}
              onChange={(e) => handleNumberInput(e, setRegisterQuantity)}
              className={styles.input}
            />
          </div>

          <div className={styles.row}>
            <label className={styles.label}>가격</label>
            <input
              type="text"
              placeholder="가격 입력..."
              value={registerPrice}
              onChange={(e) => handleNumberInput(e, setRegisterPrice)}
              className={styles.input}
            />

            <label className={styles.label}>카테고리</label>
            <input
              type="text"
              placeholder="카테고리 선택"
              value={registerCategory}
              onChange={(e) => setRegisterCategory(e.target.value)}
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
              onChange={(e) => setStockName(e.target.value)}
              className={styles.input}
            />

            <label className={styles.label}>수량</label>
            <input
              type="text"
              placeholder="0"
              value={stockQuantity}
              onChange={(e) => handleNumberInput(e, setStockQuantity)}
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
              onChange={(e) => setDeleteName(e.target.value)}
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
  );
}

export default Admin;