// The 3 steps of TDD Cycle
export const TDD_STEPS = [
    { id: 'red', name: 'RED (Rojo)', emoji: '🔴', color: '#ff4b4b' },
    { id: 'green', name: 'GREEN (Verde)', emoji: '🟢', color: '#20c997' },
    { id: 'refactor', name: 'REFACTOR (Refactorizar)', emoji: '🔵', color: '#4facfe' },
]

export const STEP_DESCRIPTIONS = [
    { id: 'd1', text: 'Escribir una prueba unitaria que falle. Demuestra que la funcionalidad requerida aún no existe o está incompleta.', correctStep: 'red' },
    { id: 'd2', text: 'Escribir el código de producción más simple y rápido posible (incluso "haciendo trampa" o retornando constantes) para hacer que la prueba pase.', correctStep: 'green' },
    { id: 'd3', text: 'Mejorar el diseño interno del código, eliminar duplicación y aplicar patrones, con la seguridad de que las pruebas siguen pasando.', correctStep: 'refactor' },
]

// Level 2: Scenarios mapping to the exact NEXT action
export const TDD_SCENARIOS = [
    { id: 's1', text: 'Acabas de recibir un nuevo requerimiento: "Calcular el interés compuesto". No hay código de producción escrito todavía. ¿Qué hacés primero?', correctAction: 'red', explanation: 'Primero se debe crear la prueba que defina y ejecute ese escenario.' },
    { id: 's2', text: 'Ejecutás tu suite de tests. Un test falla indicando: "ReferenceError: calcularInteres is not defined". ¿Cuál es el siguiente paso?', correctAction: 'green', explanation: 'Escribís solo el esqueleto de la función o retornás el valor esperado en crudo para que la barra se ponga verde.' },
    { id: 's3', text: 'Es un día de suerte: todos los tests acaban de pasar (están en verde). Sin embargo, notas que tenés un bucle repetido en dos funciones distintas. ¿Qué sigue?', correctAction: 'refactor', explanation: 'Los tests pasando son tu red de seguridad para poder refactorizar y extraer ese bucle duplicado.' },
    { id: 's4', text: 'Estás en plena fase de refactorización y decidís extraer una clase nueva. De repente, al guardar, 3 pruebas unitarias antes verdes ahora fallan (rojo). ¿Deberías seguir refactorizando?', correctAction: 'red', explanation: '¡Alto! Si los tests fallan mientras refactorizás, rompiste algo. Debés deshacer el cambio o arreglar el código hasta volver al verde.' },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Por qué en TDD se escribe la prueba ANTES que el código de producción?',
        options: [
            'Para que el departamento de QA no tenga que trabajar.',
            'Porque obliga al desarrollador a diseñar desde la perspectiva de quien consumirá el código (su comportamiento) antes de pensar en la implementación.',
            'Para gastar más presupuesto del proyecto en tiempo de desarrollo.',
            'Solo porque así lo inventó Kent Beck, no hay una razón técnica real.'
        ],
        correct: 1,
        explanation: 'Test-first design asegura que el código sea testeable por naturaleza y que cumpla exactamente (y nada más) con el comportamiento descrito en el requerimiento.'
    },
    {
        question: 'En la fase "Verde" (Green), TDD promulga el principio de "hacer la cosa más simple que funcione". ¿Esto permite entregar código sucio o desordenado a producción?',
        options: [
            'Sí, porque lo importante es la velocidad y que pasen los tests.',
            'No. Se permite código sucio/simple momentáneamente para validar la lógica, pero INMEDIATAMENTE después se limpia en la fase de "Refactor".',
            'No, en la fase Verde el código ya debe estar perfectamente optimizado utilizando los últimos patrones de diseño arquitectónico.',
            'Los PM prefieren el código sucio y entregar antes.'
        ],
        correct: 1,
        explanation: 'El ciclo funciona como: "Hazlo funcionar (Verde), luego Hazlo correcto (Refactor), luego Hazlo rápido (Optimización futura)".'
    },
    {
        question: 'Si escribes una prueba y la ejecutas por primera vez, pero extrañamente pasa con éxito (Verde) sin haber escrito el código de producción todavía. ¿Qué significa?',
        options: [
            '¡Genial! Eres un mago de la programación telepática.',
            'Es un falso positivo. La prueba está mal redactada, no está testeando lo que debería, o la funcionalidad ya existía (por error).',
            'El framework de testing está obsoleto.',
            'Hiciste TDD correctamente, podés pasar a refactorizar.'
        ],
        correct: 1,
        explanation: 'La fase "Rojo" es obligatoria. Ver la prueba fallar confirma que el test realmente está evaluando la ausencia de la característica. Si nunca falla, no sabrás si la prueba realmente testea la lógica requerida cuando la implementes.'
    },
    {
        question: '¿Qué diferencia a TDD de la simple acción de "escribir Pruebas Unitarias"?',
        options: [
            'Son sinónimos exactos.',
            'Las pruebas unitarias son manuales, TDD es automatizado.',
            'Las pruebas unitarias se escriben típicamente después del código, enfocadas en verificar. TDD es una práctica de DISEÑO que guía el desarrollo.',
            'TDD requiere usar bases de datos reales en cada prueba.'
        ],
        correct: 2,
        explanation: 'El beneficio subvalorado de TDD no son las pruebas resultantes, sino que actúa como una técnica de diseño de software bajamente acoplado y altamente cohesivo.'
    },
    {
        question: 'Durante TDD, notás que probar un módulo está siendo sumamente difícil porque dependés de una base de datos externa y una API de terceros. ¿Qué deberías hacer?',
        options: [
            'Ignorar ese módulo y no cubrirlo con pruebas.',
            'Usar la base de datos de producción para asegurar resultados reales.',
            'Utilizar "Mocks" (dobles de prueba/stubs) para simular la BD y la API, aislando así la unidad de código que deseas probar.',
            'Cambiar de lenguaje de programación.'
        ],
        correct: 2,
        explanation: 'Las pruebas unitarias en TDD deben ser rápidas e independientes (aisladas). Los Mocks y Stubs aíslan la unidad bloqueando servicios externos lentos o frágiles.'
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
