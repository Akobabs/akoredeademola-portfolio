
import { useState, useEffect  } from 'react';
import { FolderOpen, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'game-dev', name: 'Game Development' },
    { id: 'mlops', name: 'MLOps' },
    { id: 'research', name: 'Research' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Customer Churn Prediction',
      description: 'ML model to predict customer churn using ensemble methods and feature engineering.',
      category: 'data-science',
      tags: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=300',
    },
    {
      id: 2,
      title: '2D Platformer Game',
      description: 'A physics-based platformer built with Unity, featuring dynamic environments.',
      category: 'game-dev',
      tags: ['Unity', 'C#', 'Game Design', '2D Physics'],
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=500&h=300',
    },
    {
      id: 3,
      title: 'ML Pipeline Automation',
      description: 'Automated MLOps pipeline with model versioning, monitoring, and deployment.',
      category: 'mlops',
      tags: ['Docker', 'Kubernetes', 'MLflow', 'AWS'],
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=500&h=300',
    },
    {
      id: 4,
      title: 'Natural Language Processing Research',
      description: 'Research on sentiment analysis in social media using transformer models.',
      category: 'research',
      tags: ['NLP', 'Transformers', 'PyTorch', 'Research'],
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&h=300',
    },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore my journey through data science, game development, and research projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <ExternalLink className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <a href="/projects">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            View All Projects
          </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
