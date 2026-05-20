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

  const API_URL = "http://10.90.5.53:8080/admin/products";

  const handleNumberInput = (e, setter) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleRegister = async () => {
    const newItem = {
      productName: registerName,
      productPrice: Number(registerPrice),
      remainQuantity: Number(registerQuantity),
    };

    if (!registerName || !registerPrice || !registerQuantity) {
      alert("상품명, 가격, 수량, 카테고리를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("상품 등록 실패");
      }

      const data = await response.json();

      console.log("상품 등록 성공:", data);
      alert("상품이 등록되었습니다.");

      setRegisterName("");
      setRegisterPrice("");
      setRegisterQuantity("");
    } catch (error) {
      console.error("상품 등록 중 오류 발생:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  const handleAddStock = async () => {
    const stockItem = {
      addQuantity: Number(stockQuantity),
    };

    if (!stockName || !stockQuantity) {
      alert("상품명과 수량을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${stockName}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockItem),
      });

      if (!response.ok) {
        throw new Error("재고 추가 실패");
      }

      const data = await response.json();

      console.log("재고 추가 성공:", data);
      alert("재고가 추가되었습니다.");

      setStockName("");
      setStockQuantity("");
    } catch (error) {
      console.error("재고 추가 중 오류 발생:", error);
      alert("재고 추가에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!deleteName) {
      alert("삭제할 상품명을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(deleteName)}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("상품 삭제 실패");
      }

      console.log("상품 삭제 성공");
      alert("상품이 삭제되었습니다.");

      setDeleteName("");
    } catch (error) {
      console.error("상품 삭제 중 오류 발생:", error);
      alert("상품 삭제에 실패했습니다.");
    }
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
