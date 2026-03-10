import { useState } from 'react'
import { XP_PRACTICES } from './xpData'

function PracticesLevel({ onComplete }) {
    const [currentPracticeIdx, setCurrentPracticeIdx] = useState(0)
    const [feedback, setFeedback] = useState(null)

    const practice = XP_PRACTICES[currentPracticeIdx]
    const isLast = currentPracticeIdx === XP_PRACTICES.length - 1

    const handleSelect = (selectedId) => {
        if (feedback?.type === 'success') return // Locked

        if (selectedId === practice.id) {
            setFeedback({ type: 'success', text: `¡Correcto! Esa es la esencia de ${practice.name}.` })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentPracticeIdx(prev => prev + 1)
                    setFeedback(null)
                }
            }, 3000)

        } else {
            setFeedback({ type: 'error', text: `Esa tarjeta no describe la práctica seleccionada.` })
        }
    }

    return (
        <div className="xp-level">
            <div className="xp-level__header">
                <h2 className="xp-level__title">
                    <span className="xp-level__num">Nivel 2</span>
                    👨‍💻 Prácticas de Ingeniería
                </h2>
                <p className="xp-level__desc">
                    XP prescribe reglas técnicas muy estrictas. Leé la descripción de la regla y hacé click en la "Práctica XP" que le corresponde.
                </p>
            </div>

            <div className="xp-practice-card glass">
                <h3 className="xp-practice-card__title">Escenario / Regla:</h3>
                <p className="xp-practice-card__desc">"{practice.desc}"</p>
                <div className="xp-practice-card__progress">
                    Práctica {currentPracticeIdx + 1} de {XP_PRACTICES.length}
                </div>
            </div>

            <div className="xp-practices-grid">
                {XP_PRACTICES.map(p => (
                    <button
                        key={p.id}
                        className={`xp-practice-select glass ${feedback && p.id === practice.id && feedback.type === 'success' ? 'is-correct' : ''}`}
                        onClick={() => handleSelect(p.id)}
                    >
                        <span className="xp-practice-select__icon">{p.emoji}</span>
                        <span className="xp-practice-select__name">{p.name}</span>
                    </button>
                ))}
            </div>

            {feedback && (
                <div className={`xp-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="xp-level__feedback xp-level__feedback--success">
                    🎉 ¡Domadas todas las prácticas! Estas técnicas trabajan en conjunto para sostener la extrema calidad del código.
                </p>
            )}
        </div>
    )
}

export default PracticesLevel
