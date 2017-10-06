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

    const getCampaignsByCharityId = (id) => fetchF({
      method: 'get',
      url: `${campaignsUrl}/${id}`,
      headers,
    }).map(res => res.data)

    return {
      getPages,
      getDetails,
      getCampaignsByCharityId,
    }
  }

  const charity = () => {
    const charityUrl = `${baseUrl}/charity`
    const byId = (id) => fetchF({
      method: 'get',
      url: `${charityUrl}/${id}`,
      headers,
    }).map(res => res.data)

    const donations = (id) => fetchF({
      method: 'get',
      url: `${charityUrl}/${id}/donations`,
      headers,
    }).map(res => res.data)

    const socialNetworks = (id) => fetchF({
      method: 'get',
      url: `${charityUrl}/${id}/socialnetworks`,
      headers,
    }).map(res => res.data)

    const events = (id) => fetchF({
      method: 'get',
      url: `${charityUrl}/${id}/events`,
      headers,
    }).map(res => res.data)

    const categories = () => fetchF({
      method: 'get',
      url: `${charityUrl}/categories`,
      headers,
    }).map(res => res.data)

    const fundraisingPageAttribution = (id, pageName) => fetchF({
      method: 'get',
      url: `${charityUrl}/${id}/pages/${pageName}/attribution`,
      headers,
    }).map(res => res.data)

    const cares = (id) => fetchF({
      method: 'get',
      url: `${charityUrl}/${id}/cares`,
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
