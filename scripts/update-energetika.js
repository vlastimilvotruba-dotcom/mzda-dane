const fs = require('fs/promises')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')

// Zdroje: hybrid.cz (česky) + electrek.co (anglicky, překládá se přes DeepL)
const SOURCES = [
  { url: 'https://www.hybrid.cz/feed/', name: 'Hybrid.cz', language: 'cs', maxItems: 10 },
  { url: 'https://electrek.co/feed/', name: 'Electrek', language: 'en', maxItems: 5 },
]

const OUTPUT_FILE = path.join(process.cwd(), 'data', 'energetika.json')
const MAX_TOTAL = 15
const RECENT_DAYS = 45
// MyMemory – zcela zdarma, bez registrace, bez kreditní karty
// Limit: 1 000 req/den (stačí na cca 100 spuštění scriptu denně)
const MYMEMORY_URL = 'https://api.mymemory.translated.net/get'

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;|&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getExcerpt(text, maxLength = 280) {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  const cut = trimmed.slice(0, maxLength)
  return `${cut.replace(/\s+[^\s]*$/, '')}…`
}

function parseRss(xml, sourceName, language, maxItems) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    parseTagValue: false,
    trimValues: true,
  })
  const data = parser.parse(xml)
  const items = (((data || {}).rss || {}).channel || {}).item || []
  const normalizedItems = Array.isArray(items) ? items : [items]

  return normalizedItems
    .slice(0, maxItems * 3) // vezmi víc a pak filtruj podle data
    .map((item) => {
      const title = htmlToText(item.title || '')
      const rawDescription = item.description || ''
      const description = htmlToText(rawDescription)
      const pubDate = item.pubDate || ''
      const link = (item.link || '').trim()
      const excerpt = getExcerpt(description)
      const date = new Date(pubDate)
      const parsedDate = Number.isNaN(date.getTime()) ? new Date() : date

      if (!title || !link) return null

      const result = {
        title,
        description: excerpt || `Aktualita ze zdroje ${sourceName}.`,
        date: parsedDate.toISOString(),
        link,
        source: sourceName,
        language,
      }

      // Pro EN články si pamatujeme originální znění (zobrazí se jako tooltip/poznámka)
      if (language === 'en') {
        result.originalTitle = title
        result.originalDescription = excerpt
      }

      return result
    })
    .filter(Boolean)
}

/**
 * Automaticky přiřadí tagy podle klíčových slov v titulku a popisu.
 * Tagy se ukládají přímo do JSON – filtry na stránce pak fungují bez ručního komentáře.
 */
function autoTag(title, description) {
  // Odstraň atribuci zdroje z popisu (např. "first appeared on Hybrid.cz") před analýzou
  const cleanDesc = description.replace(/first appeared on \S+/gi, '').replace(/the post .+? first appeared/gi, '')
  const text = `${title} ${cleanDesc}`.toLowerCase()
  const tags = []

  if (/elektromobil|\bbev\b|electric.vehicle|\bev\b|elektrick|elektroauto|elektrick[áýé]|auto.na.elektrick|battery.electric|pure.electric/.test(text)) {
    tags.push('Elektromobily')
  }
  if (/\bfve\b|fotovoltaik|solár|solar|photovoltaic|sluneční panel|střídač|\binverter\b|panel na střeše|rooftop/.test(text)) {
    tags.push('FVE & Solár')
  }
  if (/nabíj|dobíj|\bcharging\b|charger|nabíjecí|dobíjecí|\bafir\b|wallbox|\bccs\b|chademo|rychlonabíj|charging.station|charge.point/.test(text)) {
    tags.push('Nabíjení')
  }
  if (/\bhybrid|\bphev\b|\bmhev\b|\bhev\b|vodík|hydrogen|fuel.cell|palivový článek/.test(text)) {
    tags.push('Hybridy')
  }
  if (/cena.energ|energy.price|fuel.cost|tarif|úspora|savings|palivo|ceny.elektř|price.of.electric|moneymaker|save.*million|million.*fuel|home.battery|domácí.bater|battery.*grid|grid.*battery/.test(text)) {
    tags.push('Ceny energií')
  }
  if (/\beu\b|europ|registrace|statistik|\bcdv\b|čínsk|chinese|china|beijing|auto.show|trh.s.nov|nových.aut.v/.test(text)) {
    tags.push('EU trh')
  }

  // Pokud nic nezapadá, přiřaď alespoň Elektromobily pro Electrek (většina jejich obsahu)
  if (tags.length === 0) {
    tags.push('Elektromobily')
  }

  return tags
}

/**
 * Automaticky vygeneruje krátký redakční komentář v češtině.
 * Extrahuje konkrétní čísla z článku (%, miliony) aby byl komentář specifický.
 * Manuální zápis v energetika-comments.json má vždy přednost.
 */
function generateAutoComment(item) {
  const tags = item.tags || []
  const text = `${item.title} ${item.description}`

  // Extrahuj první procento z textu (např. "32,5 %" nebo "41 %")
  const percentMatch = text.match(/(\d+[,.]\d+|\d+)\s*%/)
  const percent = percentMatch ? percentMatch[0].replace(',', ',\u202f').trim() : null

  // Extrahuj velkou peněžní částku (např. "400 million", "400 milionů")
  const millionMatch = text.match(/(\d+[,.]?\d*)\s*(million|miliard|milion|mld)/i)
  const bigNum = millionMatch ? `${millionMatch[1]} ${millionMatch[2].toLowerCase()}` : null

  // Je článek přímo relevantní pro ČR?
  const isCzech = item.language === 'cs' || /\bčr\b|česk|prah|brn|orlen|\bpre\b|e\.on|\bčez\b/i.test(text)
  const czNote = isCzech ? 'přímo relevantní pro český trh' : 'trend, který se brzy projeví i v ČR'

  if (tags.includes('FVE & Solár')) {
    const num = percent
      ? `Efektivita nebo úspora ve výši ${percent} odpovídá číslům, která vidíme i u tuzemských instalací.`
      : bigNum
        ? `Ekonomika ve výši ${bigNum} ukazuje, proč se FVE vyplácí – v ČR je návratnost typicky 7–12 let.`
        : 'Instalace FVE v ČR meziročně rostou a díky klesajícím cenám panelů se návratnost zkracuje.'
    return `Fotovoltaika je ${czNote}. ${num} Konkrétní výpočet pro vaši střechu nabídne naše kalkulačka návratnosti FVE.`
  }

  if (tags.includes('Nabíjení')) {
    const num = percent
      ? `Nárůst o ${percent} odpovídá tempu, které vidíme i u provozovatelů sítí v ČR – ORLEN, PRE a E.ON přidávají nové stanice každý měsíc.`
      : 'Sítě ORLEN, PRE a E.ON v ČR rychle rozrůstají – dostupnost rychlonabíječek na dálnicích se v roce 2026 výrazně zlepšila.'
    return `Nabíjecí infrastruktura je ${czNote}. ${num} Celkové náklady na elektromobil včetně nabíjení porovná naše kalkulačka EV vs. spalovák.`
  }

  if (tags.includes('EU trh')) {
    const num = percent
      ? `Podíl ${percent} ukazuje tempo celé EU – ČR zatím mírně zaostává, ale mezera se rok od roku zmenšuje.`
      : 'ČR postupně dohání průměr EU v podílu elektromobilů, data CDV za Q1 2026 to potvrzují.'
    return `Evropský trh je přímým měřítkem i pro ČR. ${num} Nová regulace AFIR od roku 2026 navíc garantuje rychlonabíječe na všech dálničních koridorech EU včetně ČR.`
  }

  if (tags.includes('Hybridy')) {
    const num = percent
      ? `Čísla jako ${percent} potvrzují, že zájem o alternativní pohony trvale roste – i v ČR tvoří PHEV a HEV stále větší podíl registrací.`
      : 'V ČR tvoří PHEV a HEV stále větší podíl nových registrací – nabídka se každý rok rozšiřuje.'
    return `Hybridní pohony jsou pro mnoho českých řidičů přirozeným krokem před přechodem na čistě elektrický provoz. ${num}`
  }

  if (tags.includes('Ceny energií')) {
    const num = percent
      ? `Úspora ${percent} je realistická i pro české domácnosti – klíčem je správné načasování nabíjení nebo výroby při nízkém tarifu.`
      : bigNum
        ? `Ekonomika v řádu ${bigNum} ukazuje, jak zásadní jsou energetické náklady – v ČR platí podobná logika pro majitele FVE i elektromobilů.`
        : 'Aktuální tarify elektřiny v ČR stále dávají ekonomický smysl pro domácí nabíjení, zejména při nízkém tarifu D02d.'
    return `Ceny energií přímo ovlivňují ekonomiku elektromobility i fotovoltaiky. ${num}`
  }

  // Výchozí – Elektromobily
  const num = percent
    ? `Hodnoty jako ${percent} naznačují dynamiku odvětví, které v ČR teprve nabírá tempo.`
    : bigNum
      ? `Čísla v řádu ${bigNum} ukazují, že se v elektromobilitě točí velké peníze – a to tlačí ceny dolů i pro běžné kupující.`
      : 'Výběr modelů dostupných v ČR každým rokem roste a pořizovací ceny postupně klesají.'
  return `Elektromobilita se vyvíjí rychlým tempem – jde o ${czNote}. ${num} Naše kalkulačka EV vs. spalovák vám pomůže porovnat skutečné provozní náklady.`
}

/**
 * Přeloží jeden text EN→CS přes MyMemory API (zdarma, bez registrace).
 * Vrátí původní text pokud překlad selže.
 */
async function translateOne(text) {
  const url = `${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=en|cs`
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'mzda-dane-next/1.0' },
    })
    if (!response.ok) {
      console.warn(`    ⚠ MyMemory ${response.status} – ponechávám originál`)
      return text
    }
    const data = await response.json()
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
    return text
  } catch (err) {
    console.warn(`    ⚠ Chyba překladu: ${err.message} – ponechávám originál`)
    return text
  }
}

/**
 * Přeloží pole textů sekvenčně (MyMemory nemá batch endpoint).
 */
async function translateBatch(texts) {
  const results = []
  for (const text of texts) {
    results.push(await translateOne(text))
  }
  return results
}

async function fetchAndParseRss(source) {
  console.log(`  Stahuji RSS z ${source.name}...`)
  const response = await fetch(source.url, {
    headers: {
      'User-Agent': 'mzda-dane-next/1.0',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
  })

  if (!response.ok) {
    console.warn(`  ⚠ RSS z ${source.name} se nepodařilo načíst: ${response.status} – přeskočeno.`)
    return []
  }

  const xml = await response.text()
  return parseRss(xml, source.name, source.language, source.maxItems)
}

async function updateEnergetika() {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - RECENT_DAYS)

  console.log('Stahuji RSS feedy pro energetiku...')
  // Paralelní stažení obou zdrojů
  const allItemsArrays = await Promise.all(SOURCES.map(fetchAndParseRss))
  let allItems = allItemsArrays.flat()

  // Filtruj podle data
  allItems = allItems.filter((item) => {
    const d = new Date(item.date)
    return !Number.isNaN(d.getTime()) && d >= cutoff
  })

  // Omezení počtu z každého zdroje
  const bySources = {}
  for (const source of SOURCES) {
    bySources[source.name] = allItems
      .filter((item) => item.source === source.name)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, source.maxItems)
  }
  allItems = Object.values(bySources).flat()

  // Přeložení EN článků přes MyMemory (zdarma, bez registrace)
  const enItems = allItems.filter((item) => item.language === 'en')
  if (enItems.length > 0) {
    console.log(`Překládám ${enItems.length} EN článků přes MyMemory...`)
    const titles = enItems.map((item) => item.title)
    const descriptions = enItems.map((item) => item.description)
    const allTexts = [...titles, ...descriptions]

    const translated = await translateBatch(allTexts)
    const translatedTitles = translated.slice(0, titles.length)
    const translatedDescs = translated.slice(titles.length)
    enItems.forEach((item, i) => {
      item.title = translatedTitles[i]
      item.description = translatedDescs[i]
    })
    console.log(`  ✓ Přeloženo ${enItems.length} článků.`)
  }

  // Auto-tagging – přiřaď tagy všem položkám podle klíčových slov
  allItems.forEach((item) => {
    if (!item.tags || item.tags.length === 0) {
      item.tags = autoTag(item.title, item.description)
    }
  })

  // Auto-komentář – vygeneruj redakční komentář v češtině (specifický pro každý článek)
  allItems.forEach((item) => {
    item.autoComment = generateAutoComment(item)
  })
  console.log(`  ✓ Vygenerovány komentáře pro ${allItems.length} článků.`)

  // Seřaď podle data sestupně a ořízni na MAX_TOTAL
  allItems.sort((a, b) => new Date(b.date) - new Date(a.date))
  const result = allItems.slice(0, MAX_TOTAL)

  if (result.length === 0) {
    throw new Error('Žádné aktuální položky z žádného zdroje nenalezeny.')
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8')
  console.log(`✓ Energetika uložena do ${OUTPUT_FILE} (${result.length} položek).`)
  const csCount = result.filter((i) => i.language === 'cs').length
  const enCount = result.filter((i) => i.language === 'en').length
  console.log(`  Z toho: ${csCount} česky (Hybrid.cz), ${enCount} anglicky (Electrek)`)
}

updateEnergetika().catch((error) => {
  console.error('Chyba při generování energetiky:', error)
  process.exit(1)
})
