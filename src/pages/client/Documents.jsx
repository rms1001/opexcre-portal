import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Eye } from 'lucide-react';

export default function ClientDocuments() {
    const { userProfile } = useAuth();
    const { documents, properties, fetchDocuments, fetchProperties } = useData();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
        const loadData = async () => {
                await Promise.all([fetchDocuments(), fetchProperties()]);
                setLoading(false);
        };
        loadData();
  }, []);

  const clientPropertyIds = properties
      .filter(p => p.clientId === userProfile?.uid || p.assignedClients?.includes(userProfile?.uid))
      .map(p => p.id);

  const clientDocs = documents.filter(d => 
                                          d.clientId === userProfile?.uid || clientPropertyIds.includes(d.propertyId)
                                        );

  if (loading) {
        return (
                <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>div>
                </div>div>
              );
  }
  
    return (
          <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>h1>
          
            {clientDocs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                              <FileText className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents available</h3>h3>
                              <p className="mt-1 text-sm text-gray-500">Documents will appear here when uploaded.</p>p>
                    </div>div>
                  ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                                        <tr>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>th>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>th>
                                                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>th>
                                                        </tr>tr>
                                          </thead>thead>
                                          <tbody className="divide-y divide-gray-200">
                                            {clientDocs.map(doc => (
                                      <tr key={doc.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4">
                                                                            <div className="flex items-center">
                                                                                                  <FileText className="h-5 w-5 text-blue-500 mr-3" />
                                                                                                  <span className="font-medium">{doc.name}</span>span>
                                                                            </div>div>
                                                        </td>td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">{doc.type || 'General'}</td>td>
                                                        <td className="px-6 py-4 text-right">
                                                          {doc.url && (
                                                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                                                      <Eye className="h-5 w-5 inline" />
                                                              </a>a>
                                                                            )}
                                                        </td>td>
                                      </tr>tr>
                                    ))}
                                          </tbody>tbody>
                              </table>table>
                    </div>div>
                )}
          </div>div>
        );
}</div>
