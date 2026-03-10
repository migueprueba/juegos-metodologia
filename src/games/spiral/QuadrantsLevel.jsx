import { useState, useMemo } from 'react'
import { QUADRANTS, QUADRANT_DESCRIPTIONS, shuffle } from './spiralData'

function QuadrantsLevel({ onComplete }) {
    const shuffledDescs = useMemo(() => shuffle(QUADRANT_DESCRIPTIONS), [])
    const [matches, setMatches] = useState({}) // descId -> quadId
    const [selectedQuad, setSelectedQuad] = useState(null)
    const [wrongPair, setWrongPair] = useState(null)

    const matchedDescIds = Object.keys(matches)
    const isComplete = matchedDescIds.length === QUADRANT_DESCRIPTIONS.length

    const handleQuadClick = (quadId) => {
        setSelectedQuad(quadId)
        setWrongPair(null)
    }

    const handleDescClick = (descId, targetQuadId) => {
        if (!selectedQuad || isComplete) return
        if (matchedDescIds.includes(descId)) return

        if (targetQuadId === selectedQuad) {
            const newMatches = { ...matches, [descId]: selectedQuad }
            setMatches(newMatches)
            setWrongPair(null)

            if (Object.keys(newMatches).length === QUADRANT_DESCRIPTIONS.length) {
                setTimeout(() => onComplete(30), 1500)
            }
        } else {
            setWrongPair({ quad: selectedQuad, desc: descId })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedQuad(null)
            }, 1000)
        }
    }

    return (
        <div className="spiral-level">
            <div className="spiral-level__header">
                <h2 className="spiral-level__title">
                    <span className="spiral-level__num">Nivel 1</span>
                    🗺️ Los 4 Cuadrantes
                </h2>
                <p className="spiral-level__desc">
                    En cada iteración, el modelo gira a través de 4 fases (cuadrantes). Conecta el cuadrante con el trabajo que se realiza dentro de él.
                </p>
            </div>

            <div className="spiral-layout-match">
                {/* Quadrants Col */}
                <div className="spiral-match__col">
                    <h3 className="spiral-match__col-title">Cuadrantes</h3>
                    <div className="spiral-quads-grid">
                        {QUADRANTS.map((quad) => {
                            const isSelected = selectedQuad === quad.id
                            const isMatched = Object.values(matches).includes(quad.id)
                            const isWrong = wrongPair?.quad === quad.id

                            return (
                                <button
                                    key={quad.id}
                                    className={`spiral-quad-btn glass ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''
                                        } ${isWrong ? 'is-wrong' : ''}`}
                                    onClick={() => handleQuadClick(quad.id)}
                                    disabled={isMatched}
                                    style={{ '--btn-color': quad.color }}
                                >
                                    <span className="spiral-quad-btn__icon">{quad.emoji}</span>
                                    <span className="spiral-quad-btn__text">{quad.name}</span>
                                    {isMatched && <span className="spiral-quad-btn__check" style={{ color: quad.color }}>✓</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Descriptions Col */}
                <div className="spiral-match__col">
                    <h3 className="spiral-match__col-title">Trabajo Realizado</h3>
                    {shuffledDescs.map((desc) => {
                        const isMatched = matchedDescIds.includes(desc.id)
                        const isWrong = wrongPair?.desc === desc.id
                        const matchedQuadInfo = isMatched ? QUADRANTS.find((q) => q.id === matches[desc.id]) : null

                        return (
                            <button
                                key={desc.id}
                                className={`spiral-desc-btn glass ${isMatched ? 'is-matched' : ''} ${isWrong ? 'is-wrong' : ''
                                    } ${selectedQuad && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleDescClick(desc.id, desc.correctQuadrant)}
                                disabled={isMatched || !selectedQuad}
                            >
                                <span>{desc.text}</span>
                                {isMatched && (
                                    <span className="spiral-desc-btn__tag" style={{ color: matchedQuadInfo?.color }}>
                                        {matchedQuadInfo?.name}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {isComplete && (
                <p className="spiral-level__feedback spiral-level__feedback--success">
                    🎉 ¡Excelente! Esta estructura cíclica asegura que nunca se avance demasiado sin lidiar con el riesgo latente.
                </p>
            )}
        </div>
    )
}

export default QuadrantsLevel
