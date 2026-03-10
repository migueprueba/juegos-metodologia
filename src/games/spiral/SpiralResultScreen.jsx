import { Link } from 'react-router-dom'

function SpiralResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Extraordinario! Identificaste todos los riesgos antes de que causaran pérdidas millonarias.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Manchas un buen dominio de las iteraciones impulsadas por el riesgo.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá los cuadrantes del autor Barry Boehm.' }
    else { medal = '📚'; message = 'Demasiados riesgos sin mitigar. El proyecto fue cancelado. ¡Intentá de nuevo!' }

    return (
        <div className="spiral-results">
            <div className="spiral-results__card glass">
                <div className="spiral-results__medal">{medal}</div>
                <h2 className="spiral-results__title gradient-text">¡Proyecto Entregado!</h2>
                <p className="spiral-results__message">{message}</p>

                <div className="spiral-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#spiralScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="spiral-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="spiralScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fca311" />
                                <stop offset="100%" stopColor="#ffb703" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="spiral-results__score-text">
                        <span className="spiral-results__score-num">{totalScore}</span>
                        <span className="spiral-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="spiral-results__breakdown">
                    <div className="spiral-results__row"><span>🗺️ Nivel 1 — Cuadrantes</span><span className="spiral-results__pts">{scores[1]} pts</span></div>
                    <div className="spiral-results__row"><span>⚠️ Nivel 2 — Riesgos</span><span className="spiral-results__pts">{scores[2]} pts</span></div>
                    <div className="spiral-results__row"><span>❓ Nivel 3 — Quiz</span><span className="spiral-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="spiral-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Siguiente Fase (Jugar de Nuevo)</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default SpiralResultScreen
