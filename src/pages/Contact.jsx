import './Pages.css'

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('¡Formulario enviado! (Este es un ejemplo — no hay backend conectado)')
    }

    return (
        <section className="page contact">
            <div className="container section">
                <span className="page__badge">✉️ Contacto</span>
                <h1 className="page__title">
                    Ponte en <span className="gradient-text">contacto</span>
                </h1>
                <p className="page__intro">
                    ¿Tienes preguntas, ideas o sugerencias? ¡Nos encantaría saber de ti!
                </p>

                <form className="contact-form glass" onSubmit={handleSubmit} id="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            rows="5"
                            placeholder="Escribe tu mensaje aquí..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" id="contact-submit">
                        Enviar mensaje 🚀
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact
