import { useState, useMemo } from 'react'
import { LEAN_WASTES, WASTE_SCENARIOS, shuffle } from './leanData'

function WasteLevel({ onComplete }) {
    const shuffledScenarios = useMemo(() => shuffle(WASTE_SCENARIOS), [])
    const [matches, setMatches] = useState({}) // scenarioId -> wasteId
    const [selectedScenario, setSelectedScenario] = useState(null)
    const [wrongPair, setWrongPair] = useState(null)

    const matchedScenariosIds = Object.keys(matches)
    const isComplete = matchedScenariosIds.length === WASTE_SCENARIOS.length

    const handleScenarioClick = (scenarioId) => {
        setSelectedScenario(scenarioId)
        setWrongPair(null)
    }

    const handleWasteClick = (wasteId) => {
        if (!selectedScenario || isComplete) return

        // Find if target waste matches the corectWaste of the selected scenario
        const scenarioObj = WASTE_SCENARIOS.find(s => s.id === selectedScenario)

        if (wasteId === scenarioObj.correctWaste) {
            const newMatches = { ...matches, [selectedScenario]: wasteId }
            setMatches(newMatches)
            setWrongPair(null)

            if (Object.keys(newMatches).length === WASTE_SCENARIOS.length) {
                setTimeout(() => onComplete(30), 1500)
            }
            setSelectedScenario(null)
        } else {
            setWrongPair({ scenario: selectedScenario, waste: wasteId })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedScenario(null)
            }, 1000)
        }
    }

    // Helper to identify if a waste is already matched
    const isWasteMatched = (wasteId) => Object.values(matches).includes(wasteId)

    return (
        <div className="lean-level">
            <div className="lean-level__header">
                <h2 className="lean-level__title">
                    <span className="lean-level__num">Nivel 1</span>
                    🗑️ Eliminá el Desperdicio (Muda)
                </h2>
                <p className="lean-level__desc">
                    En manufactura, "Muda" es cualquier cosa que no añada valor. En software, tenemos 7 plagas.
                    Seleccioná un problema (escenario) y vinculalo con su traducción al vocabulario Lean.
                </p>
            </div>

            <div className="lean-waste-layout">
                {/* Scenarios Col */}
                <div className="lean-waste__col">
                    <h3 className="lean-waste__col-title">Situación Cotidiana</h3>
                    {shuffledScenarios.map((scenario) => {
                        const isSelected = selectedScenario === scenario.id
                        const isMatched = matchedScenariosIds.includes(scenario.id)
                        const isWrong = wrongPair?.scenario === scenario.id

                        return (
                            <button
                                key={scenario.id}
                                className={`lean-scenario-btn glass ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''
                                    } ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => handleScenarioClick(scenario.id)}
                                disabled={isMatched}
                            >
                                <span>{scenario.text}</span>
                                {isMatched && <span className="lean-scenario-btn__check">✓</span>}
                            </button>
                        )
                    })}
                </div>

                {/* Wastes Col */}
                <div className="lean-waste__col">
                    <h3 className="lean-waste__col-title">Tipos de Desperdicios Lean</h3>
                    <div className="lean-waste-grid">
                        {LEAN_WASTES.map((waste) => {
                            const matched = isWasteMatched(waste.id)
                            const isTargetedWrong = wrongPair?.waste === waste.id

                            return (
                                <button
                                    key={waste.id}
                                    className={`lean-waste-box glass ${matched ? 'is-matched' : ''} ${isTargetedWrong ? 'is-wrong' : ''} ${selectedScenario && !matched ? 'is-clickable' : ''}`}
                                    onClick={() => handleWasteClick(waste.id)}
                                    disabled={matched || !selectedScenario}
                                >
                                    <span className="lean-waste-box__emoji">{waste.emoji}</span>
                                    <span className="lean-waste-box__name">{waste.name}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {isComplete && (
                <p className="lean-level__feedback lean-level__feedback--success">
                    🎉 ¡Excelente! Reconocer el desperdicio es el primer paso vital para eliminarlo.
                </p>
            )}
        </div>
    )
}

export default WasteLevel
