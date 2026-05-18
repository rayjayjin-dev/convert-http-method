---
sidebar_position: 3
title: "FAQ"
description: "Frequently asked questions about accounts, features, billing, and technical topics."
---

# Frequently Asked Questions (FAQ)

Find answers to commonly asked questions about the service, organized by category.

## Account

### How do I sign up?

Click the **Sign Up** button on the service homepage and enter:

1. Email address (used as login ID)
2. Password (8+ characters, letters + numbers + special characters)
3. Name and organization information
4. Terms of service agreement

A verification email is sent after registration. Complete email verification to access the service.

:::tip
Signing up with a company email may automatically invite you to your organization's workspace.
:::

### I forgot my password. How do I reset it?

1. Click **Forgot Password** on the login page
2. Enter the email address used during registration
3. Click the reset link sent to your email
4. Set a new password

:::note
Password reset links are valid for 24 hours. Request a new one if expired.
:::

### I want to delete my account

Account deletion is available at **Settings > Account > Delete Account**.

:::warning
Account deletion permanently removes all data and cannot be undone. Back up necessary data before proceeding. There is a 30-day grace period after deletion request; logging in during this period cancels the deletion.
:::

### Can I change my email address?

Yes, change your email at **Settings > Account > Change Email**. A verification email is sent to the new address, and the change takes effect after verification.

## Features

### What browsers are supported?

The latest 2 versions of the following browsers are officially supported:

| Browser | Minimum Version | Recommended |
|---------|-----------------|-------------|
| Chrome | 90+ | Latest |
| Firefox | 88+ | Latest |
| Safari | 14+ | Latest |
| Edge | 90+ | Latest |

:::note
Internet Explorer is not supported. Mobile browsers (Chrome Mobile, Safari Mobile) are supported.
:::

### Can I use the service offline?

Limited functionality is available offline:

- ✅ View previously opened documents
- ✅ Edit locally saved tasks
- ✅ Search cached data
- ❌ Sync new data
- ❌ Receive real-time notifications
- ❌ Upload/download files

Changes made offline sync automatically when you go back online.

### Can I export my data?

Yes, data can be exported in the following formats:

- **CSV** - Spreadsheet-compatible format
- **JSON** - Programming integration format
- **PDF** - Document archival format

Export at: **Settings > Data Management > Export**

:::tip
Large data exports may take time. A download link is sent via email when complete.
:::

### How do I change notification settings?

Configure individually at **Settings > Notifications**:

| Notification Type | Email | Push | In-App |
|-------------------|-------|------|--------|
| System Announcements | ✅ | ✅ | ✅ |
| Task Assignment | Optional | Optional | ✅ |
| Comments/Mentions | Optional | Optional | ✅ |
| Security Alerts | ✅ | ✅ | ✅ |
| Marketing | Optional | ❌ | ❌ |

## Billing

### What pricing plans are available?

| Plan | Monthly Price | Users | Storage | Key Features |
|------|--------------|-------|---------|--------------|
| Free | Free | Up to 3 | 1GB | Basic features |
| Basic | $9.90/user | Up to 10 | 5GB | Advanced search, export |
| Pro | $19.90/user | Up to 50 | 50GB | API access, custom roles |
| Enterprise | Contact us | Unlimited | Unlimited | Dedicated support, SLA |

:::note
Annual billing receives a 20% discount. All paid plans include a 14-day free trial.
:::

### I want to change my plan

Change your plan anytime at **Settings > Billing > Change Plan**.

- **Upgrade**: Applied immediately with prorated billing
- **Downgrade**: Applied at end of current billing cycle

:::warning
Downgrading may restrict access to features exclusive to your current plan. Back up data before changing.
:::

### What payment methods are accepted?

- Credit/Debit cards (Visa, Mastercard, local cards)
- Bank transfer (corporate customers)
- Invoice (Enterprise plan)

### What is the refund policy?

- Within 7 days of payment: Full refund
- After 7 days: Prorated refund for remaining period
- Annual billing: Refund minus used months

Request refunds at: **Settings > Billing > Request Refund** or contact support.

## Technical

### How do I start API integration?

1. Generate an API key at **Settings > API > API Keys**
2. Follow the [Authentication Guide](/docs/api-reference/authentication) to set up auth
3. Check the [Endpoints List](/docs/api-reference/endpoints) for available APIs

```bash
# Test API connection
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v1/health
```

:::tip
Use Sandbox API keys for development. The Sandbox environment lets you test APIs without affecting production data.
:::

### How do I set up Webhooks?

Receive real-time service events via Webhooks.

**Setup:**

1. Navigate to **Settings > API > Webhooks**
2. Click **Add New Webhook**
3. Configure the receiving URL and events to subscribe to
4. Save the secret key (for signature verification)

**Supported Events:**

| Event | Description |
|-------|-------------|
| `user.created` | New user created |
| `user.updated` | User information changed |
| `data.exported` | Data export completed |
| `payment.completed` | Payment completed |
| `system.alert` | System alert |

### What is the service availability (SLA)?

| Plan | SLA | Monthly Allowed Downtime |
|------|-----|--------------------------|
| Free / Basic | 99.5% | ~3.6 hours |
| Pro | 99.9% | ~43 minutes |
| Enterprise | 99.95% | ~22 minutes |

Service status is available in real-time at the [Status Page](https://status.example.com).

### Where is my data stored?

- **Primary Region**: South Korea (Seoul)
- **Backup Region**: Japan (Tokyo)
- **Encryption**: AES-256 (at rest and in transit)
- **Backup Frequency**: Daily automatic backup, 30-day retention

:::note
Enterprise plan allows selecting data storage regions. Contact us for compliance requirements (GDPR, privacy regulations).
:::

## Need More Help?

If you didn't find your answer above, reach out through these channels:

| Channel | Hours | Response Time |
|---------|-------|---------------|
| Email (support@example.com) | 24/7 | Within 24 business hours |
| Live Chat | Weekdays 09:00-18:00 | Immediate |
| Phone (1588-0000) | Weekdays 09:00-18:00 | Immediate |
| Community Forum | 24/7 | Community response |

:::tip
For urgent system outages, Enterprise plan customers have access to a 24/7 dedicated hotline.
:::
