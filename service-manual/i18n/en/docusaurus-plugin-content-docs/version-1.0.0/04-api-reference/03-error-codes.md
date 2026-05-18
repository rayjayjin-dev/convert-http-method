---
sidebar_position: 3
title: "Error Codes"
description: "API error response format, HTTP status codes, custom error codes, and error handling best practices."
---

# Error Codes

This guide covers error codes and response formats that may occur during API request processing. Proper error handling enables stable service integration.

## Error Response Format

All error responses follow this JSON structure:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found.",
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

### Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Always `false` |
| `error.code` | string | Unique error code (UPPER_SNAKE_CASE) |
| `error.message` | string | Human-readable error description |
| `error.details` | object | Additional error details (optional) |
| `error.doc_url` | string | Link to error resolution docs (optional) |
| `meta.requestId` | string | Unique request tracking ID |
| `meta.timestamp` | string | Error occurrence time (ISO 8601) |

## HTTP Status Codes

### Success (2xx)

| Code | Description | Usage |
|------|-------------|-------|
| `200 OK` | Request successful | GET, PUT success |
| `201 Created` | Resource created | POST creates new resource |
| `204 No Content` | Success (no body) | DELETE success |

### Client Errors (4xx)

| Code | Description | Common Cause |
|------|-------------|--------------|
| `400 Bad Request` | Invalid request | Malformed body, missing fields |
| `401 Unauthorized` | Authentication failed | Expired token, invalid credentials |
| `403 Forbidden` | Access denied | Insufficient permissions, IP restriction |
| `404 Not Found` | Resource not found | Non-existent resource requested |
| `409 Conflict` | Conflict | Duplicate resource creation |
| `422 Unprocessable Entity` | Validation failed | Input validation errors |
| `429 Too Many Requests` | Rate limit exceeded | Too many requests |

### Server Errors (5xx)

| Code | Description | Common Cause |
|------|-------------|--------------|
| `500 Internal Server Error` | Server error | Unexpected server failure |
| `502 Bad Gateway` | Gateway error | Upstream service error |
| `503 Service Unavailable` | Service unavailable | Maintenance, overload |
| `504 Gateway Timeout` | Gateway timeout | Upstream service timeout |

## Custom Error Codes

### Authentication Errors

| Code | HTTP | Description | Resolution |
|------|------|-------------|------------|
| `AUTH_TOKEN_EXPIRED` | 401 | Access Token expired | Refresh with Refresh Token |
| `AUTH_TOKEN_INVALID` | 401 | Invalid token | Re-authenticate |
| `AUTH_TOKEN_REVOKED` | 401 | Revoked token | Issue new token |
| `AUTH_CREDENTIALS_INVALID` | 401 | Invalid credentials | Check email/password |
| `AUTH_API_KEY_INVALID` | 401 | Invalid API key | Reissue API key |
| `AUTH_INSUFFICIENT_SCOPE` | 403 | Insufficient scope | Request additional permissions |
| `AUTH_IP_RESTRICTED` | 403 | IP access restricted | Check allowed IP list |

### Resource Errors

| Code | HTTP | Description | Resolution |
|------|------|-------------|------------|
| `RESOURCE_NOT_FOUND` | 404 | Resource not found | Verify resource ID |
| `RESOURCE_ALREADY_EXISTS` | 409 | Resource already exists | Change unique field value |
| `RESOURCE_DELETED` | 410 | Resource was deleted | Use a different resource |
| `RESOURCE_LOCKED` | 423 | Resource is locked | Unlock and retry |

### Validation Errors

| Code | HTTP | Description | Resolution |
|------|------|-------------|------------|
| `VALIDATION_FAILED` | 422 | Validation failed | Check `details` field |
| `VALIDATION_REQUIRED_FIELD` | 422 | Required field missing | Add missing field |
| `VALIDATION_INVALID_FORMAT` | 422 | Invalid format | Correct the format |
| `VALIDATION_VALUE_TOO_LONG` | 422 | Value exceeds max length | Shorten the value |
| `VALIDATION_INVALID_ENUM` | 422 | Invalid enum value | Check allowed values |

### Rate Limit Errors

| Code | HTTP | Description | Resolution |
|------|------|-------------|------------|
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded | Wait and retry |
| `QUOTA_EXCEEDED` | 429 | Quota exceeded | Upgrade plan or wait for reset |

## Validation Error Details

When validation fails, the `details` field contains per-field error information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request data validation failed.",
    "details": {
      "fields": [
        {
          "field": "email",
          "code": "VALIDATION_INVALID_FORMAT",
          "message": "Invalid email format.",
          "value": "invalid-email"
        },
        {
          "field": "name",
          "code": "VALIDATION_REQUIRED_FIELD",
          "message": "This field is required.",
          "value": null
        }
      ]
    }
  }
}
```

## Error Handling Best Practices

### Retry Strategy

| Error Type | Retryable | Recommended Strategy |
|------------|-----------|---------------------|
| 4xx (Client) | No | Fix request and retry |
| 429 (Rate Limit) | Yes | Wait for `Retry-After` header value |
| 500 (Server) | Yes | Exponential backoff (max 3 retries) |
| 502, 503, 504 | Yes | Exponential backoff (max 5 retries) |

### Exponential Backoff Example

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
        const delay = Math.pow(2, attempt) * 1000;
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
Log the `meta.requestId` from error responses. Providing this ID to support enables faster issue resolution.
:::
