const watch = require('../scripts/watch');
const getConfig = require('../config/getConfig');

process.env.NODE_ENV = 'development';

watch(getConfig());
