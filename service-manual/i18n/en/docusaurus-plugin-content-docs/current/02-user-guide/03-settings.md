---
sidebar_position: 3
title: "Settings"
description: "Configure personal settings, notifications, themes, and language preferences."
---

# Settings

Customize the service to match your work environment. Configure your profile, notifications, theme, language, and more.

## Accessing Settings

To access the settings screen:

1. Click the **Profile Icon** in the top-right corner
2. Select **Settings** from the dropdown menu

Or use the keyboard shortcut `Ctrl + ,` (macOS: `⌘ + ,`).

## Personal Settings

### Profile Information

| Setting | Description | Required |
|---------|-------------|----------|
| Name | Display name in the service | Yes |
| Email | Login and notification email | Yes |
| Profile Photo | Avatar image (max 2MB) | No |
| Job Title | Position in the organization | No |
| Department | Department affiliation | No |
| Phone | Additional contact information | No |

### Password Change

1. Navigate to the **Security** tab
2. Enter your current password
3. Enter and confirm the new password
4. Click **Change**

:::note
Passwords must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
:::

### Two-Factor Authentication (2FA)

Enable 2FA for enhanced security:

1. Find the **Two-Factor Authentication** section in the **Security** tab
2. Click **Enable**
3. Scan the QR code with an authenticator app (e.g., Google Authenticator)
4. Enter the 6-digit code to complete setup

## Notification Settings

Fine-tune notifications to receive only important information.

### Notification Channels

| Channel | Description | Default |
|---------|-------------|---------|
| In-App | Displayed in the notification center | Enabled |
| Email | Sent to registered email | Enabled |
| Browser Push | Browser push notifications | Disabled |
| Slack | Sent to connected Slack channel | Disabled |

### Per-Event Settings

| Event | In-App | Email | Push |
|-------|--------|-------|------|
| Task Assignment | ✅ | ✅ | ✅ |
| Status Change | ✅ | ❌ | ❌ |
| Comment Mention | ✅ | ✅ | ✅ |
| Due Date Reminder | ✅ | ✅ | ✅ |
| Project Invitation | ✅ | ✅ | ❌ |
| System Announcement | ✅ | ✅ | ❌ |

### Do Not Disturb

Block notifications during specific time periods:

1. Navigate to **Do Not Disturb** in the **Notifications** tab
2. Set start and end times
3. Select applicable days

:::tip
Notifications for tasks labeled "Urgent" are still delivered during Do Not Disturb mode. This can be changed in **Exception Settings**.
:::

## Theme Settings

Customize the visual appearance of the service.

### Theme Modes

| Mode | Description |
|------|-------------|
| Light | Default light background theme |
| Dark | Dark background theme |
| System | Automatically follows OS settings |

### Changing Theme

1. Navigate to the **Appearance** tab
2. Select your preferred theme mode
3. Changes apply immediately

### Color Customization

Change the accent color per project:

```
Settings → Appearance → Accent Color → Select color or enter HEX code
```

Available preset colors: Blue (default), Green, Purple, Orange, Red, Gray

### Font Size Adjustment

| Size | Body | Heading |
|------|------|---------|
| Small | 13px | 20px |
| Normal (default) | 15px | 24px |
| Large | 17px | 28px |
| Extra Large | 19px | 32px |

## Language Settings

Change the display language of the service interface.

### Supported Languages

| Language | Code | Coverage |
|----------|------|----------|
| 한국어 | ko | Full |
| English | en | Full |
| 日本語 | ja | UI only |
| 中文 | zh | UI only |

### Changing Language

1. Find the **Language** section in the **General** tab
2. Select your preferred language from the dropdown
3. Click **Save**
4. The page refreshes with the selected language

:::note
Language settings apply to the UI only. User-generated content (task names, comments, etc.) remains in its original language.
:::

## Data Management

### Data Export

Export your personal data:

1. Navigate to the **Data** tab
2. Select the data range to export
3. Choose a format (JSON, CSV)
4. Click **Export**

### Account Deletion

:::danger Warning
Account deletion is irreversible. Back up all necessary data before proceeding.
:::

To delete your account:

1. Navigate to **Account Deletion** in the **Data** tab
2. Enter your password for verification
3. Select a reason for deletion
4. Click **Delete Account**
