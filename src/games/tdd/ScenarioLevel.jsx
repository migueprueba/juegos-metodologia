import { useState } from 'react'
import { TDD_SCENARIOS, TDD_STEPS } from './tddData'

function ScenarioLevel({ onComplete }) {
    const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0)
    const [feedback, setFeedback] = useState(null)

    const scenario = TDD_SCENARIOS[currentScenarioIdx]
    const isLast = currentScenarioIdx === TDD_SCENARIOS.length - 1

    const handleSelect = (stepId) => {
        if (feedback?.type === 'success') return // Locked

        if (stepId === scenario.correctAction) {
            setFeedback({ type: 'success', text: `¡Exacto! ${scenario.explanation}` })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentScenarioIdx(prev => prev + 1)
                    setFeedback(null)
                }
            }, 4500)

        } else {
            setFeedback({ type: 'error', text: `Mmm, revisá las reglas de TDD. Ese no es el paso lógico a seguir en este momento.` })
        }
    }

    return (
        <div className="tdd-level">
            <div className="tdd-level__header">
                <h2 className="tdd-level__title">
                    <span className="tdd-level__num">Nivel 2</span>
                    🤔 ¿Qué sigue ahora?
                </h2>
                <p className="tdd-level__desc">
                    En TDD la disciplina lo es todo. Leé atentamente la situación actual del desarrollador y definí
                    cuál debe ser su <strong>próxima acción inmediata</strong> según las reglas de Kent Beck.
                </p>
            </div>

            <div className="tdd-scenario-card glass">
                <span className="tdd-scenario-card__icon">👩‍💻</span>
                <h3 className="tdd-scenario-card__title">Situación Actual:</h3>
                <p className="tdd-scenario-card__desc">"{scenario.text}"</p>
                <div className="tdd-scenario-card__progress">
                    Caso {currentScenarioIdx + 1} de {TDD_SCENARIOS.length}
                </div>
            </div>

            <div className="tdd-scenario-options">
                <h3 className="tdd-scenario-options__title">¿Qué debés hacer a continuación?</h3>
                <div className="tdd-actions-grid">
                    {TDD_STEPS.map(step => (
                        <button
                            key={step.id}
                            className={`tdd-action-btn glass ${feedback && step.id === scenario.correctAction && feedback.type === 'success' ? 'is-correct' : ''}`}
                            onClick={() => handleSelect(step.id)}
                            style={{ '--action-color': step.color }}
                        >
                            <span className="tdd-action-btn__icon">{step.emoji}</span>
                            <div className="tdd-action-btn__content">
                                <span className="tdd-action-btn__name">Ir a {step.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {feedback && (
                <div className={`tdd-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="tdd-level__feedback tdd-level__feedback--success">
                    🎉 ¡Aprobado! Entender exactamente cuándo tenés permitido refactorizar y cuándo tenés que escribir tests es la base de TDD.
                </p>
            )}
        </div>
    )
}

export default ScenarioLevel
