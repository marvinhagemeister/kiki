const t = require('chai').assert;
const match = require('../../dist/utils').fileFromMatch;

describe('fileFromMatch', () => {
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
