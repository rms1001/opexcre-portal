import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Users) from 'lucide-react';

export default function AdminClients() {
    const { clients, fetchClients } = useData();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
        fetchClients().then(() => setLoading(false));
  }, []);

  if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div></div>div>;
  }
  
    return (
          <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Clients</h1>h1>
            {clients.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                              <p className="text-gray-500">No clients yet. Clients will appear here when they register or are added.</p>p>
                    </div>div>
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                              <table className="w-full">
                                          <thead className="bg-gray-50 border-b border-gray-200">
                                                        <tr>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>th>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>th>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>th>
                                                        </tr>tr>
                                          </thead>thead>
                                          <tbody className="divide-y divide-gray-200">
                                            {clients.map((client) => (
                                      <tr key={client.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">{client.email}</td>td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">{client.company || '-'}</td>td>
                                      </tr>tr>
                                    ))}
                                          </tbody>tbody>
                              </table>table>
                    </div>div>
                )}
          </div>div>
        );
}</div>
