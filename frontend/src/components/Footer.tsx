import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-biovitam-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-biovitam-primary">Biovitam</h3>
            <p className="text-gray-300">Premium organic biofertilizers for sustainable agriculture in Kenya.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-biovitam-primary">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-biovitam-primary">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-biovitam-primary">About</Link></li>
              <li><Link to="/benefits" className="text-gray-300 hover:text-biovitam-primary">Benefits</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <a href="mailto:info@biovitamcropscience.com" className="hover:text-biovitam-primary">
                  info@biovitamcropscience.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Off Thika Road, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Coming soon on social media</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {currentYear} Nova Gardens Ltd (Biovitam). All rights reserved.</p>
            <div className="space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-biovitam-primary text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-biovitam-primary text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
