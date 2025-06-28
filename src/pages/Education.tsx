
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Calendar, Award, BookOpen, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

const Education = () => {
  // Analytics tracking
  useEffect(() => {
    // Track page view
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Education',
        page_location: window.location.href,
      });
    }
  }, []);

  const education = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      institution: "Ajayi Crowther University, Oyo, Oyo State, NG",
      period: "2025 - 2026",
      description: "Specialized in machine learning, statistical analysis, and big data processing'.",
      coursework: ["Machine Learning", "Statistical Methods", "Data Mining", "Big Data Analytics", "Research Methods"],
      honors: ["Dean's List", "Graduate Research Assistant"]
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "Federal University Oye-Ekiti, Ekiti State, NG",
      period: "2018 - 2023",
      description: "Foundation in computer science with focus on software development and algorithms. Thesis on 'Brain Stroke Prediction Using Artificial Intelligence'.",
      coursework: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Web Development"],
      honors: ["Magna Cum Laude", "Computer Science Society President"]
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "AWS Certified Machine Learning - Specialty",
      issuer: "Microsoft Azure",
      date: "2025",
      credentialId: "AZ-104",
      url: "https://aws.amazon.com/certification/"
    },
    {
      id: 2,
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-DE-002",
      url: "https://cloud.google.com/certification"
    },
    {
      id: 3,
      title: "Unity Certified Developer",
      issuer: "Unity Technologies",
      date: "2023",
      credentialId: "UNITY-DEV-003",
      url: "https://unity.com/products/unity-certifications"
    }
  ];

  const onlineCourses = [
    {
      id: 1,
      title: "Deep Learning Specialization",
      platform: "Coursera",
      instructor: "Andrew Ng",
      completed: "2023",
      skills: ["Neural Networks", "CNN", "RNN", "Deep Learning"]
    },
    {
      id: 2,
      title: "MLOps Engineering",
      platform: "Udacity",
      instructor: "Industry Experts",
      completed: "2023",
      skills: ["Docker", "Kubernetes", "CI/CD", "Model Deployment"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Education
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My academic journey and continuous learning in Data Science, Technology, and Game Development
            </p>
          </div>
        </div>
      </section>

      {/* Formal Education */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Formal Education</h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-lg text-blue-600 mb-2">{edu.institution}</p>
                    <p className="text-gray-600 mb-4">{edu.description}</p>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <div className="flex items-center space-x-2 text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Honors & Awards</h4>
                    <div className="space-y-2">
                      {edu.honors.map((honor, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-700">{honor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Professional Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-blue-600 mb-3">{cert.issuer}</p>
                <p className="text-sm text-gray-600 mb-4">ID: {cert.credentialId}</p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <span>Verify Certificate</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Learning */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Continuous Learning</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {onlineCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <span className="text-sm text-gray-500">{course.platform}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-3">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500 mb-4">Completed: {course.completed}</p>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Skills Acquired:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Education;
