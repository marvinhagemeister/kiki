const getConfig = require('../config/getConfig');
const build = require('../scripts/build');

process.env.NODE_ENV = 'production';

build(getConfig());
