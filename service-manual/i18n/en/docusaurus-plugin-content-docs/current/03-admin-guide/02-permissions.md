---
sidebar_position: 2
title: "Permissions"
description: "Role-Based Access Control (RBAC), permission configuration, and custom role creation."
---

# Permissions

This guide covers how to systematically manage access permissions using the Role-Based Access Control (RBAC) model, configure permissions, and create custom roles.

## Role-Based Access Control (RBAC)

The system uses Role-Based Access Control to manage user permissions.

### RBAC Structure

```
Organization
  └── Role
        └── Permission
              └── Resource + Action
```

### Core Concepts

| Concept | Description | Example |
|---------|-------------|---------|
| Role | Logical group of permissions | System Admin, Editor |
| Permission | Allowed action on a resource | Read documents, Create users |
| Resource | System object being accessed | Projects, Documents, Settings |
| Action | Operation on a resource | Create, Read, Update, Delete |

### Built-in Roles

| Role | Description | Editable | Deletable |
|------|-------------|----------|-----------|
| System Admin | Full access to all resources | No | No |
| Project Manager | Management within project scope | Yes | No |
| Editor | Content creation and editing | Yes | Yes |
| General User | Basic usage permissions | Yes | No |
| Viewer | Read-only access | Yes | Yes |

:::note
"System Admin" and "General User" roles cannot be deleted as they are essential for system operation.
:::

## Permission Configuration

### Permission Matrix

| Resource | Create | Read | Update | Delete | Manage |
|----------|--------|------|--------|--------|--------|
| Projects | ✓ | ✓ | ✓ | ✓ | ✓ |
| Documents | ✓ | ✓ | ✓ | ✓ | - |
| Tasks | ✓ | ✓ | ✓ | ✓ | - |
| Users | ✓ | ✓ | ✓ | ✓ | ✓ |
| System Settings | - | ✓ | ✓ | - | ✓ |
| Audit Logs | - | ✓ | - | - | - |

### Setting Permissions

1. Navigate to **Admin Panel** > **Permissions**
2. Select the role to configure
3. Set permission checkboxes per resource
4. Click **Save** to apply changes

:::warning
Permission changes immediately affect all users assigned to that role. Always verify the impact scope before making changes.
:::

### Permission Inheritance

Permissions inherit from higher to lower levels:

- **Organization Level**: Default permissions for the entire organization
- **Project Level**: Permissions within a specific project
- **Resource Level**: Fine-grained permissions on individual resources

```
Organization Permissions (default)
  ├── Project A Permissions (overridable)
  │     ├── Document 1 Permissions (fine-grained)
  │     └── Document 2 Permissions (fine-grained)
  └── Project B Permissions (overridable)
```

:::tip
Lower levels cannot expand permissions denied at higher levels.
:::

## Custom Roles

Create custom roles to meet specific organizational requirements.

### Creating Custom Roles

1. Navigate to **Permissions** > **Role List**
2. Click **+ Create New Role**
3. Enter role details:
   - **Role Name**: Identifiable name
   - **Description**: Purpose and scope
   - **Base Role**: Existing role to copy permissions from (optional)
4. Select required permissions from the matrix
5. Click **Create**

### Custom Role Examples

| Role | Base Role | Added Permissions | Removed Permissions | Use Case |
|------|-----------|-------------------|---------------------|----------|
| QA Lead | General User | Task management | - | Quality assurance |
| External Partner | Viewer | Edit specific projects | View user list | Partner access |
| Team Lead | Editor | Manage team, Generate reports | - | Team management |
| Auditor | Viewer | View audit logs, Reports | Edit content | Internal audits |

### Best Practices

:::tip
Follow these principles when creating custom roles:

- **Least Privilege**: Grant only the minimum permissions needed
- **Separation of Duties**: Separate conflicting responsibilities into different roles
- **Regular Review**: Review roles and permissions quarterly
- **Naming Convention**: Clearly express purpose and scope in role names
:::

## Permission Auditing

### Audit Log Fields

| Field | Description |
|-------|-------------|
| Timestamp | When the change occurred |
| Changed By | Administrator who made the change |
| Target | Role or user affected |
| Change Details | Previous and new values |
| Reason | Change reason (if provided) |

### Permission Reports

Generate reports for regular permission reviews:

1. **Per-User Permissions**: All permissions granted to each user
2. **Per-Role Users**: User count and list for each role
3. **Unused Permissions**: Identify granted but unused permissions
4. **Change History**: All permission changes within a period

:::note
Audit logs are retained for a minimum of 1 year and cannot be deleted for compliance purposes.
:::
