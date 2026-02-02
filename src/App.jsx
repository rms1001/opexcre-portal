import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import PropertyForm from './pages/admin/PropertyForm';
import AdminClients from './pages/admin/Clients';
import AdminDocuments from './pages/admin/Documents';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import ClientDashboard from './pages/client/Dashboard';
import ClientProperties from './pages/client/Properties';
import PropertyDetail from './pages/client/PropertyDetail';
import ClientDocuments from './pages/client/Documents';
import ClientReports from './pages/client/Reports';
import Layout from './components/Layout';

function LoadingSpinner() {
  return React.createElement('div', {className: 'min-h-screen flex items-center justify-center'},
    React.createElement('div', {className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600'})
  );
}

function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, userProfile, loading } = useAuth();
  if (loading) return React.createElement(LoadingSpinner);
  if (!currentUser) return React.createElement(Navigate, {to: '/login', replace: true});
  if (requireAdmin && userProfile?.role !== 'admin') return React.createElement(Navigate, {to: '/portal', replace: true});
  return React.createElement(Layout, null, children);
}

function PublicRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();
  if (loading) return React.createElement(LoadingSpinner);
  if (currentUser) return React.createElement(Navigate, {to: userProfile?.role === 'admin' ? '/admin' : '/portal', replace: true});
  return children;
}

function RootRedirect() {
  const { currentUser, userProfile, loading } = useAuth();
  if (loading) return React.createElement(LoadingSpinner);
  if (!currentUser) return React.createElement(Navigate, {to: '/login', replace: true});
  return React.createElement(Navigate, {to: userProfile?.role === 'admin' ? '/admin' : '/portal', replace: true});
}

function AppRoutes() {
  return React.createElement(Routes, null,
    React.createElement(Route, {path: '/', element: React.createElement(RootRedirect)}),
    React.createElement(Route, {path: '/login', element: React.createElement(PublicRoute, null, React.createElement(Login))}),
    React.createElement(Route, {path: '/forgot-password', element: React.createElement(PublicRoute, null, React.createElement(ForgotPassword))}),
    React.createElement(Route, {path: '/admin', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(AdminDashboard))}),
    React.createElement(Route, {path: '/admin/properties', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(AdminProperties))}),
    React.createElement(Route, {path: '/admin/properties/new', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(PropertyForm))}),
    React.createElement(Route, {path: '/admin/properties/:id/edit', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(PropertyForm))}),
    React.createElement(Route, {path: '/admin/clients', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(AdminClients))}),
    React.createElement(Route, {path: '/admin/documents', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(AdminDocuments))}),
    React.createElement(Route, {path: '/admin/reports', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(AdminReports))}),
    React.createElement(Route, {path: '/admin/settings', element: React.createElement(ProtectedRoute, {requireAdmin: true}, React.createElement(AdminSettings))}),
    React.createElement(Route, {path: '/portal', element: React.createElement(ProtectedRoute, null, React.createElement(ClientDashboard))}),
    React.createElement(Route, {path: '/portal/properties', element: React.createElement(ProtectedRoute, null, React.createElement(ClientProperties))}),
    React.createElement(Route, {path: '/portal/properties/:id', element: React.createElement(ProtectedRoute, null, React.createElement(PropertyDetail))}),
    React.createElement(Route, {path: '/portal/documents', element: React.createElement(ProtectedRoute, null, React.createElement(ClientDocuments))}),
    React.createElement(Route, {path: '/portal/reports', element: React.createElement(ProtectedRoute, null, React.createElement(ClientReports))}),
    React.createElement(Route, {path: '*', element: React.createElement(Navigate, {to: '/', replace: true})})
  );
}

export default function App() {
  return React.createElement(BrowserRouter, null,
    React.createElement(AuthProvider, null,
      React.createElement(DataProvider, null,
        React.createElement(AppRoutes)
      )
    )
  );
}
