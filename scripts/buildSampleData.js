import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parseICS } from '../src/utils/icsParser.js'
import { categorizeEvents } from '../src/utils/calendarCategorizer.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const calendarsDir = join(__dirname, '../calendars')
const outFile = join(__dirname, '../src/data/sampleCalendar.json')

const files = readdirSync(calendarsDir).filter(f => f.endsWith('.ics'))
console.log(`Found ${files.length} calendar(s):`)

const allRaw = files.flatMap(file => {
  const text = readFileSync(join(calendarsDir, file), 'utf8')
  const events = parseICS(text)
  console.log(`  ${file}: ${events.length} events`)
  return events
})

const categorized = categorizeEvents(allRaw)

const serialized = categorized.map(e => ({
  summary: e.displayLabel,
  start: e.start.toISOString(),
  end: e.end.toISOString(),
  isAllDay: e.isAllDay,
  durationHours: e.durationHours,
  hasAlarm: e.hasAlarm,
  category: e.category,
  displayLabel: e.displayLabel,
}))

writeFileSync(outFile, JSON.stringify(serialized, null, 2))
console.log(`\nWrote ${serialized.length} anonymized events to src/data/sampleCalendar.json`)
