let thisSite;
let matchedSite;
let prevSiteIndex;
let nextSiteIndex;
const WEBRING_DATA_URL = `https://gusbus.space/smallweb-subway/data.json`;
let WEBRING_DATA;
loadWebringJSON(WEBRING_DATA_URL);

function loadWebringJSON(url) {
  fetch(url)
    .then(response => response.json())
    .then((json) => {webringDataReady(json)});
}

function webringDataReady(json) {
  WEBRING_DATA = json;
  customElements.get('smallweb-subway') || customElements.define('smallweb-subway', WebRing);
  // customElements.define('smallweb-subway', WebRing);
}

function goToPrev() {
  location.href = WEBRING_DATA[prevSiteIndex].url
}

function goToNext() {
  location.href = WEBRING_DATA[nextSiteIndex].url
}

let template = document.createElement("template");
template.innerHTML = `
  <style>
    .webring {
      width: 250;
      height: 100;
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
      margin-bottom: 5px;
    }
    p {
      text-align: center;
      margin-top: 5px;
      margin-bottom: 10px;
    }
    #tri-left {
      width: 0;
      height: 0;
      background: none;
      border-top: 10px solid transparent;
      border-left: none;
      border-right: 20px solid #12f028;
      border-bottom: 10px solid transparent;
      outline: none;
      cursor: pointer;
    }
    #tri-left:hover {
      border-top: 10px solid transparent;
      border-left: none;
      border-right: 20px solid black;
      border-bottom: 10px solid transparent;
    }
    #tri-right {
      width: 0;
      height: 0;
      background: none;
      border-top: 10px solid transparent;
      border-left: 20px solid #12f028;
      border-right: none;
      border-bottom: 10px solid transparent;
      cursor: pointer;
    }
    #tri-right:hover {
      border-top: 10px solid transparent;
      border-left: 20px solid black;
      border-right: none;
      border-bottom: 10px solid transparent;
    }
    #line {
      width: 60px;
      height: 10px;
      background: #12f028;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #outer-circle {
      width: 20px;
      height: 20px;
      background: black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #inner-circle {
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
    }
  </style>

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
      Green line: Art from members of the
        <a href="https://discord.gg/2gJYZhmHAz" target="_blank">Doodle Crew</a>
      Discord server.
    </p>
  </div>
`;

class WebRing extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    console.log('Webring JSON data:')
    console.log(JSON.stringify(WEBRING_DATA))
    thisSite = window.location.href;
    // thisSite = "https://gusbus.space/doodlebot.html"
    // thisSite = 'https://uuupah.neocities.org/art/my-art-2023/'
    console.log("This site:")
    console.log(thisSite)
    const matchedSiteIndex = WEBRING_DATA.map(x => x.url).indexOf(thisSite)
    matchedSite = WEBRING_DATA[matchedSiteIndex];
    console.log("Matched site:")
    console.log(matchedSite.url)
    prevSiteIndex = matchedSiteIndex - 1;
    if (prevSiteIndex === -1) prevSiteIndex = WEBRING_DATA.length - 1;
    console.log("Previous site:")
    console.log(WEBRING_DATA[prevSiteIndex].url)
    nextSiteIndex = matchedSiteIndex + 1;
    if (nextSiteIndex === WEBRING_DATA.length) nextSiteIndex = 0;
    console.log("Next site:")
    console.log(WEBRING_DATA[nextSiteIndex].url)
  }
}

