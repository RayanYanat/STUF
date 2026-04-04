import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface MenuSection {
  id: string;
  label: string;
}

const sections: MenuSection[] = [
  { id: 'stats', label: 'Impact' },
  { id: 'what-we-do', label: 'What We Do' },
  { id: 'who-we-help', label: 'Who We Help' },
  { id: 'programs', label: 'Programs' },
  { id: 'team', label: 'Team' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'workshop-locations', label: 'Locations' },
  { id: 'partners', label: 'Partners' },
  { id: 'donate', label: 'Donate' },
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
    <div className="lg:hidden">
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 top-[73px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden w-56 border border-gray-100">
            <div className="py-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 transition-all duration-200"
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animation: 'fadeInUp 0.3s ease-out forwards'
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
