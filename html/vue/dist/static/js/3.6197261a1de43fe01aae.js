webpackJsonp([3],{"4GN9":function(t,e){},"6zrd":function(t,e,n){"use strict";var a={props:["pData"],data:function(){return{name:"哈哈哈"}},methods:{transmit:function(){this.$emit("topMenu","我是子组建数据")}},created:function(){this.transmit(),console.log(this.pData)}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("h1",[e("span",{staticStyle:{"font-size":"18px",color:"red"}},[this._v("props:"+this._s(this.pData))])])])},staticRenderFns:[]};var i=n("VU/8")(a,s,!1,function(t){n("WOhf")},"data-v-dc26365e",null);e.a=i.exports},MxIQ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("6zrd"),s=n("7t+N"),i=n.n(s),o={components:{currencyModel:a.a},data:function(){return{test:"page2父数据",baidu:"Welcome to Your Vue.js App"}},methods:{GetData:function(){var t=this;i.a.getJSON("/baidu/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=%E9%93%B6%E9%AD%82&bk_length=600").then(function(e){console.log(e),t.baidu=e}),$get("/baidu/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=%E9%93%B6%E9%AD%82&bk_length=600").then(function(t){console.log(t)})}},created:function(){console.log("routeName:"+this.$route.name),this.$emit("navType","2"),this.GetData()}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content"},[e("p",{staticClass:"name"},[this._v("Welcome Page2页面2")]),this._v("\n  "+this._s(this.baidu.desc)+"\n  "),this._m(0),this._v(" "),e("currency-model",{attrs:{pData:this.test}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("table",{staticClass:"table table-bordered"},[e("tr",[e("td",[this._v("1")]),this._v(" "),e("td",{attrs:{rowspan:"2"}},[this._v("1")])]),this._v(" "),e("tr",[e("td",[this._v("1")])])])}]};var c=n("VU/8")(o,r,!1,function(t){n("4GN9")},null,null);e.default=c.exports},WOhf:function(t,e){}});
//# sourceMappingURL=3.6197261a1de43fe01aae.js.map