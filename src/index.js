const { encaseP } = require('fluture');
const axios = require('axios');

const fetchF = encaseP(axios);

const JG = (apiKey) => {
  const baseUrl = 'https://api.justgiving.com/v1'
  const headers = { 'x-api-key': apiKey }

  const campaigns = () => {
    const campaignsUrl = `${baseUrl}/campaigns`;

    const getPages = (charityShortName, campaignShortUrl) => fetchF({
      method: 'get',
      url: `${campaignsUrl}/${charityShortName}/${campaignShortUrl}/pages`,
      headers,
    }).map(res => res.data)

    const getDetails = (charityShortName, campaignShortUrl) => fetchF({
      method: 'get',
      url: `${campaignsUrl}/${charityShortName}/${campaignShortUrl}`,
      headers,
    }).map(res => res.data)

    return {
      getPages,
      getDetails
    }
  }

  const charity = () => {
    const byId = (id) => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/${id}`,
      headers,
    }).map(res => res.data)

    const donations = (id) => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/${id}/donations`,
      headers,
    }).map(res => res.data)

    const socialNetworks = (id) => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/${id}/socialnetworks`,
      headers,
    }).map(res => res.data)

    const events = (id) => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/${id}/events`,
      headers,
    }).map(res => res.data)

    const categories = () => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/categories`,
      headers,
    }).map(res => res.data)

    const fundraisingPageAttribution = (id, pageName) => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/${id}/pages/${pageName}/attribution`,
      headers,
    }).map(res => res.data)

    const cares = (id) => fetchF({
      method: 'get',
      url: `${baseUrl}/charity/${id}/cares`,
      headers,
    }).map(res => res.data)

    return { 
      byId,
      donations,
      socialNetworks,
      events,
      categories,
      fundraisingPageAttribution,
      cares
    }
  }

  const crowdfunding = () => {
    const crowdfundingUrl = `${baseUrl}/crowdfunding`;

    const pages = () => fetchF({
      method: 'get',
      url: `${crowdfundingUrl}/pages`,
      headers,
    }).map(res => res.data)

    const pageDetails = (shortName) => fetchF({
      method: 'get',
      url: `${crowdfundingUrl}/pages/${shortName}`,
      headers,
    }).map(res => res.data)

    return {
      pages,
      pageDetails,
    }
  }

  return {
    campaigns: campaigns(),
    charity: charity(),
    crowdfunding: crowdfunding(),
  }
}

module.exports = JG
