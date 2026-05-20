# fetch와 axios

## fetch

`fetch()`는 JavaScript에서 기본으로 제공하는 API 요청 함수이다.

별도의 설치 없이 사용할 수 있으며, 서버에서 데이터를 가져오거나 서버로 데이터를 보낼 때 사용한다.

```js
fetch("API 주소")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

---

## fetch의 특징

`fetch()`는 JavaScript 내장 함수이기 때문에 따로 설치할 필요가 없다.

하지만 서버에서 받은 응답 데이터를 바로 사용할 수 있는 것은 아니고, 보통 `.json()`을 사용해서 JavaScript 객체 형태로 변환해야 한다.

```js
fetch("https://jsonplaceholder.typicode.com/users/1/todos")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

위 코드에서 `response.json()`은 서버에서 받은 JSON 데이터를 JavaScript에서 사용할 수 있는 객체 형태로 바꿔주는 역할을 한다.

---

## axios

`axios`는 API 요청을 더 편리하게 처리할 수 있도록 도와주는 외부 라이브러리이다.

JavaScript에 기본으로 포함되어 있지 않기 때문에 따로 설치해서 사용해야 한다.

```bash
npm install axios
```

설치 후에는 import해서 사용할 수 있다.

```js
import axios from "axios";

axios.get("API 주소").then((response) => {
  console.log(response.data);
});
```

---

## axios의 특징

`axios`는 응답 데이터를 자동으로 처리해 준다.

그래서 `fetch()`처럼 `.json()`을 따로 작성하지 않아도 되고, 서버에서 받은 데이터는 보통 `response.data`로 바로 사용할 수 있다.

```js
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/users/1/todos")
  .then((response) => {
    console.log(response.data);
  });
```

---

## fetch와 axios의 차이

| 구분        | fetch                  | axios                  |
| ----------- | ---------------------- | ---------------------- |
| 종류        | JavaScript 내장 함수   | 외부 라이브러리        |
| 설치        | 필요 없음              | 설치 필요              |
| JSON 변환   | `response.json()` 필요 | 자동 처리              |
| 데이터 접근 | 변환 후 사용           | `response.data`로 접근 |
| 사용 편의성 | 기본적인 기능 제공     | 더 편리한 기능 제공    |

---

## fetch 예시

```js
fetch("https://jsonplaceholder.typicode.com/users/1/todos")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("에러 발생:", error);
  });
```

`fetch()`는 응답을 받은 뒤 `.json()`으로 데이터를 변환하고, 변환된 데이터를 `data`로 받아 사용한다.

---

## axios 예시

```js
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/users/1/todos")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log("에러 발생:", error);
  });
```

`axios`는 서버에서 받은 데이터가 `response.data`에 들어 있기 때문에 더 간단하게 사용할 수 있다.
