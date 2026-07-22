import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  Box,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  MapPin,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

type Arena = {
  city: string
  members: number
  live: boolean
}

const arenas: Arena[] = [
  { city: 'Antananarivo', members: 284, live: true },
  { city: 'Toamasina', members: 96, live: false },
  { city: 'Mahajanga', members: 63, live: false },
]

const standings = [
  { rank: 1, name: 'TANA-A9F2', score: 982, time: '01:42' },
  { rank: 2, name: 'TANA-K4D8', score: 971, time: '01:56' },
  { rank: 3, name: 'TANA-M7C1', score: 959, time: '02:04' },
  { rank: 4, name: 'TANA-P3X5', score: 947, time: '02:11' },
]

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs].map((n) => String(n).padStart(2, '0')).join(':')
}

function App() {
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 17 * 60 + 42)
  const [selectedArena, setSelectedArena] = useState(arenas[0])
  const [arenaMenuOpen, setArenaMenuOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [joined, setJoined] = useState(false)
  const [notice, setNotice] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((value) => (value > 0 ? value - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const availablePercent = useMemo(() => Math.round((38 / 50) * 100), [])

  const joinArena = () => {
    setJoined(true)
    setInviteOpen(false)
    setNotice(true)
    window.setTimeout(() => setNotice(false), 3200)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Open Arena home">
          <span className="brand-mark"><Zap size={17} strokeWidth={2.8} /></span>
          <span>OPEN<span>ARENA</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="active" href="#live">Live arena</a>
          <a href="#how">How it works</a>
          <a href="#rules">Open rules</a>
        </nav>

        <div className="top-actions">
          <button className="icon-button" aria-label="Notifications" onClick={() => setNotice(true)}>
            <Bell size={19} />
            <span className="notification-dot" />
          </button>
          <button className="profile-button">
            <span className="avatar">R7</span>
            <span className="profile-copy"><b>TANA-R7K4</b><small>Verified player</small></span>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="arena-strip" aria-label="Arena selector">
          <div className="arena-select-wrap">
            <span className="eyebrow">YOUR CITY ARENA</span>
            <button className="arena-select" onClick={() => setArenaMenuOpen((open) => !open)}>
              <MapPin size={18} />
              <span>{selectedArena.city}</span>
              <ChevronDown size={17} />
            </button>
            {arenaMenuOpen && (
              <div className="arena-menu">
                {arenas.map((arena) => (
                  <button key={arena.city} onClick={() => { setSelectedArena(arena); setArenaMenuOpen(false) }}>
                    <span>{arena.city}</span>
                    <small>{arena.live ? 'Live now' : 'Coming soon'}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="arena-pulse"><span /> LIVE · ROUND 07</div>
          <div className="arena-members"><Users size={17} /> {selectedArena.members} local players</div>
        </section>

        <section className="hero-grid" id="live">
          <div className="hero-copy">
            <div className="live-badge"><span /> LIVE PRODUCT CHALLENGE</div>
            <h1>Win the right<br />to buy it <em>first.</em></h1>
            <p className="hero-lead">
              A free, skill-based competition. Use your tools, your team and your edge. The best scores unlock purchase priority.
            </p>
            <div className="open-rule">
              <ShieldCheck size={21} />
              <div><b>Open Class rules</b><span>AI, automation and teamwork are explicitly allowed.</span></div>
              <a href="#rules">View rules <ArrowRight size={15} /></a>
            </div>
          </div>

          <aside className="timer-panel">
            <span className="eyebrow">ROUND CLOSES IN</span>
            <div className="countdown" aria-label={`${formatTime(timeLeft)} remaining`}>
              {formatTime(timeLeft).split(':').map((part, index) => (
                <div key={`${part}-${index}`}><strong>{part}</strong><small>{['HOURS', 'MIN', 'SEC'][index]}</small></div>
              ))}
            </div>
            <button className="primary-button" onClick={() => setInviteOpen(true)}>
              {joined ? <><Check size={19} /> You are registered</> : <>Enter with my coupon <ArrowRight size={19} /></>}
            </button>
            <p><CircleHelp size={15} /> Free entry. Payment only after qualification.</p>
          </aside>
        </section>

        <section className="product-section">
          <div className="product-visual" aria-label="Solar power station product illustration">
            <div className="glow glow-one" />
            <div className="glow glow-two" />
            <div className="product-tag"><Sparkles size={15} /> ARENA EXCLUSIVE</div>
            <div className="power-station">
              <div className="power-handle" />
              <div className="power-face">
                <span className="screen"><small>OUTPUT</small><b>1200<em>W</em></b></span>
                <span className="socket" /><span className="socket" />
                <span className="power-button" />
              </div>
            </div>
            <div className="float-card float-available"><PackageCheck size={18} /><div><b>50 units</b><span>Verified stock</span></div></div>
            <div className="float-card float-city"><MapPin size={18} /><div><b>Antananarivo</b><span>Local allocation</span></div></div>
          </div>

          <div className="product-info">
            <div className="section-kicker">CURRENT DROP · #A-007</div>
            <h2>VoltEdge 1200W<br />Portable Power Station</h2>
            <p>Reliable backup power for daily outages. Local stock, verified arrival and transparent fulfillment.</p>

            <div className="stock-block">
              <div><span>Available purchase rights</span><strong>38 <small>/ 50</small></strong></div>
              <div className="stock-track"><span style={{ width: `${availablePercent}%` }} /></div>
              <small>12 players currently above the qualification line</small>
            </div>

            <div className="price-row">
              <div><span>Fixed purchase price</span><strong>2,480,000 <small>Ar</small></strong></div>
              <span className="money-pill">Mobile Money</span>
            </div>

            <div className="logistics-grid">
              <div><Route size={19} /><span>Estimated departure<b>28 Jul 2026</b></span></div>
              <div><Clock3 size={19} /><span>City arrival window<b>06–09 Aug</b></span></div>
            </div>
          </div>
        </section>

        <section className="content-grid" id="how">
          <div className="challenge-card">
            <div className="card-heading">
              <div><span className="eyebrow">THIS ROUND</span><h3>The Power Route Challenge</h3></div>
              <span className="difficulty">ADVANCED</span>
            </div>
            <p>Build the lowest-risk delivery plan across four checkpoints. Your score combines accuracy, speed and verified reasoning.</p>
            <div className="challenge-metrics">
              <div><Box size={18} /><span><b>4</b> checkpoints</span></div>
              <div><Clock3 size={18} /><span><b>8 min</b> maximum</span></div>
              <div><Trophy size={18} /><span><b>Top 50</b> qualify</span></div>
            </div>
            <button className="secondary-button" onClick={() => setInviteOpen(true)}>{joined ? 'Continue challenge' : 'Preview challenge'} <ArrowRight size={18} /></button>
          </div>

          <div className="leaderboard-card">
            <div className="card-heading">
              <div><span className="eyebrow">LIVE STANDINGS</span><h3>Qualification line</h3></div>
              <span className="updated"><span /> Updating</span>
            </div>
            <div className="leaderboard">
              {standings.map((player) => (
                <div className="leader-row" key={player.name}>
                  <span className={`rank rank-${player.rank}`}>{player.rank}</span>
                  <span className="leader-avatar">{player.name.slice(-2)}</span>
                  <b>{player.name}</b>
                  <span className="leader-time">{player.time}</span>
                  <strong>{player.score}</strong>
                </div>
              ))}
            </div>
            <div className="privacy-note"><ShieldCheck size={16} /> Public standings use anonymous player IDs.</div>
          </div>
        </section>

        <section className="rules-section" id="rules">
          <span className="eyebrow">THE OPEN CLASS PROMISE</span>
          <h2>Unequal tools. Identical rules.</h2>
          <div className="rule-grid">
            <article><span>01</span><h3>Everything allowed is declared</h3><p>AI, teams, automation and external research are part of the format—not hidden advantages.</p></article>
            <article><span>02</span><h3>No payment to compete</h3><p>Participation is free. Mobile Money is requested only if a qualified player chooses to purchase.</p></article>
            <article><span>03</span><h3>Server-verified results</h3><p>Scoring, timestamps and tie-breaks are auditable and identical for every participant.</p></article>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand"><span className="brand-mark"><Zap size={16} /></span><span>OPEN<span>ARENA</span></span></div>
        <p>Competitive access. Transparent commerce.</p>
        <span>Antananarivo · Madagascar</span>
      </footer>

      {inviteOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setInviteOpen(false)}>
          <div className="invite-modal" role="dialog" aria-modal="true" aria-labelledby="invite-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setInviteOpen(false)} aria-label="Close"><X size={19} /></button>
            <div className="modal-icon"><Zap size={23} /></div>
            <span className="eyebrow">INVITATION VERIFIED</span>
            <h2 id="invite-title">Welcome to Round 07</h2>
            <p>Your coupon grants one free attempt in the Antananarivo Open Arena.</p>
            <div className="coupon-code"><span>TANA</span><b>R7K4-92AF</b><Check size={18} /></div>
            <ul>
              <li><Check size={16} /> Entry costs 0 Ar</li>
              <li><Check size={16} /> AI and teamwork are permitted</li>
              <li><Check size={16} /> Your public identity stays masked</li>
            </ul>
            <button className="primary-button" onClick={joinArena}>Register for free <ArrowRight size={19} /></button>
          </div>
        </div>
      )}

      {notice && <div className="toast"><Bell size={18} /><div><b>Arena update</b><span>{joined ? 'You are registered for Round 07.' : 'Notifications are enabled for this demo.'}</span></div></div>}
    </div>
  )
}

export default App
