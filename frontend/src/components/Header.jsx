import { Link } from 'react-router-dom'
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span>EthioCare</span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/campaigns" onClick={closeMenu}>Campaigns</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            <li>
              <Link to="/donate" className="btn btn-primary btn-donate" onClick={closeMenu}>
                Donate Now
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
