webpackJsonp([1],{100:function(t,n){},103:function(t,n){},106:function(t,n){},107:function(t,n){},112:function(t,n){},119:function(t,n){},125:function(t,n){},128:function(t,n){},13:function(t,n){},18:function(t,n,e){"use strict";n.a={data:function(){return{clipped:!1,drawer:!0,fixed:!1,items:[{icon:"bubble_chart",title:"Inspire"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Vuetify.js"}},name:"App"}},25:function(t,n,e){"use strict";var a=e(19),i=e.n(a);n.a={data:function(){return{imageFile:"",snapshot:{imageURL:"",comment:""}}},methods:{addPhoto:function(t){this.imageFile=t},saveSnapshot:function(){var t=this;this.storeImage(function(){i.a.post("/snapshot",t.snapshot).then(function(t){console.log(t)}).catch(function(t){console.log(t)})})},storeImage:function(t){var n=this;i.a.get("/image-aws-config",{params:{imageFileName:Date.now()}}).then(function(t){n.snapshot.imageURL=t.data.imageURL;var e={headers:{"Content-Type":n.imageFile.type}};return i.a.put(t.data.signedAWSURL,n.imageFile,e)}).then(function(n){t()}).catch(function(t){console.log(t)})}},name:"App"}},32:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(15),i=e(35),o=e(19),s=e.n(o),c=e(55),r=e(61),u=e.n(r),l=e(67),f=e.n(l),p=e(75),m=e.n(p),d=e(82),h=e.n(d),v=e(85),g=e.n(v),b=e(31),F=e.n(b),w=e(5),y=e.n(w),x=e(104),V=e.n(x),_=e(117),k=e.n(_),A=e(123),R=e.n(A),L=e(12),T=e.n(L),j=e(128);e.n(j);a.a.use(u.a,{components:{VApp:f.a,VNavigationDrawer:m.a,VFooter:h.a,VList:g.a,VBtn:F.a,VIcon:y.a,VGrid:k.a,VTextField:V.a,VToolbar:R.a,transitions:T.a},theme:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}),a.a.config.productionTip=!1,s.a.defaults.baseURL="https://api-snapspace.herokuapp.com",new a.a({el:"#app",router:c.a,components:{App:i.a},template:"<App/>"})},35:function(t,n,e){"use strict";var a=e(18),i=e(36),o=e(17),s=o(a.a,i.a,!1,null,null,null);n.a=s.exports},36:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-app",[e("v-content",[e("router-view")],1)],1)},i=[],o={render:a,staticRenderFns:i};n.a=o},55:function(t,n,e){"use strict";var a=e(15),i=e(56),o=e(57);a.a.use(i.a),n.a=new i.a({routes:[{path:"/",name:"snapshots/upload",component:o.a}]})},57:function(t,n,e){"use strict";function a(t){e(58)}var i=e(25),o=e(60),s=e(17),c=a,r=s(i.a,o.a,!1,c,"data-v-ce34825a",null);n.a=r.exports},58:function(t,n){},60:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",{attrs:{"grid-list-xl":""}},[e("v-layout",{attrs:{row:"","justify-center":"","align-center":"",wrap:""}},[e("v-flex",{attrs:{xs12:"",s4:"",md3:""}},[e("label",{staticClass:"btn btn-file info btn--block"},[t._v("\n        Take photo\n        "),e("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"addphoto",accept:"image/*"},on:{change:function(n){t.addPhoto(n.target.files[0])}}})])])],1),t._v(" "),e("v-layout",{attrs:{row:"","justify-center":"","align-center":"",wrap:""}},[e("v-flex",{attrs:{xs12:"",s4:"",md3:""}},[e("v-text-field",{attrs:{name:"input-7-1",label:"Tell us more","multi-line":""},model:{value:t.snapshot.comment,callback:function(n){t.$set(t.snapshot,"comment",n)},expression:"snapshot.comment"}})],1)],1),t._v(" "),e("v-layout",{attrs:{row:"","justify-center":"","align-center":"",wrap:""}},[e("v-flex",{attrs:{xs12:"",s4:"",md3:""}},[e("v-btn",{staticClass:"info",attrs:{block:""},on:{click:function(n){t.saveSnapshot()}}},[t._v("Submit")])],1)],1)],1)},i=[],o={render:a,staticRenderFns:i};n.a=o},69:function(t,n){},77:function(t,n){},79:function(t,n){},84:function(t,n){},87:function(t,n){},90:function(t,n){},98:function(t,n){}},[32]);
//# sourceMappingURL=app.8374c5e961c446018ee6.js.map