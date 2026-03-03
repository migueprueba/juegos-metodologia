import { useState } from 'react'
import { SCRUM_EVENTS, shuffle } from './scrumData'

function EventsOrder({ onComplete }) {
    const [items, setItems] = useState(() => shuffle(SCRUM_EVENTS))
    const [dragIndex, setDragIndex] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState([])

    const handleDragStart = (index) => setDragIndex(index)
    const handleDragOver = (e) => e.preventDefault()

    const handleDrop = (targetIndex) => {
        if (dragIndex === null || dragIndex === targetIndex) return
        const newItems = [...items]
        const [moved] = newItems.splice(dragIndex, 1)
        newItems.splice(targetIndex, 0, moved)
        setItems(newItems)
        setDragIndex(null)
        setChecked(false)
        setResults([])
    }

    const handleClick = (index) => {
        if (checked) return
        if (selectedIndex === null) {
            setSelectedIndex(index)
        } else {
            if (selectedIndex !== index) {
                const newItems = [...items]
                    ;[newItems[selectedIndex], newItems[index]] = [newItems[index], newItems[selectedIndex]]
                setItems(newItems)
                setResults([])
            }
            setSelectedIndex(null)
        }
    }

    const handleCheck = () => {
        const res = items.map((item, i) => (item.id === SCRUM_EVENTS[i].id ? 'correct' : 'wrong'))
        setResults(res)
        setChecked(true)

        if (res.every((r) => r === 'correct')) {
            setTimeout(() => onComplete(30), 1500)
        }
    }

    const correctCount = results.filter((r) => r === 'correct').length
    const allCorrect = checked && correctCount === SCRUM_EVENTS.length

    return (
        <div className="sc-level">
            <div className="sc-level__header">
                <h2 className="sc-level__title">
                    <span className="sc-level__num">Nivel 2</span>
                    📅 Eventos del Sprint
                </h2>
                <p className="sc-level__desc">
                    Ordená los eventos Scrum en el orden correcto de un Sprint, de arriba hacia abajo.
                    Arrastrá o tocá dos eventos para intercambiarlos.
                </p>
            </div>

            <div className="sc-events-list">
                {items.map((event, index) => (
                    <div
                        key={event.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        onClick={() => handleClick(index)}
                        className={`sc-events-item glass ${selectedIndex === index ? 'is-selected' : ''
                            } ${results[index] === 'correct' ? 'is-correct' : ''} ${results[index] === 'wrong' ? 'is-wrong' : ''
                            }`}
                    >
                        <span className="sc-events-item__num">{index + 1}</span>
                        <span className="sc-events-item__emoji">{event.emoji}</span>
                        <div className="sc-events-item__info">
                            <span className="sc-events-item__name">{event.name}</span>
                            <span className="sc-events-item__desc">{event.description}</span>
                        </div>
                        <span className="sc-events-item__grip">⠿</span>
                    </div>
                ))}
            </div>

            {!allCorrect && (
                <button className="btn btn-primary sc-level__check" onClick={handleCheck} id="check-events">
                    ✔ Verificar Orden
                </button>
            )}

            {checked && !allCorrect && (
                <p className="sc-level__feedback sc-level__feedback--partial">
                    {correctCount} de {SCRUM_EVENTS.length} en posición correcta. ¡Intentá de nuevo!
                </p>
            )}

            {allCorrect && (
                <p className="sc-level__feedback sc-level__feedback--success">
                    🎉 ¡Orden correcto! Pasando al quiz...
                </p>
            )}
        </div>
    )
}

export default EventsOrder
