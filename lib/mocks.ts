import { PopularNewsTab, StoryCluster } from "./types";

export const MOCK_CLUSTERS: StoryCluster[] = [
  // 1) Transporte & Movilidad – buen candidato para Top Story
  {
    id: "cluster_subte_dic_2025",
    createdAt: "2025-11-17T07:30:00Z",
    headline: "El SUBTE aumentará 15% desde diciembre en toda la red",
    subtitle:
      "La Ciudad actualiza la tarifa en un contexto de inflación alta y presión sobre los subsidios.",
    summary:
      "El Gobierno porteño confirmó un aumento del 15% en la tarifa del subte desde el 10 de diciembre. La medida impactará a más de tres millones de pasajeros diarios y se suma a los incrementos registrados durante el año.",
    bullets: [
      "La tarifa pasará de $130 a $150 en todas las líneas.",
      "La Ciudad argumenta que el ajuste responde a mayores costos operativos y energéticos.",
      "Organizaciones de usuarios cuestionan el impacto acumulado en el bolsillo.",
      "Desde Nación presionan para reducir los subsidios al transporte en el AMBA.",
    ],
    body: "El Gobierno de la Ciudad de Buenos Aires anunció un aumento del 15% en la tarifa del subte a partir del 10 de diciembre. Según las autoridades porteñas, la medida busca actualizar los ingresos del servicio frente a mayores costos operativos, especialmente en energía y salarios. El incremento se aplicará en todas las líneas y afectará a más de tres millones de pasajeros diarios que utilizan la red. Organizaciones de usuarios criticaron el impacto acumulado de los aumentos en el contexto inflacionario, mientras que desde Nación se mantiene la presión para reducir los subsidios destinados al transporte en el AMBA.",
    image: "https://example.com/images/subte-aumento.jpg",
    topic: "Transporte & Movilidad",
    bias: { left: 28, center: 50, right: 22 },
    sources: [
      {
        id: "ln_subte_dic",
        source: "La Nación",
        title: "El subte tendrá un aumento del 15% desde diciembre",
        description:
          "El Gobierno porteño justificó la suba por el aumento de costos.",
        url: "https://lanacion.com.ar/politica/subte-aumento-diciembre",
        image: "https://example.com/images/ln-subte.jpg",
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
    summary:
      "El INDEC informó que la inflación de octubre fue del 8,1%, levemente por debajo del registro de septiembre. Sin embargo, la suba de precios acumula 176% en lo que va del año y sigue golpeando con fuerza a los alimentos y servicios en el AMBA.",
    bullets: [
      "Alimentos y bebidas aumentaron por encima del índice general.",
      "Los servicios regulados, como luz y gas, aportaron presión al índice.",
      "Analistas prevén que la desaceleración será lenta si no hay cambios de fondo.",
      "En el AMBA, los alquileres y el transporte siguen siendo los rubros más sensibles.",
    ],
    body: "El INDEC dio a conocer que la inflación de octubre fue del 8,1%, lo que implica una leve desaceleración respecto al mes anterior, aunque se mantiene en niveles muy elevados. De esta manera, el índice de precios al consumidor acumula un 176% en lo que va del año. Los alimentos y bebidas volvieron a ubicarse por encima del promedio, afectando especialmente a los hogares de menores ingresos en el Área Metropolitana de Buenos Aires. Los ajustes en tarifas de servicios regulados, como luz y gas, también presionaron el indicador. Especialistas advierten que, sin un cambio consistente en la política económica, la baja en la inflación será gradual y no se reflejará rápidamente en la calle. En el AMBA, los alquileres, el transporte y los servicios básicos siguen liderando las preocupaciones cotidianas de los vecinos.",
    image: "https://example.com/images/supermercado-inflacion.jpg",
    topic: "Economía & Precios",
    bias: { left: 35, center: 45, right: 20 },
    sources: [
      {
        id: "ambito_inflacion_oct",
        source: "Ámbito",
        title: "La inflación de octubre fue 8,1% y suma 176% en el año",
        description: "El INDEC confirmó una leve desaceleración del índice.",
        url: "https://ambito.com/economia/inflacion-octubre",
        image: "https://example.com/images/ambito-inflacion.jpg",
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
    summary:
      "En las últimas semanas se registró un incremento de denuncias por robos y arrebatos en el barrio de Palermo, especialmente en horarios nocturnos. Comerciantes y vecinos señalan que la zona de bares y restaurantes se volvió más insegura y piden refuerzos de la Policía de la Ciudad.",
    bullets: [
      "Las denuncias crecieron principalmente en fines de semana.",
      "Los hechos se concentran alrededor de polos gastronómicos y calles muy transitadas.",
      "Vecinos exigen más patrullajes a pie y controles de motos.",
      "El Gobierno porteño promete operativos focalizados y coordinación con fiscalías.",
    ],
    body: "Vecinos y comerciantes de Palermo reportaron un aumento de robos y arrebatos durante la noche en las últimas semanas, sobre todo en las zonas de mayor concentración de bares y restaurantes. De acuerdo con datos oficiales y relevamientos vecinales, los hechos se incrementan los fines de semana y suelen involucrar a motochorros o grupos que aprovechan la salida de locales gastronómicos. Los reclamos apuntan a la necesidad de una mayor presencia policial a pie y patrulleros tanto en calles internas como en avenidas principales. Desde el Gobierno de la Ciudad señalan que se reforzarán los operativos en los corredores nocturnos del barrio y se trabajará en conjunto con las fiscalías para agilizar las denuncias.",
    image: "https://example.com/images/palermo-noche.jpg",
    topic: "Seguridad",
    bias: { left: 25, center: 50, right: 25 },
    sources: [
      {
        id: "tn_palermo_robos",
        source: "TN",
        title:
          "Preocupación en Palermo por aumento de robos a la salida de bares",
        description: "Vecinos piden más presencia policial.",
        url: "https://tn.com.ar/sociedad/robos-palermo-noches",
        image: "https://example.com/images/tn-palermo.jpg",
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
    summary:
      "El Gobierno porteño presentó un nuevo parque lineal en la zona sur de la Ciudad, con circuitos peatonales, bicisendas y áreas de juego. El objetivo es ampliar la superficie de espacios verdes y mejorar la integración urbana en barrios históricamente postergados.",
    bullets: [
      "El parque lineal se extenderá a lo largo de ex terrenos ferroviarios.",
      "Incluye bicisendas, juegos para chicos y mobiliario urbano.",
      "Vecinos valoran el proyecto pero piden garantizar mantenimiento y seguridad.",
      "Organizaciones barriales cuestionan el proceso de consulta previa.",
    ],
    body: "El Gobierno de la Ciudad de Buenos Aires anunció la creación de un nuevo parque lineal en la zona sur, que se desarrollará sobre antiguos terrenos ferroviarios entre Barracas y Parque Patricios. El proyecto contempla la incorporación de bicisendas, senderos peatonales, áreas de juego y mobiliario urbano, con el objetivo de ampliar la superficie de espacios verdes accesibles para los vecinos. Desde el Ejecutivo porteño destacan que la iniciativa apunta a equilibrar la oferta de espacios públicos en relación con el norte de la Ciudad. Vecinos y organizaciones barriales reconocen el impacto positivo de sumar verde, pero señalan la necesidad de garantizar mantenimiento, iluminación y seguridad en la zona, así como una mayor participación en el diseño final.",
    image: "https://example.com/images/parque-lineal-sur.jpg",
    topic: "Gobierno de la Ciudad",
    bias: { left: 30, center: 55, right: 15 },
    sources: [
      {
        id: "ln_parque_lineal_sur",
        source: "La Nación",
        title: "La Ciudad proyecta un nuevo parque lineal en la zona sur",
        description: "El Gobierno porteño busca sumar espacios verdes.",
        url: "https://lanacion.com.ar/ciudad/parque-lineal-zona-sur",
        image: "https://example.com/images/ln-parque.jpg",
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
    summary:
      "Los gremios docentes de la provincia de Buenos Aires convocaron a un paro de 48 horas para la próxima semana tras considerar insuficiente la última oferta salarial del gobierno provincial. La medida afectará a miles de escuelas en el conurbano y el interior.",
    bullets: [
      "Los sindicatos piden una recomposición que supere la inflación acumulada.",
      "El Gobierno bonaerense afirma que la propuesta es “fiscalmente posible”.",
      "Familias del conurbano expresan preocupación por la cantidad de días sin clases.",
      "Habrá una nueva reunión paritaria luego del paro.",
    ],
    body: "Los principales gremios docentes de la provincia de Buenos Aires convocaron a un paro de 48 horas para la próxima semana, luego de rechazar la última propuesta salarial del Gobierno encabezado por el gobernador bonaerense. Los sindicatos reclaman una recomposición que supere la inflación acumulada y advierten sobre el deterioro de los salarios frente al aumento del costo de vida. Desde la administración provincial sostienen que la oferta presentada es la máxima posible en el marco de la situación fiscal actual. La medida de fuerza afectará a miles de escuelas en el conurbano y en el interior de la provincia, generando preocupación entre las familias por la continuidad del ciclo lectivo. Tras el paro, las partes volverían a reunirse en una nueva mesa paritaria.",
    image: "https://example.com/images/docentes-paro-pba.jpg",
    topic: "Provincia de Buenos Aires",
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
    tags: ["Provincia de Buenos Aires", "Educación", "Paritaria docente"],
  },

  // 6) Servicios & Tarifas – muy relevante para AMBA
  {
    id: "cluster_luz_aumento_amba",
    createdAt: "2025-11-17T07:55:00Z",
    headline: "Aumentan hasta 12% las tarifas de luz en el AMBA desde enero",
    subtitle:
      "La suba impactará de forma escalonada según el nivel de consumo y el esquema de subsidios vigente.",
    summary:
      "El Ente Regulador anunció una actualización de hasta 12% en las tarifas de energía eléctrica para usuarios residenciales del AMBA a partir de enero. El aumento variará según el nivel de consumo y la categoría de subsidios, con mayor impacto en los hogares de ingresos medios.",
    bullets: [
      "La suba se aplicará en forma escalonada durante el primer trimestre.",
      "Los usuarios con mayor consumo verán los incrementos más altos.",
      "Organizaciones de consumidores cuestionan la falta de previsibilidad.",
      "El Gobierno argumenta que el ajuste es necesario para sostener el sistema energético.",
    ],
    body: "El organismo regulador de la energía informó una actualización de hasta el 12% en las tarifas eléctricas para usuarios residenciales del Área Metropolitana de Buenos Aires a partir de enero. La suba se aplicará de manera escalonada durante el primer trimestre del año y variará según el nivel de consumo y la categoría de subsidios que reciba cada hogar. Los usuarios con consumos más altos y menores niveles de subsidio serán los más afectados por el incremento. Asociaciones de consumidores cuestionaron la magnitud de la suba y advirtieron sobre la falta de previsibilidad para planificar gastos en un contexto de alta inflación. Desde el Gobierno sostienen que la actualización es necesaria para garantizar la sostenibilidad del sistema energético y reducir el peso de los subsidios en las cuentas públicas.",
    image: "https://example.com/images/medidor-luz.jpg",
    topic: "Servicios & Tarifas",
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
];

export const MOCK_POPULAR_NEWS: PopularNewsTab = [
  { id: "norma", title: "Nueva norma para alquileres temporarios" },
  { id: "milei", title: "Milei en Rosario: mensajes a los gobernadores" },
  {
    id: "laboral",
    title: "Reforma laboral: qué cambia para los monotributistas",
  },
  { id: "normas", title: "Nueva norma para alquileres temporarios" },
  { id: "mileis", title: "Milei en Rosario: mensajes a los gobernadores" },
  {
    id: "laborals",
    title: "Reforma laboral: qué cambia para los monotributistas",
  },
];
