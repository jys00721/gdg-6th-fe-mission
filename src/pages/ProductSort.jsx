import { useEffect, useState } from "react";
import Item from "../components/Item";
import { getSortedItems } from "../apis/productApi";

function ProductSort() {
  const [sortType, setSortType] = useState("");
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

  useEffect(() => {
    const fetchSortedItems = async () => {
      const data = await getSortedItems();

      setItems(data);
      setOriginalItems(data);
    };

    fetchSortedItems();
  }, []);

  const handleSortChange = (e) => {
    const selectedType = e.target.value;
    setSortType(selectedType);

    const copiedItems = [...originalItems];

    if (selectedType === "name") {
      copiedItems.sort((a, b) => a.itemName.localeCompare(b.itemName));
    }

    if (selectedType === "price") {
      copiedItems.sort((a, b) => a.price - b.price);
    }

    setItems(copiedItems);
  };

  return (
    <main className={styles.page}>
      <div className={styles.selectWrapper}>
        <select
          value={sortType}
          onChange={handleSortChange}
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
          <Item key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}

export default ProductSort;

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
};
