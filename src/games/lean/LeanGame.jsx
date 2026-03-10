import { useState } from 'react'
import { Link } from 'react-router-dom'
import WasteLevel from './WasteLevel'
import PrinciplesLevel from './PrinciplesLevel'
import LeanQuiz from './LeanQuiz'
import LeanResultScreen from './LeanResultScreen'
import './LeanGame.css'

const LEVELS = [
    { id: 1, name: 'Eliminar Desperdicios', icon: '🗑️' },
    { id: 2, name: 'Los 7 Principios', icon: '🧠' },
    { id: 3, name: 'Quiz Lean', icon: '❓' },
]

const MAX_SCORE = 100

function LeanGame() {
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
        <section className="page lean-game">
            <div className="container section">
                <div className="lean-header">
                    <Link to="/games" className="lean-back">← Volver a Juegos</Link>
                    <div className="lean-header__info">
                        <span className="lean-header__emoji">🏎️</span>
                        <div>
                            <h1 className="lean-header__title gradient-text">Lean Software Development</h1>
                            <p className="lean-header__sub">Maximizá el valor al cliente, Optimizá el flujo, Eliminá el desperdicio</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="lean-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`lean-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="lean-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="lean-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="lean-progress__bar">
                                <div className="lean-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="lean-intro">
                        <div className="lean-intro__card glass">
                            <h2>🎯 ¿Qué es Lean Software Development?</h2>
                            <p>
                                Adaptado del sistema de producción Toyota, <strong>Lean</strong> se enfoca en entregar valor rápido,
                                prevenir defectos en lugar de arreglarlos tarde, y optimizar el sistema de extremo a extremo,
                                siempre respetando y empoderando al equipo técnico.
                            </p>
                            <div className="lean-intro__pillars">
                                <div className="lean-intro__pillar glass">
                                    <span>🗑️</span>
                                    <strong>Mapeo de Flujo (VSM)</strong>
                                    <small>Detectar dónde ocurren demoras.</small>
                                </div>
                                <div className="lean-intro__pillar glass">
                                    <span>🛑</span>
                                    <strong>Último Momento</strong>
                                    <small>Postergar decisiones hasta tener hechos.</small>
                                </div>
                                <div className="lean-intro__pillar glass">
                                    <span>🌐</span>
                                    <strong>Optimizar el Todo</strong>
                                    <small>Sub-optimizar partes (ej. solo dev) daña al sistema.</small>
                                </div>
                            </div>
                            <div className="lean-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="lean-intro__level glass">
                                        <span className="lean-intro__level-icon">{lvl.icon}</span>
                                        <span className="lean-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary lean-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <WasteLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <PrinciplesLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <LeanQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <LeanResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default LeanGame
