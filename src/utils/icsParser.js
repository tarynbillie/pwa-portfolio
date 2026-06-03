function parseDateTime(raw) {
  if (!raw) return null
  const str = raw.trim()

  // All-day: YYYYMMDD
  if (/^\d{8}$/.test(str)) {
    return {
      date: new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}T00:00:00`),
      isAllDay: true,
    }
  }

  // Date-time: YYYYMMDDTHHMMSS[Z]
  if (/^\d{8}T\d{6}Z?$/.test(str)) {
    const d = `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}T${str.slice(9,11)}:${str.slice(11,13)}:${str.slice(13,15)}${str.endsWith('Z') ? 'Z' : ''}`
    return { date: new Date(d), isAllDay: false }
  }

  return null
}

export function parseICS(text) {
  // Unfold RFC 5545 continuation lines
  const unfolded = text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '')
  const events = []
  const blocks = unfolded.split('BEGIN:VEVENT')

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i]

    const get = (key) => {
      const m = block.match(new RegExp(`^${key}(?:;[^:]*)*:(.+)$`, 'm'))
      return m ? m[1].trim() : null
    }

    const rawStart = block.match(/^DTSTART(?:;[^:]*)*:(.+)$/m)?.[1]?.trim()
    const rawEnd   = block.match(/^DTEND(?:;[^:]*)*:(.+)$/m)?.[1]?.trim()
    const status   = get('STATUS') || 'CONFIRMED'
    const hasAlarm = block.includes('BEGIN:VALARM')
    const summary  = (get('SUMMARY') || '')
      .replace(/\\n/g, ' ')
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .replace(/\\\\/g, '\\')

    if (status === 'CANCELLED') continue

    const startParsed = parseDateTime(rawStart)
    if (!startParsed) continue

    const endParsed = parseDateTime(rawEnd)
    const { date: start, isAllDay } = startParsed
    const end = endParsed?.date ?? start
    const durationHours = isAllDay ? 0 : Math.max(0, (end - start) / 3_600_000)

    events.push({ summary, start, end, isAllDay, durationHours, hasAlarm })
  }

  return events
}
