'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartProps {
  isDark: boolean;
}

export function LeadTrendsChart({ isDark }: ChartProps) {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: isDark ? '#a0aec0' : '#4b5563'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#a0aec0' : '#4b5563'
        }
      }
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light'
    },
    grid: {
      borderColor: isDark ? '#363A3F' : '#e5e7eb',
      strokeDashArray: 5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    }
  };

  const series = [
    {
      name: 'Total Leads',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Qualified Leads',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ];

  return (
    <div className="dashboard-card p-6 bg-white dark:bg-[#262A30] border border-gray-200 dark:border-[#363A3F]">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Generation Trends</h3>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
}

export function LeadSourcesChart({ isDark }: ChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    labels: ['Organic Search', 'Paid Ads', 'Social Media', 'Referrals'],
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      theme: isDark ? 'dark' : 'light'
    }
  };

  const series = [44, 55, 13, 43];

  return (
    <div className="dashboard-card p-6 bg-white dark:bg-[#262A30] border border-gray-200 dark:border-[#363A3F]">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Sources Distribution</h3>
      <ReactApexChart options={options} series={series} type="donut" height={350} />
    </div>
  );
}
