import { useState } from "react";

const styles = {
  itemBox: `
    flex w-full max-w-[760px]
    flex-col gap-5
    rounded-lg border border-gray-300
    px-5 py-4
    md:flex-row md:items-center md:justify-between
  `,

  infoArea: `
    flex flex-col gap-4
  `,

  itemName: `
    text-base font-bold text-black
  `,

  detailArea: `
    flex items-center gap-4
    text-sm text-gray-400
  `,

  price: `
    text-base text-black
  `,

  controlArea: `
    flex w-full
    items-center gap-3
    md:w-auto md:gap-4
  `,

  countInput: `
    h-12 flex-1
    rounded-lg border border-gray-300
    px-4
    text-base
    outline-none
    md:w-[220px] md:flex-none
  `,

  disabledInput: `
    h-12 flex-1
    rounded-lg border border-gray-300
    bg-gray-100
    px-4
    text-base text-gray-400
    outline-none
    cursor-not-allowed
    md:w-[220px] md:flex-none
  `,

  activeButton: `
    h-12 w-28
    rounded-lg
    bg-blue-500
    text-sm text-white
    transition
    hover:bg-blue-600
    md:w-32 md:text-base
  `,

  disabledButton: `
    h-12 w-28
    rounded-lg
    bg-gray-300
    text-sm text-white
    cursor-not-allowed
    md:w-32 md:text-base
  `,
};

function Item({ item }) {
  const [count, setCount] = useState("");
  const [remainingQuantity, setRemainingQuantity] = useState(item.quantity);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleCountChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setCount(value);
    }
  };

  const handleCartClick = () => {
    const selectedCount = Number(count);

    if (selectedCount <= 0) {
      return;
    }

    if (selectedCount > remainingQuantity) {
      alert("재고 수량보다 많은 개수를 선택할 수 없습니다.");
      return;
    }

    setRemainingQuantity(remainingQuantity - selectedCount);
    setIsAddedToCart(true);
  };

  const isDisabled = count === "" || isAddedToCart || remainingQuantity === 0;

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
  );
}

export default Item;
