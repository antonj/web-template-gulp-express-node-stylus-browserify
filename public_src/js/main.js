/*global require, module, console*/
'use strict';

var ViewPager = require('./libs/viewpager/src/viewpager');

function days(num) {
  var now = Date.now();
  var day_ms = 1000 * 60 * 60 * 24;
  var r = [];
  for (var i = 0; i < num; i++) {
    r.push(now - (day_ms * i));
  }
  return r;
}


var view_pager_elem = document.querySelector('.pager');
var w = view_pager_elem.offsetWidth;
var h = view_pager_elem.offsetHeight;

days(2).map(function (d) {
  console.log(new Date(d));
  return new Date(d);
}).forEach(function (d) {
  console.log('hej', d);
  var item = document.createElement('div');
  item.className = 'pager-item-day';
  item.innerHTML = d;
  view_pager_elem.appendChild(item);
});





var vp = new ViewPager(view_pager_elem, {
  pages: 2,
  vertical: false,
  onPageScroll : function (offset, page) {
    console.log(offset, page);
    view_pager_elem.style['-webkit-transform'] = 'translate3d(' + ((-offset * w) - (page * w)) + 'px, 0px, 0px)';

  },

  onPageChange : function (page) {
    console.log('page', page);
  },

  onSizeChanged : function(width, height) {
    w = width;
  }
});
