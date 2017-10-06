const { both } = require('fluture');
const key = require('../apikey.js');
const jg = require('./index.js')(key);

const charityId = '183092'

// jg.charity.cares(charityId)
//   .fork(console.error, console.log);

// jg.charity.byId(charityId)
//   .fork(console.error, console.log);

// jg.crowdfunding.pageDetails('KathrynUsborne')
//   .fork(console.error, console.log);

// jg.campaigns.getPages('worldfederationksmic', 'rrf2016')
//   .fork(console.error, console.log);

// const first = jg.campaigns.getCampaignsByCharityId(charityId)
// const second = jg.charity.cares(charityId)

// first.both(second)
//   .fork(console.error, console.log)

jg.fundraising.getDonations('paige-crowther')
  .both(jg.fundraising.getPageUpdates('paige-crowther'))
  .fork(console.error, console.log)


// const woah = both(a, b).fork(console.error, console.log)


