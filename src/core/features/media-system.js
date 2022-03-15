const tenor = require("../apis/tenor");
const urbanDictionary = require("../apis/urban-dictionary");

const searchGif = tenor.searchGif;
const define = urbanDictionary.define;

const mediaSystem = { searchGif, define };

module.exports = mediaSystem;