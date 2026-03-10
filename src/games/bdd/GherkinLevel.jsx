import { useState } from 'react'
import { GHERKIN_SCENARIOS } from './bddData'

function GherkinLevel({ onComplete }) {
    const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0)
    const [selections, setSelections] = useState({ given: null, when: null, then: null })
    const [feedback, setFeedback] = useState(null)

    const scenario = GHERKIN_SCENARIOS[currentScenarioIdx]
    const isLast = currentScenarioIdx === GHERKIN_SCENARIOS.length - 1

    const handleSelect = (type, optionId) => {
        if (feedback?.type === 'success') return // Locked while transitioning
        setSelections(prev => ({ ...prev, [type]: optionId }))
        setFeedback(null)
    }

    const handleVerify = () => {
        // Check if all are selected
        if (!selections.given || !selections.when || !selections.then) {
            setFeedback({ type: 'error', text: 'Por favor, completá los 3 bloques (Dado, Cuando, Entonces).' })
            return
        }

        // Check correctness
        const isGivenCorrect = scenario.blocks.find(b => b.type === 'given').options.find(o => o.id === selections.given).correct
        const isWhenCorrect = scenario.blocks.find(b => b.type === 'when').options.find(o => o.id === selections.when).correct
        const isThenCorrect = scenario.blocks.find(b => b.type === 'then').options.find(o => o.id === selections.then).correct

        if (isGivenCorrect && isWhenCorrect && isThenCorrect) {
            setFeedback({ type: 'success', text: `¡Correcto! ${scenario.explanation}` })

            setTimeout(() => {
                if (isLast) {
                    onComplete(35)
                } else {
                    setCurrentScenarioIdx(prev => prev + 1)
                    setSelections({ given: null, when: null, then: null })
                    setFeedback(null)
                }
            }, 4000)
        } else {
            setFeedback({
                type: 'error',
                text: 'Hay errores en tu sintaxis. Recordá usar el lenguaje del negocio (Dominio) y evitar detalles técnicos de implementación o bases de datos.'
            })
        }
    }

    return (
        <div className="bdd-level">
            <div className="bdd-level__header">
                <h2 className="bdd-level__title">
                    <span className="bdd-level__num">Nivel 2</span>
                    🥒 Sintaxis Gherkin
                </h2>
                <p className="bdd-level__desc">
                    Armá el escenario de prueba (Especificación Ejecutable) eligiendo la opción correcta para cada bloque.
                    Recordá mantener la perspectiva del usuario.
                </p>
            </div>

            <div className="bdd-gherkin-scenario glass">
                <h3 className="bdd-gherkin-scenario__title">Escenario: {scenario.title}</h3>
                <p className="bdd-gherkin-scenario__desc">{scenario.description}</p>

                <div className="bdd-gherkin-blocks">
                    {scenario.blocks.map(block => (
                        <div key={block.type} className="bdd-gherkin-block">
                            <span className={`bdd-gherkin-keyword bdd-gherkin-keyword--${block.type}`}>
                                {block.label}
                            </span>
                            <div className="bdd-gherkin-options">
                                {block.options.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`bdd-gherkin-option ${selections[block.type] === opt.id ? 'is-selected' : ''}`}
                                        onClick={() => handleSelect(block.type, opt.id)}
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="btn btn-primary bdd-level__check" onClick={handleVerify}>
                ✔ Validar Escenario
            </button>

            {feedback && (
                <div className={`bdd-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    <p>{feedback.text}</p>
                    {feedback.type === 'success' && !isLast && <small>Cargando siguiente escenario...</small>}
                </div>
            )}

            {feedback?.type === 'success' && isLast && (
                <p className="bdd-level__feedback bdd-level__feedback--success">
                    🎉 ¡Completaste todos los escenarios!
                </p>
            )}
        </div>
    )
}

export default GherkinLevel
