import fs from 'fs'

const url = 'https://financnisprava.gov.cz/cs/rss/rss-novinky'

async function run() {
  const res = await fetch(url)
  const xml = await res.text()
  const items = xml.match(/<item\b[^>]*>[\s\S]*?<\/item>/gi) || []
  console.log('items', items.length)
  if (items.length > 0) {
    const item = items[0]
    const extract = (tag) => {
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i')
      const m = item.match(regex)
      return m ? m[1].trim() : ''
    }
    console.log('title:', extract('title'))
    console.log('link:', extract('link'))
    console.log('pubDate:', extract('pubDate'))
    console.log('description:', extract('description').slice(0,150))
  }
}

run().catch((err) => { console.error(err); process.exit(1) })
