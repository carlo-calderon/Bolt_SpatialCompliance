import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';
import { Chart } from './Chart';
import { generateMockData } from '../utils/mockData';
import { SpatialComplianceData, ChartData } from '../types';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<SpatialComplianceData[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      const mockData = generateMockData();
      setData(mockData);

      const labels = mockData.map((d) => 
        format(new Date(d.timestamp), 'MMM d, HH:mm')
      );

      setChartData({
        labels,
        datasets: [
          {
            label: 'Spatial Compliance',
            data: mockData.map((d) => d.value),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.4,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const currentValue = data[data.length - 1]?.value.toFixed(2) ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Activity className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Spatial Compliance Dashboard
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-teal-600 mb-2">
                Current Compliance
              </h3>
              <p className="text-3xl font-bold text-teal-700">
                {currentValue}%
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <Chart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};