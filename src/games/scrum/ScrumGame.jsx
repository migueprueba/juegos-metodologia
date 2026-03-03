import { useState } from 'react'
import { Link } from 'react-router-dom'
import RolesLevel from './RolesLevel'
import EventsOrder from './EventsOrder'
import ScrumQuiz from './ScrumQuiz'
import ScrumResultScreen from './ScrumResultScreen'
import './ScrumGame.css'

const LEVELS = [
    { id: 1, name: 'Roles de Scrum', icon: '👥' },
    { id: 2, name: 'Eventos del Sprint', icon: '📅' },
    { id: 3, name: 'Quiz de Scrum', icon: '❓' },
]

const MAX_SCORE = 100

function ScrumGame() {
    const [currentLevel, setCurrentLevel] = useState(0)
    const [scores, setScores] = useState({ 1: 0, 2: 0, 3: 0 })

    const totalScore = scores[1] + scores[2] + scores[3]

    const handleLevelComplete = (level, score) => {
        setScores((prev) => ({ ...prev, [level]: score }))
        setCurrentLevel(level + 1 > 3 ? 4 : level + 1)
    }

    const handleRestart = () => {
        setCurrentLevel(0)
        setScores({ 1: 0, 2: 0, 3: 0 })
    }

    return (
        <section className="page scrum-game">
            <div className="container section">
                <div className="sc-header">
                    <Link to="/games" className="sc-back" id="back-to-games-scrum">← Volver a Juegos</Link>
                    <div className="sc-header__info">
                        <span className="sc-header__emoji">🏃</span>
                        <div>
                            <h1 className="sc-header__title gradient-text">Scrum</h1>
                            <p className="sc-header__sub">Aprendé sobre el framework Scrum para desarrollo ágil</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="sc-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`sc-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="sc-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="sc-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="sc-progress__bar">
                                <div
                                    className="sc-progress__fill"
                                    style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="sc-intro">
                        <div className="sc-intro__card glass">
                            <h2>🎯 ¿Qué es Scrum?</h2>
                            <p>
                                <strong>Scrum</strong> es un framework ágil para gestionar y desarrollar productos complejos.
                                Se basa en <strong>3 roles</strong>, <strong>5 eventos</strong> y <strong>3 artefactos</strong> que
                                permiten la entrega iterativa e incremental de valor.
                            </p>
                            <div className="sc-intro__pillars">
                                <div className="sc-intro__pillar glass">
                                    <span>👥</span>
                                    <strong>3 Roles</strong>
                                    <small>PO, SM, Dev Team</small>
                                </div>
                                <div className="sc-intro__pillar glass">
                                    <span>📅</span>
                                    <strong>5 Eventos</strong>
                                    <small>Sprint, Planning, Daily, Review, Retro</small>
                                </div>
                                <div className="sc-intro__pillar glass">
                                    <span>📦</span>
                                    <strong>3 Artefactos</strong>
                                    <small>Product Backlog, Sprint Backlog, Incremento</small>
                                </div>
                            </div>
                            <div className="sc-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="sc-intro__level glass">
                                        <span className="sc-intro__level-icon">{lvl.icon}</span>
                                        <span className="sc-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary sc-intro__start"
                                onClick={() => setCurrentLevel(1)}
                                id="start-scrum-game"
                            >
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && (
                    <RolesLevel onComplete={(score) => handleLevelComplete(1, score)} />
                )}
                {currentLevel === 2 && (
                    <EventsOrder onComplete={(score) => handleLevelComplete(2, score)} />
                )}
                {currentLevel === 3 && (
                    <ScrumQuiz onComplete={(score) => handleLevelComplete(3, score)} />
                )}
                {currentLevel === 4 && (
                    <ScrumResultScreen
                        scores={scores}
                        totalScore={totalScore}
                        maxScore={MAX_SCORE}
                        onRestart={handleRestart}
                    />
                )}
            </div>
        </section>
    )
}

export default ScrumGame
