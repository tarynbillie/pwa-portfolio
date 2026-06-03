import { useState, useRef, Fragment } from 'react'
import { Upload, ChevronLeft, ChevronRight, Clock, ChevronDown } from 'lucide-react'
import { parseICS } from '../utils/icsParser'
import { categorizeEvents, CATEGORY_CONFIG, getMonthStats, getWeekStats } from '../utils/calendarCategorizer'
import sampleData from '../data/sampleCalendar.json'

const SAMPLE_EVENTS = sampleData.map(e => ({
  ...e,
  start: new Date(e.start),
  end: new Date(e.end),
}))

// ── WIP Banner ───────────────────────────────────────────────────────────────

const WIP_ITEMS = [
  'Work in Progress', '✦', 'Prototype', '✦', 'More features coming', '✦',
  'Built with Claude Code', '✦',
]

function WipBanner() {
  const track = [...WIP_ITEMS, ...WIP_ITEMS, ...WIP_ITEMS, ...WIP_ITEMS]
  return (
    <div className="wip-banner" aria-label="Work in progress">
      <div className="wip-track">
        {track.map((item, i) => (
          <span key={i} className={item === '✦' ? 'wip-sep' : 'wip-text'}>{item}</span>
        ))}
      </div>
    </div>
  )
}

// ── Stacked Bar ───────────────────────────────────────────────────────────────

function StackedBar({ segments, available }) {
  return (
    <div className="cc-stack-bar">
      {segments.map(({ label, color, value }) => {
        const pct = available > 0 ? Math.min(100, (value / available) * 100) : 0
        if (pct < 0.5) return null
        return (
          <div
            key={label}
            className="cc-stack-segment"
            style={{ width: `${pct}%`, background: color }}
            title={`${label}: ${Math.round(value)}h`}
          />
        )
      })}
    </div>
  )
}

// ── Upload Screen ─────────────────────────────────────────────────────────────

function UploadScreen({ onLoad }) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState([])
  const [mergedEvents, setMergedEvents] = useState([])
  const inputRef = useRef()

  function handleFiles(files) {
    const icsFiles = Array.from(files).filter(f => f.name.endsWith('.ics'))
    if (icsFiles.length === 0) {
      setError('Please upload .ics files exported from Apple Calendar.')
      return
    }
    setError(null)

    const readers = icsFiles.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        try { resolve({ name: file.name.replace('.ics', ''), events: parseICS(e.target.result) }) }
        catch { reject(file.name) }
      }
      reader.readAsText(file)
    }))

    Promise.all(readers)
      .then(results => {
        const newLoaded = [...loaded, ...results.map(r => r.name)]
        const allRaw = results.flatMap(r => r.events)
        const newMerged = [...mergedEvents, ...allRaw]
        setLoaded(newLoaded)
        setMergedEvents(newMerged)
      })
      .catch(name => setError(`Could not read ${name}. Try exporting again.`))
  }

  return (
    <div className="cc-upload">
      <div className="cc-upload-card">
        <span className="about-eyebrow" style={{ display: 'block', marginBottom: '1.25rem' }}>Prototype</span>
        <h1 className="cc-upload-title">Breathing Room</h1>
        <p className="cc-upload-desc">
          See where your time actually goes — and protect what's left before it disappears.
          Upload your Apple Calendar exports or try with sample data. Event titles are anonymized
          and nothing ever leaves your browser.
        </p>

        <button className="cc-sample-btn" onClick={() => onLoad(SAMPLE_EVENTS)}>
          Try with sample data
        </button>

        <div className="cc-divider"><span>or upload your own</span></div>

        <div
          className={`cc-dropzone${dragging ? ' cc-dropzone--over' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current.click()}
        >
          <input ref={inputRef} type="file" accept=".ics" multiple
            style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
          <Upload size={22} strokeWidth={1.5} />
          <span>Drop one or more <strong>.ics</strong> files here, or click to browse</span>
          {error && <span className="cc-upload-error">{error}</span>}
        </div>

        {loaded.length > 0 && (
          <div className="cc-loaded">
            <p className="cc-loaded-label">{loaded.length} calendar{loaded.length > 1 ? 's' : ''} loaded</p>
            <ul className="cc-loaded-list">
              {loaded.map(name => <li key={name}>{name}</li>)}
            </ul>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => onLoad(categorizeEvents(mergedEvents))}
            >
              View dashboard
            </button>
          </div>
        )}

        <div className="cc-how-to">
          <p className="cc-how-to-label">How to export from Apple Calendar</p>
          <ol className="cc-how-to-list">
            <li>Open <strong>Calendar</strong> on your Mac</li>
            <li>Right-click a calendar in the sidebar → <strong>Export…</strong></li>
            <li>Repeat for each calendar, then drop them all above</li>
          </ol>
        </div>

        <div className="cc-privacy">
          <span>🔒</span>
          <p>Processed entirely in your browser. Nothing is uploaded or stored.
            Event titles are replaced with anonymized labels.</p>
        </div>
      </div>
    </div>
  )
}

// ── Week Row ──────────────────────────────────────────────────────────────────

function WeekRow({ week, allEvents, dailyBuffer }) {
  const [expanded, setExpanded] = useState(false)
  const stats = getWeekStats(allEvents, week.start, week.end, dailyBuffer)
  const endLabel = week.end?.toLocaleDateString('en-CA', { day: 'numeric' }) ?? ''

  const segments = [
    ...Object.entries(CATEGORY_CONFIG)
      .filter(([cat]) => (stats.hours[cat] || 0) > 0)
      .map(([cat, cfg]) => ({ label: cfg.label, color: cfg.color, value: stats.hours[cat] })),
    { label: 'Open', color: '#e5e7eb', value: stats.openHours },
  ]

  return (
    <div className="cc-week-item">
      <div
        className={`cc-week-row${expanded ? ' cc-week-row--open' : ''}`}
        onClick={() => setExpanded(e => !e)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setExpanded(v => !v)}
      >
        <span className="cc-week-label">{week.startLabel} – {endLabel}</span>
        <StackedBar segments={segments} available={stats.availableHours} />
        <ChevronDown size={14} className={`cc-week-chevron${expanded ? ' cc-week-chevron--up' : ''}`} />
      </div>
      {expanded && (
        <div className="cc-week-detail">
          {Object.entries(CATEGORY_CONFIG)
            .filter(([cat]) => cat !== 'task' && (stats.hours[cat] || 0) > 0)
            .map(([cat, cfg]) => (
              <div key={cat} className="cc-week-detail-row">
                <span className="cc-legend-dot" style={{ background: cfg.color }} />
                <span className="cc-week-detail-name">{cfg.label}</span>
                <span className="cc-week-detail-val">{Math.round(stats.hours[cat])}h</span>
              </div>
            ))}
          {stats.taskCount > 0 && (
            <div className="cc-week-detail-row">
              <span className="cc-legend-dot" style={{ background: CATEGORY_CONFIG.task.color }} />
              <span className="cc-week-detail-name">Tasks</span>
              <span className="cc-week-detail-val">{stats.taskCount}</span>
            </div>
          )}
          <div className="cc-week-detail-row cc-week-detail-row--open">
            <span className="cc-legend-dot" style={{ background: '#e5e7eb' }} />
            <span className="cc-week-detail-name">Open</span>
            <span className="cc-week-detail-val">{Math.round(stats.openHours)}h</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Claim Modal ───────────────────────────────────────────────────────────────

function ClaimModal({ allEvents, onClaim, onClose }) {
  const [weekOffset,   setWeekOffset]   = useState(1)   // default to next week
  const [selectedDur,  setSelectedDur]  = useState(1)       // hours | null = custom
  const [customHours,  setCustomHours]  = useState(1.5)
  const [selectedSlot, setSelectedSlot] = useState(null)    // { date, hour }
  const [claimSuccess, setClaimSuccess] = useState(null)

  const effectiveDur = selectedDur ?? customHours

  const today  = new Date()
  const dow    = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1) + weekOffset * 7)
  monday.setHours(0, 0, 0, 0)

  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })

  function handleDurChange(h) {
    setSelectedDur(h)
    setSelectedSlot(null)
  }

  function eventsAtCell(date, slot) {
    const slotStartMin = slot * 60
    const slotEndMin   = slotStartMin + 30
    return allEvents.filter(e => {
      if (e.isAllDay) return false
      const s = e.start
      if (s.getFullYear() !== date.getFullYear() ||
          s.getMonth()    !== date.getMonth()    ||
          s.getDate()     !== date.getDate()) return false
      const evStartMin = s.getHours() * 60 + s.getMinutes()
      const evEndMin   = e.end.getHours() * 60 + e.end.getMinutes()
      return evStartMin < slotEndMin && evEndMin > slotStartMin
    })
  }

  function isWorkCell(date, slot) {
    const d = date.getDay()
    return d !== 0 && d !== 6 && slot >= 9 && slot < 17
  }

  function isPastCell(date, slot) {
    const h = Math.floor(slot)
    const m = Math.round((slot % 1) * 60)
    const t = new Date(date); t.setHours(h, m, 0, 0)
    return t < new Date()
  }

  function isAvailSlot(date, slot) {
    if (isPastCell(date, slot))     return false
    if (slot + effectiveDur > 22)   return false
    const steps = Math.ceil(effectiveDur / 0.5)
    for (let i = 0; i < steps; i++) {
      const s = slot + i * 0.5
      if (isWorkCell(date, s))          return false
      if (eventsAtCell(date, s).length) return false
    }
    return true
  }

  function handleClaim() {
    if (!selectedSlot) return
    const { date, slot }  = selectedSlot
    const startH  = Math.floor(slot)
    const startM  = Math.round((slot % 1) * 60)
    const endSlot = slot + effectiveDur
    const endH    = Math.floor(endSlot)
    const endM    = Math.round((endSlot % 1) * 60)
    const start   = new Date(date); start.setHours(startH, startM, 0, 0)
    const end     = new Date(date); end.setHours(endH, endM, 0, 0)
    onClaim({
      summary: 'Breathing Room', start, end,
      isAllDay: false, durationHours: effectiveDur,
      hasAlarm: false, category: 'breathing',
      displayLabel: 'Breathing Room', isClaimed: true,
    })
    setClaimSuccess({ date, slot, dur: effectiveDur })
    setTimeout(onClose, 1800)
  }

  const weekLabel = `${weekDays[0].toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} – ${weekDays[4].toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}`

  return (
    <div className="cc-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cc-modal" role="dialog" aria-modal="true">

        {/* Header */}
        <div className="cc-modal-header">
          <div className="cc-modal-title-row">
            <h3 className="cc-modal-title">Find breathing room</h3>
            <button className="cc-modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="cc-modal-controls">
            <div>
              <div className="cc-dur-row">
                {DURATION_OPTIONS.map(({ label, hours }) => (
                  <button
                    key={label}
                    className={`cc-dur-btn${selectedDur === hours ? ' cc-dur-btn--on' : ''}`}
                    onClick={() => handleDurChange(hours)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {selectedDur === null && (
                <div className="cc-custom-dur">
                  <input
                    type="number"
                    min={0.5} max={8} step={0.5}
                    value={customHours}
                    onChange={e => {
                      const v = Math.max(0.5, Math.min(8, Number(e.target.value) || 0.5))
                      setCustomHours(v)
                      setSelectedSlot(null)
                    }}
                    className="cc-custom-dur-input"
                    aria-label="Custom duration in hours"
                  />
                  <span className="cc-custom-dur-unit">hrs</span>
                </div>
              )}
            </div>
            <div className="cc-modal-week-nav">
              <button
                className="cc-modal-nav-btn"
                onClick={() => { setWeekOffset(o => o - 1); setSelectedSlot(null) }}
                disabled={weekOffset === 0}
                aria-label="Previous week"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="cc-modal-week-label">{weekLabel}</span>
              <button
                className="cc-modal-nav-btn"
                onClick={() => { setWeekOffset(o => o + 1); setSelectedSlot(null) }}
                aria-label="Next week"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="cc-modal-grid-wrap">
          <div className="cc-grid">
            <div className="cc-grid-corner" />
            {weekDays.map(d => (
              <div key={d.toDateString()} className="cc-grid-day-header">
                <span className="cc-grid-day-name">
                  {d.toLocaleDateString('en-CA', { weekday: 'short' })}
                </span>
                <span className="cc-grid-day-num">{d.getDate()}</span>
              </div>
            ))}

            {GRID_SLOTS.map(slot => (
              <Fragment key={slot}>
                <div className="cc-grid-time">
                  {slot % 1 === 0 ? formatHour(slot) : ''}
                </div>
                {weekDays.map(date => {
                  const cellEvs   = eventsAtCell(date, slot)
                  const work      = isWorkCell(date, slot)
                  const past      = isPastCell(date, slot)
                  const isClaimed = cellEvs.some(e => e.isClaimed)
                  const inBlock   = selectedSlot
                    && selectedSlot.date.toDateString() === date.toDateString()
                    && slot >= selectedSlot.slot
                    && slot < selectedSlot.slot + effectiveDur
                  const isStart   = inBlock && slot === selectedSlot.slot
                  const avail     = !work && !past && !inBlock && cellEvs.length === 0
                    && isAvailSlot(date, slot)
                  const evColor   = cellEvs.length
                    ? CATEGORY_CONFIG[cellEvs[0].category]?.color : null
                  const clickable = (avail || inBlock) && !past

                  let cls = 'cc-grid-cell'
                  if (past)             cls += ' cc-grid-cell--past'
                  if (work)             cls += ' cc-grid-cell--work'
                  else if (isClaimed)   cls += ' cc-grid-cell--claimed'
                  else if (inBlock)     cls += isStart ? ' cc-grid-cell--selected' : ' cc-grid-cell--selected-cont'
                  else if (cellEvs.length) cls += ' cc-grid-cell--event'
                  else if (avail)       cls += ' cc-grid-cell--avail'

                  return (
                    <div
                      key={`${date.toDateString()}-${slot}`}
                      className={cls}
                      style={evColor && !isClaimed && !inBlock ? { background: `${evColor}28` } : undefined}
                      onClick={clickable ? () => setSelectedSlot(inBlock ? null : { date, slot }) : undefined}
                      title={avail ? `Select ${formatDur(effectiveDur)} at ${formatHour(slot)}` : undefined}
                    />
                  )
                })}
              </Fragment>
            ))}
          </div>

          <div className="cc-grid-legend">
            <div className="cc-grid-legend-item">
              <span className="cc-grid-legend-dot" style={{ background: '#d1fae5' }} />
              Available
            </div>
            <div className="cc-grid-legend-item">
              <span className="cc-grid-legend-dot" style={{ background: '#0ea5e933' }} />
              Selected
            </div>
            <div className="cc-grid-legend-item">
              <span className="cc-grid-legend-dot" style={{ background: 'var(--surface)' }} />
              Work block
            </div>
            <div className="cc-grid-legend-item">
              <span className="cc-grid-legend-dot" style={{ background: '#3b82f628', border: '1px solid #d1d5db' }} />
              Scheduled
            </div>
          </div>
        </div>

        {/* Confirm footer */}
        <div className="cc-modal-footer">
          {claimSuccess ? (
            <p className="cc-modal-success">
              {formatDur(claimSuccess.dur)} on{' '}
              {claimSuccess.date.toLocaleDateString('en-CA', {
                weekday: 'long', month: 'long', day: 'numeric',
              })}{' '}
              at {formatHour(claimSuccess.slot)} — it's yours.
            </p>
          ) : selectedSlot ? (
            <div className="cc-modal-confirm">
              <p className="cc-modal-confirm-text">
                {formatDur(effectiveDur)} on{' '}
                <strong>
                  {selectedSlot.date.toLocaleDateString('en-CA', {
                    weekday: 'short', month: 'short', day: 'numeric',
                  })}
                </strong>
                {' '}at <strong>{formatHour(selectedSlot.slot)}</strong>
              </p>
              <div className="cc-modal-confirm-btns">
                <button className="cc-modal-clear-btn" onClick={() => setSelectedSlot(null)}>
                  Clear
                </button>
                <button className="btn btn-primary" onClick={handleClaim}>
                  Claim this time
                </button>
              </div>
            </div>
          ) : (
            <p className="cc-modal-hint">Select a highlighted slot above</p>
          )}
        </div>

      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const MONTHS = ['January','February','March','April','May','June','July','August',
  'September','October','November','December']

const DURATION_OPTIONS = [
  { label: '30 min',   hours: 0.5 },
  { label: '1 hr',     hours: 1   },
  { label: '2 hrs',    hours: 2   },
  { label: 'Half day', hours: 4   },
  { label: 'Full day', hours: 8   },
  { label: 'Custom',   hours: null },
]

const GRID_SLOTS = Array.from({ length: 28 }, (_, i) => i * 0.5 + 8) // 8:00–9:30pm in 30-min steps

function formatHour(h) {
  const wh   = Math.floor(h)
  const mins = Math.round((h % 1) * 60)
  const ampm = wh < 12 ? 'am' : 'pm'
  const disp = wh === 0 || wh === 12 ? 12 : wh > 12 ? wh - 12 : wh
  return mins ? `${disp}:${String(mins).padStart(2, '0')}${ampm}` : `${disp}${ampm}`
}

function formatDur(h) {
  if (h === 0.5) return '30 min'
  if (h === 1)   return '1 hr'
  if (h % 1 !== 0) return `${Math.floor(h)}h ${Math.round((h % 1) * 60)}min`
  return `${h}h`
}

function buildWeeks(year, month, events) {
  const days = new Date(year, month + 1, 0).getDate()
  const weeks = []
  let current = null

  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d)
    if (!current || date.getDay() === 0) {
      if (current) weeks.push(current)
      current = {
        start: date,
        startLabel: date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
        hours: 0, end: null,
      }
    }
    current.hours += events
      .filter(e => !e.isTask && e.start.getFullYear() === year
        && e.start.getMonth() === month && e.start.getDate() === d)
      .reduce((s, e) => s + e.durationHours, 0)
    current.end = date
  }
  if (current) weeks.push(current)
  return weeks
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ events, onReset }) {
  const now = new Date()
  const [year, setYear]               = useState(now.getFullYear())
  const [month, setMonth]             = useState(now.getMonth())
  const [dailyBuffer, setDailyBuffer] = useState(2)
  const [claimed, setClaimed]           = useState([])
  const [showClaimModal, setShowClaimModal] = useState(false)

  const allEvents = [...events, ...claimed]
  const { monthEvents, committedHours, openHours, hours: monthHours, availableHours } = getMonthStats(allEvents, year, month, dailyBuffer)

  function exportSampleData() {
    const data = allEvents.map(e => ({
      summary: e.summary,
      start: e.start.toISOString(),
      end: e.end.toISOString(),
      isAllDay: e.isAllDay,
      durationHours: e.durationHours,
      hasAlarm: e.hasAlarm,
      category: e.category,
      displayLabel: e.displayLabel,
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-calendar.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
  }

  const weeks = buildWeeks(year, month, allEvents)
  const taskCount  = monthEvents.filter(e => e.isTask).length
  const eventCount = monthEvents.filter(e => !e.isTask).length

  const monthSegments = [
    ...Object.entries(CATEGORY_CONFIG)
      .filter(([cat]) => (monthHours[cat] || 0) > 0)
      .map(([cat, cfg]) => ({ label: cfg.label, color: cfg.color, value: monthHours[cat] })),
    { label: 'Open', color: '#e5e7eb', value: openHours },
  ]

  return (
    <div className="cc-dashboard">

      <div className="cc-dash-header">
        <div className="cc-dash-header-inner">
          <div className="cc-dash-left">
            <span className="cc-eyebrow">Breathing Room</span>
            <div className="cc-month-nav">
              <button className="cc-nav-btn" onClick={prevMonth}><ChevronLeft size={16} /></button>
              <h2 className="cc-month-title">{MONTHS[month]} {year}</h2>
              <button className="cc-nav-btn" onClick={nextMonth}><ChevronRight size={16} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="cc-export" onClick={exportSampleData}>Export sample data</button>
            <button className="cc-reset" onClick={onReset}>Load new calendar</button>
          </div>
        </div>
      </div>

      <div className="cc-dash-body">

        {/* Month overview */}
        <div className="cc-overview">
          <div className="cc-summary-row">
            <div className="cc-summary-stat">
              <span className="cc-summary-num">{eventCount}</span>
              <span className="cc-summary-label">events</span>
            </div>
            <div className="cc-summary-stat">
              <span className="cc-summary-num">{taskCount}</span>
              <span className="cc-summary-label">tasks</span>
            </div>
            <div className="cc-summary-stat">
              <span className="cc-summary-num">{Math.round(committedHours)}h</span>
              <span className="cc-summary-label">committed</span>
            </div>
            <div className="cc-summary-stat">
              <span className="cc-summary-num">{Math.round(openHours)}h</span>
              <span className="cc-summary-label">open</span>
            </div>
          </div>

          <StackedBar segments={monthSegments} available={availableHours} />

          <div className="cc-legend cc-legend--inline">
            {Object.entries(CATEGORY_CONFIG)
              .filter(([cat]) => (monthHours[cat] || 0) > 0)
              .map(([cat, cfg]) => (
                <div key={cat} className="cc-legend-row">
                  <span className="cc-legend-dot" style={{ background: cfg.color }} />
                  <span className="cc-legend-name">{cfg.label}</span>
                  <span className="cc-legend-val">{Math.round(monthHours[cat])}h</span>
                </div>
              ))}
            <div className="cc-legend-row cc-legend-row--open">
              <span className="cc-legend-dot" style={{ background: '#e5e7eb' }} />
              <span className="cc-legend-name">Open</span>
              <span className="cc-legend-val">{Math.round(openHours)}h</span>
            </div>
          </div>

          <div className="cc-buffer">
            <label className="cc-buffer-label">
              Daily routines not in calendar
              <span className="cc-buffer-hint">(daycare, meals, bedtime, etc.)</span>
            </label>
            <div className="cc-buffer-row">
              <input
                type="range" min={0} max={6} step={0.5}
                value={dailyBuffer}
                onChange={e => setDailyBuffer(Number(e.target.value))}
                className="cc-buffer-slider"
              />
              <span className="cc-buffer-val">{dailyBuffer}h/day</span>
            </div>
          </div>
        </div>

        {/* Week breakdown */}
        <div className="cc-weeks">
          <p className="cc-section-label">By week — click to expand</p>
          {weeks.map((w, i) => (
            <WeekRow
              key={i}
              week={w}
              allEvents={allEvents}
              dailyBuffer={dailyBuffer}
            />
          ))}
        </div>

        {/* Claim time */}
        <div className="cc-claim">
          <p className="cc-section-label">Protect time for yourself</p>
          <p className="cc-claim-desc">
            See the actual gaps in your week and lock one in before it disappears.
          </p>
          <button
            className="btn btn-primary cc-claim-go"
            onClick={() => setShowClaimModal(true)}
          >
            <Clock size={14} strokeWidth={2} />
            Find my breathing room
          </button>
          {claimed.length > 0 && (
            <p className="cc-claim-ok">
              {claimed.length} block{claimed.length > 1 ? 's' : ''} protected. Keep going.
            </p>
          )}
        </div>

      </div>

      {showClaimModal && (
        <ClaimModal
          allEvents={allEvents}
          onClaim={e => setClaimed(prev => [...prev, e])}
          onClose={() => setShowClaimModal(false)}
        />
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BreathingRoom() {
  const [events, setEvents] = useState(null)
  return (
    <>
      <WipBanner />
      {events
        ? <Dashboard events={events} onReset={() => setEvents(null)} />
        : <UploadScreen onLoad={setEvents} />}
    </>
  )
}
