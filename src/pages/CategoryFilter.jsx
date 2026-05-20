import { useEffect, useState } from "react";
import Item from "../components/Item";
import { getCategoryItems } from "../apis/productApi";

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

function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      const data = await getCategoryItems();
      setItems(data);
    };

    fetchCategoryItems();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setSelectedCategory(category);

    if (category !== "") {
      console.log(`${category} 카테고리 클릭`);
    }
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <main className={styles.page}>
      <div className={styles.selectWrapper}>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
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
          <Item key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}

export default CategoryFilter;
