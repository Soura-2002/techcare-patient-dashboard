import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { DiagnosisHistoryEntry } from "../types/patient";

interface VitalsCardsProps {
  latest: DiagnosisHistoryEntry;
}

function LevelBadge({ level }: { level: string }) {
  if (level === "Higher than Average") {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
        <TrendingUp size={12} className="text-red-500" />
        <span>{level}</span>
      </div>
    );
  }
  if (level === "Lower than Average") {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
        <TrendingDown size={12} className="text-blue-500" />
        <span>{level}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
      <Minus size={12} className="text-green-500" />
      <span>Normal</span>
    </div>
  );
}

function VitalCard({
  bg,
  iconSrc,
  label,
  value,
  unit,
  level,
  testId,
}: {
  bg: string;
  iconSrc: string;
  label: string;
  value: number;
  unit: string;
  level: string;
  testId: string;
}) {
  return (
    <div className={`${bg} rounded-2xl p-5 flex-1`} data-testid={testId}>
      <img src={iconSrc} alt={label} className="w-16 h-16 mb-4" />
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value}
        <span className="text-base font-medium ml-1">{unit}</span>
      </p>
      <LevelBadge level={level} />
    </div>
  );
}

export function VitalsCards({ latest }: VitalsCardsProps) {
  return (
    <div className="flex gap-4 mt-4" data-testid="vitals-cards">
      <VitalCard
        bg="bg-[#E8F5FF]"
        iconSrc="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f6bc.svg"
        label="Respiratory Rate"
        value={latest.respiratory_rate.value}
        unit="bpm"
        level={latest.respiratory_rate.levels}
        testId="respiratory-rate-card"
      />
      <VitalCard
        bg="bg-[#FFF8E8]"
        iconSrc="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f321.svg"
        label="Temperature"
        value={latest.temperature.value}
        unit="°F"
        level={latest.temperature.levels}
        testId="temperature-card"
      />
      <VitalCard
        bg="bg-[#FFE8F0]"
        iconSrc="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/2764.svg"
        label="Heart Rate"
        value={latest.heart_rate.value}
        unit="bpm"
        level={latest.heart_rate.levels}
        testId="heart-rate-card"
      />
    </div>
  );
}
