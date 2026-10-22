// 8 HSL Rainbow Colors evenly distributed around the spectrum
const rainbowColors = [
  'hsl(0, 100%, 60%)',    // Red
  'hsl(35, 100%, 55%)',   // Orange
  'hsl(55, 100%, 50%)',   // Yellow
  'hsl(120, 100%, 50%)',  // Green
  'hsl(175, 100%, 45%)',  // Teal/Cyan
  'hsl(215, 100%, 60%)',  // Blue
  'hsl(270, 100%, 60%)',  // Indigo
  'hsl(320, 100%, 60%)'   // Pink
];

const ring = document.getElementById('ring');
const totalCircles = 8;

// Create and position the 8 rainbow circles dynamically
rainbowColors.forEach((color, index) => {
  const circle = document.createElement('div');
  circle.className = 'circle';

  // Calculate position angle: 360° / 8 = 45° separation
  const angle = (360 / totalCircles) * index;

  // Pass CSS custom variables directly to element
  circle.style.setProperty('--angle', `${angle}deg`);
  circle.style.setProperty('--color', color);

  ring.appendChild(circle);
});
