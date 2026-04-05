import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, TrendingUp, GraduationCap, Heart } from 'lucide-react';
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
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

        @media (max-width: 640px) {
          body {
            font-size: 16px;
          }
        }

        .gradient-text {
          background: #FFC3C3;
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
          font-size: clamp(60px, 10vw, 120px);
          line-height: 0.9;
          color: #FFC3C3;
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
              <a href="#about" className="text-black font-bold hover:opacity-70 transition-opacity">About</a>
              <a href="#impact" className="text-black font-bold hover:opacity-70 transition-opacity">Impact</a>
              <a href="#programs" className="text-black font-bold hover:opacity-70 transition-opacity">Programs</a>
              <a href="#team" className="text-black font-bold hover:opacity-70 transition-opacity">Team</a>
              <Link to="/impact-reports" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                Impact Reports
              </Link>
            </div>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <p className="text-pink-accent font-bold text-sm uppercase tracking-wider mb-4">Empowering Young People</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Financial Literacy <br />
                <span className="gradient-text">For Everyone</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Breaking the cycle of poverty through free financial education. We're teaching young people the money skills they need to thrive.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#programs" className="bg-pink-accent text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all">
                  Our Programs
                </a>
                <a href="#donate" className="border-2 border-pink-accent text-pink-accent px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-accent hover:text-black transition-all">
                  Support Us
                </a>
              </div>
            </div>
            <div className="scroll-reveal hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-pink-accent opacity-20 blur-3xl rounded-full"></div>
                <img
                  src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students learning"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <p className="text-pink-accent font-bold text-sm uppercase tracking-wider mb-4">Why We're Here</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              The Problem We're Solving
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Financial literacy is still out of reach for millions of young people. We're here to change that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal border border-gray-800 hover:border-pink-accent transition-all">
              <p className="text-white font-bold text-lg mb-4">Financial literacy gap</p>
              <p className="stat-number mb-4">
                <CountUpAnimation end={6} isVisible={countersVisible} /> in 10
              </p>
              <p className="text-gray-300 text-lg">
                UK people feel they don't have the skills to manage their money properly
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal border border-gray-800 hover:border-pink-accent transition-all">
              <p className="text-white font-bold text-lg mb-4">Mental wellbeing</p>
              <p className="stat-number mb-4">
                -<CountUpAnimation end={10} isVisible={countersVisible} />%
              </p>
              <p className="text-gray-300 text-lg">
                Lower mental wellbeing scores for people with lower financial literacy
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal border border-gray-800 hover:border-pink-accent transition-all">
              <p className="text-white font-bold text-lg mb-4">Poverty rate</p>
              <p className="stat-number mb-4">
                <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
              </p>
              <p className="text-gray-300 text-lg">
                Of people in the UK live in poverty
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal border border-gray-800 hover:border-pink-accent transition-all">
              <p className="text-white font-bold text-lg mb-4">Houselessness</p>
              <p className="stat-number mb-4">
                1 in <CountUpAnimation end={22} isVisible={countersVisible} />
              </p>
              <p className="text-gray-300 text-lg">
                People lack a home in some places in England
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal border border-gray-800 hover:border-pink-accent transition-all">
              <p className="text-white font-bold text-lg mb-4">Young homelessness</p>
              <p className="stat-number mb-4">
                <CountUpAnimation end={126} suffix="K" isVisible={countersVisible} />
              </p>
              <p className="text-gray-300 text-lg">
                Homeless under-18s in the UK
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal border border-gray-800 hover:border-pink-accent transition-all">
              <p className="text-white font-bold text-lg mb-4">Our mission</p>
              <Heart className="w-20 h-20 text-pink-accent mb-4" />
              <p className="text-gray-300 text-lg">
                Breaking the cycle of poverty through education
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-pink-accent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <p className="text-black font-bold text-sm uppercase tracking-wider mb-4">About Us</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
                Who We Are
              </h2>
              <p className="text-xl text-black leading-relaxed mb-6">
                The Set Them Up Foundation is on a mission to help young people, their teachers, and parents get a handle on the fundamentals of finance.
              </p>
              <p className="text-lg text-black leading-relaxed">
                By working with schools, banks, and other likeminded partners, we provide lifelong skills, understanding, and access to previously closed off worlds of money – so that one day, we can break the cycle of poverty for good.
              </p>
            </div>
            <div className="scroll-reveal">
              <img
                src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Teaching financial literacy"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <p className="text-pink-accent font-bold text-sm uppercase tracking-wider mb-4">What We Do</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              Our Programs
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive financial education covering all the important STUF
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black text-white p-8 rounded-2xl scroll-reveal hover:scale-105 transition-transform">
              <TrendingUp className="w-12 h-12 text-pink-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4 pink-accent">Investment Stuf</h3>
              <p className="text-gray-300 mb-6">
                Learn how to grow your money and make smart investment decisions for your future.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all">
                Learn More
              </button>
            </div>

            <div className="bg-black text-white p-8 rounded-2xl scroll-reveal hover:scale-105 transition-transform">
              <FileText className="w-12 h-12 text-pink-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4 pink-accent">Financial Planning Stuf</h3>
              <p className="text-gray-300 mb-6">
                Master budgeting, saving, and planning to achieve your financial goals.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all">
                Learn More
              </button>
            </div>

            <div className="bg-black text-white p-8 rounded-2xl scroll-reveal hover:scale-105 transition-transform">
              <svg className="w-12 h-12 text-pink-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="text-2xl font-bold mb-4 pink-accent">Mortgage & Rental Stuf</h3>
              <p className="text-gray-300 mb-6">
                Understand housing options, from renting to buying your first home.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all">
                Learn More
              </button>
            </div>

            <div className="bg-black text-white p-8 rounded-2xl scroll-reveal hover:scale-105 transition-transform">
              <svg className="w-12 h-12 text-pink-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-4 pink-accent">Pension Stuf</h3>
              <p className="text-gray-300 mb-6">
                Plan for retirement early and secure your financial future.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <p className="text-pink-accent font-bold text-sm uppercase tracking-wider mb-4">Our Impact</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              Making A Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg scroll-reveal text-center">
              <div className="stat-number text-black mb-2">5,000+</div>
              <p className="text-xl font-bold text-gray-700">Students Reached</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg scroll-reveal text-center">
              <div className="stat-number text-black mb-2">50+</div>
              <p className="text-xl font-bold text-gray-700">Schools Partnered</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg scroll-reveal text-center">
              <div className="stat-number text-black mb-2">100%</div>
              <p className="text-xl font-bold text-gray-700">Free Education</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <p className="text-pink-accent font-bold text-sm uppercase tracking-wider mb-4">Our Team</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              People Behind The STUF
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black rounded-2xl overflow-hidden scroll-reveal group">
              <div className="flex flex-col md:flex-row">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Jermaine.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                  alt="Jermaine Bishop"
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">Jermaine Bishop</span>
                  </h3>
                  <p className="text-white text-lg mb-4">Founding Trustee</p>
                  <p className="text-gray-300 mb-6">
                    15+ years in Tech and Communications. Co-founder focused on providing free financial education.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm self-start hover:bg-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl overflow-hidden scroll-reveal group">
              <div className="flex flex-col md:flex-row">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_James.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                  alt="James Jordan"
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">James M. Jordan</span>
                  </h3>
                  <p className="text-white text-lg mb-4">Founding Trustee</p>
                  <p className="text-gray-300 mb-6">
                    Entrepreneur with Sales and Marketing expertise. Founded STUF to help young people.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm self-start hover:bg-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl overflow-hidden scroll-reveal group">
              <div className="flex flex-col md:flex-row">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Tina.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true"
                  alt="Tina Creed"
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">Tina Creed</span>
                  </h3>
                  <p className="text-white text-lg mb-4">Trustee</p>
                  <p className="text-gray-300 mb-6">
                    25 years in childcare/education. Former Ark Elvin Academy Governor.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm self-start hover:bg-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl overflow-hidden scroll-reveal group">
              <div className="flex flex-col md:flex-row">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Truman.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true"
                  alt="Truman Alberto Sullivan"
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">Truman Alberto Sullivan</span>
                  </h3>
                  <p className="text-white text-lg mb-4">Trustee</p>
                  <p className="text-gray-300 mb-6">
                    Head of Rugby at Skinners School, Kent. Decade in education sector.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm self-start hover:bg-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="donate" className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <p className="text-pink-accent font-bold text-sm uppercase tracking-wider mb-4">Support Our Mission</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Help Us Make STUF Happen
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Your support helps us provide free financial education to thousands of young people across the UK.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-pink-accent text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all">
                  Donate Now
                </a>
                <a href="#" className="border-2 border-pink-accent text-pink-accent px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-accent hover:text-black transition-all">
                  Become a Partner
                </a>
              </div>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl scroll-reveal">
              <h3 className="text-2xl font-bold text-white mb-6">Stay Updated</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-black text-white border-2 border-gray-700 rounded-full focus:border-pink-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-pink-accent text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-pink-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-12 mb-4"
              />
              <p className="text-black text-sm">
                Breaking the cycle of poverty through financial education.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-black hover:opacity-70">About Us</a></li>
                <li><a href="#programs" className="text-black hover:opacity-70">Programs</a></li>
                <li><a href="#team" className="text-black hover:opacity-70">Team</a></li>
                <li><Link to="/impact-reports" className="text-black hover:opacity-70">Impact Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-4">Get Involved</h4>
              <ul className="space-y-2">
                <li><a href="#donate" className="text-black hover:opacity-70">Donate</a></li>
                <li><a href="#" className="text-black hover:opacity-70">Volunteer</a></li>
                <li><a href="#" className="text-black hover:opacity-70">Partner With Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-4">Contact</h4>
              <p className="text-black text-sm">
                Email: info@setthemup.org<br />
                Follow us on social media
              </p>
            </div>
          </div>
          <div className="border-t border-black mt-8 pt-8 text-center">
            <p className="text-black text-sm">
              © 2024 Set Them Up Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
