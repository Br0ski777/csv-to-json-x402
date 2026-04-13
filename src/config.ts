import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "csv-to-json",
  slug: "csv-to-json",
  description: "Parse CSV to JSON array. Auto-detect delimiter and headers.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/parse",
      price: "$0.001",
      description: "Parse CSV text to JSON array",
      toolName: "data_parse_csv_to_json",
      toolDescription: "Use this when you need to convert CSV data to JSON. Auto-detects delimiter (comma, semicolon, tab, pipe). Supports header row detection. Returns array of objects with column names as keys. Do NOT use for JSON validation — use data_validate_json instead. Do NOT use for markdown conversion — use text_convert_markdown_to_html instead.",
      inputSchema: {
        type: "object",
        properties: {
          csv: { type: "string", description: "CSV content to parse" },
          delimiter: { type: "string", description: "Delimiter: comma, semicolon, tab, pipe (default: auto-detect)" },
          hasHeaders: { type: "boolean", description: "First row is headers (default: true)" },
        },
        required: ["csv"],
      },
    },
  ],
};
