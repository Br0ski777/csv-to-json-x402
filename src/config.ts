import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "csv-to-json",
  slug: "csv-to-json",
  description: "Parse CSV to JSON array -- auto-detect delimiter (comma/semicolon/tab/pipe), header row support.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/parse",
      price: "$0.001",
      description: "Parse CSV text to JSON array",
      toolName: "data_parse_csv_to_json",
      toolDescription: `Use this when you need to convert CSV data to a JSON array. Returns parsed data with auto-detected settings in JSON.

Returns: 1. data (array of objects with column names as keys) 2. rowCount 3. columnCount 4. detectedDelimiter 5. headers array.

Example output: {"data":[{"name":"Alice","age":"30","city":"Paris"},{"name":"Bob","age":"25","city":"London"}],"rowCount":2,"columnCount":3,"detectedDelimiter":",","headers":["name","age","city"]}

Use this FOR data migration, importing spreadsheets into APIs, converting exported CSV reports, and preparing tabular data for analysis.

Do NOT use for JSON validation -- use data_validate_json instead. Do NOT use for markdown conversion -- use text_convert_markdown_to_html instead. Do NOT use for web scraping -- use web_scrape_to_markdown instead.`,
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
