# 모노레포 프로젝트

이 프로젝트는 프론트엔드와 백엔드 서비스를 포함한 모노레포 구조로 구성되어 있습니다. 원티드 2024년 11월 프리온보딩 사전과제 진행를 위해 제작되었습니다.

## Backend 서비스

이 프로젝트의 백엔드 코드는 [wanted-pre-onboarding-challenge-api](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)에서 가져온 것으로, 원 저작자의 라이선스를 준수하며 사용하고 있습니다. 해당 코드는 독립적으로 관리되며, 원본 코드와 동기화 여부는 보장되지 않습니다.

- **출처**: [wanted-pre-onboarding-challenge-api](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)
- **라이선스**: ISC

### 관리 방식

백엔드 코드는 모노레포 내의 `/services/backend` 디렉터리에 위치하지만, 외부 출처와는 별도로 독립적으로 관리됩니다.  
따라서 이 코드는 원본 프로젝트의 최신 버전과 동기화되지 않을 수 있습니다.

## Frontend 서비스

### 개요

- 규모: 개인 프로젝트 (2024.11.14 ~ 2024.12.21)
- **데이터 페칭 최적화**를 위해 Loader에 queryClient를 주입하여 캐싱 효율을 극대화
- Provider 패턴, 단일 책임 원리, CCP 패턴 등을 적용해 **코드의 모듈성과 유지보수성**을 개선
- **코드의 안정성**을 위해 TypeScript와 Linter를 적용
- **React Portal**을 이용한 모달 구현
- **Context**를 이용한 토스트 구현

### 기능

- 할 일 등록/수정/삭제
- 할 일 필터/정렬/검색
- 로그인/로그아웃, 회원가입
- 로그인 여부에 따른 redirect

### 개발 배경

원티드 2024년 11월 프리온보딩 과정에서 멘토님의 라이브 코드 리뷰를 통해 사전 과제로 제출된 코드에 대한 심도 깊은 피드백을 받을 수 있었습니다. 다른 참가자분들의 다양한 구현 방식을 관찰하며 기존의 접근 방식을 넘어 **새로운 방법으로 코드를 작성해보고자 하는 도전 의식**이 생겼습니다.

이에 따라 폴리 레포를 모노 레포로 전환하거나, 패키지 매니저를 변경해보는 시도는 물론, 스타일링을 기존의 module CSS에서 JS-in-CSS로 전환하는 등의 다양한 실험을 통해 기술적 역량과 시야를 넓히는 데 주력했습니다.

### 기술 스택

```json
{
  "라이브러리": "React",
  "빌드": "Vite",
  "트랜스파일 언어": "TypeScript",
  "상태관리": ["TanStack Query", "Zustand"],
  "스타일링": "Emotion",
  "HTTP 클라이언트": "Axios",
  "코드 품질 관리": ["ESLint", "TypeScript ESLint"],
  "패키지 매니저": "pnpm"
}
```

### 트러블 슈팅

#### react-router loader와 tanstackQuery 캐싱

- **[문제점]** `react-router`의 `loader`를 통해 데이터를 패칭할 수 있다는 점을 알게 되었으나, `loader`가 TS 파일에서 구현되다 보니 `useQueryClient` 훅 사용이 제한되는 문제가 있었습니다.
- **[해결]** `loader`의 매개변수에 **client를 주입**하여 문제를 해결했습니다.
- **[성과]** 최적화 방식의 다양성을 체감하며, loader와 query를 파일 단위로 분리하여 유지보수성을 크게 향상시켰습니다.

#### emotion 스타일링과 타입 일관성 유지

- **[문제점]** emotion을 사용하면서 스타일에 대한 props 값의 일관성을 유지하기 어려웠습니다.
- **[해결]** 스타일 객체를 생성하고, `keyof`와 `typeof`를 적극 활용해 **타입이 자동으로 갱신**되도록 구현했습니다.
- **[성과]** 코드의 안정성과 일관성을 높였으며, 스타일 관리 효율성을 크게 향상시켰습니다.

#### 모노레포 환경에서 Ghost Dependency 문제

- **[문제점]** 모노레포 구현 중 workspace의 TypeScript 버전 호환성과 패키지 의존성 관리 문제가 발생했습니다. 이는 Yarn Berry의 호이스팅으로 인한 Ghost Dependency 때문이었습니다.
- **[해결]** 패키지 매니저를 `pnpm`으로 변경하여 문제를 해결했습니다.
- **[성과]** 의존성 관리가 안정적으로 이루어졌으며, 모노레포 환경의 개발 생산성을 개선할 수 있었습니다.

### 배운 점

기존에는 주로 UI 라이브러리를 활용해 toast와 모달을 구현했지만, 직접 구현하면서 간단한 **state 주입에는 context가 적합하다**는 점을 깨달았습니다. 특히 Radix UI의 Dialog 구현 코드를 분석하며 **CCP 패턴**을 발견하고, 이를 활용해 직접 모달을 구현하며 컴포넌트의 **부모나 조상에게 구조 결정을 위임**함으로써 내부 구조의 자율성을 높이고, 재사용성을 극대화할 수 있음을 알게 되었습니다. 또한, props를 기반으로 return 컴포넌트를 결정할 때 발생하던 중복 코드를 CCP 패턴으로 효과적으로 줄일 수 있었습니다.

개발을 처음 시작했을 때 만들었던 프로젝트는 간단한 todos 앱이었습니다. 그때 늦은 밤까지 눈을 반짝이며 코드를 짜던 설렘을 다시금 느낄 수 있는 경험이었습니다. 새로운 시도(emotion, 모노레포, loader, vite, CCP 패턴, FSD 디렉토리 구조 등)를 하면서, 익숙하고 편안한 방식에 안주하지 않고 꾸준히 새로운 개념을 접하고 적용하는 것이 얼마나 중요한지 다시 한 번 깨달았습니다.

### 실행방법

```bash
> pnpm install
> pnpm start
```

### 맛보기 코드

#### Router

라우터 코드입니다.  
errorElenet를 통해 에러 발생시, 에러 메세지를 화면에 표기합니다.

```tsx
// NOTE: services/frontend/src/app/router.tsx
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            { index: true, element: <LoginPage /> },
            { path: "join", element: <JoinPage /> },
          ],
        },
        {
          path: "todo",
          element: <TodosLayout />,
          loader: () => todosLoader(queryClient),
          children: [
            { index: true, element: <Empty>항목을 선택해주세요.</Empty> },
            {
              path: "new",
              element: <TodoFormPage />,
            },
            {
              path: ":todoId",
              element: <TodoDetailPage />,
            },
            {
              path: ":todoId/modify",
              element: <TodoFormPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
```

#### todosLoader

react-router에 적용할 loader 코드 입니다. 파일을 따로 분리해서 관리합니다.  
queryClient를 매개변수로 주입받아, fetching된 데이터를 키에 캐싱합니다.

```ts
// NOTE: services/frontend/src/features/todos/todosLoader.ts
export const todosLoader = async (queryClient: QueryClient) => {
  // NOTE: 리다이렉트
  if (noToken()) {
    return redirect(AUTH_URL.LOGIN.PATH);
  }

  return queryClient.ensureQueryData({ ...todoQueries.list() });
};
```

#### todoQueries

useQuery 또는 useMutation에서 사용할 queryOptions를 객체에 담아 관리합니다.  
query key와 queryOptions를 선언합니다.

```ts
// NOTE: services/frontend/src/features/todos/todosQuery.ts
import { queryOptions } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "./apis/todo";
import type { TodoPayloadType } from "./todo";

interface IUpdateFuncParams {
  id: string;
  payload: TodoPayloadType;
}

export const todoQueries = {
  all: () => ["todos"] as const,
  lists: () => [...todoQueries.all(), "list"] as const,
  list: (queryString?: string | null) => {
    return queryOptions({
      queryKey: [...todoQueries.lists(), queryString],
      queryFn: async () => getTodos(queryString),
    });
  },

  details: () => [...todoQueries.all(), "detail"] as const,
  detail: (id?: string) =>
    queryOptions({
      queryKey: [...todoQueries.details(), id],
      queryFn: () => getTodoById(id),
    }),
};

export const todoMutations = {
  delete: () => ({
    mutationFn: async (id: string) => deleteTodo(id),
  }),
  create: () => ({
    mutationFn: async (payload: TodoPayloadType) => createTodo(payload),
  }),
  update: () => ({
    mutationFn: async ({ id, payload }: IUpdateFuncParams) =>
      updateTodo(id, payload),
  }),
};
```

#### todo API

HTTP 네트워킹을 하는 코드만 모아둔 파일입니다.  
Response의 데이터형을 선언하고 데이터 전처리를 진행합니다.

```ts
// NOTE: services/frontend/src/features/todos/apis/todo.ts

import { axiosRequest } from "../../../shared/axios/request";
import { formatDate, formatTime } from "../../../shared/utils/date";
import { PRIORITY_TEXT } from "../constants/todos";
import type { TodoPayloadType, TodoType } from "../todo";

export const getTodos = async (queryString?: string | null) => {
  return await axiosRequest
    .get<TodoType[]>(`/todos${queryString || ""}`) //
    .then((res) =>
      res.map((item) => ({
        ...item,
        priorityText: PRIORITY_TEXT[item.priority],
      }))
    );
};

export const getTodoById = async (todoId?: string) => {
  if (!todoId) return null;

  return await axiosRequest
    .get<TodoType>(`/todos/${todoId}`) //
    .then((res) => ({
      ...res,
      createdAt: `${formatDate(res.createdAt)} ${formatTime(res.createdAt)}`,
      updatedAt: `${formatDate(res.updatedAt)} ${formatTime(res.updatedAt)}`,
      priorityText: PRIORITY_TEXT[res.priority],
    }));
};

export const createTodo = async (payload: TodoPayloadType) => {
  return await axiosRequest.post<TodoPayloadType, TodoType>("/todos", payload);
};

export const updateTodo = async (todoId: string, payload: TodoPayloadType) => {
  return await axiosRequest.update<TodoPayloadType, TodoType>(
    `/todos/${todoId}`,
    payload
  );
};

export const deleteTodo = async (todoId: string) => {
  return await axiosRequest.delete(`/todos/${todoId}`);
};
```

#### Axios Request 메소드

Axios Request 메소드를 객체로 모은 파일입니다.  
각 메소드의 params와 return 데이터의 데이터형을 선언합니다.

```ts
import { axiosInstance } from "./instance";

interface RequestMethdType {
  get: <T>(url: string) => Promise<T>;
  post: <T, R>(url: string, payload: T) => Promise<R>;
  delete: (url: string) => Promise<null>;
  update: <T, R>(url: string, payload: T) => Promise<R>;
}

export const axiosRequest: RequestMethdType = {
  get: async (url) => axiosInstance.get(url),
  post: async (url, payload) => axiosInstance.post(url, payload),
  delete: async (url) => axiosInstance.delete(url),
  update: async (url, payload) => axiosInstance.put(url, payload),
};
```

#### Axios Instance

Axios의 Instance와 Interceptor를 구현합니다.

- Instance: request를 보낼 때 공통된 baseURL과 headers를 지정
- Interceptor: request, response, error 로깅

```ts
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiLog } from "./log";

// type
interface AxiosInterceptorType {
  request: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  response: <T>(res: AxiosResponse) => ApiResponseType<T>;
  error: (error: AxiosError) => Promise<AxiosError>;
}

interface ApiResponseType<T> extends AxiosResponse {
  data: {
    data: T;
  };
}

// token
const token = window.localStorage.getItem("token");

// instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: token,
  },
});

// interceptor
const onRequest: AxiosInterceptorType["request"] = (config) => {
  ApiLog.request(config);
  return config;
};

const onResponse: AxiosInterceptorType["response"] = (res) => {
  const { status } = res;

  if (status === 200) {
    ApiLog.response(res);
  } else {
    ApiLog.error(res);
  }

  return res.data?.data || res.data;
};

const onError: AxiosInterceptorType["error"] = (error) => {
  if (axios.isAxiosError(error)) {
    ApiLog.error(error);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError);

export { axiosInstance };
```
