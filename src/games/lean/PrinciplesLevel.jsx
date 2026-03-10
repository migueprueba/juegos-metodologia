import { useState } from 'react'
import { LEAN_PRINCIPLES } from './leanData'

function PrinciplesLevel({ onComplete }) {
    const [currentPrincipleIdx, setCurrentPrincipleIdx] = useState(0)
    const [feedback, setFeedback] = useState(null)

    const principle = LEAN_PRINCIPLES[currentPrincipleIdx]
    const isLast = currentPrincipleIdx === LEAN_PRINCIPLES.length - 1

    const handleSelect = (selectedId) => {
        if (feedback?.type === 'success') return // Locked

        if (selectedId === principle.id) {
            setFeedback({ type: 'success', text: `¡Correcto! ${principle.desc}` })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentPrincipleIdx(prev => prev + 1)
                    setFeedback(null)
                }
            }, 3500)

        } else {
            setFeedback({ type: 'error', text: `Ese no es el principio correcto para esta definición.` })
        }
    }

    // We want to show the current description as the "question"
    // And all principles as buttons to select from.
    return (
        <div className="lean-level">
            <div className="lean-level__header">
                <h2 className="lean-level__title">
                    <span className="lean-level__num">Nivel 2</span>
                    🧠 Los 7 Principios
                </h2>
                <p className="lean-level__desc">
                    Leé la definición central y seleccioná a qué principio básico de Lean Software Development corresponde.
                </p>
            </div>

            <div className="lean-principle-card glass">
                <h3 className="lean-principle-card__title">Definición:</h3>
                <p className="lean-principle-card__desc">"{principle.desc}"</p>
                <span className="lean-principle-card__counter">Principio {currentPrincipleIdx + 1} de 7</span>
            </div>

            <div className="lean-principles-grid">
                {LEAN_PRINCIPLES.map(p => (
                    <button
                        key={p.id}
                        className={`lean-principle-select glass ${feedback && p.id === principle.id && feedback.type === 'success' ? 'is-correct' : ''}`}
                        onClick={() => handleSelect(p.id)}
                    >
                        <span className="lean-principle-select__icon">{p.emoji}</span>
                        <span className="lean-principle-select__name">{p.name}</span>
                    </button>
                ))}
            </div>

            {feedback && (
                <div className={`lean-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="lean-level__feedback lean-level__feedback--success">
                    🎉 ¡Principios dominados! Estos 7 pilares guían todas las decisiones técnicas y humanas en un entorno Lean.
                </p>
            )}
        </div>
    )
}

export default PrinciplesLevel
