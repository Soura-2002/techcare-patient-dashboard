import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from "recharts";
import { TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import type { DiagnosisHistoryEntry } from "../types/patient";

interface BloodPressureChartProps {
  diagnosisHistory: DiagnosisHistoryEntry[];
}

function LevelIcon({ level }: { level: string }) {
  if (level === "Higher than Average") return <TrendingUp size={14} className="text-red-500" />;
  if (level === "Lower than Average") return <TrendingDown size={14} className="text-blue-500" />;
  return <Minus size={14} className="text-green-500" />;
}

export function BloodPressureChart({ diagnosisHistory }: BloodPressureChartProps) {
  const last6 = [...diagnosisHistory].slice(0, 6).reverse();

  const chartData = last6.map((entry) => ({
    label: `${entry.month.slice(0, 3)}, ${entry.year}`,
    systolic: entry.blood_pressure.systolic.value,
    diastolic: entry.blood_pressure.diastolic.value,
  }));

  const latest = diagnosisHistory[0];
  const systolicValue = latest?.blood_pressure.systolic.value ?? 0;
  const systolicLevel = latest?.blood_pressure.systolic.levels ?? "";
  const diastolicValue = latest?.blood_pressure.diastolic.value ?? 0;
  const diastolicLevel = latest?.blood_pressure.diastolic.levels ?? "";

  return (
    <div className="bg-[#F4F0FE] rounded-2xl p-5" data-testid="blood-pressure-chart">
      {/* Chart header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900">Blood Pressure</h3>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800" data-testid="period-selector">
          Last 6 months <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex gap-6">
        {/* Chart */}
        <div className="flex-1 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0FA" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                domain={[60, 180]}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                formatter={(value: number, name: string) => [
                  value,
                  name === "systolic" ? "Systolic" : "Diastolic",
                ]}
              />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#E066FF"
                strokeWidth={2}
                dot={<Dot r={5} fill="#E066FF" stroke="white" strokeWidth={2} />}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#8C6FE6"
                strokeWidth={2}
                dot={<Dot r={5} fill="#8C6FE6" stroke="white" strokeWidth={2} />}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend + Values */}
        <div className="flex flex-col justify-center gap-5 min-w-[140px]">
          {/* Systolic */}
          <div data-testid="systolic-info">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#E066FF] inline-block" />
              <span className="text-sm font-medium text-gray-700">Systolic</span>
            </div>
            <p className="text-2xl font-bold text-gray-900" data-testid="systolic-value">{systolicValue}</p>
            <div className="flex items-center gap-1 mt-1">
              <LevelIcon level={systolicLevel} />
              <span className="text-xs text-gray-500" data-testid="systolic-level">{systolicLevel}</span>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* Diastolic */}
          <div data-testid="diastolic-info">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#8C6FE6] inline-block" />
              <span className="text-sm font-medium text-gray-700">Diastolic</span>
            </div>
            <p className="text-2xl font-bold text-gray-900" data-testid="diastolic-value">{diastolicValue}</p>
            <div className="flex items-center gap-1 mt-1">
              <LevelIcon level={diastolicLevel} />
              <span className="text-xs text-gray-500" data-testid="diastolic-level">{diastolicLevel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
