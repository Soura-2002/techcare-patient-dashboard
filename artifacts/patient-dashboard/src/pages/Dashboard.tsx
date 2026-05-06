import { useState } from "react";
import { PatientList } from "../components/PatientList";
import { BloodPressureChart } from "../components/BloodPressureChart";
import { VitalsCards } from "../components/VitalsCards";
import { DiagnosticList } from "../components/DiagnosticList";
import { PatientProfile } from "../components/PatientProfile";
import { usePatients } from "../hooks/usePatients";
import type { Patient } from "../types/patient";

export function Dashboard() {
  const { patients, jessica, isLoading, error } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const displayPatient = selectedPatient ?? jessica;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center" data-testid="loading-state">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#01F0D0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center" data-testid="error-state">
        <div className="text-center">
          <p className="text-red-500 font-medium">Failed to load patient data</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 min-h-[calc(100vh-70px)]" data-testid="dashboard">
      {/* Left: Patient list */}
      <PatientList
        patients={patients}
        selectedPatient={displayPatient}
        onSelectPatient={setSelectedPatient}
      />

      {/* Center: Diagnosis history */}
      <main className="flex-1 flex flex-col gap-4 min-w-0" data-testid="main-content">
        <div className="bg-white rounded-2xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Diagnosis History</h2>

          {displayPatient && displayPatient.diagnosis_history.length > 0 ? (
            <>
              <BloodPressureChart diagnosisHistory={displayPatient.diagnosis_history} />
              <VitalsCards latest={displayPatient.diagnosis_history[0]} />
            </>
          ) : (
            <p className="text-gray-400 text-sm">No diagnosis history available.</p>
          )}
        </div>

        {displayPatient && displayPatient.diagnostic_list.length > 0 && (
          <DiagnosticList items={displayPatient.diagnostic_list} />
        )}
      </main>

      {/* Right: Patient profile */}
      {displayPatient && <PatientProfile patient={displayPatient} />}
    </div>
  );
}
