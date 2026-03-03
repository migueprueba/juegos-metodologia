import { Link } from 'react-router-dom'

function DevOpsResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Excelente! Sos un experto en DevOps.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Tenés un sólido conocimiento de DevOps.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Nada mal! Repasá el pipeline y las prácticas para mejorar.' }
    else { medal = '📚'; message = 'Necesitás estudiar más sobre DevOps. ¡Intentá de nuevo!' }

    return (
        <div className="do-results">
            <div className="do-results__card glass">
                <div className="do-results__medal">{medal}</div>
                <h2 className="do-results__title gradient-text">¡Juego Completado!</h2>
                <p className="do-results__message">{message}</p>

                <div className="do-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#devopsScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="do-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="devopsScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6c63ff" />
                                <stop offset="100%" stopColor="#00d4aa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="do-results__score-text">
                        <span className="do-results__score-num">{totalScore}</span>
                        <span className="do-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="do-results__breakdown">
                    <div className="do-results__row"><span>🔄 Nivel 1 — Pipeline</span><span className="do-results__pts">{scores[1]} pts</span></div>
                    <div className="do-results__row"><span>🛠️ Nivel 2 — Prácticas</span><span className="do-results__pts">{scores[2]} pts</span></div>
                    <div className="do-results__row"><span>❓ Nivel 3 — Quiz</span><span className="do-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="do-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Jugar de Nuevo</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default DevOpsResultScreen
