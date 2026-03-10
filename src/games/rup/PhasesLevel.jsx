import { useState, useMemo } from 'react'
import { RUP_PHASES, PHASE_DESCRIPTIONS, shuffle } from './rupData'

function PhasesLevel({ onComplete }) {
    const shuffledDescs = useMemo(() => shuffle(PHASE_DESCRIPTIONS), [])
    const [matches, setMatches] = useState({}) // descId -> phaseId
    const [selectedPhase, setSelectedPhase] = useState(null)
    const [wrongPair, setWrongPair] = useState(null)

    const matchedDescIds = Object.keys(matches)
    const isComplete = matchedDescIds.length === PHASE_DESCRIPTIONS.length

    const handlePhaseClick = (phaseId) => {
        setSelectedPhase(phaseId)
        setWrongPair(null)
    }

    const handleDescClick = (descId, targetPhaseId) => {
        if (!selectedPhase || isComplete) return
        if (matchedDescIds.includes(descId)) return

        if (targetPhaseId === selectedPhase) {
            const newMatches = { ...matches, [descId]: selectedPhase }
            setMatches(newMatches)
            setWrongPair(null)

            if (Object.keys(newMatches).length === PHASE_DESCRIPTIONS.length) {
                setTimeout(() => onComplete(30), 1500)
            }
        } else {
            setWrongPair({ phase: selectedPhase, desc: descId })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedPhase(null)
            }, 1000)
        }
    }

    return (
        <div className="rup-level">
            <div className="rup-level__header">
                <h2 className="rup-level__title">
                    <span className="rup-level__num">Nivel 1</span>
                    ⏱️ Las 4 Fases
                </h2>
                <p className="rup-level__desc">
                    Enlaza cada una de las 4 Fases secuenciales de RUP con su concepto u objetivo fundamental.
                    Hacé click en una fase y luego en su descripción.
                </p>
            </div>

            <div className="rup-phases-layout">
                {/* Phases Col */}
                <div className="rup-phases__col">
                    <h3 className="rup-phases__col-title">Fases (Tiempo)</h3>
                    {RUP_PHASES.map((phase) => {
                        const isSelected = selectedPhase === phase.id
                        const isMatched = Object.values(matches).includes(phase.id)
                        const isWrong = wrongPair?.phase === phase.id

                        return (
                            <button
                                key={phase.id}
                                className={`rup-phase-btn glass ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''
                                    } ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => handlePhaseClick(phase.id)}
                                disabled={isMatched}
                            >
                                <span className="rup-phase-btn__icon">{phase.icon}</span>
                                <span className="rup-phase-btn__text">{phase.title}</span>
                                {isMatched && <span className="rup-phase-btn__check">✓</span>}
                            </button>
                        )
                    })}
                </div>

                {/* Descriptions Col */}
                <div className="rup-phases__col">
                    <h3 className="rup-phases__col-title">Objetivos Principales</h3>
                    {shuffledDescs.map((desc) => {
                        const isMatched = matchedDescIds.includes(desc.id)
                        const isWrong = wrongPair?.desc === desc.id
                        const matchedPhaseInfo = isMatched ? RUP_PHASES.find((p) => p.id === matches[desc.id]) : null

                        return (
                            <button
                                key={desc.id}
                                className={`rup-desc-btn glass ${isMatched ? 'is-matched' : ''} ${isWrong ? 'is-wrong' : ''
                                    } ${selectedPhase && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleDescClick(desc.id, desc.correctPhase)}
                                disabled={isMatched || !selectedPhase}
                            >
                                <span>{desc.text}</span>
                                {isMatched && (
                                    <span className="rup-desc-btn__tag">
                                        {matchedPhaseInfo?.icon} {matchedPhaseInfo?.title}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {isComplete && (
                <p className="rup-level__feedback rup-level__feedback--success">
                    🎉 ¡Excelente! Las 4 dinámicas vitales agrupadas en las fases correctas. Ojo, un proyecto completo transitará todo este ciclo.
                </p>
            )}
        </div>
    )
}

export default PhasesLevel
