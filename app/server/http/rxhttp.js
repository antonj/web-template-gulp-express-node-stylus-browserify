/*global require, module*/

var Rx = require('rx');
var request = require('request');
var NodeCache = require( "node-cache" );

var cache = new NodeCache( { stdTTL: (10 * 60) /* seconds */, checkperiod: 120 /*seconds*/} );

module.exports.get = function get(url, headers) {
  return call(url, 'GET', headers);
};

module.exports.post = function post(url, headers) {
   return call(url, 'POST', headers);
};

function call(url, method, headers) {
  var options = {
    url: url,
    method: method
  };
  if (headers) {
    options.headers = headers;
  }
  
  return Rx.Observable.create(function (observer) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        observer.onNext(response);
        observer.onCompleted();
      } else {
        observer.onError({error: error, response: response});
      }
    });
  });
}

/** NOTE!!! Will only cache last val emitted by observable */
module.exports.cacheObs = function cacheObs(key, observable) {
  var fromCache = cache.get(key);
  if (fromCache[key]) {
    console.log('found in cache', key, fromCache[key]);
    return Rx.Observable.from(fromCache[key]);
  } else {
    var toCache = [];
    return observable.doAction(function (val) {
      console.log('Store in cache', key);
      toCache.push(val);
      cache.set(key, toCache);
    });
  }
};
