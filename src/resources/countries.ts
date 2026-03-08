import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

interface CountryOpts {
  json?: boolean;
  format?: string;
  fields?: string;
}

export const countriesResource = new Command("countries")
  .description("List supported countries");

// ── LIST ──────────────────────────────────────────────
countriesResource
  .command("list")
  .description("List all supported countries")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", `
Examples:
  calendarific-cli countries list
  calendarific-cli countries list --json`)
  .action(async (opts: CountryOpts) => {
    try {
      const res = (await client.get("/countries")) as {
        response: { countries: Record<string, unknown>[] };
      };
      const countries = res.response.countries.map((c: Record<string, unknown>) => ({
        name: c.country_name,
        code: c["iso-3166"],
        total_holidays: c.total_holidays,
        supported_languages: c.supported_languages,
      }));

      const fields = opts.fields?.split(",");
      output(countries, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
