// 7 Types of Waste in Software (Muda)
export const LEAN_WASTES = [
    { id: 'w1', name: 'Trabajo Parcialmente Hecho', emoji: '🚧' },
    { id: 'w2', name: 'Características Extra (Gold Plating)', emoji: '✨' },
    { id: 'w3', name: 'Reaprendizaje', emoji: '🔄' },
    { id: 'w4', name: 'Pasamanos (Handoffs)', emoji: '🤹' },
    { id: 'w5', name: 'Cambios de Contexto', emoji: '🔀' },
    { id: 'w6', name: 'Demoras (Delays)', emoji: '⏳' },
    { id: 'w7', name: 'Defectos', emoji: '🐛' },
]

export const WASTE_SCENARIOS = [
    { id: 's1', text: 'Un desarrollador codifica una funcionalidad que el cliente no pidió, "por si acaso"', correctWaste: 'w2' },
    { id: 's2', text: 'El código fuente no está documentado y cada nuevo dev tiene que descifrarlo desde cero', correctWaste: 'w3' },
    { id: 's3', text: 'El código está escrito pero lleva 2 semanas esperando revisión para ir a producción', correctWaste: 'w1' },
    { id: 's4', text: 'Esperar 3 días a que infraestructura apruebe la creación de una base de datos', correctWaste: 'w6' },
    { id: 's5', text: 'Un dev está asignado a 4 proyectos distintos y salta entre ellos cada hora', correctWaste: 'w5' },
    { id: 's6', text: 'El equipo de frontend espera a que el equipo de backend termine la API (sin comunicación)', correctWaste: 'w4' },
    { id: 's7', text: 'Encontrar un bug severo en producción que requiere hotfix inmediato', correctWaste: 'w7' },
]

// 7 Lean Principles
export const LEAN_PRINCIPLES = [
    { id: 'p1', name: 'Eliminar Desperdicios', emoji: '🗑️', desc: 'Identificar y remover todo lo que no aporte valor al cliente.' },
    { id: 'p2', name: 'Construir Calidad Integrada', emoji: '🏗️', desc: 'Prevenir defectos mediante TDD, integración continua o pair programming.' },
    { id: 'p3', name: 'Crear Conocimiento', emoji: '🧠', desc: 'Fomentar el aprendizaje continuo, wikis, retrospectivas y experimentación.' },
    { id: 'p4', name: 'Postergar el Compromiso', emoji: '🛑', desc: 'Tomar decisiones irreversibles en el "Último Momento Responsable" teniendo más info.' },
    { id: 'p5', name: 'Entregar Rápido', emoji: '🏎️', desc: 'Ciclos cortos para obtener feedback rápido y evitar construir el producto equivocado.' },
    { id: 'p6', name: 'Respetar a las Personas', emoji: '🤝', desc: 'Empoderar al equipo, escuchar sus ideas y darles un entorno de confianza.' },
    { id: 'p7', name: 'Optimizar el Todo', emoji: '🌐', desc: 'Evitar optimizaciones locales (ej: devs súper rápidos) si el embudo se traba en QA.' },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: 'En Lean, ¿qué significa "Optimizar el Todo"?',
        options: [
            'Garantizar que todos los desarrolladores escriban código ultra eficiente en C++',
            'Considerar todo el flujo de valor (desde la idea hasta el cliente) en lugar de partes aisladas',
            'Minimizar el número de QA testers contratados',
            'Asegurarse de que no haya reuniones en toda la semana'
        ],
        correct: 1,
        explanation: 'Si mejorás radicalmente la velocidad de desarrollo (optimización local) pero el código choca en QA o infra, el cliente igual recibe tarde. Hay que optimizar toda la cadena de valor.'
    },
    {
        question: 'Según Lean, ¿cuándo se deben tomar decisiones críticas en el diseño técnico del sistema?',
        options: [
            'Todo debe estar decidido en el primer día (Fase de Requerimientos)',
            'A la mitad del proyecto de forma obligatoria',
            'En el "Último Momento Responsable" (Last Responsible Moment)',
            'Nunca, el diseño emergerá mágicamente'
        ],
        correct: 2,
        explanation: 'Postergar el compromiso (Defer Commitment) implica esperar hasta tener la máxima información posible antes de tomar una decisión irreversible, manteniendo las opciones abiertas.'
    },
    {
        question: 'En el contexto del software, ¿qué es un "Desperdicio" (Muda)?',
        options: [
            'Escribir comentarios en el código',
            'Cualquier actividad que no añada valor directo desde la perspectiva del cliente',
            'Las pausas para tomar café',
            'Refactorizar código antiguo'
        ],
        correct: 1,
        explanation: 'En Lean, el valor lo determina el cliente. Si un proceso, espera, o código extra no le sirve al usuario final, se considera Desperdicio.'
    },
    {
        question: '¿Cuál es el propósito del Value Stream Mapping (Mapeo del Flujo de Valor)?',
        options: [
            'Calcular el salario de cada desarrollador',
            'Visualizar los pasos, tiempos y esperas desde la solicitud hasta la entrega para identificar desperdicios',
            'Diseñar la interfaz de usuario final',
            'Crear el esquema de la base de datos'
        ],
        correct: 1,
        explanation: 'VSM es una herramienta gráfica para ver dónde el trabajo fluye y dónde se atasca, evidenciando los Tiempos de Ciclo y de Espera.'
    },
    {
        question: 'El principio "Construir Calidad Integrada" (Build Quality In) sugiere:',
        options: [
            'Tener un enorme departamento de QA al final del ciclo',
            'Solo probar lo básico y arreglarlo en producción',
            'Usar prácticas como TDD y CI para prevenir que los bugs entren al código desde un principio',
            'Escribir un manual de usuario extenso'
        ],
        correct: 2,
        explanation: 'Reparar bugs tardíos es caro (waste). Lean recomienda la prevención (TDD, flujos automatizados de IC) para que la calidad sea inherente al proceso, no una fase final.'
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
