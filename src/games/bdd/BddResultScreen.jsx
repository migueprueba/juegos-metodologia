import { Link } from 'react-router-dom'

function BddResultScreen({ scores, totalScore, maxScore, onRestart }) {
    const pct = Math.round((totalScore / maxScore) * 100)

    let medal, message
    if (pct >= 90) { medal = '🥇'; message = '¡Increíble! Sos experto en crear un Entendimiento Compartido.' }
    else if (pct >= 70) { medal = '🥈'; message = '¡Muy bien! Manchas un buen dominio de la sintaxis Gherkin y BDD.' }
    else if (pct >= 50) { medal = '🥉'; message = '¡Casi! Repasá los enfoques de Negocio, Dev y QA.' }
    else { medal = '📚'; message = 'Necesitás repasar los conceptos de Behavior-Driven Development. ¡Intentá de nuevo!' }

    return (
        <div className="bdd-results">
            <div className="bdd-results__card glass">
                <div className="bdd-results__medal">{medal}</div>
                <h2 className="bdd-results__title gradient-text">¡Juego Completado!</h2>
                <p className="bdd-results__message">{message}</p>

                <div className="bdd-results__score-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke="url(#bddScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${(pct / 100) * 327} 327`}
                            transform="rotate(-90 60 60)" className="bdd-results__ring-fill"
                        />
                        <defs>
                            <linearGradient id="bddScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#20c997" />
                                <stop offset="100%" stopColor="#845ef7" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="bdd-results__score-text">
                        <span className="bdd-results__score-num">{totalScore}</span>
                        <span className="bdd-results__score-max">/ {maxScore}</span>
                    </div>
                </div>

                <div className="bdd-results__breakdown">
                    <div className="bdd-results__row"><span>👥 Nivel 1 — Amigos</span><span className="bdd-results__pts">{scores[1]} pts</span></div>
                    <div className="bdd-results__row"><span>🥒 Nivel 2 — Gherkin</span><span className="bdd-results__pts">{scores[2]} pts</span></div>
                    <div className="bdd-results__row"><span>❓ Nivel 3 — Quiz</span><span className="bdd-results__pts">{scores[3]} pts</span></div>
                </div>

                <div className="bdd-results__actions">
                    <button className="btn btn-primary" onClick={onRestart}>🔄 Jugar de Nuevo</button>
                    <Link to="/games" className="btn btn-outline">← Volver a Juegos</Link>
                </div>
            </div>
        </div>
    )
}

export default BddResultScreen
