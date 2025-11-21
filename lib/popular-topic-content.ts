import { PopularTopicPageContent } from "@/lib/types";

export const POPULAR_TOPIC_PAGES: Record<
  string,
  PopularTopicPageContent
> = {
  keyword_precios_inflacion: {
    id: "keyword_precios_inflacion",
    slug: "keyword_precios_inflacion",
    title: "Precios e Inflación",
    targetTopic: "Economía",
    heroKicker: "Pulso del consumo",
    heroDescription:
      "Seguimos cada ajuste de precios relevantes para el AMBA para explicar qué empuja el costo de vida y cómo se traslada a salarios, alquileres y servicios.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 08:15",
    heroInsight:
      "La desaceleración del último dato oficial no llegó al changuito: los alimentos frescos siguen marcando la agenda y tensionan la temporada alta.",
    narrative: [
      {
        title: "Lo último",
        description:
          "Supermercados mayoristas volvieron a remarcar un 4% promedio en productos de limpieza y bebidas para cubrir costos logísticos.",
      },
      {
        title: "Impacto en familias",
        description:
          "Los alquileres con fórmula UVA subirán 9,7% en diciembre y el gasto en expensas se acerca al 30% del ingreso medio.",
      },
      {
        title: "Qué mira el mercado",
        description:
          "Consultoras privadas proyectan un 7,6% para noviembre impulsado por tarifas y combustibles, aunque moderado por desaceleración del consumo.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Cuánto más pagaremos por alimentos frescos?",
        detail:
          "Las verdulerías del AMBA trasladan cada martes las listas del Mercado Central: tomate y papa volvieron a subir dos dígitos; compartimos el promedio semanal para planificar compras.",
      },
      {
        title: "¿Cuándo activan las paritarias que faltan?",
        detail:
          "Los gremios de comercio y estatales negocian revisiones bimensuales; detallamos fechas para cobrar retroactivos y qué porcentaje cubrirá la inflación proyectada.",
      },
      {
        title: "¿Se puede anticipar el salto de alquileres y expensas?",
        detail:
          "Las cuotas indexadas por UVA y los ajustes de consorcios se calculan con datos del INDEC publicados el 15 de cada mes; explicamos cómo estimar el nuevo monto y renegociar.",
      },
    ],
    watchlist: [
      {
        label: "Paritarias comercio",
        description:
          "Los sindicatos presionan por ajustes bimensuales que podrían volcarse rápidamente a góndola.",
        impact: "Salarios vs. inflación",
      },
      {
        label: "Alquileres UVA",
        description:
          "El nuevo índice combina inflación y salarios; cada salto mensual condiciona a 200 mil contratos en AMBA.",
        impact: "Costo de vivienda",
      },
      {
        label: "Canasta escolar 2026",
        description:
          "Proveedores anticipan aumentos de dos dígitos antes de febrero y los gobiernos porteño y bonaerense evalúan acuerdos.",
        impact: "Gasto familiar temprano",
      },
    ],
    quickFacts: [
      {
        label: "Inflación mensual",
        value: "8,1%",
        helper: "INDEC octubre",
        trend: "down",
        tone: "positive",
      },
      {
        label: "Alimentos frescos",
        value: "+12,4%",
        helper: "Mercados concentradores",
        trend: "up",
        tone: "negative",
      },
      {
        label: "Expectativa REM",
        value: "7,6%",
        helper: "Promedio consultoras",
        trend: "stable",
        tone: "neutral",
      },
    ],
    actionCard: {
      title: "Dato a seguir",
      description:
        "El REM del BCRA se publica el viernes con señales sobre el descongelamiento de tarifas y salarios estatales.",
      actionLabel: "Ver cronograma del REM",
      actionHref:
        "https://www.bcra.gob.ar/PublicacionesEstadisticas/ExpectativasMercado.asp",
    },
    playbooks: [
      {
        title: "Blindar márgenes",
        audience: "PyMEs alimentos",
        description:
          "Escalonar listas cada 21 días y revisar promos digitales evita remarcaciones traumáticas.",
      },
      {
        title: "Ingresos familiares",
        audience: "Hogares AMBA",
        description:
          "Armar previsiones trimestrales con servicios incluidos permite negociar paritarias o changas con datos.",
      },
      {
        title: "Datos oficiales",
        audience: "Funcionarios",
        description:
          "Cruzar precios mayoristas + consumo eléctrico adelanta la presión inflacionaria local.",
      },
    ],
    qas: [
      {
        question: "¿Por qué los alimentos suben más que el resto?",
        answer:
          "La cadena de frescos depende de combustibles y frío. Con tarifas y logística más caras, cada tramo agrega sobrecostos y poca competencia.",
      },
      {
        question: "¿Sirve seguir con acuerdos de precios?",
        answer:
          "Funcionan como ancla comunicacional. Los grandes players cumplen sólo mientras reciben beneficios impositivos o prioridad en importaciones.",
      },
      {
        question: "¿Cuándo impactan las paritarias en la inflación?",
        answer:
          "Entre 30 y 45 días después del acuerdo: comercios recalculan nómina completa y normalizan nuevos costos.",
      },
    ],
  },
  keyword_dolar_hoy: {
    id: "keyword_dolar_hoy",
    slug: "keyword_dolar_hoy",
    title: "Dólar Hoy",
    targetTopic: "Economía",
    heroKicker: "Mercado cambiario",
    heroDescription:
      "Cobertura minuto a minuto de las distintas cotizaciones y decisiones oficiales que mueven a importadores, ahorristas y City porteña.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 10:00",
    heroInsight:
      "La brecha se estabiliza debajo del 35% pero los pagos de importaciones atrasados siguen conteniendo la oferta real de billetes.",
    narrative: [
      {
        title: "Oficial",
        description:
          "El crawling-peg desacelera al 2% mensual para evitar impacto en tarifas mientras se negocia con el FMI.",
      },
      {
        title: "Financieros",
        description:
          "El MEP quedó como referencia para empresas luego de las últimas restricciones al contado con liquidación.",
      },
      {
        title: "Blue",
        description:
          "Cuevas reportan menor demanda minorista; el driver hoy son pagos en efectivo de proveedores de tecnología.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Cuál es el mejor dólar para ahorrar o pagar viajes?",
        detail:
          "Comparamos MEP, tarjeta y blue incluyendo comisiones bancarias y límites diarios para saber dónde rinde más cada operación.",
      },
      {
        title: "¿Habrá dólares para importaciones chicas?",
        detail:
          "Publicamos el calendario del BOPREAL y cupos para pymes; si tu SIRA demora más de 90 días te contamos qué bancos están habilitando ventanillas especiales.",
      },
      {
        title: "¿Cómo afecta la brecha a precios locales?",
        detail:
          "Cada 5 puntos de brecha se refleja en electrónicos y repuestos a los 20 días; te ayudamos a estimar si conviene adelantar compras.",
      },
    ],
    watchlist: [
      {
        label: "Liquidación agro",
        description:
          "Si cae el volumen, el BCRA pierde poder de fuego para contener la brecha durante diciembre.",
        impact: "Reservas",
      },
      {
        label: "Calendario BOPREAL",
        description:
          "Las nuevas series definen cuántos importadores migran deuda y liberan presión sobre el MEP.",
        impact: "Pasivos privados",
      },
      {
        label: "FMI + Tesoro",
        description:
          "Un desembolso extraordinario cerraría el año con colchón monetario y reduce la expectativa de devaluación brusca.",
        impact: "Confianza inversores",
      },
    ],
    quickFacts: [
      {
        label: "Oficial mayorista",
        value: "$960",
        helper: "Comunicación BCRA",
        trend: "up",
        tone: "neutral",
      },
      {
        label: "Blue",
        value: "$1.250",
        helper: "City porteña",
        trend: "stable",
        tone: "neutral",
      },
      {
        label: "Brecha",
        value: "30%",
        helper: "vs. mayorista",
        trend: "down",
        tone: "positive",
      },
    ],
    actionCard: {
      title: "Próxima señal",
      description:
        "Hacienda licita deuda en pesos el miércoles. Si renueva 120% dará aire al BCRA para sostener intervenciones.",
      actionLabel: "Ver calendario",
      actionHref: "https://www.argentina.gob.ar/economia/finanzas/deuda",
    },
    playbooks: [
      {
        title: "Cobertura PyME",
        audience: "Importadores",
        description:
          "Usar MEP escalonado por ventanillas bancarias reduce el costo efectivo vs. blue.",
      },
      {
        title: "Caja en dólares",
        audience: "Servicios",
        description:
          "Facturar exportaciones de conocimiento vía CCL mixto asegura acceso a un 20% adicional en pesos.",
      },
      {
        title: "Turismo",
        audience: "Consumidor",
        description:
          "El dólar tarjeta mantiene mejor cotización que el blue y permite cuotas sin interés seleccionadas.",
      },
    ],
    qas: [
      {
        question: "¿Puede el oficial pegar un salto?",
        answer:
          "El Gobierno busca unificar gradualmente. Un salto brusco sólo ocurriría si se corta el financiamiento y caen las reservas.",
      },
      {
        question: "¿Conviene comprar dólar MEP ahora?",
        answer:
          "Mientras la brecha sea menor al 40% el MEP luce competitivo para cobertura de corto plazo. Evaluá costos operativos.",
      },
      {
        question: "¿Qué pasa con los importadores chicos?",
        answer:
          "Tienen cupos más cortos y dependen del BOPREAL. Quienes no entren deberán financiarse a tasa alta en pesos.",
      },
    ],
  },
  keyword_tarifas_servicios: {
    id: "keyword_tarifas_servicios",
    slug: "keyword_tarifas_servicios",
    title: "Tarifas y Servicios",
    targetTopic: "Economía",
    heroKicker: "Servicios públicos",
    heroDescription:
      "Cobertura coordinada de luz, gas, agua, transporte y telecomunicaciones para entender cómo impactan los ajustes en hogares y PyMEs.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 07:45",
    heroInsight:
      "El descongelamiento viene por tandas: Edenor y Edesur piden subas de entre 15% y 25% desde diciembre mientras Nación ordena segmentar mejor.",
    narrative: [
      {
        title: "Electricidad",
        description:
          "El ENRE habilita audiencias para actualizar costos de distribución en AMBA; la tarifa social seguirá con subsidio pleno.",
      },
      {
        title: "Gas",
        description:
          "Productoras reclaman actualizar el precio del PIST tras la licitación del Gasoducto Néstor Kirchner.",
      },
      {
        title: "Servicios digitales",
        description:
          "Cableoperadores coordinan aumentos del 11% y unifican paquetes para sostener inversiones en fibra.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Cuánto vendrá en la próxima boleta?",
        detail:
          "Simulamos facturas reales según consumo y categoría para saber el impacto antes de que llegue la boleta y evitar sorpresas en el hogar o negocio.",
      },
      {
        title: "¿Pierdo subsidios si mejoró mi ingreso?",
        detail:
          "Explicamos los cruces de datos del RASE y SUBE: qué ingresos tope se controlan y cómo recategorizarse sin quedar fuera de tarifa social.",
      },
      {
        title: "¿Conviene adherir a planes de eficiencia?",
        detail:
          "Las distribuidoras ofrecen descuentos por pagar con débito o bajar el consumo en hora pico; indicamos requisitos y cuánto podrías ahorrar.",
      },
    ],
    watchlist: [
      {
        label: "Segmentación Sube",
        description:
          "Se revalidan los ingresos declarados; quienes superen el tope pierden subsidio pleno desde enero.",
        impact: "Boletos urbanos",
      },
      {
        label: "Plan de pagos Edesur",
        description:
          "El regulador busca normalizar deudas con distribuidoras para evitar cortes de inversión.",
        impact: "Calidad del servicio",
      },
      {
        label: "Tarifa social agua",
        description:
          "AySA redefine criterios georreferenciados para sumar barrios que hoy pagan tarifa plena.",
        impact: "Hogares vulnerables",
      },
    ],
    quickFacts: [
      {
        label: "Luz (R1)",
        value: "+18%",
        helper: "Propuesta Edenor",
        trend: "up",
        tone: "negative",
      },
      {
        label: "Gas residencial",
        value: "+14%",
        helper: "En discusión",
        trend: "up",
        tone: "negative",
      },
      {
        label: "SUBE mínima",
        value: "$350",
        helper: "Expte CNRT",
        trend: "stable",
        tone: "neutral",
      },
    ],
    actionCard: {
      title: "Agenda regulatoria",
      description:
        "Las audiencias públicas de electricidad serán la primera semana de diciembre. Hay lugar para reclamos y propuestas.",
      actionLabel: "Inscribirse",
      actionHref: "https://www.argentina.gob.ar/enre",
    },
    playbooks: [
      {
        title: "Consumo inteligente",
        audience: "Hogares",
        description:
          "Medir picos con apps gratuitas y trasladar electrodomésticos a horarios valle baja hasta 15% la factura.",
      },
      {
        title: "Tarifa PyME",
        audience: "Industria liviana",
        description:
          "Consolidar suministros en contratos únicos evita cargos extra y mejora la planificación financiera.",
      },
      {
        title: "Gobiernos locales",
        audience: "Municipios",
        description:
          "Coordinar bancos de transformadores y alumbrado LED reduce consumo y mejora percepción ciudadana.",
      },
    ],
    qas: [
      {
        question: "¿Se pueden frenar subas con amparos?",
        answer:
          "Sólo cuando la autoridad no realiza audiencia o aplica criterios discriminatorios. Con audiencias abiertas, prosperan poco.",
      },
      {
        question: "¿Conviene pasarse a tarifa social?",
        answer:
          "Si cumplís con los requisitos conviene actualizar datos: la quita automática llega cuando AFIP detecta inconsistencias.",
      },
      {
        question: "¿Qué pasa con el gasoducto?",
        answer:
          "La ampliación permite más gas barato, pero sin actualización tarifaria las distribuidoras no pueden invertir en redes.",
      },
    ],
  },
  keyword_inseguridad: {
    id: "keyword_inseguridad",
    slug: "keyword_inseguridad",
    title: "Inseguridad",
    targetTopic: "Política y Gobierno",
    heroKicker: "Seguridad urbana",
    heroDescription:
      "Mapeamos delitos, operativos y decisiones judiciales que afectan la percepción de seguridad en los barrios del AMBA.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 09:40",
    heroInsight:
      "Las denuncias nocturnas en polos gastronómicos crecieron 23% y la policía promete refuerzos, pero los vecinos reclaman coordinación Fiscalía+Comuna.",
    narrative: [
      {
        title: "Patrullajes",
        description:
          "El Gobierno porteño redistribuye móviles y suma drones en corredores nocturnos.",
      },
      {
        title: "Justicia",
        description:
          "Las fiscalías de Flagrancia aceleran causas pero siguen colapsadas por robos menores.",
      },
      {
        title: "Prevención",
        description:
          "Los municipios del conurbano refuerzan centros de monitoreo con inteligencia artificial para detectar motos sin patente.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Dónde se concentran los robos ahora?",
        detail:
          "Mapa semanal con zonas calientes por franja horaria: Palermo, Lanús y Morón suman más denuncias nocturnas; te mostramos los corredores a evitar.",
      },
      {
        title: "¿Cuánto tarda en llegar un patrullero?",
        detail:
          "El 911 porteño promete 7 minutos pero de noche se estira a 10; detallamos cómo escalar reclamos y registrar demoras para tu cuadra.",
      },
      {
        title: "¿Cómo denuncio sin ir a la comisaría?",
        detail:
          "Guía paso a paso para denunciar online o por WhatsApp según vivas en CABA o Provincia, incluyendo qué datos pedirán y cómo seguir la causa.",
      },
    ],
    watchlist: [
      {
        label: "Delitos en motos",
        description:
          "Las ordenanzas de doble patente avanzan lento; sólo 7 comunas las controlan de forma sostenida.",
        impact: "Robos express",
      },
      {
        label: "Iluminación pública",
        description:
          "Los barrios con luminarias LED registran 15% menos de robos según datos de la Ciudad.",
        impact: "Prevención barrial",
      },
      {
        label: "Política de armas",
        description:
          "Nación vuelve a licitar el plan de desarme voluntario para quitar pistolas sin papeles.",
        impact: "Violencia",
      },
    ],
    quickFacts: [
      {
        label: "Robos denunciados",
        value: "+9%",
        helper: "SEP 24 vs. ago.",
        trend: "up",
        tone: "negative",
      },
      {
        label: "Tiempo respuesta 911",
        value: "7 min",
        helper: "Promedio CABA",
        trend: "stable",
        tone: "neutral",
      },
      {
        label: "Operativos motochorros",
        value: "16",
        helper: "semana actual",
        trend: "up",
        tone: "positive",
      },
    ],
    actionCard: {
      title: "Cómo participar",
      description:
        "Los Consejos de Seguridad Barrial se reúnen cada mes y definen prioridades con comisarías y comunas.",
      actionLabel: "Chequear agenda",
      actionHref: "https://www.buenosaires.gob.ar/seguridad",
    },
    playbooks: [
      {
        title: "Comercios seguros",
        audience: "Locales nocturnos",
        description:
          "Instalar domos conectados a Monitoreo permite respuesta más rápida en cierres de caja.",
      },
      {
        title: "Corredores escolares",
        audience: "Comunidades educativas",
        description:
          "Mapear puntos ciegos y ajustar horarios de cadetes reduce arrebatos en entradas y salidas.",
      },
      {
        title: "Aliados vecinales",
        audience: "Consorcios",
        description:
          "Integrar cámaras privadas a la red oficial suma evidencia judicial y evita duplicar obras.",
      },
    ],
    qas: [
      {
        question: "¿Sirven los senderos seguros?",
        answer:
          "Cuando se sostienen 90 días reducen los delitos de oportunidad. El problema es la rotación de personal.",
      },
      {
        question: "¿Qué municipios tienen mejor desempeño?",
        answer:
          "Tres de Febrero, Lanús y Vicente López combinan centros de monitoreo + botones antipánico con buenos resultados.",
      },
      {
        question: "¿Cómo se denuncia rápido?",
        answer:
          "La app 911 BA permite adjuntar foto y geolocalización. En Provincia, WhatsApp 112772-7070 acelera la toma de datos.",
      },
    ],
  },
  keyword_caba: {
    id: "keyword_caba",
    slug: "keyword_caba",
    title: "CABA",
    targetTopic: "Política y Gobierno",
    heroKicker: "Gestión porteña",
    heroDescription:
      "Seguimos decisiones de la Ciudad que afectan transporte, espacio público, educación y tributos para residentes y visitantes.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 08:30",
    heroInsight:
      "El gobierno porteño acelera obras en la zona sur y ajusta el presupuesto 2026 con foco en seguridad, mantenimiento escolar y arbolado.",
    narrative: [
      {
        title: "Obras",
        description:
          "Se licita un nuevo parque lineal en Barracas que conectará con Parque Patricios mediante ciclovías y veredas anchas.",
      },
      {
        title: "Educación",
        description:
          "Las paritarias docentes se reabren con cláusula gatillo trimestral y plan de titularizaciones.",
      },
      {
        title: "Tributos",
        description:
          "Ingresos Brutos se mantiene congelado para PyMEs hasta marzo, pero se actualiza ABL por inflación real.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Subirá el ABL o patentes en mi barrio?",
        detail:
          "Publicamos cuánto aumentará cada comuna según valuación fiscal para que calcules el próximo débito automático.",
      },
      {
        title: "¿Dónde se concentran las obras y cortes?",
        detail:
          "El plan anual prioriza zona sur y ejes de Metrobús; armamos un calendario barrial para saber cuándo habrá desvíos o ruido cerca.",
      },
      {
        title: "¿Cómo acceder a vacantes y becas?",
        detail:
          "Paso a paso para usar la inscripción online y las becas de primera infancia y nivel medio, con fechas límite y teléfonos útiles.",
      },
    ],
    watchlist: [
      {
        label: "Parque de la Innovación",
        description:
          "La venta de parcelas define cuánto financiamiento habrá para nuevas escuelas técnicas.",
        impact: "Educación + desarrollo",
      },
      {
        label: "Plan verde sur",
        description:
          "El ministerio de Espacio Público busca sumar 30 hectáreas nuevas y bajar la desigualdad con el norte.",
        impact: "Calidad de vida",
      },
      {
        label: "Presupuesto 2026",
        description:
          "La Legislatura vota un presupuesto austero con prioridad en seguridad, salud mental y mantenimiento urbano.",
        impact: "Servicios porteños",
      },
    ],
    quickFacts: [
      {
        label: "ABL",
        value: "+7,5%",
        helper: "Ajuste diciembre",
        trend: "up",
        tone: "negative",
      },
      {
        label: "Obras en ejecución",
        value: "312",
        helper: "Infraestructura porteña",
        trend: "stable",
        tone: "neutral",
      },
      {
        label: "Vacantes inicial",
        value: "95%",
        helper: "Preinscripción",
        trend: "up",
        tone: "positive",
      },
    ],
    actionCard: {
      title: "Participación ciudadana",
      description:
        "Los foros BA Elige vuelven en diciembre con presupuesto para plazas, bicisendas y cultura barrial.",
      actionLabel: "Proponer proyectos",
      actionHref: "https://baelige.buenosaires.gob.ar",
    },
    playbooks: [
      {
        title: "Consorcios",
        audience: "Administradores",
        description:
          "Solicitar podas y veredas vía BOTI ahora tarda 7 días promedio; aprovecha la ventana antes del verano.",
      },
      {
        title: "Empleo joven",
        audience: "Startups",
        description:
          "El programa Formación + Empleo subsidia hasta el 30% del salario para primeras contrataciones.",
      },
      {
        title: "Comercios barriales",
        audience: "Retail",
        description:
          "Las ferias de la economía barrial suman 12 nuevos corredores; anotarse asegura visibilidad sin costo.",
      },
    ],
    qas: [
      {
        question: "¿Habrá más aumentos de impuestos?",
        answer:
          "Solo se actualiza ABL por inflación real. El resto de los tributos se mantiene congelado, aunque se evalúan tasas ambientales.",
      },
      {
        question: "¿Qué pasa con la seguridad?",
        answer:
          "Se suman 2.000 agentes a los barrios del sur y un nuevo centro de monitoreo en Lugano.",
      },
      {
        question: "¿Cómo pedir obras en mi barrio?",
        answer:
          "BOTI canaliza pedidos menores y los Consejos Consultivos de Comuna elevan obras mayores al Ministerio.",
      },
    ],
  },
  keyword_buenos_aires_pba: {
    id: "keyword_buenos_aires_pba",
    slug: "keyword_buenos_aires_pba",
    title: "Buenos Aires (PBA)",
    targetTopic: "Política y Gobierno",
    heroKicker: "Provincia",
    heroDescription:
      "Seguimiento de educación, salud, seguridad y obras provinciales que pegan de lleno en el conurbano y ciudades del interior.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 09:10",
    heroInsight:
      "La Provincia busca financiamiento externo para sostener obra pública mientras negocia paritarias docentes y de salud.",
    narrative: [
      {
        title: "Educación",
        description:
          "Se planifica un calendario escolar con jornadas extendidas y foco en matemáticas y oficios digitales.",
      },
      {
        title: "Salud",
        description:
          "Hospitales provinciales reciben equipamiento de alta complejidad y se refuerzan guardias pediátricas.",
      },
      {
        title: "Obra pública",
        description:
          "Vialidad avanza con la Ruta 6 y canalizaciones en el Gran La Plata para mitigar inundaciones.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Cómo quedan las paritarias docentes y de salud?",
        detail:
          "Desglosamos las cuotas mensuales ofrecidas y qué porcentaje cubre la inflación prevista para que planifiques tu bolsillo.",
      },
      {
        title: "¿Qué obras llegan a mi municipio?",
        detail:
          "Listamos los proyectos del FIM e infraestructura hidráulica comuna por comuna para seguir cómo impactará en inundaciones y tránsito.",
      },
      {
        title: "¿Qué programas sociales continúan?",
        detail:
          "Cuenta DNI, Tarjeta Alimentar y becas estudiantiles tienen nuevos montos y fechas; te mostramos requisitos actualizados.",
      },
    ],
    watchlist: [
      {
        label: "Paritarias 2026",
        description:
          "El gobierno ofrece ajustes mensuales atados a la recaudación real. Los gremios piden cláusula gatillo automática.",
        impact: "Gasto salarial",
      },
      {
        label: "Fondo del Conurbano",
        description:
          "Kicillof reclama actualizar el coeficiente para compensar el atraso respecto de la inflación.",
        impact: "Ingresos provinciales",
      },
      {
        label: "Plan integral de rutas",
        description:
          "Las licitaciones definen qué tramos reciben prioridad en 2026 y cómo se coordina con Nación.",
        impact: "Logística",
      },
    ],
    quickFacts: [
      {
        label: "Recaudación propia",
        value: "+5,2% real",
        helper: "octubre vs. 2023",
        trend: "up",
        tone: "positive",
      },
      {
        label: "Paritarias docentes",
        value: "+10%",
        helper: "oferta noviembre",
        trend: "up",
        tone: "negative",
      },
      {
        label: "Obras activas",
        value: "512",
        helper: "Infraestructura",
        trend: "stable",
        tone: "neutral",
      },
    ],
    actionCard: {
      title: "Fondos municipales",
      description:
        "Se abre la ventanilla del Fondo de Infraestructura Municipal (FIM) para proyectos 2026.",
      actionLabel: "Consultar requisitos",
      actionHref: "https://www.gba.gob.ar",
    },
    playbooks: [
      {
        title: "Municipios",
        audience: "Gestión local",
        description:
          "Priorizar obras hidráulicas con cofinanciamiento nacional mejora la aprobación vecinal.",
      },
      {
        title: "Industria",
        audience: "Parques",
        description:
          "Acceder a créditos blandos del BAPRO para energía distribuida baja costos en un 20%.",
      },
      {
        title: "Docentes",
        audience: "Educación",
        description:
          "Participar en los foros de rediseño curricular asegura recursos para talleres específicos.",
      },
    ],
    qas: [
      {
        question: "¿La Provincia puede endeudarse en dólares?",
        answer:
          "Sí, pero necesita aval nacional. Se prioriza endeudamiento con organismos para obra pública crítica.",
      },
      {
        question: "¿Se vienen aumentos de impuestos?",
        answer:
          "Ingresos Brutos se ajustará por inflación pero sin cambios de alícuotas para PyMEs. Sí habrá subas en inmobiliario rural.",
      },
      {
        question: "¿Qué programas sociales siguen?",
        answer:
          "Tarjeta Alimentar y Cuenta DNI siguen como anclas de consumo. Se evalúa integrar refuerzos escolares con municipios.",
      },
    ],
  },
  keyword_javier_milei: {
    id: "keyword_javier_milei",
    slug: "keyword_javier_milei",
    title: "Javier Milei",
    targetTopic: "Política y Gobierno",
    heroKicker: "Gobierno nacional",
    heroDescription:
      "Cobertura de decisiones presidenciales, negociaciones con el Congreso y reacciones internacionales que marcan el rumbo del país.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 11:05",
    heroInsight:
      "Casa Rosada busca apoyo legislativo para el nuevo paquete de reformas mientras negocia desembolsos externos.",
    narrative: [
      {
        title: "Agenda legislativa",
        description:
          "El oficialismo insiste con reforma laboral acotada y simplificación tributaria para sesiones extraordinarias.",
      },
      {
        title: "Relación internacional",
        description:
          "Gira relámpago a Washington para consolidar apoyo financiero y atraer inversiones en energía.",
      },
      {
        title: "Frente interno",
        description:
          "Se reacomoda el gabinete económico tras la salida de dos secretarios clave.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Qué reformas pueden cambiar mi trabajo o impuestos?",
        detail:
          "Detallamos los capítulos de la Ley Ómnibus 2.0 que tocan indemnizaciones, monotributo y retenciones para saber si tu sector gana o pierde.",
      },
      {
        title: "¿Cómo afectan las decisiones al dólar y a precios?",
        detail:
          "Cada anuncio fiscal impacta en la brecha y los combustibles; explicamos qué medida moverá la aguja en el corto plazo.",
      },
      {
        title: "¿Se sostendrá el ajuste sin recortar servicios?",
        detail:
          "Monitoreamos transferencias a provincias, universidades y PAMI para anticipar dónde podría sentirse el recorte.",
      },
    ],
    watchlist: [
      {
        label: "Ley Ómnibus 2.0",
        description:
          "Los gobernadores piden coparticipar recursos mientras el Ejecutivo negocia con bloques dialoguistas.",
        impact: "Clima político",
      },
      {
        label: "Acuerdos FMI",
        description:
          "El staff técnico exige cumplir metas fiscales y de reservas antes de girar nuevos fondos.",
        impact: "Estabilidad macro",
      },
      {
        label: "Reforma laboral",
        description:
          "El capítulo PyME generará resistencia sindical; se evalúan incentivos a blanqueo.",
        impact: "Mercado de trabajo",
      },
    ],
    quickFacts: [
      {
        label: "Aprobación urbana",
        value: "48%",
        helper: "Encuesta semanal",
        trend: "down",
        tone: "negative",
      },
      {
        label: "Tipo de cambio real",
        value: "-12%",
        helper: "vs. dic 23",
        trend: "down",
        tone: "negative",
      },
      {
        label: "Reservas netas",
        value: "US$ 5.100M",
        helper: "BCRA",
        trend: "up",
        tone: "positive",
      },
    ],
    actionCard: {
      title: "Lo próximo",
      description:
        "En diez días se presenta el plan de modernización del Estado con posibles fusiones de ministerios.",
      actionLabel: "Leer borrador",
      actionHref: "https://www.argentina.gob.ar/jefatura",
    },
    playbooks: [
      {
        title: "Dialogar con Nación",
        audience: "Gobernadores",
        description:
          "El Ejecutivo prioriza obras energéticas. Llevar proyectos con repago en dólares mejora la negociación.",
      },
      {
        title: "Inversores",
        audience: "Fondos",
        description:
          "Los bonos globales necesitan señales fiscales claras y un sendero creíble de reformas.",
      },
      {
        title: "Clase media",
        audience: "Ciudadanía",
        description:
          "Monitorear anuncios por áreas: educación, salud y seguridad cambian por decreto frecuentemente.",
      },
    ],
    qas: [
      {
        question: "¿Tiene votos para aprobar reformas?",
        answer:
          "Depende de acuerdos con bloques provinciales. El oficialismo negocia artículo por artículo para llegar a mayorías simples.",
      },
      {
        question: "¿Qué pasa con el ajuste fiscal?",
        answer:
          "Se mantiene el superávit primario vía recorte de obra pública y transferencias, aunque se desacelera con la baja de ingresos.",
      },
      {
        question: "¿Habrá devaluación?",
        answer:
          "El equipo económico insiste con crawling-peg. Sólo un shock externo o pérdida de reservas aceleraría el ritmo.",
      },
    ],
  },
  keyword_nuevas_medidas: {
    id: "keyword_nuevas_medidas",
    slug: "keyword_nuevas_medidas",
    title: "Nuevas Medidas",
    targetTopic: "Política y Gobierno",
    heroKicker: "Boletín oficial",
    heroDescription:
      "Seguimos decretos, resoluciones y disposiciones express que cambian reglas para comercios, impuestos y servicios en el AMBA.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 12:10",
    heroInsight:
      "El Ejecutivo acelera decisiones administrativas para cerrar el año: mientras Economía define el ajuste 2026, la Jefatura publica resoluciones que impactan en subsidios, transporte y trámites digitales.",
    narrative: [
      {
        title: "Decretos clave",
        description:
          "Se oficializó la segmentación fina de subsidios y se prorrogó la emergencia ferroviaria.",
      },
      {
        title: "Resoluciones express",
        description:
          "Nuevas reglas del BOPREAL y el pago escalonado a proveedores salieron en menos de 72 horas.",
      },
      {
        title: "Deja-vu legislativo",
        description:
          "Se prepara un paquete de DNUs para reorganizar ministerios si el Congreso no trata la ley ómnibus 2.0.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Cuándo entran en vigencia las medidas?",
        detail:
          "Explicamos los plazos de cada decreto y desde cuándo impactan tarifas, percepciones o nuevos trámites digitales.",
      },
      {
        title: "¿A quién afecta cada cambio?",
        detail:
          "Segmentamos por hogares, PyMEs y gobiernos locales para que puedas anticipar si el beneficio o recorte te alcanza.",
      },
      {
        title: "¿Dónde se publica la letra chica?",
        detail:
          "Curamos enlaces al Boletín Oficial y guías rápidas para interpretar anexos y cuadros tarifarios.",
      },
    ],
    watchlist: [
      {
        label: "Reforma administrativa",
        description:
          "Se viene un decreto que fusiona secretarías y traslada programas sociales a Desarrollo Humano.",
        impact: "Estructura estatal",
      },
      {
        label: "Segmentación SUBE",
        description:
          "Transportes definirá en los próximos días cómo validar ingresos para conservar subsidios.",
        impact: "Tarifas urbanas",
      },
      {
        label: "Digitalización de multas",
        description:
          "AUSA y Vialidad coordinan la implementación de tickets digitales también en rutas bonaerenses.",
        impact: "Contribuyentes",
      },
    ],
    quickFacts: [
      {
        label: "Decretos publicados",
        value: "6",
        helper: "últimos 10 días",
        trend: "up",
        tone: "neutral",
      },
      {
        label: "Resoluciones en consulta",
        value: "12",
        helper: "Ministerios clave",
        trend: "stable",
        tone: "neutral",
      },
      {
        label: "Medidas suspendidas",
        value: "2",
        helper: "por cautelares",
        trend: "down",
        tone: "positive",
      },
    ],
    actionCard: {
      title: "Próxima definición",
      description:
        "Casa Rosada definirá esta semana qué medidas ingresan al paquete de DNUs y cuáles esperan al Congreso.",
      actionLabel: "Revisar agenda legislativa",
      actionHref: "https://www.boletinoficial.gob.ar/seccion/primera",
    },
    playbooks: [
      {
        title: "Lectura rápida",
        audience: "Analistas",
        description:
          "Usá alertas del Boletín Oficial y filtros por organismo para detectar cambios sin esperar a la conferencia.",
      },
      {
        title: "Acción inmediata",
        audience: "PyMEs",
        description:
          "Anotá fechas de vigencia y adaptá precios o contratos antes de que la competencia se ajuste.",
      },
      {
        title: "Narrativa ciudadana",
        audience: "Medios barriales",
        description:
          "Traducí el lenguaje jurídico con ejemplos cotidianos y checklists para trámites.",
      },
    ],
    qas: [
      {
        question: "¿Cómo sé si una medida ya está vigente?",
        answer:
          "Siempre revisá la fecha de publicación y el artículo final de entrada en vigencia; algunos decretos rigen al día siguiente y otros tras reglamentación.",
      },
      {
        question: "¿Puedo impugnar una resolución?",
        answer:
          "Sí. Organizaciones pueden presentar recursos administrativos en 10 días hábiles y luego ir a la Justicia con cautelares.",
      },
      {
        question: "¿Cambios por comunicado tienen validez?",
        answer:
          "No hasta que la norma se publique. Seguimos cada anuncio para confirmar si se convierte en decreto o resolución efectiva.",
      },
    ],
  },
  keyword_transporte_publico: {
    id: "keyword_transporte_publico",
    slug: "keyword_transporte_publico",
    title: "Transporte Público",
    targetTopic: "Política y Gobierno",
    heroKicker: "Movilidad",
    heroDescription:
      "Historias y datos sobre subte, trenes, colectivos y bici-infraestructura que condicionan la movilidad diaria en el AMBA.",
    heroUpdatedAt: "Actualizado 17 de noviembre · 06:55",
    heroInsight:
      "El subte suma aumento del 15% y los trenes metropolitanos renegocian subsidios mientras se avanza con el plan de buses eléctricos.",
    narrative: [
      {
        title: "Subte",
        description:
          "La tarifa pasará a $150 y se modernizan estaciones clave con accesibilidad total.",
      },
      {
        title: "Trenes",
        description:
          "ADIF licita mejoras de señalización en el Mitre y renovación de flota en el Belgrano Sur.",
      },
      {
        title: "Colectivos",
        description:
          "Las empresas advierten sobre costos de combustible mientras Nación exige SUBE nominalizada.",
      },
    ],
    audienceNeeds: [
      {
        title: "¿Cuánto costará viajar todos los días?",
        detail:
          "Calculamos el gasto mensual combinando subte + colectivos con SUBE nominalizada y descuentos multimodales.",
      },
      {
        title: "¿Qué líneas mejoran frecuencia?",
        detail:
          "Se renuevan flotas en el Mitre y nuevas unidades eléctricas en líneas del sur; detallamos cuándo verás cambios en hora pico.",
      },
      {
        title: "¿Cómo me afecta la SUBE personalizada?",
        detail:
          "Explicamos plazos, dónde registrarla y las sanciones si no lo hacés a tiempo, además de los beneficios extra que se habilitan.",
      },
    ],
    watchlist: [
      {
        label: "SUBE personalizada",
        description:
          "La obligatoriedad se implementa por etapas; sin personalización, se pierde el subsidio.",
        impact: "Usuarios frecuentes",
      },
      {
        label: "Plan de buses eléctricos",
        description:
          "La Ciudad licita los primeros 60 vehículos con prioridad en corredores del sur.",
        impact: "Contaminación urbana",
      },
      {
        label: "Revisión de subsidios",
        description:
          "Nación y Provincia negocian cómo repartir los costos de combustible y salarios.",
        impact: "Tarifa 2026",
      },
    ],
    quickFacts: [
      {
        label: "Tarifa SUBTE",
        value: "$150",
        helper: "desde 10/12",
        trend: "up",
        tone: "negative",
      },
      {
        label: "Puntualidad trenes",
        value: "82%",
        helper: "promedio AMBA",
        trend: "up",
        tone: "positive",
      },
      {
        label: "Validaciones SUBE",
        value: "9,3M",
        helper: "día hábil",
        trend: "stable",
        tone: "neutral",
      },
    ],
    actionCard: {
      title: "Qué cambia",
      description:
        "El Gobierno porteño abre consulta pública para definir dónde expandir bicisendas protegidas.",
      actionLabel: "Participar",
      actionHref: "https://www.buenosaires.gob.ar/movilidad",
    },
    playbooks: [
      {
        title: "Empresas de flota",
        audience: "Operadores",
        description:
          "Actualizar tableros de costos cada 15 días acelera la recepción de subsidios y evita paros nocturnos.",
      },
      {
        title: "Ciclistas urbanos",
        audience: "Usuarios",
        description:
          "Integrar bici + subte con bicicleteros seguros suma 20 minutos de ahorro promedio.",
      },
      {
        title: "Municipios",
        audience: "Conurbano",
        description:
          "Planificar carriles exclusivos reduce siniestros y mejora la puntualidad de líneas provinciales.",
      },
    ],
    qas: [
      {
        question: "¿Por qué vuelve a subir el subte?",
        answer:
          "La tarifa cubre sólo el 40% del costo operativo. Sin actualización, peligra el cronograma de mantenimiento.",
      },
      {
        question: "¿Se vienen más aumentos de colectivos?",
        answer:
          "Depende del acuerdo Nación-Provincia. Con el combustible subsidiado parcialmente, se espera una suba en febrero.",
      },
      {
        question: "¿Qué pasa con los trenes?",
        answer:
          "Las obras del Mitre y Roca apuntan a reducir fallas. El mayor cuello es la energía: se licitan subestaciones nuevas.",
      },
    ],
  },
};

export const getPopularTopicContent = (slug: string) =>
  POPULAR_TOPIC_PAGES[slug];
