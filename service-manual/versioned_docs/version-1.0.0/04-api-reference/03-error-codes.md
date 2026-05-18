---
sidebar_position: 3
title: "에러 코드"
description: "API 에러 응답 형식, HTTP 상태 코드, 커스텀 에러 코드 및 에러 처리 방법을 안내합니다."
---

# 에러 코드

API 요청 처리 중 발생할 수 있는 에러 코드와 응답 형식을 안내합니다. 에러 응답을 올바르게 처리하면 안정적인 서비스 연동을 구현할 수 있습니다.

## 에러 응답 형식

모든 에러 응답은 다음 JSON 구조를 따릅니다:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "요청한 리소스를 찾을 수 없습니다.",
    "details": {
      "resource_type": "user",
      "resource_id": "usr_invalid_id"
    },
    "doc_url": "https://docs.example.com/errors/RESOURCE_NOT_FOUND"
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### 에러 응답 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| `success` | boolean | 항상 `false` |
| `error.code` | string | 고유 에러 코드 (대문자 스네이크 케이스) |
| `error.message` | string | 사람이 읽을 수 있는 에러 설명 |
| `error.details` | object | 에러에 대한 추가 상세 정보 (선택) |
| `error.doc_url` | string | 에러 해결 문서 링크 (선택) |
| `meta.requestId` | string | 요청 추적용 고유 ID |
| `meta.timestamp` | string | 에러 발생 시각 (ISO 8601) |

## HTTP 상태 코드

### 성공 응답 (2xx)

| 상태 코드 | 설명 | 사용 상황 |
|-----------|------|-----------|
| `200 OK` | 요청 성공 | GET, PUT 요청 성공 |
| `201 Created` | 리소스 생성 성공 | POST 요청으로 새 리소스 생성 |
| `204 No Content` | 성공 (응답 본문 없음) | DELETE 요청 성공 |

### 클라이언트 에러 (4xx)

| 상태 코드 | 설명 | 일반적 원인 |
|-----------|------|-------------|
| `400 Bad Request` | 잘못된 요청 | 요청 본문 형식 오류, 필수 필드 누락 |
| `401 Unauthorized` | 인증 실패 | 토큰 만료, 유효하지 않은 인증 정보 |
| `403 Forbidden` | 접근 거부 | 권한 부족, IP 제한 |
| `404 Not Found` | 리소스 없음 | 존재하지 않는 리소스 요청 |
| `409 Conflict` | 충돌 | 중복 리소스 생성 시도 |
| `422 Unprocessable Entity` | 처리 불가 | 유효성 검증 실패 |
| `429 Too Many Requests` | 요청 제한 초과 | Rate Limit 초과 |

### 서버 에러 (5xx)

| 상태 코드 | 설명 | 일반적 원인 |
|-----------|------|-------------|
| `500 Internal Server Error` | 서버 내부 오류 | 예기치 않은 서버 오류 |
| `502 Bad Gateway` | 게이트웨이 오류 | 업스트림 서비스 응답 오류 |
| `503 Service Unavailable` | 서비스 이용 불가 | 서버 점검, 과부하 |
| `504 Gateway Timeout` | 게이트웨이 타임아웃 | 업스트림 서비스 응답 지연 |

## 커스텀 에러 코드

### 인증 관련 에러

| 에러 코드 | HTTP 상태 | 설명 | 해결 방법 |
|-----------|-----------|------|-----------|
| `AUTH_TOKEN_EXPIRED` | 401 | Access Token 만료 | Refresh Token으로 갱신 |
| `AUTH_TOKEN_INVALID` | 401 | 유효하지 않은 토큰 | 재인증 필요 |
| `AUTH_TOKEN_REVOKED` | 401 | 폐기된 토큰 | 새 토큰 발급 |
| `AUTH_CREDENTIALS_INVALID` | 401 | 잘못된 인증 정보 | 이메일/비밀번호 확인 |
| `AUTH_API_KEY_INVALID` | 401 | 유효하지 않은 API 키 | API 키 재발급 |
| `AUTH_INSUFFICIENT_SCOPE` | 403 | 권한 범위 부족 | 추가 권한 요청 |
| `AUTH_IP_RESTRICTED` | 403 | IP 접근 제한 | 허용 IP 목록 확인 |

### 리소스 관련 에러

| 에러 코드 | HTTP 상태 | 설명 | 해결 방법 |
|-----------|-----------|------|-----------|
| `RESOURCE_NOT_FOUND` | 404 | 리소스를 찾을 수 없음 | 리소스 ID 확인 |
| `RESOURCE_ALREADY_EXISTS` | 409 | 이미 존재하는 리소스 | 고유 필드 값 변경 |
| `RESOURCE_DELETED` | 410 | 삭제된 리소스 | 다른 리소스 사용 |
| `RESOURCE_LOCKED` | 423 | 잠긴 리소스 | 잠금 해제 후 재시도 |

### 유효성 검증 에러

| 에러 코드 | HTTP 상태 | 설명 | 해결 방법 |
|-----------|-----------|------|-----------|
| `VALIDATION_FAILED` | 422 | 유효성 검증 실패 | `details` 필드 확인 |
| `VALIDATION_REQUIRED_FIELD` | 422 | 필수 필드 누락 | 누락된 필드 추가 |
| `VALIDATION_INVALID_FORMAT` | 422 | 잘못된 형식 | 올바른 형식으로 수정 |
| `VALIDATION_VALUE_TOO_LONG` | 422 | 값 길이 초과 | 최대 길이 이내로 수정 |
| `VALIDATION_INVALID_ENUM` | 422 | 허용되지 않은 값 | 허용된 값 목록 확인 |

### 요청 제한 에러

| 에러 코드 | HTTP 상태 | 설명 | 해결 방법 |
|-----------|-----------|------|-----------|
| `RATE_LIMIT_EXCEEDED` | 429 | 요청 제한 초과 | 대기 후 재시도 |
| `QUOTA_EXCEEDED` | 429 | 할당량 초과 | 플랜 업그레이드 또는 다음 갱신 대기 |

### 서버 에러

| 에러 코드 | HTTP 상태 | 설명 | 해결 방법 |
|-----------|-----------|------|-----------|
| `INTERNAL_ERROR` | 500 | 서버 내부 오류 | 잠시 후 재시도 |
| `SERVICE_UNAVAILABLE` | 503 | 서비스 점검 중 | 점검 완료 후 재시도 |
| `UPSTREAM_ERROR` | 502 | 외부 서비스 오류 | 잠시 후 재시도 |
| `TIMEOUT` | 504 | 요청 처리 시간 초과 | 요청 단순화 후 재시도 |

## 유효성 검증 에러 상세

유효성 검증 실패 시 `details` 필드에 각 필드별 오류 정보가 포함됩니다:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "요청 데이터의 유효성 검증에 실패했습니다.",
    "details": {
      "fields": [
        {
          "field": "email",
          "code": "VALIDATION_INVALID_FORMAT",
          "message": "올바른 이메일 형식이 아닙니다.",
          "value": "invalid-email"
        },
        {
          "field": "name",
          "code": "VALIDATION_REQUIRED_FIELD",
          "message": "필수 입력 항목입니다.",
          "value": null
        }
      ]
    }
  },
  "meta": {
    "requestId": "req_xyz789",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## 에러 처리 모범 사례

### 재시도 전략

에러 유형에 따라 적절한 재시도 전략을 적용하세요:

| 에러 유형 | 재시도 가능 | 권장 전략 |
|-----------|-------------|-----------|
| 4xx (클라이언트 에러) | 아니오 | 요청 수정 후 재시도 |
| 429 (Rate Limit) | 예 | `Retry-After` 헤더 값만큼 대기 |
| 500 (서버 에러) | 예 | 지수 백오프 (최대 3회) |
| 502, 503, 504 | 예 | 지수 백오프 (최대 5회) |

### 지수 백오프 구현 예시

```javascript
async function requestWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 60;
        await sleep(retryAfter * 1000);
        continue;
      }

      if (response.status >= 500 && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        await sleep(delay);
        continue;
      }

      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = Math.pow(2, attempt) * 1000;
      await sleep(delay);
    }
  }
}
```

:::tip
에러 응답의 `meta.requestId`를 로그에 기록하세요. 기술 지원 요청 시 해당 ID를 제공하면 빠른 문제 해결이 가능합니다.
:::
