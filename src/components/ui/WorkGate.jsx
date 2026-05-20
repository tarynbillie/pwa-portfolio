import { useState } from 'react'

const SESSION_KEY = 'work_unlocked'
const PASSWORD = import.meta.env.VITE_WORK_PASSWORD ?? 'portfolio2026'

export default function WorkGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div className="work-gate">
      <div className="work-gate-inner">
        <span className="work-gate-lock" aria-hidden="true">&#128274;</span>
        <h1 className="work-gate-heading">Protected work</h1>
        <p className="work-gate-body">
          These case studies contain unpublished work from a previous role.
          If you've received a password, enter it below.
        </p>
        <form className="work-gate-form" onSubmit={handleSubmit}>
          <input
            className={`work-gate-input${error ? ' work-gate-input--error' : ''}`}
            type="password"
            placeholder="Enter password"
            value={input}
            autoComplete="current-password"
            onChange={(e) => { setInput(e.target.value); setError(false) }}
          />
          <button className="btn btn-primary" type="submit">
            Unlock
          </button>
        </form>
        {error && (
          <p className="work-gate-error">Incorrect password. Try again.</p>
        )}
        <p className="work-gate-note">
          Don't have the password? Reach out at{' '}
          <a href="mailto:tarynbillie@gmail.com">tarynbillie@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}
