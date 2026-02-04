import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const LEASE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const leaseExpirationData = [
  { name: '2025', value: 12, color: '#3B82F6' },
  { name: '2026', value: 28, color: '#10B981' },
  { name: '2027', value: 18, color: '#F59E0B' },
  { name: '2028', value: 8, color: '#EF4444' },
  { name: '2029+', value: 34, color: '#8B5CF6' },
];

const incomeStatementData = [
  { month: 'Jan', actual: 245000, budget: 250000 },
  { month: 'Feb', actual: 252000, budget: 250000 },
  { month: 'Mar', actual: 292000, budget: 252000 },
  { month: 'Apr', actual: 265000, budget: 255000 },
  { month: 'May', actual: 270000, budget: 260000 },
  { month: 'Jun', actual: 268000, budget: 265000 },
  { month: 'Jul', actual: 275000, budget: 268000 },
  { month: 'Aug', actual: 280000, budget: 272000 },
  { month: 'Sep', actual: 285000, budget: 275000 },
  { month: 'Oct', actual: 290000, budget: 280000 },
  { month: 'Nov', actual: 295000, budget: 285000 },
  { month: 'Dec', actual: 300000, budget: 290000 },
];

const historicalPerformanceData = [
  { year: '2021', revenue: 3400000, noi: 2400000 },
  { year: '2022', revenue: 3200000, noi: 2200000 },
  { year: '2023', revenue: 3800000, noi: 2600000 },
  { year: '2024', revenue: 4200000, noi: 3000000 },
  { year: '2025', revenue: 4600000, noi: 3400000 },
];

const delinquenciesData = [
  { name: '0-30', value: 12500 },
  { name: '31-60', value: 8500 },
  { name: '61-90', value: 4200 },
  { name: '90+', value: 2400 },
];

const openPayablesData = [
  { name: 'Utilities', value: 12500 },
  { name: 'Repairs', value: 18500 },
  { name: 'Insurance', value: 22000 },
  { name: 'Taxes', value: 45000 },
  { name: 'Contracts', value: 8500 },
];

const keyContacts = [
  { role: 'SPECIAL SERVICER', name: 'CW Capital', person: 'Sarah Mitchell', phone: '(703) 555-0142', email: 'smitchell@cwcapital.com', initials: 'SS', color: 'bg-blue-500' },
  { role: 'RECEIVER', name: 'Robert Chen', person: null, phone: '(571) 555-0198', email: 'rchen@receiverllc.com', initials: 'RC', color: 'bg-purple-500' },
  { role: 'PROPERTY MANAGER', name: 'Victoria Lozinak', person: null, phone: '(312) 555-0167', email: 'vlozinak@opexcre.com', initials: 'VL', color: 'bg-teal-500' },
  { role: 'ASSISTANT PM / TSC', name: 'John McCollough', person: null, phone: '(312) 555-0183', email: 'jmccollough@opexcre.com', initials: 'JM', color: 'bg-amber-500' },
];

const latestUpdates = [
  { text: 'HVAC repair completed in Suite 450. Tenant satisfied with resolution.', date: 'Jan 28' },
  { text: 'Q4 2025 CAM reconciliation in progress. Expected completion Feb 15.', date: 'Jan 25' },
  { text: 'Lease renewal discussion initiated with TechStart Inc (Suite 200).', date: 'Jan 22' },
  { text: 'Insurance renewal quote received from Chubb. Reviewing with receiver.', date: 'Jan 18' },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = useData();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProperty({
      id: id || 'demo',
      name: 'Braddock Metro Center',
      address: '1001 N Highland St',
      city: 'Arlington',
      state: 'Virginia',
      zip: '22201',
      type: 'Class A Office',
      size: '285,000 SF',
      floors: '12 Floors',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">Property not found</div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'M';
    if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'K';
    return '$' + value;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-white font-bold text-sm">O</div>
              <span className="font-semibold text-gray-900">OPEX</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">Portfolio</a>
              <a href="#" className="text-gray-900 font-medium border-b-2 border-green-500 pb-1">Property View</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Reports</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Documents</a>
            </div>
          </div>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">CW</div>
        </div>
      </nav>
      <div className="px-6 py-3 text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Portfolio</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">Virginia</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Braddock Metro Center</span>
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Export Report</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">View Documents</button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded">{property.type}</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Address</p>
                    <p className="text-gray-900 font-medium">{property.address}</p>
                    <p className="text-gray-600">{property.city}, {property.state} {property.zip}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Size / Floors</p>
                    <p className="text-gray-900 font-medium">{property.size}</p>
                    <p className="text-gray-600">{property.floors}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Key Contacts</h3>
              <div className="space-y-4">
                {keyContacts.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium ${contact.color}`}>{contact.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-green-600 font-medium uppercase tracking-wide">{contact.role}</p>
                      <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                      {contact.person && <p className="text-sm text-gray-600">{contact.person}</p>}
                      <p className="text-xs text-gray-500">{contact.email}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Property Facts</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Insurance Expiration</p>
                  <p className="text-lg font-semibold text-gray-900">Mar 15, 2026</p>
                  <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">45 days</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">RE Taxes Due</p>
                  <p className="text-lg font-semibold text-gray-900">Jun 1, 2026</p>
                  <p className="text-sm text-gray-500">$127,500</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Occupancy Rate</p>
                  <p className="text-lg font-semibold text-green-500">87.3%</p>
                  <p className="text-xs text-green-500">↑ 2.1% vs LY</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Avg Rent/SF</p>
                  <p className="text-lg font-semibold text-gray-900">$38.50</p>
                  <p className="text-sm text-gray-500">NNN</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">MTM Aged Delinquencies</h3>
                <span className="text-xs text-gray-400">As of Jan 29, 2026</span>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={delinquenciesData} layout="vertical" margin={{ left: 30, right: 20 }}>
                    <XAxis type="number" tickFormatter={(v) => '$' + v/1000 + 'k'} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={35} />
                    <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Outstanding</span>
                <span className="text-lg font-semibold text-gray-900">$27,600</span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Open Payables</h3>
                <span className="text-xs text-gray-400">Pending Approval</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={openPayablesData} margin={{ bottom: 20 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={50} />
                    <YAxis tickFormatter={(v) => '$' + v/1000 + 'k'} tick={{ fontSize: 10 }} />
                    <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Payables</span>
                <span className="text-lg font-semibold text-gray-900">$90,400</span>
              </div>
            </div>
          </div>
          <div className="col-span-8 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Latest Updates</h3>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">View All</a>
              </div>
              <div className="space-y-3">
                {latestUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{update.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Lease Expiration Schedule</h3>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">Full Rent Roll</a>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={leaseExpirationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                        {leaseExpirationData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2 text-sm ml-4">
                  {leaseExpirationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Active Leases</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Expiring &lt;90 Days</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">248,505</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Leased SF</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">2026 MTM Income Statement</h3>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-500">Actual</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-gray-500">Budget</span>
                  </div>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeStatementData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(v) => '$' + v/1000 + 'k'} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Line type="monotone" dataKey="budget" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">YTD Revenue</p>
                  <p className="text-xl font-bold text-gray-900">$3.57M</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">YTD Budget</p>
                  <p className="text-xl font-bold text-gray-900">$3.48M</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Variance</p>
                  <p className="text-xl font-bold text-green-500">+$90K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Variance %</p>
                  <p className="text-xl font-bold text-green-500">+2.6%</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Historical Performance</h3>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Last 5 Years</option>
                  <option>Last 3 Years</option>
                  <option>All Time</option>
                </select>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(v) => '$' + v/1000000 + 'M'} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend verticalAlign="bottom" height={36} formatter={(value) => value === 'revenue' ? 'Total Revenue' : 'Net Operating Income'} />
                    <Bar dataKey="revenue" name="revenue" fill="#8DD4C8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="noi" name="noi" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
