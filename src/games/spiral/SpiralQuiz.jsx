import { useState } from 'react'
import { QUIZ_QUESTIONS } from './spiralData'

function SpiralQuiz({ onComplete }) {
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
        if (index === question.correct) setCorrectCount((prev) => prev + 1)
    }

    const handleNext = () => {
        if (isLast) {
            onComplete(Math.round((correctCount / QUIZ_QUESTIONS.length) * 35))
        } else {
            setCurrentQ((prev) => prev + 1)
            setSelected(null)
            setShowResult(false)
        }
    }

    return (
        <div className="spiral-level">
            <div className="spiral-level__header">
                <h2 className="spiral-level__title">
                    <span className="spiral-level__num">Nivel 3</span>
                    ❓ Quiz de Barry Boehm
                </h2>
                <p className="spiral-level__desc">Demostrá tus conocimientos teóricos sobre este complejo y costoso modelo meta-iterativo.</p>
            </div>

            <div className="spiral-quiz">
                <div className="spiral-quiz__progress">
                    Pregunta {currentQ + 1} de {QUIZ_QUESTIONS.length}
                </div>

                <div className="spiral-quiz__card glass">
                    <h3 className="spiral-quiz__question">{question.question}</h3>
                    <div className="spiral-quiz__options">
                        {question.options.map((opt, i) => {
                            let cls = 'spiral-quiz__option glass'
                            if (showResult) {
                                if (i === question.correct) cls += ' is-correct'
                                else if (i === selected) cls += ' is-wrong'
                            }
                            return (
                                <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={showResult}>
                                    <span className="spiral-quiz__option-letter">{String.fromCharCode(65 + i)}</span>
                                    <span>{opt}</span>
                                </button>
                            )
                        })}
                    </div>

                    {showResult && (
                        <div className={`spiral-quiz__explanation ${selected === question.correct ? 'is-correct' : 'is-wrong'}`}>
                            <p>{selected === question.correct ? '✅ ¡Correcto!' : '❌ Incorrecto'}</p>
                            <p>{question.explanation}</p>
                        </div>
                    )}

                    {showResult && (
                        <button className="btn btn-primary spiral-quiz__next" onClick={handleNext}>
                            {isLast ? '🏁 Ver Resultados' : 'Siguiente →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SpiralQuiz
