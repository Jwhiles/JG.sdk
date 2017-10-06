const key = require('../apikey.js');
const jg = require('./index.js')(key);

const charityId = '183092'

jg.charity(charityId)
  .fork(console.error, console.log);

// myJg.charity(macmillan)
  // .fork(console.error, console.log);


