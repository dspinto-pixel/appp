// KineticLoad - Datos Iniciales, Biblioteca y Adaptaciones Bioadaptativas

window.KineticData = {
  // Perfil por defecto (si el usuario aún no se ha registrado)
  defaultAthlete: {
    name: "Nuevo Atleta",
    age: 25,
    sport: "running",
    sportLabel: "Running",
    painZone: "Espinilla (Tibia derecha)",
    initialPain: 3.5,
    status: "Desinflamación Activa",
    safeThreshold: 4
  },

  // Perfiles de recomendación y ejercicios según la zona de dolor seleccionada
  painProtocols: {
    "Espinilla (Tibia derecha)": {
      title: "Protocolo Descompresivo de Periostio Tibial",
      bannerText: "Hoy cuidamos tu espinilla: 40 min de pedaleo suave en Z2 + 10 min de automasaje de descarga en sóleo.",
      bannerDetails: "Mantienes tu capacidad aeróbica con Cero Impacto en asfalto, permitiendo la regeneración del periostio sin perder VO2 Max.",
      targetZone: "Espinilla / Periostio",
      recommendedRoutines: ["rot-isometria-tibial", "rot-soleo-gemelos", "rot-movilidad-tobillo"],
      exercises: [
        {
          id: "ex-tib-1",
          stepNumber: 1,
          title: "Liberación con Rodillo en Sóleo",
          focus: "Miofascial Descompresivo",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
          keyCues: [
            "Desliza desde 4 cm arriba del talón hasta la mitad de la pantorrilla.",
            "Detente 5 segundos sobre el punto de mayor tirantez respirando hondo.",
            "Mantén los dedos del pie completamente relajados."
          ],
          warningAlert: "Evita presionar directamente sobre la cresta ósea de la espinilla."
        },
        {
          id: "ex-tib-2",
          stepNumber: 2,
          title: "Elevación de Talón Flexionada a 20°",
          focus: "Aislamiento de Sóleo",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
          keyCues: [
            "Flexiona la rodilla a 20 grados para inhibir los gemelos y activar el sóleo.",
            "Empuja con la base del dedo gordo para no desviar la fuerza.",
            "Mantén el tobillo neutro sin permitir que colapse hacia adentro."
          ],
          warningAlert: "No estires la rodilla por completo para evitar compensación del cuádriceps."
        },
        {
          id: "ex-tib-3",
          stepNumber: 3,
          title: "Dorsiflexión Activa en Pared",
          focus: "Movilidad Articular de Tobillo",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Coloca el pie a 8-10 cm de la pared.",
            "Lleva la rodilla hacia la pared sin despegar el talón del suelo.",
            "Alinea la rótula con el segundo dedo del pie."
          ],
          warningAlert: "Si sientes pellizco en la parte delantera del empeine, aleja 2 cm el pie."
        },
        {
          id: "ex-tib-4",
          stepNumber: 4,
          title: "Estiramiento Isométrico de Cadena Posterior",
          focus: "Descarga de Tensión Fascial",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Apoya las manos en la pared y mantén la pierna afectada recta atrás.",
            "Empuja suave el talón contra el suelo sin rebotar.",
            "Sensación de estiramiento agradable, nunca dolor punzante."
          ],
          warningAlert: "Si el dolor tibial pasa de 3/10, reduce la inclinación de inmediato."
        }
      ]
    },

    "Gemelo / Sóleo": {
      title: "Protocolo de Descarga y Flexibilidad de Pantorrilla",
      bannerText: "Hoy soltamos la sobrecarga en gemelos: 15 min de automasaje con rodillo + estiramientos excéntricos sin salto.",
      bannerDetails: "Disminuimos la contractura muscular para restablecer la elasticidad del tríceps sural antes de tu próximo entreno de impacto.",
      targetZone: "Gemelos / Tríceps Sural",
      recommendedRoutines: ["rot-soleo-gemelos", "rot-movilidad-tobillo", "rot-isometria-tibial"],
      exercises: [
        {
          id: "ex-gem-1",
          stepNumber: 1,
          title: "Foam Roller en Vientre Muscular de Gemelos",
          focus: "Liberación Miofascial",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
          keyCues: [
            "Cruza la pierna contraria por encima para regular la presión.",
            "Rueda lentamente de abajo hacia arriba en pasadas de 20 segundos.",
            "Gira el pie hacia afuera e inward para abarcar las dos cabezas del gemelo."
          ],
          warningAlert: "No aguantes la respiración si encuentras un punto doloroso; respira profundo."
        },
        {
          id: "ex-gem-2",
          stepNumber: 2,
          title: "Isometría de Gemelos en Escalón",
          focus: "Fortalecimiento de Fibras",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
          keyCues: [
            "Coloca la parte delantera de ambos pies en el borde de un escalón.",
            "Sube a puntillas y mantén la posición alta de forma estática 20s.",
            "Sujétate de la pared o baranda para estabilidad total."
          ],
          warningAlert: "Evita rebotar o dejar caer el talón bruscamente."
        },
        {
          id: "ex-gem-3",
          stepNumber: 3,
          title: "Estiramiento Específico de Sóleo con Rodilla Doblada",
          focus: "Elongación Profunda",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Flexiona ambas rodillas ligeramente y apoya las manos en la pared.",
            "Carga el peso hacia el talón de atrás sin despegarlo.",
            "Sentirás el estiramiento más abajo, cerca del tendón de Aquiles."
          ],
          warningAlert: "No arquees la zona lumbar mientras mantienes la flexión."
        },
        {
          id: "ex-gem-4",
          stepNumber: 4,
          title: "Automasaje Manual en Puntos Gatillo",
          focus: "Relajación Neuromuscular",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Usa ambos pulgares para ejercer presión circular en la parte media de la pantorrilla.",
            "Mantén la presión sostenida durante 20 segundos.",
            "Mueve suavemente el pie en círculos mientras presionas."
          ],
          warningAlert: "No apliques fuerza punzante que supere el umbral de dolor tolerable."
        }
      ]
    },

    "Tendón de Aquiles": {
      title: "Protocolo de Carga Adaptativa para Tendón de Aquiles",
      bannerText: "Hoy protegemos tu tendón: isometría de talón a dos piernas + cero cuestas o zancadas rápidas.",
      bannerDetails: "Los tendones responden a cargas isométricas sostenidas. Eliminamos las fuerzas de impacto elástico por 24 a 48 horas.",
      targetZone: "Tendón de Aquiles",
      recommendedRoutines: ["rot-isometria-tibial", "rot-soleo-gemelos", "rot-movilidad-tobillo"],
      exercises: [
        {
          id: "ex-aqu-1",
          stepNumber: 1,
          title: "Sostén Isométrico a Dos Piernas en Suelo",
          focus: "Carga Tendinosa Sin Impacto",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
          keyCues: [
            "Eleva los talones 3-4 cm del suelo.",
            "Mantén la altura estática durante 20 segundos sin temblores.",
            "Distribuye el peso por igual entre ambos pies."
          ],
          warningAlert: "Si sientes dolor agudo en el tendón, baja la altura de elevación."
        },
        {
          id: "ex-aqu-2",
          stepNumber: 2,
          title: "Descarga Miofascial Suave de Pantorrilla",
          focus: "Descompresión Proximal",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
          keyCues: [
            "Rueda solo en el vientre muscular de la pantorrilla, nunca sobre el tendón mismo.",
            "Aliviar la tensión superior quita tracción directa sobre el tendón de Aquiles.",
            "Movimientos controlados y lentos."
          ],
          warningAlert: "Nunca apliques el rodillo directamente sobre el tendón de Aquiles."
        },
        {
          id: "ex-aqu-3",
          stepNumber: 3,
          title: "Movilidad Suave de Tobillo con Banda Elástica",
          focus: "Articulación Talocrural",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Coloca la banda elástica en el empeine y fija el otro extremo.",
            "Realiza flexiones y extensiones suaves sin forzar el final del rango.",
            "Ritmo pausado y continuo de 20 segundos."
          ],
          warningAlert: "No realices movimientos balísticos o tirones rápidos."
        },
        {
          id: "ex-aqu-4",
          stepNumber: 4,
          title: "Descompresión Plantar con Pelota",
          focus: "Fascia y Conexión Posterior",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "De pie o sentado, pisa una pelota pequeña de tenis o masaje.",
            "Rueda desde el talón hasta el nacimiento de los dedos.",
            "Presión suave para relajar la inserción inferior del tendón."
          ],
          warningAlert: "No apliques presión excesiva que cause dolor punzante en el talón."
        }
      ]
    },

    "Rodilla / Rótula": {
      title: "Protocolo de Descarga de Tendón Rotuliano & Cadena Anterior",
      bannerText: "Hoy cuidamos tu rodilla: liberación de cuádriceps con foam roller + activación de glúteo medio sin flexiones profundas.",
      bannerDetails: "Disminuimos la compresión fémoro-patelar estabilizando la cadera para evitar que la rodilla colapse hacia adentro.",
      targetZone: "Rodilla / Rótula",
      recommendedRoutines: ["rot-descarga-ciclismo", "rot-movilidad-tobillo", "rot-crossfit-hombros"],
      exercises: [
        {
          id: "ex-rod-1",
          stepNumber: 1,
          title: "Foam Roller en Cuádriceps y Tensor de la Fascia Lata",
          focus: "Miofascial Anterior",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
          keyCues: [
            "Boca abajo, desliza el rodillo desde arriba de la rótula hasta la cadera.",
            "Gira levemente hacia el lateral para descargar la cintilla iliotibial.",
            "Mantén el abdomen activo para proteger la zona lumbar."
          ],
          warningAlert: "Detente 3 cm antes de llegar a la rótula, nunca ruedes sobre el hueso."
        },
        {
          id: "ex-rod-2",
          stepNumber: 2,
          title: "Puente Glúteo Isométrico a Dos Piernas",
          focus: "Activación de Cadena Posterior",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Boca arriba con rodillas a 90 grados, eleva la pelvis.",
            "Aprieta fuerte los glúteos en el punto alto durante 20s.",
            "Las rodillas deben permanecer alineadas con los hombros sin juntarse."
          ],
          warningAlert: "No arquees en exceso la zona lumbar; empuja con los glúteos."
        },
        {
          id: "ex-rod-3",
          stepNumber: 3,
          title: "Extensión Isométrica Suave de Cuádriceps",
          focus: "Fuerza Sin Cizallamiento",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
          keyCues: [
            "Sentado en una silla, extiende la pierna casi por completo (a 15° de extensión final).",
            "Sostén la contracción durante 20 segundos apretando el vasto interno.",
            "Respira con normalidad."
          ],
          warningAlert: "Si hay chasquido doloroso debajo de la rótula, baja la pierna 10 grados."
        },
        {
          id: "ex-rod-4",
          stepNumber: 4,
          title: "Estiramiento Asistido de Isquiosurales",
          focus: "Balance Agonista-Antagonista",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Usa una toalla o banda para elevar la pierna recta acostado boca arriba.",
            "Mantén la pelvis pegada al suelo y relaja los hombros.",
            "Sensación de apertura suave detrás de la rodilla."
          ],
          warningAlert: "Evita flexionar el cuello para mirar la pierna."
        }
      ]
    },

    "Planta del pie / Fascia": {
      title: "Protocolo de Descarga Fascial y Arco Plantar",
      bannerText: "Hoy aliviamos tu planta del pie: masaje con botella fría o pelota + estiramiento suave del primer dedo.",
      bannerDetails: "Disminuimos la tracción de la fascia sobre el calcáneo para evitar que la molestia se convierta en fascitis crónica.",
      targetZone: "Planta del pie / Fascia plantar",
      recommendedRoutines: ["rot-soleo-gemelos", "rot-movilidad-tobillo", "rot-isometria-tibial"],
      exercises: [
        {
          id: "ex-fas-1",
          stepNumber: 1,
          title: "Masaje Rodado con Pelota Pequeña",
          focus: "Descarga Miofascial Plantar",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Rueda la pelota aplicando presión moderada desde el talón hasta los metatarsos.",
            "Haz pausas de 5 segundos en los puntos más tensos del arco interno.",
            "Respira y mantén el pie relajado durante 20 segundos."
          ],
          warningAlert: "No pises con fuerza excesiva que genere dolor agudo en el talón."
        },
        {
          id: "ex-fas-2",
          stepNumber: 2,
          title: "Estiramiento Pasivo del Dedo Gordo del Pie",
          focus: "Elongación de Fascia Plantar",
          durationSeconds: 20,
          videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          keyCues: [
            "Sentado, cruza la pierna y toma los dedos del pie con la mano.",
            "Tira de los dedos hacia atrás en dirección a la espinilla.",
            "Con la otra mano palpa la fascia tensa y agradable en el arco."
          ],
          warningAlert: "Evita doblar los dedos bruscamente hacia los lados."
        },
        {
          id: "ex-fas-3",
          stepNumber: 3,
          title: "Isometría de Agarre con Toalla",
          focus: "Fortalecimiento Intrínseco",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTN25n7cgdwLUg6ZuA75QpZB1QzyN00fhBqIuXZdlpcUp_sY_Idr9bUh5ohhdO1FiKXLeu7A3Qh2rrcBkq9lpXg6MnZ86ZHN7PJX5DbSRus2EUK5_hnKCYE8_YC5fdo8GBuHbYSwa9adalMQplx0_CAk9u5d-Kid78IFfaHhkinK5GEyg596d9B-SAjFVgsGa1HCyH4aaXiVH-QIiJAmKxTL7jiopjuy17pJXMxMlZZs2GtPiUV-zQA",
          keyCues: [
            "Coloca una toalla pequeña en el suelo bajo el pie descalzo.",
            "Usa los dedos para arrugar la toalla hacia ti y sostén la contracción 20s.",
            "Mantén el talón firmemente apoyado en el suelo."
          ],
          warningAlert: "Si sientes calambre en el arco, suelta y relaja los dedos de inmediato."
        },
        {
          id: "ex-fas-4",
          stepNumber: 4,
          title: "Descarga de Sóleo y Cadena Posterior",
          focus: "Descompresión Ascendente",
          durationSeconds: 20,
          videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQkDghoUsRbPvR389_hojaLR-8j699-AN-8k2z1DguitSsuUrBTSNzP5iwQhNidFS2weEGjbO0nC-WfN6XSK5b0f-cHn0mCXnS_xHAtp3hw7Nhte0rH-YDYZoxKTE7KCWDvIWPj0049qdy0p8NTHH6_BwCxDaC5-dxCRd81bV-HMdpUdLIUZcvbUXDcuTpzB-A66_3D22j6H_JsQht-85FOxpW9iY1lUWWThVMMy2Rt9CA71yUw5tFw",
          keyCues: [
            "Rueda el sóleo con el rodillo para relajar el tendón y la fascia conectada.",
            "Pasadas suaves de 20 segundos.",
            "Mantén el tobillo flojo."
          ],
          warningAlert: "Evita realizar saltos de impacto en las próximas 24 horas."
        }
      ]
    }
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
      description: "Uso de foam roller y presión sostenida en puntos gatillo para quitar tracción sobre el periostio y el tendón.",
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
      description: "Dorsiflexión controlada para liberar la cadena posterior y evitar que el pie golpee el asfalto desalineado.",
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
  ]
};
