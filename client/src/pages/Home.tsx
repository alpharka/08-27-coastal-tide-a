/*
 * Tide & Vow / Coastal Editorial: this page follows an asymmetric editorial rhythm,
 * ocean-navy / warm-sand / coral-ember palette, Cormorant display type, Manrope body type,
 * contour-line motifs, and calm transform/opacity motion only.
 */
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  Clipboard,
  Clock3,
  Copy,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  MapPin,
  Music2,
  Pause,
  Play,
  Send,
  Sparkles,
  Waves,
  X,
  ZoomIn,
} from "lucide-react";

const invitationConfig = {
  couple: {
    names: "Nara & Elio",
    first: "Nara",
    second: "Elio",
    parents: "Putri dari keluarga Armand & Lestari · Putra dari keluarga Leon & Sari",
  },
  event: {
    date: "21 November 2026",
    shortDate: "21.11.26",
    start: "2026-11-21T15:00:00+07:00",
    end: "2026-11-21T21:00:00+07:00",
    akadTime: "15.00 WIB",
    receptionTime: "18.30–21.00 WIB",
    akadVenue: "The Tides House",
    receptionVenue: "The Tides House, Kuta Selatan",
    address: "Jl. Pantai Senja No. 18, Kuta Selatan, Bali",
    mapsUrl: "https://maps.google.com/?q=The+Tides+House+Kuta+Selatan+Bali",
  },
  theme: {
    name: "Tide & Vow",
    eyebrow: "A shoreline wedding story",
    line: "Dua arah pulang, satu rumah yang kami pilih.",
  },
  musicUrl: "/manus-storage/tide-vow-music_eb42484e.wav",
  payment: {
    isSampleData: true,
    provider: "DANA",
    ewallet: "0812 3456 7890",
    ewalletLink: "https://link.dana.id/minta/081234567890",
    bank: "Bank BCA",
    account: "1234567890",
    recipient: "Nara Pradipta",
  },
};

const gallery = [
  {
    src: "/manus-storage/tide-vow-gallery-1_59cbcfc7.jpg",
    alt: "Nara dan Elio berjalan bersama di tepi pantai",
    caption: "Pulang ke garis air",
    className: "gallery-tall",
  },
  {
    src: "/manus-storage/tide-vow-gallery-2_de86c78c.jpg",
    alt: "Tangan Nara dan Elio bertaut di atas pasir",
    caption: "Hal-hal kecil yang menetap",
    className: "gallery-wide",
  },
  {
    src: "/manus-storage/tide-vow-gallery-3_d5ccedbc.jpg",
    alt: "Nara dan Elio berbincang di tangga rumah pesisir",
    caption: "Sore yang kami simpan",
    className: "gallery-medium",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Pasangan pengantin berjalan di padang rumput dekat laut",
    caption: "Berjalan pelan",
    className: "gallery-medium",
  },
  {
    src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
    alt: "Siluet pasangan di bawah cahaya matahari senja",
    caption: "Cahaya terakhir",
    className: "gallery-tall",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
    alt: "Detail dekorasi meja pernikahan bernuansa pasir dan bunga putih",
    caption: "Meja untuk cerita baru",
    className: "gallery-wide",
  },
];

const navItems = [
  { id: "story", label: "Cerita" },
  { id: "details", label: "Acara" },
  { id: "gallery", label: "Galeri" },
  { id: "rsvp", label: "RSVP" },
  { id: "gift", label: "Tanda kasih" },
];

type GuestbookEntry = {
  id: string;
  name: string;
  status: string;
  message: string;
  createdAt: string;
};

type FormErrors = {
  name?: string;
  message?: string;
};

function formatTimeUnit(value: number) {
  return value.toString().padStart(2, "0");
}

function createCalendarUrl() {
  const start = new Date(invitationConfig.event.start);
  const end = new Date(invitationConfig.event.end);
  const calendarDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${invitationConfig.couple.names} · Wedding Day`,
    dates: `${calendarDate(start)}/${calendarDate(end)}`,
    details: `${invitationConfig.theme.line} Akad ${invitationConfig.event.akadTime}, resepsi ${invitationConfig.event.receptionTime}.`,
    location: invitationConfig.event.address,
    ctz: "Asia/Jakarta",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  return Promise.resolve();
}

function ContourLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`contour-lines ${className}`} viewBox="0 0 680 180" aria-hidden="true">
      <path d="M-20 125C95 65 142 151 252 96S430 45 548 94s125 12 162-16" />
      <path d="M-20 144C95 84 142 170 252 115S430 64 548 113s125 12 162-16" />
      <path d="M-20 163C95 103 142 189 252 134S430 83 548 132s125 12 162-16" />
    </svg>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      <strong>{children}</strong>
    </div>
  );
}

function Home() {
  const [coverVisible, setCoverVisible] = useState(true);
  const [coverExiting, setCoverExiting] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicUnavailable, setMusicUnavailable] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [rsvpStatus, setRsvpStatus] = useState("Saya akan hadir");
  const audioRef = useRef<HTMLAudioElement>(null);
  const guestName = useMemo(() => {
    const raw = new URLSearchParams(window.location.search).get("to") ?? "";
    return raw.replace(/\s+/g, " ").trim().slice(0, 48) || "Tamu undangan";
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("tide-vow-guestbook");
    if (stored) {
      try {
        setGuestbook(JSON.parse(stored) as GuestbookEntry[]);
      } catch {
        window.localStorage.removeItem("tide-vow-guestbook");
      }
    }
  }, []);

  useEffect(() => {
    const target = new Date(invitationConfig.event.start).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = coverVisible || activeImage !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [coverVisible, activeImage]);

  useEffect(() => {
    if (coverVisible) return;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [coverVisible]);

  useEffect(() => {
    if (activeImage === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowLeft") setActiveImage((current) => (current === null ? null : (current - 1 + gallery.length) % gallery.length));
      if (event.key === "ArrowRight") setActiveImage((current) => (current === null ? null : (current + 1) % gallery.length));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImage]);

  const openInvitation = () => {
    if (coverExiting) return;
    setCoverExiting(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.24;
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicUnavailable(true));
    }
    window.setTimeout(() => {
      setCoverVisible(false);
      document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
    }, 740);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || musicUnavailable) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicUnavailable(true));
    }
  };

  const handleRsvpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: FormErrors = {};
    if (!name) nextErrors.name = "Nama lengkap perlu diisi.";
    if (!message) nextErrors.message = "Tuliskan satu kalimat untuk kami.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const entry: GuestbookEntry = {
      id: `${Date.now()}`,
      name: name.slice(0, 60),
      status: rsvpStatus,
      message: message.slice(0, 280),
      createdAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    const nextGuestbook = [entry, ...guestbook];
    setGuestbook(nextGuestbook);
    window.localStorage.setItem("tide-vow-guestbook", JSON.stringify(nextGuestbook));
    setSubmitted(true);
    setErrors({});
    event.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 6500);
  };

  const copyPayment = (key: string, value: string) => {
    copyToClipboard(value).then(() => {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2200);
    });
  };

  return (
    <div className="page-shell">
      <audio ref={audioRef} src={invitationConfig.musicUrl} loop preload="none" aria-label="Musik latar undangan" />

      {coverVisible && (
        <div className={`cover ${coverExiting ? "is-leaving" : ""}`} role="dialog" aria-modal="true" aria-label="Sampul undangan">
          <div className="cover-image" />
          <div className="cover-wash" />
          <div className="cover-content">
            <div className="cover-topline"><span>{invitationConfig.theme.eyebrow}</span><span>{invitationConfig.event.shortDate}</span></div>
            <div className="cover-center">
              <img className="emblem emblem-light" src="/manus-storage/tide-vow-emblem_7f25e074.png" alt="Emblem dua gelombang Tide & Vow" />
              <p className="cover-kicker">The wedding of</p>
              <h1>{invitationConfig.couple.names.split(" & ").map((name, index) => <span key={name}>{index > 0 && <small>&</small>}{name}</span>)}</h1>
              <p className="cover-date">{invitationConfig.event.date}</p>
            </div>
            <div className="cover-bottomline">
              <div><span className="micro-label">Untuk</span><strong>{guestName}</strong></div>
              <button className="enter-button" onClick={openInvitation} type="button">
                Buka undangan <ArrowDownRight size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`invitation ${coverVisible ? "is-locked" : "is-visible"}`}>
        <header className="masthead">
          <a className="brand-mark" href="#top" aria-label="Kembali ke atas">
            <img src="/manus-storage/tide-vow-emblem_7f25e074.png" alt="" />
            <span>Tide <em>&</em> Vow</span>
          </a>
          <nav className="desktop-nav" aria-label="Navigasi undangan">
            {navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
          </nav>
          <span className="masthead-date">21 NOV / BALI</span>
        </header>

        <main id="top">
          <section className="hero-section section-pad" aria-labelledby="hero-title">
            <div className="hero-rail"><span>01</span><i /><span>THE STORY</span></div>
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">A shoreline wedding story <span>·</span> 21.11.26</p>
              <h2 id="hero-title">Dua arah pulang,<br /><i>satu rumah</i><br />yang kami pilih.</h2>
              <p className="hero-intro">Dengan hangat hati, kami mengundang {guestName} untuk hadir di hari ketika dua perjalanan menjadi satu garis pantai.</p>
              <a className="text-link" href="#story">Masuk ke cerita kami <ArrowDownRight size={16} /></a>
            </div>
            <div className="hero-art" data-reveal data-delay="1">
              <img src="/manus-storage/tide-vow-hero_3789eb1d.jpg" alt="Garis pantai saat senja dengan kain linen yang tertiup angin" />
              <div className="hero-art-caption"><span>04° 31′ S</span><span>115° 12′ E</span></div>
              <div className="hero-stamp">N<br /><span>+</span><br />E</div>
            </div>
            <div className="hero-note" data-reveal data-delay="2"><Waves size={18} /><span>made of small<br />ordinary days</span></div>
          </section>

          <section id="story" className="story-section section-pad dark-section" aria-labelledby="story-title">
            <div className="story-grid">
              <div className="section-rail light-rail"><span>02</span><i /><span>THE STORY</span></div>
              <div className="story-heading" data-reveal><SectionLabel number="02" children="THE STORY" /><h2 id="story-title">Kami bertemu di antara <i>dua pasang surut.</i></h2></div>
              <div className="story-body" data-reveal data-delay="1">
                <p className="lead-copy">Bukan pada hari yang besar, melainkan di sela-sela hari biasa: satu percakapan yang terus memanjang, satu perjalanan pulang yang terasa terlalu singkat.</p>
                <p>Nara membawa cara melihat dunia yang penuh jeda. Elio datang dengan keberanian untuk mengisinya. Dari kopi sore yang tak direncanakan sampai kota-kota yang kami jelajahi dengan sepatu berpasir, kami belajar bahwa rumah bukan selalu tempat—kadang ia adalah seseorang yang membuat kita berhenti mencari arah.</p>
                <p>Tahun ini, di tepi laut yang kami pilih, kami ingin mengikat janji di hadapan keluarga dan sahabat yang membuat perjalanan ini berarti.</p>
                <a className="text-link light-link" href="#details">Lihat detail harinya <ArrowDownRight size={16} /></a>
              </div>
              <div className="story-emblem" data-reveal data-delay="2"><img src="/manus-storage/tide-vow-emblem_7f25e074.png" alt="" /><span>with all our<br />love, Nara & Elio</span></div>
            </div>
            <ContourLines className="contour-light" />
          </section>

          <section id="details" className="details-section section-pad" aria-labelledby="details-title">
            <div className="section-rail"><span>03</span><i /><span>THE DAY</span></div>
            <div className="details-intro" data-reveal><SectionLabel number="03" children="THE DAY" /><h2 id="details-title">Satu hari,<br /><i>sepanjang usia.</i></h2><p>Catat tanggalnya, lalu datang dengan hati yang lapang.</p></div>
            <div className="countdown-block" data-reveal data-delay="1"><p className="eyebrow">Counting down to our yes</p><div className="countdown"><div><strong>{countdown.days}</strong><span>hari</span></div><b>:</b><div><strong>{formatTimeUnit(countdown.hours)}</strong><span>jam</span></div><b>:</b><div><strong>{formatTimeUnit(countdown.minutes)}</strong><span>menit</span></div><b>:</b><div><strong>{formatTimeUnit(countdown.seconds)}</strong><span>detik</span></div></div></div>
            <div className="event-list" data-reveal data-delay="2">
              <article className="event-row"><div className="event-number">01</div><div className="event-meta"><span>Akad nikah</span><strong>{invitationConfig.event.akadTime}</strong></div><div className="event-place"><b>{invitationConfig.event.akadVenue}</b><span>{invitationConfig.event.address}</span></div><a className="icon-link" href={invitationConfig.event.mapsUrl} target="_blank" rel="noreferrer" aria-label="Lihat lokasi akad di Google Maps"><ExternalLink size={17} /></a></article>
              <article className="event-row"><div className="event-number">02</div><div className="event-meta"><span>Resepsi</span><strong>{invitationConfig.event.receptionTime}</strong></div><div className="event-place"><b>{invitationConfig.event.receptionVenue}</b><span>{invitationConfig.event.address}</span></div><a className="icon-link" href={invitationConfig.event.mapsUrl} target="_blank" rel="noreferrer" aria-label="Lihat lokasi resepsi di Google Maps"><ExternalLink size={17} /></a></article>
            </div>
            <div className="details-actions" data-reveal data-delay="3"><a className="button button-coral" href={invitationConfig.event.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Lihat lokasi</a><a className="button button-outline" href={createCalendarUrl()} target="_blank" rel="noreferrer"><CalendarPlus size={16} /> Simpan ke Google Calendar</a></div>
            <div className="section-contour contour-details"><ContourLines /></div>
          </section>

          <section id="gallery" className="gallery-section section-pad sand-section" aria-labelledby="gallery-title">
            <div className="gallery-heading" data-reveal><SectionLabel number="04" children="THE GALLERY" /><h2 id="gallery-title">Potongan hari<br /><i>yang kami simpan.</i></h2><p>Enam bingkai kecil dari perjalanan menuju hari ini.</p></div>
            <div className="gallery-grid" data-reveal data-delay="1">
              {gallery.map((image, index) => <button key={image.src} className={`gallery-item ${image.className}`} type="button" onClick={() => setActiveImage(index)} aria-label={`Lihat foto ${index + 1}: ${image.caption}`}><img src={image.src} alt={image.alt} loading="lazy" /><span className="gallery-overlay"><ZoomIn size={17} /><em>{image.caption}</em></span><span className="gallery-index">0{index + 1}</span></button>)}
            </div>
            <div className="section-contour contour-gallery"><ContourLines /></div>
          </section>

          <section id="rsvp" className="rsvp-section section-pad dark-section" aria-labelledby="rsvp-title">
            <div className="section-rail light-rail"><span>05</span><i /><span>YOUR NOTE</span></div>
            <div className="rsvp-layout">
              <div className="rsvp-copy" data-reveal><SectionLabel number="05" children="YOUR NOTE" /><h2 id="rsvp-title">Hadir atau belum pasti,<br /><i>kabar darimu berarti.</i></h2><p>Titipkan konfirmasi dan satu kalimat yang ingin kamu kirimkan untuk kami. Pesanmu akan tinggal di buku tamu kecil ini.</p>              <div className="rsvp-sign"><Heart size={16} fill="currentColor" /> Nara & Elio</div><div className="rsvp-emblem"><img src="/manus-storage/tide-vow-emblem_7f25e074.png" alt="" /><span>your words<br />stay with us</span></div></div>
              <form className="rsvp-form" onSubmit={handleRsvpSubmit} noValidate data-reveal data-delay="1">
                <label htmlFor="guest-name">Nama lengkap</label><input id="guest-name" name="name" type="text" placeholder="Tulis namamu" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="form-error">{errors.name}</span>}
                <fieldset><legend>Konfirmasi kehadiran</legend><label className="radio-option"><input type="radio" name="attendance" value="Saya akan hadir" checked={rsvpStatus === "Saya akan hadir"} onChange={(event) => setRsvpStatus(event.target.value)} /><span>Saya akan hadir</span></label><label className="radio-option"><input type="radio" name="attendance" value="Belum bisa memastikan" checked={rsvpStatus === "Belum bisa memastikan"} onChange={(event) => setRsvpStatus(event.target.value)} /><span>Belum bisa memastikan</span></label><label className="radio-option"><input type="radio" name="attendance" value="Tidak dapat hadir" checked={rsvpStatus === "Tidak dapat hadir"} onChange={(event) => setRsvpStatus(event.target.value)} /><span>Tidak dapat hadir</span></label></fieldset>
                <label htmlFor="guest-message">Pesan untuk kami</label><textarea id="guest-message" name="message" rows={5} placeholder="Tulis doa atau pesan singkatmu" aria-invalid={Boolean(errors.message)} />{errors.message && <span className="form-error">{errors.message}</span>}
                <button className="button button-coral form-submit" type="submit"><Send size={16} /> Kirim konfirmasi</button>
                {submitted && <div className="success-message" role="status"><Check size={17} /> Terima kasih, pesanmu sudah kami terima.</div>}
                <p className="form-note"><Clipboard size={13} /> RSVP ini tersimpan sementara di perangkatmu.</p>
              </form>
            </div>
            <div className="guestbook" data-reveal data-delay="2"><div className="guestbook-header"><span>From the guestbook</span><span>{guestbook.length ? `${guestbook.length} pesan` : "Belum ada pesan"}</span></div>{guestbook.length === 0 ? <div className="guestbook-empty"><Sparkles size={17} /> Pesan ucapanmu akan muncul di sini setelah dikirim.</div> : <div className="guestbook-list">{guestbook.map((entry) => <article key={entry.id}><div className="guestbook-entry-top"><strong>{entry.name}</strong><span>{entry.status}</span></div><p>“{entry.message}”</p><small>{entry.createdAt}</small></article>)}</div>}</div>
          </section>

          <section id="gift" className="gift-section section-pad" aria-labelledby="gift-title">
            <div className="gift-layout"><div className="gift-copy" data-reveal><SectionLabel number="06" children="A LITTLE GIFT" /><h2 id="gift-title">Doa adalah<br /><i>tanda kasih</i> terbaik.</h2><p>Bagi yang ingin mengirimkan tanda kasih, kami siapkan detail berikut. Tidak ada kewajiban—kehadiran dan doa kalian sudah menjadi hadiah.</p><div className="gift-wave"><ContourLines /></div></div><div className="payment-box" data-reveal data-delay="1"><div className="payment-top"><span>Digital envelope</span><span>06 / 06</span></div><div className="qr-wrap"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(invitationConfig.payment.ewalletLink)}`} alt={`QR code ${invitationConfig.payment.provider} atas nama ${invitationConfig.payment.recipient}`} /></div><div className="payment-details"><div className="payment-line"><span>{invitationConfig.payment.provider}</span><strong>{invitationConfig.payment.ewallet}</strong><button type="button" onClick={() => copyPayment("ewallet", invitationConfig.payment.ewallet)} aria-label="Salin nomor e-wallet">{copiedKey === "ewallet" ? <Check size={15} /> : <Copy size={15} />}</button></div><div className="payment-line"><span>{invitationConfig.payment.bank} · {invitationConfig.payment.recipient}</span><strong>{invitationConfig.payment.account}</strong><button type="button" onClick={() => copyPayment("bank", invitationConfig.payment.account)} aria-label="Salin nomor rekening">{copiedKey === "bank" ? <Check size={15} /> : <Copy size={15} />}</button></div></div>{invitationConfig.payment.isSampleData && <p className="sample-note">Contoh data · ganti di `invitationConfig` sebelum dibagikan.</p>}</div></div>
          </section>
        </main>

        <footer className="footer section-pad"><img src="/manus-storage/tide-vow-emblem_7f25e074.png" alt="" /><p>See you by the sea.</p><span>{invitationConfig.couple.names} · {invitationConfig.event.date}</span></footer>
      </div>

      {!coverVisible && <><button className={`music-control ${musicUnavailable ? "is-unavailable" : ""}`} type="button" onClick={toggleMusic} aria-label={musicPlaying ? "Jeda musik" : "Putar musik"} title={musicUnavailable ? "Musik belum dapat diputar" : musicPlaying ? "Jeda musik" : "Putar musik"}>{musicPlaying ? <Pause size={16} /> : <Music2 size={16} />}<span>{musicUnavailable ? "Musik" : musicPlaying ? "Jeda" : "Putar"}</span></button><nav className="mobile-bottom-nav" aria-label="Navigasi cepat mobile">{navItems.map((item) => <a key={item.id} href={`#${item.id}`}><span>{item.id === "story" ? "01" : item.id === "details" ? "03" : item.id === "gallery" ? "04" : item.id === "rsvp" ? "05" : "06"}</span>{item.label}</a>)}</nav></>}

      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setActiveImage(null)}><div className="lightbox-inner" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Tutup galeri"><X size={22} /></button><button className="lightbox-arrow lightbox-prev" type="button" onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)} aria-label="Foto sebelumnya"><ArrowLeft size={20} /></button><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} /><button className="lightbox-arrow lightbox-next" type="button" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Foto berikutnya"><ArrowRight size={20} /></button><div className="lightbox-caption"><span>0{activeImage + 1} / 06</span><strong>{gallery[activeImage].caption}</strong></div></div></div>}
    </div>
  );
}

export default Home;
