import React from 'react';
import { PieChart, BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ChartsSection({ tickets }) {
  // Aggregate categories
  const categoryCounts = {};
  tickets.forEach((t) => {
    // Extract short name e.g. "Hardware" from "Hardware (Laptop, ...)"
    const shortCat = t.kategori ? t.kategori.split(' ')[0] : 'Lainnya';
    categoryCounts[shortCat] = (categoryCounts[shortCat] || 0) + 1;
  });

  const categoryLabels = Object.keys(categoryCounts);
  const categoryData = Object.values(categoryCounts);

  const doughnutData = {
    labels: categoryLabels.length > 0 ? categoryLabels : ['Belum Ada'],
    datasets: [
      {
        data: categoryData.length > 0 ? categoryData : [1],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4',
          '#ec4899',
          '#64748b'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: { size: 11, family: 'Inter' }
        }
      }
    }
  };

  // Aggregate statuses
  const statusCounts = {
    Open: tickets.filter((t) => t.status === 'Open').length,
    'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
    Resolved: tickets.filter((t) => t.status === 'Resolved').length,
    Closed: tickets.filter((t) => t.status === 'Closed').length
  };

  const barData = {
    labels: ['Open', 'In Progress', 'Resolved', 'Closed'],
    datasets: [
      {
        label: 'Jumlah Tiket',
        data: [
          statusCounts.Open,
          statusCounts['In Progress'],
          statusCounts.Resolved,
          statusCounts.Closed
        ],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#64748b'],
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0, font: { family: 'Inter' } },
        grid: { color: '#f1f5f9' }
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 } }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Category Doughnut */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h4 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-blue-600" /> Distribusi Kategori Kendala
        </h4>
        <div className="h-52 relative flex justify-center items-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* Status Bar Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h4 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" /> Status Tiket Saat Ini
        </h4>
        <div className="h-52 relative flex justify-center items-center">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
