let sites = JSON.parse(localStorage.getItem("sites")) || [];
let totalMinutes = parseInt(localStorage.getItem("focusTime")) || 0;

function renderSites() {
  const list = document.getElementById("siteList");
  list.innerHTML = "";
  sites.forEach((site, index) => {
    const li = document.createElement("li");
    li.textContent = site;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => removeSite(index);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addSite() {
  const input = document.getElementById("siteInput");
  if (input.value) {
    sites.push(input.value);
    localStorage.setItem("sites", JSON.stringify(sites));
    input.value = "";
    renderSites();
  }
}

function removeSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  renderSites();
}

let timer;

function startTimer() {
  let minutes = parseInt(document.getElementById("minutes").value);
  if (!minutes) return alert("Enter valid minutes");

  let seconds = minutes * 60;
  clearInterval(timer);

  timer = setInterval(() => {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    document.getElementById("timerDisplay").textContent =
      `${m}:${s < 10 ? '0' + s : s}`;

    seconds--;

    if (seconds < 0) {
      clearInterval(timer);
      alert("Focus session completed!");

      totalMinutes += minutes;
      localStorage.setItem("focusTime", totalMinutes);
      updateStats();
    }
  }, 1000);
}

function updateStats() {
  document.getElementById("stats").textContent = totalMinutes;
}

renderSites();
updateStats();
