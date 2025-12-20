import { PopularNewsTab, StoryCluster } from "./types";

const MOCK_IMAGE_LIBRARY = {
  transport:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
  inflation:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=80",
  security:
    "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1600&q=80",
  city: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  education:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  energy:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
  cleanup:
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1600&q=80",
  technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  health:
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
  culture:
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  bikes:
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1600&q=80",
  cameras:
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80",
  water:
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80",
  finance:
    "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1600&q=80",
  autopistas:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  park:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
} as const;

type MockImageKey = keyof typeof MOCK_IMAGE_LIBRARY;

const mockImage = (key: MockImageKey) => MOCK_IMAGE_LIBRARY[key];

export const MOCK_CLUSTERS: StoryCluster[] = [
  // 1) Transporte & Movilidad – buen candidato para Top Story
  {
    id: "cluster_subte_dic_2025",
    createdAt: "2025-11-17T07:30:00Z",
    headline: "El SUBTE aumentará 15% desde diciembre en toda la red",
    subtitle:
      "La Ciudad actualiza la tarifa en un contexto de inflación alta y presión sobre los subsidios.",
    lede:
      "El Gobierno porteño confirmó un aumento del 15% en la tarifa del subte desde el 10 de diciembre. La medida impactará a más de tres millones de pasajeros diarios y se suma a los incrementos registrados durante el año.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "El ajuste golpea a más de tres millones de usuarios diarios justo cuando Nación presiona para bajar subsidios y trasladar más costos a la tarifa.",
      },
      {
        type: "big-picture",
        text: "El transporte porteño ya acumula incrementos sucesivos en 2025 y la discusión por los subsidios se replica en colectivos y trenes.",
      },
      {
        type: "driving-the-news",
        text: "Subterráneos de Buenos Aires aplica el incremento para cubrir energía, salarios y mantenimiento en un servicio que ya venía con subas escalonadas durante 2025.",
        bullets: [
          "La tarifa pasará de $130 a $150 en todas las líneas.",
          "La Ciudad argumenta que el ajuste responde a mayores costos operativos y energéticos.",
          "Organizaciones de usuarios cuestionan el impacto acumulado en el bolsillo.",
          "Desde Nación presionan para reducir los subsidios al transporte en el AMBA.",
        ],
      },
      {
        type: "between-the-lines",
        text: "El gobierno porteño apuesta a que la segmentación de tarifas y los abonos para estudiantes amortigüen la reacción social, pero los amparos podrían volver.",
      },
      {
        type: "what-to-watch",
        text: "El gobierno porteño define si fracciona futuros aumentos y las asociaciones de usuarios analizan presentar nuevos amparos antes del receso de verano.",
      },
    ],
    image: mockImage("transport"),
    topic: "Política",
    region: "CABA",
    bias: { left: 28, center: 50, right: 22 },
    sources: [
      {
        id: "ln_subte_dic",
        source: "La Nación",
        title: "El subte tendrá un aumento del 15% desde diciembre",
        description:
          "El Gobierno porteño justificó la suba por el aumento de costos.",
        url: "https://lanacion.com.ar/politica/subte-aumento-diciembre",
        image: null,
        publishedAt: "2025-11-17T06:40:00Z",
        text: "El Gobierno de la Ciudad confirmó un aumento del 15% en la tarifa del subte desde el 10 de diciembre...",
      },
      {
        id: "clarin_subte_dic",
        source: "Clarín",
        title: "Nuevo aumento del subte en la Ciudad: cómo quedan las tarifas",
        description: "",
        url: "https://clarin.com/ciudad/subte-nuevo-aumento-tarifas",
        image: null,
        publishedAt: "2025-11-17T07:05:00Z",
        text: "La tarifa del subte pasará de $130 a $150 a partir del próximo mes, según informaron fuentes oficiales...",
      },
      {
        id: "p12_subte_dic",
        source: "Página/12",
        title: "Otro tarifazo en el subte porteño",
        description:
          "El Gobierno porteño justificó la suba por el aumento de costos.",
        url: "https://pagina12.com.ar/economia/tarifazo-subte-porteno",
        image: null,
        publishedAt: "2025-11-17T07:20:00Z",
        text: "El nuevo aumento del subte se enmarca en una serie de incrementos que golpean el bolsillo de los usuarios...",
      },
    ],
    tags: ["SUBTE", "Tarifas", "AMBA", "Transporte"],
  },

  // 2) Economía & Precios – buen candidato para Briefing
  {
    id: "cluster_inflacion_oct_2025",
    createdAt: "2025-11-17T07:35:00Z",
    headline: "La inflación de octubre fue 8,1% y acumula 176% en el año",
    subtitle:
      "El dato refleja una leve desaceleración, pero se mantiene en niveles muy altos para los hogares del AMBA.",
    lede:
      "El INDEC informó que la inflación de octubre fue del 8,1%, levemente por debajo del registro de septiembre. Sin embargo, la suba de precios acumula 176% en lo que va del año y sigue golpeando con fuerza a los alimentos y servicios en el AMBA.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "El número llega con salarios y paritarias corriendo atrás y deja sin margen a los hogares del AMBA para absorber nuevas tarifas o alquileres.",
      },
      {
        type: "driving-the-news",
        text: "El nuevo dato del INDEC confirma la desaceleración leve, pero marca otro mes por encima del 8% cuando aún faltan aumentos regulados.",
      },
      {
        type: "by-the-numbers",
        text: "Los rubros que más presionaron al índice vuelven a ser los que definen el gasto mensual de las familias metropolitanas.",
        bullets: [
          "Alimentos y bebidas aumentaron por encima del índice general.",
          "Los servicios regulados, como luz y gas, aportaron presión al índice.",
          "Analistas prevén que la desaceleración será lenta si no hay cambios de fondo.",
          "En el AMBA, los alquileres y el transporte siguen siendo los rubros más sensibles.",
        ],
      },
      {
        type: "between-the-lines",
        text: "El Gobierno apuesta a acuerdos sectoriales cortos mientras evalúa postergar subas de luz y gas para no recalentar noviembre.",
      },
      {
        type: "what-to-watch",
        text: "Economía negocia nuevos acuerdos de precios y una actualización más gradual de tarifas para que noviembre no vuelva al dígito alto.",
      },
    ],
    image: mockImage("security"),
    topic: "Economía",
    region: "CABA",
    bias: { left: 35, center: 45, right: 20 },
    sources: [
      {
        id: "ambito_inflacion_oct",
        source: "Ámbito",
        title: "La inflación de octubre fue 8,1% y suma 176% en el año",
        description: "El INDEC confirmó una leve desaceleración del índice.",
        url: "https://ambito.com/economia/inflacion-octubre",
        image: null,
        publishedAt: "2025-11-16T21:00:00Z",
        text: "El INDEC informó que la inflación de octubre se ubicó en el 8,1%, acumulando 176% en los primeros diez meses del año...",
      },
      {
        id: "cronista_inflacion_oct",
        source: "El Cronista",
        title: "Inflación: qué pasó en octubre y qué se espera para noviembre",
        description: "",
        url: "https://cronista.com/economia/inflacion-octubre-que-esperar",
        image: null,
        publishedAt: "2025-11-17T01:20:00Z",
        text: "Con un registro del 8,1% en octubre, la inflación muestra una leve baja, aunque los analistas advierten...",
      },
    ],
    tags: ["Inflación", "Precios", "INDEC"],
  },

  // 3) Seguridad – típica nota muy “clickable” en BA
  {
    id: "cluster_inseguridad_palermo_noche",
    createdAt: "2025-11-17T07:40:00Z",
    headline: "Aumentan las denuncias por robos nocturnos en Palermo",
    subtitle:
      "Vecinos reclaman más presencia policial en zonas gastronómicas y corredores nocturnos.",
    lede:
      "En las últimas semanas se registró un incremento de denuncias por robos y arrebatos en el barrio de Palermo, especialmente en horarios nocturnos. Comerciantes y vecinos señalan que la zona de bares y restaurantes se volvió más insegura y piden refuerzos de la Policía de la Ciudad.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "Los corredores gastronómicos concentran consumo y turismo en plena temporada y cada denuncia golpea la sensación de seguridad y la actividad nocturna.",
      },
      {
        type: "driving-the-news",
        text: "Las comisarías de la Comuna 14 recibieron una suba de denuncias y las redes vecinales viralizaron videos de robos coordinados.",
      },
      {
        type: "state-of-play",
        text: "Los hechos se repiten los fines de semana con motochorros y grupos que aprovechan el cierre de bares, según los relevamientos vecinales.",
        bullets: [
          "Las denuncias crecieron principalmente en fines de semana.",
          "Los hechos se concentran alrededor de polos gastronómicos y calles muy transitadas.",
          "Vecinos exigen más patrullajes a pie y controles de motos.",
          "El Gobierno porteño promete operativos focalizados y coordinación con fiscalías.",
        ],
      },
      {
        type: "the-other-side",
        text: "El Ministerio de Seguridad porteño dice que el delito tiene oscilaciones normales y que la redistribución de móviles reducirá los tiempos de respuesta.",
      },
      {
        type: "what-to-watch",
        text: "La Ciudad sumará controles en calles internas y evaluará más cámaras para diciembre; los vecinos quieren resultados antes de las fiestas.",
      },
    ],
    image: mockImage("security"),
    topic: "Política",
    bias: { left: 25, center: 50, right: 25 },
    sources: [
      {
        id: "tn_palermo_robos",
        source: "TN",
        title:
          "Preocupación en Palermo por aumento de robos a la salida de bares",
        description: "Vecinos piden más presencia policial.",
        url: "https://tn.com.ar/sociedad/robos-palermo-noches",
        image: null,
        publishedAt: "2025-11-16T23:30:00Z",
        text: "En las últimas semanas se registró un aumento de robos en la zona de bares de Palermo, según denunciaron vecinos...",
      },
      {
        id: "infobae_palermo_robos",
        source: "Infobae",
        title: "Más robos en Palermo: comerciantes reclaman controles",
        description: "",
        url: "https://infobae.com/sociedad/robos-palermo-gastronomia",
        image: null,
        publishedAt: "2025-11-17T06:10:00Z",
        text: "Los comerciantes de Palermo aseguran que los hechos de inseguridad aumentaron en el último mes y que la situación preocupa...",
      },
    ],
    tags: ["Palermo", "Inseguridad", "AMBA"],
  },

  // 4) Gobierno de la Ciudad – medida concreta
  {
    id: "cluster_gob_caba_espacios_verdes",
    createdAt: "2025-11-17T07:45:00Z",
    headline: "La Ciudad suma un nuevo parque lineal en la zona sur",
    subtitle:
      "El proyecto apunta a recuperar el espacio público y mejorar la conexión peatonal en Barracas y Parque Patricios.",
    lede:
      "El Gobierno porteño presentó un nuevo parque lineal en la zona sur de la Ciudad, con circuitos peatonales, bicisendas y áreas de juego. El objetivo es ampliar la superficie de espacios verdes y mejorar la integración urbana en barrios históricamente postergados.",
    axiomBlocks: [
      {
        type: "big-picture",
        text: "La zona sur concentra el déficit de espacios públicos y el proyecto busca equilibrar la balanza respecto del norte porteño.",
      },
      {
        type: "driving-the-news",
        text: "La obra fue retomada tras conseguir financiamiento del BID y forma parte de la agenda de campaña para mostrar inversión en el sur.",
      },
      {
        type: "how-it-works",
        text: "El parque se construirá sobre terrenos ferroviarios en desuso entre Barracas y Parque Patricios e incluirá infraestructura básica para caminar y pedalear.",
        bullets: [
          "El parque lineal se extenderá a lo largo de ex terrenos ferroviarios.",
          "Incluye bicisendas, juegos para chicos y mobiliario urbano.",
          "Vecinos valoran el proyecto pero piden garantizar mantenimiento y seguridad.",
          "Organizaciones barriales cuestionan el proceso de consulta previa.",
        ],
      },
      {
        type: "between-the-lines",
        text: "Las organizaciones vecinales reclaman más participación en el diseño y garantías de iluminación y cuidado una vez inaugurado.",
      },
      {
        type: "what-to-watch",
        text: "Habrá audiencias públicas en enero para definir los usos y el pliego de mantenimiento; los vecinos buscan compromisos concretos.",
      },
    ],
    image: mockImage("city"),
    topic: "Política",
    bias: { left: 30, center: 55, right: 15 },
    sources: [
      {
        id: "ln_parque_lineal_sur",
        source: "La Nación",
        title: "La Ciudad proyecta un nuevo parque lineal en la zona sur",
        description: "El Gobierno porteño busca sumar espacios verdes.",
        url: "https://lanacion.com.ar/ciudad/parque-lineal-zona-sur",
        image: null,
        publishedAt: "2025-11-16T15:10:00Z",
        text: "La administración porteña anunció la construcción de un parque lineal en la zona sur, sobre terrenos ferroviarios en desuso...",
      },
      {
        id: "pagina12_parque_lineal_sur",
        source: "Página/12",
        title: "Nuevo parque lineal: vecinos piden más participación",
        description:
          "El Gobierno porteño justificó la suba por el aumento de costos.",
        url: "https://pagina12.com.ar/sociedad/parque-lineal-sur-participacion",
        image: null,
        publishedAt: "2025-11-17T01:05:00Z",
        text: "Organizaciones barriales plantearon la necesidad de un proceso participativo para definir el uso del nuevo parque...",
      },
    ],
    tags: ["Espacios verdes", "Zona Sur", "Urbanismo"],
  },

  // 5) Provincia de Buenos Aires – algo fuerte para GBA
  {
    id: "cluster_pba_docentes_paro",
    createdAt: "2025-11-17T07:50:00Z",
    headline:
      "Docentes bonaerenses anuncian paro de 48 horas la próxima semana",
    subtitle:
      "Reclaman una mejora salarial por encima de la inflación y mayor inversión en infraestructura escolar.",
    lede:
      "Los gremios docentes de la provincia de Buenos Aires convocaron a un paro de 48 horas para la próxima semana tras considerar insuficiente la última oferta salarial del gobierno provincial. La medida afectará a miles de escuelas en el conurbano y el interior.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "Dos días sin clases en la provincia con mayor matrícula pública vuelve a tensar a las familias del Conurbano en plena recta final del ciclo lectivo.",
      },
      {
        type: "driving-the-news",
        text: "La última oferta salarial quedó tres puntos por debajo de la inflación proyectada y los gremios respondieron con un paro inmediato.",
      },
      {
        type: "state-of-play",
        text: "Los gremios rechazaron la propuesta que no cubre la inflación acumulada y reclaman fondos también para infraestructura escolar.",
        bullets: [
          "Los sindicatos piden una recomposición que supere la inflación acumulada.",
          "El Gobierno bonaerense afirma que la propuesta es “fiscalmente posible”.",
          "Familias del conurbano expresan preocupación por la cantidad de días sin clases.",
          "Habrá una nueva reunión paritaria luego del paro.",
        ],
      },
      {
        type: "the-other-side",
        text: "La Provincia sostiene que ya adelantó tramos de aumento y que cada punto extra implica recortar otras partidas sensibles.",
      },
      {
        type: "what-to-watch",
        text: "Tras la medida de fuerza se reabrirá la mesa paritaria: si no hay mejora, los gremios advierten con un nuevo paro en diciembre.",
      },
    ],
    image: mockImage("education"),
    topic: "Sociedad",
    region: "PBA",
    bias: { left: 40, center: 45, right: 15 },
    sources: [
      {
        id: "clarin_pba_paro_docente",
        source: "Clarín",
        title: "Paro docente de 48 horas en Provincia: cuándo y por qué",
        description: "",
        url: "https://clarin.com/sociedad/paro-docente-provincia-48-horas",
        image: null,
        publishedAt: "2025-11-16T18:00:00Z",
        text: "Los gremios docentes convocaron a un paro de 48 horas en reclamo de una mejora salarial...",
      },
      {
        id: "pagina12_pba_paro_docente",
        source: "Página/12",
        title: "Los docentes bonaerenses paran por 48 horas",
        description:
          "El Gobierno porteño justificó la suba por el aumento de costos.",
        url: "https://pagina12.com.ar/sociedad/docentes-bonaerenses-paro",
        image: null,
        publishedAt: "2025-11-16T20:30:00Z",
        text: "Los gremios reclamaron una recomposición salarial por encima de la inflación y mejor infraestructura escolar...",
      },
    ],
    tags: ["Provincia de Buenos Aires", "Sociedad", "Paritaria docente"],
  },

  // 6) Servicios & Tarifas – muy relevante para AMBA
  {
    id: "cluster_luz_aumento_amba",
    createdAt: "2025-11-17T07:55:00Z",
    headline: "Aumentan hasta 12% las tarifas de luz en el AMBA desde enero",
    subtitle:
      "La suba impactará de forma escalonada según el nivel de consumo y el esquema de subsidios vigente.",
    lede:
      "El Ente Regulador anunció una actualización de hasta 12% en las tarifas de energía eléctrica para usuarios residenciales del AMBA a partir de enero. El aumento variará según el nivel de consumo y la categoría de subsidios, con mayor impacto en los hogares de ingresos medios.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "La boleta de luz vuelve a moverse justo cuando las familias del AMBA acumulan subas de alquileres y expensas.",
      },
      {
        type: "big-picture",
        text: "El Gobierno busca reducir subsidios energéticos y empuja una convergencia gradual entre lo que pagan hogares y el costo real.",
      },
      {
        type: "how-it-works",
        text: "El ENRE aplicará ajustes escalonados durante el primer trimestre y segmentará montos según subsidios y consumo.",
        bullets: [
          "La suba se aplicará en forma escalonada durante el primer trimestre.",
          "Los usuarios con mayor consumo verán los incrementos más altos.",
          "Organizaciones de consumidores cuestionan la falta de previsibilidad.",
          "El Gobierno argumenta que el ajuste es necesario para sostener el sistema energético.",
        ],
      },
      {
        type: "yes-but",
        text: "Los defensores del ajuste aseguran que sin corrección tarifaria el sistema colapsa, pero organizaciones sociales advierten sobre impagos masivos.",
      },
      {
        type: "what-to-watch",
        text: "Energía definirá en diciembre si suma otro tramo de actualización para comercios y clubes barriales.",
      },
    ],
    image: mockImage("energy"),
    topic: "Economía",
    bias: { left: 32, center: 48, right: 20 },
    sources: [
      {
        id: "ambito_luz_aumento",
        source: "Ámbito",
        title: "Tarifas de luz: suba de hasta 12% para el AMBA desde enero",
        description: "",
        url: "https://ambito.com/economia/tarifas-luz-amba-enero",
        image: null,
        publishedAt: "2025-11-16T19:45:00Z",
        text: "El ente regulador de la electricidad anunció una suba de hasta el 12% en las tarifas residenciales del AMBA...",
      },
      {
        id: "infobae_luz_aumento",
        source: "Infobae",
        title: "Luz más cara desde enero: quiénes pagarán más",
        description: "",
        url: "https://infobae.com/economia/luz-mas-cara-enero",
        image: null,
        publishedAt: "2025-11-17T06:50:00Z",
        text: "El aumento en las tarifas de luz impactará con más fuerza en los usuarios de ingresos medios y altos...",
      },
    ],
    tags: ["Tarifas", "Luz", "AMBA", "Servicios"],
  },
  {
    id: "cluster_gba_basura",
    createdAt: "2025-11-17T08:00:00Z",
    headline:
      "Municipios del GBA refuerzan recolección de basura post temporal",
    subtitle:
      "Los intendentes coordinan operativos especiales tras el temporal del fin de semana.",
    lede:
      "Tras las lluvias y ráfagas de viento en el AMBA, varios municipios desplegaron operativos especiales para retirar ramas y residuos, trabajando con cooperativas barriales para normalizar el servicio antes del próximo fin de semana.",
    axiomBlocks: [
      {
        type: "driving-the-news",
        text: "El temporal dejó calles anegadas y ramas caídas en al menos ocho municipios del primer cordón.",
      },
      {
        type: "zoom-in",
        text: "En Morón y Quilmes tuvieron que sumar turnos dobles porque todavía quedan árboles caídos en avenidas principales.",
      },
      {
        type: "state-of-play",
        text: "Los intendentes coordinan turnos nocturnos extra con cooperativas y contratistas para normalizar la recolección.",
        bullets: [
          "El temporal dejó árboles caídos en más de 200 esquinas.",
          "Los intendentes pidieron paciencia por la saturación de los servicios.",
          "Se reforzó el personal nocturno y los camiones compactadores.",
          "Habrá puntos verdes móviles para residuos voluminosos.",
        ],
      },
      {
        type: "between-the-lines",
        text: "Los intendentes cuidan la foto: buscan mostrar presencia territorial a días de cerrar el año de gestión y antes del recambio de gabinetes.",
      },
      {
        type: "what-to-watch",
        text: "Si vuelve a llover el fin de semana se repetirá el operativo y podrían sumarse contenedores especiales en estaciones de tren.",
      },
    ],
    image: mockImage("cleanup"),
    topic: "Política",
    bias: { left: 32, center: 48, right: 20 },
    sources: [
      {
        id: "infobae_gba_basura",
        source: "Infobae",
        title:
          "Temporal en el AMBA: cómo trabajan los municipios para limpiar las calles",
        description: "",
        url: "https://infobae.com/sociedad/temporal-operativos-gba",
        image: null,
        publishedAt: "2025-11-17T07:30:00Z",
        text: "Intendentes del conurbano explicaron los refuerzos de recolección tras el temporal...",
      },
    ],
    tags: ["Temporal", "Residuos", "AMBA"],
  },
  {
    id: "cluster_learn_ai",
    createdAt: "2025-11-17T08:15:00Z",
    headline: "La Ciudad abre un centro para capacitar en IA aplicada a PYMES",
    subtitle:
      "El nuevo centro busca acompañar a emprendedores y empresas tecnológicas.",
    lede:
      "La Ciudad inauguró un espacio de formación en inteligencia artificial aplicada a negocios y servicios públicos, con talleres gratuitos para PYMES de comercio electrónico, logística y turismo.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "Las pymes porteñas buscan digitalizar procesos sin presupuestos millonarios y necesitan guías prácticas sobre IA.",
      },
      {
        type: "driving-the-news",
        text: "El anuncio llega tras la visita de referentes tech al Distrito Tecnológico y en medio de la competencia con polos privados.",
      },
      {
        type: "state-of-play",
        text: "El centro ofrecerá talleres gratuitos y mentorías desde Parque Patricios con apoyo de universidades y empresas.",
        bullets: [
          "Esperan capacitar a 5.000 personas en el primer año.",
          "Habrá convenios con universidades y empresas tecnológicas.",
          "Se ofrecerán mentorías para proyectos en marcha.",
          "Funcionará en el Distrito Tecnológico de Parque Patricios.",
        ],
      },
      {
        type: "between-the-lines",
        text: "El gobierno porteño quiere mostrar que acompaña la adopción de IA responsable y contrarrestar las críticas por la falta de perfiles técnicos.",
      },
      {
        type: "what-to-watch",
        text: "El Ministerio de Desarrollo Económico definirá en marzo si suma becas para pymes industriales y acuerdos con bancos.",
      },
    ],
    image: mockImage("technology"),
    topic: "Sociedad",
    region: "CABA",
    bias: { left: 25, center: 55, right: 20 },
    sources: [
      {
        id: "lanacion_centro_ia",
        source: "La Nación",
        title:
          "La Ciudad lanza un centro de inteligencia artificial para PYMES",
        description: "",
        url: "https://lanacion.com.ar/tecnologia/centro-ia-pymes-caba",
        image: null,
        publishedAt: "2025-11-17T08:10:00Z",
        text: "Durante la presentación, el jefe de Gobierno destacó la necesidad de capacitar en IA...",
      },
    ],
    tags: ["Sociedad", "IA", "PYMES"],
  },
  {
    id: "cluster_salud_mental_guardias",
    createdAt: "2025-11-17T08:30:00Z",
    headline: "Refuerzan equipos de salud mental en guardias porteñas",
    subtitle:
      "Buscan mejorar la atención durante crisis y situaciones de violencia urbana.",
    lede:
      "La Ciudad incorporará psicólogos y psiquiatras en las guardias de hospitales generales para brindar contención ante episodios de pánico, violencia y consumo problemático. El plan se implementará de manera gradual hasta marzo.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "Las guardias reciben cada vez más consultas de salud mental y los equipos generalistas quedan cortos para contener crisis.",
      },
      {
        type: "driving-the-news",
        text: "El incremento de episodios de violencia en guardias y las denuncias de profesionales forzaron a Salud a adelantar el refuerzo previsto para marzo.",
      },
      {
        type: "state-of-play",
        text: "Durante el verano se sumarán profesionales 24/7 que coordinarán con SAME y defensa civil.",
        bullets: [
          "Guardias recibirán especialistas durante 24 horas.",
          "Se trabajará en conjunto con SAME y defensa civil.",
          "Crece el número de consultas vinculadas al estrés.",
          "Organizaciones sociales celebran la medida y piden prevención.",
        ],
      },
      {
        type: "between-the-lines",
        text: "Los gremios de salud reclaman que se avance también con mejoras salariales y programas preventivos en barrios con consumo problemático.",
      },
      {
        type: "what-to-watch",
        text: "El Ministerio de Salud definirá en marzo si amplía el plan a hospitales del conurbano mediante convenios.",
      },
    ],
    image: mockImage("health"),
    topic: "Sociedad",
    region: "CABA",
    bias: { left: 40, center: 45, right: 15 },
    sources: [
      {
        id: "pagina12_salud_mental",
        source: "Página/12",
        title: "Guardias porteñas suman equipos de salud mental",
        description: "",
        url: "https://pagina12.com.ar/sociedad/salud-mental-guardias",
        image: null,
        publishedAt: "2025-11-17T08:20:00Z",
        text: "El Ministerio de Salud porteño informó que se reforzarán las guardias...",
      },
    ],
    tags: ["Sociedad", "Guardias", "Contención"],
  },
  {
    id: "cluster_cultura_plazas_verano",
    createdAt: "2025-11-17T08:45:00Z",
    headline: "Plazas porteñas suman programación cultural gratuita en verano",
    subtitle: "Habrá cine, música y talleres itinerantes en 15 barrios.",
    lede:
      "El Ministerio de Cultura de la Ciudad anunció ciclos culturales al aire libre durante enero y febrero, con shows y talleres en plazas y parques y fuerte presencia de artistas locales.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "La programación gratuita busca ofrecer salidas accesibles en medio de presupuestos ajustados.",
      },
      {
        type: "driving-the-news",
        text: "Cultura adelantó el calendario para asegurar sponsors y coordinar con las comunas antes del recambio de autoridades.",
      },
      {
        type: "state-of-play",
        text: "Habrá cine, música y talleres itinerantes con fuerte presencia de artistas independientes.",
        bullets: [
          "El calendario arranca el 10 de enero.",
          "Participarán 120 artistas independientes.",
          "Habrá propuestas para niños y adultos mayores.",
          "Las actividades requerirán reserva previa online.",
        ],
      },
      {
        type: "between-the-lines",
        text: "El ministerio busca mostrar federalismo porteño y abrir espacio a artistas que quedaron fuera de grandes festivales pagos.",
      },
      {
        type: "what-to-watch",
        text: "Cultura evaluará sumar nuevas sedes si la demanda supera las reservas durante la primera quincena.",
      },
    ],
    image: mockImage("culture"),
    topic: "Política",
    bias: { left: 30, center: 50, right: 20 },
    sources: [
      {
        id: "telam_cultura_plazas",
        source: "Télam",
        title: "La Ciudad anunció programación cultural gratuita en plazas",
        description: "",
        url: "https://telam.com.ar/cultura/plazas-programacion",
        image: null,
        publishedAt: "2025-11-17T08:40:00Z",
        text: "Desde el Ministerio de Cultura informaron que se realizarán shows gratuitos...",
      },
    ],
    tags: ["Cultura", "Verano", "Espacio Público"],
  },
  {
    id: "cluster_transporte_bicisendas_sur",
    createdAt: "2025-11-17T09:00:00Z",
    headline: "Extienden bicisendas en el corredor norte-sur de la Ciudad",
    subtitle:
      "La obra conectará Chacarita con Constitución y sumará 10 km de red.",
    lede:
      "Comenzó la construcción de una bicisenda que unirá Chacarita con Constitución, mejorando el corredor norte-sur y conectando con 20 estaciones Ecobici. Estará lista en marzo.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "El corredor norte-sur concentra viajes diarios de repartidores y estudiantes que hoy circulan sin protección.",
      },
      {
        type: "driving-the-news",
        text: "La licitación se adjudicó en tiempo récord para inaugurar antes del invierno y mostrar continuidad en la red.",
      },
      {
        type: "how-it-works",
        text: "La obra contempla carriles protegidos, señalización LED y nuevas dársenas para repartidores.",
        bullets: [
          "El corredor tendrá carriles protegidos y señalización LED.",
          "Se sumarán dársenas para repartidores.",
          "Habrá obras de arbolado y veredas nuevas.",
          "Los vecinos podrán seguir el avance en una web pública.",
        ],
      },
      {
        type: "between-the-lines",
        text: "Las cámaras empresarias presionan para que se coordine con paradas de colectivos y no se pierdan plazas de estacionamiento en zonas comerciales.",
      },
      {
        type: "what-to-watch",
        text: "La Ciudad publicará el cronograma de cortes callejeros mes a mes para evitar demoras en colectivos.",
      },
    ],
    image: mockImage("bikes"),
    topic: "Política",
    bias: { left: 25, center: 55, right: 20 },
    sources: [
      {
        id: "clarin_bicisenda",
        source: "Clarín",
        title: "La Ciudad extiende bicisendas hacia el sur",
        description: "",
        url: "https://clarin.com/ciudad/bicisendas-sur",
        image: null,
        publishedAt: "2025-11-17T08:55:00Z",
        text: "La obra conectará barrios históricamente relegados del sistema de ciclovías...",
      },
    ],
    tags: ["Bicisendas", "Movilidad", "Obras"],
  },
  {
    id: "cluster_seguridad_camaras",
    createdAt: "2025-11-17T09:15:00Z",
    headline: "La Ciudad suma 2.000 cámaras con IA para monitorear accesos",
    subtitle:
      "El plan incluye analítica para detectar autos con pedido de captura.",
    lede:
      "Se incorporarán 2.000 cámaras con reconocimiento de matrículas en accesos a la Ciudad y corredores críticos del GBA. Las imágenes se integrarán al Centro de Monitoreo Urbano.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "La Ciudad suma tecnología para anticipar delitos en accesos donde circulan 1,5 millones de autos diarios.",
      },
      {
        type: "driving-the-news",
        text: "La nueva etapa agrega cámaras con analítica de matrículas que se integran con alertas al SAME y a la Policía de la Ciudad.",
        bullets: [
          "La instalación finalizará en mayo.",
          "Trabajan en un protocolo de resguardo de datos.",
          "Las cámaras alertarán al SAME ante choques.",
          "Opositores piden auditoría independiente.",
        ],
      },
      {
        type: "state-of-play",
        text: "Los accesos norte y oeste son los primeros en recibir los equipos, y luego se expanden a cruces ferroviarios y centros comerciales.",
      },
      {
        type: "reality-check",
        text: "Organizaciones civiles piden una auditoría sobre el uso de datos biométricos antes de usar IA a gran escala.",
      },
      {
        type: "what-to-watch",
        text: "La Legislatura tratará un proyecto para regular el almacenamiento de imágenes y podría sumar un comité de control ciudadano.",
      },
    ],
    image: mockImage("cameras"),
    topic: "Política",
    bias: { left: 28, center: 50, right: 22 },
    sources: [
      {
        id: "tn_seguridad_camaras",
        source: "TN",
        title: "Nuevas cámaras con IA para controlar accesos a la Ciudad",
        description: "",
        url: "https://tn.com.ar/seguridad/camaras-ia-accesos",
        image: null,
        publishedAt: "2025-11-17T09:05:00Z",
        text: "El gobierno porteño anunció la incorporación de tecnología de IA en la red de cámaras...",
      },
    ],
    tags: ["Seguridad", "Sociedad"],
  },
  {
    id: "cluster_servicios_agua_norte",
    createdAt: "2025-11-17T09:30:00Z",
    headline:
      "AySA reemplaza cañerías en Núñez y Belgrano para mejorar presión",
    subtitle:
      "Las obras demandarán cortes programados pero prometen mejoras para 80 mil vecinos.",
    lede:
      "AySA inició un plan de renovación de cañerías en Núñez y Belgrano para mejorar la presión del agua en verano. Los trabajos se coordinarán con cortes nocturnos y provisión de camiones cisterna.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "La presión cae cada verano en los barrios del norte y obliga a muchos edificios a contratar camiones cisterna.",
      },
      {
        type: "driving-the-news",
        text: "AySA adelantó el cronograma de obras tras múltiples reclamos vecinales y multas de la Ciudad por baja presión.",
      },
      {
        type: "how-it-works",
        text: "AySA renovará 12 km de red con obras nocturnas y difundirá avisos por WhatsApp para minimizar el impacto.",
        bullets: [
          "Se intervendrán 12 km de red en 90 días.",
          "Habrá puestos de hidratación en plazas.",
          "Los trabajos se informarán por WhatsApp oficial.",
          "Comerciantes piden cronograma detallado.",
        ],
      },
      {
        type: "between-the-lines",
        text: "Los comerciantes temen que los cortes nocturnos igual afecten cenas y quejas hoteleras si la presión cae en horarios pico.",
      },
      {
        type: "what-to-watch",
        text: "Los vecinos seguirán el cronograma en una web dedicada; AySA promete terminar antes de marzo.",
      },
    ],
    image: mockImage("water"),
    topic: "Economía",
    bias: { left: 35, center: 45, right: 20 },
    sources: [
      {
        id: "clarin_servicios_agua",
        source: "Clarín",
        title: "AySA inicia obras en Núñez y Belgrano: habrá cortes nocturnos",
        description: "",
        url: "https://clarin.com/ciudad/aysa-obras-nunez-belgrano",
        image: null,
        publishedAt: "2025-11-17T09:20:00Z",
        text: "AySA detalló que renovará cañerías antiguas para mejorar la presión...",
      },
    ],
    tags: ["AySA", "Obras", "Servicios"],
  },
  {
    id: "cluster_economia_creditos_verdes",
    createdAt: "2025-11-17T09:45:00Z",
    headline: "Lanzan créditos verdes para pymes del AMBA",
    subtitle:
      "Los préstamos financiarán eficiencia energética y paneles solares.",
    lede:
      "El Banco Ciudad presentó una línea de créditos verdes para pymes del AMBA que busquen instalar paneles solares o renovar equipos eficientes. Tendrán tasa subsidiada y asesoría técnica.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "Las pymes necesitan bajar costos energéticos y acceder a financiamiento flexible para adoptar tecnología limpia.",
      },
      {
        type: "driving-the-news",
        text: "El Banco Ciudad aprovechó la COP local para relanzar una línea con fondeo multilateral y respaldo del ministerio de Producción.",
      },
      {
        type: "by-the-numbers",
        text: "La línea llega con cupo inicial y asesoría en eficiencia energética.",
        bullets: [
          "La tasa será 20% menor que la línea tradicional.",
          "Se financiarán proyectos hasta $80 millones.",
          "Habrá una ventanilla especial en Parque Patricios.",
          "Industriales piden ampliar cupo para logística.",
        ],
      },
      {
        type: "between-the-lines",
        text: "El cupo es limitado y las empresas más chicas temen quedarse afuera frente a players medianos con más espalda para presentar proyectos.",
      },
      {
        type: "what-to-watch",
        text: "El banco evaluará en abril si extiende la línea a cooperativas y empresas de logística urbana.",
      },
    ],
    image: mockImage("finance"),
    topic: "Economía",
    region: "PBA",
    bias: { left: 30, center: 50, right: 20 },
    sources: [
      {
        id: "ambito_creditos_verdes",
        source: "Ámbito",
        title: "El Banco Ciudad lanza créditos verdes para pymes",
        description: "",
        url: "https://ambito.com/finanzas/creditos-verdes-banco-ciudad",
        image: null,
        publishedAt: "2025-11-17T09:35:00Z",
        text: "La entidad detalló que la línea financiará proyectos sustentables en el AMBA...",
      },
    ],
    tags: ["Créditos", "PYMES", "Sustentabilidad"],
  },
  {
    id: "cluster_transito_autopistas_digital",
    createdAt: "2025-11-17T10:00:00Z",
    headline:
      "Las autopistas porteñas suman tickets digitales para infracciones",
    subtitle: "Permitirá consultar online las multas y pagarlas con descuento.",
    lede:
      "AUSA lanzó un sistema de tickets digitales para infracciones en autopistas Illia, 25 de Mayo y Perito Moreno. Los usuarios recibirán notificaciones por mail y tendrán 10 días para pagar con descuento.",
    axiomBlocks: [
      {
        type: "why-it-matters",
        text: "Los conductores podrán saber en tiempo real si tienen infracciones y evitar sorpresas al renovar la licencia.",
      },
      {
        type: "driving-the-news",
        text: "AUSA digitaliza el sistema tras detectar demoras en notificaciones físicas y reclamos en Defensa del Consumidor.",
      },
      {
        type: "how-it-works",
        text: "El ticket digital se integra con MiBA y con la app de AUSA con notificaciones y tutoriales.",
        bullets: [
          "El sistema se integra con MiBA y la app de Autopistas Urbanas.",
          "Los datos se actualizarán en 24 horas.",
          "Habrá tutores virtuales para consultas.",
          "Usuarios piden simplificar el proceso de descargo.",
        ],
      },
      {
        type: "yes-but",
        text: "Abogados especialistas advierten que los plazos de descargo siguen siendo cortos y que muchos usuarios desconocen cómo adjuntar pruebas.",
      },
      {
        type: "what-to-watch",
        text: "La empresa analiza sumar pago con billeteras virtuales y un canal exprés para descargos a partir de febrero.",
      },
    ],
    image: mockImage("autopistas"),
    topic: "Sociedad",
    region: "CABA",
    bias: { left: 22, center: 58, right: 20 },
    sources: [
      {
        id: "infobae_autopistas_digital",
        source: "Infobae",
        title: "AUSA lanza tickets digitales para multas en autopistas",
        description: "",
        url: "https://infobae.com/economia/autopistas-tickets-digitales",
        image: null,
        publishedAt: "2025-11-17T09:55:00Z",
        text: "Autopistas Urbanas informó que desde esta semana las infracciones se notifican de forma digital...",
      },
    ],
    tags: ["Autopistas", "Tránsito", "Digitalización"],
  },
  {
    id: "cluster_obras_parque_costanera",
    createdAt: "2025-11-17T10:15:00Z",
    headline:
      "Avanzan obras del Parque de la Costanera Sur con nuevos miradores",
    subtitle:
      "El proyecto recupera sectores junto al río con senderos y puntos gastronómicos.",
    lede:
      "El Gobierno porteño informó que las obras del Parque de la Costanera Sur alcanzaron el 60% de avance, con la construcción de miradores, senderos y áreas de descanso. El parque abrirá por etapas desde abril.",
    axiomBlocks: [
      {
        type: "big-picture",
        text: "La Ciudad busca reabrir el acceso al río con más servicios mientras avanza la discusión por la Costanera Norte.",
      },
      {
        type: "driving-the-news",
        text: "Después de meses de retrasos, el Ministerio de Espacio Público mostró el avance del 60% para calmar críticas opositoras.",
      },
      {
        type: "state-of-play",
        text: "Las obras incluyen miradores, iluminación LED y conexión con la Reserva Ecológica.",
        bullets: [
          "Habrá 4 miradores elevados y nueva iluminación LED.",
          "El parque conectará con la Reserva Ecológica.",
          "Se sumarán locales gastronómicos y baños públicos.",
          "Organizaciones ambientales piden un plan de mantenimiento.",
        ],
      },
      {
        type: "the-other-side",
        text: "ONG ambientales temen que la gastronomía privada avance sobre espacios públicos y piden límites estrictos por contrato.",
      },
      {
        type: "what-to-watch",
        text: "Desde abril abrirán tramos por etapas; ONG ambientales monitorean que no se privatice más superficie.",
      },
    ],
    image: mockImage("park"),
    topic: "Política",
    bias: { left: 30, center: 55, right: 15 },
    sources: [
      {
        id: "lanacion_parque_costanera",
        source: "La Nación",
        title: "Cómo avanza el nuevo parque en Costanera Sur",
        description: "",
        url: "https://lanacion.com.ar/ciudad/parque-costanera-avance",
        image: null,
        publishedAt: "2025-11-17T10:05:00Z",
        text: "La Ciudad mostró los avances del parque que recupera los terrenos de la ex Ciudad Deportiva...",
      },
    ],
    tags: ["Costanera", "Parques", "Obras"],
  },
];

export const MOCK_POPULAR_NEWS: Readonly<PopularNewsTab> = [
  {
    id: "keyword_precios_inflacion",
    title: "Precios e Inflación",
    targetTopic: "Economía",
  },
  {
    id: "keyword_dolar_hoy",
    title: "Dólar Hoy",
    targetTopic: "Economía",
  },
  {
    id: "keyword_javier_milei",
    title: "Javier Milei",
    targetTopic: "Política",
  },
  {
    id: "keyword_nuevas_medidas",
    title: "Nuevas Medidas",
    targetTopic: "Política",
  },
];
