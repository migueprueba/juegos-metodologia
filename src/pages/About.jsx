import './Pages.css'

function About() {
    return (
        <section className="page about">
            <div className="container section">
                <span className="page__badge">📖 Acerca de</span>
                <h1 className="page__title">
                    Sobre este <span className="gradient-text">proyecto</span>
                </h1>
                <p className="page__intro">
                    Este proyecto es un ejemplo de cómo configurar una aplicación React para
                    funcionar correctamente en GitHub Pages utilizando <strong>HashRouter</strong>.
                </p>

                <div className="info-cards">
                    <div className="info-card glass">
                        <h3>¿Por qué HashRouter?</h3>
                        <p>
                            GitHub Pages sirve archivos estáticos. Si usas <code>BrowserRouter</code>,
                            al refrescar una ruta como <code>/about</code>, el servidor buscará un
                            archivo <code>about/index.html</code> que no existe, resultando en un 404.
                        </p>
                        <p>
                            Con <code>HashRouter</code>, las rutas viven después del <code>#</code>
                            (ej. <code>/#/about</code>), así el servidor siempre sirve <code>index.html</code>
                            y React maneja la navegación del lado del cliente.
                        </p>
                    </div>

                    <div className="info-card glass">
                        <h3>Estructura del proyecto</h3>
                        <ul className="about__list">
                            <li><code>src/main.jsx</code> — Punto de entrada con <code>&lt;HashRouter&gt;</code></li>
                            <li><code>src/App.jsx</code> — Definición de rutas con <code>&lt;Routes&gt;</code></li>
                            <li><code>src/components/Layout.jsx</code> — Layout compartido con navegación</li>
                            <li><code>src/pages/</code> — Páginas de ejemplo (Home, About, Games, Contact)</li>
                            <li><code>vite.config.js</code> — Configuración con <code>base</code> para GitHub Pages</li>
                        </ul>
                    </div>

                    <div className="info-card glass">
                        <h3>Despliegue en GitHub Pages</h3>
                        <p>Para desplegar:</p>
                        <ol className="about__list about__list--ordered">
                            <li>Ejecutar <code>npm run build</code></li>
                            <li>Los archivos se generan en <code>dist/</code></li>
                            <li>Configurar GitHub Pages para servir desde la carpeta <code>dist/</code> o usar GitHub Actions</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
