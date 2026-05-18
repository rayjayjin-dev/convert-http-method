---
sidebar_position: 3
title: "エラーコード"
description: "APIエラーレスポンス形式、HTTPステータスコード、カスタムエラーコード、エラー処理のベストプラクティスです。"
---

# エラーコード

このガイドでは、APIリクエスト処理中に発生する可能性のあるエラーコードとレスポンス形式をご案内します。適切なエラー処理により、安定したサービス連携が可能になります。

## エラーレスポンス形式

すべてのエラーレスポンスは以下のJSON構造に従います：

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "リクエストされたリソースが見つかりません。",
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

### エラーレスポンスフィールド

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `success` | boolean | 常に `false` |
| `error.code` | string | 一意のエラーコード（UPPER_SNAKE_CASE） |
| `error.message` | string | 人間が読めるエラーの説明 |
| `error.details` | object | 追加のエラー詳細（任意） |
| `error.doc_url` | string | エラー解決ドキュメントへのリンク（任意） |
| `meta.requestId` | string | 一意のリクエスト追跡ID |

## HTTPステータスコード

### 成功（2xx）

| コード | 説明 | 用途 |
|--------|------|------|
| `200 OK` | リクエスト成功 | GET、PUT成功 |
| `201 Created` | リソース作成 | POSTで新規リソース作成 |
| `204 No Content` | 成功（ボディなし） | DELETE成功 |

### クライアントエラー（4xx）

| コード | 説明 | 一般的な原因 |
|--------|------|-------------|
| `400 Bad Request` | 無効なリクエスト | 不正なボディ、フィールド不足 |
| `401 Unauthorized` | 認証失敗 | トークン期限切れ、無効な認証情報 |
| `403 Forbidden` | アクセス拒否 | 権限不足、IP制限 |
| `404 Not Found` | リソースが見つからない | 存在しないリソースへのリクエスト |
| `409 Conflict` | 競合 | リソースの重複作成 |
| `422 Unprocessable Entity` | バリデーション失敗 | 入力値の検証エラー |
| `429 Too Many Requests` | レート制限超過 | リクエスト過多 |

### サーバーエラー（5xx）

| コード | 説明 | 一般的な原因 |
|--------|------|-------------|
| `500 Internal Server Error` | サーバーエラー | 予期しないサーバー障害 |
| `502 Bad Gateway` | ゲートウェイエラー | 上流サービスのエラー |
| `503 Service Unavailable` | サービス利用不可 | メンテナンス、過負荷 |

## カスタムエラーコード

### 認証エラー

| コード | HTTP | 説明 | 解決方法 |
|--------|------|------|---------|
| `AUTH_TOKEN_EXPIRED` | 401 | アクセストークンの期限切れ | リフレッシュトークンで更新 |
| `AUTH_TOKEN_INVALID` | 401 | 無効なトークン | 再認証 |
| `AUTH_CREDENTIALS_INVALID` | 401 | 無効な認証情報 | メール/パスワードを確認 |
| `AUTH_API_KEY_INVALID` | 401 | 無効なAPIキー | APIキーを再発行 |
| `AUTH_INSUFFICIENT_SCOPE` | 403 | スコープ不足 | 追加権限をリクエスト |

### リソースエラー

| コード | HTTP | 説明 | 解決方法 |
|--------|------|------|---------|
| `RESOURCE_NOT_FOUND` | 404 | リソースが見つからない | リソースIDを確認 |
| `RESOURCE_ALREADY_EXISTS` | 409 | リソースが既に存在 | 一意のフィールド値を変更 |
| `RESOURCE_DELETED` | 410 | リソースが削除済み | 別のリソースを使用 |

## エラー処理のベストプラクティス

### リトライ戦略

| エラー種類 | リトライ可能 | 推奨戦略 |
|-----------|------------|---------|
| 4xx（クライアント） | いいえ | リクエストを修正して再試行 |
| 429（レート制限） | はい | `Retry-After` ヘッダー値を待つ |
| 500（サーバー） | はい | 指数バックオフ（最大3回リトライ） |
| 502、503、504 | はい | 指数バックオフ（最大5回リトライ） |

:::tip
エラーレスポンスの `meta.requestId` をログに記録してください。このIDをサポートに提供すると、問題の迅速な解決に役立ちます。
:::
