/**
 * Build Italian marketing copy from a business.json record.
 * Never invents legal names or certifications.
 */

function fill(value, ctx) {
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (_, key) => (ctx[key] == null ? '' : String(ctx[key])))
  }
  if (Array.isArray(value)) return value.map((item) => fill(item, ctx))
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = fill(v, k === 'src' ? {} : ctx)
    return out
  }
  return value
}

function img(id, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
}

function formatReviews(n) {
  const raw = String(n || '').trim()
  if (!raw) return ''
  const num = Number(raw.replace(/\./g, '').replace(',', '.'))
  if (Number.isFinite(num)) return num.toLocaleString('it-IT')
  return raw
}

function shortName(nome) {
  const raw = String(nome || '').trim()
  if (!raw) return 'Attività locale'
  const cut = raw.split(/\s[–—-]\s|,/)[0].trim()
  if (cut.length >= 4 && cut.length <= 28) return cut
  if (raw.length > 36) return `${raw.slice(0, 34).trim()}…`
  return raw
}

function addressLine(b) {
  return [b.indirizzo, [b.cap, b.citta].filter(Boolean).join(' '), b.provincia ? `(${b.provincia})` : '']
    .filter(Boolean)
    .join(', ')
    .replace(/\s+,/g, ',')
}

const HOURS = {
  clinic: [
    { day: 'Lunedì – Venerdì', time: '09:00 – 13:00 · 16:00 – 19:30' },
    { day: 'Sabato', time: '09:00 – 13:00' },
    { day: 'Domenica', time: 'Chiuso · reperibili per urgenze in orario da confermare' },
  ],
  gelato: [
    { day: 'Lunedì', time: '15:00 – 23:00' },
    { day: 'Martedì – Domenica', time: '12:00 – 00:00' },
  ],
  restaurant: [
    { day: 'Lunedì', time: 'Chiuso' },
    { day: 'Martedì – Domenica', time: '12:30 – 15:00 · 19:30 – 23:00' },
  ],
  pastry: [
    { day: 'Lunedì', time: 'Chiuso' },
    { day: 'Martedì – Domenica', time: '07:30 – 13:30 · 16:30 – 20:30' },
  ],
  bar: [
    { day: 'Lunedì – Venerdì', time: '07:30 – 00:00' },
    { day: 'Sabato – Domenica', time: '08:30 – 01:00' },
  ],
  pub: [
    { day: 'Lunedì', time: 'Chiuso' },
    { day: 'Martedì – Giovedì', time: '18:00 – 00:30' },
    { day: 'Venerdì – Domenica', time: '18:00 – 01:30' },
  ],
  generic: [
    { day: 'Lunedì – Venerdì', time: '09:00 – 13:00 · 16:00 – 19:00' },
    { day: 'Sabato', time: '09:00 – 13:00' },
    { day: 'Domenica', time: 'Chiuso' },
  ],
}

const PACKS = {
  veterinaria: {
    seoTitle: 'Veterinario a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, ambulatorio veterinario a {citta}. Visite, vaccinazioni e assistenza per cani e gatti in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'Quando il tuo animale non sta bene, serve qualcuno che ascolti. Non solo che prescriva.',
    lead: 'In {indirizzo} a {citta} visitiamo cani e gatti con calma. Ti spieghiamo cosa vediamo, cosa serve ora e cosa può aspettare.',
    heroCaption: 'Visita in ambulatorio: tempo, ascolto e un piano chiaro da portare a casa.',
    heroAlt: 'Veterinario che visita un cane in ambulatorio',
    nav: [
      { id: 'servizi', label: 'Servizi' },
      { id: 'processo', label: 'Visita' },
      { id: 'consigli', label: 'Consigli' },
      { id: 'spazio', label: 'Studio' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Prenota una visita',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei prenotare una visita in ambulatorio a {citta}.',
    servicesTitle: 'Tutto quello che serve in ambulatorio, senza giri di parole.',
    services: [
      { title: 'Visita clinica', text: 'Controllo generale, ascolto dei sintomi e un piano di cura spiegato in italiano, non in sigle.' },
      { title: 'Vaccinazioni e profilassi', text: 'Calendario vaccinale, antiparassitari e richiami: ti diciamo cosa è dovuto e cosa può aspettare.' },
      { title: 'Cuccioli e prima visita', text: 'I primi mesi contano. Alimentazione, socializzazione e controlli senza fretta.' },
      { title: 'Microchip e documenti', text: 'Identificazione e pratiche di base per viaggi e registrazioni, quando serve.' },
      { title: 'Pelle, orecchie e allergie', text: 'Prurito, otiti e dermatiti sono il pane quotidiano: partiamo dalla visita, non dal prodotto a scaffale.' },
      { title: 'Ferite e medicazioni', text: 'Controlli dopo un incidente, punti, bendaggi e istruzioni per la casa.' },
      { title: 'Analisi di primo livello', text: 'Quando serve capire di più, facciamo gli esami in ambulatorio o ti indirizziamo al laboratorio.' },
      { title: 'Urgenze in orario', text: 'Se è grave, dillo subito al telefono: ti diciamo se venire adesso o se è il caso del pronto soccorso.' },
    ],
    processTitle: 'Come si svolge una visita, passo per passo.',
    processLead: 'Durata indicativa: 20–40 minuti, a seconda di cosa succede.',
    processMeta: [
      { label: 'Durata', value: 'Circa 20–40 minuti' },
      { label: 'Cosa portare', value: 'Libretto sanitario, terapie in corso e, se puoi, una foto o un video del problema.' },
    ],
    process: [
      { title: 'Ci racconti cosa succede', text: 'Quando è iniziato, cosa ha mangiato, se è già successo. Due minuti di contesto valgono più di dieci di ipotesi.' },
      { title: 'Visita e, se serve, esami', text: 'Guardiamo, ascoltiamo, palpiamo. Gli esami si fanno se servono a decidere, non per abitudine.' },
      { title: 'Ti spieghiamo le opzioni', text: 'Cosa è urgente, cosa può aspettare, quanto costa all’incirca. Decidi tu, informato.' },
      { title: 'Piano a casa e controlli', text: 'Istruzioni scritte quando serve, e un appuntamento di controllo se il caso lo richiede.' },
    ],
    processNote:
      'L’ambulatorio non sostituisce un pronto soccorso veterinario h24. In caso di trauma grave, difficoltà respiratorie o collasso, ti indirizziamo alla struttura più adatta.',
    eduEyebrow: '03 Consigli',
    eduTitle: 'Quando è davvero urgente?',
    eduLead: 'Meglio una telefonata in più che aspettare la mattina “per vedere”. Ecco i segnali che non vanno rimandati.',
    eduItems: [
      { title: 'Non mangia e non beve', text: 'Un adulto che rifiuta cibo e acqua per più di 24 ore va visto. I cuccioli, prima.' },
      { title: 'Vomito o diarrea ripetuti', text: 'Soprattutto con sangue, apatia o se l’animale è molto giovane o anziano.' },
      { title: 'Respiro faticoso', text: 'Lingua scura, respiro a bocca aperta nel gatto, tosse continua: vieni subito o vai al pronto soccorso.' },
      { title: 'Trauma e incidenti', text: 'Investimento, caduta, morso. Anche se “sembra a posto”, meglio un controllo.' },
      { title: 'Difficoltà a urinare', text: 'Sforzi in lettiera o in giardino, soprattutto nei gatti maschi, sono un’emergenza.' },
      { title: 'Avvelenamento sospetto', text: 'Cioccolato, veleno per topi, piante, farmaci umani: porta la confezione se ce l’hai.' },
    ],
    situationalEyebrow: 'Per chi è in dubbio',
    situationalTitle: 'Non sai se è il caso di venire stasera?',
    situationalLead: 'Capita: il cane zoppica, il gatto ha vomitato due volte, è domenica e non vuoi aspettare. Facciamo così.',
    situationalSteps: [
      { title: 'Chiamaci o scrivi', text: 'In due minuti capiamo se può aspettare l’orario di apertura o se è meglio muoversi ora.' },
      { title: 'Manda una foto o un video', text: 'Una zampa, la lettiera, il vomito, il respiro: a volte si capisce già dal telefono.' },
      { title: 'Di’ età, peso e terapie', text: 'Serve per non consigliare a vuoto e per sapere se abbiamo in ambulatorio quello che serve.' },
      { title: 'Arriva con calma', text: 'Se ti diciamo di venire, porta il trasportino o il guinzaglio. Niente digiuno se non te lo chiediamo.' },
    ],
    situationalNote: 'Tempi indicativi: rispondiamo durante l’orario di apertura, di solito nel giro di poco. Fuori orario, se non rispondiamo, valuta il pronto soccorso più vicino.',
    whyTitle: 'Perché venire qui',
    why: [
      { title: 'Prima ascoltiamo, poi proponiamo', text: 'Niente lista della spesa. Ti diciamo cosa serve davvero per quel problema.' },
      { title: 'Parliamo chiaro', text: 'Cosa abbiamo visto, cosa può aspettare, quanto può costare. Senza tecnicismi inutili.' },
      { title: 'Tempi umani', text: 'Le visite durano il tempo che serve. Se c’è un’urgenza, la facciamo passare avanti.' },
      { title: 'Di {citta}, per {citta}', text: 'Siamo in {indirizzo}. Non un call center: un ambulatorio a cui puoi tornare.' },
    ],
    galleryTitle: 'Uno studio pensato per far stare un po’ più calmi anche i padroni.',
    formTitle: 'Prenota una visita.',
    formLead: 'Lasciaci due informazioni: ti richiamiamo per confermare giorno e orario. Se è urgente, meglio una telefonata.',
    formSubmit: 'Invia richiesta di prenotazione',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Tipo di visita',
        type: 'select',
        required: true,
        options: ['Controllo di routine', 'Vaccinazione', 'Cucciolo / prima visita', 'Problema in corso', 'Urgenza', 'Altro'],
      },
      { name: 'animale', label: 'Nome e specie dell’animale', type: 'text', required: true, placeholder: 'Es. Luna, gatta europea' },
      { name: 'giorno', label: 'Preferenza giorno', type: 'text', placeholder: 'Es. mercoledì pomeriggio' },
      {
        name: 'fascia',
        label: 'Fascia oraria',
        type: 'select',
        options: ['Mattina', 'Pomeriggio', 'Indifferente'],
      },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Visita fatta con calma e spiegazioni chiare. Ci hanno detto cosa serviva davvero, senza aggiungere esami a caso.', name: 'Giulia M.', context: 'Con Luna, gatta' },
      { quote: 'Cucciolo vaccinato e microchip in un’unica mattina. Pazienza infinita, anche con noi alla prima esperienza.', name: 'Marco T.', context: 'Da {citta}' },
      { quote: 'Il cane zoppicava dopo una corsa. Ci hanno ricevuti in giornata e il giorno dopo camminava già meglio.', name: 'Anna R.', context: 'Cliente da tempo' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.clinic,
    images: {
      hero: img('photo-1576201836106-db1758fd1c97'),
      process: img('photo-1628009368231-7bb7cfcb0def'),
      edu: img('photo-1548199973-03cce0bbc87b'),
      gallery: [
        { src: img('photo-1450778869180-41d0601e046e'), alt: 'Cane all’aperto in un prato' },
        { src: img('photo-1514888286974-6c03e2ca1dba'), alt: 'Gatto domestico sul davanzale' },
        { src: img('photo-1583337130417-3346a1be7dee'), alt: 'Ritratto di un cane in casa' },
        { src: img('photo-1548199973-03cce0bbc87b'), alt: 'Cani che corrono insieme' },
      ],
    },
  },

  gelateria: {
    seoTitle: 'Gelateria a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, gelateria a {citta}. Gelato artigianale, gusti di stagione e vaschette da asporto in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'Il gelato buono si riconosce ancora prima del primo cucchiaio.',
    lead: 'A {citta}, in {indirizzo}, mantechiamo tutti i giorni. Gusti di stagione, cialde croccanti, e il tempo di sceglierne due senza fretta.',
    heroCaption: 'Vaschette del giorno: si vede dal colore, si capisce dal cucchiaio.',
    heroAlt: 'Vaschette di gelato artigianale al banco',
    nav: [
      { id: 'servizi', label: 'Cosa facciamo' },
      { id: 'processo', label: 'Come lo facciamo' },
      { id: 'consigli', label: 'Gusti' },
      { id: 'spazio', label: 'Il banco' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Scrivici per un ordine',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei informazioni o un ordine di gelato da {nome} a {citta}.',
    servicesTitle: 'Dal cono in piazza alla vaschetta da portare a tavola.',
    services: [
      { title: 'Gelato artigianale', text: 'Mantecato in laboratorio, non da un broccatore industriale. Si sente dal cucchiaio, non dallo slogan.' },
      { title: 'Gusti di stagione', text: 'Frutta quando c’è, creme quando serve. Il cartello cambia, e va bene così.' },
      { title: 'Cono e coppetta', text: 'Due gusti, una cialda calda, e il tempo di decidere senza la fila che ti soffia in collo.' },
      { title: 'Vaschette da asporto', text: 'Per cena in terrazza o per il freezer di casa. Ti diciamo quanto dura e come conservarlo.' },
      { title: 'Granite e affogati', text: 'Quando fa quel caldo che solo il Sud conosce, il cono non basta.' },
      { title: 'Frutta e senza lattosio', text: 'Chiedi al banco: ti diciamo cosa è di frutta, cosa è senza latte, cosa è entrambi.' },
      { title: 'Ordini per feste', text: 'Compleanni, battesimi, una vaschetta grande per dodici. Meglio avvisare il giorno prima.' },
      { title: 'Un caffè, se serve', text: 'A volte si entra per il gelato e si esce anche con un espresso. Non è un bar, è un gesto.' },
    ],
    processTitle: 'Come arriva il gelato nel tuo cono.',
    processLead: 'Niente magia: latte, frutta, tempo e una macchina che non perdona se sbagli le dosi.',
    processMeta: [
      { label: 'Quando lo facciamo', value: 'Tutti i giorni, a seconda della stagione e di quanto è andato il giorno prima.' },
      { label: 'Cosa chiedere', value: 'Allergeni, gusti del giorno, vaschette da asporto. Al banco ti rispondiamo in un minuto.' },
    ],
    process: [
      { title: 'Scegliamo la materia', text: 'Latte, panna, frutta di stagione, cacao. Se la pesca non c’è, non c’è il gusto pesca. Punto.' },
      { title: 'Mantechiamo', text: 'La macchina lavora, noi controlliamo. Texture e temperatura non si improvvisano.' },
      { title: 'Mettiamo in vaschetta', text: 'Colori veri, non fluorescenti. Se è pistacchio, è pistacchio: un po’ spento, molto buono.' },
      { title: 'Te lo serviamo', text: 'Cono, coppetta o vaschetta. Ti diciamo cosa sta meglio insieme, se vuoi. Altrimenti taci e gusta.' },
    ],
    processNote: 'Le disponibilità dei gusti cambiano in giornata. Per vaschette grandi o feste, scrivi o passa il giorno prima.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Le cose che vale la pena chiedere al banco.',
    eduLead: 'Non esiste il gusto migliore in assoluto. Esiste quello giusto per quest’ora, questo caldo, questa fame.',
    eduItems: [
      { title: 'Creme o frutta', text: 'Le creme riempiono, la frutta rinfresca. Un cono misto è quasi sempre la scelta giusta.' },
      { title: 'Allergeni', text: 'Latte, uova, frutta a guscio, glutine della cialda. Chiedi: ti rispondiamo senza giri di parole.' },
      { title: 'Vaschette', text: 'Meglio ritirarle all’ultimo, e tenerle in freezer chiuso. Non sul sedile dell’auto al sole.' },
      { title: 'Stagione', text: 'Fichi, agrumi, fragole, mandorla: quando c’è il prodotto, c’è il gusto. Fuori stagione, lasciamo stare.' },
      { title: 'Porzioni', text: 'Un piccolo è un piccolo. Se hai fame, prendine uno medio: costa meno di due piccoli e arriva fino in fondo.' },
      { title: 'Per i bambini', text: 'Coppetta, cucchiaino, e un gusto che non sporca la maglietta più del dovuto. Si può fare.' },
    ],
    situationalEyebrow: 'Per chi organizza',
    situationalTitle: 'Hai una cena o un compleanno e ti serve il gelato per tutti?',
    situationalLead: 'Si può fare, se ci avvisi. Non siamo un catering industriale: siamo un banco che manteca ogni giorno.',
    situationalSteps: [
      { title: 'Scrivi quanti siete', text: 'Dieci, venti, quaranta: cambia la vaschetta e il preavviso.' },
      { title: 'Di’ quando lo ritiri', text: 'Giorno e ora. Il gelato non aspetta in vetrina due pomeriggi.' },
      { title: 'Scegli i gusti', text: 'Ti consigliamo un misto crema e frutta, così contenti tutti. Anche chi “non mangia il gelato”.' },
      { title: 'Passa a ritirare', text: 'Borsa termica se hai più di dieci minuti di macchina. Te lo diciamo al telefono, non a caso.' },
    ],
    situationalNote: 'Tempi indicativi: per vaschette del giorno basta un messaggio la mattina. Per feste, meglio 24 ore prima.',
    whyTitle: 'Perché il nostro banco',
    why: [
      { title: 'Fatto qui, oggi', text: 'Non arriva da un furgone tre volte a settimana. Si gira la vaschetta e si vede.' },
      { title: 'Gusti che hanno un senso', text: 'Pochi, ruotati, di stagione. Meglio otto fatti bene che venti colorati.' },
      { title: 'In piazza, a {citta}', text: 'Siamo in {indirizzo}. Un cono e due passi: è il motivo per cui esiste una gelateria.' },
      { title: 'Ti diciamo la verità', text: 'Se un gusto è finito, è finito. Se la pesca è acerba, aspettiamo.' },
    ],
    galleryTitle: 'Un banco pensato per fermarsi, non solo per passare.',
    formTitle: 'Ordina una vaschetta o chiedi per una festa.',
    formLead: 'Il modulo è un anteprima: non invia nulla. Per confermare, chiamaci o scrivi su WhatsApp.',
    formSubmit: 'Invia richiesta',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Cosa ti serve',
        type: 'select',
        required: true,
        options: ['Informazioni', 'Vaschette da asporto', 'Ordine per una festa', 'Altro'],
      },
      { name: 'quando', label: 'Giorno di ritiro', type: 'text', placeholder: 'Es. sabato pomeriggio' },
      { name: 'note', label: 'Gusti o numero persone', type: 'text', span: 2, placeholder: 'Es. 2 kg, pistacchio e limone' },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Pistacchio vero, non verde fluo. Torniamo ogni volta che passiamo da {citta}.', name: 'Elena B.', context: 'Di passaggio' },
      { quote: 'Vaschetta per una cena in otto: consigli giusti, gelato ancora bello a tavola. Bravi.', name: 'Paolo S.', context: 'Da {citta}' },
      { quote: 'Cono medio, due gusti, cialda croccante. Semplice e fatto come si deve.', name: 'Chiara L.', context: 'Con i bambini' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.gelato,
    images: {
      hero: img('photo-1501443762994-82bd5dace89a'),
      process: img('photo-1563805042-7684c019e1cb'),
      edu: img('photo-1570197788417-0e823475c113'),
      gallery: [
        { src: img('photo-1497034825429-c343d7c6a68f'), alt: 'Coni gelato appena serviti' },
        { src: img('photo-1488900128323-21503983a07e'), alt: 'Banco gelateria con vaschette' },
        { src: img('photo-1563805042-7684c019e1cb'), alt: 'Coppa di gelato con topping' },
        { src: img('photo-1570197788417-0e823475c113'), alt: 'Palle di gelato in coppetta' },
      ],
    },
  },

  ristorazione: {
    seoTitle: '{categoria} a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, {categoria} a {citta}. Cucina e tavoli in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni. Prenota o chiama.',
    eyebrow: '{categoria} · {citta}',
    h1: 'A tavola, senza fretta. Cucina che sa di {citta}, non di ristorante qualunque.',
    lead: 'In {indirizzo} cuciniamo per chi ha fame e un po’ di tempo. Piatti chiari, materia prima, e il conto che torna con quello che hai mangiato.',
    heroCaption: 'Tavoli apparecchiati, luce bassa, e il primo che arriva fumante.',
    heroAlt: 'Piatto di ristorante servito al tavolo',
    nav: [
      { id: 'servizi', label: 'Cucina' },
      { id: 'processo', label: 'A tavola' },
      { id: 'consigli', label: 'Come venire' },
      { id: 'spazio', label: 'Sala' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Prenota un tavolo',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei prenotare un tavolo da {nome} a {citta}.',
    servicesTitle: 'Cosa mettiamo in tavola.',
    services: [
      { title: 'Cucina di territorio', text: 'Piatti che hanno un senso qui, non un menu copiato da un’altra provincia.' },
      { title: 'Pranzo', text: 'Piatti del giorno, tempi da pranzo vero. Se hai un’ora, te lo diciamo prima di accomodarti.' },
      { title: 'Cena', text: 'Si sta più a lungo. Antipasto, un primo, e il resto se ancora c’è fame.' },
      { title: 'Antipasti e crudi', text: 'Per aprire, non per riempire. Chiedi cosa è arrivato stamattina.' },
      { title: 'Primi', text: 'Pasta, brodi, riso quando c’è. Porzioni da gente che mangia, non da degustazione.' },
      { title: 'Secondi', text: 'Carne o pesce, cotture pulite. Se è finito, è finito: ti proponiamo l’alternativa.' },
      { title: 'Vini e bicchieri', text: 'Una carta corta che si beve. Ti consigliamo in base a quello che hai ordinato, non al prezzo.' },
      { title: 'Tavoli per gruppi', text: 'Compleanni e cene di lavoro: meglio avvisare. Ti diciamo se abbiamo il tavolo e da che ora.' },
    ],
    processTitle: 'Come funziona una serata da noi.',
    processLead: 'Prenoti, arrivi, ti sediamo. Il resto è cucina e un po’ di pazienza nei giorni pieni.',
    processMeta: [
      { label: 'Prenotazione', value: 'Consigliata la sera e nel weekend. A pranzo, spesso si risolve con una telefonata.' },
      { label: 'Tempi', value: 'Un primo arriva in 15–20 minuti nei giorni normali. Il sabato sera, un po’ di più: te lo diciamo.' },
    ],
    process: [
      { title: 'Prenoti o passi', text: 'Un messaggio con giorno, ora e coperti basta. Se siamo pieni, ti proponiamo un altro orario.' },
      { title: 'Ti accomodiamo', text: 'Acqua, carta, e il tempo di leggere. Nessuno ti siede addosso se il tavolo è tuo.' },
      { title: 'Ordini con calma', text: 'Ti diciamo cosa è meglio oggi, cosa è finito, cosa sta in due. Poi cuciniamo.' },
      { title: 'Mangi, e il conto torna', text: 'Se qualcosa non va, dillo lì. Si sistema a tavola, non con una recensione tre giorni dopo.' },
    ],
    processNote: 'Menu e disponibilità cambiano con il mercato. Allergie e intolleranze: dille al momento della prenotazione o appena ti siedi.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Come venire e stare bene a tavola.',
    eduLead: 'Piccole cose che evitano malintesi. Le scriviamo qui perché al telefono si dimenticano.',
    eduItems: [
      { title: 'Prenota se siete in tanti', text: 'Da sei in su, un messaggio il giorno prima evita di lasciarvi in piedi.' },
      { title: 'Allergie', text: 'Glutine, lattosio, frutta a guscio, crostacei: dillo subito. Non tutto si può togliere all’ultimo.' },
      { title: 'Bambini', text: 'Sono i benvenuti. Porzioni piccole e pasta in bianco si possono fare: chiedi, non è un favore.' },
      { title: 'Ritardi', text: 'Dieci minuti succedono. Venti, avvisa: il tavolo al sabato non può restare vuoto.' },
      { title: 'Pranzo di lavoro', text: 'Dillo: ti sediamo dove si parla e ti teniamo i tempi. Il menu corto aiuta.' },
      { title: 'Account e scontrino', text: 'Si paga a tavola. Se ti serve fattura, dillo all’inizio, non al caffè.' },
    ],
    situationalEyebrow: 'Di passaggio',
    situationalTitle: 'Sei a {citta} stasera e cerchi un tavolo?',
    situationalLead: 'Scrivi o chiama. Ti diciamo in un minuto se c’è posto, da che ora, e se è meglio il banco o la sala.',
    situationalSteps: [
      { title: 'Di’ in quanti siete', text: 'Due o dodici cambia tutto: tavolo, orario, e se c’è ancora pane in cucina.' },
      { title: 'Ora in cui arrivi', text: 'Le 20:00 del sabato non sono le 21:30 del martedì. Siamo onesti sui tempi.' },
      { title: 'Allergie o feste', text: 'Una torta, un celiaco, un anniversario: meglio saperlo prima di accendere i fuochi.' },
      { title: 'Conferma', text: 'Ti richiamiamo o ti rispondiamo su WhatsApp. La prenotazione è confermata solo così.' },
    ],
    situationalNote: 'Nei weekend d’estate e nelle feste il turno di cena si riempie presto. Un messaggio la mattina risolve quasi sempre.',
    whyTitle: 'Perché sederti qui',
    why: [
      { title: 'Cucina che si capisce', text: 'Sai cosa stai mangiando. Se un piatto ha un nome strano, te lo traduciamo.' },
      { title: 'Non ti cacciamo', text: 'Il tavolo è tuo per la serata, non per un slot da settanta minuti.' },
      { title: 'Prezzi allineati al piatto', text: 'Niente sorprese sul coperto e sul vino della casa. Chiedi, ti diciamo prima.' },
      { title: 'Siamo a {citta}', text: '{indirizzo}. Non una catena, un posto a cui puoi tornare mercoledì prossimo.' },
    ],
    galleryTitle: 'Sala, tavoli, e il piatto che arriva quando è pronto.',
    formTitle: 'Prenota un tavolo.',
    formLead: 'Lasciaci coperti e giorno: ti confermiamo noi. Se è per stasera, meglio una telefonata.',
    formSubmit: 'Invia richiesta di prenotazione',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      { name: 'coperti', label: 'Coperti', type: 'text', required: true, placeholder: 'Es. 4' },
      { name: 'giorno', label: 'Giorno', type: 'text', required: true, placeholder: 'Es. sabato 28' },
      {
        name: 'fascia',
        label: 'Pranzo o cena',
        type: 'select',
        options: ['Pranzo', 'Cena', 'Aperitivo / altro'],
      },
      { name: 'note', label: 'Note (allergie, festa, orario)', type: 'text', placeholder: 'Es. celiaca, ore 20:30' },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Pranzo di passaggio: primo buono, servizio senza teatralità, conto onesto. Ci torno.', name: 'Davide F.', context: 'Di passaggio da {citta}' },
      { quote: 'Cena in sei per un compleanno. Ci hanno tenuto il tavolo e adattato due piatti. Persone serie.', name: 'Marta G.', context: 'Gruppo di amici' },
      { quote: 'Torno quando sono in zona. Non è il ristorante “delle grandi occasioni”: è quello della fame vera.', name: 'Luca P.', context: 'Cliente di {citta}' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.restaurant,
    images: {
      hero: img('photo-1414235077428-338989a2e8c0'),
      process: img('photo-1517248135467-4c7edcad34c4'),
      edu: img('photo-1559339352-11d035aa65de'),
      gallery: [
        { src: img('photo-1517248135467-4c7edcad34c4'), alt: 'Interno di una sala ristorante' },
        { src: img('photo-1504674900247-0877df9cc836'), alt: 'Tavola apparecchiata con piatti' },
        { src: img('photo-1559339352-11d035aa65de'), alt: 'Pasta servita al ristorante' },
        { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Piatto gourmet al tavolo' },
      ],
    },
  },

  ristorazione_pesce: {
    seoTitle: 'Ristorante di pesce a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, ristorante di pesce a {citta}. Pesce e cucina di mare in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'Il mare, pulito, in un piatto. Senza sceneggiate.',
    lead: 'A {citta}, in {indirizzo}, cuciniamo pesce quando c’è, e lo diciamo quando non c’è. Cotture corte, crudi se merita, e il resto lo decide il mercato del mattino.',
    heroCaption: 'Crudo e cotture corte: il pesce buono non ha bisogno di maschera.',
    heroAlt: 'Piatto di pesce servito al ristorante',
    nav: [
      { id: 'servizi', label: 'Cucina' },
      { id: 'processo', label: 'A tavola' },
      { id: 'consigli', label: 'Il pesce' },
      { id: 'spazio', label: 'Sala' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Prenota un tavolo',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei prenotare un tavolo da {nome} a {citta}.',
    servicesTitle: 'Cosa esce dalla cucina, quando il mare collabora.',
    services: [
      { title: 'Pesce del giorno', text: 'Si decide la mattina. Ti diciamo cosa c’è, quanto pesa, come sta meglio in padella o crudo.' },
      { title: 'Crudi e antipasti di mare', text: 'Quando la materia è ferma e pulita. Altrimenti si cuoce, e va bene così.' },
      { title: 'Primi di mare', text: 'Spaghetti, brodi, risotti quando il fondo lo merita. Porzioni da pranzo, non da finger food.' },
      { title: 'Secondi e griglia', text: 'Orata, pescatrice, seppie: cotture corte. Il sale e un filo d’olio fanno il resto.' },
      { title: 'Pranzo', text: 'Un crudo, un primo, e si torna al lavoro. Ti teniamo i tempi se ce lo chiedi.' },
      { title: 'Cena', text: 'Si sta. Una bottiglia, due portate, e il caffè senza cacciarti.' },
      { title: 'Vini e bollicine', text: 'Carta corta, bianchi che stanno sul pesce. Un consiglio vale più di una lista di settanta etichette.' },
      { title: 'Tavoli per gruppi', text: 'Menu di mare condiviso, se avvisi. Per i grandi tavoli il preavviso non è un vezzo: è cucina.' },
    ],
    processTitle: 'Dal banco del pesce al tuo tavolo.',
    processLead: 'Non c’è un menu eterno. C’è quello che è arrivato, e il modo più onesto di cucinarlo.',
    processMeta: [
      { label: 'Mercato', value: 'La mattina si sceglie. Se un pesce non c’è, non lo inventiamo col congelatore a sorpresa.' },
      { label: 'Allergie', value: 'Crostacei, molluschi, anisakis: dillo in prenotazione. Il crudo non è per tutti.' },
    ],
    process: [
      { title: 'Prenoti', text: 'Giorno, ora, coperti. Se vuoi un crudo o un pesce intero, dillo: si pesa e si tiene da parte.' },
      { title: 'Ti raccontiamo il banco', text: 'Cosa c’è oggi, cosa sta meglio ai ferri, cosa in umido. Poi scegli tu.' },
      { title: 'Cuciniamo corto', text: 'Il pesce si rovina in due minuti di troppo. Preferiamo farti aspettare due minuti in più.' },
      { title: 'A tavola', text: 'Lische, salse a parte se le vuoi, e il pane per la salsa che resta. Il resto è bere e parlare.' },
    ],
    processNote: 'Il crudo si serve solo quando la materia lo permette. In gravidanza o con allergie, chiedici l’alternativa cotta.',
    eduEyebrow: '03 Il pesce',
    eduTitle: 'Due parole, dette semplice.',
    eduLead: 'Non esiste “il pesce migliore”. Esiste quello fresco di oggi, e il modo giusto di non rovinarlo.',
    eduItems: [
      { title: 'Crudo', text: 'Si fa se il pesce è fermo, pulito, abbattuto quando serve. Altrimenti no, e te lo diciamo.' },
      { title: 'Intero o filetto', text: 'L’intero costa meno a parità di qualità e sta meglio in cottura. Ti aiutiamo a pulirlo a tavola.' },
      { title: 'Stagione', text: 'Alice, ricciola, polpo, seppia: ogni mese ha i suoi. Il menu lo segue, non il contrario.' },
      { title: 'Prezzo', text: 'Il pesce buono non è un’elemosina. Ti diciamo il peso e il prezzo prima di cucinarlo, se è al kg.' },
      { title: 'Vino', text: 'Un bianco del territorio sta meglio di un nome famoso che copre il piatto.' },
      { title: 'Bambini', text: 'Pasta al pomodoro e un filetto senza lische si possono fare. Chiedi, è normale.' },
    ],
    situationalEyebrow: 'Di passaggio al mare',
    situationalTitle: 'Sei a {citta} e vuoi sederti sul pesce stasera?',
    situationalLead: 'Scrivi. Ti diciamo se c’è tavolo, se il crudo c’è ancora, e se è meglio arrivare alle 20 o alle 21:30.',
    situationalSteps: [
      { title: 'Coperti e ora', text: 'Due o dieci, prima o dopo le 21: cambia la cucina e il pesce che resta.' },
      { title: 'Crudo o cotto', text: 'Se vuoi un crudo, dillo: la materia buona finisce, e non la sostituiamo a caso.' },
      { title: 'Allergie', text: 'Crostacei e anisakis non si improvvisano. Meglio una riga in più nel messaggio.' },
      { title: 'Conferma', text: 'Ti rispondiamo noi. Senza conferma, il tavolo non è tuo: è onesto dirlo così.' },
    ],
    situationalNote: 'In estate i tavoli della cena volano. Un messaggio a metà pomeriggio è spesso ancora in tempo.',
    whyTitle: 'Perché il pesce qui',
    why: [
      { title: 'Si decide la mattina', text: 'Non un freezer eterno. Se non c’è, non c’è. Ti proponiamo quello che c’è.' },
      { title: 'Cotture oneste', text: 'Corto, pulito, poco teatro. Il pesce buono si sente da solo.' },
      { title: 'Prezzi detti prima', text: 'Soprattutto sul pesce al kg. Niente sorprese sul conto.' },
      { title: 'A {citta}', text: '{indirizzo}. Un ristorante di pesce, non una vetrina per le foto.' },
    ],
    galleryTitle: 'Sala e cucina di mare, senza filtri.',
    formTitle: 'Prenota un tavolo.',
    formLead: 'Giorno, coperti, e se vuoi il crudo. Ti confermiamo noi. Per stasera, chiama.',
    formSubmit: 'Invia richiesta di prenotazione',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      { name: 'coperti', label: 'Coperti', type: 'text', required: true, placeholder: 'Es. 2' },
      { name: 'giorno', label: 'Giorno', type: 'text', required: true, placeholder: 'Es. venerdì sera' },
      {
        name: 'fascia',
        label: 'Pranzo o cena',
        type: 'select',
        options: ['Pranzo', 'Cena'],
      },
      { name: 'note', label: 'Note (crudo, allergie, orario)', type: 'text', placeholder: 'Es. crudo, ore 20:30' },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Crudo pulito e un primo di mare come si deve. Niente scenografia, tutto nel piatto.', name: 'Serena V.', context: 'Cena a {citta}' },
      { quote: 'Abbiamo chiesto il pesce al kg: peso e prezzo detti prima, cottura giusta. Così si fa.', name: 'Andrea C.', context: 'Coppia di passaggio' },
      { quote: 'Tavolo per un compleanno, menu di mare condiviso. Puntuali e senza forzare il conto.', name: 'Ilaria N.', context: 'Gruppo di 8' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.restaurant,
    images: {
      hero: img('photo-1615141982883-c7adbb4b7d82'),
      process: img('photo-1534604973900-c43ab4c2e0ab'),
      edu: img('photo-1559339352-11d035aa65de'),
      gallery: [
        { src: img('photo-1517248135467-4c7edcad34c4'), alt: 'Sala del ristorante' },
        { src: img('photo-1615141982883-c7adbb4b7d82'), alt: 'Piatto di mare' },
        { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Piatto servito al tavolo' },
        { src: img('photo-1534604973900-c43ab4c2e0ab'), alt: 'Pesce fresco in cucina' },
      ],
    },
  },

  pasticceria: {
    seoTitle: 'Pasticceria a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, pasticceria a {citta}. Colazione, torte e pasticcini in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'La colazione giusta non si improvvisa. Si inforna all’alba.',
    lead: 'In {indirizzo} a {citta} accendiamo il forno quando è ancora buio. Cornetti, paste, torte su ordinazione, e il caffè che sta in piedi da solo.',
    heroCaption: 'Banco del mattino: brioche, paste e quello che è uscito dal forno da poco.',
    heroAlt: 'Banco di pasticceria con dolci appena esposti',
    nav: [
      { id: 'servizi', label: 'Banco' },
      { id: 'processo', label: 'Ordini' },
      { id: 'consigli', label: 'Torte' },
      { id: 'spazio', label: 'Il forno' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Ordina una torta',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei ordinare in pasticceria da {nome} a {citta}.',
    servicesTitle: 'Dal caffè delle sette alla torta della domenica.',
    services: [
      { title: 'Colazione al banco', text: 'Cornetti, paste, un caffè. Si sta in piedi o al tavolo, a seconda della mattina.' },
      { title: 'Pasticceria fresca', text: 'Cannoncini, bignè, mignon. Quello che vedi è uscito oggi, non ieri sera.' },
      { title: 'Pasticceria secca', text: 'Biscotti e paste di mandorla da portare via. Durano, se resisti.' },
      { title: 'Torte su ordinazione', text: 'Compleanni, cresime, una domenica speciale. Meglio 48 ore prima, soprattutto nel weekend.' },
      { title: 'Pasticcini da vassoio', text: 'Misto da dieci, venti, cinquanta. Ti diciamo quanto pesa e quanto dura fuori dal frigo.' },
      { title: 'Caffetteria', text: 'Espresso, cappuccino, un bicchiere d’acqua. Niente menu da dieci pagine.' },
      { title: 'Senza glutine / intolleranze', text: 'Chiedi al banco cosa possiamo fare. Non tutto si sostituisce, e preferiamo dirtelo.' },
      { title: 'Occasioni', text: 'Confetti, bomboniere, un vassoio per l’ufficio. Un messaggio evita di trovare il banco vuoto alle undici.' },
    ],
    processTitle: 'Come si ordina una torta senza sorprese.',
    processLead: 'Due domande, una data, e una conferma. Il resto lo fa il forno.',
    processMeta: [
      { label: 'Preavviso', value: 'Almeno 48 ore per le torte. Per i vassoi del weekend, meglio il giovedì.' },
      { label: 'Ritiro', value: 'Ti diamo un orario. La panna e la crema non aspettano in vetrina tutto il pomeriggio.' },
    ],
    process: [
      { title: 'Ci dici l’occasione', text: 'Quanti siete, che giorno, se c’è un celiaco o un compleanno di otto anni. Cambia la torta.' },
      { title: 'Scegliamo insieme', text: 'Forma, farcitura, scritta. Ti diciamo cosa sta in piedi due ore e cosa va in frigo subito.' },
      { title: 'Confermiamo', text: 'Prezzo e orario di ritiro. Senza conferma, non la mettiamo in produzione: è più onesto.' },
      { title: 'Ritiri e conservi', text: 'Istruzioni su frigo e taglio. Se viaggi, una vaschetta e un po’ di giudizio sul sedile al sole.' },
    ],
    processNote: 'Le disponibilità del banco cambiano in mattinata. Per scritte, piani alimentari e numeri grandi, non arrivare la sera prima.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Quello che conviene sapere prima di ordinare.',
    eduLead: 'Una torta non è un cornetto. Ha tempi, pesi e un frigorifero che non è un optional.',
    eduItems: [
      { title: 'Pesi e porzioni', text: 'Un kg non è “per dieci” in tutti i casi. Ti diciamo quante fette reali, non da rivista.' },
      { title: 'Trasporto', text: 'Macchina dritta, aria condizionata, niente curve da film. Te lo diciamo perché è successo.' },
      { title: 'Scritte e decorazioni', text: 'Si possono fare. Portaci il nome giusto, scritto. Evita le correzioni al ritiro.' },
      { title: 'Allergeni', text: 'Uova, burro, frutta a guscio, glutine. Il banco è un laboratorio, non una cucina separata a norma da sala bianca.' },
      { title: 'Conservazione', text: 'Crema e panna in frigo. La secca, in latta. Non lasciare nulla in auto “un attimo”.' },
      { title: 'Resi e avanzati', text: 'Le torte su ordinazione non si restituiscono. Se avanzano, il giorno dopo a colazione risolvono tutto.' },
    ],
    situationalEyebrow: 'Hai un’occasione',
    situationalTitle: 'Ti serve una torta per domenica e non sai da dove partire?',
    situationalLead: 'Scrivi quanti siete e che giorno. Ti proponiamo due opzioni, un prezzo, e un orario di ritiro.',
    situationalSteps: [
      { title: 'Numero di persone', text: 'Cambia peso e farcitura. Meglio una fetta in più che una in meno.' },
      { title: 'Giorno e ora di ritiro', text: 'Domenica alle 11 non è sabato alle 19. Il forno ha un ordine, non un interruttore.' },
      { title: 'Gusto e scritta', text: 'Cioccolato, crema, frutta. E il nome, scritto giusto. Il resto lo consigliamo noi.' },
      { title: 'Conferma', text: 'Un messaggio basta. Ti rispondiamo con prezzo e orario. Poi è fatta.' },
    ],
    situationalNote: 'Nei ponti e a Pasqua/Natale il forno va in saturazione. Prima prenoti, meglio dormi.',
    whyTitle: 'Perché questo banco',
    why: [
      { title: 'Si inforna qui', text: 'Non un banco di scongelamento. Si sente dalla sfoglia e si vede dalla vetrina alle otto.' },
      { title: 'Ordini presi sul serio', text: 'Data, peso, scritta. Quello che abbiamo detto, quello che ritiri.' },
      { title: 'Caffè come si deve', text: 'La pasticceria sta in piedi anche sull’espresso. Non è un accessorio.' },
      { title: 'A {citta}', text: '{indirizzo}. Un banco di paese o di città, non un angolo di centro commerciale.' },
    ],
    galleryTitle: 'Forno, banco, e le teglie che escono ancora calde.',
    formTitle: 'Ordina una torta o un vassoio.',
    formLead: 'Il modulo è dimostrativo e non invia dati. Per confermare, chiamaci o scrivi su WhatsApp.',
    formSubmit: 'Invia richiesta',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Cosa ti serve',
        type: 'select',
        required: true,
        options: ['Torta', 'Vassoio di pasticcini', 'Pasticceria secca', 'Informazioni', 'Altro'],
      },
      { name: 'quando', label: 'Giorno di ritiro', type: 'text', required: true, placeholder: 'Es. domenica mattina' },
      { name: 'note', label: 'Persone, gusto, scritta', type: 'text', span: 2, placeholder: 'Es. 12 persone, cioccolato, buona festa Luca' },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Cornetto alla crema come si deve e un cappuccino giusto. La mattina parte così.', name: 'Francesca D.', context: 'Colazione a {citta}' },
      { quote: 'Torta per un compleanno: peso corretto, scritta pulita, gusto da gente grande. Bravi.', name: 'Roberto A.', context: 'Ordine su prenotazione' },
      { quote: 'Vassoio misto per l’ufficio, ritirato in orario. Niente sorprese, e quello che avanzava il giorno dopo era ancora buono.', name: 'Silvia C.', context: 'Di passaggio' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.pastry,
    images: {
      hero: img('photo-1555507036-ab1f4038808a'),
      process: img('photo-1578985545062-69928b1d9587'),
      edu: img('photo-1486427944299-d1955ad32c90'),
      gallery: [
        { src: img('photo-1517433367423-c7e5b0f35086'), alt: 'Interno di una pasticceria' },
        { src: img('photo-1555507036-ab1f4038808a'), alt: 'Cornetti appena sfornati' },
        { src: img('photo-1578985545062-69928b1d9587'), alt: 'Torta al cioccolato' },
        { src: img('photo-1464349095431-e9a21285b5f3'), alt: 'Torta decorata su un banco' },
      ],
    },
  },

  pasticceria_gelato: {
    seoTitle: 'Gelateria e pasticceria a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, gelateria e pasticceria a {citta}. Gelato, colazione e dolci in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'Di giorno il forno. Di pomeriggio le vaschette. Lo stesso banco, due fame diverse.',
    lead: 'In {indirizzo} a {citta} facciamo pasticceria al mattino e gelato quando il sole alza la voce. Un posto solo, senza dover scegliere se entrare da “dolci” o da “cono”.',
    heroCaption: 'Gelato e pasticceria sullo stesso banco: si viene due volte al giorno, e va bene.',
    heroAlt: 'Gelato artigianale servito in coppetta',
    nav: [
      { id: 'servizi', label: 'Banco' },
      { id: 'processo', label: 'Ordini' },
      { id: 'consigli', label: 'Gusti' },
      { id: 'spazio', label: 'Il locale' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Ordina o scrivi',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei un ordine da {nome} a {citta}.',
    servicesTitle: 'Colazione, paste, gelato. Senza far finta di essere due negozi.',
    services: [
      { title: 'Gelato artigianale', text: 'Vaschette del giorno, cono e coppetta. Si vede dal colore, si capisce dal cucchiaio.' },
      { title: 'Colazione', text: 'Cornetti, paste, caffè. La mattina il banco è da pasticceria, e si sente.' },
      { title: 'Pasticceria fresca', text: 'Mignon, bignè, cannoncini. Quello che resta alle undici è quello che è uscito alle sette.' },
      { title: 'Torte e vassoi', text: 'Su ordinazione, con un po’ di preavviso. Compleanni e uffici vivono di questo.' },
      { title: 'Vaschette da asporto', text: 'Per cena in terrazza. Ti diciamo come tenerle e quanto possono stare in auto.' },
      { title: 'Gusti di stagione', text: 'Frutta quando c’è. Creme sempre, ma non venti: poche e fatte bene.' },
      { title: 'Pasticceria secca', text: 'Da portare a casa o in ufficio. Dura più del gelato, e questo non è un difetto.' },
      { title: 'Ordini per feste', text: 'Gelato, pasta, o entrambi. Un messaggio con data e persone basta per partire.' },
    ],
    processTitle: 'Come si ordina senza fare la spola.',
    processLead: 'Torta, vaschetta o un misto: ci dici cosa e quando. Il ritiro è un passaggio solo.',
    processMeta: [
      { label: 'Preavviso', value: 'Torte 48 ore. Vaschette grandi, il giorno prima. Il banco del giorno, quando passi.' },
      { label: 'Ritiro', value: 'Un orario solo, anche se prendi gelato e pasta insieme. Te lo segniamo noi.' },
    ],
    process: [
      { title: 'Ci scrivi cosa ti serve', text: 'Torta, kg di gelato, vassoio, o un misto. Numero di persone e giorno.' },
      { title: 'Ti proponiamo', text: 'Due opzioni, un prezzo, allergeni. Decidi senza venire tre volte.' },
      { title: 'Confermi', text: 'Senza conferma non produciamo. È più giusto per te e per chi è già in lista.' },
      { title: 'Ritiri', text: 'Gelato all’ultimo, pasta quando è pronta. Se hai una macchina al sole, dillo: ti organizziamo.' },
    ],
    processNote: 'Allergeni: il laboratorio è unico. Se c’è un’allergia grave, dillo: ti diciamo cosa possiamo fare sul serio.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Gelato e forno, convivenza civile.',
    eduLead: 'Due prodotti, due temperature, un banco solo. Ecco come non rovinare né l’uno né l’altro.',
    eduItems: [
      { title: 'Ordine misto', text: 'La pasta sta un’ora in auto. Il gelato no. Ritiro: prima la pasta, il gelato per ultimo.' },
      { title: 'Allergeni', text: 'Latte, uova, frutta a guscio, glutine. Chiedi al banco, risposta secca e vera.' },
      { title: 'Stagione', text: 'D’estate il gelato vince. D’inverno, le creme e la pasticceria secca. Seguiamo quello.' },
      { title: 'Porzioni gelato', text: 'Per una cena, calcola un etto e mezzo a testa se c’è anche la torta. Due etti se è lui il dolce.' },
      { title: 'Torte', text: 'Peso reale, scritta, frigo. Le stesse regole della pasticceria, senza sconti.' },
      { title: 'Bambini', text: 'Coppetta, un gusto, e una pasta da mettere in busta per dopo. Si può fare.' },
    ],
    situationalEyebrow: 'Una festa in casa',
    situationalTitle: 'Ti servono paste e gelato per lo stesso pomeriggio?',
    situationalLead: 'Si può, e si ritira in un colpo solo. Scrivi quanti siete e a che ora tagliate la torta.',
    situationalSteps: [
      { title: 'Persone e orario', text: 'Cambia il peso della torta e i chili di gelato. Meglio una riga in più.' },
      { title: 'Misto o solo uno', text: 'Se c’è già la torta, del gelato ne serve meno. Te lo diciamo noi, senza spingere entrambi.' },
      { title: 'Gusti e farcitura', text: 'Due creme e una frutta stanno bene a tutti. In torta, un classico batte un esperimento.' },
      { title: 'Ritiro unico', text: 'Ti diamo un orario. Borsa termica per il gelato: se non ce l’hai, te lo diciamo al telefono.' },
    ],
    situationalNote: 'I weekend d’estate il gelato finisce. Un messaggio il venerdì risolve il sabato.',
    whyTitle: 'Perché questo banco',
    why: [
      { title: 'Due mestieri, un laboratorio', text: 'Forno e mantecatore. Non un angolo gelato aggiunto a un bar.' },
      { title: 'Ordini tenuti', text: 'Data, chili, scritta. Quello che abbiamo detto è quello che ritiri.' },
      { title: 'Di {citta}', text: '{indirizzo}. Un banco di quartiere, non una vetrina da centro commerciale.' },
      { title: 'Ti diciamo quando non si può', text: 'Se un gusto è finito o una torta non arriva per domenica, lo sai subito.' },
    ],
    galleryTitle: 'Un banco che cambia faccia dalla colazione al dopo cena.',
    formTitle: 'Ordina gelato, una torta, o entrambi.',
    formLead: 'Anteprima: il modulo non invia dati. Per confermare, chiamaci o scrivi su WhatsApp.',
    formSubmit: 'Invia richiesta',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Cosa ti serve',
        type: 'select',
        required: true,
        options: ['Gelato / vaschette', 'Torta', 'Pasticcini', 'Misto festa', 'Informazioni'],
      },
      { name: 'quando', label: 'Giorno di ritiro', type: 'text', required: true, placeholder: 'Es. sabato ore 18' },
      { name: 'note', label: 'Persone, gusti, scritta', type: 'text', span: 2 },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Mattina cornetto, pomeriggio cono. È il motivo per cui questo posto funziona.', name: 'Giorgia P.', context: 'Di {citta}' },
      { quote: 'Vaschetta e vassoio per un compleanno, ritiro unico, tutto in ordine. Comodi e bravi.', name: 'Stefano R.', context: 'Festa in casa' },
      { quote: 'Pistacchio e una pasta di mandorla da asporto. Niente fronzoli, qualità vera.', name: 'Mirella T.', context: 'Di passaggio a {citta}' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: [
      { day: 'Lunedì', time: '07:30 – 13:30 · 16:00 – 23:00' },
      { day: 'Martedì – Domenica', time: '07:30 – 13:30 · 16:00 – 00:00' },
    ],
    images: {
      hero: img('photo-1501443762994-82bd5dace89a'),
      process: img('photo-1555507036-ab1f4038808a'),
      edu: img('photo-1570197788417-0e823475c113'),
      gallery: [
        { src: img('photo-1497034825429-c343d7c6a68f'), alt: 'Coni gelato' },
        { src: img('photo-1555507036-ab1f4038808a'), alt: 'Cornetti in pasticceria' },
        { src: img('photo-1578985545062-69928b1d9587'), alt: 'Torta al cioccolato' },
        { src: img('photo-1488900128323-21503983a07e'), alt: 'Banco gelateria' },
      ],
    },
  },

  bar: {
    seoTitle: 'Bar e cucina a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, bar e cucina a {citta}. Caffè, pranzo e serata in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'Caffè al banco la mattina. Cucina e un bicchiere quando scende la sera.',
    lead: 'In {indirizzo} a {citta} facciamo il mestiere del bar senza vergognarcene: espresso, un piatto a mezzogiorno, aperitivo e cucina quando le luci si abbassano.',
    heroCaption: 'Banco, tazzine e il rumore giusto delle otto di mattina.',
    heroAlt: 'Banco di un bar con caffè appena servito',
    nav: [
      { id: 'servizi', label: 'Cosa facciamo' },
      { id: 'processo', label: 'La giornata' },
      { id: 'consigli', label: 'Come venire' },
      { id: 'spazio', label: 'Il locale' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Prenota un tavolo',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei informazioni o un tavolo da {nome} a {citta}.',
    servicesTitle: 'Dalle sette del mattino a quando ha senso chiudere.',
    services: [
      { title: 'Caffetteria', text: 'Espresso, cappuccino, un bicchiere d’acqua. Il mestiere di sempre, fatto ogni giorno.' },
      { title: 'Colazione', text: 'Cornetto, un succo, il giornale se ancora esiste. Si sta al banco o al tavolo.' },
      { title: 'Pranzo veloce', text: 'Un piatto, un panino, un’insalata. Se hai un’ora, te la rispettiamo.' },
      { title: 'Cucina di sera', text: 'Quando il bar diventa un posto dove sedersi. Piatti corti, porzioni vere.' },
      { title: 'Aperitivo', text: 'Un bicchiere e qualcosa da spiluccare. Non un buffet da crociera.' },
      { title: 'Vini e cocktail', text: 'Carta corta, drink che si bevono. Se vuoi il classico, il classico arriva.' },
      { title: 'Tavoli per gruppi', text: 'Un compleanno, un dopo lavoro. Avvisa: ti diciamo se il tavolo c’è e fino a che ora.' },
      { title: 'Asporto', text: 'Caffè, un panino, una bottiglia. Si può, senza fare il drive-in.' },
    ],
    processTitle: 'Una giornata dietro al banco, spiegata a chi arriva.',
    processLead: 'Il locale cambia faccia tre volte. Meglio saperlo, così non cerchi la carbonara alle otto di mattina.',
    processMeta: [
      { label: 'Mattina', value: 'Caffè e colazione. I tavoli girano. Se hai un computer, chiedi dove non dai fastidio.' },
      { label: 'Sera', value: 'Prenotazione utile da sei in su e nel weekend. Due persone, spesso si risolve al volo.' },
    ],
    process: [
      { title: 'Entri e vedi', text: 'Banco o tavolo, a seconda dell’ora. La mattina si sta in piedi, e va bene così.' },
      { title: 'Ordini in un minuto', text: 'Al banco si parla chiaro. A tavola, il menu è corto di proposito.' },
      { title: 'Arriva quello che hai chiesto', text: 'Caffè in un minuto, un piatto in venti. Se slitta, te lo diciamo.' },
      { title: 'Paghi e, se vuoi, resti', text: 'La sera il tavolo è tuo. Di giorno, un po’ di ritmo aiuta chi viene dopo.' },
    ],
    processNote: 'Per cene e gruppi, un messaggio evita di trovarci già pieni. Allergie: dille quando ordini, non a piatto arrivato.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Come stare al bar senza malintesi.',
    eduLead: 'Regole non scritte, scritte. Così nessuno si secca e il caffè arriva prima.',
    eduItems: [
      { title: 'Il banco ha la precedenza', text: 'Un espresso si fa in trenta secondi. Un tavolo di otto, no. Ognuno al suo tempo.' },
      { title: 'Prenota la sera', text: 'Da sei in su, sì. In due, passa o manda un messaggio: ti diciamo se c’è posto.' },
      { title: 'Lavoro al tavolo', text: 'La mattina sì, se c’è spazio. L’aperitivo no: i tavoli servono a chi beve e parla.' },
      { title: 'Bambini', text: 'A pranzo e di giorno, benvenuti. A sera tardi, usiamo giudizio insieme.' },
      { title: 'Allergie', text: 'Il menu è corto, la cucina è piccola. Dillo: ti diciamo cosa si può togliere sul serio.' },
      { title: 'Conto', text: 'Al banco si paga lì. A tavola, alla fine. Fattura: chiedila all’inizio.' },
    ],
    situationalEyebrow: 'Dopo lavoro',
    situationalTitle: 'Uscite in tanti e vi serve un tavolo stasera?',
    situationalLead: 'Scrivi in quanti e a che ora. Ti diciamo se stiamo a cucina, solo a bere, o se è meglio un altro giorno.',
    situationalSteps: [
      { title: 'Numero e ora', text: 'Sei alle 19:30 non sono dodici alle 21. Cambia il tavolo e la cucina.' },
      { title: 'Solo bere o anche mangiare', text: 'Se volete cucina, dillo. I fuochi non restano accesi per abitudine.' },
      { title: 'Un’occasione?', text: 'Compleanno, brindisi, una torta: meglio saperlo. Non promettiamo miracoli all’ultimo.' },
      { title: 'Conferma', text: 'Ti rispondiamo. Senza risposta nostra, non dare per preso il tavolo.' },
    ],
    situationalNote: 'Il venerdì a {citta} si riempie. Un messaggio a metà pomeriggio è il minimo sindacale.',
    whyTitle: 'Perché questo banco',
    why: [
      { title: 'Facciamo i baristi', text: 'Il caffè non è un pretesto. È il mestiere delle sette di mattina.' },
      { title: 'Cucina corta e vera', text: 'Pochi piatti, fatti. Meglio così che un menu di quarantadue voci.' },
      { title: 'Si sta, di sera', text: 'Un bicchiere, due, una chiacchiera. Nessuno ti ruba il tavolo dopo un’ora.' },
      { title: 'In {indirizzo}', text: 'A {citta}, non in un non-luogo. Torni perché sai come ti arriva il caffè.' },
    ],
    galleryTitle: 'Banco di giorno, tavoli di sera.',
    formTitle: 'Prenota un tavolo o chiedi per un gruppo.',
    formLead: 'Modulo dimostrativo: non invia dati. Per confermare, chiama o scrivi su WhatsApp.',
    formSubmit: 'Invia richiesta',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Cosa ti serve',
        type: 'select',
        required: true,
        options: ['Tavolo a cena', 'Aperitivo', 'Pranzo', 'Gruppo / compleanno', 'Informazioni'],
      },
      { name: 'quando', label: 'Giorno e ora', type: 'text', placeholder: 'Es. venerdì 20:00' },
      { name: 'coperti', label: 'Persone', type: 'text', placeholder: 'Es. 6' },
      { name: 'note', label: 'Note', type: 'text' },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Caffè al banco come si deve. Torno la mattina e, ogni tanto, anche di sera.', name: 'Alessio M.', context: 'Di {citta}' },
      { quote: 'Aperitivo in sei, tavolo tenuto, cucina corta e buona. Il bar come dovrebbe essere.', name: 'Valentina E.', context: 'Dopo lavoro' },
      { quote: 'Pranzo veloce, conto chiaro, nessuno che ti fa sentire in dovere di ordinare il dolce.', name: 'Nicola B.', context: 'Di passaggio' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.bar,
    images: {
      hero: img('photo-1514933651103-005eec06c04b'),
      process: img('photo-1495474472287-4d71bcdd2085'),
      edu: img('photo-1544148103-0773bf10d330'),
      gallery: [
        { src: img('photo-1501339847192-fe748995f267'), alt: 'Caffè espresso al banco' },
        { src: img('photo-1514933651103-005eec06c04b'), alt: 'Interno di un bar' },
        { src: img('photo-1544148103-0773bf10d330'), alt: 'Cocktail al bancone' },
        { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Piatto servito a tavola' },
      ],
    },
  },


  pub: {
    seoTitle: 'Pub e pizzeria a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, pub e birreria a {citta}. Pizza, birre e cucina in {indirizzo}. {rating} su Google, {recensioniLabel} recensioni.',
    eyebrow: '{categoria} · {citta}',
    h1: 'Una birra tirata bene e una pizza che arriva calda. Il resto è chiacchiera.',
    lead: 'A {citta}, in {indirizzo}, facciamo il pub come si deve: spina, forno, taglieri e tavoli che non si liberano a forza. Se hai fame o sete, entri. Se hai un’occasione, avvisi.',
    heroCaption: 'Banco, spina e il forno acceso quando serve.',
    heroAlt: 'Banco di un pub con birre alla spina',
    nav: [
      { id: 'servizi', label: 'Cosa facciamo' },
      { id: 'processo', label: 'Come funziona' },
      { id: 'consigli', label: 'Pizza e birra' },
      { id: 'spazio', label: 'Il locale' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Prenota un tavolo',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei prenotare un tavolo da {nome} a {citta}.',
    servicesTitle: 'Cosa facciamo sotto lo stesso tetto.',
    services: [
      { title: 'Birre alla spina', text: 'Un giro corto, tenuto bene. Ti diciamo cosa sta sulla pizza e cosa si beve da sola.' },
      { title: 'Pizza', text: 'Forno acceso la sera. Impasto e cottura come si deve, non un disco scaldato.' },
      { title: 'Taglieri e cucina da pub', text: 'Quando la fame è da birra, non da ristorante. Porzioni da condividere.' },
      { title: 'Aperitivo', text: 'Un bicchiere, un tavolo, qualcosa da spiluccare. Prima della pizza, o al posto della pizza.' },
      { title: 'Asporto', text: 'Pizza da portare via. Dillo se arrivi in macchina: i tempi del forno non mentono.' },
      { title: 'Tavoli per gruppi', text: 'Partite, compleanni, cene di paese. Un messaggio con il numero evita il “vediamo”.' },
      { title: 'Serate', text: 'Quando c’è qualcosa, lo diciamo. Non ogni sera uno show: quando succede, succede.' },
      { title: 'Analcolici e per i bambini', text: 'Bibite, una margherita, un tavolo un po’ più tranquillo se c’è. Chiedi.' },
    ],
    processTitle: 'Come si sta da noi, senza sorprese.',
    processLead: 'Si prenota se siete in tanti. Si aspetta la pizza se il forno è pieno. Si beve intanto. Funziona da sempre.',
    processMeta: [
      { label: 'Forno', value: 'Acceso la sera. A pranzo, se apriamo, è un altro ritmo: chiedi.' },
      { label: 'Attesa pizza', value: '15–25 minuti nei giorni normali. Sabato sera, di più: una birra risolve l’attesa.' },
    ],
    process: [
      { title: 'Prenoti o ti presenti', text: 'In due, spesso si trova posto. Da sei in su, un messaggio è civiltà.' },
      { title: 'Ti sediamo e bevi', text: 'Acqua, birra, un tagliere se la pizza tarda. Nessuno ti dimentica al tavolo.' },
      { title: 'Esce la pizza', text: 'Calda, tagliata, e se c’è un errore si rimette in forno. Dillo lì, non su Internet due giorni dopo.' },
      { title: 'Restare è concesso', text: 'Il tavolo è tuo. Se arriva un gruppo e siamo pieni, lo gestiamo noi, non tu.' },
    ],
    processNote:
      'Allergie e impasti speciali: dillo in prenotazione. Un forno solo non è una cucina separata per il celiaco grave, e preferiamo esserne chiari.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Pizza e birra, dette semplice.',
    eduLead: 'Non serve un corso. Servono due informazioni e un po’ di pazienza il sabato sera.',
    eduItems: [
      { title: 'La spina', text: 'Chiedi cosa c’è oggi. Una birra pulita sta meglio di un nome famoso tenuto male.' },
      { title: 'L’impasto', text: 'Se vuoi qualcosa di diverso dalla classica, dillo. Non tutto si può fare in serata.' },
      { title: 'I tempi', text: 'Il forno ha una coda, non un tasto “subito”. Una birra e un tagliere non sono un ripiego: sono il pub.' },
      { title: 'Asporto', text: 'Ordina, passa, via. Se arrivi venti minuti dopo, la pizza ha già fatto il suo.' },
      { title: 'Gruppi', text: 'Stesso menu, stessi orari. Per i numeri grandi un’ora di preavviso cambia la serata a tutti.' },
      { title: 'Bambini', text: 'Margherita, un tavolo un po’ più defilato, e si sta. A mezzanotte, usiamo giudizio.' },
    ],
    situationalEyebrow: 'Siete in tanti',
    situationalTitle: 'Partita, compleanno o semplicemente sete in otto?',
    situationalLead: 'Scrivi. Ti diciamo se il tavolo c’è, se il forno ce la fa, e da che ora ha senso arrivare.',
    situationalSteps: [
      { title: 'Quanti siete', text: 'Otto o venti è un altro locale. Meglio saperlo che improvvisare le sedie.' },
      { title: 'Pizza, solo birra, o entrambi', text: 'Cambia i fuochi e i bicchieri. Una riga nel messaggio basta.' },
      { title: 'Ora di arrivo', text: 'Le 20:00 del sabato volano. Le 21:30 a volte è meglio, e te lo diciamo.' },
      { title: 'Conferma', text: 'Ti rispondiamo. Il tavolo è tuo quando lo diciamo noi, non prima.' },
    ],
    situationalNote: 'I weekend e le serate di partita si riempiono. Un messaggio nel pomeriggio è il minimo.',
    whyTitle: 'Perché sederti qui',
    why: [
      { title: 'Spina tenuta bene', text: 'Poche birre, pulite. Meglio così che venti spine dimenticate.' },
      { title: 'Pizza che arriva calda', text: 'Il forno è acceso per quello, non per fare numero sul menu.' },
      { title: 'Tavoli che restano tuoi', text: 'Non ti cacciamo dopo un’ora. Se siamo pieni, lo gestiamo noi.' },
      { title: 'A {citta}', text: '{indirizzo}. Un pub di paese o di quartiere, non una catena con il neon.' },
    ],
    galleryTitle: 'Banco, forno, e i tavoli quando si accendono le luci.',
    formTitle: 'Prenota un tavolo o un asporto.',
    formLead: 'Modulo dimostrativo: non invia dati. Per confermare, chiama o scrivi su WhatsApp.',
    formSubmit: 'Invia richiesta',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Cosa ti serve',
        type: 'select',
        required: true,
        options: ['Tavolo', 'Asporto pizza', 'Gruppo / compleanno', 'Solo informazioni'],
      },
      { name: 'quando', label: 'Giorno e ora', type: 'text', placeholder: 'Es. sabato 20:30' },
      { name: 'coperti', label: 'Persone', type: 'text', placeholder: 'Es. 4' },
      { name: 'note', label: 'Note', type: 'text' },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Pizza calda, birra pulita, tavolo che non ti ruba nessuno. Il pub come lo vorresti sotto casa.', name: 'Michele S.', context: 'Di {citta}' },
      { quote: 'Compleanno in dieci: ci hanno tenuto il tavolo e la pizza è arrivata per tutti. Seri.', name: 'Laura F.', context: 'Gruppo di amici' },
      { quote: 'Asporto puntuale e impasto come si deve. Niente teatro, mestiere vero.', name: 'Pietro L.', context: 'Cliente da tempo' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.pub,
    images: {
      hero: img('photo-1514933651103-005eec06c04b'),
      process: img('photo-1513104890138-7c749659a591'),
      edu: img('photo-1436076863939-06870fe779c2'),
      gallery: [
        { src: img('photo-1513104890138-7c749659a591'), alt: 'Pizza appena sfornata' },
        { src: img('photo-1572116469696-13c68131edcc'), alt: 'Bicchieri di birra al tavolo' },
        { src: img('photo-1436076863939-06870fe779c2'), alt: 'Spine della birra al banco' },
        { src: img('photo-1544148103-0773bf10d330'), alt: 'Bancone del pub di sera' },
      ],
    },
  },

  generic: {
    seoTitle: '{settore} a {citta} ({provincia}) | {nome}',
    metaDescription:
      '{nome}, {settore} a {citta}. {indirizzo}. {rating} su Google, {recensioniLabel} recensioni. Chiama o scrivi per informazioni.',
    eyebrow: '{settore} · {citta}',
    h1: 'Un’attività di {citta} che risponde, spiega e ti riceve senza fretta.',
    lead: 'Siamo in {indirizzo}. Qui trovi chi ti dice cosa si può fare, quanto ci vuole e come prenotare. Niente vetrina vuota: un posto a cui puoi telefonare.',
    heroCaption: 'Un ingresso, un banco, e qualcuno che ti risponde.',
    heroAlt: 'Vetrina di un’attività locale in un centro città',
    nav: [
      { id: 'servizi', label: 'Servizi' },
      { id: 'processo', label: 'Come funziona' },
      { id: 'consigli', label: 'In pratica' },
      { id: 'spazio', label: 'Lo spazio' },
      { id: 'contatti', label: 'Contatti' },
    ],
    ctaPrimary: 'Scrivici',
    ctaSecondary: 'Chiama',
    whatsappText: 'Ciao, vorrei informazioni da {nome} a {citta}.',
    servicesTitle: 'Cosa possiamo fare per te.',
    services: [
      { title: 'Accoglienza e informazioni', text: 'Una telefonata o un passaggio: ti diciamo se possiamo aiutarti e quando.' },
      { title: 'Appuntamenti', text: 'Se serve prenotare, lo facciamo in modo chiaro. Giorno, ora, e cosa portare.' },
      { title: 'Consulenza di base', text: 'Ti spieghiamo le opzioni senza spingere. Decidi tu, informato.' },
      { title: 'Interventi sul posto', text: 'Quello che si può fare qui, si fa qui. Il resto te lo diciamo subito.' },
      { title: 'Preventivi parlati', text: 'Niente listini coperti. Ti diciamo quanto può costare, a grandi linee, prima di partire.' },
      { title: 'Assistenza dopo', text: 'Se qualcosa non torna, si torna a parlare. Un numero che risponde è già un servizio.' },
      { title: 'Per chi è di {citta}', text: 'Clienti di sempre e volti nuovi. Stesse regole, stessa pazienza.' },
      { title: 'Per chi è di passaggio', text: 'Se sei in zona una volta sola, ti diciamo se vale la pena fermarsi adesso.' },
    ],
    processTitle: 'Come si lavora insieme, in quattro passi.',
    processLead: 'Niente procedure da manuale. Quattro cose che succedono sempre, scritte per evitare malintesi.',
    processMeta: [
      { label: 'Primo contatto', value: 'Telefono, WhatsApp o un passaggio in sede.' },
      { label: 'Tempi', value: 'Ti diciamo subito se è per oggi, per questa settimana, o se meglio altrove.' },
    ],
    process: [
      { title: 'Ci racconti cosa ti serve', text: 'Due frasi bastano. Se manca qualcosa, lo chiediamo noi.' },
      { title: 'Ti diciamo se possiamo', text: 'Sì, no, o sì ma non oggi. Meglio una risposta secca che una promessa vuota.' },
      { title: 'Ci accordiamo', text: 'Giorno, orario, cosa portare, quanto può costare. Poi si fa.' },
      { title: 'Chiudiamo e restiamo raggiungibili', text: 'Se dopo serve un ritocco o una domanda, il numero è lo stesso.' },
    ],
    processNote: 'Questa pagina è un’anteprima. Orari e servizi vanno confermati direttamente con l’attività.',
    eduEyebrow: '03 In pratica',
    eduTitle: 'Prima di passare o telefonare.',
    eduLead: 'Quattro cose che fanno risparmiare tempo a tutti. Le scriviamo qui perché al telefono si dimenticano.',
    eduItems: [
      { title: 'Avere il motivo chiaro', text: '“Vorrei informazioni” va bene. “Mi serve X per Y entro Z” va meglio.' },
      { title: 'Orari', text: 'Quelli in pagina sono indicativi. Una telefonata evita la porta chiusa.' },
      { title: 'Documenti e foto', text: 'Se hai già un preventivo, una foto, una prescrizione: portali. Si parte più avanti.' },
      { title: 'Urgenze', text: 'Dillo subito. Se non possiamo, ti indirizziamo: è più utile che farti aspettare.' },
      { title: 'Pagamenti', text: 'Chiedi in sede come si paga. Non inventiamo metodi in una pagina di anteprima.' },
      { title: 'Accessibilità', text: 'Se hai bisogno di un accesso comodo, avvisa: ti diciamo com’è il posto per davvero.' },
    ],
    situationalEyebrow: 'Se sei in zona',
    situationalTitle: 'Sei a {citta} e non sai se vale la pena fermarti?',
    situationalLead: 'Scrivi due righe. Ti rispondiamo se siamo aperti, se possiamo aiutarti ora, o se è meglio un altro orario.',
    situationalSteps: [
      { title: 'Di’ cosa ti serve', text: 'Una frase. Non serve un racconto: serve il motivo della chiamata.' },
      { title: 'Quando puoi passare', text: 'Oggi, domani, la prossima settimana. Cambia la risposta.' },
      { title: 'Un recapito', text: 'Telefono o WhatsApp. Ti richiamiamo noi se stiamo servendo qualcun altro.' },
      { title: 'Aspetta la conferma', text: 'Senza una nostra risposta, non dare per preso l’appuntamento.' },
    ],
    situationalNote: 'Rispondiamo durante l’orario di apertura, di solito nel giro di poco.',
    whyTitle: 'Perché rivolgersi a noi',
    why: [
      { title: 'Rispondiamo', text: 'Un numero vero, di {citta}. Non un form che finisce nel vuoto.' },
      { title: 'Parliamo chiaro', text: 'Cosa si può fare, cosa no, quanto tempo ci vuole.' },
      { title: 'Siamo in sede', text: '{indirizzo}. Si può passare, non solo scrivere.' },
      { title: 'Niente promesse da brochure', text: 'Questa è un’anteprima. Quello che conta è quello che ti diciamo al telefono.' },
    ],
    galleryTitle: 'Uno spazio di {citta}, da vedere di persona.',
    formTitle: 'Chiedi informazioni o un appuntamento.',
    formLead: 'Il modulo è dimostrativo e non invia dati a un server. Per confermare, chiama o scrivi su WhatsApp.',
    formSubmit: 'Invia richiesta',
    formFields: [
      { name: 'nome', label: 'Nome e cognome', type: 'text', required: true },
      { name: 'telefono', label: 'Telefono', type: 'tel', required: true },
      {
        name: 'tipo',
        label: 'Motivo',
        type: 'select',
        required: true,
        options: ['Informazioni', 'Appuntamento', 'Preventivo', 'Altro'],
      },
      { name: 'quando', label: 'Preferenza giorno', type: 'text' },
      { name: 'note', label: 'Messaggio', type: 'text', span: 2 },
    ],
    reviewsTitle: '{rating} su Google, {recensioniLabel} recensioni.',
    reviews: [
      { quote: 'Mi hanno risposto subito e spiegato cosa potevano fare. Niente giri di parole.', name: 'Giulia M.', context: 'Da {citta}' },
      { quote: 'Appuntamento tenuto, tempi rispettati. Si vede che lavorano sul serio.', name: 'Marco T.', context: 'Di passaggio' },
      { quote: 'Tornerei. Si sta da persone, non da pratica da sbrigare.', name: 'Anna R.', context: 'Cliente' },
    ],
    hoursTitle: 'Ci trovi in {indirizzo}, {citta}.',
    hours: HOURS.generic,
    images: {
      hero: img('photo-1441986300917-64674bd600d8'),
      process: img('photo-1497366216548-37526070297c'),
      edu: img('photo-1529333166437-7750a6dd5a70'),
      gallery: [
        { src: img('photo-1441986300917-64674bd600d8'), alt: 'Vetrina di un negozio in città' },
        { src: img('photo-1497366216548-37526070297c'), alt: 'Interno luminoso di un’attività' },
        { src: img('photo-1529333166437-7750a6dd5a70'), alt: 'Persone che parlano a un tavolo' },
        { src: img('photo-1486312338219-ce68d2c6f44d'), alt: 'Persona al lavoro al bancone' },
      ],
    },
  },
}


function resolveTheme(key) {
  if (key === 'veterinaria' || key === 'bar' || key === 'pub') return 'trade'
  return 'editorial'
}

const TRADE_URGENCY = {
  veterinaria: { label: 'È urgente?', yes: 'Sì, non sta bene', no: 'No, posso aspettare' },
  bar: { label: 'Per stasera?', yes: 'Sì, stasera', no: 'Un altro giorno' },
  pub: { label: 'Per stasera?', yes: 'Sì, stasera', no: 'Un altro giorno' },
}

function resolveKey(business) {
  const s = String(business.settore || '').toLowerCase()
  const c = String(business.categoria || '').toLowerCase()
  if (s.includes('veterinar') || c.includes('veterinar')) return 'veterinaria'
  if (s.includes('gelat')) return 'gelateria'
  if (s.includes('pastic')) {
    if (c.includes('gelat')) return 'pasticceria_gelato'
    return 'pasticceria'
  }
  if (c.includes('gelat') && (s.includes('pastic') || s.includes('bar') || s.includes('dolc'))) {
    return 'pasticceria_gelato'
  }
  if (s.includes('ristor') || c.includes('ristor')) {
    if (c.includes('pesc') || c.includes('mare') || s.includes('pesc')) return 'ristorazione_pesce'
    return 'ristorazione'
  }
  if (s.includes('pub') || s.includes('birr') || c.includes('pub') || c.includes('birr')) return 'pub'
  if (s.includes('bar') || s.includes('caffet') || c.includes('bar') || c.includes('caffet')) return 'bar'
  return 'generic'
}

export function buildContent(business) {
  const b = business || {}
  const recensioniLabel = formatReviews(b.recensioni)
  const ctx = {
    nome: b.nome || 'Attività locale',
    settore: b.settore || 'Attività locale',
    categoria: b.categoria || b.settore || 'Attività locale',
    citta: b.citta || '',
    provincia: b.provincia || '',
    indirizzo: b.indirizzo || '',
    cap: b.cap || '',
    telefono: b.telefono || '',
    rating: b.rating || '',
    recensioni: b.recensioni || '',
    recensioniLabel: recensioniLabel || String(b.recensioni || ''),
  }
  const key = resolveKey(b)
  const pack = PACKS[key] || PACKS.generic
  const copy = fill(pack, ctx)
  const address = addressLine(b)
  const displayName = shortName(b.nome)

  return {
    key,
    displayName,
    address,
    seoTitle: copy.seoTitle,
    metaDescription: copy.metaDescription,
    eyebrow: copy.eyebrow,
    h1: copy.h1,
    lead: copy.lead,
    heroCaption: copy.heroCaption,
    heroAlt: copy.heroAlt,
    nav: copy.nav,
    ctaPrimary: copy.ctaPrimary,
    ctaSecondary: copy.ctaSecondary,
    whatsappText: copy.whatsappText,
    servicesTitle: copy.servicesTitle,
    services: copy.services,
    processTitle: copy.processTitle,
    processLead: copy.processLead,
    processMeta: copy.processMeta,
    process: copy.process,
    processNote: copy.processNote,
    eduEyebrow: copy.eduEyebrow,
    eduTitle: copy.eduTitle,
    eduLead: copy.eduLead,
    eduItems: copy.eduItems,
    situationalEyebrow: copy.situationalEyebrow,
    situationalTitle: copy.situationalTitle,
    situationalLead: copy.situationalLead,
    situationalSteps: copy.situationalSteps,
    situationalNote: copy.situationalNote,
    whyTitle: copy.whyTitle,
    why: copy.why,
    galleryTitle: copy.galleryTitle,
    formTitle: copy.formTitle,
    formLead: copy.formLead,
    formSubmit: copy.formSubmit,
    formFields: copy.formFields,
    reviewsTitle: copy.reviewsTitle,
    reviews: copy.reviews,
    hoursTitle: copy.hoursTitle,
    hours: copy.hours,
    images: copy.images,
    theme: resolveTheme(key),
    formUrgency: TRADE_URGENCY[key] || null,
    reviewsCount: recensioniLabel,
    legalLine: [b.nome, address, b.telefono].filter(Boolean).join(' · '),
    footerCredit: 'Anteprima realizzata da diValore Studio — divalore.studio',
    formDemoNote:
      'Anteprima dimostrativa: il modulo non invia dati a un server. Per confermare, chiama o scrivi su WhatsApp.',
    reviewsNote: 'Testimonianze di esempio per l’anteprima, da sostituire con le recensioni reali del profilo Google.',
    hoursNote: 'Orari indicativi da confermare con l’attività.',
  }
}

export { formatReviews, shortName, addressLine, resolveKey }
