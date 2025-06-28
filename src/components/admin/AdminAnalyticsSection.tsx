
import React from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import VisitorMap from './VisitorMap';

const AdminAnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Site Analytics</h2>
      <AnalyticsDashboard />
      <VisitorMap />
    </div>
  );
};

export default AdminAnalyticsSection;
