---
name: calendarific-cli
description: "Manage calendarific via CLI - holidays, countries, languages. Use when user mentions 'calendarific' or wants to interact with the calendarific API."
---

# calendarific-cli

## Setup

If `calendarific-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle calendarific
npx api2cli link calendarific
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

```bash
calendarific-cli auth set "your-api-key"
calendarific-cli auth test
```

Get your API key at https://calendarific.com/signup

## Resources

### holidays

| Command | Description |
|---------|-------------|
| `calendarific-cli holidays list --country US --year 2025 --json` | List holidays for a country and year |
| `calendarific-cli holidays list --country US --year 2025 --month 12 --json` | Filter by month |
| `calendarific-cli holidays list --country US --year 2025 --type national --json` | Filter by type (national, local, religious, observance) |
| `calendarific-cli holidays list --country US --year 2025 --location us-ny --json` | Filter by state/region |

### countries

| Command | Description |
|---------|-------------|
| `calendarific-cli countries list --json` | List all supported countries |

### languages

| Command | Description |
|---------|-------------|
| `calendarific-cli languages list --json` | List all supported languages |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
