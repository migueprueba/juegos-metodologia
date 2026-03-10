import { useState } from 'react'
import { Link } from 'react-router-dom'
import ValuesLevel from './ValuesLevel'
import PracticesLevel from './PracticesLevel'
import XpQuiz from './XpQuiz'
import XpResultScreen from './XpResultScreen'
import './XpGame.css'

const LEVELS = [
    { id: 1, name: 'Los 5 Valores', icon: '💎' },
    { id: 2, name: 'Prácticas de XP', icon: '👨‍💻' },
    { id: 3, name: 'Quiz Extremo', icon: '❓' },
]

const MAX_SCORE = 100

function XpGame() {
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
        <section className="page xp-game">
            <div className="container section">
                <div className="xp-header">
                    <Link to="/games" className="xp-back">← Volver a Juegos</Link>
                    <div className="xp-header__info">
                        <span className="xp-header__emoji">⚡</span>
                        <div>
                            <h1 className="xp-header__title gradient-text">Extreme Programming (XP)</h1>
                            <p className="xp-header__sub">Valores compartidos, prácticas rigurosas y código de alta calidad</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="xp-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`xp-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="xp-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="xp-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="xp-progress__bar">
                                <div className="xp-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="xp-intro">
                        <div className="xp-intro__card glass">
                            <h2>🎯 ¿Qué es Extreme Programming?</h2>
                            <p>
                                <strong>XP</strong> es una metodología ágil diseñada para mejorar la calidad del software
                                y la respuesta a los requisitos cambiantes del cliente. Si una práctica de ingeniería
                                es buena, descubrieron que llevarla "al extremo" (hacerla todo el tiempo) es todavía mejor.
                            </p>
                            <div className="xp-intro__pillars">
                                <div className="xp-intro__pillar glass">
                                    <span>💎</span>
                                    <strong>5 Valores</strong>
                                    <small>Comunican y guían el comportamiento humano.</small>
                                </div>
                                <div className="xp-intro__pillar glass">
                                    <span>🧩</span>
                                    <strong>Prácticas Entrelazadas</strong>
                                    <small>TDD, Pair y CI conforman un escudo conjunto.</small>
                                </div>
                                <div className="xp-intro__pillar glass">
                                    <span>⚡</span>
                                    <strong>Abraza el Cambio</strong>
                                    <small>Costos aplanados para aceptar cambios tardíos.</small>
                                </div>
                            </div>
                            <div className="xp-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="xp-intro__level glass">
                                        <span className="xp-intro__level-icon">{lvl.icon}</span>
                                        <span className="xp-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary xp-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <ValuesLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <PracticesLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <XpQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <XpResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default XpGame
