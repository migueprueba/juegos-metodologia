// The 4 Quadrants of the Spiral Model
export const QUADRANTS = [
    { id: 'q1', name: 'Objetivos y Alternativas', emoji: '🎯', color: '#ff6b6b' },
    { id: 'q2', name: 'Análisis de Riesgos', emoji: '⚠️', color: '#fca311' },
    { id: 'q3', name: 'Desarrollo y Verificación', emoji: '⚙️', color: '#4facfe' },
    { id: 'q4', name: 'Planificación Siguiente', emoji: '📅', color: '#20c997' },
]

export const QUADRANT_DESCRIPTIONS = [
    { id: 'd1', text: 'Se definen las metas del ciclo, las alternativas técnicas viables y las restricciones inherentes del proyecto para esta iteración.', correctQuadrant: 'q1' },
    { id: 'd2', text: 'Se evalúan las alternativas frente a los riesgos. Típicamente se construyen prototipos o simulaciones exhaustivas para despejar dudas críticas.', correctQuadrant: 'q2' },
    { id: 'd3', text: 'Una vez mitigado el mayor riesgo, se selecciona el modelo de desarrollo (puede ser cascada, evolutivo) para programar, probar e integrar esa porción del sistema.', correctQuadrant: 'q3' },
    { id: 'd4', text: 'El cliente evalúa los resultados de la iteración. Se decide si el proyecto avanza ("Go") o se detiene ("No-Go"), y se planea el próximo ciclo en la espiral.', correctQuadrant: 'q4' },
]

// Level 2: Risk Management mapping to specific Prototypes/Mitigation Actions
export const RISKS_AND_STRATEGIES = [
    {
        id: 'r1',
        risk: 'Riesgo Crítico: La arquitectura propuesta podría no soportar 1 millón de transacciones por minuto requeridas por el negocio.',
        strategyName: 'Prototipo Técnico de Arquitectura',
        strategyIcon: '🏗️',
        correct: true,
        explanation: 'Un prototipo técnico enfocado en la concurrencia es obligatorio antes de escribir el resto de la aplicación.'
    },
    {
        id: 'r2',
        risk: 'Riesgo Crítico: El algoritmo de inteligencia artificial es matemático avanzado y no estamos seguros si tardará 1 segundo o 2 horas en ejecutarse.',
        strategyName: 'Simulación de Rendimiento (Benchmarking Algorítmico)',
        strategyIcon: '⏱️',
        correct: true,
        explanation: 'En lugar de implementarlo completamente, se aísla el algoritmo y se corre una simulación con datos a escala.'
    },
    {
        id: 'r3',
        risk: 'Riesgo Crítico: La aplicación es para cirujanos operando; si la interfaz es confusa, podrían equivocarse de incisión.',
        strategyName: 'Prototipo de UI Dinámico con Pruebas de Usuario Reales',
        strategyIcon: '👁️',
        correct: true,
        explanation: 'Se desecha el riesgo construyendo interfaces de alta fidelidad operadas por cirujanos, observando dónde hacen click.'
    },
    {
        id: 'r4',
        risk: 'Riesgo: El proveedor de la base de datos acaba de triplicar sus precios. Presupuesto en peligro.',
        strategyName: 'Análisis de Costo-Beneficio y Evaluación de Alternativas Open Source',
        strategyIcon: '💰',
        correct: true,
        explanation: 'El Cuadrante 2 no es solo código; el riesgo financiero se mitiga reevaluando alternativas económicas (Cuadrante 1 y 2 aliados).'
    },
]

// Wrong strategies to mix into Level 2 options
export const WRONG_STRATEGIES = [
    { id: 'w1', name: 'Documentar un manual de usuario extenso', icon: '📚' },
    { id: 'w2', name: 'Añadir 5 desarrolladores más al equipo', icon: '👥' },
    { id: 'w3', name: 'Lanzar el producto al público y ver si falla', icon: '🚀' },
    { id: 'w4', name: 'Ignorar el problema y usar Scrum', icon: '🤷‍♂️' },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Cuál es el factor PRINCIPAL que impulsa y da forma a cada vuelta del Modelo en Espiral?',
        options: [
            'El cumplimiento de hitos documentales como en Cascada.',
            'El Análisis y Mitigación continua de Riesgos.',
            'La velocidad de entrega máxima para salir al mercado.',
            'El uso obligatorio de Lenguajes Orientados a Objetos.'
        ],
        correct: 1,
        explanation: 'El Modelo en Espiral (Barry Boehm, 1986) es un modelo "impulsado por riesgos" (Risk-driven). Las decisiones se toman basándose en los riesgos más altos que quedan en el proyecto.'
    },
    {
        question: 'En el Modelo en Espiral, ¿qué pasa a medida que la espiral se va haciendo más amplia (crece en radio)?',
        options: [
            'El equipo se reduce.',
            'El nivel de riesgo aumenta exponencialmente.',
            'Representa el Costo Acumulado del proyecto que sigue creciendo iteración a iteración.',
            'El tiempo se acelera.'
        ],
        correct: 2,
        explanation: 'El "radio" de la espiral visual representa el costo total acumulado del proyecto, mientras que el avance "angular" representa el progreso dentro de los cuadrantes.'
    },
    {
        question: '¿Para qué tipo de proyectos fue diseñado idealmente el Modelo en Espiral?',
        options: [
            'Proyectos pequeños de páginas web personales.',
            'Proyectos de hardware simple.',
            'Proyectos internos sin presupuesto.',
            'Proyectos masivos, de alto costo, y con requerimientos y riesgos extremadamente complejos (ej: software militar o aeroespacial).'
        ],
        correct: 3,
        explanation: 'Debido a la inmensa cantidad de dinero invertida en analizar riesgos repetidamente, crear prototipos desechables y planificar iterativamente, solo tiene sentido financiero en proyectos gigantes donde un fallo completo es inaceptable.'
    },
    {
        question: 'Al finalizar un ciclo (vuelta) de la espiral completa, y luego de la evaluación del cliente en el último cuadrante, ¿qué ocurre si descubren un riesgo insuperable?',
        options: [
            'El proyecto se reestructura y continúa obligatoriamente.',
            'Se delega al equipo de QA para que asuma la culpa.',
            'El proyecto es evaluado como un "No-Go" y puede ser cancelado de forma temprana, evitando perder más millones en el futuro.',
            'Se pasa directamente a la fase de mantenimiento.'
        ],
        correct: 2,
        explanation: 'Un resultado clave del último cuadrante ("Planificación y Revisión") es la decisión explícita de continuar (Go) o cancelar (No-Go) el proyecto basándose en el ratio riesgo/costo/beneficio actualizado.'
    },
    {
        question: 'Falso o Verdadero: El Cuadrante 3 (Desarrollo) dice explícitamente y de manera inflexible cómo debés escribir el código (ej: debés usar Cascada o debés usar TDD).',
        options: [
            'Falso: El modelo en espiral permite insertar "modelos menores" en el cuadrante de desarrollo basándose en el riesgo a mitigar.',
            'Verdadero: El Modelo en espiral impone utilizar Desarrollo Orientado a Componentes.',
            'Verdadero: Exige Cascada rígida en esa fase.',
            'Falso: El Cuadrante 3 ni siquiera es para escribir código, es solo para prototipos.'
        ],
        correct: 0,
        explanation: 'El Modelo en Espiral es un "meta-modelo". Una vez gestionado el gran riesgo de esa iteración, el arquitecto puede elegir usar Cascada para esa vuelta, un enfoque Evolutivo, o uno iterativo para construir el producto real en el Cuadrante 3.'
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
