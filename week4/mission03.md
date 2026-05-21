# 상태 관리 정리

## 상태 관리의 필요성

React에서 화면에 따라 변하는 데이터를 상태(state)라고 한다.

예를 들어 쇼핑몰 프로젝트에서는 다음과 같은 값들이 상태가 될 수 있다.

- 검색어
- 상품 목록
- 선택한 카테고리
- 장바구니에 담긴 상품
- 로그인 여부
- 로딩 상태
- 에러 메시지

React에서는 기본적으로 `useState`를 사용해서 상태를 관리할 수 있다.

```jsx
const [searchText, setSearchText] = useState("");
```

하지만 프로젝트가 커질수록 단순히 `useState`만으로 상태를 관리하기 어려워질 수 있다.

---

## useState만으로 상태 관리가 어려운 이유

`useState`는 하나의 컴포넌트 안에서 상태를 관리할 때는 간단하고 편리하다.

하지만 여러 컴포넌트가 같은 데이터를 사용해야 할 때 문제가 생긴다.

예를 들어 상품 검색어를 `Home` 페이지에서 관리하고 있는데, 그 검색어를 `SearchBar`, `ProductList`, `FilterButton` 같은 여러 컴포넌트에서 함께 사용해야 한다고 해보자.

이 경우 상위 컴포넌트에서 상태를 만들고, 자식 컴포넌트에게 `props`로 계속 전달해야 한다.

```jsx
function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <ProductList searchText={searchText} />
    </>
  );
}
```

이 정도는 괜찮지만 컴포넌트 구조가 깊어지면 문제가 된다.

```txt
Home
└── MainLayout
    └── ProductSection
        └── ProductList
            └── ProductItem
```

만약 `ProductItem`에서 `searchText`가 필요하다면 중간 컴포넌트들이 직접 사용하지 않더라도 계속 `props`로 전달해야 한다.

이런 현상을 **props drilling**이라고 한다.

---

## Props Drilling

**Props Drilling**은 상위 컴포넌트의 데이터를 하위 컴포넌트로 전달하기 위해 여러 단계의 컴포넌트를 거쳐 `props`를 계속 내려보내는 상황을 말한다.

예를 들어 다음과 같은 구조가 있을 수 있다.

```jsx
function Page() {
  const [user, setUser] = useState(null);

  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Header user={user} />;
}

function Header({ user }) {
  return <UserInfo user={user} />;
}

function UserInfo({ user }) {
  return <p>{user.name}</p>;
}
```

여기서 `Layout`과 `Header`는 `user` 데이터를 직접 사용하지 않는다.

하지만 `UserInfo`까지 전달하기 위해 어쩔 수 없이 `props`를 받고 다시 넘겨준다.

이렇게 되면 코드가 복잡해지고 나중에 상태 이름이나 구조가 바뀌었을 때 여러 컴포넌트를 함께 수정해야 한다.

---

## 상태 관리가 필요한 이유

상태 관리는 단순히 데이터를 저장하는 것이 아니라, 여러 컴포넌트가 데이터를 일관성 있게 사용할 수 있도록 관리하는 것이다.

상태 관리가 필요한 이유는 다음과 같다.

### 1. 데이터 일관성 유지

여러 컴포넌트가 같은 데이터를 사용할 때, 데이터가 서로 다르게 관리되면 화면에 표시되는 정보가 달라질 수 있다.

예를 들어 장바구니 상품 개수를 `Header`에서도 보여주고, `CartPage`에서도 보여준다고 해보자.

각 컴포넌트가 따로 상태를 가지면 장바구니 개수가 서로 다르게 보일 수 있다.

따라서 공통으로 사용하는 상태는 한 곳에서 관리하는 것이 좋다.

---

### 2. 유지보수성 향상

상태가 여러 컴포넌트에 흩어져 있으면 나중에 수정하기 어렵다.

반대로 상태를 한 곳에서 관리하면 어떤 데이터가 어디서 바뀌는지 파악하기 쉬워진다.

예를 들어 로그인 상태를 여러 컴포넌트에서 각각 관리하는 것보다, 전역 상태로 관리하면 로그인 여부를 확인하는 코드가 훨씬 단순해진다.

---

### 3. 중복 코드 감소

여러 컴포넌트에서 같은 상태 관리 로직을 반복해서 작성하면 코드가 길어지고 실수할 가능성이 커진다.

상태 관리 도구나 Custom Hook을 사용하면 반복되는 로직을 줄일 수 있다.

---

### 4. 컴포넌트 구조 단순화

상태를 전역으로 관리하면 불필요하게 `props`를 여러 단계로 전달하지 않아도 된다.

그러면 컴포넌트는 자신이 맡은 역할에 더 집중할 수 있다.

---

## Context

React에는 상태 관리를 돕기 위한 내장 기능으로 **Context**가 있다.

Context는 데이터를 여러 컴포넌트에 깊게 전달해야 할 때 사용할 수 있는 기능이다.

즉, 부모에서 자식으로 `props`를 계속 내려보내지 않고도 필요한 컴포넌트에서 데이터를 바로 사용할 수 있게 해준다.

예를 들어 로그인한 사용자 정보, 테마 설정, 언어 설정처럼 여러 컴포넌트에서 공통으로 필요한 데이터를 관리할 때 사용할 수 있다.

---

## Context를 사용하는 이유

Context를 사용하면 props drilling 문제를 줄일 수 있다.

기존 방식은 다음과 같다.

```jsx
<Page user={user} />
<Layout user={user} />
<Header user={user} />
<UserInfo user={user} />
```

Context를 사용하면 중간 컴포넌트를 거치지 않고 필요한 컴포넌트에서 바로 데이터를 꺼내 쓸 수 있다.

```jsx
const user = useContext(UserContext);
```

이렇게 하면 중간 컴포넌트들이 불필요하게 `props`를 전달하지 않아도 된다.

---

## 상태 관리 라이브러리를 사용하는 이유

React에는 Context라는 내장 기능이 있지만, 프로젝트가 커지면 더 체계적인 상태 관리가 필요해진다.

그래서 Zustand, Jotai, Recoil, Redux 같은 상태 관리 라이브러리를 사용한다.

상태 관리 라이브러리를 사용하는 이유는 다음과 같다.

- 전역 상태를 더 쉽게 관리할 수 있다.
- props drilling을 줄일 수 있다.
- 상태 변경 로직을 한 곳에 모을 수 있다.
- 여러 컴포넌트에서 같은 상태를 쉽게 공유할 수 있다.
- 코드 구조를 더 명확하게 만들 수 있다.
- 복잡한 상태를 관리하기 쉬워진다.

---

## Zustand

Zustand는 가볍고 사용법이 간단한 상태 관리 라이브러리이다.

다른 라이브러리인 Redux보다 코드가 짧고 설정이 단순하다.

작은 프로젝트나 중간 규모 프로젝트에서 사용하기 좋다.

예를 들어 쇼핑몰 프로젝트에서 장바구니 상태, 상품 필터 상태, 로그인 상태 등을 간단히 관리할 수 있다.