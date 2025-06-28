
const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              My Journey in Technology
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate technologist with a deep love for data science, game development, 
              and machine learning operations. My journey began with curiosity about how data 
              can tell stories and has evolved into a comprehensive exploration of modern 
              technology stacks.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Currently focused on building scalable ML systems while exploring the creative 
              world of game development. I believe in the power of continuous learning and 
              sharing knowledge through research and open-source contributions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">20+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">Core Expertise</h4>
            
            <div className="space-y-4">
              {[
                { skill: 'Data Science & Analytics', level: 90 },
                { skill: 'Machine Learning', level: 85 },
                { skill: 'Python & R', level: 95 },
                { skill: 'Game Development', level: 70 },
                { skill: 'MLOps & DevOps', level: 80 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">{item.skill}</span>
                    <span className="text-gray-500">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
