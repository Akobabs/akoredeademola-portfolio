
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getVisitsByPage, getVisitsByCountry, getVisitsByDay, getAnalyticsData } from '@/services/analytics';
import { RefreshCcw, Map, BarChart2, Calendar } from 'lucide-react';

// Colors for charts
const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const AnalyticsDashboard = () => {
  const [pageVisits, setPageVisits] = useState<{name: string, visits: number}[]>([]);
  const [countryVisits, setCountryVisits] = useState<{name: string, value: number}[]>([]);
  const [dailyVisits, setDailyVisits] = useState<{date: string, visits: number}[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [totalPageViews, setTotalPageViews] = useState<number>(0);
  const [activeView, setActiveView] = useState<'daily' | 'pages' | 'countries'>('daily');

  const loadAnalyticsData = () => {
    // Get visits by page
    const pageVisitsData = getVisitsByPage();
    const formattedPageVisits = Object.entries(pageVisitsData).map(([page, count]) => ({
      name: page || '/',
      visits: count
    })).sort((a, b) => b.visits - a.visits);
    setPageVisits(formattedPageVisits);
    
    // Get visits by country
    const countryVisitsData = getVisitsByCountry();
    const formattedCountryVisits = Object.entries(countryVisitsData).map(([country, count]) => ({
      name: country || 'Unknown',
      value: count
    })).sort((a, b) => b.value - a.value);
    setCountryVisits(formattedCountryVisits);
    
    // Get visits by day
    const dailyVisitsData = getVisitsByDay();
    const formattedDailyVisits = Object.entries(dailyVisitsData).map(([date, count]) => ({
      date,
      visits: count
    }));
    setDailyVisits(formattedDailyVisits);
    
    // Get visitor count
    const analyticsData = getAnalyticsData();
    setVisitorCount(analyticsData.visitors.total);
    setTotalPageViews(analyticsData.pageVisits.length);
  };

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  return (
    <div className="bg-card rounded-lg shadow-md p-4 sm:p-6 border border-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">Analytics Dashboard</h2>
        <button 
          onClick={loadAnalyticsData}
          className="p-2 rounded-lg hover:bg-muted transition-colors self-end sm:self-auto"
          aria-label="Refresh analytics data"
        >
          <RefreshCcw className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-primary/10 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Unique Visitors</p>
          <p className="text-xl sm:text-2xl font-bold text-foreground">{visitorCount}</p>
        </div>
        <div className="bg-secondary/10 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Page Views</p>
          <p className="text-xl sm:text-2xl font-bold text-foreground">{totalPageViews}</p>
        </div>
      </div>

      {/* Chart View Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveView('daily')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
            activeView === 'daily' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Daily Visits</span>
        </button>
        <button
          onClick={() => setActiveView('pages')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
            activeView === 'pages' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Pages</span>
        </button>
        <button
          onClick={() => setActiveView('countries')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
            activeView === 'countries' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Countries</span>
        </button>
      </div>

      {/* Charts */}
      <div className="h-64 sm:h-80">
        {activeView === 'daily' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyVisits}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end"
                tick={{fontSize: 10, fill: 'hsl(var(--foreground))'}}
                height={60}
                stroke="hsl(var(--border))"
              />
              <YAxis allowDecimals={false} tick={{fontSize: 10, fill: 'hsl(var(--foreground))'}} stroke="hsl(var(--border))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Bar dataKey="visits" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeView === 'pages' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pageVisits.slice(0, 10)}
              layout="vertical"
              margin={{
                top: 5,
                right: 10,
                left: 60,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" allowDecimals={false} tick={{fontSize: 10, fill: 'hsl(var(--foreground))'}} stroke="hsl(var(--border))" />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{fontSize: 9, fill: 'hsl(var(--foreground))'}} 
                width={60}
                stroke="hsl(var(--border))"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Bar dataKey="visits" fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeView === 'countries' && (
          <div className="h-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={countryVisits.slice(0, 8)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={window.innerWidth < 640 ? 60 : 80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {countryVisits.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--popover-foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 text-sm">
              {countryVisits.length === 0 && (
                <p className="text-muted-foreground italic">No country data available yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
