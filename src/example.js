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

jg.campaigns.getCampaignsByCharityId(charityId)
  .fork(console.error, console.log);


