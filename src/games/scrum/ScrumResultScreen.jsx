import { Link } from 'react-router-dom'

function ScrumResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) {
        medal = '🥇'
        message = '¡Excelente! Sos un Scrum Master en potencia.'
    } else if (pct >= 70) {
        medal = '🥈'
        message = '¡Muy bien! Tenés un sólido conocimiento de Scrum.'
    } else if (pct >= 50) {
        medal = '🥉'
        message = '¡Nada mal! Repasá los roles y eventos para mejorar.'
    } else {
        medal = '📚'
        message = 'Necesitás estudiar más sobre Scrum. ¡Intentá de nuevo!'
    }

    return (
        <div className="sc-results">
            <div className="sc-results__card glass">
                <div className="sc-results__medal">{medal}</div>
                <h2 className="sc-results__title gradient-text">¡Juego Completado!</h2>
                <p className="sc-results__message">{message}</p>

                <div className="sc-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#scrumScoreGrad)"
                            strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)"
                            className="sc-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="scrumScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6c63ff" />
                                <stop offset="100%" stopColor="#00d4aa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="sc-results__score-text">
                        <span className="sc-results__score-num">{totalScore}</span>
                        <span className="sc-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="sc-results__breakdown">
                    <div className="sc-results__row">
                        <span>👥 Nivel 1 — Roles</span>
                        <span className="sc-results__pts">{scores[1]} pts</span>
                    </div>
                    <div className="sc-results__row">
                        <span>📅 Nivel 2 — Eventos</span>
                        <span className="sc-results__pts">{scores[2]} pts</span>
                    </div>
                    <div className="sc-results__row">
                        <span>❓ Nivel 3 — Quiz</span>
                        <span className="sc-results__pts">{scores[3]} pts</span>
                    </div>
                </div>

                <div className="sc-results__actions">
                    <button className="btn btn-primary" onClick={onRestart} id="play-again-scrum">
                        🔄 Jugar de Nuevo
                    </button>
                    <Link to="/games" className="btn btn-outline" id="back-games-scrum">
                        ← Volver a Juegos
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ScrumResultScreen
