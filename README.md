# Herosaver

Methodology to Save Configuration and STLs from websites using the THREE.JS framework for academic and educational purposes.

Please **Always** think about the **developers** of such websites and try to **support them whenever possible**, as without them, there would be no such tools.

This is based on some ideas from [TeaWithLucas](https://github.com/TeaWithLucas), and refined by [reformagus](https://github.com/reformagus/Herosaver) and [D1amondweaver](https://github.com/D1amondweaver/Herosaver/tree/UVCoords)


## Tampermonkey

Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari) or any compatible userscript manager, then:

### One-click install

With Tampermonkey installed, click the link below. Tampermonkey will detect the `.user.js` file and open its install screen automatically:

**[➜ Install Herosaver userscript](https://raw.githubusercontent.com/d1amondweaver/Herosaver/UVCoords/dist/herosaver.user.js)**

It is restricted to HeroForge (`@match *://*.heroforge.com/*`). After installing, you can edit the `@match` line in the Tampermonkey dashboard if you need to use it on another site.

### Manual install

Alternatively, open the Tampermonkey dashboard, click **Create a new script**, and paste the contents of [`dist/herosaver.user.js`](dist/herosaver.user.js), then save (`Ctrl/Cmd + S`).

### Usage

Go to the target page and use either the on-page Herosaver panel (bottom-right) or the Tampermonkey menu in the toolbar, then click **Save STL**, **Save OBJ and Textures**, or **Save JSON**.
