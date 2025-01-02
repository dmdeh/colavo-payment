# colavo-payment

## 🚀 시작하기

```zsh
$ git clone https://github.com/dmdeh/colavo-payment.git

$ npm install
$ npm run dev
```

브라우저에서 http://localhost:5173/ 로 접속해주세요

## 📂 폴더 구조

```
📦src
 ┣ 📂components            # UI 컴포넌트 모음
 ┃ ┣ 📂CartItem            # 장바구니 항목 컴포넌트
 ┃ ┗ 📂Common              # 공용 컴포넌트
 ┃ ┃ ┣ 📂DropdownMenu
 ┃ ┃ ┣ 📂Loading
 ┃ ┃ ┗ 📂PriceFormatter
 ┣ 📂hooks                 # 커스텀 훅 : API 데이터 요청 함수 파일
 ┣ 📂pages                 # 페이지 컴포넌트
 ┣ 📂router                # 라우팅 설정
 ┣ 📂store                 # 전역 상태 관리 파일
 ┣ 📂styles                # 스타일 관련 파일
 ┣ 📂types                 # 타입 관리
 ┗ 📂utils                 # 유틸리티 함수 모음
```

## 🛠️ 기술 스택

- **Config**: Vite, npm
- **Core**: React, TypeScript
- **State Management**: Zustand
- **Styling**: Styled-components
- **UI Library**: Ant Design (antd)

## 🛠️ 트러블슈팅 및 고민했던 점

```
할인 항목을 장바구니에 추가하면 장바구니 아이템들이 전체 선택으로 할인 적용이 되고,
수정 후 완료 버튼을 누르면 저장되지만 드롭다운을 열면 전체 선택으로 초기화되는 문제 발생
```

```
드롭다운이 열리는 곳에서 문제가 있다고 판단하고 초기값 props 설정을 통해 시도,
조건문을 사용해 해결을 시도했지만 해결되지 않거나, 다른 문제를 겪었고
결과적으로는 전체 선택 코드가 들어있는 useEffect의 의존성 배열을 수정함으로 해결했습니다.

useEffect내에서 item의 id를 전체 선택하게 했었는데 의존성 배열의 serviceItems이
드롭다운이 열릴 때 serviceItems을 새로운 배열로 판단해 리렌더링 되며 전체실행이 되었던거 같습니다.
```

## ✅ 요구 사항

### 장바구니 페이지

- [x] 초기 상태는 빈 장바구니
- [x] 상단에 시술 버튼, 할인 버튼 표시 -> 해당 버튼 페이지로 라우팅
- [x] 장바구니에 담긴 내용이 변경될 때 마다 사용자에게 최종 금액을 표시
- [x] 가격 합계 표시

  - [x] 최종 금액은 `currency_code`에 따라 표시
  - `USD`: $1340, `KRW`: 30000원

- [x] 시술 페이지: 시술 가능한 `item` 목록을 보여주고 장바구니에 추가

  - [x] `item` 이름, 가격, 드롭다운 표시
  - [x] `item`의 수량 선택 가능 eg `item` x 3
  - [x] 수량 선택 드롭다운에서 삭제, 완료 버튼 표시
  - [x] 동일한 `item` 중복 추가 불가

- [x] 할인 페이지: 할인 가능한 `discount` 목록을 보여주고 장바구니에 추가

  - [x] `discount` 이름, 할인 적용한 아이템, 할인된 가격 표시
  - [x] `discount`의 할인 대상 `item`을 선택하지 않으면 장바구니에 담긴 모든 `item`을 할인 적용
  - [x] `discount`의 할인 대상 `item`을 선택한 경우 선택한 항목만 할인 적용
  - [x] 할인항목 수정 버튼 클릭 시 팝업으로 할인 대상 수정, 삭제 가능
