import { useState } from 'react'
import { RUP_PHASES, RUP_DISCIPLINES } from './rupData'

function DisciplinesLevel({ onComplete }) {
    const [currentDiscIdx, setCurrentDiscIdx] = useState(0)
    const [feedback, setFeedback] = useState(null)

    const discipline = RUP_DISCIPLINES[currentDiscIdx]
    const isLast = currentDiscIdx === RUP_DISCIPLINES.length - 1

    const handlePhaseSelect = (phaseId) => {
        if (feedback?.type === 'success') return // Locked

        if (phaseId === discipline.peakPhase) {
            setFeedback({
                type: 'success',
                text: `¡Correcto! ${discipline.exp}`
            })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentDiscIdx(prev => prev + 1)
                    setFeedback(null)
                }
            }, 4000)

        } else {
            setFeedback({
                type: 'error',
                text: `Incorrecto. Aunque la disciplina ocurre en todas las fases, pensá en qué fase se concentra el MAYOR esfuerzo (su pico).`
            })
        }
    }

    return (
        <div className="rup-level">
            <div className="rup-level__header">
                <h2 className="rup-level__title">
                    <span className="rup-level__num">Nivel 2</span>
                    📊 Dimensión de Disciplinas
                </h2>
                <p className="rup-level__desc">
                    En RUP, las disciplinas (tareas) se ejecutan a lo largo de todo el ciclo de vida, pero su esfuerzo varía.
                    Indica en qué fase de las 4 se ubica el <strong>pico máximo de esfuerzo</strong> de la disciplina actual.
                </p>
            </div>

            <div className="rup-disciplines-card glass">
                <span className="rup-disciplines-card__icon">{discipline.emoji}</span>
                <h3 className="rup-disciplines-card__title">Disciplina: {discipline.name}</h3>
                <p className="rup-disciplines-card__sub">Seleccioná la fase donde alcanza su pico máximo de dedicación:</p>

                <div className="rup-phases-grid">
                    {RUP_PHASES.map(phase => (
                        <button
                            key={phase.id}
                            className={`rup-phase-select glass ${feedback && phase.id === discipline.peakPhase && feedback.type === 'success' ? 'is-correct' : ''}`}
                            onClick={() => handlePhaseSelect(phase.id)}
                        >
                            <span className="rup-phase-select__icon">{phase.icon}</span>
                            <span className="rup-phase-select__name">{phase.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {feedback && (
                <div className={`rup-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                    {feedback.type === 'success' && !isLast && <small>Cargando siguiente disciplina...</small>}
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="rup-level__feedback rup-level__feedback--success">
                    🎉 ¡Completaste todas las disciplinas! La matriz bidimensional de RUP es clave para entender cómo varía el enfoque a través del tiempo.
                </p>
            )}
        </div>
    )
}

export default DisciplinesLevel
