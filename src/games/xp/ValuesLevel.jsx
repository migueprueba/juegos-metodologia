import { useState, useMemo } from 'react'
import { XP_VALUES, VALUE_DESCRIPTIONS, shuffle } from './xpData'

function ValuesLevel({ onComplete }) {
    const shuffledDescs = useMemo(() => shuffle(VALUE_DESCRIPTIONS), [])
    const [matches, setMatches] = useState({}) // descId -> valueId
    const [selectedValue, setSelectedValue] = useState(null)
    const [wrongPair, setWrongPair] = useState(null)

    const matchedDescIds = Object.keys(matches)
    const isComplete = matchedDescIds.length === VALUE_DESCRIPTIONS.length

    const handleValueClick = (valId) => {
        setSelectedValue(valId)
        setWrongPair(null)
    }

    const handleDescClick = (descId, targetValueId) => {
        if (!selectedValue || isComplete) return
        if (matchedDescIds.includes(descId)) return

        if (targetValueId === selectedValue) {
            const newMatches = { ...matches, [descId]: selectedValue }
            setMatches(newMatches)
            setWrongPair(null)

            if (Object.keys(newMatches).length === VALUE_DESCRIPTIONS.length) {
                setTimeout(() => onComplete(30), 1500)
            }
        } else {
            setWrongPair({ value: selectedValue, desc: descId })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedValue(null)
            }, 1000)
        }
    }

    return (
        <div className="xp-level">
            <div className="xp-level__header">
                <h2 className="xp-level__title">
                    <span className="xp-level__num">Nivel 1</span>
                    💎 Los 5 Valores Fundamentales
                </h2>
                <p className="xp-level__desc">
                    Estos valores guían a los equipos XP y dictan por qué es necesaria cada práctica técnica.
                    Hacé click en un valor y luego en su definición exacta.
                </p>
            </div>

            <div className="xp-layout-match">
                {/* Values Col */}
                <div className="xp-match__col">
                    <h3 className="xp-match__col-title">Valores de XP</h3>
                    <div className="xp-values-grid">
                        {XP_VALUES.map((val) => {
                            const isSelected = selectedValue === val.id
                            const isMatched = Object.values(matches).includes(val.id)
                            const isWrong = wrongPair?.value === val.id

                            return (
                                <button
                                    key={val.id}
                                    className={`xp-value-btn glass ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''
                                        } ${isWrong ? 'is-wrong' : ''}`}
                                    onClick={() => handleValueClick(val.id)}
                                    disabled={isMatched}
                                >
                                    <span className="xp-value-btn__text">{val.name}</span>
                                    {isMatched && <span className="xp-value-btn__check">✓</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Descriptions Col */}
                <div className="xp-match__col">
                    <h3 className="xp-match__col-title">Traducción a Comportamientos</h3>
                    {shuffledDescs.map((desc) => {
                        const isMatched = matchedDescIds.includes(desc.id)
                        const isWrong = wrongPair?.desc === desc.id
                        const matchedValInfo = isMatched ? XP_VALUES.find((v) => v.id === matches[desc.id]) : null

                        return (
                            <button
                                key={desc.id}
                                className={`xp-desc-btn glass ${isMatched ? 'is-matched' : ''} ${isWrong ? 'is-wrong' : ''
                                    } ${selectedValue && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleDescClick(desc.id, desc.correctValue)}
                                disabled={isMatched || !selectedValue}
                            >
                                <span>{desc.text}</span>
                                {isMatched && (
                                    <span className="xp-desc-btn__tag">
                                        {matchedValInfo?.name}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {isComplete && (
                <p className="xp-level__feedback xp-level__feedback--success">
                    🎉 ¡Excelente! Los valores humanos aseguran que las prácticas técnicas extremas no se vuelvan un infierno opresivo.
                </p>
            )}
        </div>
    )
}

export default ValuesLevel
