import { motion, useAnimation } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Gamepad2, Brain, Network, Globe, Cpu, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "EchoCardiacXAI",
      description: "A computer vision system for detecting abnormal cardiac motion in echocardiogram videos using optical flow, CNNs, and explainable AI (Grad-CAM). Developed for CSE 6367, University of Texas, Arlington.",
      image: "/placeholder.svg",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Grad-CAM"],
      categories: ["Computer Vision", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/EchoCardiacXAI",
      liveUrl: null,
      featured: false
    },
    {
      id: 2,
      title: "Computer-Aided Vision for Plant Disease Detection",
      description: "A system for detecting and classifying plant diseases using ResNet-based CNNs and explainable AI for transparent agricultural diagnostics.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "TensorFlow", "Keras", "ResNet", "Matplotlib"],
      categories: ["Computer Vision", "Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/COMPUTER-AIDED-VISION-FOR-PLANT-DISEASE-DETECTION",
      liveUrl: null,
      featured: true
    },
    {
      id: 3,
      title: "Lung Cancer Detection with Computer-Aided Vision",
      description: "A lung cancer detection model using MRI scan images, leveraging CNNs and the Coati Optimizer for enhanced diagnostic accuracy.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "TensorFlow", "Keras", "OpenCV", "Coati Optimizer"],
      categories: ["Computer Vision", "Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/Lung-Cancer-Detection-with-Computer-Aided-Vision",
      liveUrl: null,
      featured: true
    },
    {
      id: 4,
      title: "Phishing Detection Project",
      description: "A lightweight phishing detection tool with a basic awareness program, designed to run locally using machine learning techniques.",
      image: "/placeholder.svg",
      technologies: ["Python", "scikit-learn", "Pandas"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/phishing-detection-project",
      liveUrl: null,
      featured: false
    },
    {
      id: 5,
      title: "Supply Chain XAI",
      description: "An explainable AI application for optimizing supply chain management and logistics, featuring a frontend interface for transparency.",
      image: "/placeholder.svg",
      technologies: ["Python", "TensorFlow", "SHAP", "Flask"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/supply-chain-xai",
      liveUrl: null,
      featured: true
    },
    {
      id: 6,
      title: "Malicious Domain Name Prediction System",
      description: "A machine learning-based system to identify malicious domain names and mitigate cyber risks.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "scikit-learn", "Pandas", "NumPy"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/MALICIOUS-DOMAIN-NAME-PREDICTION-SYSTEM-USING-MACHINE-LEARNING",
      liveUrl: null,
      featured: false
    },
    {
      id: 7,
      title: "Offline E-Naira",
      description: "An offline payment solution for eNaira transactions, enabling secure digital currency usage.",
      image: "/placeholder.svg",
      technologies: ["Python", "Flask", "SQLite"],
      categories: ["Blockchain", "Data Engineering"],
      githubUrl: "https://github.com/akobabs/Offline-E-Naira",
      liveUrl: null,
      featured: false
    },
    {
      id: 8,
      title: "Text-Based Sentiment Analysis",
      description: "An enhanced sentiment analysis model using advanced NLP techniques for classifying sentiments in textual data.",
      image: "/placeholder.svg",
      technologies: ["Python", "NLTK", "TensorFlow", "Pandas"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/Text-Based-Sentiment-Analysis",
      liveUrl: null,
      featured: true
    },
    {
      id: 9,
      title: "Main Multiscale Spam Detection",
      description: "A machine learning model for detecting spam across multiple scales using advanced feature engineering.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "scikit-learn", "Pandas"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/main_multiscale_spam_detection",
      liveUrl: null,
      featured: false
    },
    {
      id: 10,
      title: "Multiscale Spam Detection",
      description: "A complementary model for spam detection with a focus on scalability and robustness.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "scikit-learn", "Pandas"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/multiscale_spam_detection",
      liveUrl: null,
      featured: false
    },
    {
      id: 11,
      title: "Personal Portfolio (adejareakoredeademola.github.io)",
      description: "A personal portfolio showcasing my projects and research in AI and computer vision.",
      image: "/placeholder.svg",
      technologies: ["HTML", "CSS"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/adejareakoredeademola.github.io",
      liveUrl: "https://adejareakoredeademola.github.io",
      featured: false
    },
    {
      id: 12,
      title: "ML Project: E-commerce Fraud Detection",
      description: "A forked repository for e-commerce fraud detection using machine learning with explainable AI (XAI). [Forked from Md-Emon-Hasan].",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "scikit-learn", "SHAP"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/ML-Project-E-commerce-Fraud-Detection",
      liveUrl: null,
      featured: false
    },
    {
      id: 13,
      title: "README",
      description: "A repository containing configuration and documentation files for my GitHub profile.",
      image: "/placeholder.svg",
      technologies: ["Markdown"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/README",
      liveUrl: null,
      featured: false
    },
    {
      id: 14,
      title: "Data Engineering Zoomcamp",
      description: "A forked free course on data engineering covering pipelines and tools. [Forked from DataTalksClub].",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python", "Docker"],
      categories: ["Data Engineering"],
      githubUrl: "https://github.com/akobabs/data-engineering-zoomcamp",
      liveUrl: null,
      featured: false
    },
    {
      id: 15,
      title: "Generative AI for Beginners",
      description: "A forked course on building with generative AI, featuring 12 lessons. [Forked from Microsoft].",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Generative AI"],
      githubUrl: "https://github.com/akobabs/generative-ai-for-beginners",
      liveUrl: "https://microsoft.github.io/generative-ai-for-beginners/",
      featured: false
    },
    {
      id: 16,
      title: "GlySim",
      description: "A forked project exploring optimization enhancements for a simulation tool. [Forked from Arefeen06088].",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Data Science"],
      githubUrl: "https://github.com/akobabs/GlySim",
      liveUrl: null,
      featured: false
    },
    {
      id: 17,
      title: "Fuxi",
      description: "A forked penetration testing platform for cybersecurity analysis. [Forked from jeffzh3ng].",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Cybersecurity"],
      githubUrl: "https://github.com/akobabs/fuxi",
      liveUrl: null,
      featured: false
    },
    {
      id: 18,
      title: "Fraud-fraud",
      description: "A machine learning project focused on fraud detection techniques.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/Fraud-fraud",
      liveUrl: null,
      featured: false
    },
    {
      id: 19,
      title: "Neuromorphic Vision",
      description: "A project exploring neuromorphic vision systems for advanced computer vision applications.",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Computer Vision"],
      githubUrl: "https://github.com/akobabs/Neuromorphic-Vision",
      liveUrl: null,
      featured: false
    },
    {
      id: 20,
      title: "Quantum Learn Explore Tool",
      description: "A TypeScript-based tool for exploring quantum computing concepts.",
      image: "/placeholder.svg",
      technologies: ["TypeScript"],
      categories: ["Quantum Computing"],
      githubUrl: "https://github.com/akobabs/quantum-learn-explore-tool",
      liveUrl: null,
      featured: false
    },
    {
      id: 21,
      title: "Quantum",
      description: "A repository for quantum computing experiments and tools.",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Quantum Computing"],
      githubUrl: "https://github.com/akobabs/quantum",
      liveUrl: null,
      featured: false
    },
    {
      id: 22,
      title: "Quantum Edu Tool",
      description: "An educational tool for learning quantum computing principles, built with TypeScript.",
      image: "/placeholder.svg",
      technologies: ["TypeScript"],
      categories: ["Quantum Computing"],
      githubUrl: "https://github.com/akobabs/Quantum-edu-tool",
      liveUrl: null,
      featured: false
    },
    {
      id: 23,
      title: "Digital Wallet POC",
      description: "A proof-of-concept digital wallet with UI, mock payment processing, and QR code generation.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python", "Flask", "QRCode"],
      categories: ["Blockchain", "Data Engineering"],
      githubUrl: "https://github.com/akobabs/digital-wallet-POC",
      liveUrl: null,
      featured: false
    },
    {
      id: 24,
      title: "Green Data Center",
      description: "A system for managing electricity consumption in green data centers using machine learning.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Data Science", "Data Engineering"],
      githubUrl: "https://github.com/akobabs/green-data-center",
      liveUrl: null,
      featured: false
    },
    {
      id: 25,
      title: "AutoFormAI",
      description: "An AI-driven tool for automating form processing and data extraction.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/AutoFormAI",
      liveUrl: null,
      featured: false
    },
    {
      id: 26,
      title: "Reputation and Trust Management System",
      description: "A Flask-based RTMS using the Fiverr dataset with bias detection, XAI, and a blockchain-inspired ledger.",
      image: "/placeholder.svg",
      technologies: ["Python", "Flask", "SHAP"],
      categories: ["Blockchain", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/Reputation-and-Trust-Management-System",
      liveUrl: null,
      featured: false
    },
    {
      id: 27,
      title: "Behavioral Fraud Detector",
      description: "A system for detecting fraudulent behavior using machine learning techniques.",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/BehavioralFraudDetector",
      liveUrl: null,
      featured: false
    },
    {
      id: 28,
      title: "Phishing Using NLP",
      description: "A phishing detection system leveraging NLP techniques for improved accuracy.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python", "NLTK"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/Phishing-Using-NLP",
      liveUrl: null,
      featured: true
    },
    {
      id: 29,
      title: "Artificial Immune System (AIS) Based Cyber Threat Detection",
      description: "An AIS-based model for detecting cyber threats with local deployment scalability.",
      image: "/placeholder.svg",
      technologies: ["Python", "scikit-learn"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/Artificial-Immune-System--AIS--based-cyber-threat-detection",
      liveUrl: null,
      featured: false
    },
    {
      id: 30,
      title: "IoT Energy Predictor",
      description: "A machine learning model for predicting energy consumption in IoT devices.",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Machine Learning", "Data Engineering"],
      githubUrl: "https://github.com/akobabs/IoT-EnergyPredictor",
      liveUrl: null,
      featured: false
    },
    {
      id: 31,
      title: "Gen-AI for Password Cracking Detection",
      description: "A generative AI framework for detecting and preventing password cracking attempts.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Generative AI", "Cybersecurity"],
      githubUrl: "https://github.com/akobabs/Gen-AI-for-password-cracking-detection",
      liveUrl: null,
      featured: false
    },
    {
      id: 32,
      title: "Cancer Detection Nanoparticles",
      description: "A machine learning model for cancer detection using nanoparticle data.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/cancer-detection-nanoparticles",
      liveUrl: null,
      featured: false
    },
    {
      id: 33,
      title: "Graph Neural Network (GNN) Based News Recommendation System",
      description: "A GNN-based news recommendation system with EDA, preprocessing, and frontend implementation.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python", "PyTorch"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/Graph-Neural-Network--GNN--based-news-recommendation-system",
      liveUrl: null,
      featured: false
    },
    {
      id: 34,
      title: "EduTools",
      description: "A web-based educational toolset for enhancing learning experiences.",
      image: "/placeholder.svg",
      technologies: ["HTML", "JavaScript"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/EduTools",
      liveUrl: null,
      featured: false
    },
    {
      id: 35,
      title: "EI Assessment Tool",
      description: "A web-based tool for emotional intelligence assessment.",
      image: "/placeholder.svg",
      technologies: ["HTML", "JavaScript"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/ei-assessment-tool",
      liveUrl: null,
      featured: false
    },
    {
      id: 36,
      title: "Personal Portfolio (akobabs.github.io)",
      description: "My portfolio website showcasing projects and research.",
      image: "/placeholder.svg",
      technologies: ["JavaScript", "HTML", "CSS"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/akobabs.github.io",
      liveUrl: "https://akobabs.github.io",
      featured: true
    },
    {
      id: 37,
      title: "Akorede Ademola Portfolio",
      description: "A newly deployed portfolio webpage highlighting my work.",
      image: "/placeholder.svg",
      technologies: ["HTML", "JavaScript"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/akoredeademola-portfolio",
      liveUrl: null,
      featured: false
    },
    {
      id: 38,
      title: "Insider Threat Detection",
      description: "A machine learning model for detecting insider threats in organizational systems.",
      image: "/placeholder.svg",
      technologies: ["Python", "scikit-learn"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/InsiderThreatDetection",
      liveUrl: null,
      featured: false
    },
    {
      id: 39,
      title: "Fraud Detection Project",
      description: "An e-commerce fraud detection system using the IEEE-CIS dataset with XAI and a frontend interface.",
      image: "/placeholder.svg",
      technologies: ["JavaScript", "Python", "SHAP"],
      categories: ["Cybersecurity", "Machine Learning", "Web Development"],
      githubUrl: "https://github.com/akobabs/fraud-detection-project",
      liveUrl: null,
      featured: false
    },
    {
      id: 40,
      title: "Artificial Immune System for Cyber Threat",
      description: "An AIS-based model for detecting and mitigating cyber threats in networks.",
      image: "/placeholder.svg",
      technologies: ["Python", "scikit-learn"],
      categories: ["Cybersecurity", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/Artificial-Immune-System-for-Cyber-Threat-",
      liveUrl: null,
      featured: false
    },
    {
      id: 41,
      title: "Customer Churn Prediction",
      description: "An ensemble-based ML model for predicting customer churn using IoB data.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "scikit-learn", "Pandas"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/Customer-Churn-Prediction-",
      liveUrl: null,
      featured: false
    },
    {
      id: 42,
      title: "Supply Chain Attack Detection",
      description: "A machine learning model for detecting supply chain attacks with XAI.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "TensorFlow", "SHAP"],
      categories: ["Machine Learning", "Data Science"],
      githubUrl: "https://github.com/akobabs/supply-chain-attack-detection",
      liveUrl: null,
      featured: false
    },
    {
      id: 43,
      title: "Airline Ticket Management GenAI",
      description: "A generative AI system for airline ticket management with fraud detection and personalization.",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Generative AI", "Data Science"],
      githubUrl: "https://github.com/akobabs/airline-ticket-management-GenAi",
      liveUrl: null,
      featured: false
    },
    {
      id: 44,
      title: "Akobabs Profile Config",
      description: "Configuration files for my GitHub profile.",
      image: "/placeholder.svg",
      technologies: ["Markdown"],
      categories: ["Web Development"],
      githubUrl: "https://github.com/akobabs/Akobabs",
      liveUrl: null,
      featured: false
    },
    {
      id: 45,
      title: "Covid19 Research Project",
      description: "A COVID-19 detection project using X-Ray, sound, and temperature identifiers.",
      image: "/placeholder.svg",
      technologies: ["Jupyter Notebook", "Python"],
      categories: ["Data Science", "Machine Learning"],
      githubUrl: "https://github.com/akobabs/Covid19_research_project",
      liveUrl: null,
      featured: false
    },
    {
      id: 46,
      title: "TSP Routing Protocol",
      description: "An improved routing protocol for vehicle route optimization in the Traveling Salesman Problem.",
      image: "/placeholder.svg",
      technologies: ["Python"],
      categories: ["Data Science", "Data Engineering"],
      githubUrl: "https://github.com/akobabs/TSP-routing-protocol",
      liveUrl: null,
      featured: false
    },
    {
      id: 47,
      title: "Game Development Workshop",
      description: "A project from the SAILS Innovative Laboratory Cohort 3, focusing on interactive game development techniques.",
      image: "/placeholder.svg",
      technologies: ["Unity", "C#"],
      categories: ["Game Development"],
      githubUrl: null,
      liveUrl: null,
      featured: false
    }
  ];

  const categories = [
    "All",
    "Computer Vision",
    "Cybersecurity",
    "Machine Learning",
    "Data Science",
    "Data Engineering",
    "Blockchain",
    "Web Development",
    "Game Development",
    "Quantum Computing",
    "Generative AI"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [selectedCategory, controls]);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.categories.includes(selectedCategory));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Computer Vision":
        return Brain;
      case "Cybersecurity":
        return Network;
      case "Machine Learning":
        return Brain;
      case "Data Science":
        return Database;
      case "Data Engineering":
        return Code;
      case "Blockchain":
        return Database;
      case "Web Development":
        return Globe;
      case "Game Development":
        return Gamepad2;
      case "Quantum Computing":
        return Cpu;
      case "Generative AI":
        return Zap;
      default:
        return Code;
    }
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive showcase of my work in AI, computer vision, cybersecurity, blockchain, data engineering, data science, game development, quantum computing, and web development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border border-border ${selectedCategory === category ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'} transition-colors`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-foreground">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.filter(project => project.featured).map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.categories[0]); // Display icon for the first category
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-card rounded-lg border border-border shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <CategoryIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary font-medium">{project.categories.join(", ")}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-foreground">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.categories[0]); // Display icon for the first category
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-card rounded-lg border border-border shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <CategoryIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon className="h-3 w-3 text-primary" />
                      <span className="text-xs text-primary font-medium">{project.categories.join(", ")}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          <Github className="h-3 w-3" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;