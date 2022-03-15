const fetch = require("node-fetch");

const { URBAN_DICTIONARY } = require("../../config");

/**
 * Return a list of definitions
 * @param {String} searchString * @returns */
const define = async (searchString) => {
  const searchQueryString = new URLSearchParams({ term: searchString }).toString();
  const searchURL = URBAN_DICTIONARY.API_URL + URBAN_DICTIONARY.ENDPOINTS.DEFINE + searchQueryString;
  const response = await fetch(searchURL);
  const { list } = await response.json();
  return list[0];
}

const urbanDictionary = { define };

module.exports = urbanDictionary;