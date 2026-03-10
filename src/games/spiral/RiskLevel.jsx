import { useState, useMemo } from 'react'
import { RISKS_AND_STRATEGIES, WRONG_STRATEGIES, shuffle } from './spiralData'

function RiskLevel({ onComplete }) {
    const [currentRiskIdx, setCurrentRiskIdx] = useState(0)
    const [feedback, setFeedback] = useState(null)

    const currentRisk = RISKS_AND_STRATEGIES[currentRiskIdx]
    const isLast = currentRiskIdx === RISKS_AND_STRATEGIES.length - 1

    // Generate 4 options: 1 correct, 3 wrong
    const options = useMemo(() => {
        const wrong = shuffle(WRONG_STRATEGIES).slice(0, 3)
        const optionsArray = [
            { id: currentRisk.id, name: currentRisk.strategyName, icon: currentRisk.strategyIcon, correct: true },
            ...wrong.map(w => ({ ...w, correct: false }))
        ]
        return shuffle(optionsArray)
    }, [currentRiskIdx, currentRisk])

    const handleSelect = (option) => {
        if (feedback?.type === 'success') return // Locked

        if (option.correct) {
            setFeedback({ type: 'success', text: `¡Correcto! ${currentRisk.explanation}` })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentRiskIdx(prev => prev + 1)
                    setFeedback(null)
                }
            }, 5000)

        } else {
            setFeedback({ type: 'error', text: `Esa no es una estrategia de mitigación válida para este cuadrente de riesgo. Intentá de nuevo.` })
        }
    }

    return (
        <div className="spiral-level">
            <div className="spiral-level__header">
                <h2 className="spiral-level__title">
                    <span className="spiral-level__num">Nivel 2</span>
                    ⚠️ Gestión y Mitigación de Riesgos
                </h2>
                <p className="spiral-level__desc">
                    El Modelo en Espiral es "impulsado por riesgos". Leé el escenario crítico y elegí
                    qué prototipo o estrategia construirías en el Cuadrante 2 para mitigar ese peligro.
                </p>
            </div>

            <div className="spiral-risk-card glass">
                <span className="spiral-risk-card__icon">🔥</span>
                <h3 className="spiral-risk-card__title">Analizando el Proyecto:</h3>
                <p className="spiral-risk-card__desc">"{currentRisk.risk}"</p>
                <div className="spiral-risk-card__progress">
                    Riesgo {currentRiskIdx + 1} de {RISKS_AND_STRATEGIES.length}
                </div>
            </div>

            <div className="spiral-options-section">
                <h3 className="spiral-options-section__title">Elegí la acción mitigadora adecuada:</h3>
                <div className="spiral-options-grid">
                    {options.map(opt => (
                        <button
                            key={opt.id}
                            className={`spiral-option-btn glass ${feedback && opt.correct && feedback.type === 'success' ? 'is-correct' : ''}`}
                            onClick={() => handleSelect(opt)}
                        >
                            <span className="spiral-option-btn__icon">{opt.icon}</span>
                            <span className="spiral-option-btn__name">{opt.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {feedback && (
                <div className={`spiral-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="spiral-level__feedback spiral-level__feedback--success">
                    🎉 ¡Sobrevivimos! Reducir la incertidumbre a través de prototipos focalizados te ahorrará millones.
                </p>
            )}
        </div>
    )
}

export default RiskLevel
