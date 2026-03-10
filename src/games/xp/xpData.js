// 5 Core Values of XP
export const XP_VALUES = [
    { id: 'v1', name: 'Comunicación', emoji: '🗣️' },
    { id: 'v2', name: 'Simplicidad', emoji: 'Minimal' }, // we can use text or emoji
    { id: 'v3', name: 'Retroalimentación', emoji: '🔄' },
    { id: 'v4', name: 'Coraje', emoji: '🦁' },
    { id: 'v5', name: 'Respeto', emoji: '🤝' },
]

export const VALUE_DESCRIPTIONS = [
    { id: 'd1', text: 'Hablar cara a cara diariamente, programar de a pares y tener un vocabulario común. El código explica por sí mismo su intención.', correctValue: 'v1' },
    { id: 'd2', text: 'Hacer solo lo necesario para que el sistema funcione hoy ("You Aren\'t Gonna Need It"). No sobre-diseñar el futuro.', correctValue: 'v2' },
    { id: 'd3', text: 'Tener respuestas constantes y tempranas del sistema (mediante tests continuos) y del cliente (mediante entregas cortas).', correctValue: 'v3' },
    { id: 'd4', text: 'Atreverse a decir la verdad sobre estimaciones, a tirar código malo y reescribirlo, y a dejar de programar cuando se está cansado.', correctValue: 'v4' },
    { id: 'd5', text: 'Confiar en que todos hacen su mejor esfuerzo. El equipo se defiende mutuamente y cada miembro se siente valorado.', correctValue: 'v5' },
]

// Core Practices of XP
export const XP_PRACTICES = [
    { id: 'p1', name: 'TDD (Test-Driven Development)', emoji: '🧪', desc: 'Escribir la prueba unitaria que falla ANTES de escribir el código de producción.' },
    { id: 'p2', name: 'Programación en Pares', emoji: '👥', desc: 'Dos programadores trabajan en la misma máquina: uno escribe el código, el otro piensa estratégicamente.' },
    { id: 'p3', name: 'Integración Continua', emoji: '⚙️', desc: 'Integrar el código nuevo al repositorio principal varias veces al día, pasando todas las pruebas.' },
    { id: 'p4', name: 'Cliente in situ (On-site Customer)', emoji: '🧑‍💼', desc: 'Tener a un representante del negocio disponible todo el tiempo para resolver dudas.' },
    { id: 'p5', name: 'Refactorización', emoji: '🧹', desc: 'Mejorar el diseño interno del código sin cambiar su comportamiento externo.' },
    { id: 'p6', name: 'Propiedad Colectiva', emoji: '🌍', desc: 'Cualquier programador puede cambiar cualquier parte del código en cualquier momento.' },
    { id: 'p7', name: 'Ritmo Sostenible', emoji: '🏃‍♂️', desc: 'Trabajar máximo 40 horas a la semana. Con cansancio, se meten más bugs.' },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: 'En XP, ¿cuál es el objetivo del "Juego de la Planificación" (Planning Game)?',
        options: [
            'Jugar a estimar en puntos usando cartas de póker',
            'Crear un plan de liberación y luego planes de iteración detallados combinando el valor de negocio y las estimaciones técnicas',
            'Programar la base de datos la primer semana del proyecto',
            'El cliente estima cuánto tarda el desarrollador'
        ],
        correct: 1,
        explanation: 'El Planning Game une al negocio (que dicta el QUÉ priorizar) con desarrollo (que estima el CÓMO y CUÁNTO cuesta) para armar Releases e Iterations.'
    },
    {
        question: 'Si en XP "cualquiera puede cambiar cualquier parte del código", ¿cómo evitan romper el sistema?',
        options: [
            'Nadie toca el código de nadie en realidad',
            'Solo se confía en la suerte',
            'La Propiedad Colectiva funciona solo si está respaldada por una robusta Integración Continua y un 100% de Pruebas Unitarias',
            'Se usa una bóveda donde el Tech Lead debe autorizar cada línea'
        ],
        correct: 2,
        explanation: 'Las prácticas en XP se apoyan mutuamente. La propiedad colectiva es posible y segura porque el código viejo y nuevo pasa constantemente por TDD e Integración Continua.'
    },
    {
        question: '¿Qué significa el concepto YAGNI (You Aren\'t Gonna Need It)?',
        options: [
            'No necesitamos más requerimientos, el software está perfecto',
            'No necesitamos pruebas, somos desarrolladores senior',
            'No programar funciones para el futuro incierto, sino resolver lo que se necesita HOY de la manera más simple',
            'El cliente no necesita capacitación'
        ],
        correct: 2,
        explanation: 'YAGNI es la encarnación del Valor de la SIMPLICIDAD. Se evita construir infraestructura compleja para requerimientos que podrían cambiar o nunca llegar.'
    },
    {
        question: '¿Qué opina XP sobre el cansancio y las horas extra?',
        options: [
            'Celebran hacer pizzas a las 3 AM en la oficina',
            'Que las horas extra son aceptables si pagan bien',
            'Si hacés horas extra dos semanas seguidas, algo está mal. El trabajo sistemático con falta de sueño genera defectos',
            'Los fines de semana son el mejor momento para programar porque nadie molesta'
        ],
        correct: 2,
        explanation: 'La práctica del "Ritmo Sostenible" (Energized Work) indica que desarrolladores descansados escriben código de mayor calidad y cometen menos errores.'
    },
    {
        question: '¿Cuál de estos NO es uno de los 5 Valores originales o extendidos de XP?',
        options: [
            'Documentación',
            'Coraje',
            'Comunicación',
            'Simplicidad'
        ],
        correct: 0,
        explanation: 'La Extensa Documentación NO es un valor de XP. Al contrario, prefieren código autodocumentado y comunicación cara a cara constante.'
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
