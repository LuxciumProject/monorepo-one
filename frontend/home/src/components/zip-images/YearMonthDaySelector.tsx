// @/components/zip-images/YearMonthDaySelector.tsx
'use client';
// ❌ Do NOT use async functions in client code
import 'client-only';
// 🚷 Importing server-side modules strictly prohibited

import { useEffect, useState } from 'react';

interface YearMonthDaySelectorProps {
  onSelectionChange: (path: string) => void;
}

export default function YearMonthDaySelector({
  onSelectionChange,
}: YearMonthDaySelectorProps) {
  const [years, setYears] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    function fetchYears() {
      fetch(
        '/api/list-directory?dirPath=' +
          encodeURIComponent('/run/media/luxcium/2TB-Seagate/MJ-backups/'),
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch years');
          }
          return response.json();
        })
        .then((data) => {
          setYears(data.directories || []);
        })
        .catch((error) => {
          console.error('Error fetching years:', error);
        });
    }
    fetchYears();
  }, []);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setMonths([]);
    setDays([]);
    fetch(
      '/api/list-directory?dirPath=' +
        encodeURIComponent(`/run/media/luxcium/2TB-Seagate/MJ-backups/${year}`),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch months');
        }
        return response.json();
      })
      .then((data) => {
        setMonths(data.directories || []);
      })
      .catch((error) => {
        console.error('Error fetching months:', error);
      });
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setDays([]);
    fetch(
      '/api/list-directory?dirPath=' +
        encodeURIComponent(
          `/run/media/luxcium/2TB-Seagate/MJ-backups/${selectedYear}/${month}`,
        ),
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch days');
        }
        return response.json();
      })
      .then((data) => {
        setDays(data.directories || []);
      })
      .catch((error) => {
        console.error('Error fetching days:', error);
      });
  };

  return (
    <div>
      <select
        title="Select Year"
        onChange={(e) => handleYearChange(e.target.value)}
        value={selectedYear || ''}
      >
        <option value="" disabled>
          Select Year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {selectedYear && (
        <select
          title="Select Month"
          onChange={(e) => handleMonthChange(e.target.value)}
          value={selectedMonth || ''}
        >
          <option value="" disabled>
            Select Month
          </option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      )}

      {selectedMonth && (
        <select
          title="Select Day"
          onChange={(e) =>
            onSelectionChange(
              `${selectedYear}/${selectedMonth}/${e.target.value}`,
            )
          }
          value=""
        >
          <option value="" disabled>
            Select Day
          </option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
