import { useState } from 'react'
import { WIP_SCENARIOS } from './kanbanData'

function WipLevel({ onComplete }) {
    const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0)
    const [feedback, setFeedback] = useState(null)

    const scenario = WIP_SCENARIOS[currentScenarioIdx]
    const isLast = currentScenarioIdx === WIP_SCENARIOS.length - 1

    const handleColClick = (colId) => {
        if (feedback?.type === 'success') return // Wait for next

        if (colId === scenario.correctColumn) {
            setFeedback({
                type: 'success',
                text: `¡Correcto! ${scenario.explanation}`
            })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentScenarioIdx(prev => prev + 1)
                    setFeedback(null)
                }
            }, 3500)

        } else {
            setFeedback({
                type: 'error',
                text: `Incorrecto. Revisá bien los límites WIP (números entre paréntesis) y la cantidad de tarjetas.`
            })
        }
    }

    return (
        <div className="kb-level">
            <div className="kb-level__header">
                <h2 className="kb-level__title">
                    <span className="kb-level__num">Nivel 2</span>
                    🚥 Límites WIP
                </h2>
                <p className="kb-level__desc">
                    Analizá el tablero y detectá problemas en el flujo.
                </p>
            </div>

            <div className="kb-scenario-info glass">
                <h3>Escenario {currentScenarioIdx + 1} de {WIP_SCENARIOS.length}</h3>
                <p>{scenario.description}</p>
            </div>

            <div className="kb-board">
                {scenario.columns.map(col => {
                    const isOverLimit = col.limit && col.count > col.limit

                    return (
                        <div
                            key={col.id}
                            className={`kb-board__col glass is-clickable ${isOverLimit ? 'is-warning' : ''}`}
                            onClick={() => handleColClick(col.id)}
                        >
                            <h3 className="kb-board__col-title">
                                {col.title} <span className="kb-board__wip">({col.limit || '∞'})</span>
                            </h3>

                            <div className="kb-board__cards kb-board__cards--mini">
                                {Array.from({ length: col.count }).map((_, i) => (
                                    <div key={i} className="kb-card-mini"></div>
                                ))}
                                {col.count === 0 && <div className="kb-empty-slot">Vacío</div>}
                            </div>
                        </div>
                    )
                })}
            </div>

            {feedback && (
                <div className={`kb-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                    {feedback.type === 'success' && !isLast && <small>Cargando siguiente escenario...</small>}
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="kb-level__feedback kb-level__feedback--success">
                    🎉 ¡Completaste todos los escenarios WIP!
                </p>
            )}
        </div>
    )
}

export default WipLevel
