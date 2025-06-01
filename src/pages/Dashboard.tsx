import React from 'react';
import Card from '../components/Card';
const Dashboard = () => {
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Dashboard Kurban 2025</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Hewan Sapi" value="0" />
        <Card title="Hewan Kambing" value="0" />
        <Card title="Penerima Daging" value="0" />
        <Card title="Sudah Menerima" value="0" />
        <Card title="Total Biaya" value="Rp 0,00" />
        <Card title="Progress Pembagian" value="0%" />
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        

        
      </div>
    </div>;
};
export default Dashboard;