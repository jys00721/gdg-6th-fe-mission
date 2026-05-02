# 자바 스크립트 정리
HTML 만으로는 페이지를 동적으로 만들 수 없기에 이를 위해 자바 스크립트가 등장하였다.

`<script src="./app.js"></script>` 와 같은 형식으로 HTML script 코드 안에 연결한다.

아래의 코드처럼 HTML 문서의 특정 id를 가진 텍스트를 바꿀 수 있다.

```
const number = document.getElementById("counting-num");
const incbutton = document.getElementById("increase");
let count = 0;
number.textContent = count;
function increaseCount() {
 count++; // count = count + 1
 number.textContent = count; // 숫자 변화 반영
}
incbutton.addEventListener("click",increaseCount);
```
script 태그를 사용할때는 body의 맨 아래에 위치해야 한다. 그 이유는 브라우저에서 HTML 문서 파일을 한줄 한줄 순차적으로 읽고 그 과정에서 script 태그를 발견하면 파싱을 중단하고 script 파일을 다운 받아 실행한뒤 이어서 HTML 을 파싱하기에 순서가 꼬일 수 있기 때문이다.

크롬의 V8 엔진과 NodeJS의 등장으로 더 쉽고 빠르게 개발을 할 수 있게 되었다.




