// Waterfall phases in correct order
export const PHASES = [
    {
        id: 'requirements',
        name: 'Requisitos',
        emoji: '📋',
        description: 'Se recopilan y documentan todos los requisitos del sistema antes de comenzar el diseño. El cliente define qué necesita.',
    },
    {
        id: 'design',
        name: 'Diseño',
        emoji: '📐',
        description: 'Se crea la arquitectura del sistema, definiendo la estructura de datos, interfaces y componentes del software.',
    },
    {
        id: 'implementation',
        name: 'Implementación',
        emoji: '💻',
        description: 'Se escribe el código fuente según las especificaciones del diseño. Los programadores construyen el sistema.',
    },
    {
        id: 'verification',
        name: 'Verificación',
        emoji: '🧪',
        description: 'Se realizan pruebas para encontrar errores y verificar que el sistema cumple con los requisitos establecidos.',
    },
    {
        id: 'maintenance',
        name: 'Mantenimiento',
        emoji: '🔧',
        description: 'Se corrigen errores encontrados en producción y se realizan mejoras o adaptaciones al sistema desplegado.',
    },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Cuál es la principal característica del modelo Cascada?',
        options: [
            'Las fases se ejecutan de forma secuencial y lineal',
            'Se trabaja en sprints de 2 semanas',
            'El cliente puede cambiar requisitos en cualquier momento',
            'No requiere documentación',
        ],
        correct: 0,
        explanation: 'El modelo Cascada se caracteriza por ejecutar las fases de forma secuencial — cada fase debe completarse antes de pasar a la siguiente.',
    },
    {
        question: '¿Cuál es una desventaja principal del modelo Cascada?',
        options: [
            'Es muy fácil de entender',
            'Genera mucha documentación',
            'Es difícil volver a fases anteriores para hacer cambios',
            'Requiere demasiados developers',
        ],
        correct: 2,
        explanation: 'La rigidez del modelo hace que volver a fases anteriores sea muy costoso, ya que cada fase depende de la anterior.',
    },
    {
        question: '¿En qué tipo de proyectos funciona mejor el modelo Cascada?',
        options: [
            'Proyectos con requisitos que cambian constantemente',
            'Startups con ideas innovadoras',
            'Proyectos con requisitos claros y bien definidos desde el inicio',
            'Proyectos sin fecha de entrega',
        ],
        correct: 2,
        explanation: 'El modelo Cascada funciona mejor cuando los requisitos son estables y están completamente definidos antes de empezar.',
    },
    {
        question: '¿Quién propuso el modelo Cascada originalmente?',
        options: [
            'Kent Beck',
            'Winston W. Royce',
            'Martin Fowler',
            'Elon Musk',
        ],
        correct: 1,
        explanation: 'Winston W. Royce describió este modelo en su artículo de 1970 "Managing the Development of Large Software Systems".',
    },
    {
        question: '¿Qué sucede si se encuentra un error en la fase de Verificación que se originó en la fase de Requisitos?',
        options: [
            'Se ignora y se continúa',
            'Se soluciona rápidamente sin costo adicional',
            'Puede requerir volver a fases anteriores con alto costo',
            'Se agenda para el próximo sprint',
        ],
        correct: 2,
        explanation: 'Descubrir errores tardíamente en el modelo Cascada es costoso porque puede requerir rehacer trabajo de múltiples fases anteriores.',
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
