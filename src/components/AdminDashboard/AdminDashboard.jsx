import React from 'react';
import StatsCards from './StatsCards';
import ChartsSection from './ChartsSection';
import TicketTable from './TicketTable';

export default function AdminDashboard({
  tickets,
  onOpenModal,
  onResetData,
  onExportCSV
}) {
  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <StatsCards tickets={tickets} />

      {/* Visual Analytics / Charts */}
      <ChartsSection tickets={tickets} />

      {/* Ticket Management Table */}
      <TicketTable
        tickets={tickets}
        onOpenModal={onOpenModal}
        onResetData={onResetData}
        onExportCSV={onExportCSV}
      />
    </div>
  );
}
