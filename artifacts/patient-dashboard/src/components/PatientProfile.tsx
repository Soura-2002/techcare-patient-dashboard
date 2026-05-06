import { Calendar, User, Phone, Shield, Download } from "lucide-react";
import type { Patient } from "../types/patient";

interface PatientProfileProps {
  patient: Patient;
}

function InfoRow({
  icon,
  label,
  value,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  testId: string;
}) {
  return (
    <div className="flex items-start gap-3" data-testid={testId}>
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export function PatientProfile({ patient }: PatientProfileProps) {
  const dobFormatted = (() => {
    try {
      const [month, day, year] = patient.date_of_birth.split("/");
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch {
      return patient.date_of_birth;
    }
  })();

  return (
    <aside className="w-[300px] min-w-[300px] bg-white rounded-2xl flex flex-col" data-testid="patient-profile">
      {/* Photo */}
      <div className="flex flex-col items-center pt-8 pb-5 px-6">
        <img
          src={patient.profile_picture}
          alt={patient.name}
          className="w-[150px] h-[150px] rounded-full object-cover shadow-md"
          data-testid="profile-picture"
        />
        <h2 className="text-xl font-bold text-gray-900 mt-4 text-center" data-testid="patient-name">
          {patient.name}
        </h2>
      </div>

      {/* Info */}
      <div className="px-6 pb-6 flex flex-col gap-5">
        <InfoRow
          icon={<Calendar size={16} className="text-gray-600" />}
          label="Date Of Birth"
          value={dobFormatted}
          testId="dob-info"
        />
        <InfoRow
          icon={<User size={16} className="text-gray-600" />}
          label="Gender"
          value={patient.gender}
          testId="gender-info"
        />
        <InfoRow
          icon={<Phone size={16} className="text-gray-600" />}
          label="Contact Info."
          value={patient.phone_number}
          testId="contact-info"
        />
        <InfoRow
          icon={<Phone size={16} className="text-gray-600" />}
          label="Emergency Contacts"
          value={patient.emergency_contact}
          testId="emergency-contact-info"
        />
        <InfoRow
          icon={<Shield size={16} className="text-gray-600" />}
          label="Insurance Provider"
          value={patient.insurance_type}
          testId="insurance-info"
        />
      </div>

      {/* Button */}
      <div className="px-6 pb-8">
        <button
          className="w-full bg-[#01F0D0] hover:bg-[#00dbbe] text-gray-900 font-semibold py-3 rounded-full transition-colors text-sm"
          data-testid="show-all-info-button"
        >
          Show All Information
        </button>
      </div>

      {/* Lab Results */}
      <div className="border-t border-gray-100 px-6 py-5">
        <h3 className="text-base font-bold text-gray-900 mb-4">Lab Results</h3>
        <div className="flex flex-col gap-2" data-testid="lab-results">
          {patient.lab_results.map((result, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              data-testid={`lab-result-${i}`}
            >
              <span className="text-sm text-gray-700">{result}</span>
              <Download
                size={16}
                className="text-gray-400 group-hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
