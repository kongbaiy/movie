(this["webpackJsonpbudreact-C"]=this["webpackJsonpbudreact-C"]||[]).push([[4],{75:function(e,n,t){e.exports={container:"login_container__3vZYs",loginInfo:"login_loginInfo__2Sdi0",title:"login_title__35Of2",loginLabel:"login_loginLabel__21DLs",loginInput:"login_loginInput__ZAaZ-",loginSubmit:"login_loginSubmit__2Q-SY"}},81:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return b}));var a=t(20),o=t.n(a),r=t(25),i=t(3),l=t(4),s=t(6),c=t(5),u=t(0),m=t.n(u),p=t(75),g=t.n(p),f=t(15),d=t(26),b=function(e){Object(s.a)(t,e);var n=Object(c.a)(t);function t(){var e;Object(i.a)(this,t);for(var a=arguments.length,l=new Array(a),s=0;s<a;s++)l[s]=arguments[s];return(e=n.call.apply(n,[this].concat(l))).state={form:{}},e.formRef=m.a.createRef(),e.handleFormSubmit=function(n){var t;n.preventDefault();var a=new FormData(null===(t=e.formRef)||void 0===t?void 0:t.current),o=a.get("username"),r=a.get("password");o&&r?e.sendLogin({username:o,password:r}):f.b.show({message:"\u7528\u6237\u540d\u4e0d\u80fd\u7a7a",position:"bottom"})},e.sendLogin=Object(r.a)(o.a.mark((function n(){var t,a,r,i,l=arguments;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=l.length>0&&void 0!==l[0]?l[0]:{},n.next=3,d.a.login(t);case 3:a=n.sent,r=a.status,i=a.data,r&&(localStorage.setItem("token",null===i||void 0===i?void 0:i.token),e.props.history.push("/"));case 7:case"end":return n.stop()}}),n)}))),e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return m.a.createElement("form",{className:g.a.container,ref:this.formRef,onSubmit:this.handleFormSubmit},m.a.createElement("div",{className:g.a.loginInfo},m.a.createElement("p",{className:g.a.title},"\u767b\u9646"),m.a.createElement("label",{htmlFor:"username",className:g.a.loginLabel},"\u7528\u6237\u540d"),m.a.createElement("input",{type:"text",name:"username",maxLength:11,id:"username",className:g.a.loginInput}),m.a.createElement("label",{htmlFor:"password",className:g.a.loginLabel},"\u5bc6\u7801"),m.a.createElement("input",{type:"password",name:"password",id:"password",maxLength:20,className:g.a.loginInput}),m.a.createElement("input",{type:"submit",value:"\u63d0\u4ea4",className:g.a.loginSubmit})))}}]),t}(m.a.Component)}}]);
//# sourceMappingURL=4.751d5eab.chunk.js.map