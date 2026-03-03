// CI/CD pipeline stages in correct order
export const PIPELINE_STAGES = [
    { id: 'code', name: 'Code', emoji: '💻', description: 'Los desarrolladores escriben y versionan el código fuente en un repositorio compartido.' },
    { id: 'build', name: 'Build', emoji: '🔨', description: 'El código se compila y se empaqueta en un artefacto desplegable automáticamente.' },
    { id: 'test', name: 'Test', emoji: '🧪', description: 'Se ejecutan pruebas automatizadas (unitarias, integración, E2E) para validar la calidad.' },
    { id: 'release', name: 'Release', emoji: '📦', description: 'El artefacto validado se prepara y versiona para su despliegue en producción.' },
    { id: 'deploy', name: 'Deploy', emoji: '🚀', description: 'El artefacto se despliega automáticamente en el entorno de producción.' },
    { id: 'operate', name: 'Operate', emoji: '⚙️', description: 'Se gestiona la infraestructura y se asegura la disponibilidad del sistema en producción.' },
    { id: 'monitor', name: 'Monitor', emoji: '📊', description: 'Se recopilan métricas, logs y alertas para detectar problemas y oportunidades de mejora.' },
]

// DevOps practices for matching
export const DEVOPS_PRACTICES = [
    {
        id: 'iac',
        name: 'Infrastructure as Code',
        emoji: '📝',
        description: 'Gestionar y provisionar la infraestructura mediante archivos de configuración versionados, como Terraform o CloudFormation.',
    },
    {
        id: 'containers',
        name: 'Contenedores',
        emoji: '🐳',
        description: 'Empaquetar aplicaciones con sus dependencias para garantizar que funcionen de manera idéntica en cualquier entorno.',
    },
    {
        id: 'ci',
        name: 'Integración Continua',
        emoji: '🔄',
        description: 'Fusionar cambios de código frecuentemente en una rama principal, ejecutando pruebas automáticas en cada commit.',
    },
    {
        id: 'cd',
        name: 'Entrega Continua',
        emoji: '📤',
        description: 'Automatizar el proceso de release para que el software pueda ser desplegado en producción en cualquier momento.',
    },
    {
        id: 'monitoring',
        name: 'Monitoreo y Observabilidad',
        emoji: '👁️',
        description: 'Recopilar métricas, logs y trazas para entender el comportamiento del sistema y detectar anomalías.',
    },
    {
        id: 'microservices',
        name: 'Microservicios',
        emoji: '🧱',
        description: 'Diseñar la aplicación como un conjunto de servicios pequeños e independientes que se comunican entre sí.',
    },
]

// Quiz questions
export const QUIZ_QUESTIONS = [
    {
        question: '¿Qué significa la sigla CI/CD?',
        options: [
            'Code Integration / Code Deployment',
            'Continuous Integration / Continuous Delivery',
            'Centralized Infrastructure / Centralized Data',
            'Cloud Integration / Cloud Deployment',
        ],
        correct: 1,
        explanation: 'CI/CD significa Continuous Integration (Integración Continua) y Continuous Delivery/Deployment (Entrega/Despliegue Continuo).',
    },
    {
        question: '¿Cuál es el principal objetivo de DevOps?',
        options: [
            'Eliminar el equipo de operaciones',
            'Escribir más código en menos tiempo',
            'Unir desarrollo y operaciones para entregar software más rápido y con mayor calidad',
            'Reemplazar las pruebas manuales con automatización',
        ],
        correct: 2,
        explanation: 'DevOps busca la colaboración entre desarrollo y operaciones para acelerar la entrega de valor con calidad.',
    },
    {
        question: '¿Qué herramienta se usa comúnmente para contenedores?',
        options: ['Jenkins', 'Docker', 'Jira', 'Git'],
        correct: 1,
        explanation: 'Docker es la herramienta más popular para crear y gestionar contenedores de aplicaciones.',
    },
    {
        question: '¿Qué es Infrastructure as Code (IaC)?',
        options: [
            'Escribir código directamente en los servidores',
            'Gestionar infraestructura mediante archivos de configuración versionados',
            'Programar robots para montar hardware',
            'Documentar la infraestructura en un wiki',
        ],
        correct: 1,
        explanation: 'IaC permite gestionar y provisionar infraestructura mediante código declarativo, versionado y reproducible.',
    },
    {
        question: '¿Qué práctica DevOps permite detectar errores rápidamente al integrar código?',
        options: [
            'Blue-Green Deployment',
            'Integración Continua',
            'Canary Release',
            'Infrastructure as Code',
        ],
        correct: 1,
        explanation: 'La Integración Continua (CI) ejecuta pruebas automáticas cada vez que se integra código, detectando errores de forma temprana.',
    },
]

export function shuffle(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}
