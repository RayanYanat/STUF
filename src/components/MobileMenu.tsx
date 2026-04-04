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
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 lg:hidden"
        style={{ backgroundColor: '#EEBDC2' }}
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-24 right-6 z-40 bg-white rounded-3xl shadow-2xl overflow-hidden lg:hidden max-h-[70vh] overflow-y-auto">
            <div className="p-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left px-6 py-4 text-sm font-medium text-gray-700 hover:bg-pink-50 rounded-2xl transition-all duration-200"
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
    </>
  );
}
