# JG.sdk
A JavaScript sdk for interacting with Just Giving's developer Api

This sdk relies on futures. Which are like cooler promises

## Usage

```js
const JG = require('jg');
const jg = JG('apikey');


jg.charity('charityid')
  .fork(console.error, console.log);
```
