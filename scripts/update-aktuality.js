const fs = require('fs/promises')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')

const RSS_URL = 'https://financnisprava.gov.cz/cs/rss/rss-novinky'
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'aktuality.json')
const MAX_ITEMS = 12
const RECENT_DAYS = 60

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
    .replace(/\s+/g, ' ')
    .trim()
}

function parsePubDate(pubDate) {
  const normalized = pubDate
    .replace(/\s*\.\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const match = normalized.match(/^(\d{1,2})\s+(\d{1,2})\s+(\d{4})/) || []
  if (match.length === 4) {
    const [, day, month, year] = match
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
  }

  const parsed = new Date(pubDate)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

function getExcerpt(text, maxLength = 320) {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  const cut = trimmed.slice(0, maxLength)
  return `${cut.replace(/\s+[^\s]*$/, '')}…`
}

function parseRss(xml) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    parseTagValue: false,
    trimValues: true,
  })
  const data = parser.parse(xml)
  const items = (((data || {}).rss || {}).channel || {}).item || []
  const normalizedItems = Array.isArray(items) ? items : [items]

  return normalizedItems.map((item) => {
    const title = item.title || ''
    const rawDescription = item.description || ''
    const description = htmlToText(rawDescription)
    const pubDate = item.pubDate || ''
    const link = item.link || ''
    const excerpt = getExcerpt(description)
    const date = parsePubDate(pubDate)

    return title && link
      ? {
          title: title.trim(),
          description: excerpt || 'Aktualita z RSS feedu Finanční správy.',
          date: date.toISOString(),
          link: link.trim(),
          source: 'Finanční správa',
        }
      : null
  }).filter(Boolean)
}

function isRecentDate(date) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - RECENT_DAYS)
  return date >= cutoff
}

async function updateAktuality() {
  console.log('Stahuji RSS feed z Finanční správy...')
  const response = await fetch(RSS_URL, {
    headers: {
      'User-Agent': 'mzda-dane-next/1.0',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
  })

  if (!response.ok) {
    throw new Error(`RSS feed se nepodařilo načíst: ${response.status} ${response.statusText}`)
  }

  const xml = await response.text()
  const items = parseRss(xml)
    .map((item) => ({ ...item, parsedDate: new Date(item.date) }))
    .filter((item) => !Number.isNaN(item.parsedDate.getTime()) && isRecentDate(item.parsedDate))
    .sort((a, b) => b.parsedDate - a.parsedDate)
    .slice(0, MAX_ITEMS)
    .map(({ parsedDate, ...item }) => item)

  if (items.length === 0) {
    throw new Error('RSS feed neobsahuje žádné aktuální položky.')
  }

  const output = JSON.stringify(items, null, 2)
  await fs.writeFile(OUTPUT_FILE, output, 'utf8')
  console.log(`Aktuality uloženy do ${OUTPUT_FILE} (${items.length} položek).`)
}

updateAktuality().catch((error) => {
  console.error('Chyba při generování aktualit:', error)
  process.exit(1)
})
