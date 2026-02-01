import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    LayoutDashboard, Building, Users, FileText, BarChart3, 
    Settings, LogOut, Menu, X 
} from 'lucide-react';

export default function Layout({ children }) {
    const { currentUser, userProfile, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const isAdmin = userProfile?.role === 'admin';

  const adminNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Properties', icon: Building, path: '/admin/properties' },
    { label: 'Clients', icon: Users, path: '/admin/clients' },
    { label: 'Documents', icon: FileText, path: '/admin/documents' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
      ];

  const clientNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/portal' },
    { label: 'Properties', icon: Building, path: '/portal/properties' },
    { label: 'Documents', icon: FileText, path: '/portal/documents' },
    { label: 'Reports', icon: BarChart3, path: '/portal/reports' },
      ];

  const navItems = isAdmin ? adminNavItems : clientNavItems;

  const handleLogout = async () => {
        try {
                await logout();
                navigate('/login');
        } catch (error) {
                console.error('Logout error:', error);
        }
  };

  return (
        <div className="flex min-h-screen bg-gray-100">
              <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300`}>
                      <div className="p-4 flex items-center justify-between">
                                <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>OpExCRE</h1>h1>
                                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
                                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>button>
                      </div>div>
                      <nav className="mt-4 space-y-1 px-2">
                        {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                                      <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                                                            isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                                                        }`}
                                                      >
                                                      <Icon className="h-5 w-5 flex-shrink-0" />
                                        {sidebarOpen && <span>{item.label}</span>span>}
                                      </Link>Link>
                                    );
        })}
                      </nav>nav>
                      <div className="absolute bottom-4 left-0 right-0 px-2">
                                <button
                                              onClick={handleLogout}
                                              className="flex items-center gap-3 px-3 py-2 w-full text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                            <LogOut className="h-5 w-5 flex-shrink-0" />
                                  {sidebarOpen && <span>Logout</span>span>}
                                </button>button>
                      </div>div>
              </aside>aside>
              <main className="flex-1 p-8 overflow-auto">
                {children}
              </main>main>
        </div>div>
      );
}</div>
