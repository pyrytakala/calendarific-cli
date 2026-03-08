import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

interface HolidayOpts {
  json?: boolean;
  format?: string;
  fields?: string;
  country: string;
  year: string;
  month?: string;
  day?: string;
  location?: string;
  type?: string;
  language?: string;
}

export const holidaysResource = new Command("holidays")
  .description("Look up holidays by country and year");

// ── LIST ──────────────────────────────────────────────
holidaysResource
  .command("list")
  .description("List holidays for a country and year")
  .requiredOption("--country <code>", "Country code (ISO 3166, e.g. US, GB, DE)")
  .requiredOption("--year <year>", "Year (e.g. 2025)")
  .option("--month <month>", "Filter by month (1-12)")
  .option("--day <day>", "Filter by day (1-31)")
  .option("--location <loc>", "State/region code (e.g. us-ny)")
  .option("--type <type>", "Holiday type: national, local, religious, observance")
  .option("--language <lang>", "Language code (ISO 639, e.g. en, de) [premium]")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", `
Examples:
  calendarific-cli holidays list --country US --year 2025
  calendarific-cli holidays list --country GB --year 2025 --type national
  calendarific-cli holidays list --country US --year 2025 --month 12 --json`)
  .action(async (opts: HolidayOpts) => {
    try {
      const params: Record<string, string> = {
        country: opts.country,
        year: opts.year,
      };
      if (opts.month) params.month = opts.month;
      if (opts.day) params.day = opts.day;
      if (opts.location) params.location = opts.location;
      if (opts.type) params.type = opts.type;
      if (opts.language) params.language = opts.language;

      const res = (await client.get("/holidays", params)) as {
        response: { holidays: Record<string, unknown>[] };
      };
      const holidays = res.response.holidays.map((h: Record<string, unknown>) => ({
        name: h.name,
        date: (h.date as Record<string, unknown>)?.iso,
        type: Array.isArray(h.type) ? h.type.join(", ") : h.type,
        country: (h.country as Record<string, unknown>)?.name,
        locations: h.locations ?? "All",
      }));

      const fields = opts.fields?.split(",");
      output(holidays, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
