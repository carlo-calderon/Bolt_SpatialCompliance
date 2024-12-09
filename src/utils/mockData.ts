import { addMinutes, subDays } from 'date-fns';
import { SpatialComplianceData } from '../types';

export const generateMockData = (): SpatialComplianceData[] => {
  const data: SpatialComplianceData[] = [];
  const endDate = new Date();
  const startDate = subDays(endDate, 7);
  let currentDate = startDate;

  while (currentDate <= endDate) {
    data.push({
      timestamp: currentDate.toISOString(),
      value: 75 + Math.random() * 20, // Random values between 75-95
    });
    currentDate = addMinutes(currentDate, 15);
  }

  return data;
};