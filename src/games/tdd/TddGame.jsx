import { useState } from 'react'
import { Link } from 'react-router-dom'
import CycleLevel from './CycleLevel'
import ScenarioLevel from './ScenarioLevel'
import TddQuiz from './TddQuiz'
import TddResultScreen from './TddResultScreen'
import './TddGame.css'

const LEVELS = [
    { id: 1, name: 'El Ciclo', icon: '🔁' },
    { id: 2, name: '¿Qué sigue?', icon: '🤔' },
    { id: 3, name: 'Quiz Unitario', icon: '❓' },
]

const MAX_SCORE = 100

function TddGame() {
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
        <section className="page tdd-game">
            <div className="container section">
                <div className="tdd-header">
                    <Link to="/games" className="tdd-back">← Volver a Juegos</Link>
                    <div className="tdd-header__info">
                        <span className="tdd-header__emoji">🧪</span>
                        <div>
                            <h1 className="tdd-header__title gradient-text">Test-Driven Development</h1>
                            <p className="tdd-header__sub">Diseñar el software a través de pruebas unitarias y refactorización guiada</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="tdd-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`tdd-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="tdd-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="tdd-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="tdd-progress__bar">
                                <div className="tdd-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="tdd-intro">
                        <div className="tdd-intro__card glass">
                            <h2>🎯 ¿Qué es TDD?</h2>
                            <p>
                                <strong>TDD</strong> es una disciplina de diseño de software y desarrollo donde la prueba se escribe
                                antes que el código. Se rige por un bucle iterativo ultra-corto (minutos).
                            </p>
                            <div className="tdd-intro__pillars">
                                <div className="tdd-intro__pillar glass">
                                    <span>🔴</span>
                                    <strong>ROJO</strong>
                                    <small>Escribí el test y miralo fallar.</small>
                                </div>
                                <div className="tdd-intro__pillar glass">
                                    <span>🟢</span>
                                    <strong>VERDE</strong>
                                    <small>Escribí el código más simple que pase.</small>
                                </div>
                                <div className="tdd-intro__pillar glass">
                                    <span>🔵</span>
                                    <strong>REFACTOR</strong>
                                    <small>Mejorá el diseño bajo seguridad.</small>
                                </div>
                            </div>
                            <div className="tdd-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="tdd-intro__level glass">
                                        <span className="tdd-intro__level-icon">{lvl.icon}</span>
                                        <span className="tdd-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary tdd-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <CycleLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <ScenarioLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <TddQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <TddResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default TddGame
