# Crate Dash – Cheat

Cheat für [Crate Dash](https://crate-dash-production.up.railway.app/): Unsterblichkeit und ein Smasher, der dauerhaft aktiv bleibt.

## Nutzung

**Variante A: Konsole**
1. Spiel öffnen, F12 drücken und den Tab **Console** wählen.
2. Inhalt von [`crate-dash-cheat.js`](crate-dash-cheat.js) einfügen und Enter drücken.

**Variante B: Bookmarklet**
1. Neues Lesezeichen anlegen und als URL den kompletten Inhalt von [`bookmarklet.txt`](bookmarklet.txt) eintragen.
2. Im Spiel auf das Lesezeichen klicken.

Oben links erscheint dann ein kleines Statusfenster.

| Taste | Funktion | Standard |
|-------|----------|----------|
| `G` | Unsterblich: jede Kiste, die dich treffen würde, wird zerstört, auch Stahlkisten | AN |
| `H` | Dauer-Smasher: der Smasher-Timer bleibt immer voll | AN |
| `T` | Telemetrie: Events an den Server senden | AUS |

## Hinweise

- Das **Zeitlimit** der Session (`time_out`) wird nicht umgangen.
- Den Smasher-Effekt haben Stahlkisten schon im Originalspiel nicht. Gegen sie hilft nur `G`.
- Die Telemetrie ist standardmäßig aus, damit Cheat-Runs nicht in deinen Spieldaten landen
  (`game_start`, `game_over`, `powerup_use` usw.). Coins und Bestwert werden trotzdem lokal im `localStorage` gespeichert.
- Nach einem Neuladen der Seite ist der Cheat weg. Einfach erneut ausführen.
