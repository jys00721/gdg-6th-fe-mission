import { useEffect, useState } from "react";
import Item from "../components/Item";
import { getItems } from "../apis/productApi";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [resultItem, setResultItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    const foundItem = items.find((item) => item.itemName === trimmedKeyword);

    if (foundItem) {
      setResultItem(foundItem);
    } else {
      setResultItem(null);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="상품 검색..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.searchInput}
        />

        <button
          type="button"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          검색
        </button>
      </div>

      {resultItem ? (
        <section className={styles.resultArea}>
          <Item item={resultItem} />
        </section>
      ) : (
        <div className={styles.emptyArea}>
          <img
            src="/gdg-favicon.svg"
            alt="GDG 로고"
            className={styles.emptyLogo}
          />

          <p className={styles.emptyText}>검색 결과가 없습니다.</p>
        </div>
      )}
    </main>
  );
}

export default Home;

const styles = {
  main: `
    relative h-[580px] pt-20
  `,

  searchArea: `
    mx-auto flex w-full max-w-[760px]
    items-center gap-5
    px-5
  `,

  searchInput: `
    h-12 flex-1
    rounded-lg border border-gray-300
    px-5
    text-base
    outline-none
  `,

  searchButton: `
    h-12 w-40
    rounded-lg
    bg-blue-500
    text-base text-white
    transition
    hover:bg-blue-600
  `,

  resultArea: `
    mt-24 flex w-full flex-col
    items-center gap-5
  `,

  emptyArea: `
    absolute left-1/2 top-1/2
    flex -translate-x-1/2 -translate-y-1/2
    flex-col items-center
  `,

  emptyLogo: `
    mb-[-16px]
    w-[280px]
    opacity-20
  `,

  emptyText: `
    m-0
    text-lg font-medium text-gray-400
  `,
};
