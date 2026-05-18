---
sidebar_position: 4
title: "Rate Limiting"
description: "API rate limiting policies, handling limit exceeded responses, quota management, and monitoring."
---

# Rate Limiting

To ensure service stability, rate limiting is applied to API requests. This document covers limiting policies, response headers, and handling procedures when limits are exceeded.

## Rate Limiting Policy

### Per-Plan Limits

| Plan | Requests/Minute | Daily Requests | Concurrent Connections |
|------|-----------------|----------------|----------------------|
| Free | 60 | 1,000 | 5 |
| Basic | 300 | 10,000 | 20 |
| Pro | 1,000 | 100,000 | 50 |
| Enterprise | 5,000 | Unlimited | 200 |

### Per-Endpoint Limits

Some endpoints have additional restrictions:

| Endpoint | Limit | Applied Per |
|----------|-------|-------------|
| `POST /oauth/token` | 10/min | IP address |
| `POST /api/v1/users` | 30/min | API key |
| `GET /api/v1/search` | 30/min | API key |
| `POST /api/v1/webhooks` | 5/min | API key |
| `DELETE /api/v1/*` | 60/min | API key |

:::note
Enterprise plan users can customize per-endpoint limits. Contact your account manager.
:::

## Response Headers

All API responses include rate limit status headers:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 295
X-RateLimit-Reset: 1705312260
X-RateLimit-Policy: basic
```

### Header Descriptions

| Header | Description | Example |
|--------|-------------|---------|
| `X-RateLimit-Limit` | Max requests in current window | `300` |
| `X-RateLimit-Remaining` | Remaining requests | `295` |
| `X-RateLimit-Reset` | Reset time (Unix timestamp) | `1705312260` |
| `X-RateLimit-Policy` | Applied policy name | `basic` |
| `Retry-After` | Wait time in seconds (429 only) | `30` |

## Handling Limit Exceeded

### 429 Response Format

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 300,
      "window": "1m",
      "retry_after": 30,
      "reset_at": "2024-01-15T10:31:00Z"
    }
  }
}
```

### Client-Side Handling

```javascript
async function apiRequest(url, options) {
  const response = await fetch(url, options);

  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After'), 10);
    console.warn(`Rate limit exceeded. Retrying in ${retryAfter}s.`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return apiRequest(url, options);
  }

  return response;
}
```

### Prevention Strategies

| Strategy | Description | Effect |
|----------|-------------|--------|
| Request Batching | Combine multiple requests into one | Reduce request count |
| Caching | Cache response data locally | Eliminate duplicate requests |
| Request Queue | Queue requests for sequential processing | Prevent bursts |
| Webhooks | Receive events via webhooks instead of polling | Eliminate polling |
| Conditional Requests | Use `If-Modified-Since` header | Reduce unnecessary transfers |

:::tip
Monitor `X-RateLimit-Remaining` and throttle requests when remaining count drops below 10% of the limit.
:::

## Quota Management

### Daily Quota

Daily quotas reset at UTC 00:00.

```http
X-DailyQuota-Limit: 10000
X-DailyQuota-Remaining: 8500
X-DailyQuota-Reset: 2024-01-16T00:00:00Z
```

### Quota Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "Daily API request quota exceeded.",
    "details": {
      "quota_limit": 10000,
      "quota_used": 10000,
      "reset_at": "2024-01-16T00:00:00Z",
      "upgrade_url": "https://console.example.com/billing/upgrade"
    }
  }
}
```

### Usage Monitoring

Check current usage via API:

```http
GET /api/v1/usage/current HTTP/1.1
Authorization: Bearer {access_token}
```

Response includes rate limit status, daily quota usage, and monthly summary.

## Alert Configuration

Set up alerts based on quota usage thresholds:

| Threshold | Alert Method | Description |
|-----------|--------------|-------------|
| 50% | Email | 50% of daily quota used |
| 80% | Email + Webhook | 80% of daily quota used |
| 90% | Email + Webhook + SMS | 90% of daily quota used |
| 100% | Email + Webhook + SMS | Quota exceeded |

:::warning
All API requests are rejected when quota is exceeded. Set up 80% threshold alerts for critical services and consider plan upgrades when needed.
:::
