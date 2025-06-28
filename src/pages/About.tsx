import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, Code, Database, Brain } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Federal University Oye-Ekiti",
      year: "2018-2023",
      description: "Dissertation on Brain Stroke Prediction using AI and ML. Graduated with Second Class Upper Division."
    },
    {
      degree: "Transferred from Computer Engineering",
      school: "Oduduwa University Ipetumodu",
      year: "2016-2018",
      description: "Pioneer Secretary General of Nigeria University Engineering Student Association."
    }
  ];

  const experience = [
    {
      title: "Research Assistant (Virtual)",
      company: "eXplainable AI Laboratories, Benson Idahosa University",
      period: "2025 - Present",
      description: "Developed computer vision solutions for plant disease detection and explainable AI frameworks for genomic variant interpretation."
    },
    {
      title: "Laboratory Assistant (Volunteer)",
      company: "Ajayi Crowther University",
      period: "2024 - 2025",
      description: "Implemented CNN-based lung cancer classification system and designed cloud-based ML model performance dashboards."
    },
    {
      title: "Game Development Workshop Participant",
      company: "SAILS Innovative Laboratory, Cohort 3",
      period: "2025",
      description: "Engaged in hands-on game development training, focusing on interactive entertainment using modern tools."
    },
    {
      title: "Assistant System Analyst",
      company: "Ajayi Crowther University",
      period: "2023 - 2024",
      description: "Automated student ID card issuance, reducing processing time by 75%, and provided ICT support for CBT exams."
    },
    {
      title: "Graduate Intern",
      company: "Gabol-Tech Engineering Project Limited",
      period: "2022 - 2023",
      description: "Developed data preprocessing pipelines, improving model performance by 20%, and supported computer vision systems."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <Navigation />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate AI Researcher and Developer with expertise in explainable AI, computer vision, 
            and healthcare applications. I enjoy leveraging machine learning to solve real-world problems 
            and exploring game development for interactive experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg p-8 border border-border shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center text-foreground">
              <GraduationCap className="mr-3 text-primary" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.year}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-lg p-8 border border-border shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center text-foreground">
              <Award className="mr-3 text-primary" />
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-secondary pl-6">
                  <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-secondary-foreground font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card rounded-lg p-8 border border-border shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Core Competencies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-3 text-foreground">Artificial Intelligence</h3>
              <p className="text-muted-foreground">Explainable AI, Computer Vision, Deep Learning, Healthcare Diagnostics</p>
            </div>
            <div className="text-center">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-3 text-foreground">Game Development</h3>
              <p className="text-muted-foreground">Interactive Design, Game Mechanics, Unity, Mobile Games</p>
            </div>
            <div className="text-center">
              <Database className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-3 text-foreground">Data Processing</h3>
              <p className="text-muted-foreground">Data Preprocessing, Feature Engineering, Cloud ML, Automation</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About;