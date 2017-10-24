const { encaseP } = require('fluture');
const axios = require('axios');

const fetchF = encaseP(axios);

const JG = (apiKey, options) => {
  useFutures = options && options.useFutures;
  const createEndPoint = useFutures
    ? options => fetchF(options).map(res => res.data)
    : options => fetchF(options).map(res => res.data).promise();

  const baseUrl = 'https://api.justgiving.com/v1'
  const headers = { 'x-api-key': apiKey }

  const campaigns = () => {
    const campaignsUrl = `${baseUrl}/campaigns`;

    const getPages = (charityShortName, campaignShortUrl) => createEndPoint({
      method: 'get',
      url: `${campaignsUrl}/${charityShortName}/${campaignShortUrl}/pages`,
      headers,
    });

    const getDetails = (charityShortName, campaignShortUrl) => createEndPoint({
      method: 'get',
      url: `${campaignsUrl}/${charityShortName}/${campaignShortUrl}`,
      headers,
    });

    const getCampaignsByCharityId = (id) => createEndPoint({
      method: 'get',
      url: `${campaignsUrl}/${id}`,
      headers,
    });

    return {
      getPages,
      getDetails,
      getCampaignsByCharityId,
    }
  }

  const charity = () => {
    const charityUrl = `${baseUrl}/charity`

    const byId = (id) => createEndPoint({
      method: 'get',
      url: `${charityUrl}/${id}`,
      headers,
    });

    const donations = (id) => createEndPoint({
      method: 'get',
      url: `${charityUrl}/${id}/donations`,
      headers,
    });

    const socialNetworks = (id) => createEndPoint({
      method: 'get',
      url: `${charityUrl}/${id}/socialnetworks`,
      headers,
    });

    const events = (id) => createEndPoint({
      method: 'get',
      url: `${charityUrl}/${id}/events`,
      headers,
    });

    const categories = () => createEndPoint({
      method: 'get',
      url: `${charityUrl}/categories`,
      headers,
    });

    const fundraisingPageAttribution = (id, pageName) => createEndPoint({
      method: 'get',
      url: `${charityUrl}/${id}/pages/${pageName}/attribution`,
      headers,
    });

    const cares = (id) => createEndPoint({
      method: 'get',
      url: `${charityUrl}/${id}/cares`,
      headers,
    });

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

    const pages = () => createEndPoint({
      method: 'get',
      url: `${crowdfundingUrl}/pages`,
      headers,
    });

    const pageDetails = (shortName) => createEndPoint({
      method: 'get',
      url: `${crowdfundingUrl}/pages/${shortName}`,
      headers,
    });

    return {
      pages,
      pageDetails,
    }
  }

  const fundraising = () => {
    const fundraisingUrl = `${baseUrl}/fundraising`;

    const getPageDetailsById = (pageId) => createEndPoint({
      method: 'get',
      url: `${fundraisingUrl}/pagebyid/${pageId}`,
      headers,
    });

    const getPageUpdates = (pageName) => createEndPoint({
      method: 'get',
      url: `${fundraisingUrl}/pages/${pageName}/updates`,
      headers,
    });

    const thankYouMessage = (pageName) => createEndPoint({ // currently getting a 401 error for this
      method: 'get',
      url: `${fundraisingUrl}/pages/${pageName}/thankyou`,
      headers,
    });

    const getImages = (pageName) => createEndPoint({
      method: 'get',
      url: `${fundraisingUrl}/pages/${pageName}/images`,
      headers,
    });

    const getDonations = (pageName) => createEndPoint({
      method: 'get',
      url: `${fundraisingUrl}/pages/${pageName}/donations`,
      headers,
    });


    return {
      getPageDetailsById,
      getPageUpdates,
      thankYouMessage,
      getImages,
      getDonations,
    }
  }

  return {
    campaigns: campaigns(),
    charity: charity(),
    crowdfunding: crowdfunding(),
    fundraising: fundraising(),
  }
}

module.exports = JG
