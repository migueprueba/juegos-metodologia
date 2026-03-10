import { Link } from 'react-router-dom'

function RupResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Impresionante! Sos un arquitecto de software experimentado.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Manchas un buen dominio del proceso iterativo e incremental.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá la relación entre las Fases y las Disciplinas.' }
    else { medal = '📚'; message = 'Necesitás comprender mejor el modelo RUP. ¡Intentá de nuevo!' }

    return (
        <div className="rup-results">
            <div className="rup-results__card glass">
                <div className="rup-results__medal">{medal}</div>
                <h2 className="rup-results__title gradient-text">¡Juego Completado!</h2>
                <p className="rup-results__message">{message}</p>

                <div className="rup-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#rupScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="rup-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="rupScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff758c" />
                                <stop offset="100%" stopColor="#ff7eb3" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="rup-results__score-text">
                        <span className="rup-results__score-num">{totalScore}</span>
                        <span className="rup-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="rup-results__breakdown">
                    <div className="rup-results__row"><span>⏱️ Nivel 1 — Fases</span><span className="rup-results__pts">{scores[1]} pts</span></div>
                    <div className="rup-results__row"><span>📊 Nivel 2 — Disciplinas</span><span className="rup-results__pts">{scores[2]} pts</span></div>
                    <div className="rup-results__row"><span>❓ Nivel 3 — Quiz</span><span className="rup-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="rup-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Jugar de Nuevo</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default RupResultScreen
