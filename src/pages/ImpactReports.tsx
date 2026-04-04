import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white/95 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-50 transition-all duration-500 shadow-lg shadow-gray-100/50">
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
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-xl hover:scale-105 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: '#EEBDC2' }}></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl animate-float" style={{ backgroundColor: '#F5D4D8', animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24 scroll-reveal animate-fade-in-up">
            <span className="inline-block px-6 py-2.5 bg-pink-50 rounded-full text-xs font-semibold tracking-wider mb-8 shadow-sm" style={{ color: '#EEBDC2' }}>
              Our Impact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-[1.15]">
              Impact <span className="gradient-text">Reports</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
              Transparency and accountability in our mission to transform financial education for young people across the UK
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="group scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 premium-hover border border-gray-100">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-pink-300/30 z-10"></div>
                    <img
                      src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Money Matters Academy Impact Report 2025"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: 'rgba(238, 189, 194, 0.2)', color: '#161616' }}>
                          Latest Report
                        </div>
                        <span className="text-sm font-semibold text-gray-500">2025</span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        Money Matters Academy Impact Report 2025
                      </h2>

                      <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-8 font-light">
                        In partnership with Investec, we delivered the Money Matters Academy to 20 young people from Newham College in East London. This comprehensive report showcases measurable improvements in financial capability, confidence, and behavioural intention among participants.
                      </p>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/STUF_2025_ANNUAL_REPORT.pdf"
                        download
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 hover:scale-105 shine-effect"
                        style={{ backgroundColor: '#EEBDC2', color: '#161616' }}
                      >
                        <Download className="w-5 h-5" />
                        Download Report
                      </a>
                      <a
                        href="/STUF_2025_ANNUAL_REPORT.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-gray-900 hover:text-white border-2 border-gray-900 text-gray-900"
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
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
                Why We Share Our Impact
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Transparency</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Open reporting on our activities, reach, and outcomes to build trust with partners and supporters
                  </p>
                </div>
                <div className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Accountability</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Demonstrating responsible stewardship of resources and commitment to our mission
                  </p>
                </div>
                <div className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Growth</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Sharing learnings and evidence to attract new partnerships and expand our impact
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center scroll-reveal" style={{ transitionDelay: '0.6s' }}>
              <div className="glass-card p-12 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Interested in Partnering?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
                  Join leading organizations supporting financial education for young people across the UK
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:hello@stuf.org.uk"
                    className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/50 hover:scale-105"
                    style={{ backgroundColor: '#EEBDC2', color: '#161616' }}
                  >
                    Contact Us
                  </a>
                  <Link
                    to="/#donate"
                    className="px-10 py-5 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:bg-gray-900 hover:text-white border-2 border-gray-900 text-gray-900"
                  >
                    Support Our Mission
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ImpactReports;
