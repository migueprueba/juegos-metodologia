import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import './Layout.css'

function Layout() {
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/about', label: 'Acerca de' },
        { to: '/games', label: 'Juegos' },
        { to: '/contact', label: 'Contacto' },
    ]

    return (
        <div className="layout">
            <header className="header glass">
                <div className="header__inner container">
                    <NavLink to="/" className="header__logo">
                        <span className="header__logo-icon">🎮</span>
                        <span className="header__logo-text gradient-text">Juegos Metodología</span>
                    </NavLink>

                    <button
                        className={`header__hamburger ${menuOpen ? 'is-active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        id="menu-toggle"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`} id="main-nav">
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `header__link ${isActive ? 'is-active' : ''}`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="main">
                <Outlet />
            </main>

            <footer className="footer">
                <div className="container">
                    <p className="footer__text">
                        © 2026 Juegos Metodología — Hecho con <span className="footer__heart">♥</span> usando React + HashRouter
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Layout
