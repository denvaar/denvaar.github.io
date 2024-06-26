var running;
var inputSymbols;
var skipSteps;
var pause;
var playing;
var lastSymbolCode;

document.addEventListener("DOMContentLoaded", initialize);

function initialize(event) {
  running = false;
  skipSteps = false;
  inputSymbols = [];
  playing = false;
  pause = new Promise(resolve => {
    resolve();
  });

  const defaultInputText =
    "a bandaid, a bandana, a banana, and a banjo. abracadabra!";

  document.getElementById("input").value = defaultInputText;
  document.getElementById("pause-button").disabled = true;

  document.querySelector('[data-should-be-default="true"]').checked = true;

  document
    .getElementById("reset-button")
    .addEventListener("click", onResetClick);

  document
    .getElementById("step-button")
    .addEventListener("click", onStepButtonClicked, { once: true });

  document
    .getElementById("play-button")
    .addEventListener("click", onStepButtonClicked, { once: true });

  document
    .getElementById("pause-button")
    .addEventListener("click", onPauseClicked);

  document
    .getElementById("encodings")
    .addEventListener("click", onEncodingsCheckboxClick);

  document
    .getElementById("decode-link")
    .addEventListener("click", onDecodeClick);
}

function onDecodeClick(event) {
  event.preventDefault();

  const encodings = [
    ...document.querySelector("#output-symbols").querySelectorAll(".symbol")
  ].map(symbolElement => {
    const encoding = parseInt(symbolElement.textContent);
    if (Number.isInteger(encoding) === false) {
      const content = formatText(symbolElement.textContent, true).charCodeAt(0);

      return parseInt(content);
    } else {
      return encoding;
    }
  });

  const queryParams = new URLSearchParams({ encodings });
  window.open(`lzw_decode.html?${queryParams}`, "_blank");
}

function onEncodingsCheckboxClick(event) {
  if (event.target.checked) {
    const outputSymbolElements = [
      ...document.querySelector("#output-symbols").querySelectorAll(".symbol")
    ].map(symbolElement => {
      if (Number.isInteger(parseInt(symbolElement.textContent)) === false) {
        const content = formatText(symbolElement.textContent, true).charCodeAt(
          0
        );
        const newSymbolElement = document.createElement("span");
        newSymbolElement.classList.add("symbol");
        newSymbolElement.innerText = content;

        return newSymbolElement;
      } else {
        return symbolElement;
      }
    });

    document
      .getElementById("output-symbols")
      .replaceChildren(...outputSymbolElements);
  } else {
    const outputSymbolElements = [
      ...document.querySelector("#output-symbols").querySelectorAll(".symbol")
    ].map(symbolElement => {
      if (Number(symbolElement.textContent) <= 255) {
        const content = formatText(
          String.fromCharCode(Number(symbolElement.textContent))
        );
        const newSymbolElement = document.createElement("span");
        newSymbolElement.classList.add("symbol");
        newSymbolElement.innerText = content;

        return newSymbolElement;
      } else {
        return symbolElement;
      }
    });

    document
      .getElementById("output-symbols")
      .replaceChildren(...outputSymbolElements);
  }
}

function onPauseClicked(event) {
  const pauseButton = event.target;
  pauseButton.disabled = true;

  document.getElementById("step-button").disabled = false;
  document.getElementById("play-button").disabled = false;

  pause = new Promise(resolve => {
    document
      .getElementById("play-button")
      .removeEventListener("click", onStepButtonClicked, { once: true });

    document.getElementById("play-button").addEventListener(
      "click",
      function(event) {
        skipSteps = true;
        pauseButton.disabled = false;
        document.getElementById("step-button").disabled = true;
        document.getElementById("play-button").disabled = true;
        pause = new Promise(resolve => resolve());

        resolve();
      },
      { once: true }
    );

    document
      .getElementById("step-button")
      .removeEventListener("click", onStepButtonClicked, { once: true });

    document.getElementById("step-button").addEventListener(
      "click",
      function(event) {
        skipSteps = false;
        pauseButton.disabled = false;
        document.getElementById("pause-button").disabled = true;
        pause = new Promise(resolve => resolve());

        resolve();
      },
      { once: true }
    );
  });
}

function onResetClick(event) {
  ["input-symbols", "debug-info", "output-symbols"].forEach(id => {
    const defaultSymbolElement = document.createElement("i");
    defaultSymbolElement.style = "color:gray;";
    defaultSymbolElement.innerText = "Nothing to display yet...";

    document.getElementById(id).replaceChildren(...[defaultSymbolElement]);
  });

  const varsElement = document.createElement("pre");
  varsElement.id = "vars";
  document.getElementById("debug-info").appendChild(varsElement);

  const debugCondElement = document.createElement("pre");
  debugCondElement.id = "debug-cond";
  document.getElementById("debug-info").appendChild(debugCondElement);

  document.getElementById("input").disabled = false;

  const tableBodyElement = document.getElementById("table-body");
  const omittedElement = tableBodyElement.lastElementChild;
  const reservedElement = omittedElement.previousElementSibling;

  tableBodyElement.replaceChildren(...[reservedElement, omittedElement]);

  document.getElementById("step-button").disabled = false;
  document.getElementById("play-button").disabled = false;
  document.getElementById("encodings").checked = false;

  initialize(event);
}

function awaitClickPromise() {
  return new Promise(resolve => {
    document.getElementById("step-button").addEventListener(
      "click",
      function(event) {
        resolve();
      },
      { once: true }
    );

    document.getElementById("play-button").addEventListener(
      "click",
      function(event) {
        skipSteps = true;
        event.target.disabled = true;
        document.getElementById("step-button").disabled = true;
        document.getElementById("pause-button").disabled = false;
        resolve();
      },
      { once: true }
    );
  });
}

function awaitSpeedPromise(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
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

function updateSymbolTable(variables) {
  if (variables.symbolCode != lastSymbolCode && variables.previousKey) {
    addTableRow(variables.previousKey, lastSymbolCode);
  }

  lastSymbolCode = variables.symbolCode;
}

function highlightCurrentSymbol(variables) {
  if (variables.i >= inputSymbols.length) {
    document
      .getElementById("input-symbols")
      .children.item(inputSymbols.length - 1)
      .classList.remove("currentSymbol");

    return;
  }

  const currentSymbolElement = document
    .getElementById("input-symbols")
    .children.item(variables.i);

  currentSymbolElement.classList.add("currentSymbol");

  const prevSymbolElement = document
    .getElementById("input-symbols")
    .children.item(variables.i - 1);

  if (prevSymbolElement) {
    prevSymbolElement.classList.remove("currentSymbol");
  }
}

function updateOutput(encodedSymbols) {
  const symbolElements = encodedSymbols.map(symbol => {
    const symbolElement = document.createElement("span");

    if (document.getElementById("encodings").checked) {
      symbolElement.innerText = `${symbol}`;
    } else {
      if (symbol <= 255) {
        symbolElement.innerText = formatText(`${String.fromCharCode(symbol)}`);
      } else {
        symbolElement.innerText = `${symbol}`;
      }
    }

    symbolElement.classList.add("symbol");

    return symbolElement;
  });

  document.getElementById("output-symbols").replaceChildren(...symbolElements);
}

function highlightWindowThing(variables) {
  const symbolElements = [...document.getElementById("input-symbols").children];

  const notDone = variables.i < inputSymbols.length;

  symbolElements.forEach((symbolElement, idx) => {
    if (idx < variables.i && idx >= variables.sBeginningIdx && notDone) {
      symbolElement.classList.add("s");
    } else {
      symbolElement.classList.remove("s");
    }
  });
}

function indicateActive(content, condition) {
  if (condition) {
    return `<b>${content}</b>`;
  } else {
    return content;
  }
}

function updateDebugOutput(variables) {
  const keyVariableDisplay = variables.key
    ? `key="<span style="background-color:#00ff00;">${formatText(
        variables.s
      )}</span><span style="color:#ffffff;background-color:#0000ff;">${formatText(
        variables.currentSymbol
      )}</span>"`
    : "key=";

  document.getElementById(
    "vars"
  ).innerHTML = `window="<span style="background-color:#00ff00;">${formatText(
    variables.s
  )}</span>" current_symbol="<span style="color:#ffffff;background-color:#0000ff;">${formatText(
    variables.currentSymbol
  )}</span>" ${keyVariableDisplay} encoding=${variables.symbolCode}`;

  const content = [];

  const defaultContentElement = document
    .getElementById("debug-info")
    .querySelector("i");

  if (defaultContentElement) {
    defaultContentElement.remove();
  }

  if (variables.key) {
    content.push(
      indicateActive(
        `<i>encoding for \`key\` exists?</i>`,
        variables.symbolFound === undefined
      )
    );

    content.push(`│`);
    content.push(
      `├─► ` +
        indicateActive(
          `YES: Append \`current_symbol\` to \`window\`.`,
          variables.symbolFound
        )
    );
    content.push(`│`);
    content.push(
      `└─► ` +
        indicateActive(
          `NO:  - Add encoding of \`window\` to output stream.`,
          variables.symbolFound === false
        )
    );
    content.push(
      indicateActive(
        `         - Encode \`key\` as \`encoding\` (${variables.symbolCode}).
         - \`next_symbol\` should increment.
         - \`window\` should become \`current_symbol\`.`,
        variables.symbolFound === false
      )
    );

    document.getElementById("debug-cond").innerHTML = content.join("\n");
  }
}

async function step(variables) {
  // console.log(variables);

  await pause;

  highlightCurrentSymbol(variables);
  highlightWindowThing(variables);
  updateSymbolTable(variables);
  updateOutput(variables.output);
  updateDebugOutput(variables);

  if (skipSteps === true) {
    const playbackMilliseconds = Number(
      document.querySelector('input[name="speed"]:checked').value
    );
    return awaitSpeedPromise(playbackMilliseconds);
  }

  return awaitClickPromise();
}

async function compress(input) {
  const symbolTable = Array(256)
    .fill(0)
    .map((symbolCode, i) => symbolCode + i)
    .reduce((acc, symbolCode) => {
      return { ...acc, [String.fromCharCode(symbolCode)]: symbolCode };
      // return {
      //   ...acc,
      //   [String.fromCharCode(symbolCode)]: String.fromCharCode(symbolCode),
      // };
    }, {});

  symbolTable[""] = 256;

  const monitoredVariables = {
    currentSymbol: "",
    previousKey: undefined,
    i: 0,
    s: "",
    sBeginningIdx: 0,
    symbolCode: 257,
    symbolTable,
    output: [],
    symbolFound: undefined,
    key: undefined
  };

  await step(monitoredVariables);

  for (
    monitoredVariables.i = 0;
    monitoredVariables.i < input.length;
    monitoredVariables.i++
  ) {
    monitoredVariables.currentSymbol = input[monitoredVariables.i];

    monitoredVariables.key = monitoredVariables.s.concat(
      monitoredVariables.currentSymbol
    );

    monitoredVariables.symbolFound = undefined;
    await step(monitoredVariables);

    if (monitoredVariables.symbolTable[monitoredVariables.key]) {
      monitoredVariables.symbolFound = true;
      await step(monitoredVariables);

      monitoredVariables.s = monitoredVariables.s.concat(
        monitoredVariables.currentSymbol
      );
    } else {
      monitoredVariables.symbolFound = false;
      monitoredVariables.previousKey = monitoredVariables.key;
      await step(monitoredVariables);

      monitoredVariables.output.push(
        monitoredVariables.symbolTable[monitoredVariables.s]
      );

      monitoredVariables.symbolTable[monitoredVariables.key] =
        monitoredVariables.symbolCode;

      monitoredVariables.symbolCode++;
      monitoredVariables.s = monitoredVariables.currentSymbol;
    }

    monitoredVariables.sBeginningIdx =
      monitoredVariables.i - (monitoredVariables.s.length - 1);
  }

  monitoredVariables.output.push(
    monitoredVariables.symbolTable[monitoredVariables.s]
  );

  await step(monitoredVariables);

  return monitoredVariables.output;
}

function onStepButtonClicked(event) {
  const isFirstTimeClicked = running === false;

  document.getElementById("step-button").disabled =
    event.target.id === "play-button";

  document.getElementById("pause-button").disabled =
    event.target.id !== "play-button";

  document.getElementById("play-button").disabled =
    event.target.id === "play-button";

  skipSteps = event.target.id === "play-button";

  document
    .getElementById("play-button")
    .removeEventListener("click", onStepButtonClicked, { once: true });

  if (isFirstTimeClicked) {
    running = true;
    document.getElementById("input").disabled = true;
    setupInputSymbols();
    compress(inputSymbols).then(() => {
      running = false;
      document.getElementById("debug-cond").innerHTML =
        "Flush `window` to output.\n\nDone.";
      document.getElementById("play-button").disabled = true;
      document.getElementById("step-button").disabled = true;
      document.getElementById("pause-button").disabled = true;
    });
  }
}

function setupInputSymbols() {
  inputSymbols = escapeUnicode(document.getElementById("input").value).split(
    ""
  );
  //inputSymbols = document.getElementById("input").value.split("");

  const inputSymbolsElement = document.getElementById("input-symbols");

  const symbolElements = inputSymbols.map(symbol => {
    const spanElement = document.createElement("span");
    spanElement.classList.add("symbol");
    spanElement.innerText = formatText(symbol);

    return spanElement;
  });

  inputSymbolsElement.replaceChildren(...symbolElements);
}

function formatText(text, reverse = false) {
  if (reverse) {
    return text.replaceAll("↵", "\n").replaceAll("░", " ");
  }

  return text.replaceAll("\n", "↵").replaceAll(" ", "░");
}

function escapeUnicode(str) {
  return [...str]
    .map(c =>
      /^[\x00-\x7F]$/.test(c)
        ? c
        : c
            .split("")
            .map(
              a =>
                "\\u" +
                a
                  .charCodeAt()
                  .toString(16)
                  .padStart(4, "0")
            )
            .join("")
    )
    .join("");
}

function unescapeUnicode(str) {
  return str.replaceAll(/\\u{([\da-f]{1,6})}|\\u([\da-f]{4})/gi, (_, p1, p2) =>
    String.fromCodePoint(Number.parseInt(p1 ?? p2, 16))
  );
}
