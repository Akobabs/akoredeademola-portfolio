
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const isMobile = useIsMobile();
  
  const titles = [
    'Data Scientist',
    'Game Developer',
    'MLOps Enthusiast',
    'Researcher'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-14 sm:pt-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image - Made bigger and more prominent */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div className="relative">
            <img 
              src="/123.png"
              alt="Akorede Adejare Ademola"
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full object-cover shadow-2xl border-8 border-white ring-4 ring-blue-200"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse"></div>
            {/* Professional badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Available for hire
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in leading-tight">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline">
            Akorede Adejare, ADEMOLA
          </span>
        </h1>

        {/* Rotating Titles */}
        <div className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-6 sm:mb-8 h-8 sm:h-10">
          <span className="transition-all duration-500 ease-in-out">
            {titles[currentTitle]}
          </span>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Passionate about transforming data into insights, crafting interactive experiences, 
          and exploring the cutting edge of machine learning operations. Welcome to my journey 
          through technology, research, and innovation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <a href="/Skills">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base">
              View My Skills
            </button>
          </a>
          <a href="/Ademola_Akorede_CV.pdf" target="_blank" rel="noopener noreferrer">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200 text-sm sm:text-base">
              View CV
            </button>
          </a>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        {!isMobile && (
          <div className="mt-12 sm:mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Scroll to explore</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
