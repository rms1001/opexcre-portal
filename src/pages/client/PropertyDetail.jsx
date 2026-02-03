import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { 
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Building2, MapPin, Layers, Phone, Mail, FileText, 
  Download, ChevronRight, TrendingUp, Calendar, DollarSign,
  Users, AlertCircle, Clock
} from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

// Mock data for charts
const leaseExpirationData = [
  { name: '2025', value: 15, color: '#3B82F6' },
  { name: '2026', value: 25, color: '#10B981' },
  { name: '2027', value: 20, color: '#F59E0B' },
  { name: '2028', value: 18, color: '#EF4444' },
  { name: '2029+', value: 22, color: '#8B5CF6' },
];

const incomeStatementData = [
  { month: 'Jan', actual: 245000, budget: 250000 },
  { month: 'Feb', actual: 252000, budget: 250000 },
  { month: 'Mar', actual: 248000, budget: 252000 },
  { month: 'Apr', actual: 265000, budget: 255000 },
  { month: 'May', actual: 270000, budget: 260000 },
  { month: 'Jun', actual: 268000, budget: 265000 },
  { month: 'Jul', actual: 275000, budget: 268000 },
  { month: 'Aug', actual: 280000, budget: 272000 },
  { month: 'Sep', actual: 285000, budget: 275000 },
  { month: 'Oct', actual: 290000, budget: 280000 },
  { month: 'Nov', actual: 295000, budget: 285000 },
  { month: 'Dec', actual: 298000, budget: 290000 },
];

const historicalPerformanceData = [
  { year: '2021', noi: 2800000, revenue: 3500000 },
  { year: '2022', noi: 3100000, revenue: 3800000 },
  { year: '2023', noi: 3400000, revenue: 4200000 },
  { year: '2024', noi: 3650000, revenue: 4500000 },
  { year: '2025', noi: 3900000, revenue: 4800000 },
];

const delinquenciesData = [
  { category: '0-30 Days', amount: 45000 },
  { category: '31-60 Days', amount: 28000 },
  { category: '61-90 Days', amount: 15000 },
  { category: '90+ Days', amount: 8000 },
];

const openPayablesData = [
  { category: 'Utilities', amount: 32000 },
  { category: 'Maintenance', amount: 28000 },
  { category: 'Insurance', amount: 45000 },
  { category: 'Property Tax', amount: 125000 },
  { category: 'Management', amount: 18000 },
];

const keyContacts = [
  { role: 'Special Servicer', name: 'John Anderson', phone: '(555) 123-4567', email: 'j.anderson@servicer.com' },
  { role: 'Receiver', name: 'Sarah Mitchell', phone: '(555) 234-5678', email: 's.mitchell@receiver.com' },
  { role: 'Property Manager', name: 'Michael Chen', phone: '(555) 345-6789', email: 'm.chen@propmanage.com' },
  { role: 'Assistant PM', name: 'Emily Davis', phone: '(555) 456-7890', email: 'e.davis@propmanage.com' },
];

const latestUpdates = [
  { date: '2026-01-28', title: 'Monthly Financial Report Uploaded', type: 'document' },
  { date: '2026-01-25', title: 'HVAC Maintenance Completed', type: 'maintenance' },
  { date: '2026-01-20', title: 'New Lease Signed - Suite 450', type: 'lease' },
  { date: '2026-01-15', title: 'Insurance Renewal Processed', type: 'admin' },
  { date: '2026-01-10', title: 'Q4 2025 Variance Report Available', type: 'document' },
];

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { properties, loading } = useData();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (properties && properties.length > 0) {
      const found = properties.find(p => p.id === propertyId);
      if (found) {
        setProperty(found);
      } else {
        setProperty({
          id: propertyId,
          name: 'Braddock Metro Center',
          address: '1001 N Highland St',
          city: 'Arlington',
          state: 'VA',
          zip: '22201',
          propertyType: 'Class A Office',
          squareFeet: 285000,
          floors: 12,
          occupancyRate: 94.5,
          avgRentPerSF: 42.50,
          imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        });
      }
    } else if (!loading) {
      setProperty({
        id: propertyId,
        name: 'Braddock Metro Center',
        address: '1001 N Highland St',
        city: 'Arlington',
        state: 'VA',
        zip: '22201',
        propertyType: 'Class A Office',
        squareFeet: 285000,
        floors: 12,
        occupancyRate: 94.5,
        avgRentPerSF: 42.50,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      });
    }
  }, [propertyId, properties, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Property not found</p>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={property.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.propertyType || 'Class A Office'}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span>{formatNumber(property.squareFeet || 285000)} SF</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Layers className="h-4 w-4 mr-1" />
                    <span>{property.floors || 12} Floors</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button 
                onClick={() => navigate('/client/documents')}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Documents
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lease Expiration Schedule</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leaseExpirationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
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
                  <div className="grid grid-cols-2 gap-3">
                    {leaseExpirationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">2026 MTM Income Statement</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Actual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-gray-600">Budget</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeStatementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="budget" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">YTD Revenue</p>
                  <p className="text-xl font-semibold text-gray-900">$3.27M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="text-xl font-semibold text-gray-900">$3.20M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Variance</p>
                  <p className="text-xl font-semibold text-green-600">+2.2%</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Historical Performance</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `$${v/1000000}M`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="noi" name="NOI" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">MTM Aged Delinquencies</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={delinquenciesData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                      <YAxis type="category" dataKey="category" stroke="#6B7280" fontSize={11} width={80} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="amount" fill="#EF4444" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Open Payables</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={openPayablesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="category" stroke="#6B7280" fontSize={10} angle={-45} textAnchor="end" height={60} />
                      <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="amount" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Contacts</h2>
              <div className="space-y-4">
                {keyContacts.map((contact, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{contact.role}</p>
                    <p className="font-medium text-gray-900 mt-1">{contact.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <a href={`tel:${contact.phone}`} className="flex items-center hover:text-blue-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Updates</h2>
              <div className="space-y-3">
                {latestUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex-shrink-0 mt-0.5">
                      {update.type === 'document' && <FileText className="h-4 w-4 text-blue-500" />}
                      {update.type === 'maintenance' && <Building2 className="h-4 w-4 text-green-500" />}
                      {update.type === 'lease' && <Users className="h-4 w-4 text-purple-500" />}
                      {update.type === 'admin' && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{update.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Facts</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Insurance Exp.</span>
                  </div>
                  <p className="font-semibold text-gray-900">Mar 15, 2026</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs">RE Taxes Due</span>
                  </div>
                  <p className="font-semibold text-gray-900">Apr 1, 2026</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs">Occupancy Rate</span>
                  </div>
                  <p className="font-semibold text-gray-900">{property.occupancyRate || 94.5}%</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs">Avg Rent/SF</span>
                  </div>
                  <p className="font-semibold text-gray-900">${property.avgRentPerSF || 42.50}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
