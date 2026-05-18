---
sidebar_position: 2
title: "엔드포인트"
description: "REST API 엔드포인트 목록, 요청/응답 형식, 파라미터 설명 및 사용 예제를 안내합니다."
---

# API 엔드포인트

서비스에서 제공하는 REST API 엔드포인트의 목록과 사용 방법을 안내합니다. 모든 API는 JSON 형식으로 요청 및 응답을 처리하며, 기본 URL은 `https://api.example.com/v1`입니다.

## 기본 정보

### Base URL

```
https://api.example.com/v1
```

### 공통 요청 헤더

| 헤더 | 필수 | 설명 |
|------|------|------|
| `Authorization` | 필수 | `Bearer {access_token}` 형식 |
| `Content-Type` | 필수 | `application/json` |
| `Accept` | 선택 | `application/json` (기본값) |
| `X-Request-ID` | 선택 | 요청 추적용 고유 ID |
| `Accept-Language` | 선택 | 응답 언어 (`ko`, `en`) |

### 공통 응답 형식

모든 API 응답은 다음 구조를 따릅니다:

```json
{
  "success": true,
  "data": { },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## 사용자 API

### 사용자 목록 조회

사용자 목록을 페이지네이션으로 조회합니다.

```http
GET /api/v1/users?page=1&limit=20&sort=created_at:desc HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|----------|------|------|--------|------|
| `page` | integer | 선택 | 1 | 페이지 번호 |
| `limit` | integer | 선택 | 20 | 페이지당 항목 수 (최대 100) |
| `sort` | string | 선택 | `created_at:desc` | 정렬 기준 (`field:asc\|desc`) |
| `status` | string | 선택 | - | 상태 필터 (`active`, `inactive`) |
| `search` | string | 선택 | - | 이름 또는 이메일 검색 |

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "usr_01H8X3K2M5N7P9Q",
        "email": "user@example.com",
        "name": "홍길동",
        "role": "member",
        "status": "active",
        "created_at": "2024-01-10T09:00:00Z",
        "last_login_at": "2024-01-15T08:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_count": 98,
      "limit": 20
    }
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### 사용자 상세 조회

특정 사용자의 상세 정보를 조회합니다.

```http
GET /api/v1/users/{user_id} HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### 경로 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `user_id` | string | 사용자 고유 ID |

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "id": "usr_01H8X3K2M5N7P9Q",
    "email": "user@example.com",
    "name": "홍길동",
    "role": "member",
    "status": "active",
    "department": "개발팀",
    "phone": "+82-10-1234-5678",
    "created_at": "2024-01-10T09:00:00Z",
    "updated_at": "2024-01-14T15:20:00Z",
    "last_login_at": "2024-01-15T08:30:00Z",
    "permissions": ["read", "write"]
  },
  "meta": {
    "requestId": "req_def456",
    "timestamp": "2024-01-15T10:31:00Z"
  }
}
```

### 사용자 생성

새로운 사용자를 생성합니다.

```http
POST /api/v1/users HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "김철수",
  "role": "member",
  "department": "마케팅팀",
  "send_invitation": true
}
```

#### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `email` | string | 필수 | 사용자 이메일 (고유) |
| `name` | string | 필수 | 사용자 이름 |
| `role` | string | 필수 | 역할 (`admin`, `manager`, `member`, `viewer`) |
| `department` | string | 선택 | 소속 부서 |
| `phone` | string | 선택 | 전화번호 |
| `send_invitation` | boolean | 선택 | 초대 메일 발송 여부 (기본: `true`) |

#### 응답 예시 (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "usr_02J9Y4L3N6M8Q0R",
    "email": "newuser@example.com",
    "name": "김철수",
    "role": "member",
    "status": "pending",
    "created_at": "2024-01-15T10:35:00Z"
  },
  "meta": {
    "requestId": "req_ghi789",
    "timestamp": "2024-01-15T10:35:00Z"
  }
}
```

### 사용자 수정

기존 사용자의 정보를 수정합니다.

```http
PUT /api/v1/users/{user_id} HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "김철수 (수정)",
  "department": "개발팀",
  "role": "manager"
}
```

#### 응답 예시 (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "usr_02J9Y4L3N6M8Q0R",
    "email": "newuser@example.com",
    "name": "김철수 (수정)",
    "role": "manager",
    "department": "개발팀",
    "status": "active",
    "updated_at": "2024-01-15T11:00:00Z"
  },
  "meta": {
    "requestId": "req_jkl012",
    "timestamp": "2024-01-15T11:00:00Z"
  }
}
```

### 사용자 삭제

사용자를 시스템에서 삭제합니다.

```http
DELETE /api/v1/users/{user_id} HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### 응답 예시 (204 No Content)

응답 본문 없음.

## 프로젝트 API

### 프로젝트 목록 조회

```http
GET /api/v1/projects?page=1&limit=10&status=active HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|----------|------|------|--------|------|
| `page` | integer | 선택 | 1 | 페이지 번호 |
| `limit` | integer | 선택 | 10 | 페이지당 항목 수 |
| `status` | string | 선택 | - | 상태 필터 (`active`, `archived`, `draft`) |
| `owner_id` | string | 선택 | - | 소유자 ID로 필터 |

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "prj_01A2B3C4D5E6F7G",
        "name": "서비스 매뉴얼 프로젝트",
        "description": "서비스 매뉴얼 문서화 프로젝트",
        "status": "active",
        "owner": {
          "id": "usr_01H8X3K2M5N7P9Q",
          "name": "홍길동"
        },
        "member_count": 5,
        "created_at": "2024-01-05T09:00:00Z",
        "updated_at": "2024-01-14T16:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "total_count": 25,
      "limit": 10
    }
  },
  "meta": {
    "requestId": "req_mno345",
    "timestamp": "2024-01-15T10:32:00Z"
  }
}
```

### 프로젝트 생성

```http
POST /api/v1/projects HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "새 프로젝트",
  "description": "프로젝트 설명입니다.",
  "visibility": "private",
  "members": ["usr_01H8X3K2M5N7P9Q"]
}
```

#### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | 필수 | 프로젝트 이름 |
| `description` | string | 선택 | 프로젝트 설명 |
| `visibility` | string | 선택 | 공개 범위 (`public`, `private`) 기본: `private` |
| `members` | array | 선택 | 초기 멤버 사용자 ID 목록 |

## 웹훅 API

### 웹훅 등록

이벤트 발생 시 지정된 URL로 알림을 전송하는 웹훅을 등록합니다.

```http
POST /api/v1/webhooks HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "url": "https://yourapp.com/webhooks/receive",
  "events": ["user.created", "user.updated", "project.created"],
  "secret": "your-webhook-secret",
  "active": true
}
```

#### 요청 본문

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `url` | string | 필수 | 웹훅 수신 URL (HTTPS만 허용) |
| `events` | array | 필수 | 구독할 이벤트 목록 |
| `secret` | string | 권장 | 페이로드 서명 검증용 시크릿 |
| `active` | boolean | 선택 | 활성화 여부 (기본: `true`) |

### 지원 이벤트 목록

| 이벤트 | 설명 |
|--------|------|
| `user.created` | 새 사용자 생성 |
| `user.updated` | 사용자 정보 수정 |
| `user.deleted` | 사용자 삭제 |
| `project.created` | 새 프로젝트 생성 |
| `project.updated` | 프로젝트 정보 수정 |
| `project.archived` | 프로젝트 보관 처리 |

### 웹훅 페이로드 형식

```json
{
  "id": "evt_01X2Y3Z4A5B6C7D",
  "event": "user.created",
  "created_at": "2024-01-15T10:35:00Z",
  "data": {
    "id": "usr_02J9Y4L3N6M8Q0R",
    "email": "newuser@example.com",
    "name": "김철수"
  }
}
```

:::tip
웹훅 수신 시 `X-Webhook-Signature` 헤더를 검증하여 요청의 무결성을 확인하세요. 시그니처는 HMAC-SHA256 알고리즘으로 생성됩니다.
:::

## API 버전 관리

### 버전 정책

| 버전 | 상태 | 지원 종료일 |
|------|------|-------------|
| v1 | 현재 (안정) | - |
| v2 (예정) | 개발 중 | - |

:::note
API 버전은 URL 경로에 포함됩니다 (예: `/api/v1/`). 하위 호환성이 깨지는 변경 사항은 새 버전으로 제공되며, 기존 버전은 최소 12개월간 유지됩니다.
:::
