---
sidebar_position: 2
title: "エンドポイント"
description: "REST APIエンドポイント一覧、リクエスト/レスポンス形式、パラメータ、使用例です。"
---

# APIエンドポイント

このガイドでは、サービスが提供するREST APIエンドポイントをご案内します。すべてのAPIはJSON形式でリクエストとレスポンスを処理し、ベースURLは `https://api.example.com/v1` です。

## 一般情報

### ベースURL

```
https://api.example.com/v1
```

### 共通リクエストヘッダー

| ヘッダー | 必須 | 説明 |
|---------|------|------|
| `Authorization` | はい | `Bearer {access_token}` 形式 |
| `Content-Type` | はい | `application/json` |
| `Accept` | いいえ | `application/json`（デフォルト） |
| `X-Request-ID` | いいえ | リクエスト追跡用の一意のID |
| `Accept-Language` | いいえ | レスポンス言語（`ko`、`en`、`ja`） |

### 共通レスポンス形式

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

## ユーザーAPI

### ユーザー一覧の取得

ページネーション付きのユーザー一覧を取得します。

```http
GET /api/v1/users?page=1&limit=20&sort=created_at:desc HTTP/1.1
Host: api.example.com
Authorization: Bearer {access_token}
```

#### クエリパラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `page` | integer | いいえ | 1 | ページ番号 |
| `limit` | integer | いいえ | 20 | ページあたりの件数（最大100） |
| `sort` | string | いいえ | `created_at:desc` | ソート条件（`field:asc\|desc`） |
| `status` | string | いいえ | - | ステータスフィルター（`active`、`inactive`） |
| `search` | string | いいえ | - | 名前またはメールで検索 |

### ユーザーの作成

```http
POST /api/v1/users HTTP/1.1
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "山田太郎",
  "role": "member",
  "department": "マーケティング",
  "send_invitation": true
}
```

#### リクエストボディ

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `email` | string | はい | ユーザーメール（一意） |
| `name` | string | はい | ユーザー名 |
| `role` | string | はい | ロール（`admin`、`manager`、`member`、`viewer`） |
| `department` | string | いいえ | 部署 |
| `send_invitation` | boolean | いいえ | 招待メールを送信（デフォルト：`true`） |

## プロジェクトAPI

### プロジェクト一覧の取得

```http
GET /api/v1/projects?page=1&limit=10&status=active HTTP/1.1
```

### プロジェクトの作成

```http
POST /api/v1/projects HTTP/1.1
Content-Type: application/json

{
  "name": "新規プロジェクト",
  "description": "プロジェクトの説明。",
  "visibility": "private",
  "members": ["usr_01H8X3K2M5N7P9Q"]
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | はい | プロジェクト名 |
| `description` | string | いいえ | プロジェクトの説明 |
| `visibility` | string | いいえ | 公開範囲（`public`、`private`）、デフォルト：`private` |
| `members` | array | いいえ | 初期メンバーのユーザーID |

## Webhook API

### Webhookの登録

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

### サポートされるイベント

| イベント | 説明 |
|---------|------|
| `user.created` | 新規ユーザーが作成された |
| `user.updated` | ユーザー情報が更新された |
| `user.deleted` | ユーザーが削除された |
| `project.created` | 新規プロジェクトが作成された |
| `project.updated` | プロジェクト情報が更新された |
| `project.archived` | プロジェクトがアーカイブされた |

:::tip
`X-Webhook-Signature` ヘッダーを検証してリクエストの整合性を確認してください。署名はHMAC-SHA256で生成されます。
:::
