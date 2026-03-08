# calendarific-cli

CLI for the Calendarific Holiday API. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install pyrytakala/calendarific-cli
```

## Usage

```bash
calendarific-cli auth set "your-api-key"
calendarific-cli auth test
calendarific-cli --help
```

Get your API key at https://calendarific.com/signup

## Resources

### holidays

| Command | Description |
|---------|-------------|
| `calendarific-cli holidays list --country US --year 2025` | List holidays for a country and year |
| `calendarific-cli holidays list --country US --year 2025 --month 12` | Filter by month |
| `calendarific-cli holidays list --country US --year 2025 --type national` | Filter by holiday type |
| `calendarific-cli holidays list --country US --year 2025 --location us-ny` | Filter by state/region |

### countries

| Command | Description |
|---------|-------------|
| `calendarific-cli countries list` | List all supported countries |

### languages

| Command | Description |
|---------|-------------|
| `calendarific-cli languages list` | List all supported languages |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
