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
      <div className="min-h-screen bg-white">
        <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center py-5 lg:py-6">
              <Link to="/" className="flex items-center group">
                <img
                  src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                  alt="Set Them Up Foundation"
                  className="h-10 lg:h-14 transition-all duration-300 group-hover:scale-105"
                />
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-pink-accent text-black hover:bg-opacity-90 hover:shadow-lg hover:shadow-pink-accent/30 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </nav>
          </div>
        </header>

        <section className="py-20 lg:py-32 bg-gradient-to-b from-pink-accent/5 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16 scroll-reveal">
              <p className="text-pink-accent font-semibold text-sm uppercase tracking-widest mb-6">Our Impact</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Impact <span className="text-pink-accent" style={{fontFamily: "'Veneer Three', serif"}}>Reports</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transparency and accountability in our mission to transform financial education for young people across the UK
              </p>
            </div>

          <div className="max-w-5xl mx-auto">
            <div className="group scroll-reveal">
              <div className="bg-white rounded-3xl overflow-hidden border-2 border-pink-accent/20 hover:border-pink-accent/50 hover:shadow-2xl hover:shadow-pink-accent/10 transition-all duration-500 premium-card">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-accent/20 to-transparent z-10"></div>
                    <img
                      src="/PHOTO-2025-08-06-12-15-28_(2).jpg"
                      alt="Money Matters Academy Impact Report 2025"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-accent/10 text-pink-accent">
                          Latest Report
                        </div>
                        <span className="text-sm font-semibold text-gray-500">2025</span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                        Money Matters Academy Impact Report 2025
                      </h2>

                      <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-8">
                        In partnership with Investec, we delivered the Money Matters Academy to 20 young people from Newham College in East London. This comprehensive report showcases measurable improvements in financial capability, confidence, and behavioural intention among participants.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/STUF_PDF_FINALE_REPORT.pdf"
                        download
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm bg-pink-accent text-black hover:shadow-xl hover:shadow-pink-accent/30 transition-all duration-300 hover:scale-105"
                      >
                        <Download className="w-5 h-5" />
                        Download Report
                      </a>
                      <a
                        href="/STUF_PDF_FINALE_REPORT.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm border-2 border-pink-accent/50 text-black hover:border-pink-accent hover:bg-pink-accent/10 hover:shadow-lg transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Online
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 scroll-reveal">
              <h3 className="text-2xl lg:text-3xl font-bold text-black mb-8 text-center">
                Why We Share Our Impact
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-2xl border-2 border-pink-accent/20 hover:border-pink-accent hover:shadow-xl hover:shadow-pink-accent/10 transition-all duration-500 premium-card">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-pink-accent/20">
                    <BarChart3 className="w-7 h-7 text-pink-accent" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-3">Transparency</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Open reporting on our activities, reach, and outcomes to build trust with partners and supporters
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-pink-accent/20 hover:border-pink-accent hover:shadow-xl hover:shadow-pink-accent/10 transition-all duration-500 premium-card">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-pink-accent/20">
                    <Target className="w-7 h-7 text-pink-accent" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-3">Accountability</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Demonstrating responsible stewardship of resources and commitment to our mission
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-pink-accent/20 hover:border-pink-accent hover:shadow-xl hover:shadow-pink-accent/10 transition-all duration-500 premium-card">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-pink-accent/20">
                    <TrendingUp className="w-7 h-7 text-pink-accent" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-3">Growth</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Sharing learnings and evidence to attract new partnerships and expand our impact
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center scroll-reveal">
              <div className="bg-gradient-to-br from-pink-accent/10 to-white p-12 rounded-3xl border-2 border-pink-accent/30 hover:border-pink-accent hover:shadow-xl hover:shadow-pink-accent/20 transition-all duration-500">
                <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                  Interested in Partnering?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
                  Join leading organizations supporting financial education for young people across the UK
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:hello@stuf.org.uk"
                    className="px-10 py-5 rounded-full font-bold text-sm bg-pink-accent text-black hover:shadow-xl hover:shadow-pink-accent/30 transition-all duration-300 hover:scale-105"
                  >
                    Contact Us
                  </a>
                  <Link
                    to="/#donate"
                    className="px-10 py-5 rounded-full font-bold text-sm border-2 border-pink-accent/50 text-black hover:border-pink-accent hover:bg-pink-accent/10 hover:shadow-lg transition-all duration-300"
                  >
                    Donate
                  </Link>
                </div>
              </div>
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
                <li><Link to="/#about" className="text-black/80 hover:text-black transition-colors text-sm">About Us</Link></li>
                <li><Link to="/#programs" className="text-black/80 hover:text-black transition-colors text-sm">Programs</Link></li>
                <li><Link to="/#team" className="text-black/80 hover:text-black transition-colors text-sm">Team</Link></li>
                <li><Link to="/impact-reports" className="text-black/80 hover:text-black transition-colors text-sm">Impact Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-5 text-base uppercase tracking-wide">Get Involved</h4>
              <ul className="space-y-3">
                <li><Link to="/#donate" className="text-black/80 hover:text-black transition-colors text-sm">Donate</Link></li>
                <li><Link to="/#contact" className="text-black/80 hover:text-black transition-colors text-sm">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-black mb-5 text-base uppercase tracking-wide">Contact</h4>
              <p className="text-black/80 text-sm leading-relaxed">
                hello@stuf.org.uk
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
      </div>
    </>
  );
}

export default ImpactReports;
