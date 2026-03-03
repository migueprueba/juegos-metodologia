import { Link } from 'react-router-dom'
import './Pages.css'

const games = [
    {
        id: 1,
        title: 'Modelo Cascada',
        emoji: '🏔️',
        description: 'Aprendé sobre el proceso de desarrollo en cascada a través de 3 niveles interactivos.',
        color: '#6c63ff',
        route: '/games/waterfall',
    },
    {
        id: 2,
        title: 'Scrum Sprint',
        emoji: '🏃',
        description: 'Simula un sprint ágil y gestiona tu backlog contra el reloj.',
        color: '#00d4aa',
        route: null,
    },
    {
        id: 3,
        title: 'Puzzle UML',
        emoji: '🧩',
        description: 'Arma diagramas UML arrastrando y soltando componentes.',
        color: '#ff6b9d',
        route: null,
    },
    {
        id: 4,
        title: 'Code Review',
        emoji: '🔍',
        description: 'Encuentra los bugs escondidos en fragmentos de código.',
        color: '#ffb347',
        route: null,
    },
    {
        id: 5,
        title: 'Design Patterns',
        emoji: '🏗️',
        description: 'Identifica y aplica patrones de diseño en escenarios reales.',
        color: '#87ceeb',
        route: null,
    },
    {
        id: 6,
        title: 'Git Adventure',
        emoji: '🌳',
        description: 'Navega por un repositorio Git resolviendo conflictos de merge.',
        color: '#dda0dd',
        route: null,
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
                    {games.map((game) => {
                        const CardContent = (
                            <>
                                <div className="game-card__emoji">{game.emoji}</div>
                                <h3 className="game-card__title">{game.title}</h3>
                                <p className="game-card__desc">{game.description}</p>
                                {game.route ? (
                                    <span className="game-card__tag game-card__tag--play">▶ Jugar</span>
                                ) : (
                                    <span className="game-card__tag">Próximamente</span>
                                )}
                            </>
                        )

                        return game.route ? (
                            <Link
                                key={game.id}
                                to={game.route}
                                className="game-card glass"
                                style={{ '--card-accent': game.color }}
                            >
                                {CardContent}
                            </Link>
                        ) : (
                            <div
                                key={game.id}
                                className="game-card glass"
                                style={{ '--card-accent': game.color }}
                            >
                                {CardContent}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Games
