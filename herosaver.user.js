// ==UserScript==
// @name         Herosaver
// @namespace    https://github.com/reformagus/Herosaver
// @version      1.0.1
// @description  Save Configuration and STLs from websites using the THREE.JS framework
// @author       reformagus
// @homepageURL  https://github.com/reformagus/Herosaver
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/reformagus/Herosaver/master/dist/herosaver.user.js
// @updateURL    https://raw.githubusercontent.com/reformagus/Herosaver/master/dist/herosaver.user.js
// ==/UserScript==

(function () {
  'use strict'

  const SRC = 'https://raw.githubusercontent.com/reformagus/Herosaver/master/dist/herosaver.js'

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
})()
