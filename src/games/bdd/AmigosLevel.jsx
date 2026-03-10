import { useState, useMemo } from 'react'
import { AMIGOS_ROLES, shuffle } from './bddData'

function AmigosLevel({ onComplete }) {
    const allPerspectives = useMemo(() => {
        const items = AMIGOS_ROLES.flatMap((role) =>
            role.perspectives.map((p) => ({ ...p, roleId: role.id }))
        )
        return shuffle(items)
    }, [])

    const [selectedRole, setSelectedRole] = useState(null)
    const [matches, setMatches] = useState({}) // perspectiveId -> roleId
    const [wrongPair, setWrongPair] = useState(null)
    const [completed, setCompleted] = useState(false)

    const matchedRespIds = Object.keys(matches)

    const handleRoleClick = (roleId) => {
        setSelectedRole(roleId)
        setWrongPair(null)
    }

    const handleRespClick = (resp) => {
        if (!selectedRole) return
        if (matchedRespIds.includes(resp.id)) return

        if (resp.roleId === selectedRole) {
            const newMatches = { ...matches, [resp.id]: selectedRole }
            setMatches(newMatches)
            setWrongPair(null)

            if (Object.keys(newMatches).length === allPerspectives.length) {
                setCompleted(true)
                setTimeout(() => onComplete(30), 1500)
            }
        } else {
            setWrongPair({ role: selectedRole, resp: resp.id })
            setTimeout(() => {
                setWrongPair(null)
                setSelectedRole(null)
            }, 800)
        }
    }

    // Count matched per role
    const matchedCountForRole = (roleId) =>
        Object.values(matches).filter((id) => id === roleId).length

    return (
        <div className="bdd-level">
            <div className="bdd-level__header">
                <h2 className="bdd-level__title">
                    <span className="bdd-level__num">Nivel 1</span>
                    👥 "Tres Amigos"
                </h2>
                <p className="bdd-level__desc">
                    En BDD, el descubrimiento de requerimientos ocurre en una reunión colaborativa conocida como "Los Tres Amigos".
                    Hacé click en un <strong>rol</strong>, luego asociá sus <strong>perspectivas/preguntas</strong> típicas.
                </p>
            </div>

            <div className="bdd-amigos-layout">
                {/* Roles column */}
                <div className="bdd-amigos__col">
                    <h3 className="bdd-amigos__col-title">Rol (Amigo)</h3>
                    {AMIGOS_ROLES.map((role) => {
                        const isSelected = selectedRole === role.id
                        const isDone = matchedCountForRole(role.id) === role.perspectives.length
                        const isWrong = wrongPair?.role === role.id

                        return (
                            <button
                                key={role.id}
                                className={`bdd-amigos__item glass ${isSelected ? 'is-selected' : ''} ${isDone ? 'is-done' : ''
                                    } ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => handleRoleClick(role.id)}
                                disabled={isDone}
                            >
                                <span className="bdd-amigos__item-emoji">{role.emoji}</span>
                                <span className="bdd-amigos__item-name">{role.name}</span>
                                {isDone && <span className="bdd-amigos__check">✅</span>}
                                {!isDone && (
                                    <span className="bdd-amigos__counter">
                                        {matchedCountForRole(role.id)}/{role.perspectives.length}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Perspectives column */}
                <div className="bdd-amigos__col">
                    <h3 className="bdd-amigos__col-title">Perspectiva en BDD</h3>
                    {allPerspectives.map((resp) => {
                        const isMatched = matchedRespIds.includes(resp.id)
                        const isWrong = wrongPair?.resp === resp.id
                        const matchedRole = isMatched ? AMIGOS_ROLES.find((r) => r.id === matches[resp.id]) : null

                        return (
                            <button
                                key={resp.id}
                                className={`bdd-amigos__resp glass ${isMatched ? 'is-matched' : ''} ${isWrong ? 'is-wrong' : ''
                                    } ${selectedRole && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleRespClick(resp)}
                                disabled={isMatched || !selectedRole}
                            >
                                <span>{resp.text}</span>
                                {isMatched && (
                                    <span className="bdd-amigos__resp-tag">
                                        {matchedRole?.emoji} {matchedRole?.name}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="bdd-amigos__counter-total">
                {matchedRespIds.length} / {allPerspectives.length} asociaciones correctas
            </div>

            {completed && (
                <p className="bdd-level__feedback bdd-level__feedback--success">
                    🎉 ¡Todos los roles completados! Gran colaboración. Pasando al siguiente nivel...
                </p>
            )}
        </div>
    )
}

export default AmigosLevel
