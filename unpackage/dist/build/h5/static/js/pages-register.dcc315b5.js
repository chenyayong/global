(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register"],{"14b6":function(e,t,i){"use strict";i.r(t);var a=i("f8f5"),n=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);t["default"]=n.a},2655:function(e,t,i){"use strict";i.r(t);var a=i("e1da"),n=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);t["default"]=n.a},32808:function(e,t,i){"use strict";i.r(t);var a=i("ede8"),n=i("14b6");for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("bdf2");var o,s=i("f0c5"),c=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"387fc1d9",null,!1,a["a"],o);t["default"]=c.exports},"64e0":function(e,t,i){i("c975"),i("a9e3"),i("4d63"),i("ac1f"),i("25f0"),i("5319"),i("1276"),e.exports={error:"",check:function(e,t){e=JSON.stringify(e);for(var i=JSON.parse(e),a=0;a<t.length;a++){if(!t[a].checkType)return!0;if(!t[a].name)return!0;if(!t[a].errorMsg)return!0;if(!i[t[a].name]||""==i[t[a].name])return this.error=t[a].errorMsg,!1;switch("string"==typeof i[t[a].name]&&(i[t[a].name]=i[t[a].name].replace(/\s/g,"")),t[a].checkType){case"string":var n=new RegExp("^.{"+t[a].checkRule+"}$");if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"int":var r=t[a].checkRule.split(",");t.length<2?(r[0]=Number(r[0])-1,r[1]=""):(r[0]=Number(r[0])-1,r[1]=Number(r[1])-1);n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+r[0]+","+r[1]+"}$");if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"between":if(!this.isNumber(i[t[a].name]))return this.error=t[a].errorMsg,!1;var o=t[a].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),i[t[a].name]>o[1]||i[t[a].name]<o[0])return this.error=t[a].errorMsg,!1;break;case"betweenD":n=/^-?\d+$/;if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;o=t[a].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),i[t[a].name]>o[1]||i[t[a].name]<o[0])return this.error=t[a].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;o=t[a].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),i[t[a].name]>o[1]||i[t[a].name]<o[0])return this.error=t[a].errorMsg,!1;break;case"same":if(i[t[a].name]!=t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"notsame":if(i[t[a].name]==t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"reg":n=new RegExp(t[a].checkRule);if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"in":if(-1==t[a].checkRule.indexOf(i[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"notnull":if(null==i[t[a].name]||i[t[a].name].length<1)return this.error=t[a].errorMsg,!1;break;case"samewith":if(i[t[a].name]!=i[t[a].checkRule])return this.error=t[a].errorMsg,!1;break;case"numbers":n=new RegExp("^[0-9]{"+t[a].checkRule+"}$");if(!n.test(i[t[a].name]))return this.error=t[a].errorMsg,!1;break}}return!0},isNumber:function(e){return e=Number(e),NaN!=e}}},"71a5":function(e,t,i){"use strict";var a=i("ffcc"),n=i.n(a);n.a},"7b96":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".verification-code[data-v-387fc1d9]{width:%?200?%;height:%?60?%;border-radius:%?12?%;\n\t/* border:2upx solid; */\n\t/* background-color: #4E6EF3; */font-size:%?28?%;color:var(--theme);text-align:center;line-height:%?60?%;overflow:hidden}.verification-code-disable[data-v-387fc1d9]{color:#b7b7b7;background-color:#fff}",""]),e.exports=t},"999b":function(e,t,i){"use strict";i.r(t);var a=i("a57a"),n=i("2655");for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("71a5");var o,s=i("f0c5"),c=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"2374d292",null,!1,a["a"],o);t["default"]=c.exports},a57a:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"login-title"},[a("v-uni-view",[e._v("注册账号")]),a("v-uni-view",{staticClass:"language-box"},[a("v-uni-view",{staticClass:"language-item"},[a("v-uni-view",{staticClass:"checks",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showCountry=!e.showCountry,e.showLanguage=!1}}},[a("v-uni-image",{staticStyle:{"border-radius":"50%"},attrs:{src:"/static/"+e.checkCountry.icon+".jfif"}}),a("v-uni-text",[e._v(e._s(e.checkCountry.name))]),a("v-uni-image",{attrs:{src:"/static/filter_b.png"}})],1),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.showCountry,expression:"showCountry"}],staticClass:"check-box",staticStyle:{width:"140rpx"}},e._l(e.countryList,(function(t,i){return a("v-uni-view",{key:i,staticClass:"check-item",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.checkC(t)}}},[a("v-uni-image",{attrs:{src:"/static/"+t.icon+".jfif"}}),a("v-uni-text",[e._v(e._s(t.name))])],1)})),1)],1),a("v-uni-view",{staticClass:"language-item"},[a("v-uni-view",{staticClass:"checks",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showLanguage=!e.showLanguage,e.showCountry=!1}}},[a("v-uni-image",{attrs:{src:"/static/lan_b.png"}}),a("v-uni-text",[e._v("中文")]),a("v-uni-image",{attrs:{src:"/static/filter_b.png"}})],1),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.showLanguage,expression:"showLanguage"}],staticClass:"check-box"},[a("v-uni-view",{staticClass:"check-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showLanguage=!1,e.$toast("暂未开放")}}},[e._v("En")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"register"},[a("v-uni-text",[e._v("已有账号？")]),a("v-uni-text",{staticClass:"blue",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.go_login.apply(void 0,arguments)}}},[e._v("立即登录")])],1),a("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"from"},[a("v-uni-view",{staticClass:"from-item"},[a("v-uni-view",{staticClass:"label font-28"},[e._v("手机号")]),a("v-uni-input",{staticClass:"font-28",attrs:{name:"mobile",type:"number",placeholder:"请输入手机号码","placeholder-class":"placeholder"},model:{value:e.from.mobile,callback:function(t){e.$set(e.from,"mobile",t)},expression:"from.mobile"}}),a("v-uni-image",{staticClass:"item-img",attrs:{src:i("c45c")},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clearMobile.apply(void 0,arguments)}}})],1),a("v-uni-picker",{attrs:{range:e.list,"range-key":"area_name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.picker_change.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"from-item"},[a("v-uni-view",{staticClass:"font-30 label"},[e._v("归属地")]),a("v-uni-view",{staticClass:"font-30",style:{textAlign:"left",flex:1,color:e.area_name?"#333333":"grey"}},[e._v(e._s(e.area_name?e.area_name:"号码归属地"))])],1)],1),a("v-uni-view",{staticClass:"from-item rel"},[a("v-uni-view",{staticClass:"label font-28"},[e._v("验证码")]),a("v-uni-input",{staticClass:"font-28",attrs:{name:"mobile_code",type:"number",maxlength:"4",placeholder:"验证码","placeholder-class":"placeholder"},model:{value:e.from.mobile_code,callback:function(t){e.$set(e.from,"mobile_code",t)},expression:"from.mobile_code"}}),a("vercode",{staticClass:"right",attrs:{timeout:e.timeout,area:e.area},model:{value:e.from.mobile,callback:function(t){e.$set(e.from,"mobile",t)},expression:"from.mobile"}})],1),a("v-uni-view",{staticClass:"from-item"},[a("v-uni-view",{staticClass:"label font-28"},[e._v("密码")]),"checkbox"===(e.isPsw?"text":"password")?a("v-uni-input",{staticClass:"font-28 no-bor",attrs:{name:"password",placeholder:"设置密码6-12位字母+数字","placeholder-class":"placeholder",type:"checkbox"},model:{value:e.from.password,callback:function(t){e.$set(e.from,"password",t)},expression:"from.password"}}):"radio"===(e.isPsw?"text":"password")?a("input",{directives:[{name:"model",rawName:"v-model",value:e.from.password,expression:"from.password"}],staticClass:"font-28 no-bor",attrs:{name:"password",placeholder:"设置密码6-12位字母+数字","placeholder-class":"placeholder",type:"radio"},domProps:{checked:e._q(e.from.password,null)},on:{change:function(t){return e.$set(e.from,"password",null)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.from.password,expression:"from.password"}],staticClass:"font-28 no-bor",attrs:{name:"password",placeholder:"设置密码6-12位字母+数字","placeholder-class":"placeholder",type:e.isPsw?"text":"password"},domProps:{value:e.from.password},on:{input:function(t){t.target.composing||e.$set(e.from,"password",t.target.value)}}}),a("v-uni-image",{staticClass:"item-img",attrs:{src:e.isPsw?e.pswYes:e.pswNo},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.isPsw=!e.isPsw}}})],1),a("v-uni-view",{staticClass:"from-item"},[a("v-uni-view",{staticClass:"label font-28"},[e._v("确认密码")]),"checkbox"===(e.isPsw2?"text":"password")?a("v-uni-input",{staticClass:"font-28 no-bor",attrs:{name:"password2",placeholder:"请确认密码","placeholder-class":"placeholder",type:"checkbox"},model:{value:e.from.password2,callback:function(t){e.$set(e.from,"password2",t)},expression:"from.password2"}}):"radio"===(e.isPsw2?"text":"password")?a("input",{directives:[{name:"model",rawName:"v-model",value:e.from.password2,expression:"from.password2"}],staticClass:"font-28 no-bor",attrs:{name:"password2",placeholder:"请确认密码","placeholder-class":"placeholder",type:"radio"},domProps:{checked:e._q(e.from.password2,null)},on:{change:function(t){return e.$set(e.from,"password2",null)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.from.password2,expression:"from.password2"}],staticClass:"font-28 no-bor",attrs:{name:"password2",placeholder:"请确认密码","placeholder-class":"placeholder",type:e.isPsw2?"text":"password"},domProps:{value:e.from.password2},on:{input:function(t){t.target.composing||e.$set(e.from,"password2",t.target.value)}}}),a("v-uni-image",{staticClass:"item-img",attrs:{src:e.isPsw2?e.pswYes:e.pswNo},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.isPsw2=!e.isPsw2}}})],1),a("v-uni-view",{staticClass:"from-item"},[a("v-uni-view",{staticClass:"label font-28"},[e._v("邀请码")]),a("v-uni-input",{staticClass:"font-28",attrs:{name:"invite",placeholder:"请输入推荐码","placeholder-class":"placeholder"},model:{value:e.from.invite,callback:function(t){e.$set(e.from,"invite",t)},expression:"from.invite"}})],1),a("v-uni-view",{staticClass:"radio"},[a("v-uni-radio-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.isChange.apply(void 0,arguments)}}},[a("v-uni-radio",{attrs:{color:"#4E6EF3",value:"agree"}}),e._v("我已阅读并同意"),a("v-uni-text",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.go_agree(3)}}},[e._v("网络服务协议")]),e._v("和"),a("v-uni-text",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.go_agree(4)}}},[e._v("隐私政策")])],1)],1)],1),a("v-uni-button",{staticClass:"buttom font-32",attrs:{"form-type":"submit"}},[e._v("注册")])],1)],1)},r=[]},bc5c:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".login-title[data-v-2374d292]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?66?%;font-size:%?48?%;font-family:PingFangSC,PingFangSC-Medium;font-weight:500;text-align:left;color:#313133;line-height:%?66?%;margin-left:%?60?%}.login-title .language-box[data-v-2374d292]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-right:%?20?%}.login-title .language-box .language-item[data-v-2374d292]{margin-left:%?20?%}.login-title .language-box .checks[data-v-2374d292]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?24?%;color:#333}.login-title .language-box .checks uni-image[data-v-2374d292]{width:%?32?%;height:%?32?%}.login-title .language-box .checks uni-text[data-v-2374d292]{margin-left:%?10?%}.login-title .language-box .check-box[data-v-2374d292]{position:absolute;z-index:9999;width:%?120?%;margin-top:%?6?%;background-color:#fff;border:%?2?% solid #ccc}.login-title .language-box .check-box .check-item[data-v-2374d292]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:%?60?%;color:#333;font-size:%?24?%}.login-title .language-box .check-box .check-item uni-image[data-v-2374d292]{width:%?24?%;height:%?24?%;border-radius:50%;margin-right:%?4?%}.register[data-v-2374d292]{height:%?36?%;font-size:%?26?%;font-family:PingFangSC,PingFangSC-Regular;font-weight:400;text-align:left;color:#919298;line-height:%?36?%;margin-left:%?60?%;margin-top:%?14?%}.register .blue[data-v-2374d292]{color:var(--theme)}.from[data-v-2374d292]{padding:%?60?%;box-sizing:border-box;padding-right:0}.from .rel[data-v-2374d292]{position:relative}.from .right[data-v-2374d292]{position:absolute;right:0}.from .from-item[data-v-2374d292]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #f2f3f6;height:%?100?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?630?%;position:relative}.from .from-item .label[data-v-2374d292]{width:%?140?%}.from .from-item .placeholder[data-v-2374d292]{color:#d7d7d9}.from .from-item .item-img[data-v-2374d292]{position:absolute;right:%?20?%;width:%?36?%;height:%?36?%}.from .from-item .no-bor[data-v-2374d292]{border:none;outline:none}.radio[data-v-2374d292]{font-size:%?24?%;font-family:PingFangSC,PingFangSC-Regular;font-weight:400;text-align:left;color:#a7aab3;line-height:%?32?%;margin-top:%?26?%}.radio uni-radio[data-v-2374d292]{-webkit-transform:scale(.7);transform:scale(.7);vertical-align:middle}.radio uni-text[data-v-2374d292]{color:#ff5a3c;text-decoration:underline}.buttom[data-v-2374d292]{width:%?630?%;height:%?90?%;background:#4e6ef3;border-radius:%?45?%;text-align:center;line-height:%?90?%;margin:0 auto;margin-top:%?20?%;color:#fff}",""]),e.exports=t},bdf2:function(e,t,i){"use strict";var a=i("f710"),n=i.n(a);n.a},c45c:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAD3ElEQVRYR82Y72tbVRjHv885yc0GCipzq2/GUrPF2oVLYuqwHUWTMRF9a1F85Zs5YcL+EwU3NvWNoKLUl6Kg2A7KJiVJb7x20d6YLWOC4IxVEG2b672PnCzpkqzJPUk3SN41eX58+vw85xAG/Nj2jajr1Z8H4TgYEww+SIQHlRlm/E2gmyD8BMblsDS+Ns1D1UFckI7w/Py8jMXNlz0fZ8CYBqClpxhB+E4KnKs49udzc3NekL9Aw5ZVPuGB3wXwRJCxgN/XJOitVOrIt/3kegJVq9U963+67zDhFDMHguvAEhET4/1HHg6fjUajmzvp7OjIsn5+1CP/SzCmdBwNLEPISxYvplKHf+/WvQtIwfjwl3j3KerLScCagJjthuoAUmmq/VVfum+RuTsc+X0PGbPt6esAWrHKF33wGwOnYBcKAvTeU6kjp1smtoFUN/mEb+5VAesyqkIXjJOt7msAqTkTjZlX70Fr63J0y61VK/ZRNacaQJbtvOJ5+DTA2gYRfQjmFxg4pOeZrgH8FQGvM/BAPx0p8WrKjH/WAMoXnctgzAS0xfmpZPxMofDjYxChRQYHDEoqGVJkTDN2K18svw3mswH2r0wl48cpny+PQ3IlaB0QaK2+6c5MT0+u53KlMQqFFgFM9HBSqkuZmTFjt5r/wBKDYwFRZUNGHqeCVT7N4AtaKWAqulvuCQW1vHr9QMh1Fxl4skOX6GpdbGRnTLMFoxHN2xYI9CYViuWPmfk1LSAl1AZl25X9ru8vMPPRpv6qhMiqYZcrVcfElnspOLV3PBPRJypCKwxOaQN1QTXWDPwF9fUGRHZWweRKYyIUVpHpldId3RHIorzlqH2ybyCgLqiC4zT00/F4TaVSuu6lPvXVz1WNCkVnkxmRgYG6oNSfy8urB0KRyCIzd9aVpnEibO0OiPC9a/yXnZ6cXN8GMiIqVcMDDZsyAmzP9bPHjk38oVIm/hGkirkRpeGhakMVNQE/wEc2nY7XtouaSOwJhbKJxPhvw0I1inrQtidg9d9mN7V1WKI5SBzJezOp1MFfh4Fqtb3+YARKEuI5lZortr3f8Pcu4M4MapVuhcMy83Qi9sugUI3BqLs6QHTdEOIZtZvUQKx7nlodkz0aqBoiI5NMRm80oXLquqS1OnSXKxE+SCfjp5QDGYmoyPSCafqlmxSmTDpx+FpuxfmCCC9pLVclpHf8oE0i/ohBWTCPa40WwrrqRmY8G7S8O44fI3dAa0RplI6wrfCP1CFfQY3cNeh26kboothK3UhdpVtQI/XY0D5jRuY5ph1qpB6suiey2n0Uxknw/XnS+x+8QD+HavUeXAAAAABJRU5ErkJggg=="},e1da:function(e,t,i){"use strict";var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("32808")),r=i("64e0"),o={data:function(){return{from:{mobile:"",mobile_code:"",password:"",password2:"",push_id:plus.push.getClientInfo().clientid,invite:"",isAgree:""},area:"",area_name:"",list:[],timeout:0,isPsw:!1,isPsw2:!1,pswNo:"../static/psw_no.png",pswYes:"../static/psw_yes.png",showLanguage:!1,showCountry:!1,checkCountry:{icon:"china",name:"中国"},countryList:[{icon:"china",name:"中国"},{icon:"hk",name:"香港"},{icon:"am",name:"澳门"},{icon:"canada",name:"加拿大"},{icon:"mg",name:"美国"},{icon:"tw",name:"台湾"},{icon:"mlxy",name:"马来西亚"},{icon:"xjp",name:"新加坡"},{icon:"rb",name:"日本"},{icon:"yn",name:"越南"}]}},mounted:function(){var e=this;this.$http("get|api/Api/send_validate_code").then((function(t){e.list=t.result.country_area,e.timeout=+t.result.sms_time_out}))},methods:{checkC:function(e){this.checkCountry=e,this.showCountry=!1},clearMobile:function(){this.from.mobile=""},formSubmit:function(e){var t=this,i=[{name:"mobile",checkType:"notnull",errorMsg:"手机号码不能为空"},{name:"mobile_code",checkType:"notnull",errorMsg:"请输入验证码"},{name:"password",checkType:"notnull",errorMsg:"请输入密码"},{name:"password",checkType:"string",checkRule:"6,12",errorMsg:"密码应为6-12位字母+数字"},{name:"password2",checkType:"notnull",errorMsg:"请输入确认密码"},{name:"password",checkType:"same",checkRule:this.from.password2,errorMsg:"两次密码输入不一致"},{name:"password2",checkType:"same",checkRule:this.from.password,errorMsg:"两次密码输入不一致"}],a=e.detail.value,n=r.check(a,i);n?this.isAgree?this.$http("post|api/User/reg",this.from).then((function(e){t.$toastApp(e.msg),setTimeout((function(){uni.navigateBack()}),500)})).catch((function(e){t.$toastApp(e.msg,"none")})):this.$toastApp("请先阅读并同意协议","none"):uni.showToast({title:r.error,icon:"none"})},picker_change:function(e){var t=e.detail.value;this.area=this.list[t].area,this.area_name=this.list[t].area_name},go_login:function(){uni.redirectTo({url:"/pages/login"})},go_agree:function(e){this.$http("get|api/Article/regulation",{id:e}).then((function(t){uni.navigateTo({url:"/pages/agreement?type="+e+"&title="+t.result.topic_title})}))},isChange:function(e){this.isAgree=e.detail.value}},components:{vercode:n.default}};t.default=o},ede8:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{class:["verification-code",e.can_check_verification?"":"verification-code-disable","font-24"],on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.get_verification_code.apply(void 0,arguments)}}},[e._v(e._s(e.verification_code))])},r=[]},f710:function(e,t,i){var a=i("7b96");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("13f41c08",a,!0,{sourceMap:!1,shadowMode:!1})},f8f5:function(e,t,i){"use strict";i("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=null,n={props:{value:{},timeout:{type:Number,default:60},area:{}},data:function(){return{can_check_verification:!0,verification_code_time:0}},methods:{get_verification_code:function(){var e=this;if(this.can_check_verification)return $check_mobel(this.value)?this.area?void this.$http("post|api/Api/send_validate_code",{mobile:this.value,area:this.area}).then((function(t){e.$toastApp(t.msg),e.can_check_verification=!1,e.verification_code_time=e.timeout,setTimeout((function(){e.verification_code_time=e.timeout-1,e.verification_timeout()}),1e3)})).catch((function(t){e.$toastApp(t.msg)})):this.$toastApp("请选择归属地"):this.$toastApp("手机格式不正确")},verification_timeout:function(){var e=this;this.verification_code_time<=0?this.can_check_verification=!0:a=setTimeout((function(){e.verification_code_time-=1,e.verification_timeout()}),1e3)}},computed:{verification_code:function(){return 0===this.verification_code_time?"获取验证码":"".concat(this.verification_code_time,"S后可重发")}},destroyed:function(){clearTimeout(a)}};t.default=n},ffcc:function(e,t,i){var a=i("bc5c");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("6dda0438",a,!0,{sourceMap:!1,shadowMode:!1})}}]);