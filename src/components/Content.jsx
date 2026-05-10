const styles = {
  main: `
    relative h-[580px]
    pt-20
    px-4
  `,

  searchArea: `
    mx-auto flex w-full
    max-w-[760px]
    items-center gap-3
    md:gap-5
  `,

  searchInput: `
    h-12 flex-1
    rounded-lg border border-gray-300
    px-4
    text-sm
    outline-none
    md:px-5 md:text-base
  `,

  searchButton: `
    h-12 w-24
    rounded-lg
    bg-blue-500
    text-sm text-white
    transition
    hover:bg-blue-600
    md:w-40 md:text-base
  `,

  emptyArea: `
    absolute left-1/2 top-1/2
    flex -translate-x-1/2 -translate-y-1/2
    flex-col items-center
  `,

  emptyLogo: `
    mb-[-12px]
    w-[220px]
    opacity-20
    md:w-[280px]
  `,

  emptyText: `
    m-0
    text-base font-medium text-gray-400
    md:text-lg
  `,
};

function Content() {
  return (
    <main className={styles.main}>
      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="상품 검색..."
          className={styles.searchInput}
        />

        <button
          type="button"
          className={styles.searchButton}
        >
          검색
        </button>
      </div>

      <div className={styles.emptyArea}>
        <img
          src="/gdg-favicon.svg"
          alt="GDG 로고"
          className={styles.emptyLogo}
        />

        <p className={styles.emptyText}>
          검색 결과가 없습니다.
        </p>
      </div>
    </main>
  );
}

export default Home;