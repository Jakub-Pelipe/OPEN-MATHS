const textEls = [
  document.querySelector('.text-1'),
  document.querySelector('.text-2')
];

let spans = [];
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let rafPending = false;

// Split text into individual <span> letters
function splitToSpans(el) {
  const chars = el.textContent.split("");
  el.innerHTML = "";
  chars.forEach(char => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    el.appendChild(span);
  });
}

textEls.forEach(splitToSpans);
spans = [...document.querySelectorAll("h1 span")];

// Update weight of each letter based on cursor distance
function updateWeights() {
  spans.forEach(span => {
    const rect = span.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cx - pointerX;
    const dy = cy - pointerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const maxDist = Math.max(window.innerWidth, window.innerHeight);
    const weight = Math.round(Math.max(200, 500 - (dist / maxDist) * 700));

    span.style.fontVariationSettings = `"wght" ${weight}`;
  });

  rafPending = false;
}

window.addEventListener("mousemove", e => {
  pointerX = e.clientX;
  pointerY = e.clientY;

  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(updateWeights);
  }
});

// Initial update
window.addEventListener("load", () => {
  spans = [...document.querySelectorAll("h1 span")];
  requestAnimationFrame(updateWeights);
});
