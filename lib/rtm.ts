export type RTMStatus = "pending" | "partial" | "complete";

export type RTMRow = {
  id: string;
  requirement: string;
  implementation: string;
  verification: string;
};

export function getStatus(row: RTMRow): RTMStatus {
  const values = [row.requirement, row.implementation, row.verification].map((value) => value.trim());
  const complete = values.filter(Boolean).length;
  if (complete === 3) return "complete";
  if (complete >= 2) return "partial";
  return "pending";
}

export function coverage(rows: RTMRow[]) {
  if (!rows.length) return 0;
  const complete = rows.filter((row) => getStatus(row) === "complete").length;
  return Math.round((complete / rows.length) * 100);
}

function csvEscape(value: string) {
  const normalized = value.replace(/\r?\n/g, " ");
  return `"${normalized.replace(/"/g, '""')}"`;
}

export function toCSV(rows: RTMRow[]) {
  const header = ["ID", "Requisito", "Implementación", "Verificación", "Estado"];
  const body = rows.map((row, index) => [
    String(index + 1),
    row.requirement,
    row.implementation,
    row.verification,
    getStatus(row)
  ]);
  return [header, ...body].map((line) => line.map(csvEscape).join(",")).join("\n");
}
