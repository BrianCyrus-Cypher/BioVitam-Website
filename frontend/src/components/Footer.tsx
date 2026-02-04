import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="section-framed bg-biovitam-dark text-white">
      <div className="content-container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-4 text-sm md:text-base">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-black mb-3 text-white glow-text-white">Biovitam</h3>
            <p className="text-white/80 leading-relaxed max-w-xs">Premium organic biofertilizers for sustainable agriculture in Kenya.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-3 text-biovitam-secondary">Quick Links</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/profile" className="text-white/70 hover:text-white transition-colors">Profile</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-3 text-biovitam-secondary">Contact</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-biovitam-primary" />
                <a href="mailto:info@biovitamcropscience.com" className="hover:text-white transition-colors">
                  info@biovitamcropscience.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-biovitam-primary" />
                <span>Off Thika Road, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold mb-3 text-biovitam-secondary">Follow Us</h4>
            <div className="space-y-2">
              <p className="text-white/60 italic">Coming soon on social media</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-4 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-center md:text-left">
            <p className="text-white/50">© {currentYear} Nova Gardens Ltd (Biovitam). All rights reserved.</p>
            <div className="space-x-4 md:space-x-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
