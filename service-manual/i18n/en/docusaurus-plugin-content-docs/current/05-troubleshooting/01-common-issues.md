---
sidebar_position: 1
title: "Common Issues"
description: "Solutions for frequently encountered problems including login, performance, connectivity, and data sync issues."
---

# Common Issues

This guide covers frequently encountered problems and their solutions. For each issue, check the symptoms, causes, and resolution steps.

## Login Issues

### Cannot Log In

**Symptoms:** Login fails despite entering correct email and password.

**Causes:**
- Caps Lock is enabled
- Account is deactivated or locked
- Browser cache/cookie issues

**Resolution:**

1. Verify Caps Lock is off
2. Try resetting your password
3. Clear browser cache and cookies
4. Try logging in using incognito/private mode

:::tip
After 5 consecutive failed login attempts, your account is automatically locked. Wait 30 minutes or contact an administrator to unlock.
:::

### Session Expires Frequently

**Symptoms:** Unexpectedly logged out or session expiration messages appear during work.

**Causes:**
- Security policy session timeout
- Simultaneous login from multiple devices
- Unstable network connection

**Resolution:**

1. Check the session timeout setting in system settings
2. Log out from other devices
3. Enable the "Stay logged in" option

:::note
Maximum session duration may be limited by security policies. Contact your administrator to request policy changes.
:::

## Performance Issues

### Slow Page Loading

**Symptoms:** Page transitions take more than 5 seconds.

**Causes:**
- Insufficient network bandwidth
- Browser extension conflicts
- Increased server load
- Corrupted local cache

**Resolution:**

1. Check your network connection
2. Disable unnecessary browser extensions
3. Clear browser cache and refresh
4. Test in a different browser

```bash
# Check network connectivity
ping api.example.com
traceroute api.example.com
```

### Slow Search Results

**Symptoms:** Results take a long time to appear after entering a search query.

**Resolution:**

1. Use more specific search terms
2. Apply filters to narrow the search scope
3. Request search index rebuild from an administrator

## Connection Errors

### Cannot Connect to Server

**Symptoms:** "Cannot connect to server" or "Network error" messages appear.

**Causes:**
- Internet connection lost
- Server maintenance in progress
- Firewall or proxy configuration issues
- DNS resolution failure

**Resolution:**

1. Check your internet connection
2. Check the service status page for maintenance
3. If using a VPN, disable it and retry
4. Verify DNS settings

:::warning
On corporate networks, firewall policies may block certain ports. Contact IT to ensure required ports (443, 8080) are open.
:::

### WebSocket Connection Drops

**Symptoms:** Real-time notifications not received or chat features not working.

**Resolution:**

1. Enable WebSocket support in proxy settings
2. Increase network timeout values (minimum 60 seconds recommended)
3. Check WebSocket connection status in browser DevTools Network tab

## Data Sync Issues

### Data Not Syncing

**Symptoms:** Changes made on one device are not reflected on another.

**Causes:**
- Sync service temporarily paused
- Conflicting changes exist
- Insufficient storage space
- Sync failure after offline changes

**Resolution:**

1. Check the sync status icon (🔄 syncing, ✅ complete, ⚠️ error)
2. Run manual sync: **Settings > Sync > Sync Now**
3. Resolve conflicts in the conflict resolution screen
4. Check storage space and delete unnecessary files if needed

:::tip
Default auto-sync interval is 5 minutes. For real-time sync, change to 1 minute in **Settings > Sync > Sync Interval**.
:::

### File Upload Fails

**Symptoms:** Errors occur during file upload or progress bar freezes.

**Causes:**
- File size exceeds limit (default max 100MB)
- Unsupported file format
- Unstable network connection
- Storage quota exceeded

**Resolution:**

1. Verify file size is within upload limits
2. Confirm the file format is supported
3. Compress large files before uploading
4. Check storage usage: **Settings > Storage > Usage**

| Plan | Max File Size | Total Storage |
|------|---------------|---------------|
| Basic | 50MB | 5GB |
| Pro | 100MB | 50GB |
| Enterprise | 500MB | Unlimited |

## If the Problem Persists

If the above solutions don't resolve your issue, contact technical support with the following information:

1. **Time of occurrence** - Exact date and time
2. **Environment** - OS, browser type and version
3. **Reproduction steps** - Specific steps to reproduce the issue
4. **Error message** - Complete error message text
5. **Screenshots** - Screen captures showing the problem

:::note
Including error logs from the browser DevTools Console tab (F12) helps expedite resolution.
:::
