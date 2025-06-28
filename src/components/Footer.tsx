import { Github, Mail, Linkedin, Twitter} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ademola Akorede Adejare</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              AI Researcher and Developer passionate about explainable AI, computer vision, 
              and healthcare innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Home</a></li>
              <li><a href="/projects" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Projects</a></li>
              <li><a href="/publications" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Publications</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/akobabs" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="mailto:akorede.ademola@yahoo.com" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://linkedin.com/in/akorede-adejare-ademola-082105273/" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="https://x.com/AkobabsAa" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Made with ❤️ by Ademola Akorede Adejare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;