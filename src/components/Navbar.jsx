import { useLocation, useNavigate } from "react-router";

const styles = {
  header: `
    relative flex h-[72px]
    items-center justify-center
    border-b border-gray-200
    px-4
  `,

  logo: `
    absolute left-4
    w-10 cursor-pointer
    md:left-[80px] md:w-12
    lg:left-[200px]
  `,

  nav: `
    flex gap-3
    md:gap-8
  `,

  navButton: `
    text-sm text-gray-400
    transition
    hover:text-gray-700
    md:text-base
  `,

  adminButton: `
    absolute right-4
    rounded-lg border border-blue-400
    px-2 py-1.5
    text-sm text-blue-500
    transition
    hover:bg-blue-500 hover:text-white
    md:right-[80px] md:px-3 md:py-2 md:text-[15px]
    lg:right-[200px]
  `,
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname === "/admin";

  return (
    <header className={styles.header}>
      <img
        src="/gdg-favicon.svg"
        alt="GDG 로고"
        className={styles.logo}
        onClick={() => navigate("/")}
      />

      {!isAdminPage && (
        <nav className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigate("/category-filter")}
          >
            카테고리 필터링
          </button>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigate("/price-filter")}
          >
            가격 범위 필터링
          </button>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigate("/sort")}
          >
            상품 정렬
          </button>
        </nav>
      )}

      <button
        type="button"
        className={styles.adminButton}
        onClick={() => navigate(isAdminPage ? "/" : "/admin")}
      >
        {isAdminPage ? "소비자" : "관리자"}
      </button>
    </header>
  );
}

export default Navbar;