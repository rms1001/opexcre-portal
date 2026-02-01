import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import PropertyForm from './pages/admin/PropertyForm';
import AdminClients from './pages/admin/Clients';
import AdminDocuments from './pages/admin/Documents';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientProperties from './pages/client/Properties';
import PropertyDetail from './pages/client/PropertyDetail';
import ClientDocuments from './pages/client/Documents';
import ClientReports from './pages/client/Reports';

// Components
import Layout from './components/Layout';

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }) {
    const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
        return (
                <div className="min-h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div>
                </div>div>
              );
  }
  
    if (!currentUser) {
          return <Navigate to="/login" replace />;
    }
  
    if (requireAdmin && userProfile?.role !== 'admin') {
          return <Navigate to="/portal" replace />;
    }
  
    return <Layout>{children}</Layout>Layout>;
}

// Root redirect based on role
function RootRedirect() {
    const { currentUser, userProfile, loading } = useAuth();
  
    if (loading) {
          return (
                  <div className="min-h-screen flex items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div>
                  </div>div>
                );
    }
  
    if (!currentUser) {
          return <Navigate to="/login" replace />;
    }
  
    if (userProfile?.role === 'admin') {
          return <Navigate to="/admin" replace />;
    }
  
    return <Navigate to="/portal" replace />;
}

// Public Route (redirect to dashboard if logged in)
function PublicRoute({ children }) {
    const { currentUser, userProfile, loading } = useAuth();
  
    if (loading) {
          return (
                  <div className="min-h-screen flex items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div>
                  </div>div>
                );
    }
  
    if (currentUser) {
          if (userProfile?.role === 'admin') {
                  return <Navigate to="/admin" replace />;
          }
          return <Navigate to="/portal" replace />;
    }
  
    return children;
}

function AppRoutes() {
    return (
          <Routes>
            {/* Root */}
                <Route path="/" element={<RootRedirect />} />
          
            {/* Public Routes */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>PublicRoute>} />
                      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>PublicRoute>} />
                      
                        {/* Admin Routes */}
                            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>ProtectedRoute>} />
                                  <Route path="/admin/properties" element={<ProtectedRoute requireAdmin><AdminProperties /></ProtectedRoute>ProtectedRoute>} />
                                        <Route path="/admin/properties/new" element={<ProtectedRoute requireAdmin><PropertyForm /></ProtectedRoute>ProtectedRoute>} />
                                              <Route path="/admin/properties/:id/edit" element={<ProtectedRoute requireAdmin><PropertyForm /></ProtectedRoute>ProtectedRoute>} />
                                                    <Route path="/admin/clients" element={<ProtectedRoute requireAdmin><AdminClients /></ProtectedRoute>ProtectedRoute>} />
                                                          <Route path="/admin/documents" element={<ProtectedRoute requireAdmin><AdminDocuments /></ProtectedRoute>ProtectedRoute>} />
                                                                <Route path="/admin/reports" element={<ProtectedRoute requireAdmin><AdminReports /></ProtectedRoute>ProtectedRoute>} />
                                                                      <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>ProtectedRoute>} />
                                                                      
                                                                        {/* Client Routes */}
                                                                            <Route path="/portal" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>ProtectedRoute>} />
                                                                                  <Route path="/portal/properties" element={<ProtectedRoute><ClientProperties /></ProtectedRoute>ProtectedRoute>} />
                                                                                        <Route path="/portal/properties/:id" element={<ProtectedRoute><PropertyDetail /></ProtectedRoute>ProtectedRoute>} />
                                                                                              <Route path="/portal/documents" element={<ProtectedRoute><ClientDocuments /></ProtectedRoute>ProtectedRoute>} />
                                                                                                    <Route path="/portal/reports" element={<ProtectedRoute><ClientReports /></ProtectedRoute>ProtectedRoute>} />
                                                                                                    
                                                                                                      {/* Catch all */}
                                                                                                          <Route path="*" element={<Navigate to="/" replace />} />
                                                                                                      </Route>Routes>
                                                                                                );
                                                                                                }
                                                                                              
                                                                                              export default function App() {
                                                                                                  return (
                                                                                                  <BrowserRouter>
                                                                                                        <AuthProvider>
                                                                                                                <DataProvider>
                                                                                                                          <AppRoutes />
                                                                                                                  </DataProvider>DataProvider>
                                                                                                          </AuthProvider>AuthProvider>
                                                                                                    </BrowserRouter>BrowserRouter>
                                                                                                );
                                                                                                }</div>
