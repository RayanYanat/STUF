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
          color: #F6C1CC;
          font-weight: 700;
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
          color: #F6C1CC;
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

      <header className="bg-pink-accent sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <nav className="flex justify-between items-center py-5 lg:py-6">
            <div className="flex items-center">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-12 lg:h-14"
              />
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#who-we-help" className="text-black font-semibold hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter' }}>Schools</a>
              <a href="#impact" className="text-black font-semibold hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter' }}>Impact</a>
              <a href="#programs" className="text-black font-semibold hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter' }}>Programs</a>
              <a href="#team" className="text-black font-semibold hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter' }}>Team</a>
              <Link to="/contact" className="bg-black text-pink-accent px-6 py-2 font-semibold hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>Contact</Link>
            </div>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="relative bg-black text-white py-32 lg:py-48 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95]">
                MONEY <span className="gradient-text">STUF.</span><br />
                MADE SIMPLE.
              </h1>
              <p className="text-xl text-white mb-12 max-w-xl leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Confused? Who wouldn't be.<br />
                We teach 15–19 year olds the money STUF they should already know.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-pink-accent text-black px-8 py-3 font-semibold text-base hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
                  Get Started
                </Link>
              </div>
            </div>
            <div className="scroll-reveal hidden lg:block">
              <img
                src="/1.jpg"
                alt="Students learning"
                className="rounded-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-black py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              WHY THIS <span className="gradient-text">MATTERS</span>
            </h2>
            <p className="text-2xl text-white max-w-3xl mx-auto" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
              Money problems start young. We're here to fix that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-12 scroll-reveal bg-white group">
              <p className="stat-number mb-4 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={6} isVisible={countersVisible} /> in 10
              </p>
              <p className="text-black text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Don't know how to manage money
              </p>
            </div>

            <div className="p-12 scroll-reveal bg-white group">
              <p className="stat-number mb-4 group-hover:scale-105 transition-transform">
                -<CountUpAnimation end={10} isVisible={countersVisible} />%
              </p>
              <p className="text-black text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Mental health impact from money stress
              </p>
            </div>

            <div className="p-12 scroll-reveal bg-white group">
              <p className="stat-number mb-4 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
              </p>
              <p className="text-black text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                UK people living in poverty
              </p>
            </div>

            <div className="p-12 scroll-reveal bg-white group">
              <p className="stat-number mb-4 group-hover:scale-105 transition-transform">
                1 in <CountUpAnimation end={22} isVisible={countersVisible} />
              </p>
              <p className="text-black text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Without a stable home
              </p>
            </div>

            <div className="p-12 scroll-reveal bg-white group">
              <p className="stat-number mb-4 group-hover:scale-105 transition-transform">
                <CountUpAnimation end={126} suffix="K" isVisible={countersVisible} />
              </p>
              <p className="text-black text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Young people homeless
              </p>
            </div>

            <div className="bg-pink-accent p-12 scroll-reveal group">
              <Heart className="w-16 h-16 text-black mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-black text-lg font-semibold" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                We're breaking the cycle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-10 leading-[1.05]">
                THE <span className="gradient-text">BASICS</span> THEY NEVER TAUGHT YOU
              </h2>
              <p className="text-xl text-black leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Budgets. Savings. Investments. Mortgages.
              </p>
              <p className="text-xl text-black leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                We teach the financial STUF schools skip. Real skills. No jargon.
              </p>
            </div>
            <div className="scroll-reveal">
              <img
                src="/6.jpg"
                alt="Teaching financial literacy"
                className="rounded-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="bg-white py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              WHO WE <span className="gradient-text">WORK WITH</span>
            </h2>
            <p className="text-2xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
              Schools. Funders. Partners who get it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-black p-12 scroll-reveal premium-card">
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>SCHOOLS</h3>
              <p className="text-white text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Real workshops. Real impact. Fits your timetable.
              </p>
              <a href="#contact" className="text-pink-accent font-semibold text-sm hover:underline" style={{ fontFamily: 'Inter' }}>
                Get started →
              </a>
            </div>

            <div className="bg-black p-12 scroll-reveal premium-card">
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>FUNDERS</h3>
              <p className="text-white text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Proven results. Measurable change. Your money matters.
              </p>
              <Link to="/impact-reports" className="text-pink-accent font-semibold text-sm hover:underline" style={{ fontFamily: 'Inter' }}>
                See the impact →
              </Link>
            </div>

            <div className="bg-black p-12 scroll-reveal premium-card">
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PARTNERS</h3>
              <p className="text-white text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Join the movement. Make it count.
              </p>
              <a href="#contact" className="text-pink-accent font-semibold text-sm hover:underline" style={{ fontFamily: 'Inter' }}>
                Let's talk →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-pink-accent py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              HOW IT <span className="text-white">WORKS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center scroll-reveal">
              <div className="w-24 h-24 bg-black text-pink-accent flex items-center justify-center text-4xl font-bold mx-auto mb-6" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>
                1
              </div>
              <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>CONNECT</h3>
              <p className="text-black leading-relaxed text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Tell us what you need. We make it work.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-24 h-24 bg-black text-pink-accent flex items-center justify-center text-4xl font-bold mx-auto mb-6" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>
                2
              </div>
              <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>DELIVER</h3>
              <p className="text-black leading-relaxed text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Real experts. Real talk. No boring lectures.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-24 h-24 bg-black text-pink-accent flex items-center justify-center text-4xl font-bold mx-auto mb-6" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>
                3
              </div>
              <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>IMPACT</h3>
              <p className="text-black leading-relaxed text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Track progress. See results. Change lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-black py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[45%_55%] gap-16 items-start">
            <div className="scroll-reveal lg:sticky lg:top-32">
              <h2 className="text-6xl sm:text-7xl font-bold text-white mb-10 leading-[1]" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>
                ALL THE MONEY <span className="gradient-text">STUF</span>
              </h2>
              <p className="text-xl text-white leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                From saving your first pound to buying your first home. We've got it covered.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white scroll-reveal group transition-all duration-300 flex items-center justify-between relative overflow-visible p-10">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-black" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>INVESTMENT STUF</h3>
                  <p className="text-black text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Make your money work harder
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 font-semibold text-sm hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
                    Learn more
                  </button>
                </div>
                <div className="w-40 h-40 flex-shrink-0 -mr-8 transform group-hover:scale-110 transition-all duration-500">
                  <img
                    src="/investment_stuf.png"
                    alt="Investment"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="bg-white scroll-reveal group transition-all duration-300 flex items-center justify-between relative overflow-visible p-10">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-black" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PLANNING STUF</h3>
                  <p className="text-black text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Budget like a boss
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 font-semibold text-sm hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
                    Learn more
                  </button>
                </div>
                <div className="w-40 h-40 flex-shrink-0 -mr-8 transform group-hover:scale-110 transition-all duration-500">
                  <img
                    src="/financial_planning_stuf.png"
                    alt="Financial Planning"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="bg-white scroll-reveal group transition-all duration-300 flex items-center justify-between relative overflow-visible p-10">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-black" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>MORTGAGE STUF</h3>
                  <p className="text-black text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Get on the property ladder
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 font-semibold text-sm hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
                    Learn more
                  </button>
                </div>
                <div className="w-40 h-40 flex-shrink-0 -mr-8 transform group-hover:scale-110 transition-all duration-500">
                  <img
                    src="/mortgage_rental_stuf.png"
                    alt="Mortgage and Rental"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="bg-white scroll-reveal group transition-all duration-300 flex items-center justify-between relative overflow-visible p-10">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-black" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PENSION STUF</h3>
                  <p className="text-black text-base leading-relaxed mb-6" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Sort your future self out
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 font-semibold text-sm hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
                    Learn more
                  </button>
                </div>
                <div className="w-40 h-40 flex-shrink-0 -mr-8 transform group-hover:scale-110 transition-all duration-500">
                  <img
                    src="/pensio_stuf.png"
                    alt="Pension"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-white py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              THE <span className="gradient-text">NUMBERS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            <div className="bg-black p-12 scroll-reveal text-center premium-card">
              <div className="stat-number text-pink-accent mb-4">10,000+</div>
              <p className="text-lg font-semibold text-white" style={{ fontFamily: 'Inter' }}>Students Reached</p>
            </div>
            <div className="bg-black p-12 scroll-reveal text-center premium-card">
              <div className="stat-number text-pink-accent mb-4">150+</div>
              <p className="text-lg font-semibold text-white" style={{ fontFamily: 'Inter' }}>Partner Schools</p>
            </div>
            <div className="bg-black p-12 scroll-reveal text-center premium-card">
              <div className="stat-number text-pink-accent mb-4">95%</div>
              <p className="text-lg font-semibold text-white" style={{ fontFamily: 'Inter' }}>Satisfaction Rate</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center scroll-reveal">
            <div>
              <h3 className="text-4xl sm:text-5xl font-bold text-black mb-10 leading-tight" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>
                REAL CHANGE. REAL FAST.
              </h3>
              <div className="space-y-8">
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-5xl font-bold text-black mb-2" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>89%</h4>
                  <p className="text-black leading-relaxed text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Feel more confident about money after one workshop
                  </p>
                </div>
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-5xl font-bold text-black mb-2" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>£2.4M</h4>
                  <p className="text-black leading-relaxed text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Future value we've helped create
                  </p>
                </div>
                <div className="border-l-4 border-pink-accent pl-6">
                  <h4 className="text-5xl font-bold text-black mb-2" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>40+</h4>
                  <p className="text-black leading-relaxed text-lg" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                    Hours delivered weekly across the UK
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/7.jpg"
                alt="Impact visualization"
                className="rounded-none"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="bg-black py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-5xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              STUF IN <span className="gradient-text">ACTION</span>
            </h2>
            <p className="text-2xl text-white max-w-4xl mx-auto" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
              London to Uganda. Real workshops. Real impact.
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

          <div className="mt-20 text-center scroll-reveal">
            <p className="text-white text-2xl mb-10" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
              Want this at your school?
            </p>
            <a href="#contact" className="inline-block bg-pink-accent text-black px-8 py-3 font-semibold text-base hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section id="roadmap" className="bg-white py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              WHERE WE'RE <span className="gradient-text">HEADING</span>
            </h2>
            <p className="text-2xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
              Four phases. One mission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black p-10 scroll-reveal premium-card">
              <h3 className="text-4xl font-bold text-pink-accent mb-3" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PHASE 1</h3>
              <h4 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Inter' }}>Build It</h4>
              <ul className="space-y-2 text-base text-white leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                <li>Launch pilots</li>
                <li>Find schools</li>
                <li>Create content</li>
                <li>Test & refine</li>
              </ul>
            </div>

            <div className="bg-black p-10 scroll-reveal premium-card">
              <h3 className="text-4xl font-bold text-pink-accent mb-3" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PHASE 2</h3>
              <h4 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Inter' }}>Scale It</h4>
              <ul className="space-y-2 text-base text-white leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                <li>150+ schools</li>
                <li>Digital tools</li>
                <li>10K students</li>
                <li>More partners</li>
              </ul>
            </div>

            <div className="bg-black p-10 scroll-reveal premium-card">
              <h3 className="text-4xl font-bold text-pink-accent mb-3" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PHASE 3</h3>
              <h4 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Inter' }}>Go National</h4>
              <ul className="space-y-2 text-base text-white leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                <li>12+ counties</li>
                <li>Regional hubs</li>
                <li>25K+ students</li>
                <li>Mobile app</li>
              </ul>
            </div>

            <div className="bg-black p-10 scroll-reveal premium-card">
              <h3 className="text-4xl font-bold text-pink-accent mb-3" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>PHASE 4</h3>
              <h4 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Inter' }}>Change Everything</h4>
              <ul className="space-y-2 text-base text-white leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                <li>UK-wide</li>
                <li>Policy work</li>
                <li>100K+ lives</li>
                <li>Go global</li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      <section id="team" className="bg-pink-accent py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              PEOPLE BEHIND THE <span className="text-white">STUF</span>
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

      <section id="partners" className="bg-white py-32 lg:py-40">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 scroll-reveal max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              WHO'S <span className="gradient-text">WITH US</span>
            </h2>
            <p className="text-2xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
              Big names. Bigger impact.
            </p>
          </div>

          <div className="bg-black p-12 lg:p-16 scroll-reveal premium-card">
            <div className="text-center mb-16">
              <p className="text-xl text-white font-medium" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Schools. Banks. Organizations who care.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/BRENT%20LOGO%20%2B%20white%20%2B%20LOGOTYPE%20black%20small.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:514,h:200,cg:true"
                  alt="Brent Council"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/bentley%20logo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Bentley"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Power%20up%20london%20logo.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:334,h:200,cg:true"
                  alt="Power Up London"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/CAF-Logo-Standard.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:320,h:200,cg:true"
                  alt="CAF"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Woodward-Logo-March-2023-374x374.jpg/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Woodward"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/64ee2af5aa132.webp/:/rs=w:916,h:200,cg:true,m/cr=w:916,h:200"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/clothworkers_foundation_navy.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:650,h:200,cg:true"
                  alt="Clothworkers Foundation"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/images%20(2).png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/DiNN%2Blogo.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200"
                  alt="DiNN"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/blob-fdb8e4a.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:200,h:200,cg:true"
                  alt="Partner"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Camden-Giving-cmyk-logo-01-300x133.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:300,h:133,cg:true"
                  alt="Camden Giving"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>

              <div className="bg-white p-6 premium-card flex items-center justify-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/living%20wage.jpg/:/rs=w:253,h:200,cg:true,m/cr=w:253,h:200"
                  alt="Living Wage"
                  className="max-h-16 w-auto object-contain transition-all duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <a href="#contact" className="inline-block bg-pink-accent text-black px-8 py-3 font-semibold text-base hover:opacity-85 transition-opacity" style={{ fontFamily: 'Inter' }}>
                Join Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-14 mb-6 brightness-0 invert"
              />
              <p className="text-white text-base leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                Breaking the cycle.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-5 text-lg" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>LINKS</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>About</a></li>
                <li><a href="#programs" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>Programs</a></li>
                <li><a href="#team" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>Team</a></li>
                <li><Link to="/impact-reports" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>Impact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-5 text-lg" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>GET INVOLVED</h4>
              <ul className="space-y-3">
                <li><a href="#donate" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>Donate</a></li>
                <li><a href="#" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>Volunteer</a></li>
                <li><a href="#" className="text-white hover:text-pink-accent transition-colors text-base" style={{ fontFamily: 'Inter' }}>Partner</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-5 text-lg" style={{ fontFamily: "'Veneer', 'Impact', sans-serif" }}>CONTACT</h4>
              <p className="text-white text-base leading-relaxed" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                info@setthemup.org
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter' }}>
              © 2024 STUF. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
