import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Users,
  Library,
  BarChart3,
  LogOut,
  UserCircle,
} from 'lucide-react';

import BookManagement from '@/components/admin/book/BookManagement';
import AuthorManagement from '@/components/admin/author/AuthorManagement';
import CategoryManagement from '@/components/admin/categories/CategoryManagement';
import UserManagement from '@/components/admin/user/UserManagement';
import StatsCard from './StatsCard';

import { getAllAuthors } from '@/services/authorService';
import { getAllBooks } from '@/services/bookService';
import { getAllCategories } from '@/services/categoryService';
import { getAllUsers } from '@/services/userService';

interface AdminDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
  };
  onLogout: () => void;
}

export default function AdminDashboard({
  user,
  onLogout,
}: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    totalBooks: 0,
    activeUsers: 0,
    authors: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [books, users, authors, categories] = await Promise.all([
          getAllBooks(),
          getAllUsers(),
          getAllAuthors(),
          getAllCategories(),
        ]);

        setStats({
          totalBooks: books.length,
          activeUsers: users.length,
          authors: authors.length,
          categories: categories.length,
        });
      } catch (e) {
        console.error('Failed to fetch dashboard stats:', e);
      }
    };

    fetchStats();
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'authors', label: 'Authors', icon: UserCircle },
    { id: 'categories', label: 'Categories', icon: Library },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'books':
        return <BookManagement />;
      case 'authors':
        return <AuthorManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Books"
                value={stats.totalBooks}
                change="+12% from last month"
                icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
              />
              <StatsCard
                title="Active Users"
                value={stats.activeUsers}
                change="+8% from last month"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
              />
              <StatsCard
                title="Authors"
                value={stats.authors}
                change="+8% from last month"
                icon={<UserCircle className="h-4 w-4 text-muted-foreground" />}
              />
              <StatsCard
                title="Categories"
                value={stats.categories}
                change="+2 new this month"
                icon={<Library className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                BookStore Admin
              </h1>
            </div>

            {/* User Info + Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{user.name}</span>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  {user.role.toUpperCase()}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
