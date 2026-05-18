---
sidebar_position: 1
title: "Basic Usage"
description: "Learn the basics of using the dashboard, managing projects, and handling tasks."
---

# Basic Usage

This guide covers the fundamental operations for effectively using the service's core features, from dashboard navigation to project and task management.

## Dashboard

The dashboard is the first screen displayed after logging in. It provides an overview of key metrics and recent activity.

### Dashboard Components

| Component | Description | Location |
|-----------|-------------|----------|
| Summary Cards | Key metrics like project count, active tasks, completion rate | Top area |
| Recent Activity | Timeline of team members' recent actions | Center left |
| Notification Panel | Unread notifications and mentions | Center right |
| Quick Actions | Shortcut buttons for frequently used features | Bottom area |

### Customizing the Dashboard

You can rearrange dashboard widgets to suit your needs.

1. Click the **Edit** button in the top-right corner
2. Drag widgets to your preferred positions
3. Hide unnecessary widgets with the **×** button
4. Click **Save** to apply changes

:::tip
Dashboard layouts are saved as personal settings and persist across devices.
:::

## Project Management

Projects are the core organizational unit. Manage your team's work systematically by organizing it into projects.

### Creating a Project

1. Click **Projects** in the left sidebar
2. Click **+ New Project**
3. Fill in the project details:
   - **Project Name**: An identifiable name
   - **Description**: Purpose and scope
   - **Start/End Date**: Project timeline
   - **Team Members**: Select participants
4. Click **Create**

:::note
Project creation is restricted to users with Admin or Project Manager roles.
:::

### Project Views

The project list supports multiple view modes:

- **Card View**: Visual card-based display
- **List View**: Table format with detailed information
- **Timeline View**: Gantt chart format for schedules

### Project Status

| Status | Description |
|--------|-------------|
| Planning | Created but not yet started |
| In Progress | Active with ongoing tasks |
| On Hold | Temporarily paused |
| Completed | All tasks finished |
| Archived | Completed and archived |

## Task Management

Tasks represent individual work items within a project.

### Creating Tasks

```
Select Project → Tasks Tab → + New Task → Fill Details → Save
```

Available fields when creating a task:

- **Title**: Task name
- **Description**: Detailed content (Markdown supported)
- **Assignee**: Responsible team member
- **Priority**: Urgent, High, Normal, Low
- **Due Date**: Completion deadline
- **Labels**: Tags for categorization

### Changing Task Status

1. Click a task card to open the detail view
2. Select a new status from the dropdown
3. Add a comment if needed

:::tip
In Kanban view, drag and drop task cards to quickly change their status.
:::

### Filtering and Sorting

Filter tasks by various criteria:

| Filter | Description |
|--------|-------------|
| Assignee | Show tasks assigned to a specific member |
| Status | Show tasks with a specific status |
| Priority | Show tasks with a specific priority |
| Due Date | Show tasks within a date range |
| Label | Show tasks with a specific label |

## File Attachments

Attach files to tasks or projects to share with team members.

### Supported File Types

- Documents: PDF, DOCX, XLSX, PPTX, TXT
- Images: PNG, JPG, GIF, SVG
- Archives: ZIP, RAR
- Maximum file size: 50MB

### Attaching Files

1. Click the **Attachments** area in the task detail view
2. Select files or drag and drop them
3. Uploaded files appear in the file list

:::note
Uploaded files are accessible to all project team members. Check permission settings for sensitive files.
:::
