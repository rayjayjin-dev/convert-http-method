---
sidebar_position: 4
title: "요청 제한"
description: "API Rate Limiting 정책, 제한 초과 시 처리 방법, 할당량 관리 및 모니터링 방법을 안내합니다."
---

# 요청 제한 (Rate Limiting)

서비스 안정성을 보장하기 위해 API 요청에 대한 속도 제한(Rate Limiting)을 적용합니다. 이 문서에서는 제한 정책, 응답 헤더, 초과 시 처리 방법을 안내합니다.

## Rate Limiting 정책

### 플랜별 요청 제한

| 플랜 | 분당 요청 수 | 일일 요청 수 | 동시 연결 수 |
|------|-------------|-------------|-------------|
| Free | 60 | 1,000 | 5 |
| Basic | 300 | 10,000 | 20 |
| Pro | 1,000 | 100,000 | 50 |
| Enterprise | 5,000 | 무제한 | 200 |

### 엔드포인트별 제한

일부 엔드포인트는 추가적인 제한이 적용됩니다:

| 엔드포인트 | 제한 | 적용 단위 |
|------------|------|-----------|
| `POST /oauth/token` | 10회/분 | IP 주소 |
| `POST /api/v1/users` | 30회/분 | API 키 |
| `GET /api/v1/search` | 30회/분 | API 키 |
| `POST /api/v1/webhooks` | 5회/분 | API 키 |
| `DELETE /api/v1/*` | 60회/분 | API 키 |

:::note
Enterprise 플랜 사용자는 엔드포인트별 제한을 커스터마이징할 수 있습니다. 담당 매니저에게 문의하세요.
:::

## 응답 헤더

모든 API 응답에는 현재 Rate Limit 상태를 나타내는 헤더가 포함됩니다:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 295
X-RateLimit-Reset: 1705312260
X-RateLimit-Policy: basic
Content-Type: application/json
```

### Rate Limit 헤더 설명

| 헤더 | 설명 | 예시 |
|------|------|------|
| `X-RateLimit-Limit` | 현재 윈도우의 최대 요청 수 | `300` |
| `X-RateLimit-Remaining` | 남은 요청 수 | `295` |
| `X-RateLimit-Reset` | 제한 초기화 시각 (Unix timestamp) | `1705312260` |
| `X-RateLimit-Policy` | 적용된 제한 정책 이름 | `basic` |
| `Retry-After` | 재시도까지 대기 시간 (초) - 429 응답 시만 | `30` |

## 제한 초과 시 처리

### 429 응답 형식

요청 제한을 초과하면 `429 Too Many Requests` 응답이 반환됩니다:

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705312260
Retry-After: 30
Content-Type: application/json
```

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "요청 제한을 초과했습니다. 잠시 후 다시 시도해주세요.",
    "details": {
      "limit": 300,
      "window": "1m",
      "retry_after": 30,
      "reset_at": "2024-01-15T10:31:00Z"
    }
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2024-01-15T10:30:30Z"
  }
}
```

### 클라이언트 측 처리 방법

#### 기본 재시도 로직

```javascript
async function apiRequest(url, options) {
  const response = await fetch(url, options);

  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After'), 10);
    console.warn(`Rate limit 초과. ${retryAfter}초 후 재시도합니다.`);

    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return apiRequest(url, options); // 재시도
  }

  return response;
}
```

#### 지수 백오프를 적용한 재시도

```javascript
async function apiRequestWithBackoff(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    if (attempt === maxRetries) {
      throw new Error('최대 재시도 횟수를 초과했습니다.');
    }

    const retryAfter = response.headers.get('Retry-After');
    const delay = retryAfter
      ? parseInt(retryAfter, 10) * 1000
      : Math.pow(2, attempt) * 1000;

    console.warn(`재시도 ${attempt + 1}/${maxRetries}: ${delay}ms 대기`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}
```

### 요청 제한 방지 전략

효율적인 API 사용을 위한 권장 사항입니다:

| 전략 | 설명 | 효과 |
|------|------|------|
| 요청 배치 처리 | 여러 요청을 하나로 묶어 전송 | 요청 수 감소 |
| 캐싱 | 응답 데이터를 로컬에 캐시 | 중복 요청 제거 |
| 요청 큐 | 요청을 큐에 넣고 순차 처리 | 버스트 방지 |
| 웹훅 활용 | 폴링 대신 웹훅으로 이벤트 수신 | 폴링 요청 제거 |
| 조건부 요청 | `If-Modified-Since` 헤더 활용 | 불필요한 데이터 전송 감소 |

:::tip
`X-RateLimit-Remaining` 헤더를 모니터링하여 제한에 도달하기 전에 요청 속도를 조절하세요. 남은 요청 수가 전체의 10% 이하로 떨어지면 요청 간격을 늘리는 것을 권장합니다.
:::

## 할당량 관리

### 일일 할당량

일일 할당량은 매일 UTC 00:00에 초기화됩니다.

```http
HTTP/1.1 200 OK
X-DailyQuota-Limit: 10000
X-DailyQuota-Remaining: 8500
X-DailyQuota-Reset: 2024-01-16T00:00:00Z
```

| 헤더 | 설명 |
|------|------|
| `X-DailyQuota-Limit` | 일일 최대 요청 수 |
| `X-DailyQuota-Remaining` | 남은 일일 요청 수 |
| `X-DailyQuota-Reset` | 할당량 초기화 시각 (ISO 8601) |

### 할당량 초과 응답

일일 할당량을 초과하면 다음 응답이 반환됩니다:

```json
{
  "success": false,
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "일일 API 요청 할당량을 초과했습니다.",
    "details": {
      "quota_limit": 10000,
      "quota_used": 10000,
      "reset_at": "2024-01-16T00:00:00Z",
      "upgrade_url": "https://console.example.com/billing/upgrade"
    }
  },
  "meta": {
    "requestId": "req_quota_exceeded",
    "timestamp": "2024-01-15T18:00:00Z"
  }
}
```

### 사용량 모니터링

#### API 사용량 조회

현재 사용량을 API로 조회할 수 있습니다:

```http
GET /api/v1/usage/current HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "plan": "basic",
    "rate_limit": {
      "limit_per_minute": 300,
      "current_usage": 45,
      "window_reset_at": "2024-01-15T10:31:00Z"
    },
    "daily_quota": {
      "limit": 10000,
      "used": 1500,
      "remaining": 8500,
      "reset_at": "2024-01-16T00:00:00Z",
      "usage_percentage": 15.0
    },
    "monthly_summary": {
      "total_requests": 45000,
      "average_daily": 1500,
      "peak_daily": 3200,
      "period": "2024-01"
    }
  },
  "meta": {
    "requestId": "req_usage_001",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## 알림 설정

할당량 사용률에 따라 알림을 받을 수 있습니다:

| 임계값 | 알림 방식 | 설명 |
|--------|-----------|------|
| 50% | 이메일 | 일일 할당량의 50% 사용 시 |
| 80% | 이메일 + 웹훅 | 일일 할당량의 80% 사용 시 |
| 90% | 이메일 + 웹훅 + SMS | 일일 할당량의 90% 사용 시 |
| 100% | 이메일 + 웹훅 + SMS | 할당량 초과 시 |

### 알림 설정 방법

```http
PUT /api/v1/settings/notifications HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "rate_limit_alerts": {
    "enabled": true,
    "thresholds": [50, 80, 90, 100],
    "channels": {
      "email": ["admin@example.com"],
      "webhook": ["https://yourapp.com/alerts"],
      "sms": ["+82-10-1234-5678"]
    }
  }
}
```

:::warning
할당량 초과 시 모든 API 요청이 거부됩니다. 중요한 서비스의 경우 80% 임계값 알림을 설정하고, 필요 시 플랜 업그레이드를 검토하세요.
:::
