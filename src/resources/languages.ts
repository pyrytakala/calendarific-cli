import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

interface LanguageOpts {
  json?: boolean;
  format?: string;
  fields?: string;
}

export const languagesResource = new Command("languages")
  .description("List supported languages");

// ── LIST ──────────────────────────────────────────────
languagesResource
  .command("list")
  .description("List all supported languages")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", `
Examples:
  calendarific-cli languages list
  calendarific-cli languages list --json`)
  .action(async (opts: LanguageOpts) => {
    try {
      const res = (await client.get("/languages")) as {
        response: { languages: Record<string, unknown>[] };
      };
      const languages = res.response.languages.map((l: Record<string, unknown>) => ({
        code: l.code,
        name: l.name,
      }));

      const fields = opts.fields?.split(",");
      output(languages, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
