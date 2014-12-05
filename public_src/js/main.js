/*global require, module, console, document, window*/
'use strict';

var ViewPager = require('./libs/viewpager/src/viewpager');

function create_days_backwards(num) {
  var now = Date.now();
  var day_ms = 1000 * 60 * 60 * 24;
  var r = [];
  var i;
  for (i = 0; i < num; i++) {
    r.push(now - (day_ms * i));    
  }
  return r;
}

var view_pager_elem = document.querySelector('.pager');
var w = view_pager_elem.offsetWidth;
var h = view_pager_elem.offsetHeight;

/** modulus negative numbers */
function mod(m, n) {
  return ((m % n) + n) % n;
}

function Adapter(items) {
  var offScreenLimit = 1;
  var view_size = (offScreenLimit * 2) + 1;
  var recycle_view_index = 0;
  var i;
  var fragment = document.createDocumentFragment();
  for (i = 0; i < view_size; i++) {
    var item = document.createElement('div');
    item.className = 'pager-item-day';
    item.innerHTML = 'recycle-view: ' + i;
    fragment.appendChild(item);
  }
  view_pager_elem.appendChild(fragment.cloneNode(true));
  var views = view_pager_elem.children;
  
  return {
    pages : items.length,

    getView : function (i, view) {
      var item = items[i];
      view.innerHTML = item.text;
    },

    onPageScroll : function(offset, page) {
      // console.log(offset, page);
      // start center

      var start = recycle_view_index;

      for (var i = 0, l = view_size; i < l; i++) {
        var view = views[start];
        var index_from_active = i - offScreenLimit;
        console.log("a, s, i =>", recycle_view_index, start, index_from_active);
        var o = ((-offset * w) + (index_from_active * w));
        view.style['-webkit-transform'] = 'translate3d(' +
          o + 'px,' +
          ' 0px, 0px)';
        start = (start + 1) % view_size;
      }
      console.log('================');
    },

    onPageChange : function (page) {
      recycle_view_index = mod(page, view_size);
      var in_view = mod(recycle_view_index + offScreenLimit, view_size);
      console.log('page', page, recycle_view_index);
      views[in_view].innerHTML += '<br /> showing pos => ' + page;
    }
  };
}

var items = create_days_backwards(11).map(function (d) {
  return new Date(d);
});
var adapter = new Adapter(items);
adapter.onPageScroll(0, 0);
window.adapter = adapter;

var vp = new ViewPager(view_pager_elem, adapter);
