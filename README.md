# JG.sdk
A JavaScript sdk for interacting with [Just Giving's developer
Api](https://developer.justgiving.com/)

## How does this work?
The sdk exports a constructor function. This should be invoked with a [Just
Giving developer api key](https://developer.justgiving.com/signup). The
constructor function will return an object, with a suite of methods that
interact with the Just Giving developer api.

## Example Usage

```js
const JG = require('jg');
const jg = JG('apikey'); // registers your API key


jg.charity.byId('charityid') // sets up an API reqest to get a charity by it's ID
  .then(console.log)
  .catch(console.error) // invokes the request then calls one of two supplied functions depending on whether it succeeds
```

## Options
The api constructor takes accepts an options object as a second argument.

### useFutures
rather than returning promises, the api will return futures. Which are lazily
evaluated and more fun.

There is a lot more that you can do with futures, and it is worth reading
through [the
documentation](https://github.com/fluture-js/Fluture#transforming-futures)
```
const JG = require('jg');
const jg = JG('apikey', { useFutures: true }); // registers your API key
```


### Methods available on the returned futures

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

#### .both(future)
We can combine calls using .both - in our case this will make both API
requests in parallel - and only resolve if they are both succesful 
```js
g.fundraising.getDonations('paige-crowther')
  .both(jg.fundraising.getPageUpdates('paige-crowther'))
  .fork(console.error, console.log)
// [ { updates: ... }, { images: ... } ] 
```

