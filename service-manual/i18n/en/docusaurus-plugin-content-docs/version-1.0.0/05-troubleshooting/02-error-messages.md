---
sidebar_position: 2
title: "Error Messages"
description: "Explanation of error messages displayed during service use, their causes, and resolution methods."
---

# Error Messages

This guide covers error messages that may appear during service use and how to resolve them. Check the cause and resolution for each error code.

## Error Message Format

Error messages in the service follow this format:

```
[Error Code] Error Description
Example: [E1001] Authentication failed. Please check your email or password.
```

:::tip
Recording the error code helps expedite resolution when contacting technical support.
:::

## Authentication Errors (E1xxx)

| Code | Message | Cause | Resolution |
|------|---------|-------|------------|
| E1001 | Authentication failed | Email or password mismatch | Verify credentials and retry |
| E1002 | Account is locked | 5 consecutive login failures | Wait 30 minutes or contact admin |
| E1003 | Session has expired | Extended inactivity | Log in again |
| E1004 | Access denied | Insufficient permissions | Request permissions from admin |
| E1005 | Token is invalid | API token expired or revoked | Issue a new token |
| E1006 | Two-factor authentication required | Security policy requires 2FA | Check authenticator app for code |

### E1001: Authentication Failed

**Details:**

Occurs when the email or password entered during login does not match the registered information.

**Resolution Steps:**

1. Check for typos in the email address
2. Verify Caps Lock is disabled
3. Try resetting your password
4. Check if the account was created via social login

:::warning
After 5 consecutive incorrect password attempts, the account is automatically locked (E1002). Enter credentials carefully.
:::

### E1004: Access Denied

**Details:**

Occurs when the current account's role does not have permission to access the requested resource.

**Resolution Steps:**

1. Check your current role: **Profile > Account Info > Role**
2. Request necessary permissions from an administrator
3. Verify you're logged into the correct account

## Data Errors (E2xxx)

| Code | Message | Cause | Resolution |
|------|---------|-------|------------|
| E2001 | Data not found | Requested resource doesn't exist | Verify URL or ID |
| E2002 | Failed to save data | Server storage error | Retry after a moment |
| E2003 | Invalid input | Missing required fields or format error | Check input form |
| E2004 | Duplicate data exists | Unique field value conflict | Use a different value |
| E2005 | Data size exceeded | Input exceeds allowed limits | Reduce data size |
| E2006 | Referenced data deleted | Linked data already removed | Check references |

### E2003: Invalid Input

**Details:**

Occurs when required fields are empty or input format is incorrect during form submission.

**Common Validation Rules:**

| Field Type | Rule | Example |
|------------|------|---------|
| Email | RFC 5322 format | `user@example.com` |
| Phone | Numbers and hyphens only | `010-1234-5678` |
| Password | Min 8 chars, letters+numbers+special | `MyP@ss1234` |
| Date | ISO 8601 format | `2024-01-15` |
| URL | Must start with http:// or https:// | `https://example.com` |

## File Errors (E3xxx)

| Code | Message | Cause | Resolution |
|------|---------|-------|------------|
| E3001 | File upload failed | Network or server error | Check network and retry |
| E3002 | File size exceeded | Exceeds maximum allowed size | Compress or split file |
| E3003 | Unsupported file format | File extension not allowed | Convert to supported format |
| E3004 | Insufficient storage | Storage quota exceeded | Delete files or upgrade plan |
| E3005 | File is corrupted | Data corruption during upload | Verify original and re-upload |

### E3002: File Size Exceeded

**Per-Plan File Size Limits:**

| Plan | Max Single File | Daily Upload Limit |
|------|-----------------|-------------------|
| Basic | 50MB | 500MB |
| Pro | 100MB | 2GB |
| Enterprise | 500MB | Unlimited |

:::note
Use the dedicated media upload feature for video files. Different size limits apply compared to general file uploads.
:::

## Network Errors (E4xxx)

| Code | Message | Cause | Resolution |
|------|---------|-------|------------|
| E4001 | Cannot connect to server | Network disconnected | Check internet connection |
| E4002 | Request timed out | Server response delayed | Retry after a moment |
| E4003 | Request limit exceeded | API rate limit reached | Wait and retry |
| E4004 | Service under maintenance | Scheduled/emergency maintenance | Retry after maintenance |
| E4005 | SSL certificate error | Certificate expired or mismatch | Check system time, contact admin |

### E4002: Request Timed Out

**Details:**

Occurs when the server does not respond within the specified time (default 30 seconds).

**Resolution Steps:**

1. Check network connection status
2. Refresh the page
3. For large data requests, apply filters to reduce scope
4. Contact support if the issue persists

:::warning
Repeated timeout errors may indicate high server load. Try again outside peak hours (9-10 AM).
:::

## System Errors (E5xxx)

| Code | Message | Cause | Resolution |
|------|---------|-------|------------|
| E5001 | System error occurred | Internal server error | Retry later, contact support if persistent |
| E5002 | Database connection error | DB server issue | Contact administrator |
| E5003 | External service error | Integrated service failure | Check service status |
| E5004 | Insufficient memory | Server resource shortage | Contact administrator |
| E5005 | Configuration error | System setting mismatch | Contact administrator |

## Error Code Quick Reference

| Code Range | Category | Primary Action |
|------------|----------|----------------|
| E1xxx | Authentication/Permissions | Verify login info, request permissions |
| E2xxx | Data | Check input values, verify data integrity |
| E3xxx | Files | Check file size/format |
| E4xxx | Network | Check connection, retry |
| E5xxx | System | Contact admin, retry later |

:::note
If an error code is not listed above, it may have been added in a service update. Contact technical support with the error code.
:::
