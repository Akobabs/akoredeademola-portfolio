
// Simple analytics service to track page visits
// In a production environment, you might want to use a more robust solution

const ANALYTICS_STORAGE_KEY = 'site_analytics_data';

interface PageVisit {
  path: string;
  timestamp: number;
  location?: {
    country?: string;
    city?: string;
    region?: string;
  };
  referrer?: string;
}

export interface AnalyticsData {
  pageVisits: PageVisit[];
  visitors: {
    total: number;
    uniqueIPs: Set<string>;
  };
  // Add more metrics as needed
}

// Initialize analytics data
const initAnalyticsData = (): AnalyticsData => {
  const storedData = localStorage.getItem(ANALYTICS_STORAGE_KEY);
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      return {
        ...parsed,
        visitors: {
          ...parsed.visitors,
          uniqueIPs: new Set(parsed.visitors.uniqueIPs || [])
        }
      };
    } catch (error) {
      console.error('Failed to parse analytics data', error);
    }
  }
  
  return {
    pageVisits: [],
    visitors: {
      total: 0,
      uniqueIPs: new Set<string>()
    }
  };
};

// Save analytics data to storage
const saveAnalyticsData = (data: AnalyticsData) => {
  // Convert Set to Array for serialization
  const serializableData = {
    ...data,
    visitors: {
      ...data.visitors,
      uniqueIPs: Array.from(data.visitors.uniqueIPs)
    }
  };
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(serializableData));
};

// Track a page visit
export const trackPageVisit = async () => {
  try {
    const analyticsData = initAnalyticsData();
    
    // Attempt to get location data
    let locationData = {};
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        locationData = {
          country: data.country_name,
          city: data.city,
          region: data.region
        };
        
        // Count as unique visitor if we haven't seen this IP
        if (data.ip && !analyticsData.visitors.uniqueIPs.has(data.ip)) {
          analyticsData.visitors.uniqueIPs.add(data.ip);
          analyticsData.visitors.total++;
        }
      }
    } catch (error) {
      console.error('Failed to fetch location data', error);
    }
    
    // Record page visit
    analyticsData.pageVisits.push({
      path: window.location.pathname,
      timestamp: Date.now(),
      location: locationData,
      referrer: document.referrer || undefined
    });
    
    saveAnalyticsData(analyticsData);
    return true;
  } catch (error) {
    console.error('Failed to track page visit', error);
    return false;
  }
};

// Get analytics data
export const getAnalyticsData = (): AnalyticsData => {
  return initAnalyticsData();
};

// Clear analytics data (for testing)
export const clearAnalyticsData = () => {
  localStorage.removeItem(ANALYTICS_STORAGE_KEY);
};

// Get visits by page
export const getVisitsByPage = (): Record<string, number> => {
  const analyticsData = initAnalyticsData();
  
  return analyticsData.pageVisits.reduce<Record<string, number>>((acc, visit) => {
    acc[visit.path] = (acc[visit.path] || 0) + 1;
    return acc;
  }, {});
};

// Get visits by country
export const getVisitsByCountry = (): Record<string, number> => {
  const analyticsData = initAnalyticsData();
  
  return analyticsData.pageVisits.reduce<Record<string, number>>((acc, visit) => {
    if (visit.location?.country) {
      acc[visit.location.country] = (acc[visit.location.country] || 0) + 1;
    }
    return acc;
  }, {});
};

// Get visits by day (last 7 days)
export const getVisitsByDay = (): Record<string, number> => {
  const analyticsData = initAnalyticsData();
  const result: Record<string, number> = {};
  
  // Initialize last 7 days with zero visits
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result[dateStr] = 0;
  }
  
  // Count visits
  analyticsData.pageVisits.forEach(visit => {
    const date = new Date(visit.timestamp);
    const dateStr = date.toISOString().split('T')[0];
    
    // Only count visits from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    if (date >= sevenDaysAgo) {
      result[dateStr] = (result[dateStr] || 0) + 1;
    }
  });
  
  return result;
};
