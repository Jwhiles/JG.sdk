const F = require('fluture');
const axios = require('axios');
const key = require('../apikey.js');

const fetchF = F.encaseP(axios);

const options = {
  headers: {
    "x-api-key": key
  }
}


class JG {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  charity(id) {
    return fetchF({
      method: 'get',
      url: `https://api.justgiving.com/v1/charity/${id}`,
      headers: { 'x-api-key': this.apiKey },
    }).map(res => res.data)
      .mapRej(er => new Error('some extra info ' + er.message))
  }
}

const myJg = new JG(key)
const bhf = '183092'
const macmillan = '2116' 

myJg.charity(bhf)
  .fork(console.error, console.log);

myJg.charity(macmillan)
  .fork(console.error, console.log);


