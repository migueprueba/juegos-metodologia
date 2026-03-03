// Scrum roles with their responsibilities
export const SCRUM_ROLES = [
    {
        id: 'po',
        name: 'Product Owner',
        emoji: '👔',
        responsibilities: [
            { id: 'po1', text: 'Gestiona y prioriza el Product Backlog para maximizar el valor del producto.' },
            { id: 'po2', text: 'Representa los intereses de los stakeholders y define la visión del producto.' },
        ],
    },
    {
        id: 'sm',
        name: 'Scrum Master',
        emoji: '🛡️',
        responsibilities: [
            { id: 'sm1', text: 'Facilita los eventos Scrum y elimina impedimentos que bloquean al equipo.' },
            { id: 'sm2', text: 'Promueve y apoya la adopción de Scrum, guiando al equipo en las prácticas ágiles.' },
        ],
    },
    {
        id: 'dev',
        name: 'Development Team',
        emoji: '👩‍💻',
        responsibilities: [
            { id: 'dev1', text: 'Auto-organizado: decide cómo convertir los ítems del backlog en incrementos de producto.' },
            { id: 'dev2', text: 'Entrega un incremento de producto potencialmente desplegable al final de cada Sprint.' },
        ],
    },
]

// Scrum events in correct Sprint timeline order
export const SCRUM_EVENTS = [
    {
        id: 'planning',
        name: 'Sprint Planning',
        emoji: '📋',
        description: 'El equipo planifica qué trabajo se realizará durante el Sprint y cómo se hará.',
    },
    {
        id: 'daily',
        name: 'Daily Scrum',
        emoji: '☀️',
        description: 'Reunión diaria de 15 minutos donde el equipo sincroniza actividades y planifica las próximas 24 horas.',
    },
    {
        id: 'review',
        name: 'Sprint Review',
        emoji: '🔎',
        description: 'El equipo presenta el incremento completado a los stakeholders y recibe feedback.',
    },
    {
        id: 'retro',
        name: 'Sprint Retrospective',
        emoji: '🔄',
        description: 'El equipo reflexiona sobre el Sprint pasado e identifica mejoras para el próximo.',
    },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Cuál es la duración máxima recomendada de un Sprint en Scrum?',
        options: ['1 semana', '2 semanas', '4 semanas (1 mes)', '6 meses'],
        correct: 2,
        explanation: 'Según la Guía de Scrum, un Sprint tiene una duración máxima de un mes (4 semanas). Sprints más cortos son comunes.',
    },
    {
        question: '¿Quién es responsable de priorizar el Product Backlog?',
        options: ['El Scrum Master', 'El Development Team', 'El Product Owner', 'El gerente de proyecto'],
        correct: 2,
        explanation: 'El Product Owner es el único responsable de gestionar y priorizar el Product Backlog.',
    },
    {
        question: '¿Cuánto tiempo dura la Daily Scrum?',
        options: ['5 minutos', '15 minutos', '30 minutos', '1 hora'],
        correct: 1,
        explanation: 'La Daily Scrum es un evento de 15 minutos donde el Development Team sincroniza su trabajo.',
    },
    {
        question: '¿Qué artefacto Scrum contiene la lista ordenada de todo lo que se necesita en el producto?',
        options: ['Sprint Backlog', 'Product Backlog', 'Incremento', 'Burndown Chart'],
        correct: 1,
        explanation: 'El Product Backlog es una lista ordenada de todo lo que se sabe que es necesario en el producto, gestionada por el Product Owner.',
    },
    {
        question: '¿Qué sucede si el trabajo del Sprint no se completa al final del Sprint?',
        options: [
            'Se extiende el Sprint hasta terminar',
            'Los ítems no terminados vuelven al Product Backlog',
            'Se cancela el Sprint automáticamente',
            'El Scrum Master termina el trabajo',
        ],
        correct: 1,
        explanation: 'Los ítems no completados vuelven al Product Backlog para ser re-priorizados. Un Sprint nunca se extiende.',
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
