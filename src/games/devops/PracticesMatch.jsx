import { useState, useMemo } from 'react'
import { DEVOPS_PRACTICES, shuffle } from './devopsData'

function PracticesMatch({ onComplete }) {
    const shuffledDescriptions = useMemo(() => shuffle(DEVOPS_PRACTICES), [])

    const [selectedPractice, setSelectedPractice] = useState(null)
    const [matches, setMatches] = useState({}) // practiceId -> true
    const [wrongPair, setWrongPair] = useState(null)

    const handlePracticeClick = (id) => {
        if (matches[id]) return
        setSelectedPractice(id)
        setWrongPair(null)
    }

    const handleDescClick = (practice) => {
        if (!selectedPractice) return
        if (matches[practice.id]) return

        if (selectedPractice === practice.id) {
            const newMatches = { ...matches, [practice.id]: true }
            setMatches(newMatches)
            setSelectedPractice(null)

            if (Object.keys(newMatches).length === DEVOPS_PRACTICES.length) {
                setTimeout(() => onComplete(35), 1500)
            }
        } else {
            setWrongPair({ practice: selectedPractice, desc: practice.id })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedPractice(null)
            }, 800)
        }
    }

    return (
        <div className="do-level">
            <div className="do-level__header">
                <h2 className="do-level__title">
                    <span className="do-level__num">Nivel 2</span>
                    🛠️ Prácticas DevOps
                </h2>
                <p className="do-level__desc">
                    Hacé click en una <strong>práctica</strong>, luego en la <strong>descripción</strong> que le corresponde.
                </p>
            </div>

            <div className="do-match">
                {/* Practices column */}
                <div className="do-match__col">
                    <h3 className="do-match__col-title">Prácticas</h3>
                    {DEVOPS_PRACTICES.map((p) => {
                        const isMatched = matches[p.id]
                        const isSelected = selectedPractice === p.id
                        const isWrong = wrongPair?.practice === p.id

                        return (
                            <button
                                key={p.id}
                                className={`do-match__item glass ${isSelected ? 'is-selected' : ''} ${isMatched ? 'is-matched' : ''
                                    } ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => handlePracticeClick(p.id)}
                                disabled={isMatched}
                            >
                                <span className="do-match__item-emoji">{p.emoji}</span>
                                <span>{p.name}</span>
                                {isMatched && <span className="do-match__check">✅</span>}
                            </button>
                        )
                    })}
                </div>

                {/* Descriptions column */}
                <div className="do-match__col">
                    <h3 className="do-match__col-title">Descripciones</h3>
                    {shuffledDescriptions.map((p) => {
                        const isMatched = matches[p.id]
                        const isWrong = wrongPair?.desc === p.id

                        return (
                            <button
                                key={p.id}
                                className={`do-match__item do-match__item--desc glass ${isMatched ? 'is-matched' : ''
                                    } ${isWrong ? 'is-wrong' : ''} ${selectedPractice && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleDescClick(p)}
                                disabled={isMatched || !selectedPractice}
                            >
                                <span>{p.description}</span>
                                {isMatched && <span className="do-match__check">✅</span>}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="do-match__counter">
                {Object.keys(matches).length} / {DEVOPS_PRACTICES.length} asociaciones correctas
            </div>
        </div>
    )
}

export default PracticesMatch
