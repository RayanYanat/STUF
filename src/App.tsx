import { useState, useEffect, useRef, useCallback } from 'react';

const CountUpAnimation = ({ end, duration = 2000, suffix = '', isVisible }: { end: number; duration?: number; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, end, duration]);

  return <>{count}{suffix}</>;
};

function App() {
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 640px) {
          body {
            font-size: 16px;
          }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(238, 189, 194, 0.5), 0 0 80px rgba(238, 189, 194, 0.3); }
          50% { box-shadow: 0 0 60px rgba(238, 189, 194, 0.7), 0 0 120px rgba(238, 189, 194, 0.4); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(238, 189, 194, 0.6)); }
          50% { filter: drop-shadow(0 0 40px rgba(238, 189, 194, 0.9)); }
        }

        .animate-fade-in-up { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in-right { animation: fadeInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-in { animation: slideInFromLeft 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scale-in { animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-glow { animation: glow 3s ease-in-out infinite; }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(80px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .magnetic-hover {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .magnetic-hover:hover {
          transform: scale(1.05) translateY(-5px);
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .shine-effect:hover::before {
          left: 100%;
        }

        .gradient-text {
          background: linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 25%, #FFE5E9 50%, #F5D4D8 75%, #EEBDC2 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s ease-in-out infinite;
          font-weight: 700;
          position: relative;
        }

        .luxury-border {
          position: relative;
        }

        .luxury-border::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #EEBDC2, #F5D4D8, #EEBDC2);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .luxury-border:hover::after {
          opacity: 1;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .glow-effect {
          box-shadow: 0 4px 24px rgba(238, 189, 194, 0.35), 0 12px 48px rgba(238, 189, 194, 0.15);
        }

        .premium-shadow {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .premium-hover {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) {
          .premium-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 32px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12);
          }
        }

        @media (max-width: 640px) {
          .premium-hover:active {
            transform: translateY(-4px);
          }
        }

        .animated-bg {
          background: linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 25%, #FFEEF2 50%, #F5D4D8 75%, #EEBDC2 100%);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        .text-balance {
          text-wrap: balance;
        }

        .counter-glow {
          text-shadow: 0 0 30px rgba(238, 189, 194, 0.3);
        }
      `}</style>

      <header className="bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-50 transition-all duration-500 shadow-lg shadow-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-6 sm:py-7">
            <div className="flex items-center gap-3 animate-slide-in">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="Set Them Up Foundation"
                className="h-11 sm:h-13 md:h-16 transition-all duration-500 hover:scale-110 filter drop-shadow-md"
              />
            </div>
            <div className="hidden lg:flex gap-12 xl:gap-14 items-center">
              <a href="#who-we-help" className="text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-all duration-300 relative group">
                Who We Help
                <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="#programs" className="text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-all duration-300 relative group">
                Programs
                <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="#workshop-locations" className="text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-all duration-300 relative group">
                Workshops
                <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="#team" className="text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-all duration-300 relative group">
                Team
                <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="#roadmap" className="text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-all duration-300 relative group">
                Roadmap
                <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="#donate" className="text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-all duration-300 relative group">
                Donate
                <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></span>
              </a>
            </div>
            <a href="mailto:hello@stuf.org.uk" className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 hover:scale-105 active:scale-95 relative overflow-hidden group shine-effect" style={{ backgroundColor: '#EEBDC2', color: '#161616' }}>
              <span className="relative z-10">Contact Us</span>
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-pink-50/30">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#EEBDC2' }}></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl animate-float" style={{ backgroundColor: '#F5D4D8', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-float" style={{ backgroundColor: '#FFE5E9', animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-32">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide shadow-lg border border-pink-100" style={{ color: '#161616' }}>
                <span className="text-lg animate-glow">🎓</span>
                <span>Empowering Youth Since 2022</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] text-gray-900">
                We've got the <span className="gradient-text block sm:inline">money stuf</span> covered
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-10 leading-relaxed text-gray-600 font-light">
                Making money stuf simple for young people. We help students get a handle on the fundamentals of finance through partnerships with educational and financial institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="#partner" className="group px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 magnetic-hover inline-block text-center shine-effect relative overflow-hidden" style={{ backgroundColor: '#EEBDC2', color: '#161616' }}>
                  <span className="relative z-10">Partner with Us</span>
                </a>
                <a href="#schools" className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-gray-900 magnetic-hover inline-block text-center border-2 border-gray-900 text-gray-900 hover:text-white">
                  Bring STUF to Your School
                </a>
              </div>
            </div>
            <div className="animate-fade-in-right hidden md:block">
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-r from-pink-200/50 via-pink-300/50 to-pink-200/50 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-pulse-glow"></div>
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-gray-900/5 transform transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                  <img
                    src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Image_Images_Website.png/:/cr=t:1.33%25,l:0%25,w:100%25,h:97.34%25/rs=w:1240,h:620,cg:true"
                    alt="Making money stuf simple for young people"
                    className="relative transition-all duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-gray-400/40 flex items-start justify-center p-2 backdrop-blur-sm bg-white/30">
            <div className="w-2 h-3 bg-gray-400/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-gradient-to-b from-white via-pink-50/20 to-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
            <div className="group cursor-default scroll-reveal">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 magnetic-hover border border-gray-100">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold block mb-5 gradient-text">
                  <CountUpAnimation end={11} suffix=".5M" isVisible={countersVisible} />
                </span>
                <span className="text-sm lg:text-base text-gray-700 font-medium leading-relaxed block">UK residents with under £100 in savings</span>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 magnetic-hover border border-gray-100">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold block mb-5 gradient-text">
                  <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
                </span>
                <span className="text-sm lg:text-base text-gray-700 font-medium leading-relaxed block">Live below minimum decent living standards</span>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 magnetic-hover border border-gray-100">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold block mb-5 gradient-text">6 in 10</span>
                <span className="text-sm lg:text-base text-gray-700 font-medium leading-relaxed block">Feel lacking money management skills</span>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 magnetic-hover border border-gray-100">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold block mb-5 gradient-text">
                  <CountUpAnimation end={8} suffix="M" isVisible={countersVisible} />
                </span>
                <span className="text-sm lg:text-base text-gray-700 font-medium leading-relaxed block">In serious UK debt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="bg-white py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-50/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-50/60 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28 scroll-reveal">
            <span className="inline-block px-6 py-2.5 bg-pink-50 rounded-full text-xs font-semibold tracking-wider mb-8 shadow-sm" style={{ color: '#EEBDC2' }}>Who We Help</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-[1.15]">
              Breaking the cycle of poverty through <span className="gradient-text">financial education</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
              Providing lifelong skills, understanding and access to previously closed off worlds of money for disadvantaged youth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="group bg-white p-10 lg:p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 magnetic-hover scroll-reveal border border-gray-100">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center text-4xl lg:text-5xl mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md" style={{ background: 'linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 100%)' }}>🏫</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Schools & Colleges</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg font-light">
                Bring engaging, curriculum-aligned financial literacy workshops to your students. Our expert-led sessions fit seamlessly into your timetable.
              </p>
              <a href="#schools" className="font-semibold text-sm tracking-wide inline-flex items-center gap-3 transition-all duration-500 group-hover:gap-5" style={{ color: '#EEBDC2' }}>
                Learn more
                <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="group bg-white p-10 lg:p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 magnetic-hover scroll-reveal border border-gray-100" style={{ transitionDelay: '0.1s' }}>
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center text-4xl lg:text-5xl mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md" style={{ background: 'linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 100%)' }}>🤝</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Youth Organizations</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg font-light">
                Partner with us to offer financial education programs that complement your existing youth development initiatives.
              </p>
              <a href="#youth" className="font-semibold text-sm tracking-wide inline-flex items-center gap-3 transition-all duration-500 group-hover:gap-5" style={{ color: '#EEBDC2' }}>
                Partner with us
                <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="group bg-white p-10 lg:p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 magnetic-hover scroll-reveal sm:col-span-2 lg:col-span-1 border border-gray-100" style={{ transitionDelay: '0.2s' }}>
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center text-4xl lg:text-5xl mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md" style={{ background: 'linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 100%)' }}>👥</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Young People</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg font-light">
                Access free workshops, mentorship programs, and resources to build your financial confidence and independence.
              </p>
              <a href="#youth-programs" className="font-semibold text-sm tracking-wide inline-flex items-center gap-3 transition-all duration-500 group-hover:gap-5" style={{ color: '#EEBDC2' }}>
                Get involved
                <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28 scroll-reveal">
            <span className="inline-block px-6 py-2.5 bg-pink-50 rounded-full text-xs font-semibold tracking-wider mb-8 shadow-sm" style={{ color: '#EEBDC2' }}>Our Programs</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.15]">
              What <span className="gradient-text">We Offer</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="group scroll-reveal">
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 magnetic-hover">
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <img
                  src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Financial Literacy Workshops"
                  className="w-full h-[450px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-12 z-20">
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">Financial Literacy Workshops</h3>
                  <p className="text-white/95 text-base lg:text-lg mb-6 leading-relaxed font-light">
                    Interactive sessions covering budgeting, saving, investing, and real-world financial decision-making.
                  </p>
                  <div className="inline-flex items-center gap-3 text-white font-semibold text-sm tracking-wide group-hover:gap-5 transition-all duration-500">
                    Learn more
                    <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 magnetic-hover">
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Mentorship Programs"
                  className="w-full h-[450px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-12 z-20">
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">Mentorship Programs</h3>
                  <p className="text-white/95 text-base lg:text-lg mb-6 leading-relaxed font-light">
                    One-on-one guidance from finance professionals helping young people navigate their financial journey.
                  </p>
                  <div className="inline-flex items-center gap-3 text-white font-semibold text-sm tracking-wide group-hover:gap-5 transition-all duration-500">
                    Get a mentor
                    <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-gradient-to-br from-gray-50 to-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iYmxhY2siLz48L3N2Zz4=')] bg-repeat"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2.5 bg-pink-50 rounded-full text-xs font-semibold tracking-wider mb-8 shadow-sm" style={{ color: '#EEBDC2' }}>Our Team</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.15]">
              Meet the People Behind <span className="gradient-text">STUF</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              A dedicated team of financial experts, educators, and change-makers committed to transforming financial education.
            </p>
          </div>

          <div className="mb-24">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center scroll-reveal">Founders</h3>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="group scroll-reveal">
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_James.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                    alt="James Jordan"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <h4 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">James Jordan</h4>
                    <p className="text-xl font-semibold mb-4 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4" style={{ color: '#EEBDC2' }}>Development Director</p>
                    <p className="text-white/90 mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      Ambitious entrepreneur with expertise in Sales and Marketing. Founded STUF to provide financial education to underprivileged children.
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <p className="text-white/95 italic text-sm leading-relaxed">
                        "When I left school at 16, I had no grasp of finance basics...I started STUF because I want to make sure other young people avoid the mistakes I did"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Jermaine.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                    alt="Jermaine Bishop"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <h4 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">Jermaine Bishop</h4>
                    <p className="text-xl font-semibold mb-4 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4" style={{ color: '#EEBDC2' }}>Operations Director</p>
                    <p className="text-white/90 mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      15+ years of experience in Tech and Communications sectors. Co-founder focused on providing free financial education to lower-income children.
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <p className="text-white/95 italic text-sm leading-relaxed">
                        "I want to teach children how to manage, save and invest money to open up more opportunities"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center scroll-reveal">Board Members</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { name: 'Thomas Hamer', role: 'Co-Chair (Research)', desc: '9+ years in financial services across Venture/PE, Corporate Banking, and Wealth Management', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Thomas.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Matthew Smith', role: 'Co-Chair (Business Dev)', desc: 'Sports and Business Development expertise with major European tax refund company', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Matthew.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Zofia Barnes', role: 'Policy', desc: '11+ years in Banking and Finance. LSE Masters in Gender Studies, Policy & Inequalities', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Zofia.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Paul Mokuolu', role: 'Partnerships', desc: 'Decade in financial sector. Technical Specialist at Bank of England', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-c729d57.png/:/cr=t:16.75%25,l:0%25,w:100%25,h:66.5%25/rs=w:365,h:365,cg:true/qt=q:93' },
                { name: 'Jalpa Lai', role: 'Mentorship', desc: '6+ years mentoring diverse youth, specializing in financial coaching', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-875f474.png/:/cr=t:0%25,l:4.38%25,w:91.25%25,h:100%25/rs=w:365,h:365,cg:true/qt=q:93' },
                { name: 'Truman Alberto Sullivan', role: 'Advisory', desc: 'Head of Rugby at Skinners School, Kent. Decade in education sector', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Truman.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Tina Creed', role: 'Advisory', desc: '25 years in childcare/education. Former Ark Elvin Academy Governor', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Tina.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' }
              ].map((member, idx) => (
                <div key={member.name} className="group scroll-reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                    <div className="relative h-64 overflow-hidden">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #EEBDC2 0%, #D4A5AB 100%)' }}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-sm font-semibold mb-3" style={{ color: '#EEBDC2' }}>{member.role}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{member.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Testimonials</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              What People <span className="gradient-text">Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-reveal">
              <img
                src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Workshop session"
                className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
              />
            </div>
            <div className="scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-card p-10 rounded-2xl border-l-8 mb-10 hover:shadow-2xl transition-all duration-500 hover:-translate-x-2" style={{ borderColor: '#EEBDC2' }}>
                <p className="text-2xl text-gray-900 mb-6 leading-relaxed italic font-medium">
                  "One of the best workshops we've ever had"
                </p>
                <p className="text-lg text-gray-700 font-bold">
                  Troy, Head of Youth Services at QCCA
                </p>
              </div>
              <div className="space-y-6">
                {[
                  'Youth excitement and practical application through penny challenges and ISA research',
                  'Behavioral shift toward sensible financial discussions',
                  'Engaging facilitators who make complex topics accessible'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group cursor-default">
                    <div className="w-3 h-3 rounded-full mt-2 transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: '#EEBDC2' }}></div>
                    <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="bg-gradient-to-br from-gray-50 to-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iYmxhY2siLz48L3N2Zz4=')] bg-repeat"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Our Roadmap</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              Building the <span className="gradient-text">Future</span> of Financial Education
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              From foundation to nationwide impact, here's our journey and vision for the future.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block" style={{ background: 'linear-gradient(180deg, #EEBDC2 0%, #D4A5AB 50%, #EEBDC2 100%)' }}></div>
            <div className="space-y-16">
              {[
                { year: '2022', title: 'Foundation Setup', desc: 'Established STUF and developed comprehensive syllabus for financial education', past: true },
                { year: '2023', title: 'Workshop Pilots', desc: 'Successfully launched pilot workshops across London, Bristol, and Kent', past: true },
                { year: '2024', title: 'South England Expansion', desc: 'Expanded workshops, launched mentorship program, and partnered with universities for research', past: true },
                { year: '2025', title: 'Curriculum Integration & Accreditation', desc: 'Integrating into school curricula, launching e-learning platform, and expanding UK-wide with international reach', past: false }
              ].map((milestone, idx) => (
                <div key={milestone.year} className={`grid md:grid-cols-2 gap-8 items-center scroll-reveal ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`} style={{ transitionDelay: `${idx * 0.1}s` }}>
                  {idx % 2 === 0 ? (
                    <>
                      <div className="md:text-right">
                        <div className={`inline-block px-8 py-4 rounded-2xl border-4 font-bold text-3xl mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 ${milestone.past ? 'bg-white' : 'text-white'}`} style={{ borderColor: '#EEBDC2', backgroundColor: milestone.past ? 'white' : '#EEBDC2', color: milestone.past ? '#161616' : 'white' }}>
                          {milestone.year}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{milestone.desc}</p>
                      </div>
                      <div className="hidden md:block"></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block"></div>
                      <div>
                        <div className={`inline-block px-8 py-4 rounded-2xl border-4 font-bold text-3xl mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 ${milestone.past ? 'bg-white' : 'text-white'}`} style={{ borderColor: '#EEBDC2', backgroundColor: milestone.past ? 'white' : '#EEBDC2', color: milestone.past ? '#161616' : 'white' }}>
                          {milestone.year}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{milestone.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="workshop-locations" className="bg-gradient-to-b from-white via-pink-50/20 to-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28 scroll-reveal">
            <span className="inline-block px-6 py-2.5 bg-pink-50 rounded-full text-xs font-semibold tracking-wider mb-8 shadow-sm" style={{ color: '#EEBDC2' }}>Our Workshops</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.15]">
              Workshops in <span className="gradient-text">Action</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              From London to Uganda, we're empowering young people with essential financial knowledge through engaging, hands-on workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                location: 'Bristol STUF',
                image: 'https://images.pexels.com/photos/8500398/pexels-photo-8500398.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '45+',
                sessions: '12'
              },
              {
                location: 'Brent STUF',
                image: 'https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '60+',
                sessions: '15'
              },
              {
                location: 'Barnet STUF',
                image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '38+',
                sessions: '10'
              },
              {
                location: 'Bushey STUF',
                image: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '35+',
                sessions: '9'
              },
              {
                location: 'Camden STUF',
                image: 'https://images.pexels.com/photos/5212340/pexels-photo-5212340.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '52+',
                sessions: '14'
              },
              {
                location: 'Croydon STUF',
                image: 'https://images.pexels.com/photos/8500433/pexels-photo-8500433.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '70+',
                sessions: '18'
              },
              {
                location: 'Harrow STUF',
                image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '55+',
                sessions: '16'
              },
              {
                location: 'Kensington & Chelsea STUF',
                image: 'https://images.pexels.com/photos/8500427/pexels-photo-8500427.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '42+',
                sessions: '11'
              },
              {
                location: 'King College STUF',
                image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '48+',
                sessions: '13'
              },
              {
                location: 'Kent STUF',
                image: 'https://images.pexels.com/photos/8500452/pexels-photo-8500452.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '50+',
                sessions: '14'
              },
              {
                location: 'Southwark STUF',
                image: 'https://images.pexels.com/photos/5212662/pexels-photo-5212662.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '65+',
                sessions: '17'
              },
              {
                location: 'Uganda STUF',
                image: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1200',
                students: '80+',
                sessions: '20'
              }
            ].map((workshop, idx) => (
              <div key={workshop.location} className="group scroll-reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 magnetic-hover bg-white">
                  <div className="relative h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img
                      src={workshop.image}
                      alt={workshop.location}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-3">{workshop.location}</h3>
                      <div className="flex gap-4">
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                          <p className="text-white text-sm font-semibold">{workshop.students} Students</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                          <p className="text-white text-sm font-semibold">{workshop.sessions} Sessions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-pink-50/50 to-white">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Financial Literacy Workshop</span>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: '#EEBDC2' }}>
                        <span className="text-white text-lg">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center scroll-reveal">
            <div className="inline-flex flex-col sm:flex-row gap-5">
              <a href="#donate" className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 magnetic-hover" style={{ backgroundColor: '#EEBDC2', color: '#161616' }}>
                Bring STUF to Your Area
              </a>
              <a href="#partners" className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-gray-900 hover:text-white border-2 border-gray-900 text-gray-900">
                View Our Partners
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Our Partners</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              Trusted by <span className="gradient-text">Leading Organizations</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We collaborate with educational institutions and financial organizations to deliver impactful financial literacy programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { icon: '🎓', title: "The Clothworkers' Foundation", desc: "Partner in The Clothworkers' Foundation's Economic Equity Proactive Grants Programme, supporting financial education initiatives for underserved communities." },
              { icon: '🏛️', title: 'University of West London', desc: 'Research partnership established in 2024, fully funding a Ph.D. student to evaluate the effectiveness of financial literacy workshops.' },
              { icon: '🏦', title: 'Educational Institutions', desc: 'Partnering with schools and colleges across Bristol, Brent, Barnet, Camden, Croydon, Harrow, Kensington & Chelsea, Kent, and Southwark.' },
              { icon: '🤝', title: 'Financial Sector Partners', desc: 'Collaborating with financial institutions to provide real-world insights and expertise to young people across the UK.' }
            ].map((partner, idx) => (
              <div key={partner.title} className="group glass-card p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)' }}>
                    {partner.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{partner.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{partner.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Support Our Mission</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
                Help Us <span className="gradient-text">Empower</span> the Next Generation
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Your donation directly funds workshops, mentorship programs, and educational resources for young people from underprivileged backgrounds.
              </p>
              <div className="space-y-8">
                <div className="glass-card p-8 rounded-2xl border-l-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-x-2" style={{ borderColor: '#EEBDC2' }}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank Transfer</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-4 border-b-2 border-gray-200">
                      <span className="font-bold text-gray-700 text-lg">Account Number:</span>
                      <span className="font-mono text-2xl font-bold" style={{ color: '#EEBDC2' }}>21432168</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="font-bold text-gray-700 text-lg">Sort Code:</span>
                      <span className="font-mono text-2xl font-bold" style={{ color: '#EEBDC2' }}>30-99-50</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">PayPal Donation</h3>
                  <p className="text-gray-600 mb-6 text-lg">Support us securely through PayPal</p>
                  <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
                    <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="w-8 h-8" />
                    Donate via PayPal
                  </a>
                </div>
              </div>
            </div>
            <div className="group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <img
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning financial education"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 lg:py-40 text-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#EEBDC2' }}></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#F5D4D8', animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.15] text-gray-900">
            Ready to Transform <span className="gradient-text">Financial Education?</span>
          </h2>
          <p className="text-xl lg:text-2xl mb-14 leading-relaxed text-gray-600 font-light max-w-3xl mx-auto">
            Join schools and partners across the UK empowering students with essential money skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:hello@stuf.org.uk" className="group px-12 py-6 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 magnetic-hover inline-block shine-effect" style={{ backgroundColor: '#EEBDC2', color: '#161616' }}>
              <span className="relative z-10">✉️ Email: hello@stuf.org.uk</span>
            </a>
            <a href="mailto:info@ug-stuf.com" className="px-12 py-6 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-gray-900 hover:text-white magnetic-hover inline-block border-2 border-gray-900 text-gray-900">
              🌍 Uganda: info@ug-stuf.com
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6">Set Them Up Foundation</h3>
              <p className="text-white/70 leading-relaxed text-base mb-8 font-light">
                A UK-based charity dedicated to empowering young people with the financial skills they need to thrive in the modern world.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ backgroundColor: '#EEBDC2' }}>📘</a>
                <a href="#" className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ backgroundColor: '#EEBDC2' }}>🐦</a>
                <a href="#" className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ backgroundColor: '#EEBDC2' }}>💼</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#who-we-help" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Who We Help</a></li>
                <li><a href="#programs" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Programs</a></li>
                <li><a href="#workshop-locations" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Workshops</a></li>
                <li><a href="#team" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Team</a></li>
                <li><a href="#donate" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Donate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-white/60 hover:text-white transition-colors duration-300">hello@stuf.org.uk</li>
                <li className="text-white/60 hover:text-white transition-colors duration-300">info@ug-stuf.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-10 text-center">
            <p className="text-white/50 text-sm font-light">© 2025 Set Them Up Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
