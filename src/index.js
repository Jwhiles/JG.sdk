const F = require('fluture');
const axios = require('axios');

const fetchF = F.encaseP(axios);

class JG {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.justgiving.com'
    this.headers = { 'x-api-key': this.apiKey }
  }

  charity(id) {
    return fetchF({
      method: 'get',
      url: `${this.baseUrl}/v1/charity/${id}`,
      headers: this.headers,
    }).map(res => res.data)
  }

  charityDonations(id) {
    return fetchF({
      method: 'get',
      url: `${this.baseUrl}/v1/charity/${id}/donations`,
      headers: this.headers,
    }).map(res => res.data)
  }

  charitySocialNetworks(id) {
    return fetchF({
      method: 'get',
      url: `${this.baseUrl}/v1/charity/${id}/socialnetworks`,
      headers: this.headers,
    }).map(res => res.data)
  }

  charityEvents(id) {
    return fetchF({
      method: 'get',
      url: `${this.baseUrl}/v1/charity/${id}/events`,
      headers: this.headers,
    }).map(res => res.data)
  }

  charityCategories(id) {
    return fetchF({
      method: 'get',
      url: `${this.baseUrl}/v1/charity/categories`,
      headers: this.headers,
    }).map(res => res.data)
  }

  charityFundraisingPageAttribution(id, pageName) { // 
    return fetchF({
      method: 'get',
      url: `${this.baseUrl}/v1/charity/${id}/pages/${pageName}/attribution`,
      headers: this.headers,
    }).map(res => res.data)
  }
}


const jgContructor = key => new JG(key);

module.exports = jgContructor
