import { useState, useMemo } from 'react'
import { SCRUM_ROLES, shuffle } from './scrumData'

function RolesLevel({ onComplete }) {
    const allResponsibilities = useMemo(() => {
        const items = SCRUM_ROLES.flatMap((role) =>
            role.responsibilities.map((r) => ({ ...r, roleId: role.id }))
        )
        return shuffle(items)
    }, [])

    const [selectedRole, setSelectedRole] = useState(null)
    const [matches, setMatches] = useState({}) // responsibilityId -> roleId
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

            if (Object.keys(newMatches).length === allResponsibilities.length) {
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
        <div className="sc-level">
            <div className="sc-level__header">
                <h2 className="sc-level__title">
                    <span className="sc-level__num">Nivel 1</span>
                    👥 Roles de Scrum
                </h2>
                <p className="sc-level__desc">
                    Hacé click en un <strong>rol</strong>, luego en la <strong>responsabilidad</strong> que le corresponde.
                </p>
            </div>

            <div className="sc-roles-layout">
                {/* Roles column */}
                <div className="sc-roles__col">
                    <h3 className="sc-roles__col-title">Roles</h3>
                    {SCRUM_ROLES.map((role) => {
                        const isSelected = selectedRole === role.id
                        const isDone = matchedCountForRole(role.id) === role.responsibilities.length
                        const isWrong = wrongPair?.role === role.id

                        return (
                            <button
                                key={role.id}
                                className={`sc-roles__item glass ${isSelected ? 'is-selected' : ''} ${isDone ? 'is-done' : ''
                                    } ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => handleRoleClick(role.id)}
                                disabled={isDone}
                            >
                                <span className="sc-roles__item-emoji">{role.emoji}</span>
                                <span className="sc-roles__item-name">{role.name}</span>
                                {isDone && <span className="sc-roles__check">✅</span>}
                                {!isDone && (
                                    <span className="sc-roles__counter">
                                        {matchedCountForRole(role.id)}/{role.responsibilities.length}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Responsibilities column */}
                <div className="sc-roles__col">
                    <h3 className="sc-roles__col-title">Responsabilidades</h3>
                    {allResponsibilities.map((resp) => {
                        const isMatched = matchedRespIds.includes(resp.id)
                        const isWrong = wrongPair?.resp === resp.id
                        const matchedRole = isMatched ? SCRUM_ROLES.find((r) => r.id === matches[resp.id]) : null

                        return (
                            <button
                                key={resp.id}
                                className={`sc-roles__resp glass ${isMatched ? 'is-matched' : ''} ${isWrong ? 'is-wrong' : ''
                                    } ${selectedRole && !isMatched ? 'is-clickable' : ''}`}
                                onClick={() => handleRespClick(resp)}
                                disabled={isMatched || !selectedRole}
                            >
                                <span>{resp.text}</span>
                                {isMatched && (
                                    <span className="sc-roles__resp-tag">
                                        {matchedRole?.emoji} {matchedRole?.name}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="sc-roles__counter-total">
                {matchedRespIds.length} / {allResponsibilities.length} asociaciones correctas
            </div>

            {completed && (
                <p className="sc-level__feedback sc-level__feedback--success">
                    🎉 ¡Todos los roles asociados correctamente! Pasando al siguiente nivel...
                </p>
            )}
        </div>
    )
}

export default RolesLevel
