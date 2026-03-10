import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhasesLevel from './PhasesLevel'
import DisciplinesLevel from './DisciplinesLevel'
import RupQuiz from './RupQuiz'
import RupResultScreen from './RupResultScreen'
import './RupGame.css'

const LEVELS = [
    { id: 1, name: 'Fases de RUP', icon: '⏱️' },
    { id: 2, name: 'Las Disciplinas', icon: '📊' },
    { id: 3, name: 'Quiz de RUP', icon: '❓' },
]

const MAX_SCORE = 100

function RupGame() {
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
        <section className="page rup-game">
            <div className="container section">
                <div className="rup-header">
                    <Link to="/games" className="rup-back">← Volver a Juegos</Link>
                    <div className="rup-header__info">
                        <span className="rup-header__emoji">🐘</span>
                        <div>
                            <h1 className="rup-header__title gradient-text">Rational Unified Process (RUP)</h1>
                            <p className="rup-header__sub">Explorá las dos dimensiones del marco de trabajo iterativo</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="rup-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`rup-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="rup-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="rup-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="rup-progress__bar">
                                <div className="rup-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="rup-intro">
                        <div className="rup-intro__card glass">
                            <h2>🎯 ¿Qué es RUP?</h2>
                            <p>
                                El <strong>Rational Unified Process (RUP)</strong> es un marco de trabajo de desarrollo de software configurable.
                                Es conocido por dividir el tiempo en fases (dimensión temporal) e iteraciones, cruzadas por flujos de trabajo de
                                disciplinas constantes (dimensión estática).
                            </p>
                            <div className="rup-intro__pillars">
                                <div className="rup-intro__pillar glass">
                                    <span>🗺️</span>
                                    <strong>Guiado por Casos de Uso</strong>
                                    <small>Los casos de uso impulsan diseño y pruebas.</small>
                                </div>
                                <div className="rup-intro__pillar glass">
                                    <span>🏛️</span>
                                    <strong>Centrado en la Arquitectura</strong>
                                    <small>Define una base ejecutable tempranamente.</small>
                                </div>
                                <div className="rup-intro__pillar glass">
                                    <span>🔄</span>
                                    <strong>Iterativo e Incremental</strong>
                                    <small>Minimiza el riesgo descubriendo fallas rápido.</small>
                                </div>
                            </div>
                            <div className="rup-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="rup-intro__level glass">
                                        <span className="rup-intro__level-icon">{lvl.icon}</span>
                                        <span className="rup-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary rup-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <PhasesLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <DisciplinesLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <RupQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <RupResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default RupGame
