import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuadrantsLevel from './QuadrantsLevel'
import RiskLevel from './RiskLevel'
import SpiralQuiz from './SpiralQuiz'
import SpiralResultScreen from './SpiralResultScreen'
import './SpiralGame.css'

const LEVELS = [
    { id: 1, name: 'Los Cuadrantes', icon: '🌀' },
    { id: 2, name: 'Gestión de Riesgo', icon: '⚠️' },
    { id: 3, name: 'Quiz Espiral', icon: '❓' },
]

const MAX_SCORE = 100

function SpiralGame() {
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
        <section className="page spiral-game">
            <div className="container section">
                <div className="spiral-header">
                    <Link to="/games" className="spiral-back">← Volver a Juegos</Link>
                    <div className="spiral-header__info">
                        <span className="spiral-header__emoji">🌀</span>
                        <div>
                            <h1 className="spiral-header__title gradient-text">Modelo en Espiral</h1>
                            <p className="spiral-header__sub">Mitigación continua de riesgos a través de iteraciones cíclicas (Barry Boehm, 1986)</p>
                        </div>
                    </div>

                    {currentLevel >= 1 && currentLevel <= 3 && (
                        <div className="spiral-progress">
                            {LEVELS.map((lvl) => (
                                <div
                                    key={lvl.id}
                                    className={`spiral-progress__step ${currentLevel === lvl.id ? 'is-current' : ''
                                        } ${currentLevel > lvl.id ? 'is-done' : ''}`}
                                >
                                    <span className="spiral-progress__icon">{currentLevel > lvl.id ? '✅' : lvl.icon}</span>
                                    <span className="spiral-progress__label">{lvl.name}</span>
                                </div>
                            ))}
                            <div className="spiral-progress__bar">
                                <div className="spiral-progress__fill" style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {currentLevel === 0 && (
                    <div className="spiral-intro">
                        <div className="spiral-intro__card glass">
                            <h2>🎯 ¿Qué es el Modelo en Espiral?</h2>
                            <p>
                                Diseñado para proyectos enormes y de alto costo (ej: desarrollo militar o aeroespacial), este modelo
                                <strong> prioriza el Análisis de Riesgo por sobre todo lo demás</strong>. El proyecto da vueltas iterativas
                                a través de 4 cuadrantes, creando prototipos desechables constantemente para reducir la incertidumbre
                                antes de programar el sistema real.
                            </p>
                            <div className="spiral-intro__image">
                                {/* CSS driven spiral aesthetic placeholder */}
                                <div className="spiral-anim-demo">🌀</div>
                            </div>
                            <div className="spiral-intro__levels">
                                {LEVELS.map((lvl) => (
                                    <div key={lvl.id} className="spiral-intro__level glass">
                                        <span className="spiral-intro__level-icon">{lvl.icon}</span>
                                        <span className="spiral-intro__level-name">Nivel {lvl.id}: {lvl.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary spiral-intro__start" onClick={() => setCurrentLevel(1)}>
                                🚀 Empezar Espiral
                            </button>
                        </div>
                    </div>
                )}

                {currentLevel === 1 && <QuadrantsLevel onComplete={(s) => handleLevelComplete(1, s)} />}
                {currentLevel === 2 && <RiskLevel onComplete={(s) => handleLevelComplete(2, s)} />}
                {currentLevel === 3 && <SpiralQuiz onComplete={(s) => handleLevelComplete(3, s)} />}
                {currentLevel === 4 && (
                    <SpiralResultScreen scores={scores} totalScore={totalScore} maxScore={MAX_SCORE} onRestart={handleRestart} />
                )}
            </div>
        </section>
    )
}

export default SpiralGame
