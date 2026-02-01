import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { FileText } from 'lucide-react';

export default function AdminDocuments() {
    const { documents, fetchDocuments } = useData();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
        fetchDocuments().then(() => setLoading(false));
  }, []);

  if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div></div>div>;
  }
  
    return (
          <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Documents</h1>h1>
            {documents.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                              <p className="text-gray-500">No documents yet. Upload documents to share with clients.</p>p>
                    </div>div>
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
                      {documents.map((doc) => (
                                  <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                                                <FileText className="w-10 h-10 text-emerald-600" />
                                                <div className="flex-1">
                                                                <p className="font-medium text-gray-900">{doc.name}</p>p>
                                                                <p className="text-sm text-gray-500">{doc.type || 'Document'}</p>p>
                                                </div>div>
                                  </div>div>
                                ))}
                    </div>div>
                )}
          </div>div>
        );
}</div>
