webpackJsonp([8],{"/tAz":function(e,t,n){var o=n("k9gj");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("7bf3053a",o,!0,{})},k9gj:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"\n.new-nav .scrollable .vux-tab-item{    -webkit-box-flex: 0;    -webkit-flex: 0 0 0 0;    flex: 0 0 0 0;\n}\n.tab-component .vux-tab .vux-tab-item {\n  display: inline-block;\n  width: auto;\n  height: 100%;\n  padding: 0 15px;\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n          flex: none;\n  background-color: #f2f4f5;\n}\n\n","",{version:3,sources:["E:/work/Vue/Vux/src/pages/index/vuex.vue"],names:[],mappings:";AACA,uCAAuC,oBAAoB,IAAI,sBAAsB,IAAI,cAAc;CACtG;AACD;EACE,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,oBAAoB;EACpB,mBAAmB;UACX,WAAW;EACnB,0BAA0B;CAC3B",file:"vuex.vue",sourcesContent:["\n.new-nav .scrollable .vux-tab-item{    -webkit-box-flex: 0;    -webkit-flex: 0 0 0 0;    flex: 0 0 0 0;\n}\n.tab-component .vux-tab .vux-tab-item {\n  display: inline-block;\n  width: auto;\n  height: 100%;\n  padding: 0 15px;\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n          flex: none;\n  background-color: #f2f4f5;\n}\n\n"],sourceRoot:""}])},xMx1:function(e,t,n){"use strict";function o(e){n("/tAz")}Object.defineProperty(t,"__esModule",{value:!0});var s={data:function(){return{}},components:{},computed:{getStoreNavState:function(){return this.$store.state.navState}},watch:{getStoreNavState:function(e,t){console.log("Store--\x3e"+e,t)}},methods:{},created:function(){this.$store.dispatch("switch_dialog");var e=this.$store.getters.not_show;console.log(e),this.$emit("navType","333");var t=this;setTimeout(function(){t.$store.state.navState="new"},2e3)}},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("p",[e._v("Welcome Vuex")]),e._v(" "),n("br"),n("br"),e._v("\n  "+e._s(e.$store.state)),n("br")])},i=[],r={render:a,staticRenderFns:i},l=r,c=n("VU/8"),A=o,u=c(s,l,!1,A,null,null);t.default=u.exports}});
//# sourceMappingURL=8.05a589611ece6d6cf035.js.map