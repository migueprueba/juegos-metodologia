import { Link } from 'react-router-dom'

function TddResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Impecable! Escribís código testeable, limpio y seguro por naturaleza.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Dominás el ciclo fundamental de Refactorización en Verde.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá las reglas estrictas de cuándo escribir tests y cuándo refactorizar.' }
    else { medal = '📚'; message = 'Necesitás estudiar más sobre Test-Driven Development. ¡Intentá de nuevo!' }

    return (
        <div className="tdd-results">
            <div className="tdd-results__card glass">
                <div className="tdd-results__medal">{medal}</div>
                <h2 className="tdd-results__title gradient-text">¡Suite en Verde!</h2>
                <p className="tdd-results__message">{message}</p>

                <div className="tdd-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#tddScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="tdd-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="tddScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff4b4b" />
                                <stop offset="50%" stopColor="#f6d365" />
                                <stop offset="100%" stopColor="#20c997" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="tdd-results__score-text">
                        <span className="tdd-results__score-num">{totalScore}</span>
                        <span className="tdd-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="tdd-results__breakdown">
                    <div className="tdd-results__row"><span>🔁 Nivel 1 — El Ciclo</span><span className="tdd-results__pts">{scores[1]} pts</span></div>
                    <div className="tdd-results__row"><span>🤔 Nivel 2 — Escenarios</span><span className="tdd-results__pts">{scores[2]} pts</span></div>
                    <div className="tdd-results__row"><span>❓ Nivel 3 — Quiz</span><span className="tdd-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="tdd-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Reiniciar Suite</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default TddResultScreen
