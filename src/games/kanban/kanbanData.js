// Kanban board stages
export const COLUMNS = [
    { id: 'todo', title: 'To Do', limit: null },
    { id: 'progress', title: 'In Progress', limit: 3 },
    { id: 'review', title: 'Review', limit: 2 },
    { id: 'done', title: 'Done', limit: null },
]

// Level 1: Board Flow tasks
export const BOARD_TASKS = [
    { id: 't1', title: 'Diseñar DB', initialCol: 'todo', targetCol: 'progress', desc: 'Empezando a trabajar en el diseño ahora.' },
    { id: 't2', title: 'API Login', initialCol: 'progress', targetCol: 'review', desc: 'Código terminado, listo para que alguien lo revise.' },
    { id: 't3', title: 'Fix CSS', initialCol: 'review', targetCol: 'done', desc: 'Aprobado por QA, puede ir a producción.' },
    { id: 't4', title: 'Auth Auth0', initialCol: 'todo', targetCol: 'todo', desc: 'Aún no empezamos con esto.' },
]

// Level 2: WIP Limit scenarios
export const WIP_SCENARIOS = [
    {
        id: 1,
        description: 'Encontrá la columna que está superando su límite WIP (cuello de botella).',
        violationType: 'over_limit',
        correctColumn: 'progress',
        columns: [
            { id: 'todo', title: 'To Do', limit: null, count: 5 },
            { id: 'progress', title: 'In Progress', limit: 2, count: 4 }, // Violation! limit 2, count 4
            { id: 'review', title: 'Review', limit: 2, count: 1 },
            { id: 'done', title: 'Done', limit: null, count: 10 },
        ],
        explanation: 'La columna "In Progress" tiene 4 tareas pero su límite es 2. Esto genera un cuello de botella y pérdida de foco.'
    },
    {
        id: 2,
        description: 'Encontrá la columna que está inactiva y podría recibir más trabajo (starving).',
        violationType: 'under_utilization',
        correctColumn: 'review',
        columns: [
            { id: 'todo', title: 'To Do', limit: null, count: 8 },
            { id: 'progress', title: 'In Progress', limit: 3, count: 3 },
            { id: 'review', title: 'Review', limit: 3, count: 0 }, // Starving! limit 3, count 0
            { id: 'done', title: 'Done', limit: null, count: 5 },
        ],
        explanation: 'La columna "Review" está vacía. El equipo encargado de revisar código podría ayudar asumiendo otras tareas para mantener el flujo.'
    },
    {
        id: 3,
        description: 'Identificá dónde está bloqueado el flujo (las tareas se acumulan antes de un límite).',
        violationType: 'bottleneck_before',
        correctColumn: 'review',
        columns: [
            { id: 'todo', title: 'To Do', limit: null, count: 2 },
            { id: 'progress', title: 'In Progress', limit: 3, count: 3 },
            { id: 'review', title: 'Review', limit: 2, count: 2 }, // Full
            { id: 'done', title: 'Done', limit: null, count: 1 },
        ],
        explanation: '"Review" e "In Progress" están al límite. No se pueden mover tareas nuevas desde "To Do" hasta que algo pase a "Done".'
    }
]

// Level 3: Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Cuál es el propósito principal de establecer límites WIP (Work In Progress)?',
        options: [
            'Prevenir que los desarrolladores trabajen demasiado',
            'Minimizar el cambio de contexto y visibilizar cuellos de botella',
            'Asegurar que todas las columnas tengan la misma cantidad de tareas',
            'Reemplazar las estimaciones en puntos de historia'
        ],
        correct: 1,
        explanation: 'Los límites WIP evitan que el equipo se sobrecargue, reducen el "context switching" y exponen rápidamente dónde se atasca el trabajo.'
    },
    {
        question: 'En Kanban, ¿qué significa un sistema "Pull"?',
        options: [
            'Los gerentes "empujan" (push) nuevas tareas al equipo',
            'Las tareas se "jalan" (pull) a la siguiente etapa solo cuando hay capacidad',
            'Hay que extraer (pull) el código de Git todos los días',
            'Obligar al equipo a hacer horas extra'
        ],
        correct: 1,
        explanation: 'Un sistema Pull significa que el trabajo nuevo solo se inicia (se "jala" a la derecha) cuando hay capacidad disponible (respetando el límite WIP), no se presiona (Push) artificialmente.'
    },
    {
        question: '¿Qué mide el "Lead Time" en Kanban?',
        options: [
            'El tiempo desde que el desarrollador empieza a programar hasta que termina',
            'El tiempo total desde que el cliente hace la solicitud hasta que se entrega',
            'La cantidad de bugs por mes',
            'El tiempo que dura una reunión diaria'
        ],
        correct: 1,
        explanation: 'Lead Time es la métrica desde el momento de la solicitud hasta la entrega final (visión del cliente). Cycle Time es desde que se empieza a trabajar hasta que se termina.'
    },
    {
        question: 'Kanban NO prescribe roles específicos como Scrum (ej. Scrum Master).',
        options: [
            'Verdadero, Kanban se adapta a los roles existentes',
            'Falso, Kanban requiere un "Kanban Master"'
        ],
        correct: 0,
        explanation: 'Verdadero. Kanban respeta y se adapta a la estructura, roles y procesos actuales de la organización, promoviendo mejoras evolutivas.'
    },
    {
        question: '¿Qué práctica es fundamental en Kanban?',
        options: [
            'Tener Sprints de exactamente 2 semanas',
            'Estimar todo en Story Points',
            'Visualizar el flujo de trabajo en un tablero',
            'Hacer releases solo los viernes'
        ],
        correct: 2,
        explanation: 'Visualizar el trabajo (generalmente en un tablero) es la primera práctica central de Kanban para entender cómo fluye el valor y dónde están los problemas.'
    }
]

export function shuffle(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}
