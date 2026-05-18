---
sidebar_position: 1
title: "User Management"
description: "Manage system users including adding, removing, role assignment, and bulk operations."
---

# User Management

This guide covers how to effectively manage users registered in the system, including adding and removing users, assigning roles, managing user lists, and performing bulk operations.

## Adding Users

### Individual User Registration

1. Navigate to **User Management** in the admin panel
2. Click **+ Add User**
3. Enter user information:
   - **Email**: Login email address
   - **Name**: Display name
   - **Department**: Select department
   - **Role**: Select role to assign
4. Check **Send Invitation Email**
5. Click **Save** to complete registration

:::tip
Invitation emails allow users to set their own passwords. Invitation links are valid for 72 hours.
:::

### Required Fields

| Field | Required | Description |
|-------|----------|-------------|
| Email | Yes | Used as login ID, must be unique |
| Name | Yes | Display name in the system |
| Department | No | Organizational department |
| Role | Yes | Determines access permissions |
| Phone | No | For 2FA and notifications |

## Removing Users

### Deletion Process

1. Select the user to delete from the **User Management** list
2. Click **Delete** in the top menu
3. Choose a deletion option:
   - **Immediate Deletion**: Deactivates the account immediately
   - **Grace Period**: Auto-deletes after 30 days (recoverable)
4. Click **Confirm**

:::warning
Data from immediately deleted users cannot be recovered. Use grace period deletion for accounts with important data.
:::

### Data Handling on Deletion

| Data Type | Treatment |
|-----------|-----------|
| Personal Settings | Deleted |
| Created Documents | Archived (admin accessible) |
| Project History | Archived |
| Comments & Activity Logs | Anonymized and archived |
| Uploaded Files | Transferred to project ownership |

## Role Assignment

Assign appropriate roles to manage user access permissions.

### Default Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| System Admin | Full system management | All features |
| Project Manager | Project-level management | Create/delete projects, manage members |
| General User | Basic usage permissions | Create/edit tasks, view documents |
| Viewer | Read-only access | View content only |

### Changing Roles

1. Click the target user in the user list
2. Select the **Role** tab
3. Choose a new role from the dropdown
4. Enter a **Change Reason** (for audit logs)
5. Click **Apply**

:::note
Role changes take effect immediately. Changes reflect on next login or within 5 minutes for active sessions.
:::

## User List Management

### Filtering

| Filter | Description |
|--------|-------------|
| Status | Active, Inactive, Pending, Locked |
| Role | Users with a specific role |
| Department | Users in a specific department |
| Join Date | Users who joined within a period |
| Last Login | Filter by recent access |

### Exporting

Export user lists in the following formats:

- **CSV**: For spreadsheet applications
- **Excel**: Formatted Excel file
- **PDF**: Print-ready report

## Bulk Operations

### Bulk User Registration

Register multiple users at once using a CSV file.

```csv
email,name,department,role
user1@example.com,John Smith,Engineering,General User
user2@example.com,Jane Doe,Marketing,General User
user3@example.com,Bob Wilson,Design,Project Manager
```

1. Navigate to **User Management** > **Bulk Registration**
2. Download the CSV template
3. Fill in user information
4. Upload the completed CSV file
5. Review the preview
6. Click **Bulk Register**

:::danger
Duplicate email checks are performed automatically. Duplicates are skipped and reported in the results summary.
:::

### Bulk Operation Types

| Operation | Description | Max Count |
|-----------|-------------|-----------|
| Bulk Registration | Register users via CSV | 500 |
| Bulk Role Change | Change roles for selected users | 100 |
| Bulk Deactivation | Deactivate selected users | 100 |
| Bulk Deletion | Delete selected users | 50 |
| Bulk Re-invite | Resend invitations to pending users | 200 |

:::tip
Schedule bulk operations during off-peak hours to minimize system load. Use the scheduled execution feature to process at a specified time.
:::
