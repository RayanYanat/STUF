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
              <a href="#contact" className="text-black font-bold hover:opacity-70 transition-opacity">Contact</a>
              <Link to="/impact-reports" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                Impact Reports
              </Link>
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
              <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Empowering Young People</p>
              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold mb-8 leading-[1.1]">
                Building Financial Futures <br />
                <span className="gradient-text">for UK's Next Generation</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-xl">
                We equip 15–19 year olds with essential money skills through expert-led workshops, transforming how young people think about budgeting, saving, and investing.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="bg-pink-accent text-black px-10 py-4 rounded-full font-bold text-base hover:bg-opacity-90 hover:shadow-xl hover:shadow-pink-accent/20 transition-all">
                  Partner with Us
                </a>
                <a href="#who-we-help" className="border-2 border-pink-accent text-pink-accent px-10 py-4 rounded-full font-bold text-base hover:bg-pink-accent hover:text-black transition-all">
                  Bring STUF to Your School
                </a>
              </div>
            </div>
            <div className="scroll-reveal hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-pink-accent/20 to-pink-accent/5 blur-3xl rounded-full"></div>
                <img
                  src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
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
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Why We're Here</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Problem We're Solving
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Financial literacy is still out of reach for millions of young people. We're here to change that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Financial literacy gap</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={6} isVisible={countersVisible} /> in 10
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                UK people feel they don't have the skills to manage their money properly
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Mental wellbeing</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                -<CountUpAnimation end={10} isVisible={countersVisible} />%
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Lower mental wellbeing scores for people with lower financial literacy
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Poverty rate</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Of people in the UK live in poverty
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Houselessness</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                1 in <CountUpAnimation end={22} isVisible={countersVisible} />
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                People lack a home in some places in England
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Young homelessness</p>
              <p className="stat-number mb-6 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={126} suffix="K" isVisible={countersVisible} />
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Homeless under-18s in the UK
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-accent/10 to-black p-10 rounded-3xl scroll-reveal border border-pink-accent/30 hover:border-pink-accent/50 transition-all premium-card group">
              <p className="text-white font-semibold text-base mb-6 uppercase tracking-wide">Our mission</p>
              <Heart className="w-16 h-16 text-pink-accent mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-gray-400 text-base leading-relaxed">
                Breaking the cycle of poverty through education
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
                The Set Them Up Foundation is on a mission to help young people, their teachers, and parents get a handle on the fundamentals of finance.
              </p>
              <p className="text-base text-black/80 leading-relaxed">
                By working with schools, banks, and other likeminded partners, we provide lifelong skills, understanding, and access to previously closed off worlds of money – so that one day, we can break the cycle of poverty for good.
              </p>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <div className="absolute -inset-4 bg-black/5 blur-2xl rounded-3xl"></div>
                <img
                  src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=800"
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
              Partnering Across the Education Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with schools, funders, and partners to create lasting impact through financial education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl scroll-reveal border border-gray-200 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🏫
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Schools & Colleges</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Bring engaging, curriculum-aligned financial literacy workshops to your students. Our expert-led sessions fit seamlessly into your timetable.
              </p>
              <a href="#contact" className="text-pink-accent font-semibold text-sm hover:underline">
                Learn more →
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl scroll-reveal border border-gray-200 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Funders & Donors</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Support proven programs that create measurable impact. Your investment directly transforms young lives through financial education.
              </p>
              <Link to="/impact-reports" className="text-pink-accent font-semibold text-sm hover:underline">
                View impact report →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl scroll-reveal border border-gray-200 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                💼
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Corporate Partners</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Align your CSR goals with youth financial empowerment. Co-create programs, provide volunteers, and make a real difference.
              </p>
              <a href="#contact" className="text-pink-accent font-semibold text-sm hover:underline">
                Partner with us →
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
              Simple, Effective, Impact-Driven
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-pink-accent text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Reach out to discuss your school's needs and student demographics. We'll design a program that fits your schedule and goals.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-pink-accent text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Deliver</h3>
              <p className="text-gray-600 leading-relaxed">
                Our expert facilitators deliver engaging, interactive workshops that make financial concepts accessible and relevant to young people.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-pink-accent text-black rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Measure Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Track student progress and outcomes through our comprehensive evaluation framework. See the real difference in financial confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">What We Do</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial education covering all the important STUF
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black text-white rounded-3xl scroll-reveal premium-card border border-gray-900 overflow-hidden group hover:border-pink-accent/30 transition-all">
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4 pink-accent">Investment Stuf</h3>
                <p className="text-gray-400 mb-8 text-base leading-relaxed">
                  Some light-hearted copy here to support the image
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="/investment_stuf.png"
                  alt="Investment"
                  className="absolute bottom-0 right-0 h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="bg-black text-white rounded-3xl scroll-reveal premium-card border border-gray-900 overflow-hidden group hover:border-pink-accent/30 transition-all">
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4 pink-accent">Financial planning Stuf</h3>
                <p className="text-gray-400 mb-8 text-base leading-relaxed">
                  Some light-hearted copy here to support the image
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="/financial_planning_stuf.png"
                  alt="Financial Planning"
                  className="absolute bottom-0 right-0 h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="bg-black text-white rounded-3xl scroll-reveal premium-card border border-gray-900 overflow-hidden group hover:border-pink-accent/30 transition-all">
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4 pink-accent">Mortgage and rental Stuf</h3>
                <p className="text-gray-400 mb-8 text-base leading-relaxed">
                  Some light-hearted copy here to support the image
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="/mortgage_rental_stuf.png"
                  alt="Mortgage and Rental"
                  className="absolute bottom-0 right-0 h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="bg-black text-white rounded-3xl scroll-reveal premium-card border border-gray-900 overflow-hidden group hover:border-pink-accent/30 transition-all">
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4 pink-accent">Pension Stuf</h3>
                <p className="text-gray-400 mb-8 text-base leading-relaxed">
                  Some light-hearted copy here to support the image
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="/pensio_stuf.png"
                  alt="Pension"
                  className="absolute bottom-0 right-0 h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
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
              Making A Difference
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
              <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Real Impact</p>
              <h3 className="text-3xl sm:text-4xl font-bold text-black mb-8 leading-tight">
                Transforming Young Lives Through Financial Education
              </h3>
              <div className="space-y-8">
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-4xl font-bold text-black mb-2">89%</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Of students report increased confidence in managing personal finances after completing our program
                  </p>
                </div>
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-4xl font-bold text-black mb-2">£2.4M</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Estimated future value created through improved financial decision-making skills
                  </p>
                </div>
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-4xl font-bold text-black mb-2">40+</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Hours of workshop content delivered each week across the UK
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-pink-accent/5 blur-2xl rounded-3xl"></div>
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Impact visualization"
                className="relative rounded-3xl shadow-2xl ring-1 ring-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="workshops" className="bg-black py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Our Programs</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Expert-Led Workshops Tailored for Impact
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From budgeting basics to investment fundamentals, our programs cover the essential skills every young person needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pink-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Money Basics</h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Foundation workshop covering budgeting, saving, and understanding income and expenses. Perfect for students aged 15-16.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-all w-full">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pink-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Spending</h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Learn to make informed purchasing decisions, understand credit, and avoid common financial pitfalls. Ages 16-18.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-all w-full">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl scroll-reveal border border-gray-800 premium-card">
              <div className="bg-pink-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-pink-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Future Planning</h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Introduction to investing, pensions, and long-term financial planning. Designed for students aged 17-19.
              </p>
              <button className="bg-pink-accent text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-all w-full">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-5xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              Workshops in <span className="text-pink-accent">Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From London to Uganda, we're empowering young people with essential financial knowledge through engaging, hands-on workshops.
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
              Want to bring financial education to your school or community?
            </p>
            <a href="#contact" className="inline-block bg-pink-accent text-black px-10 py-4 rounded-full font-bold text-base hover:bg-black hover:text-pink-accent transition-all">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section id="roadmap" className="bg-pink-accent py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-black font-semibold text-sm uppercase tracking-widest mb-6">Our Journey</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Roadmap to Impact
            </h2>
            <p className="text-xl text-black/80 max-w-3xl mx-auto">
              Our strategic plan to expand financial literacy education across the UK
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 1</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Foundation Building</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• Launch pilot programs</li>
                <li>• Partner with initial schools</li>
                <li>• Develop core curriculum</li>
                <li>• Build volunteer network</li>
                <li>• Establish impact metrics</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 2</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Scaling Up</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• Expand to 150+ schools</li>
                <li>• Launch digital platform</li>
                <li>• Train educator network</li>
                <li>• Reach 10,000 students</li>
                <li>• Build corporate partnerships</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 3</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">National Reach</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• Coverage across 12+ counties</li>
                <li>• Regional hubs established</li>
                <li>• Mobile app launch</li>
                <li>• 25,000+ students reached</li>
                <li>• Teacher training program</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl scroll-reveal premium-card shadow-xl">
              <div className="bg-pink-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Phase 4</h3>
              <h4 className="text-lg font-semibold text-black/90 mb-4">Lasting Change</h4>
              <ul className="space-y-2 text-sm text-black/70 leading-relaxed">
                <li>• UK-wide coverage</li>
                <li>• Policy advocacy work</li>
                <li>• International expansion</li>
                <li>• 100,000+ lives changed</li>
                <li>• Self-sustaining model</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Working Together</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with leading organizations to maximize our impact
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-12 lg:p-16 rounded-3xl scroll-reveal border border-gray-200 premium-card">
            <div className="text-center mb-16">
              <p className="text-lg text-gray-700 font-medium">
                We partner with schools, financial institutions, and educational organizations committed to empowering young people
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/BRENT%20LOGO%20%2B%20white%20%2B%20LOGOTYPE%20black%20small.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:514,h:200,cg:true"
                  alt="Brent Council"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/bentley%20logo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Bentley"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Power%20up%20london%20logo.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:334,h:200,cg:true"
                  alt="Power Up London"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/CAF-Logo-Standard.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:320,h:200,cg:true"
                  alt="CAF"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Woodward-Logo-March-2023-374x374.jpg/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Woodward"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/64ee2af5aa132.webp/:/rs=w:916,h:200,cg:true,m/cr=w:916,h:200"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/clothworkers_foundation_navy.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:650,h:200,cg:true"
                  alt="Clothworkers Foundation"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/images%20(2).png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/DiNN%2Blogo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="DiNN"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-fdb8e4a.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:200,h:200,cg:true"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Camden-Giving-cmyk-logo-01-300x133.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:300,h:133,cg:true"
                  alt="Camden Giving"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm premium-card border border-gray-100 flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/living%20wage.jpg/:/rs=w:253,h:200,cg:true,m/cr=w:253,h:200"
                  alt="Living Wage"
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <a href="#contact" className="inline-block bg-pink-accent text-black px-10 py-4 rounded-full font-bold text-base hover:bg-black hover:text-pink-accent transition-all shadow-lg hover:shadow-xl">
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="scroll-reveal">
              <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Get In Touch</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Contact Us
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Have questions or want to get involved? We'd love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-accent/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-pink-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-base">Email</h4>
                    <p className="text-gray-400 text-sm">info@setthemup.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pink-accent/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-pink-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-base">Phone</h4>
                    <p className="text-gray-400 text-sm">Available upon request</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pink-accent/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-pink-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-base">Location</h4>
                    <p className="text-gray-400 text-sm">United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
                <form className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-6 py-4 bg-black text-white border-2 border-gray-700 rounded-2xl focus:border-pink-accent focus:outline-none transition-colors text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-6 py-4 bg-black text-white border-2 border-gray-700 rounded-2xl focus:border-pink-accent focus:outline-none transition-colors text-base"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="w-full px-6 py-4 bg-black text-white border-2 border-gray-700 rounded-2xl focus:border-pink-accent focus:outline-none transition-colors text-base resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pink-accent text-black px-8 py-4 rounded-full font-bold text-base hover:bg-white transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal max-w-4xl mx-auto">
            <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Our Team</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              People Behind The STUF
            </h2>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-black mb-8 scroll-reveal">Founders</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'James Jordan',
                  role: 'Founder & Trustee',
                  bio: 'Ambitious entrepreneur with expertise in Sales and Marketing. Founded STUF to provide financial education to underprivileged children.',
                  quote: 'When I left school at 16, I had no grasp of finance basics...I started STUF because I want to make sure other young people avoid the mistakes I did',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_James.png'
                },
                {
                  name: 'Jermaine Bishop',
                  role: 'Founding Trustee',
                  bio: '15+ years of experience in Tech and Communications sectors. Co-founder focused on providing free financial education to lower-income children.',
                  quote: 'I want to teach children how to manage, save and invest money to open up more opportunities',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Jermaine.png'
                },
              ].map((member) => (
                <div key={member.name} className="bg-black rounded-3xl overflow-hidden scroll-reveal group border border-gray-900">
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
                  bio: '9+ years in financial services across Venture/PE, Corporate Banking, and Wealth Management',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Thomas.png'
                },
                {
                  name: 'Matthew Smith',
                  role: 'Trustee',
                  bio: 'Sports and Business Development expertise with major European tax refund company',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Matthew.png'
                },
                {
                  name: 'Zofia Barnes',
                  role: 'Trustee',
                  bio: '11+ years in Banking and Finance. LSE Masters in Gender Studies, Policy & Inequalities',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Zofia.png'
                },
                {
                  name: 'Paul Mokuolu',
                  role: 'Trustee',
                  bio: 'Decade in financial sector. Technical Specialist at Bank of England',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-c729d57.png/:/cr=t:16.75%25,l:0%25,w:100%25,h:66.5%25/rs=w:365,h:365,cg:true/qt=q:93'
                },
                {
                  name: 'Jalpa Lai',
                  role: 'Trustee',
                  bio: '6+ years mentoring diverse youth, specializing in financial coaching',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-875f474.png/:/cr=t:0%25,l:4.38%25,w:91.25%25,h:100%25/rs=w:365,h:365,cg:true/qt=q:93'
                },
                {
                  name: 'Truman Alberto Sullivan',
                  role: 'Trustee',
                  bio: 'Head of Rugby at Skinners School, Kent. Decade in education sector',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Truman.png'
                },
                {
                  name: 'Tina Creed',
                  role: 'Advisory',
                  bio: '25 years in childcare/education. Former Ark Elvin Academy Governor',
                  image: 'https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Tina.png'
                },
              ].map((member) => (
                <div key={member.name} className="bg-black rounded-3xl overflow-hidden scroll-reveal group border border-gray-900">
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

      <section id="donate" className="bg-black py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-reveal">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Financial Education?
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join 150+ schools across the UK empowering students with essential money skills.
          </p>
          <a href="#contact" className="inline-block bg-pink-accent text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:shadow-xl hover:shadow-pink-accent/20 transition-all">
            Start the Conversation
          </a>
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
                Breaking the cycle of poverty through financial education.
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
