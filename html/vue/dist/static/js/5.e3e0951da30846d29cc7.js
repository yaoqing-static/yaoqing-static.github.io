webpackJsonp([5],{"6zrd":function(e,t,n){"use strict";function o(e){n("f461")}var s={props:["pData"],data:function(){return{name:"哈哈哈"}},methods:{transmit:function(){this.$emit("topMenu","我是子组建数据")}},created:function(){this.transmit(),console.log("获取props数据:"+this.pData)}},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[n("h1",[n("span",{staticStyle:{"font-size":"18px",color:"red"}},[e._v("props:"+e._s(e.pData))])])])},r=[],c={render:a,staticRenderFns:r},i=c,u=n("VU/8"),l=o,p=u(s,i,!1,l,"data-v-673be174",null);t.a=p.exports},MxIQ:function(e,t,n){"use strict";function o(e){n("jhAt")}Object.defineProperty(t,"__esModule",{value:!0});var s=n("ODCk"),a=n("6zrd"),r=(a.a,s.a,{components:{currencyModel:a.a},data:function(){return{timeDate:new Date,test:"page2父数据",baidu:"Welcome to Your Vue.js App"}},filters:{dateFormat:s.a},methods:{GetData:function(){$_get("/baidu/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=%E9%93%B6%E9%AD%82&bk_length=600").then(function(e){console.log(e)})},add:function(){this.$refs.input1.value="22",console.log(this.$refs.input1.value),console.log(this.$refs.input1)}},watch:{},created:function(){console.log($_common.commontFun()),console.log(Object(s.a)(new Date,"YYYY-MM-DD HH:mm:ss")),console.log("routeName:"+this.$route.name),console.log("获取路由参数："+this.$route.params.id),this.$emit("navType","2"),this.GetData()}}),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("p",[e._v("时间格式化："+e._s(e._f("dateFormat")(e.timeDate,"YYYY-MM-DD HH:mm:ss")))]),n("br"),e._v(" "),n("p",{staticClass:"name"},[e._v("Welcome Page2页面2")]),e._v("\n  "+e._s(e.baidu.desc)+"\n\n  "),n("currency-model",{attrs:{pData:e.test}}),e._v(" "),n("input",{ref:"input1",attrs:{type:"text"}}),e._v(" "),n("button",{on:{click:e.add}},[e._v("添加")])],1)},i=[],u={render:c,staticRenderFns:i},l=u,p=n("VU/8"),f=o,g=p(r,l,!1,f,null,null);t.default=g.exports},ODCk:function(e,t,n){"use strict";t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD HH:mm:ss";if(!e)return"";"string"==typeof e&&(e=new Date(e.replace(/-/g,"/"))),"number"==typeof e&&(e=new Date(e));var n={"M+":e.getMonth()+1,"D+":e.getDate(),"h+":e.getHours()%12==0?12:e.getHours()%12,"H+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()},o={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};/(Y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),/(E+)/.test(t)&&(t=t.replace(RegExp.$1,(RegExp.$1.length>1?RegExp.$1.length>2?"星期":"周":"")+o[e.getDay()+""]));for(var s in n)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[s]:("00"+n[s]).substr((""+n[s]).length)));return t}},f461:function(e,t,n){var o=n("hMYt");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("4d895164",o,!0,{})},hMYt:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"\nh1[data-v-673be174] {\n  color: cornflowerblue;\n}\n","",{version:3,sources:["F:/Vux/src/components/currency.vue"],names:[],mappings:";AACA;EACE,sBAAsB;CACvB",file:"currency.vue",sourcesContent:["\nh1[data-v-673be174] {\n  color: cornflowerblue;\n}\n"],sourceRoot:""}])},jhAt:function(e,t,n){var o=n("jtHs");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("3d676c4e",o,!0,{})},jtHs:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"Page2.vue",sourceRoot:""}])}});
//# sourceMappingURL=5.e3e0951da30846d29cc7.js.map