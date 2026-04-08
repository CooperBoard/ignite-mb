import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   IGNITE MB — FAITHFUL SITE COPY
   
   HOW TO EDIT: Just tell Claude what you want changed!
   Examples:
     "Change service times to 8:30am and 10:45am"
     "Update the Our Story text"
     "Add a new sermon called ___"
     "Change the livestream YouTube link"
   
   All content is in the SITE and page sections below.
   ═══════════════════════════════════════════════════════════════════ */

// ─── SITE DATA (edit all content here) ───────────────────────────
const SITE = {
  name: "Ignite MB",
  logo: "https://storage1.snappages.site/DHXN85/assets/images/3458351_829x395_500.png",
  phone: "(843) 449-0017",
  email: "office@ignitemb.com",
  address: ["4808 N Kings Hwy", "Myrtle Beach, SC 29577"],
  website: "IgniteMB.com",
  serviceTimes: [
    { day: "Sunday", label: "Morning Worship", time: "10:00am" },
    { day: "Sunday", label: "Spanish Service", time: "7:00pm" },
    { day: "Wednesday", label: "Food, Fellowship & Bible Study", time: "6:15pm" },
  ],
  tagline: "ORDINARY PEOPLE\nEXTRAORDINARY GOD",
  taglineSub: "Creates supernatural people empowered to do the work of ministry!",

  // ─── LIVESTREAM: paste your YouTube or Facebook Live embed URL ──
  livestreamEmbedUrl: "",  // e.g. "https://www.youtube.com/embed/LIVE_STREAM_ID"
  youtubeChannel: "https://www.youtube.com/@ignitemb",
  facebookPage: "https://www.facebook.com/IgniteMB",

  // ─── SERMONS: add audio sermons here ───────────────────────────
  // Each sermon: { title, speaker, date, audioUrl, series }
  // audioUrl can be a direct MP3 link or a hosted file URL
  sermons: [
    { title: "Becoming a Disciple — Part 3", speaker: "Pastor Jim Neece", date: "March 30, 2026", audioUrl: "", series: "Becoming a Disciple of Jesus" },
    { title: "Becoming a Disciple — Part 2", speaker: "Pastor Jim Neece", date: "March 23, 2026", audioUrl: "", series: "Becoming a Disciple of Jesus" },
    { title: "Becoming a Disciple — Part 1", speaker: "Pastor Jim Neece", date: "March 16, 2026", audioUrl: "", series: "Becoming a Disciple of Jesus" },
  ],
};

const NAV = [
  { label: "Home", page: "home" },
  { label: "I'm New", page: "im-new" },
  {
    label: "About", page: null,
    children: [
      { label: "Mission and Vision", page: "mission-and-vision" },
      { label: "What We Believe", page: "what-we-believe" },
      { label: "Our Story", page: "our-story" },
      { label: "Contact", page: "contact" },
    ],
  },
  { label: "Give", page: "give" },
  { label: "Casa De Milagros", page: null, href: "https://ignitemb.snappages.site/casa-de-milagros" },
  {
    label: "Ministries", page: null,
    children: [
      { label: "Ignite Kids", page: null, href: "#" },
      { label: "Ignite Youth", page: null, href: "#" },
      { label: "Small Groups", page: null, href: "#" },
      { label: "Friday Weekly House of Prayer", page: null, href: "#" },
      { label: "Praise & Worship", page: null, href: "#" },
      { label: "Healing Rooms", page: null, href: "#" },
      { label: "Missions", page: null, href: "#" },
    ],
  },
  { label: "Events", page: null, href: "#" },
  { label: "Sermons", page: "sermons" },
  { label: "Livestream", page: "livestream" },
];

// ─── PURPLE THEME (matches the live SnapPages site) ──────────────
const C = {
  bg: "#2d1b4e",          // deep purple background
  bgDark: "#1e1233",      // darker purple for nav/footer
  bgAlt: "#3a2463",       // alternating section purple
  bgLight: "#4a3175",     // lighter purple for cards
  white: "#ffffff",
  offWhite: "#e8e0f0",
  muted: "#b8a8cc",
  accent: "#c9a84c",      // gold accent
  accentHover: "#d4b85c",
  inputBg: "#3a2463",
  border: "#5a3d8a",
  footerBg: "#1a0e2e",
};

// ─── DEVICE CONTEXT ──────────────────────────────────────────────
let _dev = "desktop";
const m = () => _dev === "mobile";
const t = () => _dev === "tablet";
const c = () => m() || t();
const ff = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// ─── SHARED STYLES ───────────────────────────────────────────────
const inputSt = {
  width: "100%", padding: "12px 14px", marginBottom: 12, borderRadius: 6,
  border: `1px solid ${C.border}`, background: C.inputBg, color: C.white,
  fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: ff,
};
const btnSt = {
  padding: "12px 28px", background: C.accent, color: "#1a0e2e", fontWeight: 700,
  fontSize: 15, border: "none", borderRadius: 6, cursor: "pointer", fontFamily: ff,
};
const Inp = ({ ph }) => <input placeholder={ph} style={inputSt} />;

// ─── CONTACT FORM ────────────────────────────────────────────────
function ContactForm({ heading, sub, btn = "Send" }) {
  return (
    <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt, textAlign: "center" }}>
      {heading && <h2 style={{ fontSize: m() ? 22 : 28, fontWeight: 700, margin: "0 0 6px", color: C.white }}>{heading}</h2>}
      {sub && <p style={{ color: C.muted, fontSize: 15, margin: "0 0 28px" }}>{sub}</p>}
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: m() ? "1fr" : "1fr 1fr", gap: 12 }}>
          <Inp ph="First Name" /><Inp ph="Last Name" />
        </div>
        <Inp ph="Email" />
        <textarea placeholder="Message" rows={4} style={{ ...inputSt, resize: "vertical" }} />
        <button style={btnSt}>{btn}</button>
      </div>
    </div>
  );
}

function Hero({ title, sub }) {
  return (
    <div style={{ padding: m() ? "50px 20px 40px" : "70px 40px 50px", textAlign: "center", background: C.bg }}>
      <h1 style={{ fontSize: m() ? 28 : 40, fontWeight: 700, margin: 0, color: C.white }}>{title}</h1>
      {sub && <p style={{ color: C.offWhite, fontSize: m() ? 15 : 17, marginTop: 14, maxWidth: 700, margin: "14px auto 0", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

function TimesGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: m() ? "1fr" : "1fr 1fr 1fr", gap: 20, maxWidth: 800, margin: "0 auto" }}>
      {SITE.serviceTimes.map((s, i) => (
        <div key={i} style={{
          background: C.bgLight, borderRadius: 8, padding: "28px 20px",
          border: `1px solid ${C.border}`, textAlign: "center",
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px", color: C.white }}>{s.day}</h3>
          <p style={{ color: C.muted, fontSize: 13, margin: "0 0 10px" }}>{s.label}</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: C.accent, margin: 0 }}>{s.time}</p>
        </div>
      ))}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────
function Navbar({ page, go }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const nav = (p) => { if (p) { go(p); setMenuOpen(false); setDrop(null); } };

  return (
    <nav style={{
      background: C.bgDark, padding: m() ? "10px 16px" : "10px 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", borderBottom: `1px solid ${C.border}`,
    }}>
      <div onClick={() => nav("home")} style={{ cursor: "pointer" }}>
        <img src={SITE.logo} alt="Ignite MB" style={{ height: m() ? 36 : 44 }} />
      </div>
      {c() && (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", color: C.white, fontSize: 26, cursor: "pointer",
        }}>{menuOpen ? "✕" : "☰"}</button>
      )}
      {(!c() || menuOpen) && (
        <div style={{
          display: "flex", flexDirection: c() ? "column" : "row",
          width: c() ? "100%" : "auto", marginTop: c() ? 10 : 0,
          flexWrap: c() ? "nowrap" : "wrap",
          ...(c() && { borderTop: `1px solid ${C.border}`, paddingTop: 8 }),
        }}>
          {NAV.map(item => (
            <div key={item.label} style={{ position: "relative" }}>
              <a onClick={(e) => {
                e.preventDefault();
                if (item.children) setDrop(drop === item.label ? null : item.label);
                else if (item.page) nav(item.page);
                else if (item.href) window.open(item.href, "_blank");
              }} style={{
                color: page === item.page ? C.accent : C.offWhite,
                fontWeight: page === item.page ? 700 : 400,
                textDecoration: "none", display: "block", borderRadius: 4,
                cursor: "pointer", padding: c() ? "10px 12px" : "8px 10px",
                fontSize: c() ? 14 : 13,
              }}>
                {item.label}{item.children ? " ▾" : ""}
              </a>
              {item.children && drop === item.label && (
                <div style={{
                  position: c() ? "static" : "absolute", top: "100%", left: 0,
                  background: C.bgDark, borderRadius: 6, padding: "4px 0",
                  minWidth: 220, zIndex: 100,
                  boxShadow: c() ? "none" : "0 6px 24px rgba(0,0,0,.5)",
                  border: `1px solid ${C.border}`,
                  ...(c() && { marginLeft: 18, border: "none" }),
                }}>
                  {item.children.map(ch => (
                    <a key={ch.label} onClick={(e) => {
                      e.preventDefault();
                      if (ch.page) nav(ch.page);
                      else if (ch.href) window.open(ch.href, "_blank");
                    }} style={{
                      display: "block", padding: "8px 16px", color: C.offWhite,
                      textDecoration: "none", fontSize: 13, cursor: "pointer",
                    }}>{ch.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  const hd = { color: C.white, fontSize: 15, fontWeight: 700, margin: "0 0 10px" };
  const p = { color: C.muted, fontSize: 13, lineHeight: 1.6, margin: "0 0 4px" };
  return (
    <footer style={{
      background: C.footerBg, padding: m() ? "36px 20px 20px" : "48px 40px 24px",
      borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: m() ? "1fr" : "1fr 1fr 1fr",
        gap: m() ? 28 : 40, maxWidth: 960, margin: "0 auto",
      }}>
        <div>
          <h4 style={hd}>About</h4>
          <p style={{ ...p, fontWeight: 700, color: C.offWhite }}>ORDINARY PEOPLE</p>
          <p style={{ ...p, fontWeight: 700, color: C.offWhite }}>EXTRAORDINARY GOD</p>
          <p style={p}>{SITE.taglineSub}</p>
        </div>
        <div>
          <h4 style={hd}>Service Times</h4>
          {SITE.serviceTimes.map((s, i) => <p key={i} style={p}>{s.day}: {s.time}</p>)}
        </div>
        <div>
          <h4 style={hd}>Contact Info</h4>
          {SITE.address.map((a, i) => <p key={i} style={p}>{a}</p>)}
          <p style={p}>{SITE.phone}</p>
          <p style={p}>{SITE.email}</p>
        </div>
      </div>
      <div style={{ textAlign: "center", color: C.border, fontSize: 12, marginTop: 28 }}>
        © {new Date().getFullYear()} Ignite Church of Myrtle Beach
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════

function HomePage({ go }) {
  return (
    <>
      {/* Hero */}
      <div style={{ padding: m() ? "60px 20px" : "90px 40px", textAlign: "center", background: C.bg }}>
        <h1 style={{ fontSize: m() ? 32 : 48, fontWeight: 700, margin: "0 0 20px", color: C.white }}>Welcome</h1>
        <p style={{ color: C.offWhite, fontSize: m() ? 15 : 17, maxWidth: 700, margin: "0 auto 30px", lineHeight: 1.7, fontWeight: 500 }}>
          Ignite MB is a place where people can meet Jesus, engage in life-giving community, and everyone is welcome. We believe in creating a space where people can have authentic encounters with Christ, discover their gifts and use them for God's glory. Join us for our Sunday services!
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => go("our-story")} style={btnSt}>Learn More</button>
          <button onClick={() => go("what-we-believe")} style={{ ...btnSt, background: "transparent", border: `2px solid ${C.accent}`, color: C.accent }}>What We Believe</button>
        </div>
      </div>

      {/* Latest Sermon */}
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 22 : 30, fontWeight: 700, margin: "0 0 8px", color: C.white }}>Latest Sermon</h2>
        <div style={{ maxWidth: 700, margin: "0 auto 16px", textAlign: "right" }}>
          <a onClick={() => go("sermons")} style={{ color: C.accent, cursor: "pointer", fontSize: 14 }}>Browse Sermons →</a>
        </div>
        <p style={{ color: C.muted, fontSize: 15, maxWidth: 600, margin: "0 auto 24px", lineHeight: 1.6 }}>
          It is said, no two services are alike at Ignite Church.<br />
          However, you will ALWAYS hear the word of God.<br />
          For this week's message, click on the video.
        </p>
        <div style={{
          maxWidth: 640, margin: "0 auto", background: C.bgDark, borderRadius: 8,
          aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ textAlign: "center", color: C.muted }}>
            <div style={{ fontSize: 48 }}>▶</div>
            <p style={{ fontSize: 13, marginTop: 4 }}>Video Embed</p>
          </div>
        </div>
      </div>

      {/* Service Times */}
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bg, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 22 : 30, fontWeight: 700, margin: "0 0 30px", color: C.white }}>Service Times</h2>
        <TimesGrid />
      </div>

      {/* Prayer Request */}
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 22 : 28, fontWeight: 700, margin: "0 0 8px", color: C.white }}>Prayer Request</h2>
        <p style={{ color: C.muted, fontSize: 15, margin: "0 0 24px" }}>How can we pray for you?</p>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 14, justifyContent: "center" }}>
            <label style={{ color: C.offWhite, fontSize: 14, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}><input type="radio" name="fu" /> Yes, follow up</label>
            <label style={{ color: C.offWhite, fontSize: 14, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}><input type="radio" name="fu" /> No</label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: m() ? "1fr" : "1fr 1fr", gap: 12 }}>
            <Inp ph="First Name" /><Inp ph="Last Name" />
          </div>
          <Inp ph="Email" /><Inp ph="Phone Number" />
          <textarea placeholder="Your prayer request..." rows={4} style={{ ...inputSt, resize: "vertical" }} />
          <button style={btnSt}>Submit</button>
        </div>
      </div>

      <ContactForm heading="Get In Touch" sub="We'd love to hear from you. Fill out the form below to get started." />
    </>
  );
}

function ImNewPage() {
  return (
    <>
      <Hero title="I'm New" sub="Ignite MB is a place where people can meet Jesus, engage in life-giving community, and everyone is welcome. We believe in creating a space where people can have authentic encounters with Christ, discover their gifts and use them for God's glory. Join us for our Sunday services!" />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 22 : 28, fontWeight: 700, margin: "0 0 28px", color: C.white }}>When We Meet</h2>
        <TimesGrid />
      </div>
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bg }}>
        <h2 style={{ fontSize: m() ? 22 : 28, fontWeight: 700, margin: "0 0 20px", textAlign: "center", color: C.white }}>What To Expect</h2>
        <div style={{ maxWidth: 650, margin: "0 auto" }}>
          {[
            "Sunday morning we have spirit led worship.",
            "Casual dress and Contemporary music is led by our worship team.",
            "There is childcare available and activities for all age groups.",
            "Plan to hang around after the service for fellowship and meeting new people.",
            "Wednesday evenings we have light food and fellowship followed by prayer and Bible Study.",
          ].map((tx, i) => <p key={i} style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7, margin: "0 0 10px" }}>{tx}</p>)}
        </div>
      </div>
      <ContactForm heading="How To Contact Us" sub="We'd love to hear from you. Fill out the form below to get started." btn="Contact Us" />
    </>
  );
}

function MissionPage() {
  return (
    <>
      <Hero title="Mission & Vision" sub="Go therefore and make disciples..." />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ fontSize: m() ? 20 : 26, fontWeight: 700, marginBottom: 16, color: C.white }}>The Mission & Process</h2>
          <p style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7 }}>
            <strong>To make disciples of all nations.</strong><br />Acts 1:8, Matthew 28:16-20<br /><br />
            <strong>Reaching Up</strong> - In Worship (Many Methods)<br />
            <strong>Reaching In</strong> - In Fellowship (Loving One Another)<br />
            <strong>Reaching Out</strong> - In Discipleship
          </p>
        </div>
      </div>
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bg }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ fontSize: m() ? 20 : 26, fontWeight: 700, marginBottom: 16, color: C.white }}>The Vision</h2>
          <p style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7 }}>
            <strong>Planting Churches</strong> - A call to plant churches along the Grand Strand and the 10/40 window where most unreached people groups live. This will be done through making and multiplying disciples and starting new churches out of necessity.
          </p>
          <p style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7, marginTop: 14 }}>
            <strong>Touching Our City</strong> - There is ONE church with many different names and locations. We are striving for unity in the body of Christ. We work with other churches and organizations.
          </p>
          <p style={{ color: C.accent, fontSize: 15, marginTop: 16, fontWeight: 600 }}>Join us for our "Intro to Ignite" class for more information.</p>
        </div>
      </div>
      <ContactForm heading="Connect with us." sub="We'd love to hear from you. Fill out the form below to get started." btn="Contact Us" />
    </>
  );
}

function BelievePage() {
  const beliefs = [
    { t: "God", d: "There is one eternally existing God who has three distinct persons: God the Father, God the Son, and God the Holy Spirit. He is the creator of all that exists, both visible and invisible, and is therefore worthy of all glory and praise. God is perfect in love, power, holiness, goodness, knowledge, wisdom, justice, and mercy. He is unchangeable and therefore is the same yesterday, today, and tomorrow." },
    { t: "Revelation", d: "God has revealed himself to us through his Son, Jesus Christ, who is the visible image of the invisible God, the holy scriptures, and through all of creation itself." },
    { t: "Mankind", d: "Humans, both male and female, were created in God's image for His glory. The first humans, Adam and Eve, were created without sin and appointed as caretakers of the rest of God's creations." },
    { t: "The Fall", d: "When Adam and Eve chose not to obey God, they ceased to be what they were made to be and became distorted images of God. This caused them to fall out of fellowship with God, and fractured all of creation ever since that time." },
    { t: "Salvation", d: "Jesus Christ came to reconcile us with God. He lived a life without sin and willingly died on the cross to pay the penalty for our transgressions. God raised him from the dead and now, by grace, offers as a free gift eternal life to all who follow Christ, by faith, as their Lord and Savior. That is why salvation can be found in Christ alone." },
    { t: "The Church", d: "The Church is meant to be the visible body of Christ, sent into the world to glorify God and proclaim the gospel of Jesus Christ." },
    { t: "Resurrection", d: "Jesus Christ is returning one day to judge both the living and the dead and to usher in the fullness of God's kingdom on earth." },
  ];
  return (
    <>
      <Hero title="What We Believe" sub={'"What comes into our minds when we think about God is the most important thing about us." — A.W. Tozer'} />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ fontSize: m() ? 22 : 28, fontWeight: 700, marginBottom: 8, textAlign: "center", color: C.white }}>Core Beliefs</h2>
          <p style={{ color: C.muted, fontSize: 14, textAlign: "center", marginBottom: 32 }}>
            The following are the core beliefs of Ignite MB based on the foundational truths taught in the Bible. All of our teaching and ministry is rooted in and flows out of these biblical doctrines.
          </p>
          {beliefs.map((b, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.accent, margin: "0 0 8px" }}>{b.t}</h3>
              <p style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
      <ContactForm heading="Want to learn more?" sub="We'd love to hear from you. Fill out the form below to get started." btn="Contact Us" />
    </>
  );
}

function StoryPage() {
  return (
    <>
      <Hero title="Our Story" />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {[
            { h: "How it all started...", p: "Ignite MB was relaunched January of 2014 when Pastor Jim and Nancy Neece took the pastorate. At the time of the launch there was a very small group of people who worshiped together on Sunday mornings and at Wednesday night prayer time..." },
            { h: "Expanding the vision...", p: "We realize that Christ has made it so simple for us and that there needs to be a community around to support those who are striving to follow Christ's words in this world.", bold: "At Ignite we strive to BE the church, not just DO church!" },
            { h: "Where we are headed...", p: "Despise not the days of small beginnings.... God has blessed us with growth and has multiplied many ministries throughout the week including Small Groups, Healing Rooms, Friday Night House of Prayer, Homeless ministry etc. We come together and celebrate Passover, the Seder Meal as well as the other Feasts of Israel. God has blessed us with our Bible College (Ignite School of Ministry) with students graduating with an Associates Degree and working towards a Bachelor's Degree. God has been so gracious to us as we continue to seek after Him!" },
            { h: "Be a part of our story...", p: "Join us every Sunday as we gather to worship together at 10:00 am." },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: C.accent, margin: "0 0 12px" }}>{s.h}</h3>
              <p style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.p}</p>
              {s.bold && <p style={{ color: C.white, fontSize: 16, fontWeight: 700, marginTop: 10 }}>{s.bold}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <ContactForm heading="Get In Touch" sub="We'd love to hear from you. Fill out the form below to get started." btn="Contact Us" />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bg, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 24 : 32, fontWeight: 700, margin: "0 0 20px", color: C.white }}>Contact Us</h2>
        <p style={{ color: C.offWhite, fontSize: 16, lineHeight: 1.8 }}>
          <strong>Phone:</strong> {SITE.phone}<br /><strong>Email:</strong> {SITE.email}
        </p>
      </div>
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 22 : 28, fontWeight: 700, margin: "0 0 24px", color: C.white }}>Service Times</h2>
        <TimesGrid />
      </div>
    </>
  );
}

function GivePage() {
  const ways = [
    { t: "Give Online", d: '"One who is faithful in the smallest matters is also faithful in much, and the one unjust in the smallest matters will likewise be unjust in much. So then, if you cannot be trusted with unjust wealth, who will trust you with true wealth?" Luke 16:10-11' },
    { t: "Give In Person", d: '"Then Yeshua (Jesus) looked up and saw the rich dropping their gifts into the treasury box. He also saw a poor widow dropping in two small copper coins. And He said, \'Truly I say to you, this poor widow has put in more than all the rest.\'" Luke 21:1-4' },
    { t: "Mail A Check", d: 'At Ignite, giving is part of our worship...\n"Let each one give as he has decided in his heart, not grudgingly or under compulsion—for God loves a cheerful giver." 2 Corinthians 9:7\n\nMail to:\nIgnite Myrtle Beach\n4808 N. Kings Highway\nMyrtle Beach, SC 29577' },
  ];
  return (
    <>
      <Hero title="Giving" sub="For where your treasure is, there your heart will be also. — Matthew 6:21" />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ fontSize: m() ? 20 : 24, fontWeight: 700, marginBottom: 12, color: C.white }}>Why we give.</h2>
          <p style={{ color: C.offWhite, fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            God is generous and so he calls us to be as well. What we do with what God has given us shows the world where our hearts are at and helps proclaim the gospel. We want to glorify God with every area of our lives, and that includes what we do with our finances.
          </p>
          <h2 style={{ fontSize: m() ? 20 : 24, fontWeight: 700, marginBottom: 20, color: C.white }}>Ways To Give</h2>
          {ways.map((w, i) => (
            <div key={i} style={{ marginBottom: 20, padding: 24, background: C.bgLight, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.accent, margin: "0 0 10px" }}>{w.t}</h3>
              <p style={{ color: C.offWhite, fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
      <ContactForm heading="Have questions or need help?" sub="We'd love to hear from you. Fill out the form below to get started." />
    </>
  );
}

// ─── SERMONS PAGE (with audio player) ────────────────────────────
function SermonsPage() {
  const [playing, setPlaying] = useState(null);
  const grouped = {};
  SITE.sermons.forEach(s => {
    if (!grouped[s.series]) grouped[s.series] = [];
    grouped[s.series].push(s);
  });

  return (
    <>
      <Hero title="Sermons" sub="Latest Messages" />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {Object.entries(grouped).map(([series, sermons]) => (
            <div key={series} style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.accent, margin: "0 0 16px" }}>{series}</h3>
              {sermons.map((s, i) => (
                <div key={i} style={{
                  background: C.bgLight, borderRadius: 8, padding: "18px 20px",
                  marginBottom: 10, border: `1px solid ${C.border}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <p style={{ color: C.white, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>{s.title}</p>
                      <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>{s.speaker} · {s.date}</p>
                    </div>
                    {s.audioUrl && (
                      <button onClick={() => setPlaying(playing === i ? null : i)} style={{
                        ...btnSt, padding: "8px 18px", fontSize: 13, borderRadius: 20,
                      }}>
                        {playing === i ? "⏸ Pause" : "▶ Play"}
                      </button>
                    )}
                    {!s.audioUrl && (
                      <span style={{ color: C.muted, fontSize: 12, fontStyle: "italic", alignSelf: "center" }}>Audio coming soon</span>
                    )}
                  </div>
                  {playing === i && s.audioUrl && (
                    <audio controls autoPlay src={s.audioUrl} style={{ width: "100%", marginTop: 12 }} />
                  )}
                </div>
              ))}
            </div>
          ))}
          {SITE.sermons.length === 0 && (
            <p style={{ color: C.muted, textAlign: "center", fontSize: 15 }}>
              Sermons coming soon! Check back or visit our YouTube channel.
            </p>
          )}
        </div>
      </div>
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bg, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 20 : 24, fontWeight: 700, marginBottom: 8, color: C.white }}>Get The App</h2>
        <p style={{ color: C.muted, fontSize: 15, marginBottom: 20 }}>Stay connected and get the latest content.</p>
        <button style={btnSt}>Download The App</button>
      </div>
    </>
  );
}

// ─── LIVESTREAM PAGE (with embed support) ────────────────────────
function LivestreamPage() {
  const hasEmbed = SITE.livestreamEmbedUrl && SITE.livestreamEmbedUrl.length > 0;
  return (
    <>
      <Hero title="Livestream" />
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bgAlt, textAlign: "center" }}>
        {hasEmbed ? (
          <div style={{ maxWidth: 700, margin: "0 auto", borderRadius: 8, overflow: "hidden" }}>
            <iframe
              src={SITE.livestreamEmbedUrl}
              style={{ width: "100%", aspectRatio: "16/9", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{
            maxWidth: 700, margin: "0 auto", background: C.bgDark, borderRadius: 8,
            aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${C.border}`, flexDirection: "column", gap: 12,
          }}>
            <div style={{ fontSize: 48, color: C.muted }}>📡</div>
            <p style={{ color: C.muted, fontSize: 16, fontWeight: 600, margin: 0 }}>No live stream right now</p>
            <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>Check back during service times!</p>
          </div>
        )}
        <div style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {SITE.youtubeChannel && (
            <a href={SITE.youtubeChannel} target="_blank" style={{
              ...btnSt, textDecoration: "none", display: "inline-block",
            }}>Watch on YouTube</a>
          )}
          {SITE.facebookPage && (
            <a href={SITE.facebookPage} target="_blank" style={{
              ...btnSt, background: "transparent", border: `2px solid ${C.accent}`, color: C.accent,
              textDecoration: "none", display: "inline-block",
            }}>Watch on Facebook</a>
          )}
        </div>
      </div>
      <div style={{ padding: m() ? "40px 20px" : "60px 40px", background: C.bg, textAlign: "center" }}>
        <h2 style={{ fontSize: m() ? 20 : 24, fontWeight: 700, marginBottom: 8, color: C.white }}>Get The App</h2>
        <p style={{ color: C.muted, fontSize: 15, marginBottom: 20 }}>Stay connected and get the latest content.</p>
        <button style={btnSt}>Download The App</button>
      </div>
    </>
  );
}

// ─── PAGE ROUTER ─────────────────────────────────────────────────
function Page({ page, go }) {
  switch (page) {
    case "im-new": return <ImNewPage />;
    case "mission-and-vision": return <MissionPage />;
    case "what-we-believe": return <BelievePage />;
    case "our-story": return <StoryPage />;
    case "contact": return <ContactPage />;
    case "give": return <GivePage />;
    case "sermons": return <SermonsPage />;
    case "livestream": return <LivestreamPage />;
    default: return <HomePage go={go} />;
  }
}

// ─── DEVICE PREVIEW BAR ─────────────────────────────────────────
function DeviceBar({ device, setDevice }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, padding: "10px 16px", background: "#0a0a0a",
      borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 9999,
    }}>
      <span style={{ color: "#666", fontSize: 12, marginRight: 8 }}>PREVIEW:</span>
      {[
        { k: "desktop", l: "🖥 Desktop" },
        { k: "tablet", l: "📱 iPad" },
        { k: "mobile", l: "📲 Mobile" },
      ].map(o => (
        <button key={o.k} onClick={() => setDevice(o.k)} style={{
          padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600,
          cursor: "pointer", border: "none",
          background: device === o.k ? C.accent : C.bgDark,
          color: device === o.k ? "#1a0e2e" : C.muted,
        }}>{o.l}</button>
      ))}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function IgniteMB() {
  const [device, setDevice] = useState("desktop");
  const [page, setPage] = useState("home");
  _dev = device;

  const w = device === "mobile" ? 375 : device === "tablet" ? 768 : "100%";

  return (
    <div style={{ fontFamily: ff, color: C.white, background: "#0a0a0a", minHeight: "100vh", lineHeight: 1.6 }}>
      <DeviceBar device={device} setDevice={setDevice} />
      <div style={{
        width: w, maxWidth: "100%", margin: "0 auto", background: C.bg,
        boxShadow: device !== "desktop" ? "0 0 40px rgba(30,18,51,.7)" : "none",
        borderRadius: device !== "desktop" ? 10 : 0, overflow: "hidden",
        ...(device !== "desktop" && { marginTop: 16, marginBottom: 40 }),
      }}>
        <Navbar page={page} go={setPage} />
        <Page page={page} go={setPage} />
        <Footer />
      </div>
    </div>
  );
}
