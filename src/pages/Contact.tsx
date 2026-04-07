import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function Contact() {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.cdnfonts.com/css/veneer-2');

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Veneer Regular', 'Impact', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FFC3C3 0%, #FFD5D5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <header className="bg-pink-accent sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4 lg:py-6">
            <Link to="/">
              <img
                src="https://img1.wsimg.com/isteam/ip/38f5ab4c-5e7f-492b-a381-8756166883f9/Logo_Web.svg/:/rs=h:69,cg:true,m/qt=q:100/ll"
                alt="STUF"
                className="h-12 lg:h-16"
              />
            </Link>
            <Link to="/" className="text-black font-bold hover:opacity-70 transition-opacity">
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-b from-pink-accent/10 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
              Get In <span className="text-pink-accent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or want to bring financial education to your school? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 mb-12">
              <a href="mailto:hello@stuf.org.uk" className="bg-pink-accent/40 border-2 border-pink-accent/50 px-8 py-6 rounded-3xl flex items-start gap-4 hover:bg-pink-accent/60 transition-all">
                <Mail className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-semibold text-black/70 uppercase tracking-wide mb-1">Email UK</div>
                  <div className="text-lg font-bold text-black">hello@stuf.org.uk</div>
                </div>
              </a>

              <a href="mailto:info@ug-stuf.com" className="bg-white border-2 border-black px-8 py-6 rounded-3xl flex items-start gap-4 hover:bg-gray-50 transition-all">
                <div className="w-6 h-6 flex-shrink-0 mt-1 text-2xl">🇺🇬</div>
                <div>
                  <div className="text-sm font-semibold text-black/70 uppercase tracking-wide mb-1">Email Uganda</div>
                  <div className="text-lg font-bold text-black">info@ug-stuf.com</div>
                </div>
              </a>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-pink-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-black mb-3 uppercase tracking-wide">Our Location</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Set Them Up Foundation CIC<br />
                    IDEALondon, 69 Wilson St<br />
                    Shoreditch, London, England<br />
                    EC2A 2BB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-pink-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-black/70 text-sm">
            © 2024 Set Them Up Foundation. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Contact;
