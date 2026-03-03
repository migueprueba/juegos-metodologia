import { useState } from 'react'
import { Link } from 'react-router-dom'
import PipelineOrder from './PipelineOrder'
import PracticesMatch from './PracticesMatch'
import DevOpsQuiz from './DevOpsQuiz'
import DevOpsResultScreen from './DevOpsResultScreen'
import './DevOpsGame.css'

const LEVELS = [
    { id: 1, name: 'Pipeline CI/CD', icon: '🔄' },
    { id: 2, name: 'Prácticas DevOps', icon: '🛠️' },
    { id: 3, name: 'Quiz de DevOps', icon: '❓' },
]

const MAX_SCORE = 100

function DevOpsGame() {
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
        <section className="page devops-game">
            <div className="container section">
                <div className="do-header">
                    <Link to="/games" className="do-back">← Volver a Juegos</Link>
                    <div className="do-header__info">
                        <span className="do-header__emoji">⚡</span>
                        <div>
                            <h1 className="do-header__title gradient-text">DevOps</h1>
                            <p className="do-header__sub">Aprendé sobre la cultura y prácticas de DevOps</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="do-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`do-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="do-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="do-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="do-progress__bar">
                                <div className="do-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="do-intro">
                        <div className="do-intro__card glass">
                            <h2>🎯 ¿Qué es DevOps?</h2>
                            <p>
                                <strong>DevOps</strong> es una cultura y conjunto de prácticas que integra
                                el <strong>desarrollo de software</strong> (Dev) con las <strong>operaciones de TI</strong> (Ops).
                                Su objetivo es acortar el ciclo de desarrollo y entregar software de alta calidad de forma continua.
                            </p>
                            <div className="do-intro__infinity">
                                <div className="do-intro__loop glass">
                                    <span>♾️</span>
                                    <div>
                                        <strong>Ciclo Infinito DevOps</strong>
                                        <small>Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Plan...</small>
                                    </div>
                                </div>
                            </div>
                            <div className="do-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="do-intro__level glass">
                                        <span className="do-intro__level-icon">{lvl.icon}</span>
                                        <span className="do-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary do-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <PipelineOrder onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <PracticesMatch onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <DevOpsQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <DevOpsResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default DevOpsGame
