import { useState, useEffect } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const CountUpAnimation = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersVisible) return;
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [countersVisible, end, duration]);

    return <>{count}{suffix}</>;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setCountersVisible(true);
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out 0.2s both; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .scroll-reveal { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .scroll-reveal.animate-in { opacity: 1; transform: translateY(0); }
        .gradient-text {
          background: linear-gradient(135deg, #EEBDC2 0%, #D4A5AB 50%, #EEBDC2 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .glow-effect {
          box-shadow: 0 0 20px rgba(238, 189, 194, 0.3);
        }
      `}</style>

      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex justify-between items-center py-5">
            <div className="flex items-center gap-3">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="Set Them Up Foundation"
                className="h-12 transition-transform duration-300 hover:scale-110 hover:rotate-2"
              />
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#who-we-help" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 hover:translate-y-[-2px] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">Who We Help</a>
              <a href="#programs" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 hover:translate-y-[-2px] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">Programs</a>
              <a href="#team" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 hover:translate-y-[-2px] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">Team</a>
              <a href="#roadmap" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 hover:translate-y-[-2px] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">Roadmap</a>
              <a href="#donate" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 hover:translate-y-[-2px] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">Donate</a>
            </div>
            <a href="mailto:hello@stuf.org.uk" className="px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 glow-effect" style={{ backgroundColor: '#EEBDC2', color: '#161616' }}>Contact Us</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 50%, #EEBDC2 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center py-20">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold" style={{ color: '#161616' }}>
                🎓 Empowering 15-19 Year Olds Since 2022
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight" style={{ letterSpacing: '-2px', color: '#161616' }}>
                We've got the <span className="gradient-text">money stuf</span> covered
              </h1>
              <p className="text-xl md:text-2xl mb-10 leading-relaxed" style={{ color: '#161616', opacity: 0.9 }}>
                Making money stuf simple for young people. We help students get a handle on the fundamentals of finance through partnerships with educational and financial institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#partner" className="group bg-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 inline-block text-center active:scale-95 relative overflow-hidden" style={{ color: '#161616' }}>
                  <span className="relative z-10">Partner with Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </a>
                <a href="#schools" className="bg-black/10 backdrop-blur-sm px-10 py-5 rounded-xl font-bold text-lg hover:bg-black/20 transition-all duration-300 inline-block text-center active:scale-95 hover:-translate-y-2 hover:shadow-xl" style={{ color: '#161616' }}>
                  Bring STUF to Your School
                </a>
              </div>
            </div>
            <div className="animate-fade-in-right hidden md:block">
              <div className="relative group">
                <div className="absolute -inset-4 bg-white rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-2xl"></div>
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/STUF_Image_Images_Website.png/:/cr=t:1.33%25,l:0%25,w:100%25,h:97.34%25/rs=w:1240,h:620,cg:true"
                  alt="Making money stuf simple for young people"
                  className="relative rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      <section id="stats" className="bg-white py-16 border-b border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group cursor-default scroll-reveal">
              <span className="text-6xl font-extrabold block mb-3 transition-all duration-500 group-hover:scale-125" style={{ letterSpacing: '-2px', color: '#EEBDC2' }}>
                <CountUpAnimation end={11} suffix=".5M" />
              </span>
              <span className="text-base text-gray-600 font-semibold transition-colors duration-300 group-hover:text-gray-900">UK residents with under £100 in savings</span>
            </div>
            <div className="group cursor-default scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="text-6xl font-extrabold block mb-3 transition-all duration-500 group-hover:scale-125" style={{ letterSpacing: '-2px', color: '#EEBDC2' }}>
                <CountUpAnimation end={22} suffix="%" />
              </span>
              <span className="text-base text-gray-600 font-semibold transition-colors duration-300 group-hover:text-gray-900">Live below minimum decent living standards</span>
            </div>
            <div className="group cursor-default scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <span className="text-6xl font-extrabold block mb-3 transition-all duration-500 group-hover:scale-125" style={{ letterSpacing: '-2px', color: '#EEBDC2' }}>6 in 10</span>
              <span className="text-base text-gray-600 font-semibold transition-colors duration-300 group-hover:text-gray-900">Feel lacking money management skills</span>
            </div>
            <div className="group cursor-default scroll-reveal" style={{ transitionDelay: '0.3s' }}>
              <span className="text-6xl font-extrabold block mb-3 transition-all duration-500 group-hover:scale-125" style={{ letterSpacing: '-2px', color: '#EEBDC2' }}>
                <CountUpAnimation end={8} suffix="M" />
              </span>
              <span className="text-base text-gray-600 font-semibold transition-colors duration-300 group-hover:text-gray-900">In serious UK debt</span>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="bg-gray-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Who We Help</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              Breaking the cycle of poverty through <span className="gradient-text">financial education</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Providing lifelong skills, understanding and access to previously closed off worlds of money for disadvantaged youth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 scroll-reveal">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)' }}>🏫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-gray-700">Schools & Colleges</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bring engaging, curriculum-aligned financial literacy workshops to your students. Our expert-led sessions fit seamlessly into your timetable.
              </p>
              <a href="#schools" className="font-bold text-sm inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-4" style={{ color: '#EEBDC2' }}>
                Learn more
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="group bg-white p-10 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)' }}>🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-gray-700">Youth Organizations</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Partner with us to offer financial education programs that complement your existing youth development initiatives.
              </p>
              <a href="#youth" className="font-bold text-sm inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-4" style={{ color: '#EEBDC2' }}>
                Partner with us
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="group bg-white p-10 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)' }}>👥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-gray-700">Young People</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access free workshops, mentorship programs, and resources to build your financial confidence and independence.
              </p>
              <a href="#youth-programs" className="font-bold text-sm inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-4" style={{ color: '#EEBDC2' }}>
                Get involved
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Our Programs</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              What <span className="gradient-text">We Offer</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group scroll-reveal">
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Financial Literacy Workshops"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-3xl font-bold text-white mb-3">Financial Literacy Workshops</h3>
                  <p className="text-white/90 text-lg mb-4 leading-relaxed">
                    Interactive sessions covering budgeting, saving, investing, and real-world financial decision-making.
                  </p>
                  <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                    Learn more
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Mentorship Programs"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-3xl font-bold text-white mb-3">Mentorship Programs</h3>
                  <p className="text-white/90 text-lg mb-4 leading-relaxed">
                    One-on-one guidance from finance professionals helping young people navigate their financial journey.
                  </p>
                  <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                    Get a mentor
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Our Team</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              Meet the People Behind <span className="gradient-text">STUF</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A dedicated team of financial experts, educators, and change-makers committed to transforming financial education.
            </p>
          </div>

          <div className="mb-24">
            <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center scroll-reveal">Founders</h3>
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
            <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center scroll-reveal">Board Members</h3>
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

      <section id="workshop-locations" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 scroll-reveal">
            <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>Workshop Locations</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-2px' }}>
              Serving Communities <span className="gradient-text">Across the UK</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We've delivered workshops in schools and communities across England, with expansion plans for nationwide and international coverage.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Bristol', 'Brent', 'Barnet', 'Bushey', 'Camden', 'Croydon', 'Harrow', 'Kensington & Chelsea', 'Kent', 'Southwark', 'King College', 'Uganda'].map((location, idx) => (
              <div key={location} className="group scroll-reveal" style={{ transitionDelay: `${idx * 0.03}s` }}>
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl text-center font-bold text-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-default border-4 border-transparent hover:border-opacity-100" style={{ borderTopColor: '#EEBDC2' }}>
                  <span className="text-2xl mb-2 block group-hover:scale-125 transition-transform duration-300">📍</span>
                  {location}
                </div>
              </div>
            ))}
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

      <section className="py-32 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEBDC2 0%, #F5D4D8 50%, #EEBDC2 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight" style={{ letterSpacing: '-2px', color: '#161616' }}>
            Ready to Transform <span className="gradient-text">Financial Education?</span>
          </h2>
          <p className="text-2xl mb-12 leading-relaxed" style={{ color: '#161616', opacity: 0.9 }}>
            Join schools and partners across the UK empowering students with essential money skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:hello@stuf.org.uk" className="group bg-white px-12 py-6 rounded-xl font-bold text-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 inline-block active:scale-95 relative overflow-hidden" style={{ color: '#161616' }}>
              <span className="relative z-10 flex items-center gap-3">
                ✉️ Email: hello@stuf.org.uk
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a href="mailto:info@ug-stuf.com" className="bg-black/10 backdrop-blur-sm px-12 py-6 rounded-xl font-bold text-xl hover:bg-black/20 transition-all duration-300 inline-block active:scale-95 hover:-translate-y-2 hover:shadow-xl flex items-center gap-3" style={{ color: '#161616' }}>
              🌍 Uganda: info@ug-stuf.com
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] bg-repeat"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6">Set Them Up Foundation</h3>
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                A UK-based charity dedicated to empowering young people with the financial skills they need to thrive in the modern world.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-125 hover:-translate-y-1" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)' }}>📘</a>
                <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-125 hover:-translate-y-1" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)' }}>🐦</a>
                <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-125 hover:-translate-y-1" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)' }}>💼</a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#who-we-help" className="text-white/70 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 inline-block">Who We Help</a></li>
                <li><a href="#programs" className="text-white/70 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 inline-block">Programs</a></li>
                <li><a href="#team" className="text-white/70 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 inline-block">Team</a></li>
                <li><a href="#donate" className="text-white/70 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 inline-block">Donate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-lg">
                <li className="text-white/70">hello@stuf.org.uk</li>
                <li className="text-white/70">info@ug-stuf.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60 text-lg">© 2025 Set Them Up Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
