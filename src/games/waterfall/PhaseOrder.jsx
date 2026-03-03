import { useState, useRef, useEffect } from 'react'
import { PHASES, shuffle } from './waterfallData'

function PhaseOrder({ onComplete }) {
    const [items, setItems] = useState(() => shuffle(PHASES))
    const [dragIndex, setDragIndex] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState([]) // 'correct' | 'wrong' per index

    const handleDragStart = (index) => {
        setDragIndex(index)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

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

    // Click-to-swap for mobile (tap two items to swap them)
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
        const res = items.map((item, i) => (item.id === PHASES[i].id ? 'correct' : 'wrong'))
        setResults(res)
        setChecked(true)

        const allCorrect = res.every((r) => r === 'correct')
        if (allCorrect) {
            // Score: items in correct positions (already 5/5 = 30 points)
            setTimeout(() => onComplete(30), 1500)
        }
    }

    const correctCount = results.filter((r) => r === 'correct').length
    const allCorrect = checked && correctCount === PHASES.length

    return (
        <div className="wf-level">
            <div className="wf-level__header">
                <h2 className="wf-level__title">
                    <span className="wf-level__num">Nivel 1</span>
                    🔢 Ordená las Fases
                </h2>
                <p className="wf-level__desc">
                    Arrastrá (o tocá dos fases para intercambiarlas) y colocá las fases del modelo Cascada en el orden correcto, de arriba hacia abajo.
                </p>
            </div>

            <div className="wf-phase-list">
                {items.map((phase, index) => (
                    <div
                        key={phase.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        onClick={() => handleClick(index)}
                        className={`wf-phase-item glass ${selectedIndex === index ? 'is-selected' : ''
                            } ${results[index] === 'correct' ? 'is-correct' : ''} ${results[index] === 'wrong' ? 'is-wrong' : ''
                            }`}
                    >
                        <span className="wf-phase-item__num">{index + 1}</span>
                        <span className="wf-phase-item__emoji">{phase.emoji}</span>
                        <span className="wf-phase-item__name">{phase.name}</span>
                        <span className="wf-phase-item__grip">⠿</span>
                    </div>
                ))}
            </div>

            {!allCorrect && (
                <button className="btn btn-primary wf-level__check" onClick={handleCheck} id="check-order">
                    ✔ Verificar Orden
                </button>
            )}

            {checked && !allCorrect && (
                <p className="wf-level__feedback wf-level__feedback--partial">
                    {correctCount} de {PHASES.length} en posición correcta. ¡Intentá de nuevo!
                </p>
            )}

            {allCorrect && (
                <p className="wf-level__feedback wf-level__feedback--success">
                    🎉 ¡Perfecto! ¡Orden correcto! Pasando al siguiente nivel...
                </p>
            )}
        </div>
    )
}

export default PhaseOrder
