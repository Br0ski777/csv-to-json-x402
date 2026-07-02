# CSV to JSON API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://csv-to-json.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Parse CSV to JSON array -- auto-detect delimiter (comma/semicolon/tab/pipe), header row support. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "csv-to-json": {
      "url": "https://csv-to-json.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://csv-to-json.api.klymax402.com/api/parse" \
  -H "Content-Type: application/json" \
  -d '{"csv":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `data_parse_csv_to_json` | POST | `/api/parse` | $0.001 | Parse CSV text to JSON array |

### `data_parse_csv_to_json`

Use this when you need to convert CSV data to a JSON array. Returns parsed data with auto-detected settings in JSON.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `csv` | string | yes | CSV content to parse |
| `delimiter` | string | no | Delimiter: comma, semicolon, tab, pipe (default: auto-detect) |
| `hasHeaders` | boolean | no | First row is headers (default: true) |

Example response:

```json
{"data":[{"name":"Alice","age":"30","city":"Paris"},{"name":"Bob","age":"25","city":"London"}],"rowCount":2,"columnCount":3,"detectedDelimiter":",","headers":["name","age","city"]}
```

**When to use**: data migration, importing spreadsheets into APIs, converting exported CSV reports, and preparing tabular data for analysis.

**Not for**: JSON validation (use `data_validate_json`), markdown conversion (use `text_convert_markdown_to_html`), web scraping (use `web_scrape_to_markdown`).

## Example agent prompts

- "Convert CSV data to a JSON array"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
