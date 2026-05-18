---
sidebar_position: 1
title: "Authentication"
description: "API authentication methods, API key management, OAuth 2.0 flows, and token management."
---

# API Authentication

This guide covers authentication methods and configuration for accessing the service API. All API requests must include valid authentication credentials; unauthenticated requests return `401 Unauthorized`.

## Authentication Methods

The service supports two authentication methods:

| Method | Use Case | Expiration |
|--------|----------|------------|
| API Key | Server-to-server communication | Unlimited (manual revocation) |
| OAuth 2.0 | User-delegated access, third-party apps | Access Token: 1 hour |

## API Key Management

### Generating an API Key

1. Navigate to **Settings** > **API Key Management** in the admin console
2. Click **+ Generate New API Key**
3. Enter key details:
   - **Key Name**: Identifiable name for the key's purpose
   - **Scope**: Select accessible API scope
   - **IP Restriction**: Allowed IP addresses (optional)
4. Click **Generate**

:::warning
API keys are displayed only once at creation. Store them securely and never expose them in client-side code or public repositories.
:::

### Using API Keys

Include the API key in the request header:

```http
GET /api/v1/users HTTP/1.1
Host: api.example.com
X-API-Key: your-api-key-here
Content-Type: application/json
```

### API Key Scopes

| Scope | Description | Allowed Endpoints |
|-------|-------------|-------------------|
| `read` | Read-only | GET requests only |
| `write` | Read/Write | GET, POST, PUT requests |
| `admin` | Full management | All requests (including DELETE) |
| `webhook` | Webhook only | Webhook-related endpoints only |

## OAuth 2.0

### Supported Flows

| Flow | Use Case | Recommended For |
|------|----------|-----------------|
| Authorization Code | Server-side apps | Web applications |
| Authorization Code + PKCE | Client-side apps | SPAs, Mobile apps |
| Client Credentials | Service-to-service | Backend services |

### Authorization Code Flow

#### Step 1: Authorization Request

Redirect the user to the authorization page:

```http
GET /oauth/authorize?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=read write
  &state=random_state_string
Host: auth.example.com
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `response_type` | Yes | Fixed value: `code` |
| `client_id` | Yes | Client ID from app registration |
| `redirect_uri` | Yes | Redirect URI after authorization |
| `scope` | Yes | Requested permission scope (space-separated) |
| `state` | Recommended | Random string for CSRF prevention |

#### Step 2: Token Exchange

Exchange the authorization code for an Access Token:

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

#### Response Example

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "scope": "read write"
}
```

## Token Management

### Refreshing Access Tokens

```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

### Token Lifetimes

| Token Type | Validity | Renewal Method |
|------------|----------|----------------|
| Access Token | 1 hour | Refresh Token |
| Refresh Token | 30 days | Re-authentication required |
| Authorization Code | 10 minutes | Re-authorization required |

### Revoking Tokens

```http
POST /oauth/revoke HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
&token_type_hint=access_token
```

:::tip
Always revoke tokens when users log out or disconnect app integrations.
:::

## Authentication Headers

### Bearer Token

```http
GET /api/v1/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Authentication Error Codes

| Error Code | HTTP Status | Description | Resolution |
|------------|-------------|-------------|------------|
| `token_expired` | 401 | Token has expired | Refresh with Refresh Token |
| `token_invalid` | 401 | Invalid token | Re-authenticate |
| `token_revoked` | 401 | Token was revoked | Issue new token |
| `insufficient_scope` | 403 | Insufficient permissions | Request additional scope |
| `ip_restricted` | 403 | IP not allowed | Check API key IP settings |

:::note
All authentication errors include detailed information in the response body. Check the `details.reason` field for appropriate handling.
:::
