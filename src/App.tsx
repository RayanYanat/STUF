import { useState, useEffect, useRef } from 'react';
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

        .diagonal-text {
          writing-mode: horizontal-tb;
          transform: rotate(-15deg);
          transform-origin: center;
        }
      `}</style>

      <header className="bg-pink-accent sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-16"
              />
            </div>
            <div className="hidden lg:block">
              <div className="w-12 h-1 bg-black mb-2"></div>
              <div className="w-12 h-1 bg-black mb-2"></div>
              <div className="w-12 h-1 bg-black"></div>
            </div>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="relative bg-black min-h-[600px] lg:min-h-[830px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-white leading-[0.85] select-none">
            <h1 className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold mb-0 opacity-90">
              INVESTMENTS
            </h1>
            <h1 className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold mb-0 opacity-90 ml-12">
              TAXES PENSIONS
            </h1>
            <h1 className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold mb-0 opacity-90">
              RENT
            </h1>
            <h1 className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold mb-0 opacity-90 ml-24">
              MORTGAGES
            </h1>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-accent px-12 py-6 rotate-[-15deg] z-10">
          <h2 className="text-[60px] sm:text-[80px] lg:text-[120px] font-bold text-black leading-none">
            CONFUSED?
          </h2>
        </div>
      </section>

      <section id="stats" className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 scroll-reveal">
            <p className="text-white text-sm font-bold uppercase tracking-wider mb-6">Why we're here</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Important STUF
            </h2>
            <p className="text-white text-xl max-w-md leading-relaxed">
              Financial literacy is still out of reach for millions of young people.
              <br /><br />
              We're here to change that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="scroll-reveal">
              <p className="text-white font-bold text-xl mb-4">Financial literacy</p>
              <p className="text-[80px] lg:text-[120px] font-bold leading-none mb-4 pink-accent">
                6 in 10
              </p>
              <p className="text-white text-xl">
                6 in 10 UK people feel they don't have the skills to manage their money properly
              </p>
            </div>

            <div className="scroll-reveal">
              <p className="text-white font-bold text-xl mb-4">Mental wellbeing</p>
              <p className="text-[80px] lg:text-[120px] font-bold leading-none mb-4 pink-accent">
                -10%
              </p>
              <p className="text-white text-xl">
                10% lower mental wellbeing scores for people with lower levels of financial literacy
              </p>
            </div>

            <div className="scroll-reveal">
              <p className="text-white font-bold text-xl mb-4">Lifting people out of poverty</p>
              <p className="text-[80px] lg:text-[120px] font-bold leading-none mb-4 pink-accent">
                <CountUpAnimation end={22} suffix="%" isVisible={countersVisible} />
              </p>
              <p className="text-white text-xl">
                22% of people in the UK live in poverty
              </p>
            </div>

            <div className="scroll-reveal">
              <p className="text-white font-bold text-xl mb-4">Houselessness</p>
              <p className="text-[80px] lg:text-[120px] font-bold leading-none mb-4 pink-accent">
                1 in 22
              </p>
              <p className="text-white text-xl">
                1 in every 22 people lack a home (in some places in England)
              </p>
            </div>

            <div className="scroll-reveal">
              <p className="text-white font-bold text-xl mb-4">Young homelessness</p>
              <p className="text-[80px] lg:text-[120px] font-bold leading-none mb-4 pink-accent">
                <CountUpAnimation end={126} suffix=",000" isVisible={countersVisible} />
              </p>
              <p className="text-white text-xl">
                126,000 homeless under-18s in the UK
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="bg-pink-accent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 scroll-reveal">
            <p className="text-black text-sm font-bold uppercase tracking-wider mb-6">What we do</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8">
              We've got the money STUF covered
            </h2>
            <p className="text-black text-xl max-w-2xl leading-relaxed">
              The Set Them Up Foundation are on a mission to help young people; their teachers and parents, get a handle on the fundamentals of finance. By working with schools, banks, and other likeminded partners we provide lifelong skills, understanding and access to previously closed off worlds of money – so that one day, we can break the cycle of poverty for good.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-6 mt-16">
            <div className="bg-black p-8 lg:p-12 scroll-reveal flex justify-between items-center">
              <div className="max-w-md">
                <h3 className="text-2xl lg:text-3xl font-bold pink-accent mb-4">Investment Stuf</h3>
                <p className="text-white text-xl mb-6">
                  Learn how to grow your money and make it work for you.
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="hidden lg:block w-48 h-48 bg-white/10"></div>
            </div>

            <div className="bg-black p-8 lg:p-12 scroll-reveal flex justify-between items-center">
              <div className="max-w-md">
                <h3 className="text-2xl lg:text-3xl font-bold pink-accent mb-4">Financial planning Stuf</h3>
                <p className="text-white text-xl mb-6">
                  Master budgeting, saving, and planning for your future.
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="hidden lg:block w-48 h-48 bg-white/10"></div>
            </div>

            <div className="bg-black p-8 lg:p-12 scroll-reveal flex justify-between items-center">
              <div className="max-w-md">
                <h3 className="text-2xl lg:text-3xl font-bold pink-accent mb-4">Mortgage and rental Stuf</h3>
                <p className="text-white text-xl mb-6">
                  Get your own place. Understand the process.
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="hidden lg:block w-48 h-48 bg-white/10"></div>
            </div>

            <div className="bg-black p-8 lg:p-12 scroll-reveal flex justify-between items-center">
              <div className="max-w-md">
                <h3 className="text-2xl lg:text-3xl font-bold pink-accent mb-4">Pension Stuf</h3>
                <p className="text-white text-xl mb-6">
                  Plan for retirement. Future you will thank you.
                </p>
                <button className="bg-pink-accent text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white transition-all">
                  Learn more
                </button>
              </div>
              <div className="hidden lg:block w-48 h-48 bg-white/10"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 scroll-reveal">
            <p className="text-black text-sm font-bold uppercase tracking-wider mb-6">Our team</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8">
              People behind the STUF
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black p-0 overflow-hidden scroll-reveal group">
              <div className="flex items-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Jermaine.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                  alt="Jermaine Bishop"
                  className="w-1/2 h-96 object-cover grayscale"
                />
                <div className="p-8 w-1/2">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">Jermaine Bishop</span> <span className="text-white">Founding Trustee</span>
                  </h3>
                  <p className="text-white text-xl mb-6">
                    15+ years in Tech and Communications. Co-founder focused on free financial education.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm uppercase">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black p-0 overflow-hidden scroll-reveal group">
              <div className="flex items-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_James.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
                  alt="James Jordan"
                  className="w-1/2 h-96 object-cover grayscale"
                />
                <div className="p-8 w-1/2">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">James M. Jordan</span> <span className="text-white">Founding Trustee</span>
                  </h3>
                  <p className="text-white text-xl mb-6">
                    Entrepreneur with Sales and Marketing expertise. Founded STUF to help young people.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm uppercase">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black p-0 overflow-hidden scroll-reveal group">
              <div className="flex items-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Tina.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true"
                  alt="Tina Creed"
                  className="w-1/2 h-96 object-cover grayscale"
                />
                <div className="p-8 w-1/2">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">Tina Creed</span> <span className="text-white">Trustee</span>
                  </h3>
                  <p className="text-white text-xl mb-6">
                    25 years in childcare/education. Former Ark Elvin Academy Governor.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm uppercase">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black p-0 overflow-hidden scroll-reveal group">
              <div className="flex items-center">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Headshots_Truman.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true"
                  alt="Truman Alberto Sullivan"
                  className="w-1/2 h-96 object-cover grayscale"
                />
                <div className="p-8 w-1/2">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="pink-accent">Truman Alberto Sullivan</span> <span className="text-white">Trustee</span>
                  </h3>
                  <p className="text-white text-xl mb-6">
                    Head of Rugby at Skinners School, Kent. Decade in education sector.
                  </p>
                  <button className="bg-pink-accent text-black px-6 py-2 rounded-full font-bold text-sm uppercase">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 scroll-reveal">
            <p className="text-white text-sm font-bold uppercase tracking-wider mb-6">Latest news</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold pink-accent mb-8">
              Hot (off the press) STUF
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 scroll-reveal">
              <p className="text-gray-500 text-sm mb-4">Twitter</p>
              <p className="text-black text-xl font-bold mb-2">Set Them Up Foundation</p>
              <p className="text-black text-lg leading-relaxed mb-4">
                We're excited to announce our latest partnership bringing financial education to 1,000 more students this year. #STUF #FinancialLiteracy
              </p>
              <p className="text-gray-500 text-sm">5:30pm 8 Oct 2022</p>
            </div>

            <div className="bg-white scroll-reveal overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-8">
                <p className="text-black text-xl font-bold mb-4">
                  Event title to go here
                </p>
                <p className="text-black text-lg mb-4">
                  Some text about an upcoming event would go in here and here #STUFconference
                </p>
                <p className="text-gray-500 text-sm">5:30pm 8 Oct 2022</p>
              </div>
            </div>

            <div className="bg-black border-4 border-pink-accent p-8 scroll-reveal">
              <p className="text-white text-sm mb-2">News</p>
              <p className="pink-accent text-2xl font-bold mb-4">
                Working with local communities
              </p>
              <p className="text-white text-lg leading-relaxed mb-4">
                Some text about an goes in here about our community outreach programs and local partnerships.
              </p>
              <p className="text-gray-400 text-sm">5:30pm 8 Oct 2022</p>
            </div>
          </div>

          <div className="text-right mt-8">
            <Link to="#" className="text-white text-lg hover:text-pink-accent transition-colors">
              View all news →
            </Link>
          </div>
        </div>
      </section>

      <section id="roadmap" className="bg-pink-accent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 scroll-reveal">
            <p className="text-black text-sm font-bold uppercase tracking-wider mb-6">Our roadmap</p>
            <div className="flex justify-between items-start">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black">
                STUF to come
              </h2>
              <p className="text-black text-lg max-w-2xl ml-12 hidden lg:block">
                The Set Them Up Foundation are on a mission to help young people; their teachers and parents, get a handle on the fundamentals of finance.
              </p>
            </div>
          </div>

          <div className="space-y-8 mt-16">
            {[
              {
                year: '2022',
                items: ['Set up of the foundation', 'Production of the syllabus']
              },
              {
                year: '2023',
                items: ['Delivering the course; Wembley, London, Manchester and Birmingham', 'Mentorship programme begins', 'E-learning syllabus completed']
              },
              {
                year: '2024',
                items: ['Reach accreditation', 'Delivering the course; Leeds, Glasgow, Southampton, Liverpool and Newcastle', 'Apprentice and Employment programme begins']
              },
              {
                year: '2025',
                items: ['Become a necessary curriculum lesson', 'Coverage across the United Kingdom offering financial education to all schools', 'Worldwide outreach']
              }
            ].map((item, idx) => (
              <div key={idx} className="border-t border-black pt-4 scroll-reveal">
                <div className="flex items-start gap-8">
                  <div className="bg-black text-white px-8 py-2 font-bold text-lg">
                    {item.year}
                  </div>
                  <ul className="flex-1 space-y-2 text-black text-lg lg:text-xl">
                    {item.items.map((text, i) => (
                      <li key={i}>— {text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 scroll-reveal">
            <p className="text-black text-sm font-bold uppercase tracking-wider mb-6">Our partners</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8">
              Collaboration STUF
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
              <div key={idx} className="aspect-square rounded-full bg-gray-200 flex items-center justify-center scroll-reveal">
                <span className="text-gray-400 text-xl">logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-12 scroll-reveal">
            Help us make STUF happen
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal">
              <label className="text-white font-bold text-lg block mb-4">Enter your email</label>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 text-lg border-2 border-white bg-transparent text-white placeholder-gray-400"
                />
                <button className="bg-pink-accent text-black px-8 py-4 font-bold text-lg hover:bg-white transition-all whitespace-nowrap">
                  Subscribe to our newsletter
                </button>
              </div>
            </div>

            <div className="scroll-reveal flex items-end justify-end">
              <Link to="#donate" className="bg-pink-accent text-black px-12 py-6 font-bold text-xl hover:bg-white transition-all inline-block">
                Donate to STUF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
