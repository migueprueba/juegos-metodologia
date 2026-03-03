import { useState } from 'react'
import { Link } from 'react-router-dom'
import ValuesLevel from './ValuesLevel'
import PrinciplesLevel from './PrinciplesLevel'
import AgileQuiz from './AgileQuiz'
import AgileResultScreen from './AgileResultScreen'
import './AgileGame.css'

const LEVELS = [
    { id: 1, name: 'Completá los Valores', icon: '💎' },
    { id: 2, name: 'Verdadero o Falso', icon: '✅' },
    { id: 3, name: 'Quiz del Manifiesto', icon: '❓' },
]

const MAX_SCORE = 100

function AgileGame() {
    const [currentLevel, setCurrentLevel] = useState(0) // 0=intro, 1-3=levels, 4=results
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
        <section className="page agile-game">
            <div className="container section">
                {/* Header */}
                <div className="ag-header">
                    <Link to="/games" className="ag-back" id="back-to-games">← Volver a Juegos</Link>
                    <div className="ag-header__info">
                        <span className="ag-header__emoji">📜</span>
                        <div>
                            <h1 className="ag-header__title gradient-text">Manifiesto Ágil</h1>
                            <p className="ag-header__sub">Aprendé sobre los valores y principios del desarrollo ágil</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="ag-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`ag-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="ag-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="ag-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="ag-progress__bar">
                                <div
                                    className="ag-progress__fill"
                                    style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Intro */}
                {currentLevel === 0 && (
                    <div className="ag-intro">
                        <div className="ag-intro__card glass">
                            <h2>🎯 ¿Qué es el Manifiesto Ágil?</h2>
                            <p>
                                El <strong>Manifiesto por el Desarrollo Ágil de Software</strong> fue creado en 2001
                                por 17 desarrolladores. Define <strong>4 valores</strong> y <strong>12 principios</strong> que
                                priorizan la flexibilidad, la colaboración y la entrega continua de software funcional.
                            </p>
                            <div className="ag-intro__values">
                                <p className="ag-intro__values-title">Los 4 valores:</p>
                                <div className="ag-intro__value glass">
                                    <em>"Valoramos más a los <strong>individuos e interacciones</strong> que a los procesos y herramientas"</em>
                                </div>
                                <div className="ag-intro__value glass">
                                    <em>"Valoramos más el <strong>software funcionando</strong> que la documentación extensiva"</em>
                                </div>
                                <div className="ag-intro__value glass">
                                    <em>"Valoramos más la <strong>colaboración con el cliente</strong> que la negociación contractual"</em>
                                </div>
                                <div className="ag-intro__value glass">
                                    <em>"Valoramos más la <strong>respuesta ante el cambio</strong> que seguir un plan"</em>
                                </div>
                            </div>
                            <div className="ag-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="ag-intro__level glass">
                                        <span className="ag-intro__level-icon">{lvl.icon}</span>
                                        <span className="ag-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary ag-intro__start"
                                onClick={() => setCurrentLevel(1)}
                                id="start-agile-game"
                            >
                                🚀 Comenzar Juego
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && (
                    <ValuesLevel onComplete={(score) => handleLevelComplete(1, score)} />
                )}

                {currentLevel === 2 && (
                    <PrinciplesLevel onComplete={(score) => handleLevelComplete(2, score)} />
                )}

                {currentLevel === 3 && (
                    <AgileQuiz onComplete={(score) => handleLevelComplete(3, score)} />
                )}

                {currentLevel === 4 && (
                    <AgileResultScreen
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

export default AgileGame
