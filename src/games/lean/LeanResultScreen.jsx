import { Link } from 'react-router-dom'

function LeanResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Extraordinario! Sos un sensei de la optimización del flujo.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Manchas un buen dominio de la eliminación de desperdicios.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá los 7 principios fundamentales.' }
    else { medal = '📚'; message = 'Necesitás estudiar más sobre Lean Thinking. ¡Intentá de nuevo!' }

    return (
        <div className="lean-results">
            <div className="lean-results__card glass">
                <div className="lean-results__medal">{medal}</div>
                <h2 className="lean-results__title gradient-text">¡Juego Completado!</h2>
                <p className="lean-results__message">{message}</p>

                <div className="lean-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#leanScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="lean-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="leanScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f6d365" />
                                <stop offset="100%" stopColor="#fda085" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="lean-results__score-text">
                        <span className="lean-results__score-num">{totalScore}</span>
                        <span className="lean-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="lean-results__breakdown">
                    <div className="lean-results__row"><span>🗑️ Nivel 1 — Desperdicios</span><span className="lean-results__pts">{scores[1]} pts</span></div>
                    <div className="lean-results__row"><span>🧠 Nivel 2 — Principios</span><span className="lean-results__pts">{scores[2]} pts</span></div>
                    <div className="lean-results__row"><span>❓ Nivel 3 — Quiz</span><span className="lean-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="lean-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Jugar de Nuevo</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default LeanResultScreen
