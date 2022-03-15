const fetch = require("node-fetch");
const { TENOR } = require("../../config");

/**
 * Search a gif URL
 * @param {String} searchString * @returns */
const searchGif = async (searchString) => {
  const searchGifQueryString = new URLSearchParams({
    q: searchString,
    key: TENOR.API_KEY,
  }).toString();

  const searchGifURL = TENOR.API_URL + TENOR.ENDPOINTS.RANDOM + searchGifQueryString
  const response = await fetch(searchGifURL);

  const { results: gifs } = await response.json();

  if(!gifs.length) return null;

  const gif = gifs[Math.floor(Math.random() * gifs.length)];
  const gifURL = gif.media[0].gif.url;

  return gifURL;
}

const tenor = { searchGif };

module.exports = tenor;