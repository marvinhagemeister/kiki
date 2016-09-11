const t = require('chai').assert;
const match = require('../../dist/utils').filesFromMatch;

describe('filesFromMatch', () => {
  it('should create an IFile object from a match', () => {
    t.deepEqual(match(['myfile.scss']), [{
      location: 'myfile.scss',
      map: null
    }]);
    
    t.deepEqual(match(['/a/myfile.scss', '/myfile.scss']), [{
      location: '/a/myfile.scss',
      map: null
    }, {
      location: '/myfile.scss',
      map: null
    }]);
  });
});
