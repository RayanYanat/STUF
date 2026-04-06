import { ArrowLeft, Download, ExternalLink, BarChart3, Target, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ImpactReports() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(135deg, #EEBDC2 0%, #C9969E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          transition: left 0.5s;
        }

        .shine-effect:hover::before {
          left: 100%;
        }

        .premium-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-card:hover {
          transform: translateY(-8px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: '#161616' }}>
        <header className="backdrop-blur-2xl border-b border-gray-800/50 sticky top-0 z-50 transition-all duration-500" style={{ backgroundColor: 'rgba(22, 22, 22, 0.95)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center py-6 sm:py-7">
              <Link to="/" className="flex items-center gap-3 animate-slide-in group">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                  alt="Set Them Up Foundation"
                  className="h-11 sm:h-13 md:h-16 transition-all duration-500 group-hover:scale-110 filter drop-shadow-md"
                />
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-xl hover:scale-105 text-white border-2 hover:bg-white hover:text-black shine-effect"
                style={{ borderColor: '#EEBDC2' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </nav>
          </div>
        </header>

        <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#EEBDC2' }}></div>
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl animate-float" style={{ backgroundColor: '#F5D4D8', animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24 scroll-reveal">
              <span className="inline-block px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider mb-8" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)', color: '#EEBDC2' }}>
                OUR IMPACT
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-[1.15]">
                Impact <span className="gradient-text">Reports</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed font-light">
                Transparency and accountability in our mission to transform financial education for young people across the UK
              </p>
            </div>

          <div className="max-w-5xl mx-auto">
            <div className="group scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-pink-accent/50 transition-all duration-500 premium-card" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-accent/20 to-pink-accent/5 z-10"></div>
                    <img
                      src="/PHOTO-2025-08-06-12-15-28_(2).jpg"
                      alt="Money Matters Academy Impact Report 2025"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#EEBDC2' }}>
                          Latest Report
                        </div>
                        <span className="text-sm font-semibold text-gray-500">2025</span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Money Matters Academy Impact Report 2025
                      </h2>

                      <p className="text-gray-400 leading-relaxed text-base lg:text-lg mb-8 font-light">
                        In partnership with Investec, we delivered the Money Matters Academy to 20 young people from Newham College in East London. This comprehensive report showcases measurable improvements in financial capability, confidence, and behavioural intention among participants.
                      </p>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/STUF_PDF_FINALE_REPORT.pdf"
                        download
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:scale-105 shine-effect"
                        style={{ backgroundColor: '#EEBDC2', color: '#161616' }}
                      >
                        <Download className="w-5 h-5" />
                        Download Report
                      </a>
                      <a
                        href="/STUF_PDF_FINALE_REPORT.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-white hover:text-black border-2 text-white shine-effect"
                        style={{ borderColor: '#EEBDC2' }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Online
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 scroll-reveal" style={{ transitionDelay: '0.4s' }}>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
                Why We Share Our Impact
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-8 rounded-2xl transition-all duration-500 border border-gray-800 hover:border-pink-accent/50 premium-card" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)' }}>
                    <BarChart3 className="w-7 h-7" style={{ color: '#EEBDC2' }} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Transparency</h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Open reporting on our activities, reach, and outcomes to build trust with partners and supporters
                  </p>
                </div>
                <div className="p-8 rounded-2xl transition-all duration-500 border border-gray-800 hover:border-pink-accent/50 premium-card" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)' }}>
                    <Target className="w-7 h-7" style={{ color: '#EEBDC2' }} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Accountability</h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Demonstrating responsible stewardship of resources and commitment to our mission
                  </p>
                </div>
                <div className="p-8 rounded-2xl transition-all duration-500 border border-gray-800 hover:border-pink-accent/50 premium-card" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(238, 189, 194, 0.15)' }}>
                    <TrendingUp className="w-7 h-7" style={{ color: '#EEBDC2' }} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Growth</h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Sharing learnings and evidence to attract new partnerships and expand our impact
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center scroll-reveal" style={{ transitionDelay: '0.6s' }}>
              <div className="p-12 rounded-3xl border border-gray-800 hover:border-pink-accent/50 transition-all duration-500" style={{ backgroundImage: 'url(/texture_background.png), linear-gradient(to bottom right, rgb(17, 24, 39), rgb(0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay, normal' }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Interested in Partnering?
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
                  Join leading organizations supporting financial education for young people across the UK
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:hello@stuf.org.uk"
                    className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:scale-105 shine-effect"
                    style={{ backgroundColor: '#EEBDC2', color: '#161616' }}
                  >
                    Contact Us
                  </a>
                  <Link
                    to="/#donate"
                    className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-white hover:text-black border-2 text-white shine-effect"
                    style={{ borderColor: '#EEBDC2' }}
                  >
                    Support Our Mission
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 relative overflow-hidden border-t border-gray-800" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="Set Them Up Foundation"
                className="h-16 mb-6 filter brightness-0 invert"
              />
              <p className="text-gray-400 leading-relaxed text-sm">
                Transforming financial futures for young people across the UK
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/#about" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/#expertise" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    Our Expertise
                  </Link>
                </li>
                <li>
                  <Link to="/#donate" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    Support Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm">
                  hello@stuf.org.uk
                </li>
                <li className="text-gray-400 text-sm">
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <p className="text-center text-gray-500 text-sm">
              2025 Set Them Up Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default ImpactReports;
