# **프로젝트 소개**

기본적인 게시판의 형태를 띄고 있는 커뮤니티 프로젝트로 기술간의 장단점을 체감하기 위해 버전에 따라 다른 기술로 구현

-   ver1 : `vanila` `express` `json`
    -   [🔗FE Github](https://github.com/jjikky/5-jikky-kim-vanila-fe)
    -   [🔗BE Github](https://github.com/jjikky/5-jikky-kim-express-be/tree/json-archive)
-   ver2 : `react` `express` `mySQL`

    -   [🔗FE Github](https://github.com/jjikky/5-jikky-kim-react-fe)
    -   [🔗BE Github](https://github.com/jjikky/5-jikky-kim-express-be)

-   ver3 : `react` `spring` `mySQL`
    -   개발 진행 중
-   ver3 : `react` `spring` `mySQL`
    -   현재 개발 중

# 커뮤니티 게시판 ver 2 FE

## 프로젝트 기간

-   ver 2 FE : 2024.05.02 ~ 2024.05.15 & ( 9영업일 )

## 사용 기술

`Express` `html/css` `javascript` `React` `mySQL`

## 개발 내용

-   무한 스크롤 구현
-   로딩, 토스트 메세지 구현
-   `preload` 방식의 font import로 지연 시간 없이 웹폰트 서빙
    -   좋은 사용자 경험을 위해 브라우저가 최대한 빨리 폰트를 가져올 수 있게 함
-   웹 콘텐츠 접근성 지침에 따른 대체 텍스트(`Alt`값) 제공, `label` 태그를 활용 하고, 웹 콘텐츠 접근성 지침을 이해하기 위해 노력
-   디바운싱을 활용하여 불필요한 요청을 최대한 제거하여 서버 부담 감소

API handling

```javascript
// utils/api.js

const SERVER_URL = 'http://localhost:5000';
const ErrorMessage = '../constants/error-message';

export const apiHeaders = new Headers();

const api = {
    get: async (path, params, options) => {
        try {
            if (params) {
                const filteredParams = Object.fromEntries(
                    Object.entries(params)
                        .filter(([_, value]) => (typeof value === 'number' && !isNaN(value)) || value !== undefined)
                        .map(([key, value]) => [key, String(value)])
                );
                path += '?' + new URLSearchParams(filteredParams).toString();
            }

            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'GET',
                headers: apiHeaders,
                credentials: 'include',
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    post: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'POST',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    patch: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'PATCH',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    put: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'PATCH',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    delete: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'DELETE',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },
};

export default api;

// params 타입에 따라 formData or json 데이터로 처리
const handleMutateRequest = (params) => {
    const isFormData = params instanceof FormData;
    let body;

    if (isFormData) {
        apiHeaders.delete('Content-Type');
        body = params;
    } else {
        apiHeaders.set('Content-Type', 'application/json');
        body = JSON.stringify(params);
    }

    return { body };
};

// Content-Type에 따라 응답 데이터 처리
const parseResponseData = (res) => {
    const contentType = res.headers.get('Content-Type');
    if (!contentType) {
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
    }

    if (contentType.includes('application/json')) {
        return res.json();
    } else if (contentType.includes('text')) {
        return res.text();
    }
    return res.blob();
};

// 응답 status 상태에 따라 return data 혹은 throw Error
const handleResponse = async (res) => {
    try {
        const data = await parseResponseData(res);
        if (res.ok) {
            return data;
        }

        const errorMessage = res.status === 404 ? ErrorMessage.BAD_REQUEST : await data;
        // throw new Error(errorMessage);
        console.log(errorMessage);
        return data;
    } catch (err) {
        if (typeof window !== 'undefined') {
            // throw new CustomHttpError(res.status, err.message);
            console.log(new CustomHttpError(res.status, err.message));
        }
        return res.status;
    }
};

class CustomHttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
```

## 폴더 구조

```bash
project-root/
│
├── node_modules/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Input/
│   │   ├── Line/
│   │   ├── Loading/
│   │   ├── Modal/
│   │   ├── PostCard/
│   │   ├── Toast/
│   │
│   ├── constants/
│   │
│   ├── pages/
│   │   ├── login/
│   │   ├── posts/
│   │   ├── register/
│   │   ├── user/
│   │
│   ├── utils/
│   │
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│
├── .gitignore
├── .prettierrc
├── package-lock.json
├── package.json
└── README.md

```

## 구현 결과

https://github.com/jjikky/5-jikky-kim-react-fe/assets/59151187/4025723e-d0b3-4802-b51b-adbff7b19216

## 회고 및 개발 일지

-   [🔗4,5주차 회고](https://velog.io/@jikky/%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%8A%A4%EC%BF%A8-45%EC%A3%BC%EC%B0%A8-%ED%9A%8C%EA%B3%A0)
-   [🔗2024-05-14 : ref 여러개 전달](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-14.md)
-   [🔗2024-05-11 : 헤더 리팩토](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-11.md)
-   [🔗2024-05-10 : forwardRef](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-10.md)
-   [🔗2024-05-08 : useRef와 getElementById, 고차함수](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-08.md)
-   [🔗2024-05-03 : 클로저, useEffect](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-03.md)
-   [🔗2024-05-02 : react폴더구조, es6 실무](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-02.md)
