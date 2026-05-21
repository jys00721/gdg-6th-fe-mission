# ESLint와 Prettier

## ESLint란?

ESLint는 JavaScript나 React 코드에서 문법 오류, 잘못된 코드 습관, 일관되지 않은 코드 스타일을 찾아주는 도구이다.

예를 들어 사용하지 않는 변수, 잘못된 import, 권장되지 않는 문법 등을 알려준다.

## Prettier란?

Prettier는 코드의 줄바꿈, 들여쓰기, 따옴표 사용 방식 등을 자동으로 정리해주는 코드 포맷터이다.

코드의 동작을 바꾸는 것이 아니라, 코드의 모양을 보기 좋고 일관성 있게 만들어준다.

## ESLint와 Prettier의 차이

ESLint는 코드의 문제를 검사하는 도구이고, Prettier는 코드의 형식을 정리하는 도구이다.

즉 ESLint는 “이 코드에 문제가 있는가?”를 확인하고, Prettier는 “이 코드를 보기 좋게 정리할 수 있는가?”를 담당한다.

## 실제 적용

실제로 eslint 와 prettier를 적용 후 `npm run lint`와 `npm run format`을 통해 적용했을때 코드를 짜면서 놓쳤던 오류가 발생할만한 지점을 찾을 수 있었고, 코드의 스타일을 일관되게 통일 할 수 있었다.