
import React, { useState, useEffect } from 'react';
import { getAnalyticsData, getVisitsByCountry } from '@/services/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Eye, Globe, TrendingUp } from 'lucide-react';

const PublicAnalytics = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [topCountries, setTopCountries] = useState<Array<{name: string, visits: number}>>([]);

  useEffect(() => {
    const analyticsData = getAnalyticsData();
    const countryVisits = getVisitsByCountry();

    setTotalVisitors(analyticsData.visitors.total);
    setTotalPageViews(analyticsData.pageVisits.length);

    const formattedCountries = Object.entries(countryVisits)
      .map(([name, visits]) => ({ name, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);

    setTopCountries(formattedCountries);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5" />
            Site Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border border-border">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold text-foreground">{totalVisitors}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border border-border">
              <Eye className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold text-foreground">{totalPageViews}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-background rounded-lg border border-border">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-2xl font-bold text-foreground">{topCountries.length}</p>
              </div>
            </div>
          </div>

          {topCountries.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Top Visitor Countries</h4>
              <div className="space-y-2">
                {topCountries.map((country, index) => (
                  <div key={country.name} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">{country.name}</span>
                    </div>
                    <span className="text-foreground font-bold">{country.visits} visits</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicAnalytics;
