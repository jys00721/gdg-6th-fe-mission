# React

React는 웹 화면을 **컴포넌트 단위로 나누어 관리**하는 JavaScript 라이브러리이다.

컴포넌트는 화면을 구성하는 작은 UI 부품이다.

```text
Navbar, SearchBar, ProductList, Footer
```

이처럼 화면을 나누면 코드 재사용과 유지보수가 쉬워진다.

---

# Virtual DOM

기존 JavaScript는 실제 DOM을 직접 조작한다.

```js
document.querySelector("h1").innerText = "변경된 제목";
```

DOM 조작이 많아지면 브라우저 리소스를 많이 사용한다.

React는 **Virtual DOM**을 사용해 변경 내용을 먼저 계산한 뒤, 실제로 바뀐 부분만 Real DOM에 반영한다.

```text
상태 변경 → Virtual DOM 비교 → 변경된 부분만 Real DOM 반영
```

---

# State와 useState

일반 변수는 값이 바뀌어도 화면이 자동으로 다시 렌더링되지 않는다.

그래서 화면에 반영되어야 하는 값은 state로 관리한다.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

export default Counter;
```

```jsx
const [count, setCount] = useState(0);
```

| 코드       | 의미           |
| ---------- | -------------- |
| `count`    | 현재 상태값    |
| `setCount` | 상태 변경 함수 |
| `0`        | 초기값         |

state는 직접 수정하지 않고 `setCount()` 같은 변경 함수를 사용한다.

---

# 컴포넌트 생명주기

컴포넌트는 다음 과정을 거친다.

```text
Mount → Update → Unmount
```

| 단계    | 의미                                 |
| ------- | ------------------------------------ |
| Mount   | 화면에 처음 나타남                   |
| Update  | props나 state 변경으로 다시 렌더링됨 |
| Unmount | 화면에서 제거됨                      |

---

# React Hook

Hook은 함수형 컴포넌트에서 React 기능을 사용할 수 있게 해주는 함수이다.

| Hook          | 역할                  |
| ------------- | --------------------- |
| `useState`    | 상태 관리             |
| `useEffect`   | 렌더링 이후 작업 실행 |
| `useNavigate` | 페이지 이동           |

Hook 이름은 보통 `use`로 시작한다.

---

# useEffect

`useEffect`는 렌더링 이후 특정 작업을 실행할 때 사용한다.

예를 들어 서버 데이터 요청, 콘솔 확인, 상태 변화 감지 등에 사용한다.

```jsx
import { useEffect } from "react";

useEffect(() => {
  console.log("렌더링 완료");
}, []);
```

| 코드                           | 실행 시점                  |
| ------------------------------ | -------------------------- |
| `useEffect(() => {})`          | 렌더링될 때마다 실행       |
| `useEffect(() => {}, [])`      | 처음 한 번만 실행          |
| `useEffect(() => {}, [count])` | `count`가 바뀔 때마다 실행 |

---

# useNavigate

`useNavigate`는 React Router에서 페이지 이동을 할 때 사용하는 Hook이다.

```jsx
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/mypage")}>마이페이지 이동</button>;
}

export default Home;
```

자주 사용하는 형태는 다음과 같다.

```js
navigate("/home"); // home 페이지 이동
navigate(-1); // 뒤로 가기
navigate(1); // 앞으로 가기
```

---
