# React

## 1. React란?

React는 웹페이지의 화면, 즉 UI를 만들기 위한 JavaScript 라이브러리이다.  
복잡한 화면을 작은 조각으로 나누어 만들 수 있게 해준다.

---

## 2. 컴포넌트

React의 핵심은 컴포넌트(Component)이다.  
컴포넌트는 화면을 구성하는 독립적인 UI 조각이다.

예를 들어 하나의 페이지를 이렇게 나눌 수 있다.

```text
App
├─ Navbar
├─ Content
└─ Footer
```

각 컴포넌트는 자기 역할만 담당한다.

---

## 3. JSX

JSX는 JavaScript 안에서 HTML처럼 화면을 작성하는 문법이다. 자바스크립트의 확장팩이라고 생각하면 된다.

```jsx
function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <button>클릭</button>
    </div>
  );
}
```

## 4. 라이브러리와 프레임워크의 차이

라이브러리는 개발자들의 도서관이다.

개발자가 필요한 기능만 라이브러리에서 가져와 사용한다.

예를 들어 React는 UI를 만들 때 필요한 기능을 제공하는 JavaScript 라이브러리이다.

---

프레임워크는 개발 방식과 구조가 어느 정도 정해져 있는 개발 틀이다.

개발자는 프레임워크가 정해 놓은 규칙 안에서 코드를 작성한다.

예를 들어 Next.js, Vue, Angular 같은 도구는 프레임워크에 가깝다.
