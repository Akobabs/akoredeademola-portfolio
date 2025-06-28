
import React, { useState, useEffect, useMemo } from 'react';
import { getVisitsByCountry, getAnalyticsData } from '@/services/analytics';
import { MapPin, Users, Eye } from 'lucide-react';

const countryCoordinates: Record<string, [number, number]> = {
  'United States': [-95.7129, 37.0902],
  'United Kingdom': [-3.4360, 55.3781],
  'Canada': [-106.3468, 56.1304],
  'Germany': [10.4515, 51.1657],
  'France': [2.2137, 46.2276],
  'Nigeria': [8.6753, 9.0820],
  'India': [78.9629, 20.5937],
  'Australia': [133.7751, -25.2744],
  'Brazil': [-51.9253, -14.2350],
  'Japan': [138.2529, 36.2048],
  'China': [104.1954, 35.8617],
  'South Africa': [22.9375, -30.5595],
  'Mexico': [-102.5528, 23.6345],
  'Russia': [105.3188, 61.5240],
  'Italy': [12.5674, 41.8719],
  'Spain': [-3.7492, 40.4637],
  'Netherlands': [5.2913, 52.1326],
  'Sweden': [18.6435, 60.1282],
  'Norway': [8.4689, 60.4720],
  'Denmark': [9.5018, 56.2639],
  'Unknown': [0, 0],
};

const VisitorMap = () => {
  const [countryData, setCountryData] = useState<{ name: string; visits: number; coordinates?: [number, number] }[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalPageViews, setTotalPageViews] = useState(0);

  useEffect(() => {
    const analyticsData = getAnalyticsData();
    const countryVisits = getVisitsByCountry();

    setTotalVisitors(analyticsData.visitors.total);
    setTotalPageViews(analyticsData.pageVisits.length);

    const formattedData = Object.entries(countryVisits).map(([name, visits]) => ({
      name,
      visits,
      coordinates: countryCoordinates[name] || countryCoordinates['Unknown'],
    })).sort((a, b) => b.visits - a.visits);

    setCountryData(formattedData);
  }, []);

  const maxVisits = useMemo(() => Math.max(...countryData.map(c => c.visits), 1), [countryData]);
  const topCountries = useMemo(() => countryData.slice(0, 10), [countryData]);

  return (
    <div className="bg-card rounded-lg shadow-md p-4 sm:p-6 border border-border">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg sm:text-xl font-bold text-foreground">Visitor Location Analytics</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
          <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded">
            <Users className="h-4 w-4" />
            <span>{totalVisitors} Visitors</span>
          </div>
          <div className="flex items-center space-x-2 bg-secondary/10 text-secondary-foreground px-3 py-1 rounded">
            <Eye className="h-4 w-4" />
            <span>{totalPageViews} Page Views</span>
          </div>
        </div>
      </div>

      {/* World Map Visualization */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-b from-muted/20 to-muted/40 rounded-lg p-4 sm:p-8 min-h-[300px] sm:min-h-[400px] overflow-hidden border border-border">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground mb-8">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-2">🌍</div>
              <p className="text-sm sm:text-base">Visitor Distribution Worldwide</p>
            </div>
          </div>

          {topCountries.map((country, i) => {
            const ratio = country.visits / maxVisits;
            const size = Math.max(8, ratio * 24);
            const opacity = 0.4 + ratio * 0.6;
            const angle = (i / topCountries.length) * 2 * Math.PI;
            const radius = 80;
            const x = 50 + (radius * Math.cos(angle)) / 2;
            const y = 50 + (radius * Math.sin(angle)) / 4;

            return (
              <div
                key={country.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div
                  className="rounded-full animate-pulse"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `hsl(var(--primary) / ${opacity})`,
                  }}
                />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-border">
                  {country.name}: {country.visits} visits
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Country Stats Table */}
      <div className="overflow-x-auto">
        <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">Top Visitor Countries</h4>
        {countryData.length > 0 ? (
          <div className="space-y-3">
            {countryData.slice(0, 8).map((country, index) => {
              const percent = totalPageViews ? (country.visits / totalPageViews) * 100 : 0;
              return (
                <div key={country.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base text-foreground">{country.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{percent.toFixed(1)}% of total visits</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm sm:text-base text-foreground">{country.visits}</div>
                    <div className="text-xs text-muted-foreground">visits</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No visitor location data available yet.</p>
            <p className="text-sm mt-1">Data will appear as visitors access your site.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorMap;
