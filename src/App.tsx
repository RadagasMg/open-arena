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
        <a className="brand" href="#top" aria-label="Accueil Open Arena">
          <span className="brand-mark"><Zap size={17} strokeWidth={2.8} /></span>
          <span>OPEN<span>ARENA</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          <a className="active" href="#live">Arène en direct</a>
          <a href="#how">Fonctionnement</a>
          <a href="#rules">Règles ouvertes</a>
        </nav>

        <div className="top-actions">
          <button className="icon-button" aria-label="Notifications" onClick={() => setNotice(true)}>
            <Bell size={19} />
            <span className="notification-dot" />
          </button>
          <button className="profile-button">
            <span className="avatar">R7</span>
            <span className="profile-copy"><b>TANA-R7K4</b><small>Joueur vérifié</small></span>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="arena-strip" aria-label="Sélecteur d’arène">
          <div className="arena-select-wrap">
            <span className="eyebrow">ARÈNE DE TA VILLE</span>
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
                    <small>{arena.live ? 'En direct' : 'Bientôt'}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="arena-pulse"><span /> DIRECT · MANCHE 07</div>
          <div className="arena-members"><Users size={17} /> {selectedArena.members} joueurs locaux</div>
        </section>

        <section className="hero-grid" id="live">
          <div className="hero-copy">
            <div className="live-badge"><span /> DÉFI PRODUIT EN DIRECT</div>
            <h1>Gagne le droit<br />d’acheter <em>en premier.</em></h1>
            <p className="hero-lead">
              Une compétition gratuite basée sur les compétences. Utilise tes outils, ton équipe et ton avantage. Les meilleurs scores débloquent la priorité d’achat.
            </p>
            <div className="open-rule">
              <ShieldCheck size={21} />
              <div><b>Règles Open Class</b><span>IA, automatisation et travail d’équipe sont explicitement autorisés.</span></div>
              <a href="#rules">Voir les règles <ArrowRight size={15} /></a>
            </div>
          </div>

          <aside className="timer-panel">
            <span className="eyebrow">FIN DE LA MANCHE DANS</span>
            <div className="countdown" aria-label={`${formatTime(timeLeft)} restantes`}>
              {formatTime(timeLeft).split(':').map((part, index) => (
                <div key={`${part}-${index}`}><strong>{part}</strong><small>{['HEURES', 'MIN', 'SEC'][index]}</small></div>
              ))}
            </div>
            <button className="primary-button" onClick={() => setInviteOpen(true)}>
              {joined ? <><Check size={19} /> Tu es inscrit</> : <>Entrer avec mon coupon <ArrowRight size={19} /></>}
            </button>
            <p><CircleHelp size={15} /> Entrée gratuite. Paiement seulement après qualification.</p>
          </aside>
        </section>

        <section className="product-section">
          <div className="product-visual" aria-label="Illustration du générateur solaire portable">
            <div className="glow glow-one" />
            <div className="glow glow-two" />
            <div className="product-tag"><Sparkles size={15} /> EXCLUSIF ARÈNE</div>
            <div className="power-station">
              <div className="power-handle" />
              <div className="power-face">
                <span className="screen"><small>SORTIE</small><b>1200<em>W</em></b></span>
                <span className="socket" /><span className="socket" />
                <span className="power-button" />
              </div>
            </div>
            <div className="float-card float-available"><PackageCheck size={18} /><div><b>50 unités</b><span>Stock vérifié</span></div></div>
            <div className="float-card float-city"><MapPin size={18} /><div><b>Antananarivo</b><span>Allocation locale</span></div></div>
          </div>

          <div className="product-info">
            <div className="section-kicker">DROP EN COURS · #A-007</div>
            <h2>VoltEdge 1200W<br />Portable Power Station</h2>
            <p>Une source d’énergie fiable pour les coupures du quotidien. Stock local, arrivée vérifiée et livraison transparente.</p>

            <div className="stock-block">
              <div><span>Droits d’achat disponibles</span><strong>38 <small>/ 50</small></strong></div>
              <div className="stock-track"><span style={{ width: `${availablePercent}%` }} /></div>
              <small>12 joueurs sont actuellement au-dessus de la ligne de qualification</small>
            </div>

            <div className="price-row">
              <div><span>Prix d’achat fixe</span><strong>2,480,000 <small>Ar</small></strong></div>
              <span className="money-pill">Mobile Money</span>
            </div>

            <div className="logistics-grid">
              <div><Route size={19} /><span>Départ estimé<b>28 juil. 2026</b></span></div>
              <div><Clock3 size={19} /><span>Arrivée prévue en ville<b>06–09 août</b></span></div>
            </div>
          </div>
        </section>

        <section className="content-grid" id="how">
          <div className="challenge-card">
            <div className="card-heading">
              <div><span className="eyebrow">CETTE MANCHE</span><h3>Défi Power Route</h3></div>
              <span className="difficulty">AVANCÉ</span>
            </div>
            <p>Construis le plan de livraison le moins risqué à travers quatre points de contrôle. Ton score combine précision, vitesse et raisonnement vérifié.</p>
            <div className="challenge-metrics">
              <div><Box size={18} /><span><b>4</b> points</span></div>
              <div><Clock3 size={18} /><span><b>8 min</b> maximum</span></div>
              <div><Trophy size={18} /><span><b>Top 50</b> qualifié</span></div>
            </div>
            <button className="secondary-button" onClick={() => setInviteOpen(true)}>{joined ? 'Continuer le défi' : 'Voir le défi'} <ArrowRight size={18} /></button>
          </div>

          <div className="leaderboard-card">
            <div className="card-heading">
              <div><span className="eyebrow">CLASSEMENT EN DIRECT</span><h3>Ligne de qualification</h3></div>
              <span className="updated"><span /> Mise à jour</span>
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
            <div className="privacy-note"><ShieldCheck size={16} /> Le classement public utilise des identifiants anonymes.</div>
          </div>
        </section>

        <section className="rules-section" id="rules">
          <span className="eyebrow">LA PROMESSE OPEN CLASS</span>
          <h2>Outils inégaux. Règles identiques.</h2>
          <div className="rule-grid">
            <article><span>01</span><h3>Tout avantage autorisé est déclaré</h3><p>IA, équipes, automatisation et recherche externe font partie du format — ce ne sont pas des avantages cachés.</p></article>
            <article><span>02</span><h3>Aucun paiement pour participer</h3><p>La participation est gratuite. Mobile Money est demandé seulement si un joueur qualifié choisit d’acheter.</p></article>
            <article><span>03</span><h3>Résultats vérifiés côté serveur</h3><p>Score, horodatage et départage sont auditables et identiques pour chaque participant.</p></article>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand"><span className="brand-mark"><Zap size={16} /></span><span>OPEN<span>ARENA</span></span></div>
        <p>Accès compétitif. Commerce transparent.</p>
        <span>Antananarivo · Madagascar</span>
      </footer>

      {inviteOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setInviteOpen(false)}>
          <div className="invite-modal" role="dialog" aria-modal="true" aria-labelledby="invite-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setInviteOpen(false)} aria-label="Fermer"><X size={19} /></button>
            <div className="modal-icon"><Zap size={23} /></div>
            <span className="eyebrow">INVITATION VÉRIFIÉE</span>
            <h2 id="invite-title">Bienvenue dans la manche 07</h2>
            <p>Ton coupon donne accès à une tentative gratuite dans l’Open Arena d’Antananarivo.</p>
            <div className="coupon-code"><span>TANA</span><b>R7K4-92AF</b><Check size={18} /></div>
            <ul>
              <li><Check size={16} /> L’entrée coûte 0 Ar</li>
              <li><Check size={16} /> IA et travail d’équipe autorisés</li>
              <li><Check size={16} /> Ton identité publique reste masquée</li>
            </ul>
            <button className="primary-button" onClick={joinArena}>S’inscrire gratuitement <ArrowRight size={19} /></button>
          </div>
        </div>
      )}

      {notice && <div className="toast"><Bell size={18} /><div><b>Mise à jour de l’arène</b><span>{joined ? 'Tu es inscrit à la manche 07.' : 'Les notifications sont activées pour cette démo.'}</span></div></div>}
    </div>
  )
}

export default App
