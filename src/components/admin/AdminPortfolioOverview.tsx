
import React from 'react';

interface AdminPortfolioOverviewProps {
  portfolioData: any;
  blogs: any[];
  skills: any[];
  achievements: any[];
  publications: any[];
}

const AdminPortfolioOverview = ({ 
  portfolioData, 
  blogs, 
  skills, 
  achievements, 
  publications 
}: AdminPortfolioOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Portfolio Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {blogs.filter(b => b.status === 'published').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Published Blogs</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{skills.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Skills</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">{achievements.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">{publications.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Publications</div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-4 sm:p-6">
          <h4 className="font-semibold mb-3 text-sm sm:text-base">Hero Section</h4>
          <p className="text-sm"><strong>Name:</strong> {portfolioData.hero.name}</p>
          <p className="text-sm"><strong>Titles:</strong> {portfolioData.hero.titles.join(', ')}</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">{portfolioData.hero.description}</p>
        </div>
        
        <div className="bg-white border rounded-lg p-4 sm:p-6">
          <h4 className="font-semibold mb-3 text-sm sm:text-base">About Section</h4>
          <p className="text-sm"><strong>Education:</strong> {portfolioData.about.education}</p>
          <p className="text-sm"><strong>Experience:</strong> {portfolioData.about.experience}</p>
          <p className="text-sm"><strong>Location:</strong> {portfolioData.about.location}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolioOverview;
