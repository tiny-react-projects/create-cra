## Webpack과 Babel를 사용하여 CRA 만들기

## 실행 과정

### 1. 필요한 모듈 설치

```bash
 npm install --save-dev webpack webpack-cli webpack-dev-server
```

```md
    webpack : 프로젝트의 자바스크립트, CSS, 이미지 등 리소스를 하나 또는 여러 개의 번들로 합치는 핵심 패키지
    webpack-cli: 터미널에서 webpack 명령어를 사용할 수 있게 해주는 도구
    webpack-dev-server: 로컬 개발용 서버를 제공 (변경 사항 저장 시 브라우저 자동 새로고침(Hot Reload) 지원)
```

```bash
 npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
```

```md
    babel-loader : Webpack에서 Babel을 쓰도록 연결
    @babel/core: Babel의 트랜스파일(transpile) 기능을 실제로 수행하는 모듈
    @babel/preset-env : 최신 JS 문법 변환
    @babel/preset-react : JSX 변환
```

```bash
 npm install --save-dev style-loader css-loader
```

### 2. babel, webpack config 파일 작성

## 알게 된 점

### 1. 개발용 번들 vs 배포용 번들

a) 개발용 번들

- 개발용 번들은 실제 디스크에 쓰이지 않고 메모리(RAM)에만 존재
- 이유는 개발 중에는 **빠른 빌드와 HMR(Hot Module Replacement)**이 중요
- 브라우저가 /bundle.js를 요청하면 DevServer가 메모리에서 바로 전달 (서버가 켜져 있는 동안만 번들이 존재)

```md
서버 켜짐 → 브라우저 요청 → DevServer가 메모리에서 bundle.js 제공 → 화면 표시 ✅
서버 종료 → 브라우저 요청 → bundle.js 없음 ❌
```

b) 배포용 번들

- 배포용 번들은 실제 디스크에 저장 (dist/bundle.js) (npm run build → Webpack이 dist/bundle.js를 디스크에 저장)
- 배포용 번들은 서버가 실제 파일을 클라이언트에 제공해야 함. 메모리만 제공하면 서버가 꺼졌을 때 파일을 못 읽음. 따라서 실제 파일 생성이 필수

| 항목 | 개발용 (serve)        | 배포용 (build)           |
| ---- | --------------------- | ------------------------ |
| 위치 | 메모리                | 실제 `dist/` 폴더        |
| 속도 | 빠름                  | 느림 (압축, 최적화 포함) |
| 목적 | 개발 중 실시간 테스트 | 서버 배포용              |
| HMR  | 지원                  | 필요 없음                |

### 2. webpack의 개발 서버 (webpack dev server)

- 주로 개발용으로 사용
- 정적 파일만 제공: 번들된 JS/CSS/HTML을 브라우저에 서빙
- 서버 자체가 Node.js에서 동적으로 렌더링하지 않음
- 요청이 들어오면 그냥 “정적 파일 제공 → 브라우저가 JS 실행 → 화면 렌더링” 흐름
- 클라이언트 사이드 렌더링(CSR) 방식과 함께 사용. SSR 기능은 없다.

### 3. webpack의 css파일 읽기

- Webpack은 자바스크립트 모듈 번들러
- JS 파일을 분석하고, import/export를 따라가면서 **하나의 JS 파일(bundle.js)**로 합치는 역할 ( JS 문법만 기본적으로 이해)
- Webpack은 JS 전용이기 때문에, CSS나 이미지, 폰트 같은 다른 타입 파일은 Loader가 필요

```md
- css-loader → CSS를 JS 모듈로 변환
- style-loader → 변환된 CSS를 <style> 태그로 브라우저에 적용
- 예를들어, CSS → css-loader + style-loader, 이미지 → file-loader / asset modules, SCSS → sass-loader + css-loader + style-loader
```
