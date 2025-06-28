
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Machine Learning in Game Development: Creating Intelligent NPCs",
      excerpt: "Exploring how machine learning algorithms can be used to create more realistic and engaging non-player characters in video games.",
      date: "2024-01-15",
      readTime: "8 min read",
      author: "Akorede Ademola",
      category: "Game Development",
      tags: ["Machine Learning", "Unity", "AI", "NPCs"]
    },
    {
      id: 2,
      title: "Data-Driven Decision Making: A Comprehensive Guide",
      excerpt: "Learn how to leverage data analytics to make informed business decisions and drive organizational growth.",
      date: "2024-01-10",
      readTime: "12 min read", 
      author: "Akorede Ademola",
      category: "Data Science",
      tags: ["Analytics", "Business Intelligence", "Data Visualization"]
    },
    {
      id: 3,
      title: "Building Scalable Data Pipelines with Python",
      excerpt: "A deep dive into creating robust and scalable data processing pipelines using Python and modern data engineering tools.",
      date: "2024-01-05",
      readTime: "15 min read",
      author: "Akorede Ademola", 
      category: "Data Engineering",
      tags: ["Python", "ETL", "Data Pipelines", "Apache Airflow"]
    },
    {
      id: 4,
      title: "The Future of Mobile Gaming: Trends and Predictions",
      excerpt: "Analyzing current trends in mobile gaming and predicting future developments in the industry.",
      date: "2023-12-28",
      readTime: "6 min read",
      author: "Akorede Ademola",
      category: "Game Development", 
      tags: ["Mobile Gaming", "Industry Trends", "Future Tech"]
    }
  ];

  const categories = ["All", "Data Science", "Game Development", "Data Engineering"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <Navigation />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on data science, game development, and technology.
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
              className="px-6 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">{post.category}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-foreground hover:text-primary transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Load More Posts
          </button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
