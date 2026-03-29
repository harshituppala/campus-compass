import React, { useState, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// ── THEME ──────────────────────────────────────────────────────────────────
const C = {
  navy:   '#1B3A6B',
  steel:  '#2563A8',
  light:  '#EFF6FF',
  green:  '#16A34A',
  red:    '#DC2626',
  yellow: '#D97706',
  purple: '#7C3AED',
  pink:   '#DB2777',
  teal:   '#0D9488',
  text:   '#1A1A1A',
  muted:  '#6B7280',
  border: '#E5E7EB',
  bg:     '#F8FAFC',
};

const CATEGORY_META = {
  'Events':         { color: C.steel,  icon: '🎉', bg: '#EFF6FF' },
  'Study Spaces':   { color: C.green,  icon: '📚', bg: '#F0FDF4' },
  'Clubs':          { color: C.purple, icon: '🎓', bg: '#F5F3FF' },
  'Resources':      { color: C.yellow, icon: '🛠', bg: '#FFFBEB' },
  'Food & Caf':     { color: C.red,    icon: '🍕', bg: '#FEF2F2' },
  'Health & Wellness': { color: C.teal, icon: '💚', bg: '#F0FDFA' },
  'Career':         { color: C.pink,   icon: '💼', bg: '#FDF2F8' },
};

const TAGS = ['All', ...Object.keys(CATEGORY_META)];

// ── REAL MUN DATA ──────────────────────────────────────────────────────────
const LISTINGS = [
  // EVENTS
  {
    id: 1, category: 'Events', title: 'Engineering Career Fair 2026',
    location: 'EN Building Atrium', building: 'EN', floor: 'Ground',
    date: '2026-04-05', time: '10:00 AM – 3:00 PM',
    tags: ['career', 'engineering', 'networking'],
    description: 'Meet recruiters from over 40 engineering and tech companies across Canada. Bring printed resumes. Business casual attire recommended.',
    contact: 'engcareer@mun.ca', capacity: 500, spots: 312, pinned: true,
    lat: 47.5722, lng: -52.7362,
  },
  {
    id: 2, category: 'Events', title: 'MUN Hackathon — Spring 2026',
    location: 'IIC Building', building: 'IIC', floor: '2nd Floor',
    date: '2026-04-12', time: '9:00 AM (24hr)',
    tags: ['hackathon', 'cs', 'coding', 'prizes'],
    description: '24-hour hackathon open to all MUN students. Form teams of 2–4. Prizes up to $2,000. Theme announced at kickoff. Food and drinks provided.',
    contact: 'csclub@mun.ca', capacity: 120, spots: 47, pinned: true,
    lat: 47.5715, lng: -52.7345,
  },
  {
    id: 3, category: 'Events', title: 'International Students Networking Night',
    location: 'University Centre, Rooms 4001–4003',
    building: 'UC', floor: '4th Floor',
    date: '2026-04-08', time: '6:00 PM – 9:00 PM',
    tags: ['international', 'networking', 'social'],
    description: 'Connect with international students, alumni working in Canada, and immigration advisors. Free dinner provided. Hosted by ISA MUN.',
    contact: 'isa@mun.ca', capacity: 200, spots: 83,
    lat: 47.5710, lng: -52.7370,
  },
  {
    id: 4, category: 'Events', title: 'Guest Lecture: AI in Healthcare',
    location: 'HSC Lecture Theatre H1890',
    building: 'HSC', floor: '1st Floor',
    date: '2026-04-03', time: '2:00 PM – 3:30 PM',
    tags: ['ai', 'healthcare', 'lecture', 'cs'],
    description: 'Dr. Sarah Connors (Babylon Health) presents on deploying LLMs in clinical settings. Q&A to follow. Open to all faculties.',
    contact: 'cs@mun.ca', capacity: 180, spots: 55,
    lat: 47.5705, lng: -52.7380,
  },

  // STUDY SPACES
  {
    id: 5, category: 'Study Spaces', title: 'QEII Library — Quiet Zone (Level 4)',
    location: 'QEII Library, Level 4', building: 'QEII', floor: '4th Floor',
    date: null, time: 'Mon–Fri: 8am–11pm | Sat–Sun: 10am–8pm',
    tags: ['quiet', 'library', '24hr', 'wifi'],
    description: 'Strictly silent zone. 80+ individual study carrels with power outlets. Best for exam prep. Booking required for group rooms on Level 3.',
    contact: 'library@mun.ca', capacity: 80, spots: null,
    lat: 47.5718, lng: -52.7355,
  },
  {
    id: 6, category: 'Study Spaces', title: 'CS Lounge — EN2030',
    location: 'Engineering Building, Room EN2030',
    building: 'EN', floor: '2nd Floor',
    date: null, time: 'Mon–Fri: 8am–10pm',
    tags: ['cs', 'collaborative', 'whiteboard', 'wifi'],
    description: 'Dedicated CS student lounge with whiteboards, fast WiFi, and collaborative seating. Great for group project work. Unofficial CS student hub.',
    contact: 'cs@mun.ca', capacity: 30, spots: null,
    lat: 47.5722, lng: -52.7362,
  },
  {
    id: 7, category: 'Study Spaces', title: 'The Bruneau Centre — Open Study Area',
    location: 'Bruneau Centre for Research and Innovation',
    building: 'BCI', floor: 'Ground',
    date: null, time: 'Mon–Fri: 7am–9pm',
    tags: ['collaborative', 'innovation', 'startups', 'wifi'],
    description: 'Modern open-concept study and collaboration space. Ideal for startup work, design thinking sessions, and interdisciplinary projects.',
    contact: 'bruneau@mun.ca', capacity: 60, spots: null,
    lat: 47.5728, lng: -52.7340,
  },

  // CLUBS
  {
    id: 8, category: 'Clubs', title: 'Computer Science Society (CSS)',
    location: 'EN2030', building: 'EN', floor: '2nd Floor',
    date: 'Weekly Thursdays', time: '5:30 PM – 7:00 PM',
    tags: ['cs', 'coding', 'networking', 'social'],
    description: 'MUN\'s largest CS club. Weekly meetups cover LeetCode sessions, guest speakers, project showcases, and social events. All CS students welcome.',
    contact: 'css@mun.ca', capacity: null, spots: null,
    lat: 47.5722, lng: -52.7362,
  },
  {
    id: 9, category: 'Clubs', title: 'MUN Entrepreneurship Society',
    location: 'Bruneau Centre', building: 'BCI', floor: 'Ground',
    date: 'Bi-weekly Tuesdays', time: '6:00 PM – 8:00 PM',
    tags: ['entrepreneurship', 'startups', 'business', 'networking'],
    description: 'For students building startups or interested in entrepreneurship. Pitch nights, mentorship sessions, and connections to NL venture community.',
    contact: 'entresoc@mun.ca', capacity: null, spots: null,
    lat: 47.5728, lng: -52.7340,
  },
  {
    id: 10, category: 'Clubs', title: 'AI & Machine Learning Club',
    location: 'EN3000', building: 'EN', floor: '3rd Floor',
    date: 'Weekly Wednesdays', time: '6:00 PM – 7:30 PM',
    tags: ['ai', 'ml', 'python', 'research', 'cs'],
    description: 'Paper reading group, Kaggle competitions, and hands-on ML project teams. Currently working on NLP and computer vision projects.',
    contact: 'aiclub@mun.ca', capacity: null, spots: null,
    lat: 47.5720, lng: -52.7360,
  },

  // RESOURCES
  {
    id: 11, category: 'Resources', title: 'Student Success Centre — Free Tutoring',
    location: 'University Centre, Room 3000',
    building: 'UC', floor: '3rd Floor',
    date: null, time: 'Mon–Fri: 9am–5pm',
    tags: ['tutoring', 'academic', 'free', 'writing'],
    description: 'Free drop-in tutoring for most 1000–3000 level courses. Writing centre, math help, and academic skills workshops. Book appointments online.',
    contact: 'studentsuccess@mun.ca', capacity: null, spots: null,
    lat: 47.5710, lng: -52.7370,
  },
  {
    id: 12, category: 'Resources', title: 'Career Development & Experiential Learning',
    location: 'UC-4000', building: 'UC', floor: '4th Floor',
    date: null, time: 'Mon–Fri: 8:30am–4:30pm',
    tags: ['career', 'resume', 'coop', 'internship', 'cics'],
    description: 'Resume reviews, mock interviews, co-op advising (including CICS), and job postings via MyCareer. Drop-in Wednesdays 1–3pm, no appointment needed.',
    contact: 'cdel@mun.ca', capacity: null, spots: null,
    lat: 47.5710, lng: -52.7370,
  },
  {
    id: 13, category: 'Resources', title: 'MUN Tech Lending Library',
    location: 'QEII Library, Level 1 Desk',
    building: 'QEII', floor: '1st Floor',
    date: null, time: 'Mon–Fri: 9am–8pm',
    tags: ['equipment', 'laptop', 'free', 'library'],
    description: 'Borrow laptops, calculators, HDMI cables, webcams, and recording equipment for up to 7 days. Free with valid MUN ID.',
    contact: 'library@mun.ca', capacity: null, spots: null,
    lat: 47.5718, lng: -52.7355,
  },

  // FOOD
  {
    id: 14, category: 'Food & Caf', title: 'The Grill — Paton College Cafeteria',
    location: 'Paton College', building: 'Paton', floor: 'Ground',
    date: null, time: 'Mon–Fri: 7:30am–9pm | Weekends: 9am–7pm',
    tags: ['food', 'meal plan', 'affordable', 'hot meals'],
    description: 'Main campus cafeteria. Accepts meal plan credits. Daily hot meal specials under $10, salad bar, pizza, and grill options. Busiest 12–1pm.',
    contact: null, capacity: 300, spots: null,
    lat: 47.5700, lng: -52.7380,
  },
  {
    id: 15, category: 'Food & Caf', title: 'Grounds for Appeal — Law Café',
    location: 'Faculty of Law Building',
    building: 'LAW', floor: 'Ground',
    date: null, time: 'Mon–Fri: 8am–4pm',
    tags: ['coffee', 'quiet', 'affordable', 'snacks'],
    description: 'Hidden gem. Best coffee on campus, less crowded than Tim Hortons. Good for quiet working. Cash and card accepted.',
    contact: null, capacity: 40, spots: null,
    lat: 47.5708, lng: -52.7350,
  },

  // HEALTH
  {
    id: 16, category: 'Health & Wellness', title: 'Student Wellness & Counselling',
    location: 'University Centre, Room 2100',
    building: 'UC', floor: '2nd Floor',
    date: null, time: 'Mon–Fri: 8:30am–4:30pm',
    tags: ['mental health', 'counselling', 'free', 'wellness'],
    description: 'Free confidential counselling for MUN students. Same-day crisis support available. Book through the student portal. Waitlist for ongoing sessions.',
    contact: 'wellness@mun.ca', capacity: null, spots: null,
    lat: 47.5710, lng: -52.7370,
  },
  {
    id: 17, category: 'Health & Wellness', title: 'MUN Field House — Student Gym',
    location: 'Field House, Main Campus',
    building: 'FH', floor: 'Ground',
    date: null, time: 'Mon–Fri: 6am–10pm | Weekends: 8am–8pm',
    tags: ['gym', 'fitness', 'pool', 'recreation'],
    description: 'Full gym, Olympic pool, courts, and fitness classes. Free with Student Union fee. Lockers available. Busiest 4–6pm weekdays.',
    contact: 'fieldhouse@mun.ca', capacity: null, spots: null,
    lat: 47.5695, lng: -52.7365,
  },

  // CAREER
  {
    id: 18, category: 'Career', title: 'CICS Info Session — Co-op Internship Program',
    location: 'EN2022', building: 'EN', floor: '2nd Floor',
    date: '2026-03-25', time: '1:00 PM – 2:00 PM',
    tags: ['cics', 'internship', 'coop', 'cs', 'career'],
    description: 'Information session for the Co-operative Internship in Computer Science. Learn about application requirements, timelines, and past intern experiences.',
    contact: 'cs@mun.ca', capacity: 60, spots: 18, pinned: true,
    lat: 47.5722, lng: -52.7362,
  },
  {
    id: 19, category: 'Career', title: 'LinkedIn & Resume Workshop',
    location: 'UC-4010', building: 'UC', floor: '4th Floor',
    date: '2026-04-02', time: '3:00 PM – 5:00 PM',
    tags: ['resume', 'linkedin', 'career', 'workshop'],
    description: 'Hands-on workshop with CDEL advisors. Bring your resume and laptop. Focus on tech industry resumes and LinkedIn optimization.',
    contact: 'cdel@mun.ca', capacity: 30, spots: 12,
    lat: 47.5710, lng: -52.7370,
  },
];

// ── SIMPLE MAP COMPONENT ───────────────────────────────────────────────────
function CampusMap({ listings, selected, onSelect }) {
  // MUN campus bounding box (approximate)
  const MAP_BOUNDS = { minLat: 47.568, maxLat: 47.575, minLng: -52.740, maxLng: -52.733 };

  function project(lat, lng) {
    const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
    const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
    return { x, y };
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#E8F0E8', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
      {/* Campus background paths */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {/* Roads */}
        <rect x="0" y="0" width="100" height="100" fill="#E8F0E8" />
        {/* Main campus paths */}
        <path d="M 10 50 L 90 50" stroke="#C8D8C8" strokeWidth="2" fill="none" />
        <path d="M 50 10 L 50 90" stroke="#C8D8C8" strokeWidth="2" fill="none" />
        <path d="M 10 30 L 90 30" stroke="#C8D8C8" strokeWidth="1.5" fill="none" />
        <path d="M 10 70 L 90 70" stroke="#C8D8C8" strokeWidth="1.5" fill="none" />
        {/* Buildings */}
        <rect x="30" y="20" width="15" height="12" rx="1" fill="#D0DDD0" stroke="#B0C0B0" strokeWidth="0.5" />
        <rect x="55" y="20" width="18" height="10" rx="1" fill="#D0DDD0" stroke="#B0C0B0" strokeWidth="0.5" />
        <rect x="20" y="42" width="20" height="16" rx="1" fill="#D0DDD0" stroke="#B0C0B0" strokeWidth="0.5" />
        <rect x="58" y="40" width="22" height="18" rx="1" fill="#D0DDD0" stroke="#B0C0B0" strokeWidth="0.5" />
        <rect x="30" y="65" width="14" height="12" rx="1" fill="#D0DDD0" stroke="#B0C0B0" strokeWidth="0.5" />
        <rect x="55" y="68" width="16" height="10" rx="1" fill="#D0DDD0" stroke="#B0C0B0" strokeWidth="0.5" />
        {/* Green spaces */}
        <ellipse cx="50" cy="50" rx="6" ry="4" fill="#B8D4B8" opacity="0.6" />
        <ellipse cx="75" cy="30" rx="4" ry="3" fill="#B8D4B8" opacity="0.6" />
        {/* Labels */}
        <text x="35" y="28" fontSize="2.5" fill="#6B7280" textAnchor="middle">EN</text>
        <text x="64" y="27" fontSize="2.5" fill="#6B7280" textAnchor="middle">QEII</text>
        <text x="30" y="52" fontSize="2.5" fill="#6B7280" textAnchor="middle">UC</text>
        <text x="69" y="51" fontSize="2.5" fill="#6B7280" textAnchor="middle">HSC</text>
        <text x="37" y="74" fontSize="2.5" fill="#6B7280" textAnchor="middle">Paton</text>
        <text x="63" y="75" fontSize="2.5" fill="#6B7280" textAnchor="middle">FH</text>
        <text x="50" y="4" fontSize="3" fill={C.navy} textAnchor="middle" fontWeight="bold">Memorial University of Newfoundland</text>
      </svg>

      {/* Pins */}
      {listings.map(item => {
        const pos = project(item.lat, item.lng);
        const meta = CATEGORY_META[item.category];
        const isSelected = selected?.id === item.id;
        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -100%)',
              cursor: 'pointer',
              zIndex: isSelected ? 10 : 5,
              transition: 'transform 0.15s',
            }}
            title={item.title}
          >
            <div style={{
              background: isSelected ? C.navy : meta.color,
              color: '#fff',
              borderRadius: '50% 50% 50% 0',
              width: isSelected ? 36 : 28,
              height: isSelected ? 36 : 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isSelected ? 16 : 12,
              boxShadow: isSelected ? `0 4px 12px rgba(0,0,0,0.3)` : '0 2px 6px rgba(0,0,0,0.2)',
              border: `2px solid white`,
              transform: 'rotate(-45deg)',
            }}>
              <span style={{ transform: 'rotate(45deg)' }}>{meta.icon}</span>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(255,255,255,0.92)', borderRadius: 8, padding: '6px 10px', fontSize: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(CATEGORY_META).slice(0, 4).map(([cat, meta]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10 }}>{meta.icon}</span>
            <span style={{ color: meta.color, fontWeight: 600 }}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CARD COMPONENT ─────────────────────────────────────────────────────────
function ListingCard({ item, onClick, isSelected }) {
  const meta = CATEGORY_META[item.category];
  const spotsLeft = item.spots != null ? item.spots : null;
  const urgency = spotsLeft != null && spotsLeft < 20;

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        background: '#fff',
        borderRadius: 10,
        padding: '14px 16px',
        cursor: 'pointer',
        border: isSelected ? `2px solid ${C.navy}` : `1px solid ${C.border}`,
        boxShadow: isSelected ? `0 4px 16px rgba(27,58,107,0.15)` : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.15s',
        marginBottom: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 8, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          {meta.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {item.pinned && <span style={{ fontSize: 9, background: C.navy, color: '#fff', padding: '2px 5px', borderRadius: 3, fontWeight: 700, letterSpacing: '0.05em' }}>FEATURED</span>}
            <span style={{ fontSize: 9, background: meta.bg, color: meta.color, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>{item.category}</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginTop: 4, lineHeight: 1.3 }}>{item.title}</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>📍 {item.location}</div>
          {item.date && <div style={{ fontSize: 11, color: C.steel, marginTop: 2, fontWeight: 600 }}>📅 {item.date} · {item.time}</div>}
          {!item.date && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>🕐 {item.time}</div>}
          {urgency && (
            <div style={{ fontSize: 11, color: C.red, fontWeight: 700, marginTop: 4 }}>⚡ Only {spotsLeft} spots left!</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── DETAIL PANEL ───────────────────────────────────────────────────────────
function DetailPanel({ item, onClose }) {
  const meta = CATEGORY_META[item.category];
  const spotsLeft = item.spots;
  const urgency = spotsLeft != null && spotsLeft < 20;
  const fillPct = item.capacity && spotsLeft != null ? Math.round(((item.capacity - spotsLeft) / item.capacity) * 100) : null;

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          {meta.icon}
        </div>
        <button onClick={onClose} style={{ background: C.bg, border: 'none', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', color: C.muted, fontSize: 16 }}>✕</button>
      </div>

      {item.pinned && (
        <div style={{ background: `${C.navy}15`, border: `1px solid ${C.navy}30`, borderRadius: 6, padding: '6px 10px', fontSize: 11, color: C.navy, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>
          ⭐ FEATURED LISTING
        </div>
      )}

      <span style={{ fontSize: 11, background: meta.bg, color: meta.color, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>{item.category}</span>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: '10px 0 6px 0', lineHeight: 1.3 }}>{item.title}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: C.muted }}>📍 {item.location}{item.floor ? ` · ${item.floor}` : ''}</div>
        {item.date && <div style={{ fontSize: 13, color: C.steel, fontWeight: 600 }}>📅 {item.date}</div>}
        <div style={{ fontSize: 13, color: C.muted }}>🕐 {item.time}</div>
        {item.contact && <div style={{ fontSize: 13, color: C.steel }}>✉ {item.contact}</div>}
      </div>

      <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 16 }}>{item.description}</p>

      {/* Capacity bar */}
      {fillPct != null && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.muted, marginBottom: 4 }}>
            <span>Capacity</span>
            <span style={{ color: urgency ? C.red : C.green, fontWeight: 700 }}>
              {spotsLeft} spots left of {item.capacity}
            </span>
          </div>
          <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${fillPct}%`, background: urgency ? C.red : C.green, borderRadius: 3, transition: 'width 0.5s' }} />
          </div>
        </div>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {item.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, background: C.bg, color: C.muted, padding: '3px 8px', borderRadius: 12, border: `1px solid ${C.border}`, fontWeight: 500 }}>#{tag}</span>
        ))}
      </div>

      {/* CTA */}
      {item.contact && (
        <a href={`mailto:${item.contact}`} style={{ display: 'block', background: C.navy, color: '#fff', borderRadius: 8, padding: '12px', textAlign: 'center', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
          Contact / Register →
        </a>
      )}
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('list'); // 'list' | 'map'

  const filtered = useMemo(() => {
    return LISTINGS.filter(item => {
      const matchTag = activeTag === 'All' || item.category === activeTag;
      const q = search.toLowerCase();
      const matchSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.some(t => t.includes(q)) || item.location.toLowerCase().includes(q);
      return matchTag && matchSearch;
    }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [activeTag, search]);

  const stats = useMemo(() => ({
    events: LISTINGS.filter(l => l.category === 'Events' && l.date).length,
    spaces: LISTINGS.filter(l => l.category === 'Study Spaces').length,
    clubs: LISTINGS.filter(l => l.category === 'Clubs').length,
  }), []);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Inter, Segoe UI, sans-serif' }}>
      <Toaster position="top-right" />

      {/* Header */}
      <div style={{ background: C.navy, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>🧭</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em' }}>MUN Campus Compass</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Events · Study Spaces · Resources · Clubs</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['list', 'map'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? 'rgba(255,255,255,0.2)' : 'none',
              border: `1px solid ${view === v ? 'rgba(255,255,255,0.4)' : 'transparent'}`,
              color: '#fff', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, textTransform: 'capitalize'
            }}>{v === 'list' ? '☰ List' : '🗺 Map'}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: C.light, borderBottom: `1px solid ${C.border}`, padding: '8px 32px', display: 'flex', gap: 24, fontSize: 12, color: C.steel, fontWeight: 600 }}>
        <span>🎉 {stats.events} Upcoming Events</span>
        <span>📚 {stats.spaces} Study Spaces</span>
        <span>🎓 {stats.clubs} Active Clubs</span>
        <span style={{ marginLeft: 'auto', color: C.muted, fontWeight: 400 }}>Memorial University of Newfoundland · St. John's, NL</span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px' }}>

        {/* Search + filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.muted, fontSize: 14 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, spaces, clubs, resources..."
              style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, background: '#fff', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TAGS.map(tag => {
              const meta = tag !== 'All' ? CATEGORY_META[tag] : null;
              const active = activeTag === tag;
              return (
                <button key={tag} onClick={() => setActiveTag(tag)} style={{
                  padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  background: active ? (meta?.color || C.navy) : '#fff',
                  color: active ? '#fff' : C.muted,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'all 0.15s',
                }}>
                  {meta ? `${meta.icon} ` : ''}{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}{activeTag !== 'All' ? ` in ${activeTag}` : ''}{search ? ` for "${search}"` : ''}
        </div>

        {/* Content */}
        {view === 'list' ? (
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
            {/* Listing grid */}
            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: 0, alignContent: 'start' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: C.muted, gridColumn: '1/-1' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontWeight: 600 }}>No results found</div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Try a different search or category</div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
                  {filtered.map(item => (
                    <ListingCard key={item.id} item={item} onClick={setSelected} isSelected={selected?.id === item.id} />
                  ))}
                </div>
              )}
            </div>
            {/* Detail panel */}
            {selected && (
              <div style={{ position: 'sticky', top: 20, height: 'fit-content', maxHeight: 'calc(100vh - 160px)', overflow: 'auto' }}>
                <DetailPanel item={selected} onClose={() => setSelected(null)} />
              </div>
            )}
          </div>
        ) : (
          /* MAP VIEW */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, height: 600 }}>
            <CampusMap listings={filtered} selected={selected} onSelect={setSelected} />
            <div style={{ overflow: 'auto' }}>
              {selected ? (
                <DetailPanel item={selected} onClose={() => setSelected(null)} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Click a pin to see details</p>
                  {filtered.map(item => (
                    <ListingCard key={item.id} item={item} onClick={setSelected} isSelected={false} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '24px', color: C.muted, fontSize: 12, borderTop: `1px solid ${C.border}`, marginTop: 20 }}>
        Built by <strong>Harshit Kumar Uppala</strong> · MUN Computer Science · github.com/harshituppala
      </div>
    </div>
  );
}
