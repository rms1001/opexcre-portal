import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Line } from 'recharts';

// ============================================
// SHARED DATA
// ============================================

const properties = [
  { id: 1, name: 'Braddock Metro Center', address: '1001 N Highland St, Arlington, VA 22201', type: 'Class A Office', sqft: 285000, floors: 12, occupancy: 87.3, status: 'active', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop', lobby: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop' },
  { id: 2, name: '80 Park Plaza', address: '80 Park Plaza, Newark, NJ 07102', type: 'Class A Office', sqft: 1200000, floors: 26, occupancy: 91.2, status: 'active', image: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=400&fit=crop', lobby: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&h=400&fit=crop' },
  { id: 3, name: 'Franklin Mall', address: '400 Franklin Ave, Franklin, PA 16323', type: 'Retail', sqft: 425000, floors: 2, occupancy: 72.5, status: 'watchlist', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=400&fit=crop', lobby: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop' },
  { id: 4, name: 'Westbrook Corporate Center', address: '2000 Westbrook Dr, Westchester, IL 60154', type: 'Class B Office', sqft: 380000, floors: 8, occupancy: 68.9, status: 'receivership', image: 'https://images.unsplash.com/photo-1577985043696-8bd54d9c4def?w=800&h=400&fit=crop', lobby: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=400&fit=crop' },
  { id: 5, name: 'Cedar Crest Plaza', address: '1500 Cedar Crest Blvd, Allentown, PA 18104', type: 'Mixed Use', sqft: 195000, floors: 4, occupancy: 84.1, status: 'active', image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=400&fit=crop', lobby: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop' },
  { id: 6, name: '70 Hatfield Lane', address: '70 Hatfield Ln, Goshen, NY 10924', type: 'Industrial', sqft: 156000, floors: 1, occupancy: 100, status: 'active', image: 'https://images.unsplash.com/photo-1553246969-7dcb4259a87b?w=800&h=400&fit=crop', lobby: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop' },
];

const leaseExpirationData = [
  { name: '2025', value: 12, color: '#0F766E' },
  { name: '2026', value: 28, color: '#14B8A6' },
  { name: '2027', value: 18, color: '#5EEAD4' },
  { name: '2028', value: 8, color: '#99F6E4' },
  { name: '2029+', value: 34, color: '#CCFBF1' },
];

const agedDelinquenciesData = [
  { name: '0-30', amount: 12500 },
  { name: '31-60', amount: 8200 },
  { name: '61-90', amount: 4100 },
  { name: '90+', amount: 2800 },
];

const openPayablesData = [
  { name: 'Utilities', amount: 18500 },
  { name: 'Repairs', amount: 12300 },
  { name: 'Insurance', amount: 8400 },
  { name: 'Taxes', amount: 45000 },
  { name: 'Contracts', amount: 6200 },
];

const mtmIncomeData = [
  { month: 'Jan', actual: 285000, budget: 290000 },
  { month: 'Feb', actual: 288000, budget: 290000 },
  { month: 'Mar', actual: 292000, budget: 290000 },
  { month: 'Apr', actual: 278000, budget: 290000 },
  { month: 'May', actual: 295000, budget: 290000 },
  { month: 'Jun', actual: 301000, budget: 290000 },
  { month: 'Jul', actual: 298000, budget: 290000 },
  { month: 'Aug', actual: 305000, budget: 290000 },
  { month: 'Sep', actual: 299000, budget: 290000 },
  { month: 'Oct', actual: 310000, budget: 290000 },
  { month: 'Nov', actual: 308000, budget: 290000 },
  { month: 'Dec', actual: 315000, budget: 290000 },
];

const historicalPerformanceData = [
  { year: '2021', noi: 1850000, revenue: 2450000 },
  { year: '2022', noi: 1920000, revenue: 2580000 },
  { year: '2023', noi: 2050000, revenue: 2720000 },
  { year: '2024', noi: 2180000, revenue: 2890000 },
  { year: '2025', noi: 2350000, revenue: 3050000 },
];

const notes = [
  { date: 'Jan 28', text: 'HVAC repair completed in Suite 450. Tenant satisfied with resolution.' },
  { date: 'Jan 25', text: 'Q4 2025 CAM reconciliation in progress. Expected completion Feb 15.' },
  { date: 'Jan 22', text: 'Lease renewal discussion initiated with TechStart Inc (Suite 200).' },
  { date: 'Jan 18', text: 'Insurance renewal quote received from Chubb. Reviewing with receiver.' },
];

const documents = [
  { id: 1, name: 'Q4 2025 Financial Report.pdf', category: 'Financials', date: 'Jan 28, 2026', size: '2.4 MB', type: 'pdf' },
  { id: 2, name: 'Rent Roll - January 2026.xlsx', category: 'Rent Roll', date: 'Jan 25, 2026', size: '856 KB', type: 'xlsx' },
  { id: 3, name: 'Insurance Certificate - Chubb.pdf', category: 'Insurance', date: 'Jan 22, 2026', size: '1.1 MB', type: 'pdf' },
  { id: 4, name: 'CAM Reconciliation 2025.xlsx', category: 'CAM', date: 'Jan 20, 2026', size: '1.8 MB', type: 'xlsx' },
  { id: 5, name: 'Property Inspection Report.pdf', category: 'Inspections', date: 'Jan 15, 2026', size: '5.2 MB', type: 'pdf' },
  { id: 6, name: 'Lease Agreement - TechStart Inc.pdf', category: 'Leases', date: 'Jan 12, 2026', size: '3.4 MB', type: 'pdf' },
  { id: 7, name: 'HVAC Maintenance Contract.pdf', category: 'Contracts', date: 'Jan 10, 2026', size: '890 KB', type: 'pdf' },
  { id: 8, name: 'December 2025 Bank Statement.pdf', category: 'Bank Statements', date: 'Jan 5, 2026', size: '245 KB', type: 'pdf' },
];

const reports = [
  { id: 1, name: 'Monthly Financial Report', description: 'Income statement, balance sheet, and cash flow', frequency: 'Monthly', lastRun: 'Jan 28, 2026', status: 'ready' },
  { id: 2, name: 'Variance Analysis', description: 'Budget vs actual comparison with explanations', frequency: 'Monthly', lastRun: 'Jan 25, 2026', status: 'ready' },
  { id: 3, name: 'Rent Roll Summary', description: 'Current tenant roster with lease details', frequency: 'Monthly', lastRun: 'Jan 25, 2026', status: 'ready' },
  { id: 4, name: 'Aged Receivables', description: 'Outstanding tenant balances by aging bucket', frequency: 'Weekly', lastRun: 'Jan 27, 2026', status: 'ready' },
  { id: 5, name: 'CAM Reconciliation', description: 'Common area maintenance true-up calculations', frequency: 'Annual', lastRun: 'Jan 15, 2026', status: 'processing' },
  { id: 6, name: 'Lease Expiration Schedule', description: 'Upcoming lease expirations and renewal status', frequency: 'Monthly', lastRun: 'Jan 20, 2026', status: 'ready' },
];

// ============================================
// HEADER COMPONENT
// ============================================

const Header = ({ currentPage, setCurrentPage }) => (
  <header className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">O</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">OPEX</span>
      </div>
      <nav className="flex items-center gap-1">
        {[
          { id: 'portfolio', label: 'Portfolio' },
          { id: 'property', label: 'Property View' },
          { id: 'reports', label: 'Reports' },
          { id: 'documents', label: 'Documents' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              currentPage === item.id
                ? 'text-teal-700 border-b-2 border-teal-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-600 font-medium text-sm">CW</span>
      </div>
    </div>
  </header>
);

// ============================================
// PORTFOLIO PAGE
// ============================================

const PortfolioPage = ({ setCurrentPage, setSelectedProperty }) => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.status === filter);

  const totalSqft = properties.reduce((sum, p) => sum + p.sqft, 0);
  const avgOccupancy = properties.reduce((sum, p) => sum + p.occupancy, 0) / properties.length;

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setCurrentPage('property');
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Total Properties</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{properties.length}</p>
          <p className="text-sm text-green-600 mt-2">↑ 2 this year</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Total Square Feet</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{(totalSqft / 1000000).toFixed(2)}M</p>
          <p className="text-sm text-gray-500 mt-2">Under management</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Avg Occupancy</p>
          <p className="text-3xl font-bold text-teal-600 mt-1">{avgOccupancy.toFixed(1)}%</p>
          <p className="text-sm text-green-600 mt-2">↑ 3.2% vs LY</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Monthly Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$2.84M</p>
          <p className="text-sm text-green-600 mt-2">↑ 5% MoM</p>
        </div>
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your properties</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['all', 'active', 'watchlist', 'receivership'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                  filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-3 gap-5">
        {filteredProperties.map(property => (
          <div
            key={property.id}
            onClick={() => handlePropertyClick(property)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="h-40 relative overflow-hidden">
              <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                  property.status === 'active' ? 'bg-green-100 text-green-700' :
                  property.status === 'watchlist' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="px-2 py-0.5 bg-teal-600 text-white text-xs font-medium rounded">
                  {property.type}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{property.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{property.address}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Size</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{(property.sqft / 1000).toFixed(0)}K SF</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Occupancy</p>
                  <p className={`text-sm font-semibold mt-0.5 ${property.occupancy >= 85 ? 'text-green-600' : property.occupancy >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                    {property.occupancy}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// ============================================
// PROPERTY PAGE
// ============================================

const PropertyPage = ({ property, setCurrentPage }) => {
  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm">
              <span style={{ color: entry.color || '#fff' }}>{entry.name}:</span> {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <button onClick={() => setCurrentPage('portfolio')} className="hover:text-teal-700">Portfolio</button>
        <span>/</span>
        <span>Virginia</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{property?.name || 'Braddock Metro Center'}</span>
      </div>

      {/* Title Row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{property?.name || 'Braddock Metro Center'}</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
          <button onClick={() => setCurrentPage('documents')} className="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800">
            View Documents
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-5 space-y-5">
          {/* Property Image Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="h-44 relative">
              <img 
                src={property?.lobby || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop'} 
                alt={property?.name || 'Braddock Metro Center Lobby'}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 bg-teal-600 text-white text-xs font-medium rounded-md">
                  {property?.type || 'Class A Office'}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Address</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">1001 N Highland St</p>
                  <p className="text-sm text-gray-600">Arlington, VA 22201</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Size / Floors</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">285,000 SF</p>
                  <p className="text-sm text-gray-600">12 Floors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Contacts */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Contacts</h3>
            <div className="space-y-4">
              {[
                { initials: 'SS', bg: '#fef3c7', color: '#b45309', role: 'SPECIAL SERVICER', company: 'CW Capital', name: 'Sarah Mitchell', contact: '(703) 555-0142' },
                { initials: 'RC', bg: '#dbeafe', color: '#1d4ed8', role: 'RECEIVER', name: 'Robert Chen', email: 'rchen@receiverllc.com', contact: '(571) 555-0198' },
                { initials: 'VL', bg: '#ccfbf1', color: '#0f766e', role: 'PROPERTY MANAGER', name: 'Victoria Lozinak', email: 'vlozinak@opexcre.com', contact: '(312) 555-0167' },
                { initials: 'JM', bg: '#f3e8ff', color: '#7c3aed', role: 'ASSISTANT PM / TSC', name: 'John McCollough', email: 'jmccollough@opexcre.com', contact: '(312) 555-0183' },
              ].map((contact, i) => (
                <div key={i} className={`flex items-start gap-3 ${i < 3 ? 'pb-4 border-b border-gray-100' : ''}`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: contact.bg }}>
                    <span className="font-semibold text-sm" style={{ color: contact.color }}>{contact.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{contact.role}</p>
                    <p className="font-semibold text-gray-900 text-sm mt-0.5">{contact.company || contact.name}</p>
                    {contact.company ? (
                      <p className="text-sm text-gray-600">{contact.name} • {contact.contact}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-600">{contact.contact}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Facts */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Property Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Insurance Expiration</p>
                <p className="text-lg font-bold text-gray-900 mt-1">Mar 15, 2026</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-md">
                  45 days
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">RE Taxes Due</p>
                <p className="text-lg font-bold text-gray-900 mt-1">Jun 1, 2026</p>
                <p className="text-sm text-gray-600 mt-1.5">$127,500</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Occupancy Rate</p>
                <p className="text-lg font-bold text-teal-600 mt-1">87.3%</p>
                <p className="text-sm text-green-600 mt-1.5">↑ 2.1% vs LY</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Avg Rent/SF</p>
                <p className="text-lg font-bold text-gray-900 mt-1">$38.50</p>
                <p className="text-sm text-gray-600 mt-1.5">NNN</p>
              </div>
            </div>
          </div>

          {/* Aged Delinquencies */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">MTM Aged Delinquencies</h3>
              <span className="text-xs text-gray-500">As of Jan 29, 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={agedDelinquenciesData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#14B8A6" radius={[0, 4, 4, 0]} name="Amount" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Outstanding</span>
              <span className="text-lg font-bold text-gray-900">$27,600</span>
            </div>
          </div>

          {/* Open Payables */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Open Payables</h3>
              <span className="text-xs text-gray-500">Pending Approval</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={openPayablesData} margin={{ left: 0, right: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#5EEAD4" radius={[4, 4, 0, 0]} name="Amount" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Payables</span>
              <span className="text-lg font-bold text-gray-900">$90,400</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-7 space-y-5">
          {/* Latest Updates */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Latest Updates</h3>
              <button className="text-sm text-teal-700 hover:text-teal-800 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-700">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{note.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lease Expiration Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Lease Expiration Schedule</h3>
              <button className="text-sm text-teal-700 hover:text-teal-800 font-medium">Full Rent Roll</button>
            </div>
            <div className="flex items-center gap-8">
              <div className="w-44 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leaseExpirationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {leaseExpirationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {leaseExpirationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Active Leases</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">3</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Expiring &lt;90 Days</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-600">248,505</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Leased SF</p>
              </div>
            </div>
          </div>

          {/* 2026 MTM Income Statement */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">2026 MTM Income Statement</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-teal-600"></div>
                  <span className="text-gray-600">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gray-300"></div>
                  <span className="text-gray-600">Budget</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mtmIncomeData} margin={{ left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="actual" stroke="#14B8A6" strokeWidth={2} fill="url(#colorActual)" name="Actual" />
                <Line type="monotone" dataKey="budget" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Budget" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">YTD Revenue</p>
                <p className="text-lg font-bold text-gray-900 mt-1">$3.57M</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">YTD Budget</p>
                <p className="text-lg font-bold text-gray-600 mt-1">$3.48M</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Variance</p>
                <p className="text-lg font-bold text-green-600 mt-1">+$90K</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Variance %</p>
                <p className="text-lg font-bold text-green-600 mt-1">+2.6%</p>
              </div>
            </div>
          </div>

          {/* Historical Performance */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Historical Performance</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white">
                <option>Last 5 Years</option>
                <option>Last 3 Years</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={historicalPerformanceData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#5EEAD4" radius={[4, 4, 0, 0]} name="Total Revenue" />
                <Bar dataKey="noi" fill="#0F766E" radius={[4, 4, 0, 0]} name="Net Operating Income" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-teal-300"></div>
                <span className="text-sm text-gray-600">Total Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-teal-700"></div>
                <span className="text-sm text-gray-600">Net Operating Income</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// ============================================
// DOCUMENTS PAGE
// ============================================

const DocumentsPage = ({ property }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(documents.map(d => d.category))];
  
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type) => {
    if (type === 'pdf') return <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center"><span className="text-red-600 font-bold text-xs">PDF</span></div>;
    if (type === 'xlsx') return <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><span className="text-green-600 font-bold text-xs">XLS</span></div>;
    return <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><span className="text-gray-600 font-bold text-xs">DOC</span></div>;
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">{property?.name || 'Braddock Metro Center'} • {documents.length} documents</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-3">
          <div className="relative flex-1">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
              {getFileIcon(doc.type)}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{doc.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{doc.category} • {doc.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{doc.size}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

// ============================================
// REPORTS PAGE
// ============================================

const ReportsPage = ({ property }) => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">{property?.name || 'Braddock Metro Center'}</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Request Custom Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {reports.map(report => (
          <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-xs text-gray-500">{report.frequency}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                report.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {report.status === 'ready' ? 'Ready' : 'Processing'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Last generated: {report.lastRun}</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Schedule
                </button>
                <button 
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                    report.status === 'ready' 
                      ? 'text-white bg-teal-700 hover:bg-teal-800' 
                      : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  }`}
                  disabled={report.status !== 'ready'}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function Portal() {
  const [currentPage, setCurrentPage] = useState('portfolio');
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'portfolio' && (
        <PortfolioPage setCurrentPage={setCurrentPage} setSelectedProperty={setSelectedProperty} />
      )}
      {currentPage === 'property' && (
        <PropertyPage property={selectedProperty} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'documents' && (
        <DocumentsPage property={selectedProperty} />
      )}
      {currentPage === 'reports' && (
        <ReportsPage property={selectedProperty} />
      )}
    </div>
  );
}
