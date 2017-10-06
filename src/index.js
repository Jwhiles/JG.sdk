const { encaseP } = require('fluture');
const axios = require('axios');

const fetchF = encaseP(axios);

const JG = (apiKey) => {
  const baseUrl = 'https://api.justgiving.com'
  const headers = { 'x-api-key': apiKey }

  const charity = (id) => fetchF({
    method: 'get',
    url: `${baseUrl}/v1/charity/${id}`,
    headers,
  }).map(res => res.data)

  const charityDonations = (id) => fetchF({
    method: 'get',
    url: `${baseUrl}/v1/charity/${id}/donations`,
    headers,
  }).map(res => res.data)

  const charitySocialNetworks = (id) => fetchF({
    method: 'get',
    url: `${baseUrl}/v1/charity/${id}/socialnetworks`,
    headers,
  }).map(res => res.data)

  const charityEvents = (id) => fetchF({
    method: 'get',
    url: `${baseUrl}/v1/charity/${id}/events`,
    headers,
  }).map(res => res.data)

  const charityCategories = (id) => fetchF({
    method: 'get',
    url: `${baseUrl}/v1/charity/categories`,
    headers,
  }).map(res => res.data)

  const charityFundraisingPageAttribution = (id, pageName) => fetchF({
    method: 'get',
    url: `${baseUrl}/v1/charity/${id}/pages/${pageName}/attribution`,
    headers,
  }).map(res => res.data)

  return { 
    charity,
    charityDonations,
    charitySocialNetworks,
    charityEvents,
    charityCategories,
    charityFundraisingPageAttribution,
  }
}

module.exports = JG
