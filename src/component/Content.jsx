function Content() {
  return (
    <main>
      <input
        type="text"
        name="product"
        placeholder="상품 검색..."
      />

      <button onClick={() => console.log("검색 버튼 클릭")}>
        검색
      </button>

      <img src="/gdg-favicon.svg" alt="GDG 로고" />

            <p>검색 결과가 없습니다.</p>

    </main>
  );
}

export default Content;

