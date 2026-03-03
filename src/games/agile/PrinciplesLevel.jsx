import { useState, useMemo } from 'react'
import { PRINCIPLE_STATEMENTS, shuffle } from './agileData'

function PrinciplesLevel({ onComplete }) {
    const statements = useMemo(() => shuffle(PRINCIPLE_STATEMENTS), [])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [answer, setAnswer] = useState(null) // 'true' | 'false'
    const [showResult, setShowResult] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)

    const statement = statements[currentIdx]
    const isLast = currentIdx === statements.length - 1

    const handleAnswer = (userAnswer) => {
        if (showResult) return
        const isCorrect =
            (userAnswer === 'true' && statement.isReal) ||
            (userAnswer === 'false' && !statement.isReal)

        setAnswer(userAnswer)
        setShowResult(true)

        if (isCorrect) {
            setCorrectCount((prev) => prev + 1)
        }
    }

    const handleNext = () => {
        if (isLast) {
            const score = Math.round((correctCount / statements.length) * 35)
            onComplete(score)
        } else {
            setCurrentIdx((prev) => prev + 1)
            setAnswer(null)
            setShowResult(false)
        }
    }

    const isCorrect =
        showResult &&
        ((answer === 'true' && statement.isReal) ||
            (answer === 'false' && !statement.isReal))

    return (
        <div className="ag-level">
            <div className="ag-level__header">
                <h2 className="ag-level__title">
                    <span className="ag-level__num">Nivel 2</span>
                    ✅ Verdadero o Falso
                </h2>
                <p className="ag-level__desc">
                    ¿Es este un principio real del Manifiesto Ágil, o es falso?
                </p>
            </div>

            <div className="ag-principle-progress">
                Afirmación {currentIdx + 1} de {statements.length}
            </div>

            <div className="ag-principle-card glass">
                <blockquote className="ag-principle-card__text">
                    "{statement.text}"
                </blockquote>

                <div className="ag-principle-card__buttons">
                    <button
                        className={`ag-principle-card__btn glass ${showResult && answer === 'true'
                                ? isCorrect
                                    ? 'is-correct'
                                    : 'is-wrong'
                                : ''
                            } ${showResult && statement.isReal && answer !== 'true' ? 'is-actual' : ''}`}
                        onClick={() => handleAnswer('true')}
                        disabled={showResult}
                    >
                        ✅ Verdadero
                    </button>
                    <button
                        className={`ag-principle-card__btn glass ${showResult && answer === 'false'
                                ? isCorrect
                                    ? 'is-correct'
                                    : 'is-wrong'
                                : ''
                            } ${showResult && !statement.isReal && answer !== 'false' ? 'is-actual' : ''}`}
                        onClick={() => handleAnswer('false')}
                        disabled={showResult}
                    >
                        ❌ Falso
                    </button>
                </div>

                {showResult && (
                    <div className={`ag-principle-card__feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                        <p>{isCorrect ? '🎉 ¡Correcto!' : '😞 Incorrecto'}</p>
                        <p>{statement.explanation}</p>
                    </div>
                )}

                {showResult && (
                    <button className="btn btn-primary ag-principle-card__next" onClick={handleNext}>
                        {isLast ? '🏁 Ir al Quiz' : 'Siguiente →'}
                    </button>
                )}
            </div>

            <div className="ag-principle-score">
                {correctCount} / {currentIdx + (showResult ? 1 : 0)} correctas
            </div>
        </div>
    )
}

export default PrinciplesLevel
