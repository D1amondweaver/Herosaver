# Herosaver

Methodology to Save Configuration and STLs from websites using the THREE.JS framework for academic and educational purposes.

Please **Always** think about the **developers** of such websites and try to **support them whenever possible**, as without them, there would be no such tools.

This is based on some ideas from [TeaWithLucas](https://github.com/TeaWithLucas), with a focus on making UI lighter & code simpler. I modernized the code a bit (`class`, `let`, `const`, arrow-fucntions, etc) and got rid of the inline UI (I like it better as a bookmarklet.)


## Tampermonkey

If you prefer a userscript over the bookmarklet, install [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari) or any compatible userscript manager, then:

### One-click install

With Tampermonkey installed, click the link below. Tampermonkey will detect the `.user.js` file and open its install screen automatically:

**[➜ Install Herosaver userscript](https://raw.githubusercontent.com/mungeondaster/Herosaver/master/dist/herosaver.user.js)**

By default it runs on every site (`@match *://*/*`). After installing, you can edit the `@match` line in the Tampermonkey dashboard to restrict it to the site(s) you use.

### Manual install

Alternatively, open the Tampermonkey dashboard, click **Create a new script**, and paste the contents of [`dist/herosaver.user.js`](dist/herosaver.user.js), then save (`Ctrl/Cmd + S`).

### Usage

Go to the target page, open the Tampermonkey menu in the toolbar, and click **Herosaver: Save STL** or **Herosaver: Save OBJ**.

## todo

- add greasemonkey support back
