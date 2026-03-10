import { Link } from 'react-router-dom'

function KanbanResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Impresionante! Entendés a la perfección el flujo pull.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Manchas un buen dominio visualizando el trabajo.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá los conceptos de límites WIP.' }
    else { medal = '📚'; message = 'Necesitás estudiar más sobre Kanban. ¡Intentá de nuevo!' }

    return (
        <div className="kb-results">
            <div className="kb-results__card glass">
                <div className="kb-results__medal">{medal}</div>
                <h2 className="kb-results__title gradient-text">¡Juego Completado!</h2>
                <p className="kb-results__message">{message}</p>

                <div className="kb-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#kanbanScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="kb-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="kanbanScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4facfe" />
                                <stop offset="100%" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="kb-results__score-text">
                        <span className="kb-results__score-num">{totalScore}</span>
                        <span className="kb-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="kb-results__breakdown">
                    <div className="kb-results__row"><span>📋 Nivel 1 — Tablero</span><span className="kb-results__pts">{scores[1]} pts</span></div>
                    <div className="kb-results__row"><span>🚥 Nivel 2 — WIP Limits</span><span className="kb-results__pts">{scores[2]} pts</span></div>
                    <div className="kb-results__row"><span>❓ Nivel 3 — Quiz</span><span className="kb-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="kb-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Jugar de Nuevo</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default KanbanResultScreen
