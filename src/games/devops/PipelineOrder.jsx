import { useState } from 'react'
import { PIPELINE_STAGES, shuffle } from './devopsData'

function PipelineOrder({ onComplete }) {
    const [items, setItems] = useState(() => shuffle(PIPELINE_STAGES))
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
        const res = items.map((item, i) => (item.id === PIPELINE_STAGES[i].id ? 'correct' : 'wrong'))
        setResults(res)
        setChecked(true)

        if (res.every((r) => r === 'correct')) {
            setTimeout(() => onComplete(30), 1500)
        }
    }

    const correctCount = results.filter((r) => r === 'correct').length
    const allCorrect = checked && correctCount === PIPELINE_STAGES.length

    return (
        <div className="do-level">
            <div className="do-level__header">
                <h2 className="do-level__title">
                    <span className="do-level__num">Nivel 1</span>
                    🔄 Pipeline CI/CD
                </h2>
                <p className="do-level__desc">
                    Ordená las etapas del pipeline CI/CD de arriba hacia abajo. Arrastrá o tocá dos etapas para intercambiarlas.
                </p>
            </div>

            <div className="do-pipeline-list">
                {items.map((stage, index) => (
                    <div
                        key={stage.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        onClick={() => handleClick(index)}
                        className={`do-pipeline-item glass ${selectedIndex === index ? 'is-selected' : ''
                            } ${results[index] === 'correct' ? 'is-correct' : ''} ${results[index] === 'wrong' ? 'is-wrong' : ''
                            }`}
                    >
                        <span className="do-pipeline-item__num">{index + 1}</span>
                        <span className="do-pipeline-item__emoji">{stage.emoji}</span>
                        <div className="do-pipeline-item__info">
                            <span className="do-pipeline-item__name">{stage.name}</span>
                            <span className="do-pipeline-item__desc">{stage.description}</span>
                        </div>
                        <span className="do-pipeline-item__grip">⠿</span>
                    </div>
                ))}
            </div>

            {!allCorrect && (
                <button className="btn btn-primary do-level__check" onClick={handleCheck}>
                    ✔ Verificar Orden
                </button>
            )}

            {checked && !allCorrect && (
                <p className="do-level__feedback do-level__feedback--partial">
                    {correctCount} de {PIPELINE_STAGES.length} en posición correcta. ¡Intentá de nuevo!
                </p>
            )}

            {allCorrect && (
                <p className="do-level__feedback do-level__feedback--success">
                    🎉 ¡Pipeline correcto! Pasando al siguiente nivel...
                </p>
            )}
        </div>
    )
}

export default PipelineOrder
