import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, TrendingUp, GraduationCap, Heart, Calendar, Target, Mail, Phone, MapPin, Home, Wallet, PiggyBank, Calculator, LineChart, Receipt, Key, Coins } from 'lucide-react';
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.cdnfonts.com/css/veneer');

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Veneer', 'Impact', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
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

        body {
          overflow-x: hidden;
        }

        @media (max-width: 640px) {
          body {
            font-size: 16px;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #FFC3C3 0%, #FFD5D5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .pink-accent {
          color: #FFC3C3;
        }

        .bg-pink-accent {
          background-color: #FFC3C3;
        }

        .border-pink-accent {
          border-color: #FFC3C3;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-number {
          font-family: 'Veneer', 'Impact', sans-serif;
          font-size: clamp(48px, 8vw, 90px);
          line-height: 1;
          color: #FFC3C3;
          font-weight: 700;
        }

        .premium-card {
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .premium-card:hover {
          transform: translateY(-4px);
        }

        p {
          line-height: 1.7;
        }
      `}</style>

      <header className="bg-pink-accent sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF - Set Them Up Foundation"
                className="h-12 lg:h-16"
              />
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#who-we-help" className="text-black font-bold hover:opacity-70 transition-opacity">Who We Help</a>
              <a href="#impact" className="text-black font-bold hover:opacity-70 transition-opacity">Impact</a>
              <a href="#programs" className="text-black font-bold hover:opacity-70 transition-opacity">Programs</a>
              <a href="#team" className="text-black font-bold hover:opacity-70 transition-opacity">Team</a>
              <Link to="/contact" className="text-black font-bold hover:opacity-70 transition-opacity">Contact</Link>
            </div>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="relative bg-black text-white py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTExIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">For Young People</p>
              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold mb-8 leading-[1.1]">
                Money STUF<br />
                <span className="gradient-text">That Actually Makes Sense</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-xl">
                15–19 year olds learning real money skills.<br />
                No boring lectures.<br />
                Just stuff you'll actually use.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-pink-accent text-black px-10 py-4 rounded-full font-bold text-base hover:bg-opacity-90 hover:shadow-xl hover:shadow-pink-accent/20 transition-all">
                  Work With Us
                </Link>
                <Link to="/impact-reports" className="border-2 border-pink-accent text-pink-accent px-10 py-4 rounded-full font-bold text-base hover:bg-pink-accent hover:text-black transition-all">
                  See What We Do
                </Link>
              </div>
            </div>
            <div className="scroll-reveal hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-pink-accent/20 to-pink-accent/5 blur-3xl rounded-full"></div>
                <img
                  src="/1.jpg"
                  alt="Students learning"
                  className="relative rounded-3xl shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-black py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">The Reality</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Why This Matters
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Money stuff isn't taught.<br />
              Young people struggle.<br />
              We're changing that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">The Gap</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={6} isVisible={countersVisible} /> in 10
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                People don't know how to manage money.<br />
                That's not okay.
              </p>
            </div>

            <div className="p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Mental Health</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                -<CountUpAnimation end={10} isVisible={countersVisible} />%
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Money stress hits hard.<br />
                Mental health drops.
              </p>
            </div>

            <div className="p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Living In Poverty</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                1 in 5 people.<br />
                Right here in the UK.
              </p>
            </div>

            <div className="p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Houselessness</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                1 in <CountUpAnimation end={22} isVisible={countersVisible} />
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                People lack a home in some places in England
              </p>
            </div>

            <div className="p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Young & Homeless</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={126} suffix="K" isVisible={countersVisible} />
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Kids under 18.<br />
                No home.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-accent/10 to-black p-10 rounded-3xl scroll-reveal border border-pink-accent/30 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">What We Do</p>
              <Heart className="w-16 h-16 text-pink-accent mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-gray-400 text-base leading-relaxed">
                Break the cycle.<br />
                Teach money STUF.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-pink-accent py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="text-black font-semibold text-sm uppercase tracking-widest mb-6">About Us</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                Who We Are
              </h2>
              <p className="text-xl text-black/90 leading-relaxed mb-6 font-medium">
                We teach young people money STUF.<br />
                The stuff schools skip.<br />
                The stuff parents never learned.
              </p>
              <p className="text-base text-black/80 leading-relaxed">
                We work with schools and banks to open doors.<br />
                Give kids skills that stick.<br />
                Break poverty for good.
              </p>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <div className="absolute -inset-4 bg-black/5 blur-2xl rounded-3xl"></div>
                <img
                  src="/6.jpg"
                  alt="Teaching financial literacy"
                  className="relative rounded-3xl shadow-2xl ring-1 ring-black/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Who We Help</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Work With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schools. Funders. Partners.<br />
              Let's make a difference together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl scroll-reveal border border-gray-200 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🏫
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Schools & Colleges</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Real-world money workshops.<br />
                Students actually pay attention.<br />
                Fits your schedule.
              </p>
              <a href="#contact" className="text-pink-accent font-semibold text-sm hover:underline">
                Get started →
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl scroll-reveal border border-gray-200 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Funders & Donors</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Fund programs that work.<br />
                See real results.<br />
                Change lives.
              </p>
              <Link to="/impact-reports" className="text-pink-accent font-semibold text-sm hover:underline">
                See our impact →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl scroll-reveal border border-gray-200 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                💼
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Corporate Partners</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Match your values to action.<br />
                Send volunteers.<br />
                Actually make a difference.
              </p>
              <a href="#contact" className="text-pink-accent font-semibold text-sm hover:underline">
                Let's talk →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">How It Works</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Three Steps. Real Impact.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-pink-accent text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us what you need.<br />
                We design a program.<br />
                It fits your schedule.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-pink-accent text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Deliver</h3>
              <p className="text-gray-600 leading-relaxed">
                We show up.<br />
                Run engaging workshops.<br />
                Make money make sense.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-pink-accent text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Track Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Students gain confidence.<br />
                We track the progress.<br />
                You see the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-pink-accent py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[45%_55%] gap-12 items-start">
            <div className="scroll-reveal lg:sticky lg:top-32">
              <p className="text-black font-semibold text-sm uppercase tracking-widest mb-6">What we do</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-black mb-8 leading-[1.1]" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>
                WE'VE GOT THE MONEY STUF COVERED
              </h2>
              <p className="text-lg text-black leading-relaxed">
                We work with schools and banks.<br />
                Teach money skills that stick.<br />
                Open doors that used to be closed.<br />
                Break the poverty cycle for good.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl scroll-reveal group transition-all duration-300 shadow-xl flex items-center justify-between relative overflow-visible" style={{ backgroundImage: 'url(/texture_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Investment STUF</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Make your money work.<br />
                    Not sit there.
                  </p>
                  <button className="bg-pink-accent text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all">
                    Learn more
                  </button>
                </div>
                <div className="w-48 h-48 flex-shrink-0 -mr-12 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img
                    src="/investment_stuf.png"
                    alt="Investment"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="rounded-2xl scroll-reveal group transition-all duration-300 shadow-xl flex items-center justify-between relative overflow-visible" style={{ backgroundImage: 'url(/texture_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Financial Planning STUF</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Plan ahead.<br />
                    Stay in control.
                  </p>
                  <button className="bg-pink-accent text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all">
                    Learn more
                  </button>
                </div>
                <div className="w-48 h-48 flex-shrink-0 -mr-12 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img
                    src="/financial_planning_stuf.png"
                    alt="Financial Planning"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="rounded-2xl scroll-reveal group transition-all duration-300 shadow-xl flex items-center justify-between relative overflow-visible" style={{ backgroundImage: 'url(/texture_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Mortgage & Rental STUF</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Get a place.<br />
                    Know your rights.
                  </p>
                  <button className="bg-pink-accent text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all">
                    Learn more
                  </button>
                </div>
                <div className="w-48 h-48 flex-shrink-0 -mr-12 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img
                    src="/mortgage_rental_stuf.png"
                    alt="Mortgage and Rental"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="rounded-2xl scroll-reveal group transition-all duration-300 shadow-xl flex items-center justify-between relative overflow-visible" style={{ backgroundImage: 'url(/texture_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Pension STUF</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Future you matters.<br />
                    Start now.
                  </p>
                  <button className="bg-pink-accent text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all">
                    Learn more
                  </button>
                </div>
                <div className="w-48 h-48 flex-shrink-0 -mr-12 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img
                    src="/pensio_stuf.png"
                    alt="Pension"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Our Impact</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Real Numbers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-12 rounded-3xl shadow-xl scroll-reveal text-center border border-gray-100 premium-card">
              <div className="stat-number text-black mb-4">10,000+</div>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Students Reached</p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-xl scroll-reveal text-center border border-gray-100 premium-card">
              <div className="stat-number text-black mb-4">150+</div>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Partner Schools</p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-xl scroll-reveal text-center border border-gray-100 premium-card">
              <div className="stat-number text-black mb-4">95%</div>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Satisfaction Rate</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center scroll-reveal">
            <div>
              <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">What Changes</p>
              <h3 className="text-3xl sm:text-4xl font-bold text-black mb-8 leading-tight">
                Students Learn.<br />
                Confidence Grows.
              </h3>
              <div className="space-y-8">
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-4xl font-bold text-black mb-2">89%</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Students feel more confident.<br />
                    Ready to handle money stuff.
                  </p>
                </div>
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-4xl font-bold text-black mb-2">£2.4M</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Future value created.<br />
                    Better decisions add up.
                  </p>
                </div>
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-4xl font-bold text-black mb-2">40+</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Hours of workshops weekly.<br />
                    All across the UK.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-pink-accent/5 blur-2xl rounded-3xl"></div>
              <img
                src="/7.jpg"
                alt="Impact visualization"
                className="relative rounded-3xl shadow-2xl ring-1 ring-gray-200"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-5xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              Where We've <span className="text-pink-accent">Been</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              London to Uganda.<br />
              Real workshops. Real students.<br />
              Real change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Bristol STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Bristol%20Class%20STUF.jpg/:/cr=t:11.67%25,l:0%25,w:100%25,h:76.67%25/rs=w:800,h:800,cg:true' },
              { name: 'Brent STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20240306-WA0014.jpg/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true' },
              { name: 'Barnet STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG_4275.jpeg/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true' },
              { name: 'Bushey STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG_4243.jpeg/:/cr=t:21.15%25,l:11.54%25,w:76.92%25,h:57.69%25/rs=w:800,h:800,cg:true,m' },
              { name: 'Camden STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20230612-WA0094.jpg/:/cr=t:18.7%25,l:0%25,w:100%25,h:75%25/rs=w:800,h:800,cg:true' },
              { name: 'Croydon STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/20241120_100054.jpg/:/cr=t:31.31%25,l:0%25,w:100%25,h:46.72%25/rs=w:800,h:800,cg:true' },
              { name: 'Harrow STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20240228-WA0021.jpg/:/cr=t:12.5%25,l:0%25,w:100%25,h:75%25/rs=w:800,h:800,cg:true' },
              { name: 'Kensington & Chelsea STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-9fc4e86.png/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true' },
              { name: 'King College STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG_2268.JPG/:/cr=t:0%25,l:0%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true' },
              { name: 'Kent STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/IMG-20230612-WA0079.jpg/:/rs=w:800,h:800,cg:true,m/cr=w:800,h:800' },
              { name: 'Southwark STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-1a71eb1.png/:/cr=t:0%25,l:12.5%25,w:75%25,h:100%25/rs=w:800,h:800,cg:true' },
              { name: 'Uganda STUF', image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/20240814_150409.jpg/:/cr=t:11.54%25,l:11.54%25,w:76.92%25,h:76.92%25/rs=w:800,h:800,cg:true,m' },
            ].map((workshop) => (
              <div key={workshop.name} className="group relative overflow-hidden rounded-3xl scroll-reveal premium-card">
                <img
                  src={workshop.image}
                  alt={`${workshop.name} workshop in action`}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="text-3xl font-bold text-white">{workshop.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center scroll-reveal">
            <p className="text-gray-600 text-lg mb-8">
              Want us at your school?
            </p>
            <a href="#contact" className="inline-block bg-pink-accent text-black px-10 py-4 rounded-full font-bold text-base hover:bg-black hover:text-pink-accent transition-all">
              Let's Do It
            </a>
          </div>
        </div>
      </section>

      <section id="roadmap" className="bg-pink-accent py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-black font-semibold text-sm uppercase tracking-widest mb-6">The Plan</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Where We're Going
            </h2>
            <p className="text-xl text-black/80 max-w-3xl mx-auto">
              Start small.<br />
              Scale up.<br />
              Change everything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 1</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Build The Base</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• Start pilots</li>
                <li>• Get first schools</li>
                <li>• Create curriculum</li>
                <li>• Find volunteers</li>
                <li>• Track what works</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 2</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Go Bigger</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• 150+ schools</li>
                <li>• Digital tools</li>
                <li>• Train teachers</li>
                <li>• 10K students</li>
                <li>• Corporate partners</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 3</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Go National</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• 12+ counties</li>
                <li>• Regional hubs</li>
                <li>• Launch app</li>
                <li>• 25K students</li>
                <li>• Train more teachers</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 4</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Change Everything</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• Entire UK</li>
                <li>• Influence policy</li>
                <li>• Go global</li>
                <li>• 100K+ lives</li>
                <li>• Self-sustaining</li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      <section id="team" className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Our Team</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Who Does The STUF
            </h2>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-black mb-8 scroll-reveal">Founders</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'James Jordan',
                  role: 'Founder & Trustee',
                  bio: 'Sales guy. Marketing guy. Started STUF to teach kids what schools skip.',
                  quote: 'Left school at 16. Had no clue about money. Starting STUF so other kids learn what I missed.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_James.png'
                },
                {
                  name: 'Jermaine Bishop',
                  role: 'Founding Trustee',
                  bio: '15 years in tech. Co-founded STUF. Free money education for kids who need it.',
                  quote: 'Teach kids to manage money. Open doors. Create opportunities.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Jermaine.png'
                },
              ].map((member) => (
                <div key={member.name} className="rounded-3xl overflow-hidden scroll-reveal group" style={{ backgroundImage: 'url(/texture_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center w-full md:w-3/5">
                      <h3 className="text-2xl font-bold mb-2">
                        <span className="pink-accent">{member.name}</span>
                      </h3>
                      <p className="text-white text-base mb-6 font-medium">{member.role}</p>
                      <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                      <blockquote className="border-l-4 border-pink-accent pl-4 italic text-gray-300 text-sm leading-relaxed">
                        "{member.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-black mb-8 scroll-reveal">Team Members</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Thomas Hamer',
                  role: 'Trustee',
                  bio: '9 years in finance. Banking, wealth management, the works.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Thomas.png'
                },
                {
                  name: 'Matthew Smith',
                  role: 'Trustee',
                  bio: 'Sports and business guy. Knows how to grow things.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Matthew.png'
                },
                {
                  name: 'Zofia Barnes',
                  role: 'Trustee',
                  bio: '11 years in banking. LSE Masters. Focuses on inequality and policy.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Zofia.png'
                },
                {
                  name: 'Paul Mokuolu',
                  role: 'Trustee',
                  bio: '10 years in finance. Bank of England specialist.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-c729d57.png/:/cr=t:16.75%25,l:0%25,w:100%25,h:66.5%25/rs=w:365,h:365,cg:true/qt=q:93'
                },
                {
                  name: 'Jalpa Lai',
                  role: 'Trustee',
                  bio: '6 years mentoring young people. Money coaching specialist.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-875f474.png/:/cr=t:0%25,l:4.38%25,w:91.25%25,h:100%25/rs=w:365,h:365,cg:true/qt=q:93'
                },
                {
                  name: 'Truman Alberto Sullivan',
                  role: 'Trustee',
                  bio: 'Teacher. Rugby coach. 10 years in schools.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Truman.png'
                },
                {
                  name: 'Tina Creed',
                  role: 'Advisory',
                  bio: '25 years with kids. Former school governor. Knows education.',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Tina.png'
                },
              ].map((member) => (
                <div key={member.name} className="rounded-3xl overflow-hidden scroll-reveal group" style={{ backgroundImage: 'url(/texture_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center w-full md:w-3/5">
                      <h3 className="text-2xl font-bold mb-2">
                        <span className="pink-accent">{member.name}</span>
                      </h3>
                      <p className="text-white text-base mb-6 font-medium">{member.role}</p>
                      <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                      <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold text-sm self-start hover:bg-white transition-all">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Partners</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Who Backs Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schools. Councils. Foundations.<br />
              All in on change.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-12 lg:p-16 rounded-3xl scroll-reveal border border-gray-200 premium-card">
            <div className="text-center mb-16">
              <p className="text-lg text-gray-700 font-medium">
                Partners who care.<br />
                Organizations that act.<br />
                Together we go further.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/BRENT%20LOGO%20%2B%20white%20%2B%20LOGOTYPE%20black%20small.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:514,h:200,cg:true"
                  alt="Brent Council"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/bentley%20logo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Bentley"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Power%20up%20london%20logo.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:334,h:200,cg:true"
                  alt="Power Up London"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/CAF-Logo-Standard.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:320,h:200,cg:true"
                  alt="CAF"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Woodward-Logo-March-2023-374x374.jpg/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Woodward"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/64ee2af5aa132.webp/:/rs=w:916,h:200,cg:true,m/cr=w:916,h:200"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/clothworkers_foundation_navy.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:650,h:200,cg:true"
                  alt="Clothworkers Foundation"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/images%20(2).png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/DiNN%2Blogo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="DiNN"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-fdb8e4a.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:200,h:200,cg:true"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Camden-Giving-cmyk-logo-01-300x133.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:300,h:133,cg:true"
                  alt="Camden Giving"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/living%20wage.jpg/:/rs=w:253,h:200,cg:true,m/cr=w:253,h:200"
                  alt="Living Wage"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <a href="#contact" className="inline-block bg-pink-accent text-black px-10 py-4 rounded-full font-bold text-base hover:bg-black hover:text-pink-accent transition-all shadow-lg hover:shadow-xl">
                Join Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-pink-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-14 mb-6"
              />
              <p className="text-black/80 text-sm leading-relaxed">
                Teaching money STUF.<br />
                Breaking poverty cycles.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black mb-5 text-base uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-black/80 hover:text-black transition-colors text-sm">About Us</a></li>
                <li><a href="#programs" className="text-black/80 hover:text-black transition-colors text-sm">Programs</a></li>
                <li><a href="#team" className="text-black/80 hover:text-black transition-colors text-sm">Team</a></li>
                <li><Link to="/impact-reports" className="text-black/80 hover:text-black transition-colors text-sm">Impact Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-5 text-base uppercase tracking-wide">Get Involved</h4>
              <ul className="space-y-3">
                <li><a href="#donate" className="text-black/80 hover:text-black transition-colors text-sm">Donate</a></li>
                <li><a href="#" className="text-black/80 hover:text-black transition-colors text-sm">Volunteer</a></li>
                <li><a href="#" className="text-black/80 hover:text-black transition-colors text-sm">Partner With Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-5 text-base uppercase tracking-wide">Contact</h4>
              <p className="text-black/80 text-sm leading-relaxed">
                Email: info@setthemup.org<br />
                Follow us on social media
              </p>
            </div>
          </div>
          <div className="border-t border-black/20 pt-8 text-center">
            <p className="text-black/70 text-sm">
              © 2024 Set Them Up Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
