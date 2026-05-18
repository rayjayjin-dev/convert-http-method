---
sidebar_position: 2
title: "Installation"
description: "System requirements and installation procedures for the service."
---

# Installation

This document guides you through installing the service and completing the initial setup.

## System Requirements

Minimum system requirements for running the service smoothly:

### Hardware Requirements

| Item | Minimum | Recommended |
|------|---------|-------------|
| CPU | 2+ cores | 4+ cores |
| Memory | 4GB RAM | 8GB+ RAM |
| Disk | 20GB free space | 50GB+ free space |
| Network | 10Mbps | 100Mbps+ |

### Software Requirements

- **OS**: Windows 10+, macOS 12+, Ubuntu 20.04+
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: 18.x or higher (for server installation)
- **Database**: PostgreSQL 14+ or MySQL 8.0+

## Installation Steps

### Step 1: Download Installation Files

Download the installer for your operating system from the official download page.

```bash
# Linux/macOS
curl -fsSL https://example.com/install.sh | bash

# Or use a package manager
npm install -g @example/service-cli
```

### Step 2: Install Dependencies

Install the required dependencies in your project directory.

```bash
cd my-project
npm install
```

### Step 3: Configure Environment

Create the environment configuration file and fill in the required values.

```bash
cp .env.example .env
```

Key environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_PORT` | Service port number | 3000 |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | service_db |
| `SECRET_KEY` | Encryption key | (required) |

### Step 4: Initialize Database

Create the database schema and set up initial data.

```bash
npm run db:migrate
npm run db:seed
```

### Step 5: Start the Service

Once all configuration is complete, start the service.

```bash
# Development mode
npm run dev

# Production mode
npm run start
```

## Initial Setup

After starting the service for the first time, complete the following:

1. **Create admin account**: Set up the administrator account on first access
2. **Enter organization info**: Configure organization name, logo, and defaults
3. **Invite users**: Invite team members and assign roles
4. **Configure notifications**: Set up email and notification channels

## Verify Installation

Run the following commands to verify the installation:

```bash
npm run health-check
npm run version
```

If installed correctly, navigate to `http://localhost:3000` in your browser to see the login screen.

## Troubleshooting

If you encounter issues during installation, refer to the **Troubleshooting > Common Issues** section.
