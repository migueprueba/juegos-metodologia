import { useState, useMemo } from 'react'
import { PHASES, shuffle } from './waterfallData'

function PhaseMatch({ onComplete }) {
    const shuffledDescriptions = useMemo(() => shuffle(PHASES), [])

    const [selectedPhase, setSelectedPhase] = useState(null)
    const [matches, setMatches] = useState({}) // phaseId -> descriptionId
    const [wrongPair, setWrongPair] = useState(null)
    const [completed, setCompleted] = useState(false)

    const matchedPhaseIds = Object.keys(matches)
    const matchedDescIds = Object.values(matches)

    const handlePhaseClick = (phaseId) => {
        if (matchedPhaseIds.includes(phaseId)) return
        setSelectedPhase(phaseId)
        setWrongPair(null)
    }

    const handleDescClick = (descPhaseId) => {
        if (!selectedPhase) return
        if (matchedDescIds.includes(descPhaseId)) return

        if (selectedPhase === descPhaseId) {
            // Correct match
            const newMatches = { ...matches, [selectedPhase]: descPhaseId }
            setMatches(newMatches)
            setSelectedPhase(null)
            setWrongPair(null)

            if (Object.keys(newMatches).length === PHASES.length) {
                setCompleted(true)
                setTimeout(() => onComplete(35), 1500)
            }
        } else {
            // Wrong match
            setWrongPair({ phase: selectedPhase, desc: descPhaseId })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedPhase(null)
            }, 800)
        }
    }

    return (
        <div className="wf-level">
            <div className="wf-level__header">
                <h2 className="wf-level__title">
                    <span className="wf-level__num">Nivel 2</span>
                    🔗 Asociá la Descripción
                </h2>
                <p className="wf-level__desc">
                    Hacé click en una fase (izquierda), luego en su descripción correspondiente (derecha) para asociarlas.
                </p>
            </div>

            <div className="wf-match">
                {/* Phases column */}
                <div className="wf-match__col">
                    <h3 className="wf-match__col-title">Fases</h3>
                    {PHASES.map((phase) => {
                        const isMatched = matchedPhaseIds.includes(phase.id)
                        const isSelected = selectedPhase === phase.id
                        const isWrong = wrongPair?.phase === phase.id

                        return (
                            <button
                                key={phase.id}
                                className={`wf-match__item glass ${isMatched ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''
                                    } ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => handlePhaseClick(phase.id)}
                                disabled={isMatched}
                            >
                                <span className="wf-match__item-emoji">{phase.emoji}</span>
                                <span>{phase.name}</span>
                                {isMatched && <span className="wf-match__check">✅</span>}
                            </button>
                        )
                    })}
                </div>

                {/* Descriptions column */}
                <div className="wf-match__col">
                    <h3 className="wf-match__col-title">Descripciones</h3>
                    {shuffledDescriptions.map((phase) => {
                        const isMatched = matchedDescIds.includes(phase.id)
                        const isWrong = wrongPair?.desc === phase.id

                        return (
                            <button
                                key={phase.id}
                                className={`wf-match__item wf-match__item--desc glass ${isMatched ? 'is-matched' : ''
                                    } ${isWrong ? 'is-wrong' : ''} ${selectedPhase && !isMatched ? 'is-clickable' : ''
                                    }`}
                                onClick={() => handleDescClick(phase.id)}
                                disabled={isMatched || !selectedPhase}
                            >
                                <span>{phase.description}</span>
                                {isMatched && <span className="wf-match__check">✅</span>}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="wf-match__counter">
                {matchedPhaseIds.length} / {PHASES.length} asociaciones correctas
            </div>

            {completed && (
                <p className="wf-level__feedback wf-level__feedback--success">
                    🎉 ¡Todas las asociaciones correctas! Pasando al quiz...
                </p>
            )}
        </div>
    )
}

export default PhaseMatch
