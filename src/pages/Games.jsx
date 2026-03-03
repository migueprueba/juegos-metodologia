import { Link } from 'react-router-dom'
import './Pages.css'

const games = [
    {
        id: 1,
        title: 'Trivia Metodológica',
        emoji: '🧠',
        description: 'Pon a prueba tus conocimientos sobre metodologías de desarrollo.',
        color: '#6c63ff',
    },
    {
        id: 2,
        title: 'Scrum Sprint',
        emoji: '🏃',
        description: 'Simula un sprint ágil y gestiona tu backlog contra el reloj.',
        color: '#00d4aa',
    },
    {
        id: 3,
        title: 'Puzzle UML',
        emoji: '🧩',
        description: 'Arma diagramas UML arrastrando y soltando componentes.',
        color: '#ff6b9d',
    },
    {
        id: 4,
        title: 'Code Review',
        emoji: '🔍',
        description: 'Encuentra los bugs escondidos en fragmentos de código.',
        color: '#ffb347',
    },
    {
        id: 5,
        title: 'Design Patterns',
        emoji: '🏗️',
        description: 'Identifica y aplica patrones de diseño en escenarios reales.',
        color: '#87ceeb',
    },
    {
        id: 6,
        title: 'Git Adventure',
        emoji: '🌳',
        description: 'Navega por un repositorio Git resolviendo conflictos de merge.',
        color: '#dda0dd',
    },
]

function Games() {
    return (
        <section className="page games">
            <div className="container section">
                <span className="page__badge">🎮 Juegos</span>
                <h1 className="page__title">
                    Explora los <span className="gradient-text">juegos</span>
                </h1>
                <p className="page__intro">
                    Cada juego está diseñado para enseñar conceptos de metodología de software
                    de forma interactiva y divertida.
                </p>

                <div className="games-grid">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="game-card glass"
                            style={{ '--card-accent': game.color }}
                        >
                            <div className="game-card__emoji">{game.emoji}</div>
                            <h3 className="game-card__title">{game.title}</h3>
                            <p className="game-card__desc">{game.description}</p>
                            <span className="game-card__tag">Próximamente</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Games
