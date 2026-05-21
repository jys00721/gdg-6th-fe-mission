import { useState } from "react";

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

const styles = {
  footer: `
    flex justify-center
    px-4 pb-10
  `,

  cartButton: `
    h-14 w-full
    max-w-[760px]
    rounded-lg
    border-2 border-blue-400
    bg-white
    text-base text-blue-500
    transition
    hover:bg-blue-500 hover:text-white
    md:text-lg
  `,
};
