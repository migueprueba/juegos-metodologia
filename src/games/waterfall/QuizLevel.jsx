import { useState } from 'react'
import { QUIZ_QUESTIONS } from './waterfallData'

function QuizLevel({ onComplete }) {
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
            const score = Math.round(((correctCount + (selected === question.correct ? 0 : 0)) / QUIZ_QUESTIONS.length) * 35)
            // recalculate including current
            const finalCorrect = correctCount
            const finalScore = Math.round((finalCorrect / QUIZ_QUESTIONS.length) * 35)
            onComplete(finalScore)
        } else {
            setCurrentQ((prev) => prev + 1)
            setSelected(null)
            setShowResult(false)
        }
    }

    return (
        <div className="wf-level">
            <div className="wf-level__header">
                <h2 className="wf-level__title">
                    <span className="wf-level__num">Nivel 3</span>
                    ❓ Quiz de Cascada
                </h2>
                <p className="wf-level__desc">
                    Respondé las preguntas sobre el modelo Cascada. ¡Cada respuesta correcta suma puntos!
                </p>
            </div>

            <div className="wf-quiz">
                <div className="wf-quiz__progress">
                    Pregunta {currentQ + 1} de {QUIZ_QUESTIONS.length}
                </div>

                <div className="wf-quiz__card glass">
                    <h3 className="wf-quiz__question">{question.question}</h3>

                    <div className="wf-quiz__options">
                        {question.options.map((option, index) => {
                            let className = 'wf-quiz__option glass'
                            if (showResult) {
                                if (index === question.correct) className += ' is-correct'
                                else if (index === selected) className += ' is-wrong'
                            } else if (selected === index) {
                                className += ' is-selected'
                            }

                            return (
                                <button
                                    key={index}
                                    className={className}
                                    onClick={() => handleSelect(index)}
                                    disabled={showResult}
                                >
                                    <span className="wf-quiz__option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span>{option}</span>
                                </button>
                            )
                        })}
                    </div>

                    {showResult && (
                        <div className={`wf-quiz__explanation ${selected === question.correct ? 'is-correct' : 'is-wrong'}`}>
                            <p>
                                {selected === question.correct ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                            </p>
                            <p>{question.explanation}</p>
                        </div>
                    )}

                    {showResult && (
                        <button className="btn btn-primary wf-quiz__next" onClick={handleNext} id="quiz-next">
                            {isLast ? '🏁 Ver Resultados' : 'Siguiente →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuizLevel
