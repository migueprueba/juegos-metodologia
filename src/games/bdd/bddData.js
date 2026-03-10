// The "Three Amigos" roles and their perspectives
export const AMIGOS_ROLES = [
    {
        id: 'business',
        name: 'Negocio (Business)',
        emoji: '💼',
        perspectives: [
            { id: 'b1', text: '¿Qué problema estamos intentando resolver y qué valor aporta?' },
            { id: 'b2', text: 'Define los criterios de aceptación y las reglas de negocio.' },
        ],
    },
    {
        id: 'dev',
        name: 'Desarrollo (Developer)',
        emoji: '💻',
        perspectives: [
            { id: 'd1', text: '¿Cómo podemos implementar esta solución técnicamente?' },
            { id: 'd2', text: 'Identifica las limitaciones técnicas y la viabilidad del diseño.' },
        ],
    },
    {
        id: 'qa',
        name: 'Pruebas (QA / Tester)',
        emoji: '🕵️‍♀️',
        perspectives: [
            { id: 'q1', text: '¿Qué pasa si ocurre lo inesperado? (Casos borde y flujos alternativos)' },
            { id: 'q2', text: 'Define cómo verificaremos que el software cumple con los criterios de aceptación.' },
        ],
    },
]

// Gherkin syntax scenarios
export const GHERKIN_SCENARIOS = [
    {
        id: 1,
        title: 'Login Exitoso',
        description: 'Permitir que un usuario con credenciales válidas inicie sesión.',
        blocks: [
            {
                type: 'given',
                label: 'Dado (Contexto inicial)',
                options: [
                    { id: 'g1', text: 'que el usuario está en la página de inicio de sesión', correct: true },
                    { id: 'g2', text: 'que el servidor devuelve un error 500', correct: false },
                    { id: 'g3', text: 'que el usuario ingresa su contraseña', correct: false },
                ]
            },
            {
                type: 'when',
                label: 'Cuando (Acción o Evento)',
                options: [
                    { id: 'w1', text: 'el usuario ve su perfil', correct: false },
                    { id: 'w2', text: 'el usuario ingresa credenciales válidas y hace clic en "Entrar"', correct: true },
                    { id: 'w3', text: 'el sistema valida el usuario en la base de datos', correct: false }, // technical detail
                ]
            },
            {
                type: 'then',
                label: 'Entonces (Resultado esperado)',
                options: [
                    { id: 't1', text: 'el código SQL se ejecuta sin errores', correct: false },
                    { id: 't2', text: 'el usuario es redirigido a una página de error', correct: false },
                    { id: 't3', text: 'el usuario debería ver su panel de control principal', correct: true },
                ]
            }
        ],
        explanation: 'Un buen escenario Gherkin describe el comportamiento desde la perspectiva del usuario (dominio del problema), evitando talles técnicos (como bases de datos o SQL).'
    },
    {
        id: 2,
        title: 'Retiro de Efectivo en Cajero Automático (Saldo Suficiente)',
        description: 'Permitir a un cliente sacar dinero si tiene suficiente saldo.',
        blocks: [
            {
                type: 'given',
                label: 'Dado (Contexto inicial)',
                options: [
                    { id: 'g1', text: 'que el cliente presiona el botón de $100', correct: false },
                    { id: 'g2', text: 'que la cuenta del cliente tiene un saldo de $500', correct: true },
                    { id: 'g3', text: 'que la tarjeta es retenida por el cajero', correct: false },
                ]
            },
            {
                type: 'when',
                label: 'Cuando (Acción o Evento)',
                options: [
                    { id: 'w1', text: 'el cajero le entrega $100', correct: false },
                    { id: 'w2', text: 'se revisa la tabla Cuentas en la DB', correct: false }, // technical detail
                    { id: 'w3', text: 'el cliente solicita retirar $100', correct: true },
                ]
            },
            {
                type: 'then',
                label: 'Entonces (Resultado esperado)',
                options: [
                    { id: 't1', text: 'el nuevo saldo de la cuenta debería ser $400 y el cajero entrega $100', correct: true },
                    { id: 't2', text: 'se llama a la API de actualización de saldos', correct: false },
                    { id: 't3', text: 'el cliente solicita la tarjeta', correct: false },
                ]
            }
        ],
        explanation: 'La estructura Dado/Cuando/Entonces (Given/When/Then) establece el estado inicial, la acción y las consecuencias verificables de esa acción.'
    }
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Cuál es el principal objetivo de BDD (Behavior-Driven Development)?',
        options: [
            'Escribir más pruebas unitarias automáticamente',
            'Minimizar la comunicación entre el equipo de negocio y los desarrolladores',
            'Mejorar la comunicación y entendimiento compartido usando un lenguaje común',
            'Obligar a todos a aprender a programar en Java o C#'
        ],
        correct: 2,
        explanation: 'El mayor valor de BDD no es la automatización, sino crear un "entendimiento compartido" (Shared Understanding) entre negocio (PO), desarrolladores y testers sobre cómo debe comportarse el sistema.'
    },
    {
        question: 'En BDD, el concepto de "Specification by Example" (Especificación por Ejemplos) significa que...',
        options: [
            'Se usa código de ejemplo en lugar de requerimientos formales',
            'Los requerimientos se clarifican y validan a través de ejemplos concretos de uso',
            'Solo se documentan ejemplos de éxito, ignorando los errores',
            'Se busca en internet ejemplos de cómo otras empresas resolvieron el problema'
        ],
        correct: 1,
        explanation: 'Usar ejemplos concretos (ej: si el saldo es 100 y saco 20, quedan 80) clarifica ambigüedades en los requerimientos abstractos.'
    },
    {
        question: '¿Qué lenguaje estructurado se utiliza frecuentemente en BDD para escribir escenarios entendibles por humanos y automatizables por máquinas?',
        options: ['SQL', 'Markdown', 'Gherkin', 'HTML'],
        correct: 2,
        explanation: 'Gherkin es el lenguaje estructurado (Dado/Cuando/Entonces) utilizado por herramientas como Cucumber para describir comportamientos.'
    },
    {
        question: 'En un escenario de BDD, ¿qué parte define el "Contexto Inicial" (las precondiciones)?',
        options: ['Cuando (When)', 'Entonces (Then)', 'Dado (Given)', 'Y (And)'],
        correct: 2,
        explanation: 'La palabra clave Dado (Given) se usa para establecer el estado del sistema antes de que ocurra la acción principal.'
    },
    {
        question: 'Según BDD, los escenarios deben escribirse preferiblemente...',
        options: [
            'Describiendo clics y navegación exacta (ej: click botón ID #submit)',
            'Describiendo interacciones a nivel de base de datos (ej: SELECT y UPDATE)',
            'Describiendo la intención y el lenguaje del negocio (Dominio)',
            'Después de que el código ha sido completamente finalizado'
        ],
        correct: 2,
        explanation: 'Los escenarios deben ser declarativos (el qué) y usar la Ubiquitous Language (lenguaje del negocio), no detalles técnicos de UI o bases de datos (el cómo).'
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
