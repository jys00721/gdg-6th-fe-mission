import { useEffect, useState } from "react";
import Item from "../components/Item";
import { getPriceSelectedItems } from "../apis/productApi";

const styles = {
  page: `
    flex flex-col items-center
    pt-16 pb-20
  `,

  filterArea: `
    mb-16
    flex items-center gap-4
  `,

  priceInput: `
    h-10 w-[180px]
    rounded-lg border border-gray-300
    px-4
    text-sm
    outline-none
  `,

  searchButton: `
    h-10 w-32
    rounded-lg
    bg-blue-500
    text-sm text-white
    transition
    hover:bg-blue-600
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

function PriceFilter() {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

useEffect(() => {
  const fetchPriceItems = async () => {
    const data = await getPriceSelectedItems();

    setLowPrice(String(data.low));
    setHighPrice(String(data.high));

    setItems(data.items);
    setFilteredItems(data.items);
  };

  fetchPriceItems();
}, []);

  const handleNumberInput = (e, setter) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleSearch = () => {
    const low = Number(lowPrice);
    const high = Number(highPrice);

    const result = items.filter((item) => {
      return item.price >= low && item.price <= high;
    });

    setFilteredItems(result);
  };

  return (
    <main className={styles.page}>
      <div className={styles.filterArea}>
        <input
          type="text"
          value={lowPrice}
          onChange={(e) => handleNumberInput(e, setLowPrice)}
          className={styles.priceInput}
        />

        <input
          type="text"
          value={highPrice}
          onChange={(e) => handleNumberInput(e, setHighPrice)}
          className={styles.priceInput}
        />

        <button
          type="button"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          검색
        </button>
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

export default PriceFilter;