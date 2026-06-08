// ==UserScript==
// @name         Herosaver
// @namespace    https://github.com/mungeondaster/Herosaver
// @version      1.1.0
// @description  Save Configuration and STLs from websites using the THREE.JS framework
// @author       reformagus
// @homepageURL  https://github.com/mungeondaster/Herosaver
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/mungeondaster/Herosaver/master/dist/herosaver.user.js
// @updateURL    https://raw.githubusercontent.com/mungeondaster/Herosaver/master/dist/herosaver.user.js
// ==/UserScript==

(function () {
  'use strict'

  const SRC = 'https://raw.githubusercontent.com/mungeondaster/Herosaver/master/dist/herosaver.js'

  // ← URL where Hero Cleaner is hosted (GitHub Pages)
  const HERO_CLEANER_URL = 'https://mungeondaster.github.io/Herosaver/stl-cube-remover.html'

  // Inject into the page context so the loaded code can reach window.CK, THREE, etc.
  const run = (fn) => {
    const s = document.createElement('script')
    s.textContent = `fetch('${SRC}').then(r => r.text()).then(eval).then(() => ${fn}())`
    document.body.appendChild(s)
    s.remove()
  }

  GM_registerMenuCommand('Herosaver: Save STL', () => run('saveStl'))
  GM_registerMenuCommand('Herosaver: Save OBJ', () => run('saveObj'))
  GM_registerMenuCommand('Herosaver: Save JSON', () => run('saveJson'))

  // ─── Hero Cleaner integration ────────────────────────────────────────────────
  // Intercepts the STL download blob and pushes it directly to Hero Cleaner
  // instead of saving to disk — eliminating the manual drag-and-drop step.
  GM_registerMenuCommand('Herosaver: Send to Hero Cleaner ✦', () => {
    const heroUrl = HERO_CLEANER_URL
    const src = SRC
    const s = document.createElement('script')
    s.textContent = `
(function () {
  // Temporarily patch document.createElement so we can intercept
  // the <a download> element that FileSaver.js creates for the STL blob.
  var _origCE = document.createElement.bind(document)
  document.createElement = function (tag) {
    var el = _origCE(tag)
    if (tag.toLowerCase() === 'a') {
      var _origClick = el.click.bind(el)
      el.click = function () {
        document.createElement = _origCE          // restore immediately
        var href = el.href
        var filename = el.download || 'heroforge_model.stl'
        if (href && href.startsWith('blob:')) {
          // Read the blob before it gets revoked, then send to Hero Cleaner
          fetch(href)
            .then(function (r) { return r.arrayBuffer() })
            .then(function (buffer) {
              URL.revokeObjectURL(href)
              var heroWindow = window.open('${heroUrl}', '_blank')
              var data = Array.from(new Uint8Array(buffer))
              var done = false
              var attempts = 0
              // Retry every 300ms until Hero Cleaner ACKs (handles slow tab open)
              var iv = setInterval(function () {
                attempts++
                if (done || heroWindow.closed || attempts > 100) { clearInterval(iv); return }
                try { heroWindow.postMessage({ type: 'herosaver-stl', data: data, filename: filename }, '*') }
                catch (e) {}
              }, 300)
              window.addEventListener('message', function ack(e) {
                if (e.source === heroWindow && e.data && e.data.type === 'herosaver-ack') {
                  done = true
                  clearInterval(iv)
                  window.removeEventListener('message', ack)
                }
              })
            })
        } else {
          _origClick()   // not a blob — fall through to normal behaviour
        }
      }
    }
    return el
  }

  // Load herosaver.js and call saveStl — our patched createElement catches the result
  fetch('${src}')
    .then(function (r) { return r.text() })
    .then(eval)
    .then(function () { window.saveStl() })
})()
`
    document.body.appendChild(s)
    s.remove()
  })
})()
