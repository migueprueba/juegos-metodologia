import { Link } from 'react-router-dom'

function XpResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Extraordinario! Sos un desarrollador verdaderamente "Extremo".' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Manchas un buen dominio de las prácticas ágiles de ingeniería.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá las 12 prácticas principales de XP.' }
    else { medal = '📚'; message = 'Necesitás estudiar más sobre Extreme Programming. ¡Intentá de nuevo!' }

    return (
        <div className="xp-results">
            <div className="xp-results__card glass">
                <div className="xp-results__medal">{medal}</div>
                <h2 className="xp-results__title gradient-text">¡Juego Completado!</h2>
                <p className="xp-results__message">{message}</p>

                <div className="xp-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#xpScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="xp-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="xpScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4facfe" />
                                <stop offset="100%" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="xp-results__score-text">
                        <span className="xp-results__score-num">{totalScore}</span>
                        <span className="xp-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="xp-results__breakdown">
                    <div className="xp-results__row"><span>💎 Nivel 1 — Valores</span><span className="xp-results__pts">{scores[1]} pts</span></div>
                    <div className="xp-results__row"><span>👨‍💻 Nivel 2 — Prácticas</span><span className="xp-results__pts">{scores[2]} pts</span></div>
                    <div className="xp-results__row"><span>❓ Nivel 3 — Quiz</span><span className="xp-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="xp-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Jugar de Nuevo</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default XpResultScreen
