webpackJsonp([6],{GrqS:function(t,e){},rAy2:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("Au9i"),s=(o("7t+N"),{components:{Loadmore:a.Loadmore},data:function(){return{list:[],allLoaded:!1,bottomStatus:"",wrapperHeight:0}},methods:{handleBottomChange:function(t){this.bottomStatus=t},toNext:function(){this.$router.push("/index/Home")},loadBottom:function(){var t=this;setTimeout(function(){var e=t.list[t.list.length-1];if(e<1140)for(var o=1;o<=10;o++)t.list.push(e+o);else t.allLoaded=!0;t.$refs.loadmore.onBottomLoaded()},1e3)}},created:function(){for(var t=1;t<=20;t++)this.list.push(t);this.$emit("navType","9")},mounted:function(){this.wrapperHeight=document.documentElement.clientHeight-this.$refs.wrapper.getBoundingClientRect().top}}),i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:"wrapper",staticClass:"page-loadmore-wrapper",style:{height:t.wrapperHeight+"px"}},[o("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded},on:{"bottom-status-change":t.handleBottomChange}},[o("ul",{staticClass:"page-loadmore-list"},t._l(t.list,function(e){return o("li",{staticClass:"page-loadmore-listitem",on:{click:t.toNext}},[t._v(t._s(e))])})),t._v(" "),o("div",{staticClass:"mint-loadmore-bottom",staticStyle:{"text-align":"center"},attrs:{slot:"bottom"},slot:"bottom"},[o("span",{directives:[{name:"show",rawName:"v-show",value:"loading"!==t.bottomStatus,expression:"bottomStatus !== 'loading'"}],staticClass:"is-rotate"},[t._v("↑")]),t._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.bottomStatus,expression:"bottomStatus === 'loading'"}],staticStyle:{"text-align":"center"}},[o("mt-spinner",{staticStyle:{display:"inline-block"},attrs:{size:20,type:"fading-circle"}})],1)])])],1)},staticRenderFns:[]};var n=o("VU/8")(s,i,!1,function(t){o("GrqS")},null,null);e.default=n.exports}});
//# sourceMappingURL=6.f85f0ff33ab5a86623f3.js.map