# 프로젝트 폴더 구조

## 폴더 구조를 정리하는 이유

폴더 구조를 정리하는 이유는 코드의 역할을 쉽게 파악하기 위해서이다.

예를 들어 상품 목록 화면을 수정해야 하는데, 관련 코드가 `App.jsx`, `Home.jsx`, `Item.jsx`, `productApi.js`, `productStore.js` 등에 흩어져 있다면 어디를 수정해야 하는지 찾기 어렵다.

반대로 폴더가 역할별로 정리되어 있으면 필요한 코드를 빠르게 찾을 수 있다.

```txt
components → 재사용 가능한 컴포넌트
pages → 페이지 단위 컴포넌트
hooks → 커스텀 훅
utils → 공통 함수
apis → API 요청 함수
styles → 스타일 관련 파일
store → 전역 상태 관리
```

이처럼 폴더 이름만 봐도 어떤 역할의 코드가 들어있는지 알 수 있게 만드는 것이 좋다.

---

## 자주 사용하는 React 폴더 이름과 역할

React 프로젝트에서 자주 사용하는 폴더는 아래와 같다.

```txt
src/
├── apis/
├── assets/
├── components/
├── hooks/
├── pages/
├── store/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

각 폴더는 담당하는 역할이 다르다.

---

## components 폴더

`components` 폴더에는 여러 곳에서 재사용할 수 있는 UI 컴포넌트를 넣는다.

예를 들어 다음과 같은 컴포넌트가 들어갈 수 있다.

```txt
components/
├── Header.jsx
├── Footer.jsx
├── Navbar.jsx
├── Button.jsx
├── Item.jsx
└── SearchBar.jsx
```

`components` 폴더에 들어가는 컴포넌트는 특정 페이지에만 강하게 묶이지 않고, 여러 화면에서 사용할 수 있는 경우가 많다.

예를 들어 `Header`는 홈 화면, 관리자 화면, 장바구니 화면 등 여러 페이지에서 공통으로 사용할 수 있다.

`Item` 컴포넌트도 상품 하나를 보여주는 역할만 담당한다면, 여러 상품 목록 화면에서 재사용할 수 있다.

---

## pages 폴더

`pages` 폴더에는 페이지 단위의 컴포넌트를 넣는다.

페이지 컴포넌트는 라우팅과 연결되는 큰 화면 단위라고 생각하면 된다.

```txt
pages/
├── Home.jsx
├── Admin.jsx
├── Cart.jsx
└── NotFound.jsx
```

예를 들어 `/` 주소로 접속했을 때 보여줄 화면은 `Home.jsx`, `/admin` 주소로 접속했을 때 보여줄 화면은 `Admin.jsx`가 될 수 있다.

`pages` 폴더의 컴포넌트는 보통 여러 개의 작은 컴포넌트를 조합해서 하나의 화면을 만든다.

```jsx
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <ItemList />
      <Footer />
    </>
  );
}

export default Home;
```

즉, `pages`는 전체 화면 구조를 담당하고, `components`는 화면을 이루는 작은 부품을 담당한다.

---

## hooks 폴더

`hooks` 폴더에는 Custom Hook을 넣는다.

Custom Hook은 여러 컴포넌트에서 반복되는 React Hook 로직을 분리한 함수이다.

```txt
hooks/
├── useProducts.js
├── useInput.js
└── useCart.js
```

예를 들어 여러 컴포넌트에서 상품 데이터를 불러오는 로직을 반복해서 작성하고 있다면, `useProducts`라는 Custom Hook으로 분리할 수 있다.

```js
import { useEffect, useState } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/item.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return products;
}

export default useProducts;
```

이렇게 하면 컴포넌트에서는 복잡한 데이터 요청 로직을 직접 작성하지 않고 Hook만 사용할 수 있다.

```jsx
import useProducts from "../hooks/useProducts";

function ProductList() {
  const products = useProducts();

  return (
    <div>
      {products.map((product) => (
        <p key={product.itemName}>{product.itemName}</p>
      ))}
    </div>
  );
}

export default ProductList;
```

---

## utils 폴더

`utils` 폴더에는 여러 곳에서 사용할 수 있는 공통 함수를 넣는다.

```txt
utils/
├── formatPrice.js
├── filterProducts.js
└── calculateTotalPrice.js
```

예를 들어 가격에 쉼표를 붙이는 함수는 여러 컴포넌트에서 사용할 수 있다.

```js
function formatPrice(price) {
  return price.toLocaleString();
}

export default formatPrice;
```

컴포넌트에서는 이렇게 사용할 수 있다.

```jsx
import formatPrice from "../utils/formatPrice";

function Item({ item }) {
  return <p>{formatPrice(item.price)}원</p>;
}

export default Item;
```

이렇게 공통 함수를 `utils`로 분리하면 같은 코드를 여러 번 작성하지 않아도 된다.

---

## apis 폴더

`apis` 폴더에는 서버와 통신하는 API 요청 함수를 넣는다.

```txt
apis/
└── productApi.js
```
컴포넌트에서 직접 `fetch`를 작성하면 컴포넌트가 너무 많은 역할을 하게 된다.

따라서 API 요청 로직은 `apis` 폴더로 분리하는 것이 좋다.

---

## styles 폴더

`styles` 폴더에는 공통 스타일 파일이나 전역 CSS 파일을 넣을 수 있다.

```txt
styles/
├── global.css
└── reset.css
```

Tailwind CSS를 사용하는 경우에는 컴포넌트 안에서 className을 직접 작성하는 경우가 많지만, 공통 스타일이나 전역 스타일은 별도 파일로 관리할 수 있다.

예를 들어 전체 페이지의 기본 여백, 폰트, 배경색 같은 스타일은 전역 CSS에서 관리할 수 있다.

---

## assets 폴더

`assets` 폴더에는 이미지, 아이콘, 폰트 같은 정적 파일을 넣는다.

```txt
assets/
├── images/
├── icons/
└── fonts/
```

예를 들어 로고 이미지나 버튼 아이콘처럼 코드에서 import해서 사용하는 파일을 넣을 수 있다.

---

# 폴더 구조 리팩토링 설명

## 리팩토링 전 폴더 구조

처음 프로젝트의 `src` 폴더는 다음과 같이 구성되어 있었다.

```txt
src/
  apis/
    productApi.js
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    Content.jsx
    Footer.jsx
    Item.jsx
    Navbar.jsx
  data/
    mockData.js
  pages/
    Admin.jsx
    CategoryFilter.jsx
    Home.jsx
    PriceFilter.jsx
    ProductSort.jsx
  App.css
  App.jsx
  index.css
  main.jsx
```

기존 구조는 페이지, 컴포넌트, API 파일이 분리되어 있어 기본적인 역할 구분은 되어 있었다. 하지만 현재 앱에서 사용하지 않는 파일도 함께 남아 있었고, 상태 관리 로직이 각 페이지와 컴포넌트 내부에 흩어져 있었다.

## 리팩토링 후 폴더 구조

`src` 폴더를 다음과 같이 정리했다.

```txt
src/
  api/
    productApi.js
  components/
    Footer.jsx
    Navbar.jsx
    ProductItem.jsx
  pages/
    Admin.jsx
    CategoryFilter.jsx
    Home.jsx
    PriceFilter.jsx
    ProductSort.jsx
  store/
    productStore.js
  App.jsx
  index.css
  main.jsx
```
## 이렇게 변경한 이유

### 1. 프로젝트 파악이 쉬워진다

불필요한 파일을 제거하고 주요 파일을 역할별 폴더에 배치하면 처음 프로젝트를 보는 사람도 구조를 빠르게 이해할 수 있다.

예를 들어 상품 데이터를 확인하려면 `api`, 상태 흐름을 확인하려면 `store`, 화면을 확인하려면 `pages`를 보면 된다.

### 2. 상태 관리 위치가 명확해진다

기존에는 상태가 여러 페이지와 컴포넌트에 흩어져 있었다. 이 방식은 프로젝트가 커질수록 같은 상태를 여러 곳에서 중복 관리하게 될 가능성이 있다.

zustand store로 상태를 이동하면서 상품 관련 상태를 한 곳에서 관리할 수 있게 되었다. 특히 장바구니 수량이나 남은 재고처럼 여러 화면에서 공유될 수 있는 상태는 전역 store에서 관리하는 편이 더 적절하다.

### 3. 유지보수가 쉬워진다

검색, 필터링, 정렬, 장바구니 로직이 흩어져 있으면 기능 수정 시 여러 파일을 함께 확인해야 한다.

현재는 상품 관련 로직이 `productStore.js`에 모여 있기 때문에 기능 수정 위치를 찾기 쉽다.

예를 들어 가격 필터 조건을 수정하고 싶다면 `PriceFilter.jsx`의 UI보다 `productStore.js`의 `applyPriceFilter` 액션을 먼저 확인하면 된다.