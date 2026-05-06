import type { DiagnosticItem } from "../types/patient";

interface DiagnosticListProps {
  items: DiagnosticItem[];
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Under Observation": "bg-yellow-100 text-yellow-700",
    "Cured": "bg-green-100 text-green-700",
    "Inactive": "bg-gray-100 text-gray-600",
    "Untreated": "bg-red-100 text-red-600",
  };

  const cls = styles[status] ?? "bg-gray-100 text-gray-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`} data-testid="status-badge">
      {status}
    </span>
  );
}

export function DiagnosticList({ items }: DiagnosticListProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden mt-4" data-testid="diagnostic-list">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">Diagnostic List</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Problem / Diagnosis</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors" data-testid={`diagnostic-row-${i}`}>
              <td className="px-5 py-4 text-sm font-semibold text-gray-900">{item.name}</td>
              <td className="px-5 py-4 text-sm text-gray-500">{item.description}</td>
              <td className="px-5 py-4">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
