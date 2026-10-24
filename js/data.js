// KineticLoad - Datos Iniciales y Estado del Atleta
window.KineticData = {
  athlete: {
    name: "Mateo Gómez",
    age: 24,
    category: "Triatleta Sub-Elite",
    condition: "Periostitis tibial y sobrecarga en gemelos",
    targetRace: "Maratón D-28 (a 4 semanas)",
    status: "Desinflamación Activa",
    safeThreshold: 4 // Escala EVA máxima para zona segura
  },

  // 14 días históricos de telemetría (Carga vs Dolor) para el gráfico lineal
  history: [
    { day: "Día 1", load: 12, pain: 4.5, rpe: 7.0, sport: "running", activity: "Tirada suave 12km" },
    { day: "Día 2", load: 15, pain: 4.8, rpe: 7.5, sport: "running", activity: "Progresivo 15km" },
    { day: "Día 3", load: 8,  pain: 5.2, rpe: 6.5, sport: "running", activity: "Rodaje regenerativo" },
    { day: "Día 4", load: 18, pain: 7.8, rpe: 9.0, sport: "running", activity: "Series 1000m en asfalto (Pico dolor)" },
    { day: "Día 5", load: 0,  pain: 6.5, rpe: 2.0, sport: "descanso", activity: "Descanso y hielo local" },
    { day: "Día 6", load: 10, pain: 5.5, rpe: 6.0, sport: "running", activity: "Trote hierba suave" },
    { day: "Día 7", load: 5,  pain: 5.0, rpe: 5.0, sport: "fuerza", activity: "Isometría tren inferior" },
    { day: "Día 8", load: 12, pain: 5.3, rpe: 7.0, sport: "running", activity: "Rodaje suave 12km" },
    { day: "Día 9", load: 16, pain: 6.0, rpe: 8.0, sport: "running", activity: "Fartlek asfalto" },
    { day: "Día 10", load: 10, pain: 5.0, rpe: 6.0, sport: "ciclismo", activity: "Rodillo suave Z1" },
    { day: "Día 11", load: 22, pain: 3.5, rpe: 7.0, sport: "ciclismo", activity: "Bicicleta Z2 (Cero impacto)" },
    { day: "Día 12", load: 14, pain: 3.2, rpe: 6.5, sport: "ciclismo", activity: "Pedaleo cadencia alta" },
    { day: "Día 13", load: 8,  pain: 2.8, rpe: 5.5, sport: "running", activity: "Trote suave césped 8km" },
    { day: "Hoy",    load: 10, pain: 2.4, rpe: 6.0, sport: "running", activity: "Carrera continua 8.5km" }
  ],

  // Biblioteca de rutinas de alivio clasificadas por deporte
  routines: [
    {
      id: "rot-soleo-gemelos",
      title: "Descarga Miofascial de Sóleo & Gemelo",
      discipline: "running",
      disciplineLabel: "Running",
      category: "Descarga Muscular",
      duration: "6 min",
      intensity: "Baja tensión",
      impact: "Cero Impacto",
      equipment: "Foam roller",
      description: "Uso de foam roller y presión sostenida en puntos gatillo para quitar tracción sobre el periostio tibial.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
      exerciseCount: 4
    },
    {
      id: "rot-isometria-tibial",
      title: "Activación Isométrica de Tibial Posterior",
      discipline: "running",
      disciplineLabel: "Running",
      category: "Fortalecimiento Isométrico",
      duration: "8 min",
      intensity: "Isometría sub-máxima",
      impact: "Cero Impacto",
      equipment: "Banda elástica",
      description: "Contracciones sin movimiento articular para aumentar la tolerancia de carga del tendón y la fascia tibial.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
      exerciseCount: 4
    },
    {
      id: "rot-movilidad-tobillo",
      title: "Movilidad Activa de Tobillo en Carga",
      discipline: "running",
      disciplineLabel: "Running",
      category: "Movilidad Activa",
      duration: "5 min",
      intensity: "Movilidad dinámica",
      impact: "Mínimo Impacto",
      equipment: "Pared o escalón",
      description: "Dorsiflexión controlada para liberar la cadena posterior y evitar que el pie pronador golpee el asfalto.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
      exerciseCount: 3
    },
    {
      id: "rot-descarga-ciclismo",
      title: "Descompresión Cuádriceps y Cadera Ciclista",
      discipline: "ciclismo",
      disciplineLabel: "Ciclismo",
      category: "Descarga Muscular",
      duration: "7 min",
      intensity: "Baja tensión",
      impact: "Cero Impacto",
      equipment: "Esterilla",
      description: "Apertura de psoas y relajación de la banda iliotibial tras tiradas largas de pedaleo sin carga articular.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
      exerciseCount: 3
    },
    {
      id: "rot-crossfit-hombros",
      title: "Movilidad Glenohumeral & Cadena Posterior",
      discipline: "crossfit",
      disciplineLabel: "Crossfit",
      category: "Movilidad Activa",
      duration: "8 min",
      intensity: "Movilidad controlada",
      impact: "Cero Impacto",
      equipment: "Banda elástica",
      description: "Restauración del rango escapular y liberación de isquiosurales para WODs con alta demanda neuromuscular.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
      exerciseCount: 4
    }
  ],

  // Ejercicios de la Sesión Guiada activa (con loops de 20s y biomecánica)
  guidedSessionExercises: [
    {
      id: "ex-1",
      stepNumber: 1,
      title: "Liberación con Rodillo en Sóleo",
      focus: "Miofascial Descompresivo",
      durationSeconds: 20,
      targetReps: "3 pasadas lentas de 20s",
      videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
      keyCues: [
        "Desliza desde 4 cm arriba del talón hasta la mitad de la pantorrilla.",
        "Deténte 5 segundos sobre el punto de mayor tirantez respirando hondo.",
        "Mantén los dedos del pie relajados en todo momento."
      ],
      warningAlert: "Evita rodar directamente sobre el hueso tibial anterior."
    },
    {
      id: "ex-2",
      stepNumber: 2,
      title: "Elevación de Talón Flexionada a 20°",
      focus: "Aislamiento de Sóleo",
      durationSeconds: 20,
      targetReps: "Sostén 20s en punto alto",
      videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
      keyCues: [
        "Flexiona la rodilla exactamente a 20 grados para inhibir los gemelos.",
        "Empuja firme con el metatarso del primer dedo del pie.",
        "Mantén el tobillo neutro sin permitir que se caiga hacia adentro (pronación)."
      ],
      warningAlert: "No hiperextiendas la rodilla para evitar compensar con el cuádriceps."
    },
    {
      id: "ex-3",
      stepNumber: 3,
      title: "Dorsiflexión Activa en Pared con Rodilla Adelantada",
      focus: "Movilidad Articular de Tobillo",
      durationSeconds: 20,
      targetReps: "Oscilaciones de 20s",
      videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
      keyCues: [
        "Coloca el pie a 8-10 cm de la pared.",
        "Lleva la rodilla hacia la pared sin levantar el talón del suelo.",
        "Alinea la rótula con el segundo dedo del pie."
      ],
      warningAlert: "Si sientes pellizco en la parte delantera del tobillo, aleja 2 cm el pie."
    },
    {
      id: "ex-4",
      stepNumber: 4,
      title: "Estiramiento Isométrico de Cadena Posterior",
      focus: "Descarga de Tensión Facial",
      durationSeconds: 20,
      targetReps: "Sostén suave 20s",
      videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
      keyCues: [
        "Apoya las manos en la pared y mantén la pierna afectada recta atrás.",
        "Empuja suave el talón contra el suelo sin rebotar.",
        "Sensación de alivio y estiramiento agradable, nunca dolor punzante."
      ],
      warningAlert: "Si el dolor tibial pasa de 3/10, relaja la tensión de inmediato."
    }
  ]
};
