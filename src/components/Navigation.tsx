
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Building, label: 'Directory', path: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div className="flex items-center space-x-4 py-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;
