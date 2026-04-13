import type { Hono } from "hono";

function detectDelimiter(csv: string): string {
  const firstLine = csv.split("\n")[0] || "";
  const counts: Record<string, number> = { ",": 0, ";": 0, "\t": 0, "|": 0 };
  for (const char of firstLine) if (char in counts) counts[char]++;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

export function registerRoutes(app: Hono) {
  app.post("/api/parse", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.csv) return c.json({ error: "Missing required field: csv" }, 400);

    const delimiterMap: Record<string, string> = { comma: ",", semicolon: ";", tab: "\t", pipe: "|" };
    const delimiter = body.delimiter ? (delimiterMap[body.delimiter] || body.delimiter) : detectDelimiter(body.csv);
    const hasHeaders = body.hasHeaders !== false;

    const lines = body.csv.split("\n").map((l: string) => l.trim()).filter((l: string) => l.length > 0);
    if (lines.length === 0) return c.json({ error: "Empty CSV" }, 400);

    const headers = hasHeaders ? parseCsvLine(lines[0], delimiter) : Array.from({ length: parseCsvLine(lines[0], delimiter).length }, (_, i) => `col${i + 1}`);
    const dataLines = hasHeaders ? lines.slice(1) : lines;

    const rows = dataLines.map((line: string) => {
      const fields = parseCsvLine(line, delimiter);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = fields[i] || ""; });
      return obj;
    });

    const delimiterName = Object.entries(delimiterMap).find(([, v]) => v === delimiter)?.[0] || delimiter;
    return c.json({ rows, rowCount: rows.length, columns: headers, columnCount: headers.length, delimiter: delimiterName, hasHeaders });
  });
}
