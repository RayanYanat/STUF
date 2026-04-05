import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';

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
      { threshold: 0.1 }
    );
    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @import url('https://fonts.cdnfonts.com/css/veneer');

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Veneer', 'Impact', sans-serif;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-transform: uppercase;
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
          background: #F6C1CC;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          position: relative;
        }

        .pink-accent {
          color: #F6C1CC;
        }

        .bg-pink-accent {
          background-color: #F6C1CC;
        }

        .border-pink-accent {
          border-color: #F6C1CC;
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

      <header className="bg-white border-b border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-5">
            <div className="flex items-center gap-3">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-10 sm:h-12 md:h-14"
              />
            </div>
            <div className="hidden lg:flex gap-8 items-center">
              <a href="#who-we-help" className="text-black hover:text-pink-accent font-semibold text-sm tracking-wide transition-all duration-200 uppercase">
                Who We Help
              </a>
              <a href="#programs" className="text-black hover:text-pink-accent font-semibold text-sm tracking-wide transition-all duration-200 uppercase">
                Programs
              </a>
              <a href="#team" className="text-black hover:text-pink-accent font-semibold text-sm tracking-wide transition-all duration-200 uppercase">
                Team
              </a>
              <a href="#donate" className="bg-pink-accent text-black px-6 py-3 font-bold text-sm tracking-wide transition-all duration-200 hover:bg-black hover:text-white uppercase">
                Donate
              </a>
            </div>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center py-20 sm:py-24 lg:py-32">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-8 px-5 py-2 bg-black text-white text-xs font-semibold tracking-widest uppercase">
                Since 2022
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[0.95] text-black">
                MONEY <span className="gradient-text block">STUF.</span> MADE SIMPLE.
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-black mb-8">
                We help young people understand money.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                No jargon. No complexity. Just the fundamentals you actually need.
              </p>
            </div>
            <div className="animate-fade-in-right hidden md:block">
              <div className="relative">
                <div className="relative overflow-hidden">
                  <img
                    src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Image_Images_Website.png/:/cr=t:1.33%25,l:0%25,w:100%25,h:97.34%25/rs=w:1240,h:620,cg:true"
                    alt="STUF - Financial Education"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-black py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 lg:mb-28 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1]">
              THE FACTS
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Money problems are real. And they're everywhere.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="group cursor-default scroll-reveal h-full">
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col border-4 border-transparent hover:border-pink-accent transition-all duration-300">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-black">
                  <CountUpAnimation end={11} suffix=".5M" isVisible={countersVisible} />
                </div>
                <div className="text-sm uppercase tracking-wider font-semibold mb-3 pink-accent">Savings Crisis</div>
                <p className="text-sm text-gray-700 leading-relaxed">People in the UK with less than £100 saved</p>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal h-full" style={{ transitionDelay: '0.1s' }}>
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col border-4 border-transparent hover:border-pink-accent transition-all duration-300">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-black">
                  <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
                </div>
                <div className="text-sm uppercase tracking-wider font-semibold mb-3 pink-accent">Below Standard</div>
                <p className="text-sm text-gray-700 leading-relaxed">UK people living below minimum decent standards</p>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal h-full" style={{ transitionDelay: '0.2s' }}>
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col border-4 border-transparent hover:border-pink-accent transition-all duration-300">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-black">6/10</div>
                <div className="text-sm uppercase tracking-wider font-semibold mb-3 pink-accent">Lost</div>
                <p className="text-sm text-gray-700 leading-relaxed">Don't feel confident managing their money</p>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal h-full" style={{ transitionDelay: '0.3s' }}>
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col border-4 border-transparent hover:border-pink-accent transition-all duration-300">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-black">
                  <CountUpAnimation end={4} suffix=".2x" isVisible={countersVisible} />
                </div>
                <div className="text-sm uppercase tracking-wider font-semibold mb-3 pink-accent">Mental Health</div>
                <p className="text-sm text-gray-700 leading-relaxed">More likely to suffer severe depression with debt</p>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal h-full" style={{ transitionDelay: '0.4s' }}>
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col border-4 border-transparent hover:border-pink-accent transition-all duration-300">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-black">1/22</div>
                <div className="text-sm uppercase tracking-wider font-semibold mb-3 pink-accent">Housing</div>
                <p className="text-sm text-gray-700 leading-relaxed">Without a home in parts of England</p>
              </div>
            </div>
            <div className="group cursor-default scroll-reveal h-full" style={{ transitionDelay: '0.5s' }}>
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col border-4 border-transparent hover:border-pink-accent transition-all duration-300">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-black">
                  <CountUpAnimation end={8} suffix="M" isVisible={countersVisible} />
                </div>
                <div className="text-sm uppercase tracking-wider font-semibold mb-3 pink-accent">Debt</div>
                <p className="text-sm text-gray-700 leading-relaxed">In serious debt, most without help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="bg-white py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-8 leading-[1.1]">
              THE MONEY <span className="gradient-text">STUF</span> YOU NEED
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Four areas. No fluff.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-1 max-w-5xl mx-auto">
            <div className="group scroll-reveal bg-black p-10 lg:p-14 hover:bg-pink-accent transition-all duration-300">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">BUDGETING STUF</h3>
              <p className="text-white/90 leading-relaxed text-base">
                Make a plan. Stick to it. Hit your goals.
              </p>
            </div>

            <div className="group scroll-reveal bg-white border-2 border-black p-10 lg:p-14 hover:bg-pink-accent hover:border-pink-accent transition-all duration-300" style={{ transitionDelay: '0.1s' }}>
              <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-white">INVESTING STUF</h3>
              <p className="text-gray-700 leading-relaxed text-base group-hover:text-white/90">
                Grow your money. Actually understand how.
              </p>
            </div>

            <div className="group scroll-reveal bg-white border-2 border-black p-10 lg:p-14 hover:bg-pink-accent hover:border-pink-accent transition-all duration-300" style={{ transitionDelay: '0.2s' }}>
              <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4 group-hover:text-white">MORTGAGE STUF</h3>
              <p className="text-gray-700 leading-relaxed text-base group-hover:text-white/90">
                Get your own place. Know what you're signing.
              </p>
            </div>

            <div className="group scroll-reveal bg-black p-10 lg:p-14 hover:bg-pink-accent transition-all duration-300" style={{ transitionDelay: '0.3s' }}>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">PENSION STUF</h3>
              <p className="text-white/90 leading-relaxed text-base">
                Future you will thank you. Trust us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="bg-white py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-8 leading-[1.1]">
              WHO WE <span className="gradient-text">HELP</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Young people who need it most. Schools that want better for their students. Organizations ready to make change.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <div className="group bg-black p-10 lg:p-12 scroll-reveal hover:bg-pink-accent transition-all duration-300">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">SCHOOLS</h3>
              <p className="text-white/90 leading-relaxed text-base mb-6">
                Workshops that actually work. Drop them into your timetable. Watch students learn.
              </p>
              <div className="text-white text-sm uppercase tracking-wider">Free to Access</div>
            </div>
            <div className="group bg-white border-2 border-black p-10 lg:p-12 scroll-reveal hover:bg-pink-accent hover:border-pink-accent transition-all duration-300" style={{ transitionDelay: '0.1s' }}>
              <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6 group-hover:text-white">YOUTH ORGS</h3>
              <p className="text-gray-700 leading-relaxed text-base mb-6 group-hover:text-white/90">
                Partner up. Add financial education to what you already do great.
              </p>
              <div className="text-black text-sm uppercase tracking-wider group-hover:text-white">Simple Integration</div>
            </div>
            <div className="group bg-black p-10 lg:p-12 scroll-reveal hover:bg-pink-accent transition-all duration-300" style={{ transitionDelay: '0.2s' }}>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">YOUNG PEOPLE</h3>
              <p className="text-white/90 leading-relaxed text-base mb-6">
                Join free workshops. Get mentorship. Build confidence with money.
              </p>
              <div className="text-white text-sm uppercase tracking-wider">Always Free</div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-white py-24 lg:py-32 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-6 leading-[1.1]">
              HOW WE <span className="gradient-text">DELIVER</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Two ways. Both free.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
            <div className="group scroll-reveal bg-black p-12 lg:p-16 hover:bg-pink-accent transition-all duration-300">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">WORKSHOPS</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Interactive sessions. Real scenarios. Practical skills you'll actually use.
              </p>
              <ul className="space-y-3 text-white/80">
                <li>• Budgeting basics</li>
                <li>• Investing 101</li>
                <li>• Debt management</li>
                <li>• Future planning</li>
              </ul>
            </div>
            <div className="group scroll-reveal bg-white border-2 border-black p-12 lg:p-16 hover:bg-pink-accent hover:border-pink-accent transition-all duration-300" style={{ transitionDelay: '0.1s' }}>
              <h3 className="text-3xl lg:text-4xl font-bold text-black mb-6 group-hover:text-white">MENTORSHIP</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 group-hover:text-white/90">
                One-on-one support. Finance pros who get it. Personalized guidance.
              </p>
              <ul className="space-y-3 text-gray-700 group-hover:text-white/80">
                <li>• Personal finance coaching</li>
                <li>• Career planning</li>
                <li>• Investment guidance</li>
                <li>• Goal setting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-black py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              THE <span className="gradient-text">TEAM</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400">
              People who actually care. Finance pros. Educators. Change makers.
            </p>
          </div>

          <div className="mb-24">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-12 text-center scroll-reveal uppercase tracking-wider">Founders</h3>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
              <div className="group scroll-reveal">
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_James.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                    alt="James Jordan"
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
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
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
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
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-12 text-center scroll-reveal uppercase tracking-wider">The Full Team</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { name: 'Thomas Hamer', role: 'Research', desc: '9+ years financial services', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Thomas.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Matthew Smith', role: 'Business Dev', desc: 'Sports and business strategy', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Matthew.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Zofia Barnes', role: 'Policy', desc: '11+ years banking, LSE Masters', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Zofia.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Paul Mokuolu', role: 'Partnerships', desc: 'Bank of England specialist', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-c729d57.png/:/cr=t:16.75%25,l:0%25,w:100%25,h:66.5%25/rs=w:365,h:365,cg:true/qt=q:93' },
                { name: 'Jalpa Lai', role: 'Mentorship', desc: '6+ years youth coaching', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-875f474.png/:/cr=t:0%25,l:4.38%25,w:91.25%25,h:100%25/rs=w:365,h:365,cg:true/qt=q:93' },
                { name: 'Truman Alberto Sullivan', role: 'Advisory', desc: 'Education sector veteran', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Truman.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' },
                { name: 'Tina Creed', role: 'Advisory', desc: '25 years childcare/education', photo: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Tina.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true' }
              ].map((member, idx) => (
                <div key={member.name} className="group scroll-reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
                  <div className="bg-white overflow-hidden transition-all duration-300 hover:bg-pink-accent">
                    <div className="relative h-64 overflow-hidden">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold bg-pink-accent">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-white group-hover:bg-pink-accent transition-all duration-300">
                      <h4 className="text-lg font-bold text-black mb-1 uppercase group-hover:text-white">{member.name}</h4>
                      <p className="text-sm font-semibold mb-2 pink-accent group-hover:text-white uppercase tracking-wide">{member.role}</p>
                      <p className="text-sm text-gray-700 group-hover:text-white/90">{member.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section id="impact-banner" className="bg-white py-16 relative overflow-hidden border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-pink-50 rounded-full border" style={{ borderColor: '#EEBDC2' }}>
            <svg className="w-5 h-5" style={{ color: '#EEBDC2' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Our Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Read Our <span className="gradient-text">Impact Reports</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            Explore detailed insights into our programs and the difference we're making in financial education
          </p>
          <Link
            to="/impact-reports"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/50 hover:scale-105 magnetic-hover shine-effect group"
            style={{ backgroundColor: '#EEBDC2', color: '#161616' }}
          >
            <span>View Impact Reports</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
                {
                  year: '2022',
                  title: 'Foundation & Syllabus',
                  items: ['Set up of the foundation', 'Production of the syllabus'],
                  past: true
                },
                {
                  year: '2023',
                  title: 'Workshop Pilots',
                  items: ['Piloting the workshops: London, Bristol and Kent'],
                  past: true
                },
                {
                  year: '2024',
                  title: 'Programs & Research Launch',
                  items: ['Mentorship programme begins Q4', 'Delivering workshops: South of England', 'Research programme with University Of West London starts Q4'],
                  past: true
                },
                {
                  year: '2025',
                  title: 'National Expansion',
                  items: ['Become a necessary curriculum lesson', 'Coverage across the United Kingdom offering financial education to schools, community associations, colleges and universities'],
                  past: false
                },
                {
                  year: '2026',
                  title: 'Global Recognition',
                  items: ['Reach accreditation', 'E-learning platform', 'Worldwide outreach 2'],
                  past: false
                }
              ].map((milestone, idx) => (
                <div key={milestone.year} className={`grid md:grid-cols-2 gap-8 items-center scroll-reveal ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`} style={{ transitionDelay: `${idx * 0.1}s` }}>
                  {idx % 2 === 0 ? (
                    <>
                      <div className="md:text-right">
                        <div className={`inline-block px-8 py-4 rounded-2xl border-4 font-bold text-3xl mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 ${milestone.past ? 'bg-white' : 'text-white'}`} style={{ borderColor: '#EEBDC2', backgroundColor: milestone.past ? 'white' : '#EEBDC2', color: milestone.past ? '#161616' : 'white' }}>
                          {milestone.year}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                        <ul className="space-y-3">
                          {milestone.items.map((item, i) => (
                            <li key={i} className="text-gray-600 text-lg leading-relaxed flex items-start gap-3 justify-end">
                              <span className="md:order-2">{item}</span>
                              <span className="text-2xl md:order-1" style={{ color: '#EEBDC2' }}>–</span>
                            </li>
                          ))}
                        </ul>
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
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                        <ul className="space-y-3">
                          {milestone.items.map((item, i) => (
                            <li key={i} className="text-gray-600 text-lg leading-relaxed flex items-start gap-3">
                              <span className="text-2xl" style={{ color: '#EEBDC2' }}>–</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
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
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Bristol%20Class%20STUF.jpg/:/cr=t:11.67%25,l:0%25,w:100%25,h:76.67%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Brent STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20240306-WA0014.jpg/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Barnet STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG_4275.jpeg/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Bushey STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG_4243.jpeg/:/cr=t:21.15%25,l:11.54%25,w:76.92%25,h:57.69%25/rs=w:800,h:800,cg:true,m'
              },
              {
                location: 'Camden STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20230612-WA0094.jpg/:/cr=t:18.7%25,l:0%25,w:100%25,h:75%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Croydon STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/20241120_100054.jpg/:/cr=t:31.31%25,l:0%25,w:100%25,h:46.72%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Harrow STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20240228-WA0021.jpg/:/cr=t:12.5%25,l:0%25,w:100%25,h:75%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Kensington & Chelsea STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-9fc4e86.png/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'King College STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG_2268.JPG/:/cr=t:0%25,l:0%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Kent STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20230612-WA0079.jpg/:/rs=w:800,h:800,cg:true,m/cr=w:800,h:800'
              },
              {
                location: 'Southwark STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-1a71eb1.png/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true'
              },
              {
                location: 'Uganda STUF',
                image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/20240814_150409.jpg/:/cr=t:11.54%25,l:11.54%25,w:76.92%25,h:76.92%25/rs=w:800,h:800,cg:true,m'
              }
            ].map((workshop, idx) => (
              <div key={workshop.location} className="group scroll-reveal" style={{ transitionDelay: `${idx * 0.05}s` }}>
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 magnetic-hover bg-white">
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img
                      src={workshop.image}
                      alt={workshop.location}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white">{workshop.location}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center scroll-reveal">
            <a href="#donate" className="inline-block px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 magnetic-hover" style={{ backgroundColor: '#EEBDC2', color: '#161616' }}>
              Bring STUF to Your Area
            </a>
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
              <div key={partner.title} className="group glass-card p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
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

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-gray-600 text-base lg:text-lg font-light">
              Working together to create lasting change in financial education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center scroll-reveal">
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/BRENT%20LOGO%20%2B%20white%20%2B%20LOGOTYPE%20black%20small.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:514,h:200,cg:true"
                alt="Brent Council"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/bentley%20logo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                alt="Bentley"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Power%20up%20london%20logo.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:334,h:200,cg:true"
                alt="Power Up London"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/CAF-Logo-Standard.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:320,h:200,cg:true"
                alt="CAF"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Woodward-Logo-March-2023-374x374.jpg/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                alt="Woodward"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/64ee2af5aa132.webp/:/rs=w:916,h:200,cg:true,m/cr=w:916,h:200"
                alt="Partner"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/clothworkers_foundation_navy.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:650,h:200,cg:true"
                alt="Clothworkers Foundation"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/images%20(2).png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                alt="Partner"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/DiNN%2Blogo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                alt="DiNN"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-fdb8e4a.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:200,h:200,cg:true"
                alt="Partner"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Camden-Giving-cmyk-logo-01-300x133.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:300,h:133,cg:true"
                alt="Camden Giving"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/living%20wage.jpg/:/rs=w:253,h:200,cg:true,m/cr=w:253,h:200"
                alt="Living Wage"
                className="max-w-full h-auto max-h-20 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="ready-to-transform" className="py-16 sm:py-20 md:py-28 lg:py-32 xl:py-40 text-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#EEBDC2' }}></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#F5D4D8', animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 scroll-reveal">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.15] text-gray-900">
            Ready to Transform <span className="gradient-text">Financial Education?</span>
          </h2>
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-gray-600 font-light max-w-3xl mx-auto">
            Join schools and partners across the UK empowering students with essential money skills.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: '#EEBDC2' }}>
                  ✉️
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Email Us</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">UK Office</p>
                  <a href="mailto:hello@stuf.org.uk" className="text-lg font-bold hover:opacity-70 transition-opacity duration-300 block" style={{ color: '#EEBDC2' }}>
                    hello@stuf.org.uk
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Uganda Office</p>
                  <a href="mailto:info@ug-stuf.com" className="text-lg font-bold hover:opacity-70 transition-opacity duration-300 block" style={{ color: '#EEBDC2' }}>
                    info@ug-stuf.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: '#EEBDC2' }}>
                  📍
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visit Us</h3>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider font-semibold">Registered Address</p>
                <p className="text-lg leading-relaxed text-gray-700">
                  IDEALondon<br />
                  69 Wilson St, Shoreditch<br />
                  London, England<br />
                  EC2A 2BB<br />
                  United Kingdom
                </p>
              </div>
            </div>
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
                <a href="https://www.youtube.com/@SetThemUpFoundation" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ backgroundColor: '#FF0000' }}>
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FFFFFF' }}>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
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
                <li><a href="mailto:hello@stuf.org.uk" className="text-white/60 hover:text-white transition-colors duration-300">hello@stuf.org.uk</a></li>
                <li><a href="mailto:info@ug-stuf.com" className="text-white/60 hover:text-white transition-colors duration-300">info@ug-stuf.com</a></li>
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
