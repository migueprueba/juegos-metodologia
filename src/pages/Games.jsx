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
        title: 'Manifiesto Ágil',
        emoji: '📜',
        description: 'Aprendé sobre los valores y principios del desarrollo ágil en 3 niveles interactivos.',
        color: '#00d4aa',
        route: '/games/agile',
    },
    {
        id: 3,
        title: 'Scrum',
        emoji: '🏃',
        description: 'Aprendé sobre los roles, eventos y artefactos del framework Scrum.',
        color: '#ff6b9d',
        route: '/games/scrum',
    },
    {
        id: 4,
        title: 'DevOps',
        emoji: '⚡',
        description: 'Aprendé sobre CI/CD, prácticas DevOps y la cultura de integración continua.',
        color: '#ffb347',
        route: '/games/devops',
    },
    {
        id: 5,
        title: 'Kanban',
        emoji: '📋',
        description: 'Aprendé a visualizar y gestionar el flujo de trabajo y los límites WIP.',
        color: '#4facfe',
        route: '/games/kanban',
    },
    {
        id: 6,
        title: 'Behavior-Driven Dev',
        emoji: '🥒',
        description: 'Aprendé a construir software guiado por el comportamiento y usando Gherkin.',
        color: '#20c997',
        route: '/games/bdd',
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
