---
sidebar_position: 2
title: "Endpoints"
description: "REST API endpoint list, request/response formats, parameters, and usage examples."
---

# API Endpoints

This guide covers the REST API endpoints provided by the service. All APIs process requests and responses in JSON format with a base URL of `https://api.example.com/v1`.

## General Information

### Base URL

```
https://api.example.com/v1
```

### Common Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer {access_token}` format |
| `Content-Type` | Yes | `application/json` |
| `Accept` | No | `application/json` (default) |
| `X-Request-ID` | No | Unique ID for request tracing |
| `Accept-Language` | No | Response language (`ko`, `en`) |

### Common Response Format

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

## Users API

### List Users

Retrieve a paginated list of users.

```http
GET /api/v1/users?page=1&limit=20&sort=created_at:desc HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Items per page (max 100) |
| `sort` | string | No | `created_at:desc` | Sort criteria (`field:asc\|desc`) |
| `status` | string | No | - | Status filter (`active`, `inactive`) |
| `search` | string | No | - | Search by name or email |

#### Response Example

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "usr_01H8X3K2M5N7P9Q",
        "email": "user@example.com",
        "name": "John Smith",
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
  }
}
```

### Get User

Retrieve details for a specific user.

```http
GET /api/v1/users/{user_id} HTTP/1.1
```

### Create User

```http
POST /api/v1/users HTTP/1.1
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "role": "member",
  "department": "Marketing",
  "send_invitation": true
}
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User email (unique) |
| `name` | string | Yes | User name |
| `role` | string | Yes | Role (`admin`, `manager`, `member`, `viewer`) |
| `department` | string | No | Department |
| `phone` | string | No | Phone number |
| `send_invitation` | boolean | No | Send invitation email (default: `true`) |

### Update User

```http
PUT /api/v1/users/{user_id} HTTP/1.1
Content-Type: application/json

{
  "name": "Jane Doe (Updated)",
  "department": "Engineering",
  "role": "manager"
}
```

### Delete User

```http
DELETE /api/v1/users/{user_id} HTTP/1.1
```

Returns `204 No Content` on success.

## Projects API

### List Projects

```http
GET /api/v1/projects?page=1&limit=10&status=active HTTP/1.1
```

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 10 | Items per page |
| `status` | string | No | - | Status filter (`active`, `archived`, `draft`) |
| `owner_id` | string | No | - | Filter by owner ID |

### Create Project

```http
POST /api/v1/projects HTTP/1.1
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description.",
  "visibility": "private",
  "members": ["usr_01H8X3K2M5N7P9Q"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Project name |
| `description` | string | No | Project description |
| `visibility` | string | No | Visibility (`public`, `private`), default: `private` |
| `members` | array | No | Initial member user IDs |

## Webhooks API

### Register Webhook

```http
POST /api/v1/webhooks HTTP/1.1
Content-Type: application/json

{
  "url": "https://yourapp.com/webhooks/receive",
  "events": ["user.created", "user.updated", "project.created"],
  "secret": "your-webhook-secret",
  "active": true
}
```

### Supported Events

| Event | Description |
|-------|-------------|
| `user.created` | New user created |
| `user.updated` | User information updated |
| `user.deleted` | User deleted |
| `project.created` | New project created |
| `project.updated` | Project information updated |
| `project.archived` | Project archived |

### Webhook Payload Format

```json
{
  "id": "evt_01X2Y3Z4A5B6C7D",
  "event": "user.created",
  "created_at": "2024-01-15T10:35:00Z",
  "data": {
    "id": "usr_02J9Y4L3N6M8Q0R",
    "email": "newuser@example.com",
    "name": "Jane Doe"
  }
}
```

:::tip
Verify the `X-Webhook-Signature` header to confirm request integrity. Signatures are generated using HMAC-SHA256.
:::

## API Versioning

| Version | Status | End of Support |
|---------|--------|----------------|
| v1 | Current (stable) | - |
| v2 (planned) | In development | - |

:::note
API versions are included in the URL path (e.g., `/api/v1/`). Breaking changes are released as new versions, and existing versions are maintained for at least 12 months.
:::
