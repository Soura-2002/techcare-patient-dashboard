import { useState, useEffect } from "react";
import type { Patient } from "../types/patient";

const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const AUTH_HEADER = "Basic " + btoa("coalition:skills-test");

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: AUTH_HEADER,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patients");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPatients();
  }, []);

  const jessica = patients.find((p) => p.name === "Jessica Taylor") || null;

  return { patients, jessica, isLoading, error };
}
