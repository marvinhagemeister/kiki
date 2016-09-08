const glob = require('glob');

const config = require('../config/getConfig');
const sass = require('../scripts/sass');

function render(config) {
  if (config.sass) {
    renderSass(config.sass)
  }

  if (config.js) {
    renderJs(config.js);
  }
}

function renderSass(config) {
  if (!config) {
    return;
  }

  sass(config);
}

function renderJs(config) {

}

render();
