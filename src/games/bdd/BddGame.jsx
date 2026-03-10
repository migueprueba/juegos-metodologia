import { useState } from 'react'
import { Link } from 'react-router-dom'
import AmigosLevel from './AmigosLevel'
import GherkinLevel from './GherkinLevel'
import BddQuiz from './BddQuiz'
import BddResultScreen from './BddResultScreen'
import './BddGame.css'

const LEVELS = [
    { id: 1, name: 'Los Tres Amigos', icon: '👥' },
    { id: 2, name: 'Sintaxis Gherkin', icon: '🥒' },
    { id: 3, name: 'Quiz BDD', icon: '❓' },
]

const MAX_SCORE = 100

function BddGame() {
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
        <section className="page bdd-game">
            <div className="container section">
                <div className="bdd-header">
                    <Link to="/games" className="bdd-back">← Volver a Juegos</Link>
                    <div className="bdd-header__info">
                        <span className="bdd-header__emoji">🥒</span>
                        <div>
                            <h1 className="bdd-header__title gradient-text">Behavior-Driven Development (BDD)</h1>
                            <p className="bdd-header__sub">Construyendo el producto correcto mediante colaboración y ejemplos</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="bdd-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`bdd-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="bdd-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="bdd-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="bdd-progress__bar">
                                <div className="bdd-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="bdd-intro">
                        <div className="bdd-intro__card glass">
                            <h2>🎯 ¿Qué es BDD?</h2>
                            <p>
                                <strong>Behavior-Driven Development</strong> (Desarrollo Guiado por Comportamiento) es una práctica
                                ágil que fomenta la colaboración entre desarrolladores, QA y participantes no técnicos o de negocio.
                                Su objetivo es usar <strong>conversaciones y ejemplos concretos</strong> para crear un entendimiento
                                compartido de cómo debe comportarse el software.
                            </p>
                            <div className="bdd-intro__pillars">
                                <div className="bdd-intro__pillar glass">
                                    <span>🤝</span>
                                    <strong>Colaboración "Tres Amigos"</strong>
                                    <small>Negocio, Desarrollo y QA diseñando juntos.</small>
                                </div>
                                <div className="bdd-intro__pillar glass">
                                    <span>💬</span>
                                    <strong>Lenguaje Ubicuo</strong>
                                    <small>Vocabulario compartido sin tecnicismos.</small>
                                </div>
                                <div className="bdd-intro__pillar glass">
                                    <span>⚙️</span>
                                    <strong>Especificaciones Ejecutables</strong>
                                    <small>Given / When / Then (Gherkin).</small>
                                </div>
                            </div>
                            <div className="bdd-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="bdd-intro__level glass">
                                        <span className="bdd-intro__level-icon">{lvl.icon}</span>
                                        <span className="bdd-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary bdd-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <AmigosLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <GherkinLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <BddQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <BddResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default BddGame
