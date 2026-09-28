// Crate Dash – Cheat-Menü
// In die Browser-Konsole auf https://crate-dash-production.up.railway.app/ einfügen
// (oder als Bookmarklet, siehe README.md).
//
// Tasten:
//   G  – Unsterblichkeit an/aus (Kisten, auch Stahlkisten, werden beim Aufprall zerstört)
//   H  – Dauer-Smasher an/aus (Smasher-Timer wird ständig wieder aufgefüllt)
//   T  – Telemetrie an/aus (standardmäßig AUS, damit Cheat-Runs deine Spieldaten nicht verfälschen)
//
// Funktioniert, weil das Spiel ein klassisches <script> ist: die(), trackEvent(),
// powers, obstacles, lane, state … liegen im globalen Scope.
(() => {
  if (window.__crateCheat) {
    window.__crateCheat.panel.remove();
    clearInterval(window.__crateCheat.timer);
    window.removeEventListener('keydown', window.__crateCheat.onKey);
  }

  const cfg = { god: true, smash: true, telemetry: false };
  const origDie = window.__crateCheat ? window.__crateCheat.origDie : window.die;
  const origTrack = window.__crateCheat ? window.__crateCheat.origTrack : window.trackEvent;

  // Unsterblichkeit: Kollisionstod abfangen. Das Zeitlimit ('time_out') bleibt echt.
  window.die = function (reason) {
    if (cfg.god && reason !== 'time_out') {
      // Die Kiste, in die wir gerade laufen, zerstören – sonst würde die() jeden Frame erneut feuern.
      for (const o of obstacles) {
        if (!o.passed && !o.dead && o.z > -0.9 && o.z < 0.9 && o.lane === lane) {
          o.dead = true;
          scene.remove(o.mesh);
          burst(LANES[o.lane], 1.2, o.z, o.steel ? 0xdfe8ef : 0xb5793a);
        }
      }
      return;
    }
    return origDie.apply(this, arguments);
  };

  // Telemetrie: während des Cheatens nichts an den Server schicken (umschaltbar).
  window.trackEvent = function () {
    if (!cfg.telemetry) return;
    return origTrack.apply(this, arguments);
  };

  // Dauer-Smasher: Timer immer voll halten.
  const timer = setInterval(() => {
    if (cfg.smash && state === 'play') {
      powers.smash = PUPDEF.smash.dur;
      paintPowerBar();
    }
  }, 100);

  // Kleines Overlay mit Status.
  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;top:8px;left:8px;z-index:99999;padding:6px 10px;border-radius:8px;' +
    'background:rgba(0,0,0,.7);color:#fff;font:12px/1.5 monospace;pointer-events:none;white-space:pre';
  document.body.appendChild(panel);
  const paint = () => {
    const f = v => (v ? 'AN ' : 'AUS');
    panel.textContent = `[G] Unsterblich  ${f(cfg.god)}\n[H] Dauer-Smash  ${f(cfg.smash)}\n[T] Telemetrie   ${f(cfg.telemetry)}`;
  };
  paint();

  const onKey = e => {
    if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.code === 'KeyG') cfg.god = !cfg.god;
    else if (e.code === 'KeyH') {
      cfg.smash = !cfg.smash;
      if (!cfg.smash && state === 'play') { powers.smash = 0; paintPowerBar(); }
    } else if (e.code === 'KeyT') cfg.telemetry = !cfg.telemetry;
    else return;
    paint();
  };
  window.addEventListener('keydown', onKey);

  window.__crateCheat = { cfg, panel, timer, onKey, origDie, origTrack };
  console.log('%cCrate-Dash-Cheat aktiv – G: Unsterblich, H: Dauer-Smash, T: Telemetrie', 'color:#2de3ff;font-weight:bold');
})();
