import { Link } from 'react-router-dom'
import './Pages.css'

function NotFound() {
    return (
        <section className="page not-found">
            <div className="container section not-found__content">
                <div className="not-found__code">404</div>
                <h1 className="page__title">Página no encontrada</h1>
                <p className="page__intro">
                    La ruta que buscas no existe. Puede que el enlace esté roto o la página haya sido movida.
                </p>
                <Link to="/" className="btn btn-primary" id="back-home">
                    ← Volver al inicio
                </Link>
            </div>
        </section>
    )
}

export default NotFound
