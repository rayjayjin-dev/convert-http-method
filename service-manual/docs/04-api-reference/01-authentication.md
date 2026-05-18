---
sidebar_position: 1
title: "인증"
description: "API 인증 방식, API 키 발급, OAuth 2.0 인증 흐름, 토큰 관리, 인증 헤더 설정 방법을 안내합니다."
---

# API 인증

서비스 API에 접근하기 위한 인증 방식과 설정 방법을 안내합니다. 모든 API 요청은 유효한 인증 정보를 포함해야 하며, 인증되지 않은 요청은 `401 Unauthorized` 응답을 반환합니다.

## 인증 방식 개요

서비스는 다음 두 가지 인증 방식을 지원합니다:

| 인증 방식 | 용도 | 만료 시간 |
|-----------|------|-----------|
| API 키 | 서버 간 통신, 백엔드 서비스 연동 | 무제한 (수동 폐기) |
| OAuth 2.0 | 사용자 대행 접근, 서드파티 앱 연동 | Access Token: 1시간 |

## API 키 발급

### 발급 절차

1. 관리자 콘솔에서 **설정** > **API 키 관리** 메뉴로 이동합니다
2. **+ 새 API 키 생성** 버튼을 클릭합니다
3. 키 정보를 입력합니다:
   - **키 이름**: 용도를 식별할 수 있는 이름
   - **권한 범위**: 접근 가능한 API 범위 선택
   - **IP 제한**: 허용할 IP 주소 목록 (선택)
4. **생성** 버튼을 클릭하여 키를 발급받습니다

:::warning
API 키는 생성 시 한 번만 표시됩니다. 안전한 곳에 보관하고, 절대 클라이언트 측 코드나 공개 저장소에 노출하지 마세요.
:::

### API 키 사용

API 키는 요청 헤더에 포함하여 전송합니다:

```http
GET /api/v1/users HTTP/1.1
Host: api.example.com
X-API-Key: your-api-key-here
Content-Type: application/json
```

### API 키 권한 범위

| 범위 | 설명 | 접근 가능 엔드포인트 |
|------|------|---------------------|
| `read` | 읽기 전용 | GET 요청만 허용 |
| `write` | 읽기/쓰기 | GET, POST, PUT 요청 허용 |
| `admin` | 전체 관리 | 모든 요청 허용 (DELETE 포함) |
| `webhook` | 웹훅 전용 | 웹훅 관련 엔드포인트만 허용 |

## OAuth 2.0 인증

### 지원 흐름

서비스는 다음 OAuth 2.0 인증 흐름을 지원합니다:

| 흐름 | 용도 | 권장 대상 |
|------|------|-----------|
| Authorization Code | 서버 사이드 앱 | 웹 애플리케이션 |
| Authorization Code + PKCE | 클라이언트 사이드 앱 | SPA, 모바일 앱 |
| Client Credentials | 서비스 간 통신 | 백엔드 서비스 |

### Authorization Code 흐름

#### 1단계: 인증 요청

사용자를 인증 페이지로 리다이렉트합니다:

```http
GET /oauth/authorize?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=read write
  &state=random_state_string
Host: auth.example.com
```

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| `response_type` | 필수 | `code` 고정 |
| `client_id` | 필수 | 앱 등록 시 발급받은 클라이언트 ID |
| `redirect_uri` | 필수 | 인증 완료 후 리다이렉트할 URI |
| `scope` | 필수 | 요청할 권한 범위 (공백 구분) |
| `state` | 권장 | CSRF 방지용 랜덤 문자열 |

#### 2단계: 토큰 교환

인증 코드를 Access Token으로 교환합니다:

```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTHORIZATION_CODE
&redirect_uri=https://yourapp.com/callback
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

#### 응답 예시

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "scope": "read write"
}
```

## 토큰 관리

### Access Token 갱신

Access Token이 만료되면 Refresh Token을 사용하여 새 토큰을 발급받습니다:

```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

### 토큰 수명

| 토큰 유형 | 유효 기간 | 갱신 방법 |
|-----------|-----------|-----------|
| Access Token | 1시간 | Refresh Token으로 갱신 |
| Refresh Token | 30일 | 재로그인 필요 |
| Authorization Code | 10분 | 재인증 필요 |

### 토큰 폐기

더 이상 사용하지 않는 토큰은 명시적으로 폐기할 수 있습니다:

```http
POST /oauth/revoke HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
&token_type_hint=access_token
```

:::tip
보안을 위해 사용자가 로그아웃하거나 앱 연동을 해제할 때 반드시 토큰을 폐기하세요.
:::

## 인증 헤더 설정

### Bearer Token 방식

OAuth 2.0으로 발급받은 Access Token은 `Authorization` 헤더에 포함합니다:

```http
GET /api/v1/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### 인증 오류 응답

인증에 실패한 경우 다음과 같은 응답이 반환됩니다:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "유효하지 않은 인증 정보입니다.",
    "details": {
      "reason": "token_expired",
      "expired_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 인증 오류 코드

| 오류 코드 | HTTP 상태 | 설명 | 해결 방법 |
|-----------|-----------|------|-----------|
| `token_expired` | 401 | 토큰이 만료됨 | Refresh Token으로 갱신 |
| `token_invalid` | 401 | 유효하지 않은 토큰 | 재인증 필요 |
| `token_revoked` | 401 | 폐기된 토큰 | 새 토큰 발급 필요 |
| `insufficient_scope` | 403 | 권한 범위 부족 | 추가 권한 요청 필요 |
| `ip_restricted` | 403 | 허용되지 않은 IP | API 키 IP 설정 확인 |

:::note
모든 인증 관련 오류는 응답 본문에 상세한 오류 정보를 포함합니다. `details.reason` 필드를 확인하여 적절한 처리를 구현하세요.
:::
