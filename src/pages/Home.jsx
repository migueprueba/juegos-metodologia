import { Link } from 'react-router-dom'
import './Pages.css'

function Home() {
    return (
        <section className="page home">
            {/* Hero */}
            <div className="hero">
                <div className="hero__bg-orbs">
                    <div className="hero__orb hero__orb--1"></div>
                    <div className="hero__orb hero__orb--2"></div>
                    <div className="hero__orb hero__orb--3"></div>
                </div>

                <div className="container hero__content">
                    <span className="hero__badge">🚀 React + HashRouter</span>
                    <h1 className="hero__title">
                        Bienvenido a <span className="gradient-text">Juegos Metodología</span>
                    </h1>
                    <p className="hero__subtitle">
                        Una colección de juegos educativos interactivos, construida con React y
                        desplegada en GitHub Pages usando HashRouter para navegación sin servidor.
                    </p>
                    <div className="hero__actions">
                        <Link to="/games" className="btn btn-primary" id="cta-games">
                            🎮 Ver Juegos
                        </Link>
                        <Link to="/about" className="btn btn-outline" id="cta-about">
                            Conocer más →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="container section">
                <h2 className="section__title">¿Cómo funciona?</h2>
                <div className="feature-grid">
                    <div className="feature-card glass">
                        <div className="feature-card__icon">⚛️</div>
                        <h3 className="feature-card__title">React</h3>
                        <p className="feature-card__desc">
                            Interfaz construida con componentes React y Vite para un desarrollo rápido.
                        </p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-card__icon">#️⃣</div>
                        <h3 className="feature-card__title">HashRouter</h3>
                        <p className="feature-card__desc">
                            Navegación que usa el hash de la URL (<code>/#/ruta</code>) — funciona
                            sin configuración de servidor.
                        </p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-card__icon">🌐</div>
                        <h3 className="feature-card__title">GitHub Pages</h3>
                        <p className="feature-card__desc">
                            Desplegado como sitio estático usando solo <code>index.html</code>,
                            sin backend necesario.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
