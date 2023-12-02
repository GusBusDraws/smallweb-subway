let thisSite;
let prevSiteIndex;
let nextSiteIndex;
let WEBRING_DATA;

const WEBRING_DATA_URL = 'https://raw.githubusercontent.com/GusBusDraws/smallweb-subway/main/data.json';

loadWebringJSON(WEBRING_DATA_URL);

function loadWebringJSON(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {webringDataReady(json)});
}

function webringDataReady(json) {
  WEBRING_DATA = json;
  customElements.get("smallweb-subway") || customElements.define("smallweb-subway", WebRing);
}

function goToPrev() {
  location.href = WEBRING_DATA[prevSiteIndex].url;
}

function goToNext() {
  location.href = WEBRING_DATA[nextSiteIndex].url;
}

let template = document.createElement("template");
template.innerHTML = `
  <div class="webring">
    <h3>The Smallweb Subway</h3>
    <div>
      <button id="tri-left" onclick="goToPrev()"></button>
      <div id="line">
        <div id="outer-circle">
          <div id="inner-circle"></div>
        </div>
      </div>
      <button id="tri-right" onclick="goToNext()"></button>
    </div>
    <p>
      Green line: Art from the Doodle Crew Discord server.
    </p>
  </div>

  <style>
    .webring {
      width: 260;
      height: auto;
      outline: 1px solid;
      background: white;
    }
    .webring > div {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;
    }
    h3 {
      text-align: center;
      margin-bottom: 10px;
      padding-top: 10px;
    }
    p {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
    #tri-left {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid #12f028;
      border-bottom: 20px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left:hover {
      border-top: 20px solid transparent;
      border-left: none;
      border-right: 40px solid black;
      border-bottom: 20px solid transparent;
    }
    #tri-right {
      width: 0;
      height: 0;
      background: none;
      border-top: 20px solid transparent;
      border-left: 40px solid #12f028;
      border-right: none;
      border-bottom: 20px solid transparent;
      cursor: pointer;
    }
    #tri-right:hover {
      border-top: 20px solid transparent;
      border-left: 40px solid black;
      border-right: none;
      border-bottom: 20px solid transparent;
    }
    #line {
      width: 120px;
      height: 20px;
      background: #12f028;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #outer-circle {
      width: 40px;
      height: 40px;
      background: black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #inner-circle {
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
    }
  </style>
`;

class WebRing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    thisSite = window.location.href;
    // thisSite = "https://gusbus.space/doodlebot.html"

    const matchedSiteIndex = WEBRING_DATA.map((x) => x.url).indexOf(thisSite);
    
    prevSiteIndex = matchedSiteIndex - 1 < 0 ? WEBRING_DATA.length - 1 : matchedSiteIndex - 1;
    nextSiteIndex = matchedSiteIndex + 1 >= WEBRING_DATA.length ? 0 : matchedSiteIndex + 1;
  }
}
