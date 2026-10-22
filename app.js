// 1. Color Palette mapped with 10 distinct mood keywords each
const colorData = [
  {
    color: 'hsl(0, 100%, 60%)',
    name: 'red',
    keywords: ['dramatic', 'suspense', 'sensual', 'intense', 'fiery', 'passionate', 'bold', 'urgent', 'provocative', 'rebellious']
  },
  {
    color: 'hsl(35, 100%, 55%)',
    name: 'orange',
    keywords: ['energetic', 'warm', 'upbeat', 'playful', 'spontaneous', 'vibrant', 'adventurous', 'social', 'enthusiastic', 'cozy']
  },
  {
    color: 'hsl(55, 100%, 50%)',
    name: 'yellow',
    keywords: ['happy', 'mellow', 'bright', 'melancholic', 'joyful', 'optimistic', 'carefree', 'nostalgic', 'radiant', 'whimsical']
  },
  {
    color: 'hsl(120, 100%, 50%)',
    name: 'green',
    keywords: ['peaceful', 'fresh', 'organic', 'grounded', 'restorative', 'serene', 'flourishing', 'tranquil', 'pure', 'renewed']
  },
  {
    color: 'hsl(175, 100%, 45%)',
    name: 'teal',
    keywords: ['dreamy', 'chilled', 'flowing', 'ethereal', 'refreshing', 'reflective', 'unwinding', 'fluid', 'transcendent', 'mystic']
  },
  {
    color: 'hsl(215, 100%, 60%)',
    name: 'blue',
    keywords: ['calm', 'serene', 'moody', 'nostalgic', 'deep', 'contemplative', 'pensive', 'soothing', 'melancholy', 'introspective']
  },
  {
    color: 'hsl(270, 100%, 60%)',
    name: 'purple',
    keywords: ['mystical', 'deep', 'hypnotic', 'luxurious', 'enigmatic', 'surreal', 'regal', 'haunting', 'psychedelic', 'cosmic']
  },
  {
    color: 'hsl(320, 100%, 60%)',
    name: 'pink',
    keywords: ['romantic', 'sweet', 'euphoric', 'tender', 'affectionate', 'delicate', 'dreamy', 'youthful', 'charming', 'sentimental']
  }
];

// 2. Song Database
const songDatabase = [
  { title: "Sunshine Glow", artist: "Aura", color: "yellow", tags: ["happy", "bright", "radiant"] },
  { title: "Rainy Window Pane", artist: "Lofi Beats", color: "yellow", tags: ["melancholic", "mellow", "nostalgic"] },
  { title: "Midnight Echoes", artist: "Oceanic", color: "blue", tags: ["calm", "serene", "soothing"] },
  { title: "Deep Thought Drive", artist: "Neon Nights", color: "blue", tags: ["moody", "introspective", "pensive"] },
  { title: "Scarlet Tango", artist: "Crimson", color: "red", tags: ["sensual", "passionate", "fiery"] },
  { title: "Chased by Shadows", artist: "Cinematic", color: "red", tags: ["suspense", "intense", "urgent"] }
];

// DOM References
const ring = document.getElementById('ring');
const keywordsContainer = document.getElementById('keywordsContainer');
const centerGlow = document.getElementById('centerGlow');
const backBtn = document.getElementById('backBtn');
const playlistSection = document.getElementById('playlistSection');
const generateBtn = document.getElementById('generateBtn');
const songList = document.getElementById('songList');

const totalCircles = colorData.length;
const radius = 130;
let activeCircle = null;
let activeColorData = null;
let selectedKeywords = new Set();

// 3. Initialize Circle Elements
colorData.forEach((data, index) => {
  const circle = document.createElement('div');
  circle.className = 'circle';

  const angle = (360 / totalCircles) * index;
  circle.style.setProperty('--angle', `${angle}deg`);
  circle.style.setProperty('--color', data.color);

  circle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents document click listener from closing right away
    if (activeCircle !== circle) {
      selectColor(circle, data, angle);
    }
  });

  ring.appendChild(circle);
});

// 4. Select Color & Dynamically Scatter Keywords Radially
function selectColor(circle, data, angleDeg) {
  activeCircle = circle;
  activeColorData = data;
  selectedKeywords.clear();

  circle.classList.add('active');
  ring.classList.add('paused', 'has-active');
  centerGlow.classList.add('dim');
  backBtn.classList.remove('hidden');
  playlistSection.classList.remove('hidden');

  // Convert angle to radians
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  const circleX = Math.cos(angleRad) * radius;
  const circleY = Math.sin(angleRad) * radius;

  // Generate 10-keyword radial offsets (5 inner, 5 outer)
  const offsets = [];

  for (let i = 0; i < 5; i++) {
    const rad = (i * (360 / 5) - 90) * (Math.PI / 180);
    offsets.push({ x: Math.cos(rad) * 65, y: Math.sin(rad) * 65 });
  }

  for (let i = 0; i < 5; i++) {
    const rad = (i * (360 / 5) - 54) * (Math.PI / 180);
    offsets.push({ x: Math.cos(rad) * 115, y: Math.sin(rad) * 115 });
  }

  data.keywords.slice(0, 10).forEach((keyword, i) => {
    const box = document.createElement('div');
    box.className = 'keyword-box';
    box.textContent = keyword;
    box.style.setProperty('--color', data.color);
    box.style.setProperty('--base-x', `${circleX}px`);
    box.style.setProperty('--base-y', `${circleY}px`);
    box.style.setProperty('--offset-x', `${offsets[i].x}px`);
    box.style.setProperty('--offset-y', `${offsets[i].y}px`);
    box.style.animationDelay = `${i * 0.04}s`;

    box.addEventListener('click', (e) => {
      e.stopPropagation(); // Don't trigger document click when selecting a tag
      if (selectedKeywords.has(keyword)) {
        selectedKeywords.delete(keyword);
        box.classList.remove('selected');
      } else {
        selectedKeywords.add(keyword);
        box.classList.add('selected');
      }
    });

    keywordsContainer.appendChild(box);
  });
}

// 5. Reset State Back to Color Wheel
backBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  clearActiveState();
});

playlistSection.addEventListener('click', (e) => {
  e.stopPropagation(); // Clicking inside playlist panel won't close keyword view
});

// Click anywhere on empty space to revert back to color wheel
document.addEventListener('click', () => {
  if (activeCircle) {
    clearActiveState();
  }
});

function clearActiveState() {
  if (activeCircle) {
    activeCircle.classList.remove('active');
    activeCircle = null;
  }
  ring.classList.remove('paused', 'has-active');
  centerGlow.classList.remove('dim');
  backBtn.classList.add('hidden');
  playlistSection.classList.add('hidden');
  keywordsContainer.innerHTML = '';
  songList.innerHTML = '';
  selectedKeywords.clear();
}

// 6. Filter & Render Playlist
generateBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!activeColorData) return;

  const filteredSongs = songDatabase.filter(song => {
    const matchColor = song.color === activeColorData.name;
    if (selectedKeywords.size > 0) {
      return matchColor && song.tags.some(tag => selectedKeywords.has(tag));
    }
    return matchColor;
  });

  renderPlaylist(filteredSongs);
});

function renderPlaylist(songs) {
  songList.innerHTML = '';
  if (songs.length === 0) {
    songList.innerHTML = `<div class="song-card">No exact matches found. Try selecting different keywords!</div>`;
    return;
  }

  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <span><strong>${song.title}</strong> — ${song.artist}</span>
      <small style="opacity:0.7;">${song.tags.join(', ')}</small>
    `;
    songList.appendChild(card);
  });
}
