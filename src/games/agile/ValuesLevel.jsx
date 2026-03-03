import { useState, useMemo } from 'react'
import { AGILE_VALUES, shuffle } from './agileData'

function ValuesLevel({ onComplete }) {
    const [currentValue, setCurrentValue] = useState(0)
    const [selectedPreferred, setSelectedPreferred] = useState(null)
    const [selectedOver, setSelectedOver] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)

    const value = AGILE_VALUES[currentValue]

    // Shuffle options for each value — mix all preferred and over items
    const allOptions = useMemo(() => {
        const options = AGILE_VALUES.flatMap((v) => [v.preferred, v.overItem])
        return shuffle(options)
    }, [])

    // Already used options from previous correct answers
    const [usedOptions, setUsedOptions] = useState([])

    const availableOptions = allOptions.filter((opt) => !usedOptions.includes(opt))

    const handleSelect = (option, slot) => {
        if (showResult) return
        if (slot === 'preferred') {
            setSelectedPreferred(option)
        } else {
            setSelectedOver(option)
        }
    }

    const handleCheck = () => {
        if (!selectedPreferred || !selectedOver) return

        const correct =
            selectedPreferred === value.preferred && selectedOver === value.overItem
        setIsCorrect(correct)
        setShowResult(true)

        if (correct) {
            setCorrectCount((prev) => prev + 1)
            setUsedOptions((prev) => [...prev, value.preferred, value.overItem])
        }
    }

    const handleNext = () => {
        if (currentValue + 1 >= AGILE_VALUES.length) {
            const score = Math.round((correctCount / AGILE_VALUES.length) * 30)
            onComplete(score)
        } else {
            setCurrentValue((prev) => prev + 1)
            setSelectedPreferred(null)
            setSelectedOver(null)
            setShowResult(false)
            setIsCorrect(false)
        }
    }

    const handleRetry = () => {
        setSelectedPreferred(null)
        setSelectedOver(null)
        setShowResult(false)
        setIsCorrect(false)
    }

    return (
        <div className="ag-level">
            <div className="ag-level__header">
                <h2 className="ag-level__title">
                    <span className="ag-level__num">Nivel 1</span>
                    💎 Completá los Valores
                </h2>
                <p className="ag-level__desc">
                    Seleccioná las dos partes correctas de cada valor ágil. Recordá: "Valoramos más <strong>[X]</strong> sobre <strong>[Y]</strong>".
                </p>
            </div>

            <div className="ag-value-progress">
                Valor {currentValue + 1} de {AGILE_VALUES.length}
            </div>

            <div className="ag-value-card glass">
                <p className="ag-value-card__label">Valoramos más...</p>

                <div className="ag-value-card__slot-area">
                    {/* Preferred slot */}
                    <div className={`ag-value-card__slot ${selectedPreferred ? 'is-filled' : ''} ${showResult && isCorrect ? 'is-correct' : ''} ${showResult && !isCorrect ? 'is-wrong' : ''}`}>
                        {selectedPreferred ? (
                            <span>{selectedPreferred}</span>
                        ) : (
                            <span className="ag-value-card__placeholder">Seleccioná el valor prioritario ↓</span>
                        )}
                    </div>

                    <span className="ag-value-card__over">sobre</span>

                    {/* Over slot */}
                    <div className={`ag-value-card__slot ${selectedOver ? 'is-filled' : ''} ${showResult && isCorrect ? 'is-correct' : ''} ${showResult && !isCorrect ? 'is-wrong' : ''}`}>
                        {selectedOver ? (
                            <span>{selectedOver}</span>
                        ) : (
                            <span className="ag-value-card__placeholder">Seleccioná el valor secundario ↓</span>
                        )}
                    </div>
                </div>

                {/* Options grid */}
                {!showResult && (
                    <div className="ag-value-card__options">
                        {availableOptions.map((option) => (
                            <button
                                key={option}
                                className={`ag-value-card__option glass ${selectedPreferred === option || selectedOver === option ? 'is-selected' : ''
                                    }`}
                                onClick={() => {
                                    if (selectedPreferred === option) {
                                        setSelectedPreferred(null)
                                    } else if (selectedOver === option) {
                                        setSelectedOver(null)
                                    } else if (!selectedPreferred) {
                                        handleSelect(option, 'preferred')
                                    } else if (!selectedOver) {
                                        handleSelect(option, 'over')
                                    }
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {/* Check button */}
                {!showResult && selectedPreferred && selectedOver && (
                    <button className="btn btn-primary ag-value-card__check" onClick={handleCheck}>
                        ✔ Verificar
                    </button>
                )}

                {/* Feedback */}
                {showResult && (
                    <div className={`ag-value-card__feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                        {isCorrect ? (
                            <p>✅ ¡Correcto! "{value.preferred}" <strong>sobre</strong> "{value.overItem}"</p>
                        ) : (
                            <p>❌ Incorrecto. La respuesta correcta es: "{value.preferred}" <strong>sobre</strong> "{value.overItem}"</p>
                        )}
                        {isCorrect || !isCorrect ? (
                            <button className="btn btn-primary" onClick={isCorrect ? handleNext : handleRetry}>
                                {isCorrect
                                    ? currentValue + 1 >= AGILE_VALUES.length
                                        ? 'Siguiente Nivel →'
                                        : 'Siguiente Valor →'
                                    : '🔄 Intentar de nuevo'
                                }
                            </button>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ValuesLevel
