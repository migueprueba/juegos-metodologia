// RUP Phases layout
export const RUP_PHASES = [
    { id: 'inception', title: 'Inicio (Inception)', icon: '🌱' },
    { id: 'elaboration', title: 'Elaboración', icon: '🏗️' },
    { id: 'construction', title: 'Construcción', icon: '⚙️' },
    { id: 'transition', title: 'Transición', icon: '🚀' },
]

// Level 1: Phase descriptions to match
export const PHASE_DESCRIPTIONS = [
    {
        id: 'desc1',
        text: 'Establecer el caso de negocio, definir el alcance y los límites del sistema.',
        correctPhase: 'inception',
    },
    {
        id: 'desc2',
        text: 'Mitigar riesgos mayores y establecer la arquitectura base ejecutable.',
        correctPhase: 'elaboration',
    },
    {
        id: 'desc3',
        text: 'Desarrollar componentes y funcionalidades restantes de forma iterativa.',
        correctPhase: 'construction',
    },
    {
        id: 'desc4',
        text: 'Desplegar el software al usuario final, capacitaciones y corrección de bugs finales.',
        correctPhase: 'transition',
    },
]

// Level 2: Matrix Disciplines vs Phases (Where do they peak?)
export const RUP_DISCIPLINES = [
    { id: 'req', name: 'Requerimientos', emoji: '📝', peakPhase: 'elaboration', exp: 'Alcanza su pico en la Elaboración mientras definimos Casos de Uso que guían la arquitectura.' },
    { id: 'analysis', name: 'Análisis y Diseño', emoji: '📐', peakPhase: 'elaboration', exp: 'El mayor esfuerzo es en Elaboración para estabilizar la arquitectura.' },
    { id: 'impl', name: 'Implementación (Code)', emoji: '💻', peakPhase: 'construction', exp: 'El pico absoluto de codificación diaria ocurre en la fase de Construcción.' },
    { id: 'test', name: 'Pruebas', emoji: '🧪', peakPhase: 'construction', exp: 'Ocurre en todo momento, pero su volumen de ejecución más alto acompaña a la Implementación en Construcción.' },
    { id: 'deploy', name: 'Despliegue', emoji: '📦', peakPhase: 'transition', exp: 'Toma el esfuerzo principal en la Transición al entregar el producto al usuario.' }
]

// Level 3: Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: 'RUP está fuertemente impulsado (driven) por...',
        options: [
            'Documentación exhaustiva',
            'Casos de Uso (Use Cases)',
            'Diagramas de red',
            'Desarrollo de bases de datos primero'
        ],
        correct: 1,
        explanation: 'RUP es "Use-case driven". Los casos de uso guían el diseño, la implementación y las pruebas desde el inicio.'
    },
    {
        question: 'RUP se describe como un proceso bidimensional. ¿Qué representan las dos dimensiones?',
        options: [
            'Tiempo (Fases/Iteraciones) y Disciplinas de proceso (Workflows)',
            'Presupuesto y Calidad',
            'Frontend y Backend',
            'Desarrolladores y Usuarios'
        ],
        correct: 0,
        explanation: 'La dimensión horizontal es el tiempo (Fases/Iteraciones) y la vertical comprende las disciplinas de proceso estáticas (Requerimientos, Diseño, etc.).'
    },
    {
        question: 'RUP dice estar centrado en la arquitectura ("Architecture-centric"). ¿En qué fase de RUP se debe resolver la arquitectura base ejecutable?',
        options: [
            'Inicio (Inception)',
            'Elaboración (Elaboration)',
            'Construcción (Construction)',
            'Transición (Transition)'
        ],
        correct: 1,
        explanation: 'En Elaboración, se mitigan los riesgos técnicos graves estructurando y probando la arquitectura base.'
    },
    {
        question: '¿Qué enfoque tiene RUP respecto al ciclo de vida tradicional (Cascada)?',
        options: [
            'Es exactamente lo mismo pero con nuevos nombres.',
            'Solo tiene una iteración por todo el proyecto.',
            'Es iterativo e incremental; las disciplinas suceden concurrentemente a lo largo de las fases.',
            'Prohíbe por completo la documentación.'
        ],
        correct: 2,
        explanation: 'RUP rompe el modelo cascada permitiendo que actividades como diseño y pruebas sucedan continuamente a través de múltiples iteraciones.'
    },
    {
        question: '¿Cuál es el hito (milestone) al terminar la fase de Inicio (Inception)?',
        options: [
            'Lifecycle Architecture Milestone',
            'Product Release Milestone',
            'Lifecycle Objective Milestone',
            'Initial Operational Capability Milestone'
        ],
        correct: 2,
        explanation: 'El "Lifecycle Objective" asegura que los stakeholders están de acuerdo con el alcance y el modelo de negocio básico antes de invertir fuertemente.'
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
