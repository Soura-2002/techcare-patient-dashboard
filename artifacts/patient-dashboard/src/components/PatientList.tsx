import { Search, MoreHorizontal } from "lucide-react";
import type { Patient } from "../types/patient";

interface PatientListProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientList({ patients, selectedPatient, onSelectPatient }: PatientListProps) {
  return (
    <aside className="w-[280px] min-w-[280px] bg-white rounded-2xl overflow-hidden flex flex-col" data-testid="patient-list">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <h2 className="text-lg font-bold text-gray-900">Patients</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors" data-testid="search-button">
          <Search size={18} />
        </button>
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1">
        {patients.map((patient) => {
          const isSelected = selectedPatient?.name === patient.name;
          return (
            <div
              key={patient.name}
              role="button"
              tabIndex={0}
              onClick={() => onSelectPatient(patient)}
              onKeyDown={(e) => e.key === "Enter" && onSelectPatient(patient)}
              className={`w-full flex items-center gap-3 px-5 py-3 transition-colors cursor-pointer ${
                isSelected ? "bg-[#D8FCF7]" : "hover:bg-gray-50"
              }`}
              data-testid={`patient-item-${patient.name.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <img
                src={patient.profile_picture}
                alt={patient.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{patient.name}</p>
                <p className="text-xs text-gray-500">
                  {patient.gender}, {patient.age}
                </p>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                data-testid={`patient-menu-${patient.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
