import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuSection {
  id: string;
  label: string;
  isLink?: boolean;
  isDonate?: boolean;
}

const sections: MenuSection[] = [
  { id: 'who-we-help', label: 'Who We Help' },
  { id: 'impact', label: 'Impact' },
  { id: 'programs', label: 'Programs' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'team', label: 'Team' },
  { id: '/impact-reports', label: 'Reports', isLink: true },
  { id: 'contact', label: 'Contact' },
  { id: 'donate', label: 'Support Our Mission', isDonate: true },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:bg-gray-100"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-900" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            style={{ top: '73px' }}
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden w-64 border border-gray-100">
            <div className="py-2">
              {sections.map((section, index) => {
                if (section.isDonate) {
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left px-5 py-3 text-sm font-bold bg-pink-accent text-black hover:bg-opacity-90 transition-all duration-200 flex items-center space-x-2 mx-3 rounded-lg mt-2"
                      style={{
                        animationDelay: `${index * 30}ms`,
                        animation: 'fadeInUp 0.3s ease-out forwards'
                      }}
                    >
                      <Heart className="w-4 h-4" />
                      <span>{section.label}</span>
                    </button>
                  );
                }

                return section.isLink ? (
                  <Link
                    key={section.id}
                    to={section.id}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: 'fadeInUp 0.3s ease-out forwards'
                    }}
                  >
                    {section.label}
                  </Link>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: 'fadeInUp 0.3s ease-out forwards'
                    }}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
