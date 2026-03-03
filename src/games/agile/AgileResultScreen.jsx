import { Link } from 'react-router-dom'

function AgileResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) {
        medal = '🥇'
        message = '¡Excelente! Dominás el Manifiesto Ágil a la perfección.'
    } else if (pct >= 70) {
        medal = '🥈'
        message = '¡Muy bien! Tenés un gran conocimiento del Manifiesto Ágil.'
    } else if (pct >= 50) {
        medal = '🥉'
        message = '¡Nada mal! Podés mejorar repasando los valores y principios.'
    } else {
        medal = '📚'
        message = 'Necesitás repasar el Manifiesto Ágil. ¡No te rindas!'
    }

    return (
        <div className="ag-results">
            <div className="ag-results__card glass">
                <div className="ag-results__medal">{medal}</div>
                <h2 className="ag-results__title gradient-text">¡Juego Completado!</h2>
                <p className="ag-results__message">{message}</p>

                <div className="ag-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle
                            cx="60" cy="60" r="52"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="60" cy="60" r="52"
                            fill="none"
                            stroke="url(#agileScoreGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)"
                            className="ag-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="agileScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6c63ff" />
                                <stop offset="100%" stopColor="#00d4aa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="ag-results__score-text">
                        <span className="ag-results__score-num">{totalScore}</span>
                        <span className="ag-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="ag-results__breakdown">
                    <div className="ag-results__row">
                        <span>💎 Nivel 1 — Valores</span>
                        <span className="ag-results__pts">{scores[1]} pts</span>
                    </div>
                    <div className="ag-results__row">
                        <span>✅ Nivel 2 — Principios</span>
                        <span className="ag-results__pts">{scores[2]} pts</span>
                    </div>
                    <div className="ag-results__row">
                        <span>❓ Nivel 3 — Quiz</span>
                        <span className="ag-results__pts">{scores[3]} pts</span>
                    </div>
                </div>

                <div className="ag-results__actions">
                    <button className="btn btn-primary" onClick={onRestart} id="play-again-agile">
                        🔄 Jugar de Nuevo
                    </button>
                    <Link to="/games" className="btn btn-outline" id="back-games-agile">
                        ← Volver a Juegos
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AgileResultScreen
