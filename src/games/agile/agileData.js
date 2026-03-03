// The 4 Agile values — correct order: "preferred over less-preferred"
export const AGILE_VALUES = [
    {
        id: 1,
        preferred: 'Individuos e interacciones',
        overItem: 'Procesos y herramientas',
    },
    {
        id: 2,
        preferred: 'Software funcionando',
        overItem: 'Documentación extensiva',
    },
    {
        id: 3,
        preferred: 'Colaboración con el cliente',
        overItem: 'Negociación contractual',
    },
    {
        id: 4,
        preferred: 'Respuesta ante el cambio',
        overItem: 'Seguir un plan',
    },
]

// Statements for the true/false level
// Some are real Agile principles, some are fabricated
export const PRINCIPLE_STATEMENTS = [
    {
        text: 'Nuestra mayor prioridad es satisfacer al cliente mediante la entrega temprana y continua de software con valor.',
        isReal: true,
        explanation: 'Este es el primer principio del Manifiesto Ágil.',
    },
    {
        text: 'Los requisitos deben ser completamente definidos y aprobados antes de comenzar cualquier desarrollo.',
        isReal: false,
        explanation: 'Esto describe el enfoque del modelo Cascada, no del Ágil. El enfoque ágil acepta cambios incluso en etapas tardías.',
    },
    {
        text: 'Los procesos ágiles promueven el desarrollo sostenible. Los promotores, desarrolladores y usuarios debemos poder mantener un ritmo constante de forma indefinida.',
        isReal: true,
        explanation: 'Este es uno de los 12 principios del Manifiesto Ágil — promover el ritmo sostenible.',
    },
    {
        text: 'El método más eficiente y efectivo de comunicar información al equipo de desarrollo y entre sus miembros es la conversación cara a cara.',
        isReal: true,
        explanation: 'Este principio ágil resalta la importancia de la comunicación directa.',
    },
    {
        text: 'La documentación detallada es más importante que el software funcionando para medir el progreso del proyecto.',
        isReal: false,
        explanation: 'El Manifiesto Ágil dice lo contrario: "Software funcionando sobre documentación extensiva".',
    },
    {
        text: 'A intervalos regulares, el equipo reflexiona sobre cómo ser más efectivo, luego ajusta su comportamiento en consecuencia.',
        isReal: true,
        explanation: 'Este es el último de los 12 principios — la retrospectiva.',
    },
    {
        text: 'Los cambios en los requisitos deben ser rechazados después de la fase de planificación para mantener el cronograma.',
        isReal: false,
        explanation: 'El Manifiesto Ágil dice: "Aceptamos que los requisitos cambien, incluso en etapas tardías del desarrollo".',
    },
    {
        text: 'Las mejores arquitecturas, requisitos y diseños emergen de equipos auto-organizados.',
        isReal: true,
        explanation: 'Este principio ágil confía en los equipos para tomar decisiones de diseño y arquitectura.',
    },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿En qué año fue publicado el Manifiesto Ágil?',
        options: ['1995', '2001', '2005', '2010'],
        correct: 1,
        explanation: 'El Manifiesto Ágil fue publicado en febrero de 2001 por 17 desarrolladores de software reunidos en Snowbird, Utah.',
    },
    {
        question: '¿Cuántos valores fundamentales tiene el Manifiesto Ágil?',
        options: ['2', '4', '6', '12'],
        correct: 1,
        explanation: 'El Manifiesto Ágil tiene 4 valores fundamentales y 12 principios.',
    },
    {
        question: '¿Cuál de las siguientes NO es una metodología ágil?',
        options: ['Scrum', 'Kanban', 'Modelo Cascada', 'Extreme Programming (XP)'],
        correct: 2,
        explanation: 'El Modelo Cascada es una metodología secuencial, no ágil. Scrum, Kanban y XP son metodologías ágiles.',
    },
    {
        question: '¿Cuál es la principal medida de progreso en el desarrollo ágil?',
        options: [
            'La cantidad de documentación generada',
            'El número de reuniones realizadas',
            'El software funcionando',
            'El porcentaje del presupuesto utilizado',
        ],
        correct: 2,
        explanation: 'Según el Manifiesto Ágil, "El software funcionando es la medida principal de progreso".',
    },
    {
        question: '¿Qué valor ágil prioriza "Colaboración con el cliente" por encima de qué?',
        options: [
            'Procesos y herramientas',
            'Documentación extensiva',
            'Negociación contractual',
            'Seguir un plan',
        ],
        correct: 2,
        explanation: 'El tercer valor del Manifiesto Ágil es: "Colaboración con el cliente sobre negociación contractual".',
    },
]

// Shuffle helper
export function shuffle(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}
