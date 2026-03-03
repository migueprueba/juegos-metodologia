import { useState } from 'react'
import { QUIZ_QUESTIONS } from './scrumData'

function ScrumQuiz({ onComplete }) {
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
            const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 40)
            onComplete(finalScore)
        } else {
            setCurrentQ((prev) => prev + 1)
            setSelected(null)
            setShowResult(false)
        }
    }

    return (
        <div className="sc-level">
            <div className="sc-level__header">
                <h2 className="sc-level__title">
                    <span className="sc-level__num">Nivel 3</span>
                    ❓ Quiz de Scrum
                </h2>
                <p className="sc-level__desc">
                    Respondé las preguntas sobre Scrum. ¡Cada respuesta correcta suma puntos!
                </p>
            </div>

            <div className="sc-quiz">
                <div className="sc-quiz__progress">
                    Pregunta {currentQ + 1} de {QUIZ_QUESTIONS.length}
                </div>

                <div className="sc-quiz__card glass">
                    <h3 className="sc-quiz__question">{question.question}</h3>

                    <div className="sc-quiz__options">
                        {question.options.map((option, index) => {
                            let className = 'sc-quiz__option glass'
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
                                    <span className="sc-quiz__option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span>{option}</span>
                                </button>
                            )
                        })}
                    </div>

                    {showResult && (
                        <div className={`sc-quiz__explanation ${selected === question.correct ? 'is-correct' : 'is-wrong'}`}>
                            <p>{selected === question.correct ? '✅ ¡Correcto!' : '❌ Incorrecto'}</p>
                            <p>{question.explanation}</p>
                        </div>
                    )}

                    {showResult && (
                        <button className="btn btn-primary sc-quiz__next" onClick={handleNext}>
                            {isLast ? '🏁 Ver Resultados' : 'Siguiente →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ScrumQuiz
