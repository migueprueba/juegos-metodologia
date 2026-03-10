import { useState } from 'react'
import { COLUMNS, BOARD_TASKS, shuffle } from './kanbanData'

function BoardLevel({ onComplete }) {
    // We manage the current column of each task
    const [tasks, setTasks] = useState(() => {
        return BOARD_TASKS.map(t => ({ ...t, currentCol: t.initialCol }))
    })

    const [selectedTask, setSelectedTask] = useState(null)
    const [feedback, setFeedback] = useState(null)

    // Calculate if Level is won
    const isComplete = tasks.every(t => t.currentCol === t.targetCol)

    const handleTaskClick = (taskId) => {
        if (isComplete) return
        if (selectedTask === taskId) {
            setSelectedTask(null) // deselect
        } else {
            setSelectedTask(taskId)
            setFeedback(null)
        }
    }

    const handleColClick = (colId) => {
        if (!selectedTask || isComplete) return

        const task = tasks.find(t => t.id === selectedTask)

        if (task.currentCol === colId) {
            setSelectedTask(null)
            return
        }

        if (colId === task.targetCol) {
            // Correct move
            setTasks(prev => prev.map(t => t.id === selectedTask ? { ...t, currentCol: colId } : t))
            setSelectedTask(null)
            setFeedback({ type: 'success', text: `¡Bien! Moviste "${task.title}" a la columna correcta.` })

            // Check win condition in the next frame
            setTimeout(() => {
                setTasks(currentTasks => {
                    if (currentTasks.every(t => t.currentCol === t.targetCol)) {
                        setTimeout(() => onComplete(30), 1500)
                    }
                    return currentTasks
                })
            }, 0)

        } else {
            // Wrong move
            setFeedback({ type: 'error', text: `La tarea "${task.title}" no pertenece a esa columna según su estado. Leé bien su descripción.` })
            setSelectedTask(null)
        }
    }

    return (
        <div className="kb-level">
            <div className="kb-level__header">
                <h2 className="kb-level__title">
                    <span className="kb-level__num">Nivel 1</span>
                    📋 Flujo Kanban
                </h2>
                <p className="kb-level__desc">
                    Seleccioná una tarjeta y luego hacé click en la columna a la que debe avanzar (o quedarse) según su descripción.
                </p>
            </div>

            <div className="kb-board">
                {COLUMNS.map(col => {
                    const colTasks = tasks.filter(t => t.currentCol === col.id)
                    const isSelectedTarget = selectedTask && true

                    return (
                        <div
                            key={col.id}
                            className={`kb-board__col glass ${isSelectedTarget ? 'is-targetable' : ''}`}
                            onClick={() => handleColClick(col.id)}
                        >
                            <h3 className="kb-board__col-title">
                                {col.title} <span className="kb-board__col-count">{colTasks.length}</span>
                            </h3>

                            <div className="kb-board__cards">
                                {colTasks.map(task => {
                                    const isSelected = selectedTask === task.id
                                    const isDone = task.currentCol === task.targetCol && task.targetCol !== task.initialCol

                                    return (
                                        <div
                                            key={task.id}
                                            className={`kb-card ${isSelected ? 'is-selected' : ''} ${isDone ? 'is-done' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation() // Prevent column click
                                                handleTaskClick(task.id)
                                            }}
                                        >
                                            <div className="kb-card__header">
                                                <strong>{task.title}</strong>
                                                {isDone && <span>✅</span>}
                                            </div>
                                            <p className="kb-card__desc">{task.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {feedback && !isComplete && (
                <div className={`kb-feedback glass ${feedback.type === 'error' ? 'is-error' : 'is-success'}`}>
                    {feedback.text}
                </div>
            )}

            {isComplete && (
                <p className="kb-level__feedback kb-level__feedback--success">
                    🎉 ¡Excelente! Transitaste todas las tareas correctamente a través del tablero.
                </p>
            )}
        </div>
    )
}

export default BoardLevel
