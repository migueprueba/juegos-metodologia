import { useState } from 'react'
import { QUIZ_QUESTIONS } from './agileData'

function AgileQuiz({ onComplete }) {
    const [currentQ, setCurrentQ] = useState(0)
    const [selected, setSelected] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)

    const question = QUIZ_QUESTIONS[currentQ]
    const isLast = currentQ === QUIZ_QUESTIONS.length - 1

    const handleSelect = (index) => {
        if (showResult) return
        setSelected(index)
        setShowResult(true)

        if (index === question.correct) {
            setCorrectCount((prev) => prev + 1)
        }
    }

    const handleNext = () => {
        if (isLast) {
            const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 35)
            onComplete(finalScore)
        } else {
            setCurrentQ((prev) => prev + 1)
            setSelected(null)
            setShowResult(false)
        }
    }

    return (
        <div className="ag-level">
            <div className="ag-level__header">
                <h2 className="ag-level__title">
                    <span className="ag-level__num">Nivel 3</span>
                    ❓ Quiz del Manifiesto
                </h2>
                <p className="ag-level__desc">
                    Respondé las preguntas sobre el Manifiesto Ágil. ¡Cada respuesta correcta suma puntos!
                </p>
            </div>

            <div className="ag-quiz">
                <div className="ag-quiz__progress">
                    Pregunta {currentQ + 1} de {QUIZ_QUESTIONS.length}
                </div>

                <div className="ag-quiz__card glass">
                    <h3 className="ag-quiz__question">{question.question}</h3>

                    <div className="ag-quiz__options">
                        {question.options.map((option, index) => {
                            let className = 'ag-quiz__option glass'
                            if (showResult) {
                                if (index === question.correct) className += ' is-correct'
                                else if (index === selected) className += ' is-wrong'
                            }

                            return (
                                <button
                                    key={index}
                                    className={className}
                                    onClick={() => handleSelect(index)}
                                    disabled={showResult}
                                >
                                    <span className="ag-quiz__option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span>{option}</span>
                                </button>
                            )
                        })}
                    </div>

                    {showResult && (
                        <div className={`ag-quiz__explanation ${selected === question.correct ? 'is-correct' : 'is-wrong'}`}>
                            <p>{selected === question.correct ? '✅ ¡Correcto!' : '❌ Incorrecto'}</p>
                            <p>{question.explanation}</p>
                        </div>
                    )}

                    {showResult && (
                        <button className="btn btn-primary ag-quiz__next" onClick={handleNext}>
                            {isLast ? '🏁 Ver Resultados' : 'Siguiente →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AgileQuiz
