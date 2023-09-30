# Just Say!

외국어에 대한 두려움을 없애고 회화 연습을 하기 위해 AI와 다양한 상황속에서 외국어로 대화하는 웹입니다. 사용자가 원하는 언어, 도시, 상황을 선택할 수 있으며 커스터마이징된 AI와 대화를 할 수 있습니다.

> AI 해커톤에 제출한 작품을 다른 기술 스택으로 리팩토링하며 마이그레이션 진행 중입니다.

## Migration

### Stack

JavaScript -> TypeScript

React -> Next

Axios -> Fetch

Jotai -> Zustand

Styled Components -> TailwindCSS

### 진행 상황

<input type="checkbox" /> UI 마크업 (PC)

1. <input type="checkbox" checked /> 메인 페이지 마크업
2. <input type="checkbox" checked /> 선택 페이지 마크업
3. <input type="checkbox" checked /> 준비 페이지 마크업
4. <input type="checkbox" checked /> 대화 페이지 마크업
5. <input type="checkbox" checked /> 결과 페이지 마크업

<input type="checkbox" /> UI 마크업 (Mobile)

1. <input type="checkbox" /> 메인 페이지 마크업
2. <input type="checkbox" /> 선택 페이지 마크업
3. <input type="checkbox" /> 준비 페이지 마크업
4. <input type="checkbox" /> 대화 페이지 마크업
5. <input type="checkbox" /> 결과 페이지 마크업

<input type="checkbox" /> 기능 구현

1. <input type="checkbox" /> Web Speech API를 활용한 Speech to Text 기능
2. <input type="checkbox" /> OpenAI Chat Completions API를 활용한 대화 기능
3. <input type="checkbox" /> Amazon API를 활용한 Text to Speech 기능
4. <input type="checkbox" /> AI와 나눴던 대화 다시보기 기능
5. <input type="checkbox" /> 초보자를 위한 답변 추천 기능

<input type="checkbox" /> 공통 컴포넌트 구현

1. <input type="checkbox" /> Button 컴포넌트
2. <input type="checkbox" /> Container 컴포넌트
3. <input type="checkbox" /> Title 컴포넌트
4. <input type="checkbox" /> Modal 컴포넌트
5. <input type="checkbox" /> Toast 컴포넌트

## 주요 기능

- Web Speech API를 활용한 Speech to Text 기능
- OpenAI Chat Completions API를 활용한 대화 기능
- Amazon API를 활용한 Text to Speech 기능
- AI와 나눴던 대화 다시보기 기능
- 초보자를 위한 답변 추천 기능

## 구현 예정

- 사용자가 AI와 나눈 대화를 기준으로 피드백 기능
- API Token 관리를 위한 나눈 대화 요약 기능
- 영어 외의 다양한 언어 지원 (일본어)
- 카페 외의 다른 다양한 상황 지원 (공항, 택시)
- 대화를 진행 중에 랜덤으로 이벤트 발생 (카드 한도 초과 등..)
- Social Login 기능 (Kakao | Naver | Google)
- Database 연동 (MongoDB)
