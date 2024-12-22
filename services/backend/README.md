# Todos Backend

이 폴더(services/backend) 내부의 모든 코드는 [wanted-pre-onboarding-challenge-api](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)로부터 clone 되었습니다.

## 과제 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

# 2-1) API 실행

```bash
> pnpm install

> pnpm start # http://localhost:8080
```

# 2-2) API 스펙

## [Todos](#todos)

- [getTodos](#getTodos)
- [getTodoById](#getTodoById)
- [createTodo](#createTodo)
- [updateTodo](#updateTodo)
- [deleteTodo](#deleteTodo)

## [Auth](#auth)

- [login](#login)
- [signUp](#signUp)

# <span id="todos">2-3) Todos</span>

## getTodos

### URL

- GET `/todos`
- Headers
  - Authorization: login token

### Query Parameters

- **sort** (string, optional): 정렬 기준 (`createdAt`, `updatedAt`, `priority`)
- **order** (string, optional): 정렬 순서 (`asc` 또는 `desc`)
- **priorityFilter** (string, optional): 우선순위 필터링 (`urgent`, `normal`, `low`)
- **keyword** (string, optional): 제목 또는 내용에서 검색할 키워드
- **countOnly** (boolean, optional): `true`로 설정하면 할 일의 개수만 반환

### 응답 예시

```json
{
  "data": [
    {
      "title": "hi",
      "content": "hello",
      "id": "z3FGrcRL55qDCFnP4KRtn",
      "createdAt": "2022-07-24T14:15:55.537Z",
      "updatedAt": "2022-07-24T14:15:55.537Z",
      "priority": "urgent"
    },
    {
      "title": "hi",
      "content": "hello",
      "id": "z3FGrcRL55qDCFnP4KRtn",
      "createdAt": "2022-07-24T14:15:55.537Z",
      "updatedAt": "2022-07-24T14:15:55.537Z",
      "priority": "normal"
    }
  ]
}
```

예시 사용법:

- **우선순위 필터링**: `/todos?priorityFilter=urgent`
- **키워드 검색**: `/todos?keyword=meeting`
- **정렬 및 순서 지정**: `/todos?sort=createdAt&order=desc`
- **조합된 조건**: `/todos?priorityFilter=normal&sort=updatedAt&order=asc&keyword=project`

---

## getTodoById

### URL

- GET `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "hi",
    "content": "hello",
    "id": "z3FGrcRL55qDCFnP4KRtn",
    "createdAt": "2022-07-24T14:15:55.537Z",
    "updatedAt": "2022-07-24T14:15:55.537Z",
    "priority": "urgent"
  }
}
```

---

## createTodo

### URL

- POST `/todos`
- Parameters
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "hi",
    "content": "hello",
    "id": "z3FGrcRL55qDCFnP4KRtn",
    "createdAt": "2022-07-24T14:15:55.537Z",
    "updatedAt": "2022-07-24T14:15:55.537Z",
    "priority": "normal"
  }
}
```

---

## updateTodo

### URL

- PUT `/todos/:id`
- Parameters
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "제목 변경",
    "content": "내용 변경",
    "id": "RMfi3XyOKoI5zd0A_bsPL",
    "createdAt": "2022-07-24T14:25:48.627Z",
    "updatedAt": "2022-07-24T14:25:48.627Z",
    "priority": "urgent"
  }
}
```

---

## deleteTodo

### URL

- DELETE `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": null
}
```

---

# <span id="auth">2-4) Auth</span>

## login

### URL

- POST `/users/login`
- Parameters
  - email: string
  - password: string

### 응답 예시

```json
{
  "message": "성공적으로 로그인 했습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

---

## signUp

### URL

- POST `/users/create`
- Parameters
  - email: string
  - password: string

### 응답 예시

```json
{
  "message": "계정이 성공적으로 생성되었습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```
