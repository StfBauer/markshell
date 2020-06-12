# Markdown Headline 1

Lorem ipsum **dolor sit amet (Should be just bold)**, consectetur adipiscing elit. Morbi faucibus vel mi quis fringilla. Mauris sed sapien erat. Vivamus neque mauris, ornare [id quam](https://n8d.at) vitae, ultricies dignissim lectus. Phasellus pulvinar magna sed odio iaculis dignissim.

## Markdown Headline 2

Donec eget ~~porttitor odio STRIKE THROUGH~~, nec *porta quam* or `inline code`.

> dapibus interdum in ac quam. Aliquam efficitur justo a diam varius interdum. Sed elementum porta erat vitae fermentum. Pellentesque eu odio gravida, luctus tortor

and now some sample code:

```javascript
console.log('hello world');
```

```scss
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
	src: url(https://lea.verou.me/logo.otf);
	font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
	font: 100% Rockwell, Arvo, serif;
}

/*
 Styles
 */

* {
	margin: 0;
	padding: 0;
}

```

Another style


```powershell
C:\PS>Get-ADUser -Filter 'Name -like "*SvcAccount"' | FT Name,SamAccountName -A


Name             SamAccountName
----             --------------
SQL01 SvcAccount SQL01
SQL02 SvcAccount SQL02
IIS01 SvcAccount IIS01
```

```bash
#!/usr/bin/env node

global.log = require('./lib/logger');
global.logVerbose = true;

require('./caller/index');
```


Should work in every modern browser.

### Markdown Headline 3

Cras tempus justo non posuere rutrum. Integer vitae purus fringilla, `interdum` libero ut, hendrerit ipsum. Sed consequat, dolor non vulputate elementum, nisi felis ultrices diam, eu finibus ipsum tellus eu lectus.

#### Markdown Headline 3

Vestibulum laoreet nisl et luctus elementum. Nunc vehicula leo eu nibh consequat, in facilisis tellus rutrum.
