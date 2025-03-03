
import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building,
  Users,
  ListChecks,
  MapPin,
  BarChart3,
  Globe
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { firms } = useDirectory();
  
  // Calculate statistics
  const totalFirms = firms.length;
  const firmsBySize = firms.reduce((acc, firm) => {
    acc[firm.size] = (acc[firm.size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const firmsByState = firms.reduce((acc, firm) => {
    const state = firm.location.state;
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const specialtyCounts = firms.reduce((acc, firm) => {
    firm.specialties.forEach(specialty => {
      acc[specialty] = (acc[specialty] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Laravel Firms Dashboard</h1>
        <p className="text-muted-foreground">Overview of Laravel firms in the directory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Firms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFirms}</div>
            <p className="text-xs text-muted-foreground">
              Laravel firms in directory
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Firm Sizes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(firmsBySize).length > 0 ? (
                Object.entries(firmsBySize).map(([size, count]) => (
                  <div key={size} className="flex items-center justify-between">
                    <span className="text-sm">{size}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No size data available</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Specialties</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(specialtyCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([specialty, count]) => (
                  <div key={specialty} className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[180px]">{specialty}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(firmsByState)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([state, count]) => (
                  <div key={state} className="flex items-center justify-between">
                    <span className="text-sm">{state}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
