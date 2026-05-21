function Footer() {
  return (
    <footer className={styles.footer}>
      <button type="button" className={styles.cartButton}>
        장바구니 구매하기
      </button>
    </footer>
  );
}

export default Footer;

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
