document.addEventListener("DOMContentLoaded", initialize);

function initialize(event) {
  populateInputFromQueryParams();
  initializeControlButtons();
  initializePlaybackSpeed();
}

function initializePlaybackSpeed() {
  document.querySelector('[data-should-be-default="true"]').checked = true;
}

function initializeControlButtons() {
  document.getElementById("step-button").disabled = false;
  document.getElementById("play-button").disabled = false;
  document.getElementById("pause-button").disabled = true;
  document.getElementById("reset-button").disabled = true;

  document
    .getElementById("step-button")
    .addEventListener("click", controlButtonFirstClicked, { once: true });

  document
    .getElementById("play-button")
    .addEventListener("click", controlButtonFirstClicked, { once: true });
  document
    .getElementById("reset-button")
    .addEventListener("click", onResetClicked, { once: true });
}

function onResetClicked(event) {
  document.getElementById("input").disabled = false;
  document.getElementById("result").value = "";

  document.getElementById("var-working").innerHTML = "&nbsp;";
  document.getElementById("var-encoding").innerHTML = "&nbsp;";
  document.getElementById("var-symbols").innerHTML = "&nbsp;";
  document.getElementById("var-aug").innerHTML = "&nbsp;";
  document.getElementById("var-code").innerHTML = "&nbsp;";

  document
    .getElementById("algo")
    .querySelectorAll(".active")
    .forEach(activeLineElement => {
      activeLineElement.classList.remove("active");
    });

  const tableBodyElement = document.getElementById("table-body");
  const omittedElement = tableBodyElement.lastElementChild;
  const reservedElement = omittedElement.previousElementSibling;

  tableBodyElement.replaceChildren(...[reservedElement, omittedElement]);

  initialize(event);
}

function controlButtonFirstClicked(event) {
  document.getElementById("input").disabled = true;

  [
    document.getElementById("step-button"),
    document.getElementById("play-button")
  ].forEach(element => {
    if (element !== event.target) {
      element.removeEventListener("click", controlButtonFirstClicked, {
        once: true
      });
    }
  });

  const encodings = document
    .getElementById("input")
    .value.split(",")
    .map(encoding => parseInt(encoding));

  document.getElementById("reset-button").disabled =
    event.target.id === "play-button";

  const autoPlayEnabled = event.target.id === "play-button";

  if (autoPlayEnabled) {
    event.target.disabled = true;
    document.getElementById("step-button").disabled = true;
    document.getElementById("pause-button").disabled = false;
  }

  decode(encodings, { autoPlayEnabled }).then(() => {
    document.getElementById("step-button").disabled = true;
    document.getElementById("play-button").disabled = true;
    document.getElementById("pause-button").disabled = true;
    document.getElementById("reset-button").disabled = false;
  });
}

function populateInputFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodingsParam = urlParams.get("encodings");

  if (encodingsParam) {
    const encodings = encodingsParam
      .split(",")
      .map(encoding => parseInt(encoding));

    document.getElementById("input").value = encodings;
  }

  if (document.getElementById("input").value === "") {
    document.getElementById("hint").style.display = "block";
  }
}

async function decode(encodings, initialCtx) {
  const symbolTable = Array(256)
    .fill(0)
    .map((symbolCode, i) => symbolCode + i)
    .reduce((acc, symbolCode) => {
      return { ...acc, [symbolCode]: String.fromCharCode(symbolCode) };
    }, {});

  let code = 257;
  let output = "";
  let working = "";

  let context = await step({
    currentLines: [2, 3],
    autoPlayEnabled: false,
    output,
    code,
    working: "&nbsp;",
    encoding: "&nbsp;",
    symbols: "&nbsp;",
    aug: "&nbsp;",
    ...initialCtx
  });

  for (let i = 0; i < encodings.length; i++) {
    let symbols = "";

    context = await step({
      ...context,
      working,
      encoding: encodings[i],
      symbols,
      aug: "",
      currentLines: [5],
      updateTable: false
    });
    if (symbolTable[encodings[i]] !== undefined) {
      symbols = symbolTable[encodings[i]];
      context = await step({
        ...context,
        updateTable: false,
        working,
        symbols,
        currentLines: [6]
      });
    } else {
      symbols = working.concat(working[0]);
      context = await step({
        ...context,
        working,
        symbols,
        updateTable: false,
        currentLines: [8]
      });
    }

    for (let si = 0; si < symbols.length; si++) {
      const c = symbols[si];
      const aug = working.concat(c);

      output = output.concat(c);
      context = await step({
        ...context,
        working,
        output,
        aug,
        currentLines: [10, 11, 12],
        updateTable: false
      });

      if (Object.values(symbolTable).indexOf(aug) >= 0) {
        working = aug;
        context = await step({
          ...context,
          working,
          output,
          aug,
          currentLines: [13],
          updateTable: false
        });
      } else {
        symbolTable[code] = aug;
        working = c;
        context = await step({
          ...context,
          output,
          working,
          aug,
          code,
          currentLines: [15, 16, 17],
          updateTable: true
        });
        code += 1;
      }
    }
  }

  await step({ ...context, working, output, currentLines: [] });

  return output;
}

async function step(ctx) {
  updateResult(ctx.output);
  highlightLines(ctx.currentLines);
  updateVariables(ctx);
  updateSymbolTable(ctx);

  if (ctx.autoPlayEnabled) {
    return autoPlayPromise(ctx);
  }

  return clickPromise(ctx);
}

function updateVariables(ctx) {
  document.getElementById("var-working").innerHTML = formatText(ctx.working);
  document.getElementById("var-encoding").innerHTML = ctx.encoding;
  document.getElementById("var-symbols").innerHTML = formatText(ctx.symbols);
  document.getElementById("var-aug").innerHTML = formatText(ctx.aug);
  document.getElementById("var-code").innerHTML = ctx.code;
}

function highlightLines(lineNumbers) {
  document
    .getElementById("algo")
    .querySelectorAll(".line")
    .forEach((lineElement, idx) => {
      const currentLineNumber = idx + 1;

      if (lineNumbers.includes(currentLineNumber)) {
        lineElement.classList.add("active");
      } else {
        lineElement.classList.remove("active");
      }
    });
}

function updateResult(output) {
  document.getElementById("result").value = output;
}

function autoPlayPromise(ctx) {
  const ms = Number(
    document.querySelector('input[name="speed"]:checked').value
  );

  return new Promise(resolve => {
    const disableAutoPlay = event => {
      event.target.disabled = true;
      document.getElementById("play-button").disabled = false;
      document.getElementById("step-button").disabled = false;
      document.getElementById("reset-button").disabled = false;

      resolve({ ...ctx, autoPlayEnabled: false });
    };

    const pauseButtonElement = document.getElementById("pause-button");

    pauseButtonElement.addEventListener("click", disableAutoPlay, {
      once: true
    });

    setTimeout(() => {
      pauseButtonElement.removeEventListener("click", disableAutoPlay, {
        once: true
      });

      resolve(ctx);
    }, ms);
  });
}

function clickPromise(ctx) {
  return new Promise(resolve => {
    const controlElements = [
      document.getElementById("step-button"),
      document.getElementById("play-button")
    ];

    const resolveClickPromise = event => {
      controlElements.forEach(el => {
        if (el !== event.target) {
          el.removeEventListener("click", resolveClickPromise, { once: true });
        }
      });

      if (event.target.id === "play-button") {
        event.target.disabled = true;
        document.getElementById("pause-button").disabled = false;
        document.getElementById("step-button").disabled = true;
        document.getElementById("reset-button").disabled = true;
      }

      resolve({ ...ctx, autoPlayEnabled: event.target.id === "play-button" });
    };

    controlElements.forEach(el => {
      el.addEventListener("click", resolveClickPromise, { once: true });
    });
  });
}

function addTableRow(symbol, code) {
  const tableRowElement = document.createElement("div");
  tableRowElement.classList.add("table-row");

  [symbol, code].forEach(content => {
    const cellElement = document.createElement("span");
    cellElement.classList.add("table-cell");
    cellElement.innerText = formatText(`${content}`);
    tableRowElement.appendChild(cellElement);
  });

  const tableBodyElement = document.getElementById("table-body");
  tableBodyElement.prepend(tableRowElement);
}

function updateSymbolTable(ctx) {
  if (ctx.updateTable === true) {
    addTableRow(ctx.aug, ctx.code);
  }
}

function formatText(text, reverse = false) {
  if (reverse) {
    return text.replaceAll("↵", "\n").replaceAll("░", " ");
  }

  return text.replaceAll("\n", "↵").replaceAll(" ", "░");
}
