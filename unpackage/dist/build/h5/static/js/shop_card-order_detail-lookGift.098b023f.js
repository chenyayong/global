(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop_card-order_detail-lookGift"],{"1b9b":function(t,e,i){"use strict";var n=i("3146"),o=i.n(n);o.a},2223:function(t,e,i){"use strict";i.r(e);var n=i("716f"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},3146:function(t,e,i){var n=i("632b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("c16a7ba2",n,!0,{sourceMap:!1,shadowMode:!1})},"632b":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"uni-page-body[data-v-1853e0a6]{background-color:#f7f7f7}.list-box[data-v-1853e0a6]{background-color:#fff;padding:0 %?30?%}.item[data-v-1853e0a6]:nth-child(1){border-top:none}.item[data-v-1853e0a6]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?30?% 0;border-top:%?1?% solid #e5e5e5}.item uni-image[data-v-1853e0a6]{width:%?180?%;height:%?180?%}.item .right[data-v-1853e0a6]{height:%?180?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column;flex-flow:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.item .right .tlt[data-v-1853e0a6]{width:%?490?%;color:#454545;font-size:%?28?%;line-height:%?40?%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.item .right .num[data-v-1853e0a6]{color:#333;font-size:%?28?%;line-height:%?40?%}body.?%PAGE?%[data-v-1853e0a6]{background-color:#f7f7f7}",""]),t.exports=e},"716f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:[]}},methods:{getList:function(t){var e=this;this.$http("get|api/Order/free_goods",{order_id:t}).then((function(t){console.log(t),e.list=t.result.free_goods}))}},onLoad:function(t){console.log(t),this.getList(t.id)}};e.default=n},d580:function(t,e,i){"use strict";i.r(e);var n=i("e560"),o=i("2223");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("1b9b");var s,r=i("f0c5"),l=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"1853e0a6",null,!1,n["a"],s);e["default"]=l.exports},e560:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"list-box"},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item"},[i("v-uni-image",{attrs:{src:t.$image+e.goods.original_img}}),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"tlt"},[t._v(t._s(e.goods.goods_name))]),i("v-uni-view",{staticClass:"num"},[t._v("数量: "+t._s(e.goods_num))])],1)],1)})),1)],1)},a=[]}}]);