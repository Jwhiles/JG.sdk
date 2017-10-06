# JG.sdk
A JavaScript sdk for interacting with [Just Giving's developer
Api](https://developer.justgiving.com/)

This sdk relies on futures. Which are like cooler promises

## How does this work?
The sdk exports a constructor function. This should be invoked with a [Just
Giving developer api key](https://developer.justgiving.com/signup). The
constructor function will return an object, with a suite of methods that
interact with the Just Giving developer api.

### Futures
This sdk returns [futures, which are similar to promises](https://github.com/fluture-js/Fluture).

Futures are conceptually similar to Promises, with a more formalised API. The
simplest use case is to call .fork on the returned future.

There is a lot more that you can do with futures, and it is worth reading
through [the
documentation](https://github.com/fluture-js/Fluture#transforming-futures)

#### .fork()
fork takes two functions as arguments. The first of which will be invoked in
error cases, the second in success cases
```js
.fork(err => console.error(err), result => console.log(result))
```

#### .map()
We can use map to transform the data returned from our future prior to using
fork. Map will only effect succesful results
```js
.map(data => data.body.name)
.fork(err => console.error(err), result => console.log(result))
```

## Usage

```js
const JG = require('jg');
const jg = JG('apikey');


jg.charity('charityid')
  .fork(console.error, console.log);
```
