export const CATEGORY_CONFIG = {
  kids:      { label: 'Kids & Activities', color: '#f59e0b' },
  health:    { label: 'Health',            color: '#10b981' },
  work:      { label: 'Work',              color: '#3b82f6' },
  social:    { label: 'Social',            color: '#ec4899' },
  personal:  { label: 'Personal',          color: '#8b5cf6' },
  breathing: { label: 'Breathing Room',    color: '#0ea5e9' },
  task:      { label: 'Tasks',             color: '#f97316' },
}


const KEYWORDS = {
  kids:   ['school','daycare','kindergarten','camp','soccer','dance','swim','class','lesson',
           'practice','recital','pickup','drop off','drop-off','sitter','nanny','playdate','play date'],
  health: ['doctor','dentist','physio','therapy','therapist','clinic','hospital','vaccine',
           'checkup','check-up','appointment','optometrist','chiro'],
  work:   ['meeting','standup','stand-up','1:1','sync','interview','review','sprint',
           'retro','planning','all hands','work'],
  social: ['dinner','lunch','coffee','drinks','party','birthday','anniversary','wedding',
           'visit','brunch','date night'],
}

const ANON = {
  kids:     ['Kids Activity','School','Kids'],
  health:   ['Health Appointment','Wellness','Appointment'],
  work:     ['Work','Meeting','Work Block'],
  social:   ['Plans','Social','Together Time'],
  personal: ['Personal','Me Time'],
  task:     ['Task','Reminder','To-do'],
}

function getCategory(event) {
  if (event.isAllDay || event.durationHours === 0) return 'task'
  const t = event.summary.toLowerCase()
  for (const [cat, kws] of Object.entries(KEYWORDS)) {
    if (kws.some(kw => t.includes(kw))) return cat
  }
  return 'personal'
}

function anonLabel(cat) {
  const opts = ANON[cat] || ['Other']
  return opts[Math.floor(Math.random() * opts.length)]
}

export function categorizeEvents(events) {
  return events.map(e => {
    const category = getCategory(e)
    return { ...e, category, displayLabel: anonLabel(category) }
  })
}

function countDays(dates) {
  let weekdays = 0, weekends = 0
  dates.forEach(d => {
    const day = d.getDay()
    if (day === 0 || day === 6) weekends++
    else weekdays++
  })
  return { weekdays, weekends }
}

export function getWeekStats(events, weekStart, weekEnd, dailyBuffer = 0) {
  const start = new Date(weekStart); start.setHours(0,0,0,0)
  const end   = new Date(weekEnd);   end.setHours(23,59,59,999)

  const weekEvents = events.filter(e => e.start >= start && e.start <= end)

  const hours = {}
  Object.keys(CATEGORY_CONFIG).forEach(c => { hours[c] = 0 })

  weekEvents.forEach(e => {
    if (e.durationHours > 0) {
      hours[e.category] = (hours[e.category] || 0) + Math.min(e.durationHours, 12)
    } else if (e.isAllDay) {
      hours[e.category] = (hours[e.category] || 0) + 1
    }
  })

  const msPerDay = 86_400_000
  const totalDays = Math.round((end - start) / msPerDay) + 1
  const dates = Array.from({ length: totalDays }, (_, i) => new Date(start.getTime() + i * msPerDay))
  const { weekdays, weekends } = countDays(dates)

  hours.work = (hours.work || 0) + weekdays * 8
  const routineHours    = totalDays * dailyBuffer
  const calendarHours   = Object.values(hours).reduce((s, v) => s + v, 0)
  const availableHours  = totalDays * 14
  const openHours       = Math.max(0, availableHours - routineHours - calendarHours)
  const taskCount       = weekEvents.filter(e => e.isAllDay).length

  return { hours, weekEvents, openHours, availableHours, routineHours, calendarHours, taskCount }
}

export function getMonthStats(events, year, month, dailyBuffer = 0) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthEvents = events.filter(e =>
    e.start.getFullYear() === year && e.start.getMonth() === month
  )

  const hours = {}
  Object.keys(CATEGORY_CONFIG).forEach(c => { hours[c] = 0 })

  monthEvents.forEach(e => {
    if (e.durationHours > 0) {
      hours[e.category] = (hours[e.category] || 0) + Math.min(e.durationHours, 12)
    } else if (e.isAllDay) {
      hours[e.category] = (hours[e.category] || 0) + 1
    }
  })

  const dates = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  const { weekdays, weekends } = countDays(dates)

  hours.work = (hours.work || 0) + weekdays * 8
  const routineHours    = daysInMonth * dailyBuffer
  const calendarHours   = Object.values(hours).reduce((s, v) => s + v, 0)
  const committedHours  = routineHours + calendarHours
  const availableHours  = daysInMonth * 14
  const openHours       = Math.max(0, availableHours - routineHours - calendarHours)

  return { hours, monthEvents, openHours, availableHours, routineHours, calendarHours, committedHours }
}
