### Webpack을 사용하여 CRA 만들기

1. 필요한 모듈 설치하기

```bash
 npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
```

React + Webpack에서 JSX를 쓰려면 babel-loader + Babel preset이 필요
babel-loader : Webpack에서 Babel을 쓰도록 연결
@babel/preset-env : 최신 JS 문법 변환
@babel/preset-react : JSX 변환
