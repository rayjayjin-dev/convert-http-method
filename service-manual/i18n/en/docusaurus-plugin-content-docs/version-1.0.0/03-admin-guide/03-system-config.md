---
sidebar_position: 3
title: "System Configuration"
description: "Global settings, security policies, backup/restore, and log management."
---

# System Configuration

This guide covers system-wide settings including global configuration, security policies, backup and restore procedures, and log management.

## Global Settings

### General Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Site Name | System display name | Service Manual |
| Default Language | Default display language | Korean (ko) |
| Timezone | Date/time display reference | Asia/Seoul (UTC+9) |
| Date Format | Date display format | YYYY-MM-DD |
| Session Timeout | Auto-logout after inactivity | 30 minutes |
| Max Upload Size | Maximum file upload size | 50MB |

### Changing Settings

1. Navigate to **Admin Panel** > **System Settings** > **General**
2. Modify the desired setting values
3. Click **Save**
4. Some settings require a system restart

:::note
Settings requiring a restart display a notification message. Previous settings remain active until restart.
:::

### Notification Settings

Configure system notification delivery:

- **Email Notifications**: SMTP server configuration and templates
- **In-App Notifications**: Real-time notification settings
- **Webhooks**: External service integration

```
SMTP Configuration Example:
  Host: smtp.example.com
  Port: 587
  Encryption: TLS
  Authentication: Enabled
```

## Security Policies

### Password Policy

| Policy | Description | Recommended |
|--------|-------------|-------------|
| Minimum Length | Minimum character count | 8+ characters |
| Complexity | Character type requirements | 3+ types combined |
| Expiration | Password change interval | 90 days |
| History Limit | Prevent reuse of recent passwords | Last 5 |
| Lockout Threshold | Account lock after failed attempts | 5 failures |
| Lockout Duration | Auto-unlock wait time | 30 minutes |

### Two-Factor Authentication (2FA)

1. Navigate to **Security Policies** > **Two-Factor Authentication**
2. Select authentication method:
   - **TOTP**: Time-based one-time password (Google Authenticator, etc.)
   - **SMS**: Verification code via text message
   - **Email**: Verification code via email
3. Set enforcement scope:
   - Required for all users
   - Required for admin roles only
   - Optional

:::warning
Enabling mandatory 2FA for all users requires unregistered users to complete 2FA setup on next login. Advance notice is recommended.
:::

### IP Access Control

Restrict system access to specific IP addresses or ranges:

| Setting | Description |
|---------|-------------|
| Whitelist | IP addresses/ranges allowed access |
| Blacklist | IP addresses/ranges blocked from access |
| Admin-Only IP | Restrict admin panel access to specific IPs |

:::danger
Misconfigured IP access control can block all users. Always verify your current IP is in the whitelist before saving changes.
:::

## Backup & Restore

### Automatic Backup Settings

| Setting | Description | Recommended |
|---------|-------------|-------------|
| Frequency | Backup execution interval | Daily |
| Time | Backup execution time | 03:00 AM |
| Retention | Backup file retention period | 30 days |
| Scope | Data included in backup | Full (DB + Files) |
| Location | Backup storage path | /backup or external storage |

### Backup Types

- **Full Backup**: Complete backup including database and uploaded files
- **Incremental Backup**: Only data changed since last backup
- **Configuration Backup**: System configuration files only

### Manual Backup

1. Navigate to **System Settings** > **Backup Management**
2. Click **Backup Now**
3. Select backup type and scope
4. Receive notification when complete

:::tip
Always perform a manual backup before system updates or major configuration changes.
:::

### Restore Procedure

1. Select a backup from **Backup Management** > **Backup List**
2. Click **Restore**
3. Choose restore options:
   - **Full Restore**: Revert all data to backup point
   - **Selective Restore**: Restore specific data only
4. Click **Start Restore** in the confirmation dialog

:::danger
Restore operations overwrite current data. It is strongly recommended to create a backup of the current state before restoring.
:::

## Log Management

### Log Types

| Log Type | Description | Retention |
|----------|-------------|-----------|
| Access Logs | User login/logout records | 1 year |
| Activity Logs | User action records | 6 months |
| System Logs | System events and errors | 3 months |
| Security Logs | Security events (failed logins, etc.) | 1 year |
| Audit Logs | Permission and setting changes | 2 years |

### Viewing Logs

1. Navigate to **System Settings** > **Log Management**
2. Select the log type
3. Set filter conditions:
   - **Period**: Date range
   - **User**: Specific user's logs
   - **Event Type**: Specific events
   - **Severity**: Info, Warning, Error, Critical
4. Click **Search**

### Log Export

- **File Export**: Download as CSV or JSON
- **Syslog Integration**: Real-time forwarding to external log collectors
- **SIEM Integration**: Security Information and Event Management system connection

### Log Alert Settings

| Alert Condition | Description | Default |
|-----------------|-------------|---------|
| Repeated Login Failures | Same account fails N+ times | 5 times, immediate |
| Permission Changes | Admin role permission modified | Immediate |
| System Errors | Critical error occurred | Immediate |
| Mass Deletion | Deletion exceeds threshold | 100 items, immediate |
| Unauthorized Access | Access attempt from blocked IP | Immediate |

:::tip
Set appropriate alert thresholds to prevent alert fatigue. Thresholds that are too low generate unnecessary notifications.
:::
