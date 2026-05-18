---
sidebar_position: 1
title: "認証"
description: "API認証方法、APIキー管理、OAuth 2.0フロー、トークン管理について説明します。"
---

# API認証

このガイドでは、サービスAPIにアクセスするための認証方法と設定をご案内します。すべてのAPIリクエストには有効な認証情報が必要です。認証されていないリクエストは `401 Unauthorized` を返します。

## 認証方法

サービスは2つの認証方法をサポートしています：

| 方法 | 用途 | 有効期限 |
|------|------|---------|
| APIキー | サーバー間通信 | 無制限（手動で失効） |
| OAuth 2.0 | ユーザー委任アクセス、サードパーティアプリ | アクセストークン：1時間 |

## APIキー管理

### APIキーの生成

1. 管理コンソールの**設定** > **APIキー管理**に移動
2. **＋新規APIキーを生成**をクリック
3. キーの詳細を入力：
   - **キー名**：キーの用途を識別できる名前
   - **スコープ**：アクセス可能なAPIスコープを選択
   - **IP制限**：許可するIPアドレス（任意）
4. **生成**をクリック

:::warning
APIキーは作成時に一度だけ表示されます。安全に保管し、クライアントサイドのコードや公開リポジトリに公開しないでください。
:::

### APIキーの使用

リクエストヘッダーにAPIキーを含めます：

```http
GET /api/v1/users HTTP/1.1
Host: api.example.com
X-API-Key: your-api-key-here
Content-Type: application/json
```

### APIキーのスコープ

| スコープ | 説明 | 許可されるエンドポイント |
|---------|------|----------------------|
| `read` | 読み取り専用 | GETリクエストのみ |
| `write` | 読み取り/書き込み | GET、POST、PUTリクエスト |
| `admin` | フル管理 | すべてのリクエスト（DELETEを含む） |
| `webhook` | Webhook専用 | Webhook関連エンドポイントのみ |

## OAuth 2.0

### サポートされるフロー

| フロー | 用途 | 推奨対象 |
|--------|------|---------|
| 認可コード | サーバーサイドアプリ | Webアプリケーション |
| 認可コード + PKCE | クライアントサイドアプリ | SPA、モバイルアプリ |
| クライアントクレデンシャル | サービス間通信 | バックエンドサービス |

### 認可コードフロー

#### ステップ1：認可リクエスト

ユーザーを認可ページにリダイレクトします：

```http
GET /oauth/authorize?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &scope=read write
  &state=random_state_string
Host: auth.example.com
```

#### ステップ2：トークン交換

認可コードをアクセストークンに交換します：

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

## トークン管理

### トークンの有効期間

| トークン種類 | 有効期間 | 更新方法 |
|-------------|---------|---------|
| アクセストークン | 1時間 | リフレッシュトークン |
| リフレッシュトークン | 30日 | 再認証が必要 |
| 認可コード | 10分 | 再認可が必要 |

### 認証エラーコード

| エラーコード | HTTPステータス | 説明 | 解決方法 |
|-------------|--------------|------|---------|
| `token_expired` | 401 | トークンの有効期限切れ | リフレッシュトークンで更新 |
| `token_invalid` | 401 | 無効なトークン | 再認証 |
| `token_revoked` | 401 | 失効したトークン | 新しいトークンを発行 |
| `insufficient_scope` | 403 | 権限不足 | 追加スコープをリクエスト |
| `ip_restricted` | 403 | IP制限 | APIキーのIP設定を確認 |
