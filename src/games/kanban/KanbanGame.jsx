import { useState } from 'react'
import { Link } from 'react-router-dom'
import BoardLevel from './BoardLevel'
import WipLevel from './WipLevel'
import KanbanQuiz from './KanbanQuiz'
import KanbanResultScreen from './KanbanResultScreen'
import './KanbanGame.css'

const LEVELS = [
    { id: 1, name: 'Tablero Flow', icon: '📋' },
    { id: 2, name: 'Límites WIP', icon: '🚦' },
    { id: 3, name: 'Quiz Kanban', icon: '❓' },
]

const MAX_SCORE = 100

function KanbanGame() {
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
        <section className="page kanban-game">
            <div className="container section">
                <div className="kb-header">
                    <Link to="/games" className="kb-back">← Volver a Juegos</Link>
                    <div className="kb-header__info">
                        <span className="kb-header__emoji">📋</span>
                        <div>
                            <h1 className="kb-header__title gradient-text">Kanban</h1>
                            <p className="kb-header__sub">Aprendé a visualizar y optimizar el flujo de trabajo</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="kb-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`kb-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="kb-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="kb-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="kb-progress__bar">
                                <div className="kb-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="kb-intro">
                        <div className="kb-intro__card glass">
                            <h2>🎯 ¿Qué es Kanban?</h2>
                            <p>
                                <strong>Kanban</strong> es un método para gestionar el trabajo del conocimiento,
                                con énfasis en la <strong>entrega continua</strong> y la no sobrecarga del equipo.
                            </p>
                            <div className="kb-intro__pillars">
                                <div className="kb-intro__pillar glass">
                                    <span>👀</span>
                                    <strong>Visualizar el Flujo</strong>
                                    <small>Hacer el trabajo visible a través de un tablero.</small>
                                </div>
                                <div className="kb-intro__pillar glass">
                                    <span>🛑</span>
                                    <strong>Limitar WIP</strong>
                                    <small>Restringir el trabajo en progreso para mantener el foco.</small>
                                </div>
                                <div className="kb-intro__pillar glass">
                                    <span>🌊</span>
                                    <strong>Gestionar el Flujo</strong>
                                    <small>Monitorear cuellos de botella y optimizar el sistema pull.</small>
                                </div>
                            </div>
                            <div className="kb-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="kb-intro__level glass">
                                        <span className="kb-intro__level-icon">{lvl.icon}</span>
                                        <span className="kb-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary kb-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <BoardLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <WipLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <KanbanQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <KanbanResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default KanbanGame
