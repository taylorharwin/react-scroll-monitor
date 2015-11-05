import expect from 'expect';
var Handler = require('../src/handler');
var getUniqueId = require('../src/utils/getUniqueId');

var id = 1;


describe('ScrollSource', function() {

})

describe('ScrollListener', function() {
  
})

describe('Unique id', function() {
  it('should return a new id when called', function() {
    var startId = getUniqueId();
    expect(startId).toNotEqual(getUniqueId());
  })
})

describe('Handler', () => {
  beforeEach(function() {
    id += 1;
  });
  
  describe('update listener', function() {
    it ('should register update listener with an id', function() {
      Handler.registerUpdateListner(id, function() {});
      expect(Handler.getUpdateListeners(id).length).toBe(1);
    });

    it ('should return an object with a remove function', function() {
      var removeListener = Handler.registerUpdateListner(id, function() {});
      expect(removeListener.remove).toBeA('function')
    });

    it('should remove the listener when remove is called', function() {
      var removeListener = Handler.registerUpdateListner(id, function() {});
      expect(Handler.getUpdateListeners(id).length).toBe(1);
      removeListener.remove();
      expect(Handler.getUpdateListeners(id).length).toBe(0);
    });
  });

  describe('scroll listener', function() {
    it ('should register update listener with an id', function() {
      Handler.registerScrollListener(id, function() {});
      expect(Handler.getScrollListeners(id).length).toBe(1);
    });

    it ('should return an object with a remove function', function() {
      var removeListener = Handler.registerScrollListener(id, function() {});
      expect(removeListener.remove).toBeA('function')
    });

    it('should remove the listener when remove is called', function() {
      var removeListener = Handler.registerScrollListener(id, function() {});
      expect(Handler.getScrollListeners(id).length).toBe(1);
      removeListener.remove();
      expect(Handler.getScrollListeners(id).length).toBe(0);
    });  
  });

});
