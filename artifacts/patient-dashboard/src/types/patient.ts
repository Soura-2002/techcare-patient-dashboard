export interface BloodPressureLevel {
  value: number;
  levels: string;
}

export interface DiagnosisHistoryEntry {
  month: string;
  year: number;
  blood_pressure: {
    systolic: BloodPressureLevel;
    diastolic: BloodPressureLevel;
  };
  heart_rate: BloodPressureLevel;
  respiratory_rate: BloodPressureLevel;
  temperature: BloodPressureLevel;
}

export interface DiagnosticItem {
  name: string;
  description: string;
  status: string;
}

export interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistoryEntry[];
  diagnostic_list: DiagnosticItem[];
  lab_results: string[];
}
