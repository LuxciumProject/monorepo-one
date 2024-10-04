// @/components/zip-images/YearMonthDaySelector.tsx
'use client';

import { listDirectoryContents } from '@ServerActions/listDirectoryContents';
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
    async function fetchYears() {
      const { directories } = await listDirectoryContents(
        '/run/media/luxcium/2TB-Seagate/MJ-backups/',
      );
      setYears(directories);
    }
    fetchYears();
  }, []);

  const handleYearChange = async (year: string) => {
    setSelectedYear(year);
    const { directories } = await listDirectoryContents(
      `/run/media/luxcium/2TB-Seagate/MJ-backups/${year}`,
    );
    setMonths(directories);
  };

  const handleMonthChange = async (month: string) => {
    setSelectedMonth(month);
    const { directories } = await listDirectoryContents(
      `/run/media/luxcium/2TB-Seagate/MJ-backups/${selectedYear}/${month}`,
    );
    setDays(directories);
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
