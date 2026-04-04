const inputEl = document.getElementById("bwt-input");
const transformBtn = document.getElementById("transform");
const stepBtn = document.getElementById("step");
const resetBtn = document.getElementById("reset");
const matrixContainer = document.getElementById("matrix-container");
const outputEl = document.getElementById("bwt-output");
const outputContainer = document.querySelector(".bwt-output-container");
const stepEls = [
  document.getElementById("step-append"),
  document.getElementById("step-rotate"),
  document.getElementById("step-sort"),
  document.getElementById("step-slice"),
];

let currentStep = 0;
let bwtState = null; // { appended, rotations, sorted, bwt }

inputEl.addEventListener("input", function () {
  const hasText = inputEl.value.length > 0;
  transformBtn.disabled = !hasText;
  stepBtn.disabled = !hasText;
  resetBtn.disabled = !hasText;
});

transformBtn.addEventListener("click", function () {
  const input = inputEl.value;
  if (!input) return;
  bwtState = computeBwt(input);
  currentStep = 4;
  transformBtn.disabled = true;
  renderStep();
});

stepBtn.addEventListener("click", function () {
  const input = inputEl.value;
  if (!input) return;
  if (currentStep === 0) {
    bwtState = computeBwt(input);
    transformBtn.disabled = true;
  }
  if (currentStep < 4) {
    currentStep++;
    renderStep();
  }
});

resetBtn.addEventListener("click", function () {
  inputEl.value = "";
  transformBtn.disabled = true;
  stepBtn.disabled = true;
  resetBtn.disabled = true;
  currentStep = 0;
  bwtState = null;
  matrixContainer.textContent = "--";
  outputEl.textContent = "--";
  outputContainer.classList.remove("has-content");
  updateStepIndicators();
});

function computeBwt(input) {
  const appended = input + "\0";
  const n = appended.length;
  const rotations = [];
  for (let i = 0; i < n; i++) {
    rotations.push(appended.slice(n - i) + appended.slice(0, n - i));
  }
  const sorted = [...rotations].sort();
  const bwt = sorted.map(row => row[row.length - 1]).join("");
  return { appended, rotations, sorted, bwt };
}

function renderStep() {
  if (!bwtState) return;
  updateStepIndicators();

  if (currentStep === 1) {
    renderMatrix([bwtState.appended], { highlightLastCol: false });
  } else if (currentStep === 2) {
    renderMatrix(bwtState.rotations, { highlightLastCol: false });
  } else if (currentStep === 3) {
    renderMatrix(bwtState.sorted, { showHeaders: true, highlightLastCol: false });
  } else if (currentStep === 4) {
    renderMatrix(bwtState.sorted, { showHeaders: true, highlightLastCol: true });
    outputEl.textContent = bwtState.bwt.replace(/\0/g, "$");
    outputContainer.classList.add("has-content");
  }

  stepBtn.disabled = currentStep >= 4 || !inputEl.value;
}

function updateStepIndicators() {
  for (let i = 0; i < stepEls.length; i++) {
    stepEls[i].classList.remove("active", "complete");
    if (currentStep > 0) {
      if (i < currentStep - 1) {
        stepEls[i].classList.add("complete");
      } else if (i === currentStep - 1) {
        stepEls[i].classList.add("active");
      }
    }
  }
}

function formatChar(ch) {
  if (ch === "\0") return "$";
  if (ch === " ") return "\u2591";
  if (ch === "\n") return "\u21B5";
  return ch;
}

const MAX_COLS = 25;

function colLayout(n) {
  if (n <= MAX_COLS) return { truncated: false, half: 0 };
  const half = Math.floor((MAX_COLS - 1) / 2);
  return { truncated: true, half };
}

function renderMatrix(table, { highlightLastCol = false } = {}) {
  const n = table[0].length;
  const { truncated, half } = colLayout(n);

  const tbl = document.createElement("table");
  tbl.classList.add("bwt-matrix-table");
  if (highlightLastCol) {
    tbl.classList.add("highlight-last-col");
  }

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("bwt-matrix-header");
  for (let c = 0; c < n; c++) {
    if (truncated && c === half) {
      const th = document.createElement("th");
      th.textContent = "TRUNCATED";
      th.style.color = "#999";
      th.style.fontStyle = "italic";
      headerRow.appendChild(th);
    }
    if (truncated && c >= half && c < n - half) continue;
    const th = document.createElement("th");
    if (c === 0) th.textContent = "F";
    else if (c === n - 1) th.textContent = "L";
    else th.innerHTML = "&nbsp;";
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  tbl.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (let r = 0; r < table.length; r++) {
    const tr = document.createElement("tr");
    for (let c = 0; c < n; c++) {
      if (truncated && c === half) {
        const td = document.createElement("td");
        td.textContent = "...";
        td.style.color = "#999";
        td.style.textAlign = "center";
        tr.appendChild(td);
      }
      if (truncated && c >= half && c < n - half) continue;
      const td = document.createElement("td");
      td.textContent = formatChar(table[r][c]);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  tbl.appendChild(tbody);

  matrixContainer.replaceChildren(tbl);
}
