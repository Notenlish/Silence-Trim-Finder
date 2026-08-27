const resultsContainer = document.getElementById("resultsContainer");
const finderForm = document.getElementById("finderForm");

const MC_VERSIONS = {
  "1.20": 25,
  "1.21.1": 26,
  "1.21.6": 30,
  "1.21.11": 32,
  26.1: 33,
  26.2: 34,
};

const CHEST_STRUCT_SIZE = 8 * 3;
const MAX_CHESTS = 500; // change this in the c source code too.

const bufferSize = MAX_CHESTS * CHEST_STRUCT_SIZE;

let find_silence_trims;

// n makes it bigint
let seed = null;
let centerX = null;
let centerZ = null;
let rangeX = null;
let rangeZ = null;
let version = null;

let positions = [];

let bufferPtr;
Module.onRuntimeInitialized = function () {
  bufferPtr = Module._malloc(bufferSize);
  find_silence_trims = Module.cwrap(
    "find_silence_trims",
    "number", // return type
    // seed,   centerX,  centerZ,  rangeX,   rangeZ,    mc        output
    ["bigint", "number", "number", "number", "number", "number", "number"], // argument types
  );

  // console.log('Result via cwrap:', find_silence_trims(31, 0, 0, 10000, 10000, MC_1_21_11));
};

const calculatePositions = () => {
  const matches = find_silence_trims(
    seed,
    centerX,
    centerZ,
    rangeX,
    rangeZ,
    MC_VERSIONS[version],
    bufferPtr,
  );
  console.log(
    `results for seed ${seed} version ${version} is ${matches} matches`,
  );
  // chest position x y and z are all int64
  const heap64 = Module.HEAP64;
  const wordOffset = bufferPtr >> 3; // divide by 2^3 = 8

  positions = [];
  for (let i = 0; i < matches; i++) {
    const idx = wordOffset + i * (CHEST_STRUCT_SIZE / 8);
    const x = Number(heap64[idx]);
    const y = Number(heap64[idx + 1]);
    const z = Number(heap64[idx + 2]);
    positions.push({ x, y, z });
  }

  //   console.log("Chest positions:", positions);

  // DONT do this if youre going to use the same ptr more than once.
  // Module._free(bufferPtr);
};

finderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(event.target);
  const formData = new FormData(event.target);
  const d = {};
  for (a of [...formData.entries()]) {
    const k = a[0];
    const v = a[1];
    d[k] = v;
  }

  // assume we have valid data bcuz this is a client side only tool.
  seed = BigInt(d["seed"]);
  centerX = d["centerX"];
  centerZ = d["centerZ"];
  rangeX = d["rangeX"];
  rangeZ = d["rangeZ"];
  version = d["version"];

  calculatePositions();

  console.log(positions);
  /*
    <div class="result">
      <div>
        <button><CopyOutline /></button>
      </div>
      <div><span>X </span> 2000</div>
      <div><span>Y </span> -50</div>
      <div><span>Z </span> -3000</div>
      <div>
        <label class="toggle-btn">
          <input type="checkbox" class="disable-toggle" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  */

  const copyOutlineSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2" /><path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" /></g></svg>';
  const tickSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path d="M0 0h16v16H0z" fill="none" /><polyline fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" points="2.75 8.75 6.25 12.25 13.25 4.75" /></svg>';

  resultsContainer.innerHTML = "";

  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];

    const result = document.createElement("div");
    result.classList.add("result");

    const copyCol = document.createElement("div");
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.innerHTML = copyOutlineSVG;
    copyBtn.className = "copy-btn";
    copyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const coords = `${p.x} ${p.y} ${p.z}`;
      navigator.clipboard
        .writeText(coords)
        .then(() => {
          copyBtn.innerHTML = tickSVG;
          setTimeout(() => (copyBtn.innerHTML = copyOutlineSVG), 800);
        })
        .catch((err) => console.error("Copy failed", err));
    });
    copyCol.appendChild(copyBtn);

    const xCol = document.createElement("div");
    xCol.innerHTML = `<span>X</span> ${p.x}`;
    const yCol = document.createElement("div");
    yCol.innerHTML = `<span>Y</span> ${p.y}`;
    const zCol = document.createElement("div");
    zCol.innerHTML = `<span>Z</span> ${p.z}`;

    const toggleCol = document.createElement("div");
    const label = document.createElement("label");
    label.className = "toggle-btn";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "disable-toggle";

    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    label.appendChild(checkbox);
    label.appendChild(checkmark);
    toggleCol.appendChild(label);

    checkbox.addEventListener("change", function () {
      result.classList.toggle("disabled", this.checked);
    });

    result.appendChild(copyCol);
    result.appendChild(xCol);
    result.appendChild(yCol);
    result.appendChild(zCol);
    result.appendChild(toggleCol);

    resultsContainer.appendChild(result);
  }
});

