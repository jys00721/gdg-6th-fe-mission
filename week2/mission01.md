# CSS 정리

## 1. CSS 기본 개념

CSS는 HTML 요소의 디자인과 배치를 지정하는 언어이다.

기본 문법은 다음과 같다.

```css
선택자 {
  속성: 값;
}
```

예시:

```css
p {
  color: blue;
}
```

---

## 2. 셀렉터

셀렉터는 스타일을 적용할 HTML 요소를 선택하는 방법이다.

| 선택자 | 의미 | 예시 |
|---|---|---|
| 태그 선택자 | 태그 이름으로 선택 | `h1` |
| 클래스 선택자 | 클래스 이름으로 선택 | `.title` |
| 아이디 선택자 | 아이디 이름으로 선택 | `#main` |
| 전체 선택자 | 모든 요소 선택 | `*` |

예시:

```css
.title {
  font-size: 24px;
}
```

```html
<h1 class="title">제목</h1>
```

---

## 3. CSS 단위

CSS에서 크기나 길이를 지정할 때는 단위를 사용한다.

| 단위 | 의미 |
|---|---|
| `px` | 고정 크기 |
| `%` | 부모 요소 기준 비율 |
| `em` | 부모 글자 크기 기준 |
| `rem` | HTML 기본 글자 크기 기준 |
| `vw` | 화면 너비 기준 |
| `vh` | 화면 높이 기준 |

---

## 4. 박스 모델

HTML 요소는 기본적으로 박스 구조를 가진다.

```text
content → padding → border → margin
```

| 구성 요소 | 의미 |
|---|---|
| `content` | 실제 내용 |
| `padding` | 안쪽 여백 |
| `border` | 테두리 |
| `margin` | 바깥 여백 |

예시:

```css
.box {
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
}
```

---

## 5. 요소 표시와 배치

### display

`display`는 요소가 화면에 배치되는 방식을 정한다.

```css
display: block;
display: inline;
display: flex;
display: none;
```

- `block` → 한 줄 전체 차지
- `inline` → 내용 크기만큼 차지
- `flex` → 요소 정렬에 사용
- `none` → 화면에서 제거

### position

`position`은 요소의 위치를 정할 때 사용한다.

| 값 | 의미 |
|---|---|
| `static` | 기본 위치 |
| `relative` | 원래 위치 기준 이동 |
| `absolute` | 부모 요소 기준 이동 |
| `fixed` | 화면 기준 고정 |
| `sticky` | 스크롤에 따라 고정 |

---

## 6. Flex 정렬

Flex는 요소를 가로 또는 세로로 쉽게 정렬할 때 사용한다.

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- `justify-content` → 주축 방향 정렬
- `align-items` → 교차축 방향 정렬

---

# 일반 CSS와 CSS Modules

## 1. 일반 CSS

일반 CSS는 `.css` 파일을 만들어 컴포넌트에서 import해서 사용한다.

```jsx
import "./Button.css";

function Button() {
  return <button className="button">버튼</button>;
}
```

특징은 스타일이 전역으로 적용된다는 점이다.

즉, 다른 컴포넌트에서도 같은 클래스 이름을 사용하면 스타일이 충돌할 수 있다.

```css
.button {
  background-color: blue;
}
```

---

## 2. CSS Modules

CSS Modules는 컴포넌트 단위로 스타일을 관리하는 방식이다.

파일 이름은 `.module.css` 형식으로 작성한다.

```text
Button.module.css
```

사용 예시는 다음과 같다.

```jsx
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>버튼</button>;
}
```

CSS Modules에서는 클래스 이름을 문자열로 쓰지 않고 객체처럼 사용한다.

```jsx
className={styles.button}
```

---

## 3. CSS Modules의 특징

CSS Modules를 사용하면 클래스 이름이 자동으로 고유한 이름으로 변환된다.

예를 들어 개발자가 작성한 클래스는 다음과 같다.

```css
.button {
  background-color: red;
}
```

실제 브라우저에서는 다음처럼 변환될 수 있다.

```html
<button class="Button_button__a1B2c">버튼</button>
```

그래서 여러 컴포넌트에서 `.button`이라는 같은 이름을 사용해도 서로 충돌하지 않는다.

---

## 4. 일반 CSS와 CSS Modules 비교

| 구분 | 일반 CSS | CSS Modules |
|---|---|---|
| 확장자 | `.css` | `.module.css` |
| 적용 범위 | 전역 | 컴포넌트 단위 |
| 클래스 충돌 | 발생 가능 | 거의 없음 |
| 사용 방식 | `className="button"` | `className={styles.button}` |
| 적합한 용도 | 공통 스타일 | 개별 컴포넌트 스타일 |
