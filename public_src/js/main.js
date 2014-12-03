/*global require, module, console*/
'use strict';

var ViewPager = require('./libs/viewpager/src/viewpager');

function days(num) {
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

function Adapter(items) {
  console.log(items);

  var views = new Array(items.length);
  items.forEach(function (d, i) {
    var item = document.createElement('div');
    item.className = 'pager-item-day';
    item.innerHTML = '====> ' + i + ' <====<br />' + d;
    view_pager_elem.appendChild(item);
    views[i] = item;
  });
  
  // var offScreenLimit = 1;
  // var size = (offScreenLimit * 2) + 1;
  // var i;
  // var views = new Array(size);
  // for (i = 0; i < size; i++) {
  //   var item = document.createElement('div');
  //   item.className = 'pager-item-day';
  //   views[i] = item;
  // }
  console.log(views);
  
  return {
    size : function () {
      return items.length;
    },

    getView : function (i, view) {
      var item = items[i];
      view.innerHTML = item.text;
    },

    onPageScroll : function(offset, page) {
      // console.log(offset, page);
      page = Math.max(0, page);
      var active = views[page];
        
      active.style['-webkit-transform'] = 'translate3d('
        + ((-offset * w)) + 'px,'
        + ' 0px, 0px)';
      console.log('active', active);

      var i = page;
      var o;
      var page_offset;
      while (--i >= 0) {
        page_offset = i - page;
        // console.log('less', i, page_offset, views[i]);
        o = ((-offset * w) + (page_offset * w));
        views[i].style['-webkit-transform'] = 'translate3d('
          + o + 'px,'
          + ' 0px, 0px)';        
      }

      i = page;
      while (++i < views.length) {
        page_offset = i - page;
        // console.log('more', i, page_offset, views[i]);
        o = ((-offset * w) + (page_offset * w));
        views[i].style['-webkit-transform'] = 'translate3d('
          + o + 'px,'
          + ' 0px, 0px)';        
      }
    },

    onPageChange : function (page) {
      console.log('page', page);
    }
  };
}

var items = days(4).map(function (d) {
  return new Date(d);
});
var adapter = new Adapter(items);
window.adapter = adapter;

var vp = new ViewPager(view_pager_elem, {
  pages: Number.MAX_VALUE, //adapter.size(),
  onPageScroll : function (offset, page) {
    adapter.onPageScroll(offset, page);
  },

  onPageChange : function (page) {
    adapter.onPageChange(page);
  },

  onSizeChanged : function(width, height) {
    w = width;
  }
});
