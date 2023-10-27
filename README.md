# Just Say!

### 언어적 두려움을 극복하기 위해 다양한 상황에서 회화를 연습할 수 있는 목적으로 AI 기반의 Just Say를 개발했습니다

> AI 해커톤에 제출한 작품을 다른 기술 스택으로 리팩토링하며 마이그레이션 진행 중입니다.

## Migration

### Stack

JavaScript -> TypeScript

React -> Next

Axios -> Fetch

Jotai -> Zustand

Styled Components -> TailwindCSS

### 진행 상황

- [x] UI 마크업 (PC)

  - [x] 메인 페이지 마크업
  - [x] 선택 페이지 마크업
  - [x] 준비 페이지 마크업
  - [x] 대화 페이지 마크업
  - [x] 결과 페이지 마크업

- [x] UI 마크업 (Mobile)

  - [x] 메인 페이지 마크업
  - [x] 선택 페이지 마크업
  - [x] 준비 페이지 마크업
  - [x] 대화 페이지 마크업
  - [x] 결과 페이지 마크업

- [x] 기능 구현

  - [x] Web Speech API를 활용한 Speech to Text 기능
  - [x] OpenAI Chat Completions API를 활용한 대화 기능
  - [x] Web Speech API를 활용한 Text to Speech 기능
  - [x] AI와 나눴던 대화 다시보기 기능
  - [x] 초보자를 위한 답변 추천 기능

- [x] 공통 컴포넌트 구현

  - [x] Button 컴포넌트
  - [x] Container 컴포넌트
  - [x] Modal 컴포넌트

- [ ] 리팩토링

  - [ ] UI 로직과 비즈니스 로직 분리
  - [ ] 추상화 레벨 통일
  - [ ] 공통 관심사 커스텀 훅으로 묶기
  - [ ] 전체적인 변수 명 및 함수명 수정
  - [ ] fetch 함수 모듈화
  - [ ] 사용하지 않는 코드 제거
  - [ ] 공통된 함수 합치기 (gpt 호출 부분)
  - [ ] 에러 핸들링 부분 리팩토링

## What I Did

- Web Speech API를 활용한 Speech to Text 기능
- OpenAI Chat Completions API를 활용한 대화 기능
- Web Speech API를 활용한 Text to Speech 기능
- AI와 나눴던 대화 다시보기 기능
- 초보자를 위한 답변 추천 기능
- API Token 관리를 위한 나눈 대화 요약 기능

## Will Update

- [ ] GPT Function calling 기능으로 정형화된 반환값 받기기
- [ ] 사용자가 AI와 나눈 대화를 기준으로 피드백 기능
- [ ] STT 기능 Web Speech API => Google Speech To Text API로 전환
- [ ] TTS 기능 Web Speech API => Google Text To Speech API로 전환
- [ ] 영어 외의 다양한 언어 지원 (일본어, 한국어)
- [ ] 국제화 적용
- [ ] SEO
- [ ] 다크 모드 적용
- [ ] 카페 외의 다른 다양한 상황 지원 (공항, 택시)
- [ ] 대화를 진행 중에 랜덤으로 이벤트 발생 (카드 한도 초과 등..)
- [ ] Social Login 기능 (Kakao | Naver | Google)
- [ ] Database 연동 (MongoDB)

## Trouble Shooting

다양한 상황극에 맞게 GPT가 대답을 생성하기 위해서는 상황극에 맞는 초기 프롬프트를 제공해야 했습니다. 그러나 대화 진
행 중 초기 프롬프트 내용을 무시하여 자연스러운 대화를 제공하지 못하는 문제가 있었습니다. 이에 대한 대응책으로 일정
주기로 초기 프롬프트를 반복적으로 제공함으로써 이 문제를 해결했습니다. 그러나 대화가 길어지면서 요청할 수 있는 토큰
값이 초과되면 대화 자체가 중단되는 문제가 발생했습니다.

- 이와 같은 문제는 GPT API를 사용하는 많은 유저들이 겪을 거라고 생각했습니다.
- 그렇다면 공식 문서에서 해당 문제에 대한 Best Practice를 제공할 것이라고 생각했습니다.
- 그 후 OpenAI 공식 문서에서 제공하는 Best Practice를 참고하여 이전 대화 내용을 요약하는 기능을 구현했습니다.
- 하지만 해당 기능을 API 요청할 때마다 사용하는 것은 대화의 텀이 길어지고, 비용 문제가 생길 것이라 판단했습니다.
- 이를 해결하기 위해 GPT API에게 전송할 토큰 값을 체크하여 토큰 값이 한도에 가까웠을 때 해당 기능을 실행하도록 했
습니다.
