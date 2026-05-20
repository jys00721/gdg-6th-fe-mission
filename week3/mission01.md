# API

Application Programming Interface의 약어로
클라이언트와 서버 간의 데이터를 주고받는 통로 역할을 한다.

# fetch 함수

JS 표준 API 함수이다. 특징으로는 함수 사용시 비동기로 처리된다는 점이 있다.
그래서 then 처리가 필요하다.

# useEffect

외부의 효과를 랜더링과 분리하기 위해 존재한다.

```
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users/1/todos")
    .then((response) => response.json())
    .then((json) => setTodos(json));
}, []);
```

예시 코드처럼 외부 효과를 useEffect 안에 넣어준다.

# JSON

JSON은 JavaScript 객체 문법을 따르는 문자 기반의 데이터 포맷이다.
데이터에 접근하기 위해서는 문자열 형태의 JSON을 JavaScript에서 사용할 수 있는 객체 형태로 변환해야한다.

# 동기 / 비동기

```
console.log("fetch 시작");
fetch("https://jsonplaceholder.typicode.com/users/1/todos")
  .then((response) => response.json())
  .then((json) => console.log(json));
console.log("fetch 종료");
```

예시 코드를 실행하면 fetch 시작 문구가 콘솔에 나오고 데이터가 나온 뒤에 fetch 종료 문구가 출력될 것 같지만 실제로는 fetch 종료 문구가 데이터보다 먼저 출력된다.

이는 브라우저가 fetch 함수를 만나면 fetch 함수 작업이 끝나는걸 기다리지 않고 다음 코드를 먼저 실행하고 있다가 작업이 끝나면 그때 데이터를 받아보기 때문이다. 이 방식을 비동기 처리라고 한다.
