import { useState, useMemo } from 'react'
import { TDD_STEPS, STEP_DESCRIPTIONS, shuffle } from './tddData'

function CycleLevel({ onComplete }) {
    const shuffledDescs = useMemo(() => shuffle(STEP_DESCRIPTIONS), [])
    const [matches, setMatches] = useState({}) // descId -> stepId
    const [selectedStep, setSelectedStep] = useState(null)
    const [wrongPair, setWrongPair] = useState(null)

    const matchedDescIds = Object.keys(matches)
    const isComplete = matchedDescIds.length === STEP_DESCRIPTIONS.length

    const handleStepClick = (stepId) => {
        setSelectedStep(stepId)
        setWrongPair(null)
    }

    const handleDescClick = (descId, targetStepId) => {
        if (!selectedStep || isComplete) return
        if (matchedDescIds.includes(descId)) return

        if (targetStepId === selectedStep) {
            const newMatches = { ...matches, [descId]: selectedStep }
            setMatches(newMatches)
            setWrongPair(null)

            if (Object.keys(newMatches).length === STEP_DESCRIPTIONS.length) {
                setTimeout(() => onComplete(30), 1500)
            }
        } else {
            setWrongPair({ step: selectedStep, desc: descId })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedStep(null)
            }, 1000)
        }
    }

    return (
        <div className="tdd-level">
            <div className="tdd-level__header">
                <h2 className="tdd-level__title">
                    <span className="tdd-level__num">Nivel 1</span>
                    🔁 El Ciclo Continuo
                </h2>
                <p className="tdd-level__desc">
                    Enlaza cada una de las fases del ciclo estricto (Red, Green, Refactor) con su acción correspondiente.
                </p>
            </div>

            <div className="tdd-layout-match">
                {/* Steps Col */}
                <div className="tdd-match__col">
                    <h3 className="tdd-match__col-title">Fases TDD</h3>
                    <div className="tdd-steps-grid">
                        {TDD_STEPS.map((step) => {
                            const isSelected = selectedStep === step.id
                            const isMatched = Object.values(matches).includes(step.id)
                            const isWrong = wrongPair?.step === step.id

                            return (
                                <button
                                    key={step.id}
                                    className={`tdd-step-btn glass ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''
                                        } ${isWrong ? 'is-wrong' : ''}`}
                                    onClick={() => handleStepClick(step.id)}
                                    disabled={isMatched}
                                    style={{ '--btn-color': step.color }}
                                >
                                    <span className="tdd-step-btn__icon">{step.emoji}</span>
                                    <span className="tdd-step-btn__text">{step.name}</span>
                                    {isMatched && <span className="tdd-step-btn__check" style={{ color: step.color }}>✓</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Descriptions Col */}
                <div className="tdd-match__col">
                    <h3 className="tdd-match__col-title">Acción Técnica</h3>
                    {shuffledDescs.map((desc) => {
                        const isMatched = matchedDescIds.includes(desc.id)
                        const isWrong = wrongPair?.desc === desc.id
                        const matchedStepInfo = isMatched ? TDD_STEPS.find((s) => s.id === matches[desc.id]) : null

                        return (
                            <button
                                key={desc.id}
                                className={`tdd-desc-btn glass ${isMatched ? 'is-matched' : ''} ${isWrong ? 'is-wrong' : ''
                                    } ${selectedStep && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleDescClick(desc.id, desc.correctStep)}
                                disabled={isMatched || !selectedStep}
                            >
                                <span>{desc.text}</span>
                                {isMatched && (
                                    <span className="tdd-desc-btn__tag" style={{ color: matchedStepInfo?.color }}>
                                        {matchedStepInfo?.name}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {isComplete && (
                <p className="tdd-level__feedback tdd-level__feedback--success">
                    🎉 ¡Excelente! Este ciclo rojo-verde-refactor se repite docenas de veces al día para un desarrollador ágil.
                </p>
            )}
        </div>
    )
}

export default CycleLevel
