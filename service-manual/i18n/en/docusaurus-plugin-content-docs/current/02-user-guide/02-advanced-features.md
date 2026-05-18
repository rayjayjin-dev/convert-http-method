---
sidebar_position: 2
title: "Advanced Features"
description: "Automation, workflows, integrations, and advanced filtering capabilities."
---

# Advanced Features

Leverage advanced features to automate repetitive tasks, build complex workflows, and integrate with external tools to maximize productivity.

## Automation Rules

Set up automation rules to execute actions automatically when specific conditions are met.

### Creating Automation Rules

1. Navigate to **Project Settings** → **Automation** tab
2. Click **+ New Rule**
3. Configure trigger conditions and actions

### Trigger Types

| Trigger | Description | Example |
|---------|-------------|---------|
| Status Change | When a task status changes | Task moved to "Done" |
| Assignee Change | When a task assignee changes | New assignee assigned |
| Due Date Approaching | When a deadline is near | 3 days before due date |
| Label Added | When a specific label is added | "Urgent" label added |
| Comment Added | When a new comment is posted | Comment contains a mention |

### Available Actions

When trigger conditions are met, the following actions can execute automatically:

- Auto-assign a team member
- Auto-change status
- Send notifications
- Auto-add/remove labels
- Auto-create subtasks

:::tip
Up to 10 automation rules can be chained for complex workflows. Be careful to avoid infinite loops.
:::

## Workflow Configuration

Workflows define the stages a task must go through. Customize workflows to match your project needs.

### Default Workflow

```
To Do → In Progress → In Review → Done
```

### Custom Workflows

1. Navigate to **Project Settings** → **Workflows** tab
2. Click **+ New Workflow**
3. Add stages and configure transition rules

```
Planning → Design → Development → QA → Deployment → Done
```

### Transition Rules

| Setting | Description |
|---------|-------------|
| Transition Permissions | Only specific roles can transition |
| Required Fields | Fields that must be filled before transition |
| Approval Required | Specific user approval needed |
| Auto-Notification | Automatic notification on transition |

:::note
Workflow changes are not applied retroactively. Only tasks created after the change use the new workflow.
:::

## Integrations

Connect external services to unify your work environment.

### Supported Integrations

| Service | Features | Setup |
|---------|----------|-------|
| Slack | Notifications, task creation | Webhook URL |
| GitHub | Commit linking, PR sync | OAuth |
| Google Calendar | Due date sync | API key |
| Jira | Bidirectional issue sync | API token |
| Email | Create tasks via email | Dedicated email address |

### Setting Up Integrations

1. Navigate to **Settings** → **Integrations**
2. Select the service to connect
3. Enter authentication credentials
4. Configure sync options

### Webhook Configuration

```json
{
  "url": "https://api.example.com/webhooks/incoming",
  "events": ["task.created", "task.updated", "task.completed"],
  "secret": "your-webhook-secret"
}
```

:::tip
Webhook events are retried up to 3 times. Requests that don't receive a response within 5 seconds are treated as timeouts.
:::

## Advanced Filtering & Search

Combine complex conditions to find exactly what you need.

### Filter Combinations

Combine multiple conditions with AND/OR operators:

```
(Assignee = "John" OR Assignee = "Jane")
AND Status != "Done"
AND Priority = "High"
AND Due Date < "2024-12-31"
```

### Saved Filters

Save frequently used filter combinations for quick reuse:

1. Set up filter conditions
2. Click **Save Filter**
3. Enter a filter name and save
4. Apply from the **Saved Filters** list in the sidebar

### Search Syntax

| Syntax | Description | Example |
|--------|-------------|---------|
| `""` | Exact phrase search | `"deployment complete"` |
| `AND` | All conditions met | `bug AND urgent` |
| `OR` | Any condition met | `frontend OR backend` |
| `NOT` | Exclude condition | `bug NOT resolved` |
| `label:` | Search by label | `label:urgent` |
| `assignee:` | Search by assignee | `assignee:john` |

## Reports & Analytics

Analyze project progress from multiple perspectives.

### Report Types

- **Burndown Chart**: Remaining work over time
- **Burnup Chart**: Completed work over time
- **Velocity Chart**: Completed tasks per sprint
- **Distribution Chart**: Tasks by status/assignee/priority

### Custom Reports

1. Click **+ New Report** in the Reports menu
2. Select data source and time period
3. Choose chart type and grouping criteria
4. Click **Generate**

:::note
Report data updates in real-time. Export to PDF or Excel is also available.
:::
