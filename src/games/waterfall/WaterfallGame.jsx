import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhaseOrder from './PhaseOrder'
import PhaseMatch from './PhaseMatch'
import QuizLevel from './QuizLevel'
import ResultScreen from './ResultScreen'
import './WaterfallGame.css'

const LEVELS = [
    { id: 1, name: 'Ordená las Fases', icon: '🔢' },
    { id: 2, name: 'Asociá la Descripción', icon: '🔗' },
    { id: 3, name: 'Quiz de Cascada', icon: '❓' },
]

const MAX_SCORE = 100 // total possible across all levels

function WaterfallGame() {
    const [currentLevel, setCurrentLevel] = useState(0) // 0 = intro, 1-3 = levels, 4 = results
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
        <section className="page waterfall-game">
            <div className="container section">
                {/* Header */}
                <div className="wf-header">
                    <Link to="/games" className="wf-back" id="back-to-games">← Volver a Juegos</Link>
                    <div className="wf-header__info">
                        <span className="wf-header__emoji">🏔️</span>
                        <div>
                            <h1 className="wf-header__title gradient-text">Modelo Cascada</h1>
                            <p className="wf-header__sub">Aprendé sobre el proceso de desarrollo en cascada</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="wf-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`wf-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="wf-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="wf-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="wf-progress__bar">
                                <div
                                    className="wf-progress__fill"
                                    style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Levels */}
                {currentLevel === 0 && (
                    <div className="wf-intro">
                        <div className="wf-intro__card glass">
                            <h2>🎯 ¿Qué es el Modelo Cascada?</h2>
                            <p>
                                El <strong>modelo Cascada</strong> (Waterfall) es un modelo de desarrollo de software
                                secuencial, donde el proceso fluye hacia abajo como una cascada a través de fases definidas:
                                Requisitos, Diseño, Implementación, Verificación y Mantenimiento.
                            </p>
                            <p>
                                En este juego, pondrás a prueba tus conocimientos sobre este modelo a través de
                                <strong> 3 niveles</strong> progresivos.
                            </p>
                            <div className="wf-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="wf-intro__level glass">
                                        <span className="wf-intro__level-icon">{lvl.icon}</span>
                                        <span className="wf-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary wf-intro__start"
                                onClick={() => setCurrentLevel(1)}
                                id="start-game"
                            >
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && (
                    <PhaseOrder onComplete={(score) => handleLevelComplete(1, score)} />
                )}

                {currentLevel === 2 && (
                    <PhaseMatch onComplete={(score) => handleLevelComplete(2, score)} />
                )}

                {currentLevel === 3 && (
                    <QuizLevel onComplete={(score) => handleLevelComplete(3, score)} />
                )}

                {currentLevel === 4 && (
                    <ResultScreen
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

export default WaterfallGame
