import { Link } from 'react-router-dom'

function ResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) {
        medal = '🥇'
        message = '¡Excelente! Sos un experto en el modelo Cascada.'
    } else if (pct >= 70) {
        medal = '🥈'
        message = '¡Muy bien! Tenés un buen dominio del modelo Cascada.'
    } else if (pct >= 50) {
        medal = '🥉'
        message = '¡Nada mal! Pero podés mejorar. ¡Intentá de nuevo!'
    } else {
        medal = '📚'
        message = 'Necesitás repasar un poco más. ¡No te rindas!'
    }

    return (
        <div className="wf-results">
            <div className="wf-results__card glass">
                <div className="wf-results__medal">{medal}</div>
                <h2 className="wf-results__title gradient-text">¡Juego Completado!</h2>
                <p className="wf-results__message">{message}</p>

                <div className="wf-results__score-ring">
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
                            stroke="url(#scoreGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)"
                            className="wf-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6c63ff" />
                                <stop offset="100%" stopColor="#00d4aa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="wf-results__score-text">
                        <span className="wf-results__score-num">{totalScore}</span>
                        <span className="wf-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="wf-results__breakdown">
                    <div className="wf-results__row">
                        <span>🔢 Nivel 1 — Orden</span>
                        <span className="wf-results__pts">{scores[1]} pts</span>
                    </div>
                    <div className="wf-results__row">
                        <span>🔗 Nivel 2 — Asociar</span>
                        <span className="wf-results__pts">{scores[2]} pts</span>
                    </div>
                    <div className="wf-results__row">
                        <span>❓ Nivel 3 — Quiz</span>
                        <span className="wf-results__pts">{scores[3]} pts</span>
                    </div>
                </div>

                <div className="wf-results__actions">
                    <button className="btn btn-primary" onClick={onRestart} id="play-again">
                        🔄 Jugar de Nuevo
                    </button>
                    <Link to="/games" className="btn btn-outline" id="back-games">
                        ← Volver a Juegos
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResultScreen
