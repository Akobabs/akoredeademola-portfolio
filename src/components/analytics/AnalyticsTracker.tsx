
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageVisit } from '@/services/analytics';

// This component will track page visits whenever a user navigates to a new page
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page visit when location changes (route changes)
    trackPageVisit();
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;
