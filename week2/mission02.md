# React Router 적용

설치방법 : 터미널에 npm i react-router 입력
이후 main.jsx 파일에 공식문서 가이드라인 참고하여 아래와 같이 연결

```
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

# TailwindCSS 적용

Vite 프로젝트가 없다면

`npm create vite@latest my-project` 터미널에 입력하여 생성한다.

이후 npm을 이용하여

`npm install tailwindcss @tailwindcss/vite` 입력하여 설치한다.

vite.config.ts 파일에 아래와 같이 플러그인을 구성한다.

```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

index.css 파일에 `@import "tailwindcss";` 입력하여 가져온다.
