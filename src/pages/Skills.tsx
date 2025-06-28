import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Award, TrendingUp, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useEffect } from 'react';

const Skills = () => {
  // Analytics tracking
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Skills & Education',
        page_location: window.location.href,
      });
    }
  }, []);

  const skillCategories = [
    {
      title: "Artificial Intelligence & Machine Learning",
      description: "Advanced AI model development, computer vision, and explainable AI",
      skills: [
        { name: "Python", level: 95, subskills: ["TensorFlow", "Keras", "scikit-learn", "Pandas", "NumPy"] },
        { name: "Computer Vision", level: 90, subskills: ["OpenCV", "ResNet", "CNN Architectures", "GradCAM"] },
        { name: "Explainable AI", level: 85, subskills: ["SHAP", "LIME", "Attention Heatmaps"] },
        { name: "Data Visualization", level: 88, subskills: ["Matplotlib", "Seaborn", "Plotly", "Dash"] },
        { name: "Bioinformatics", level: 80, subskills: ["BioPython", "Genomic Data Processing"] }
      ]
    },
    {
      title: "Cloud & MLOps",
      description: "Cloud-based ML deployment and operations",
      skills: [
        { name: "Azure ML", level: 85, subskills: ["Model Deployment", "Resource Monitoring", "CI/CD"] },
        { name: "Kubernetes", level: 75, subskills: ["Container Orchestration", "Scaling"] },
        { name: "Docker", level: 80, subskills: ["Containerization", "Docker Compose"] },
        { name: "Monitoring", level: 78, subskills: ["Anomaly Detection", "Performance Dashboards"] }
      ]
    },
    {
      title: "Web Development",
      description: "Frontend and backend web application development",
      skills: [
        { name: "React", level: 80, subskills: ["Hooks", "Context API", "Tailwind CSS"] },
        { name: "JavaScript", level: 85, subskills: ["ES6+", "API Integration"] },
        { name: "HTML/CSS", level: 82, subskills: ["Responsive Design", "CSS Grid", "Flexbox"] }
      ]
    },
    {
      title: "Blockchain & Cybersecurity",
      description: "Distributed systems and network security",
      skills: [
        { name: "Blockchain", level: 70, subskills: ["Hyperledger Fabric", "Smart Contracts"] },
        { name: "Artificial Immune Systems", level: 75, subskills: ["Intrusion Detection", "Anomaly Detection"] },
        { name: "Network Analysis", level: 72, subskills: ["Wireshark", "Traffic Analysis"] }
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Federal University Oye-Ekiti",
      location: "Ekiti State, Nigeria",
      period: "2018 - 2023",
      achievements: [
        "Dissertation: Brain Stroke Prediction using AI and ML",
        "Most Influential Student, NASS FUOYE Chapter (2022)",
        "Brain of the Year, NACOS FUOYE Chapter (2019)",
        "Active member of NACOS and NASS",
        "Seminar on Blockchain in Loan Management Systems"
      ]
    },
    {
      degree: "Transferred from Computer Engineering",
      institution: "Oduduwa University Ipetumodu",
      location: "Osun State, Nigeria",
      period: "2016 - 2018",
      achievements: [
        "Secretary General, Nigeria University Engineering Student Association",
        "Ramon Adedoyin House Representative in Student Parliamentary System"
      ]
    }
  ];

  const certifications = [
    {
      name: "AZURE 104: Azure IT Administrator",
      issuer: "Stanbic IBTC DiSEP Cohort 4.0",
      date: "2025",
      credentialId: " "
    },
    {
      name: "Professional Diploma in AI and ML",
      issuer: "3MTT/NITDA Cohort 3",
      date: "2025",
      credentialId: " "
    },
    {
      name: "Machine Learning Operations",
      issuer: "Datatalks.club Zoomcamp 2025 Cohort",
      date: "2025",
      credentialId: " "
    },
    {
      name: "Prompt Engineering for ChatGPT",
      issuer: "Vanderbilt University (Coursera)",
      date: "2024",
      credentialId: " "
    },
    {
      name: "Imaging Analyzing and Implementing of Images",
      issuer: "Udemy",
      date: "2023",
      credentialId: " "
    },
    {
      name: "Python and Artificial Intelligence Coding Tools",
      issuer: "Srinidhi (Udemy)",
      date: "2022",
      credentialId: " "
    },
    {
      name: "Complete Machine Learning with R Studio",
      issuer: "Start Tech Academy",
      date: "2021",
      credentialId: " "
    },
    {
      name: "JavaScript, PHP, and Python Programming",
      issuer: "Proper Dot Institute",
      date: "2020",
      credentialId: " "
    }
  ];

  const tools = [
    { name: "VS Code", icon: "💻", category: "Development" },
    { name: "Jupyter", icon: "📓", category: "Data Science" },
    { name: "Git", icon: "🔀", category: "Version Control" },
    { name: "Tally ERP 9", icon: "📊", category: "Inventory Management" },
    { name: "Wireshark", icon: "🔍", category: "Network Analysis" },
    { name: "Azure ML", icon: "☁️", category: "Cloud Computing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Skills & Education
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills, educational background, and professional development
            </p>
          </div>
        </div>
      </section>

      {/* Skills Categories - Reduced gaps */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Technical Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My expertise across multiple domains of technology and development
            </p>
          </div>
          
          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="bg-secondary/30 rounded-lg p-4 hover:shadow-md transition-shadow border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-card-foreground">{skill.name}</h4>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">{skill.level}%</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {skill.subskills.map((subskill, subIndex) => (
                            <span
                              key={subIndex}
                              className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                            >
                              {subskill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section - Reduced spacing */}
      <section className="py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Education</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My academic journey and formal education in computer science
            </p>
          </div>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-card rounded-lg p-6 hover:shadow-md transition-shadow border border-border">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 rounded-full p-3 border border-primary/20">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-2">{edu.degree}</h3>
                        <h4 className="text-lg text-muted-foreground mb-3">{edu.institution}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-card-foreground mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications - Reduced spacing */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-card rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow border border-border">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2 text-sm">{cert.name}</h3>
                <p className="text-muted-foreground mb-2 text-sm">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground mb-2">{cert.date}</p>
                <p className="text-xs text-primary">{cert.credentialId}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Software - Reduced spacing */}
      <section className="py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tools & Software</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everyday tools and software that power my productivity and development workflow
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="bg-card rounded-lg p-4 text-center hover:shadow-md transition-shadow border border-border">
                <div className="text-3xl mb-2">{tool.icon}</div>
                <h3 className="text-sm font-semibold text-card-foreground mb-1">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Development Timeline - Reduced spacing */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Learning Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My continuous learning path and skill development over time
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 border border-primary/20">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">2016-2018</h3>
                <p className="text-sm text-muted-foreground">Foundation in Computer Engineering</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">2018-2023</h3>
                <p className="text-sm text-muted-foreground">Deep dive into AI and Computer Science</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">2023-2024</h3>
                <p className="text-sm text-muted-foreground">Advancing in Cloud ML and Automation</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">2024+</h3>
                <p className="text-sm text-muted-foreground">Exploring Game Development and  Research in Explainable AI and Healthcare </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skills;