# 동기란?

동기는 코드가 위에서 아래로 **순서대로 실행되는 방식**이다.

앞의 작업이 끝나야 다음 작업이 실행된다.

```js
console.log("1번");
console.log("2번");
console.log("3번");
```

실행 결과:

```txt
1번
2번
3번
```

---

# 비동기란?

비동기는 시간이 오래 걸리는 작업을 기다리지 않고 다음 코드를 먼저 실행하는 방식이다.

대표적인 비동기 작업에는 API 요청, `fetch`, `setTimeout` 등이 있다.

```js
console.log("fetch 시작");

fetch("https://jsonplaceholder.typicode.com/users/1/todos")
  .then((response) => response.json())
  .then((json) => console.log(json));

console.log("fetch 종료");
```

실행 순서:

```txt
fetch 시작
fetch 종료
데이터 출력
```

---

## Promise

`Promise`는 비동기 작업의 결과를 다루기 위한 객체이다.

비동기 작업이 성공했을 때는 `.then()`을 사용하고, 실패했을 때는 `.catch()`를 사용한다.

```js
fetch("https://example.com")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

---

## 콜백 함수

콜백 함수는 다른 함수의 인자로 전달되어 특정 작업이 끝난 뒤 실행되는 함수이다.

```js
setTimeout(() => {
  console.log("3초 뒤 실행");
}, 3000);
```

---

## async / await

`async / await`는 비동기 코드를 동기 코드처럼 읽기 쉽게 작성하는 문법이다.

```js
async function getTodos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos",
  );
  const data = await response.json();

  console.log(data);
}
```

`await`는 비동기 작업이 끝날 때까지 기다린 뒤 다음 코드를 실행한다.
