(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{286:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=286},613:function(e,t,a){e.exports=a(914)},617:function(e,t,a){},708:function(e,t){},710:function(e,t){},711:function(e,t){},712:function(e,t){},713:function(e,t){},742:function(e,t){},744:function(e,t){},782:function(e,t){},783:function(e,t){},914:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(29),o=a.n(r),i=(a(617),a(63)),c=a(64),s=a(66),u=a(65),d=a(153),m=a(152),p=a(77),h=a(933),b=a(468),g=a(126),f=a(401),y=a(582),E=a.n(y),v=a(586),C=a.n(v),w=a(102),k=a(470),j=a(303),D=a(949),O=a(917),T=a(918),x=a(934),S=a(469),_=a(584),P=a.n(_),A=a(585),L=a.n(A),I=a(576),N=a.n(I),B=a(935),M=a(577),R=a.n(M),V=a(578),z=a.n(V),F=a(580),W=a.n(F),U=a(581),J=a.n(U),H=a(579),Y=a.n(H),q=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={auth:!1,open:!1,drawerItems:[{title:"Home",path:"/",icon:l.a.createElement(N.a,null)},{title:"Users",path:"/users",icon:l.a.createElement(R.a,null)},{title:"Jobs",path:"/jobs",icon:l.a.createElement(z.a,null)},{title:"Employees",path:"/employees",icon:l.a.createElement(Y.a,null)},{title:"Settings",path:"/settings",icon:l.a.createElement(W.a,null)},{title:"Time Sheets",path:"/timesheets",icon:l.a.createElement(J.a,null)}]},n.toggleDrawer=n.toggleDrawer.bind(Object(m.a)(n)),n}return Object(c.a)(a,[{key:"toggleDrawer",value:function(){console.log("Toggle"),this.setState((function(e,t){return{open:!e.open}}))}},{key:"render",value:function(){var e=this,t=(!0).auth;return l.a.createElement("div",null,l.a.createElement(h.a,{position:"static"},l.a.createElement(b.a,null,l.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:this.toggleDrawer},l.a.createElement(E.a,null)),l.a.createElement(w.a,{anchor:"left",open:this.state.open,onClose:console.log("close"),ModalProps:{onBackdropClick:this.toggleDrawer}},l.a.createElement("div",{role:"presentation",onClick:console.log("click"),onKeyDown:console.log("key down")},l.a.createElement(O.a,null,this.state.drawerItems.map((function(t){return l.a.createElement(T.a,{button:!0,key:t.title},l.a.createElement(x.a,null,t.icon),l.a.createElement(p.b,{onClick:e.toggleDrawer,to:t.path,style:{color:"inherit",textDecoration:"inherit",fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}},t.title))}))),l.a.createElement(B.a,null),l.a.createElement(O.a,null,["All mail","Trash","Spam"].map((function(e,t){return l.a.createElement(T.a,{button:!0,key:e},l.a.createElement(x.a,null,t%2===0?l.a.createElement(P.a,null):l.a.createElement(L.a,null)),l.a.createElement(S.a,{primary:e}))}))))),l.a.createElement(g.a,{variant:"h6"},l.a.createElement(D.a,{src:"/img/brand.ico"})),t&&l.a.createElement("div",null,l.a.createElement(f.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:console.log("handleMenu"),color:"inherit"},l.a.createElement(C.a,null)),l.a.createElement(j.a,{id:"menu-appbar",anchorEl:!1,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:this.state.open,onClose:console.log("")},l.a.createElement(k.a,{onClick:console.log("")},"Profile"),l.a.createElement(k.a,{onClick:console.log("")},"My account"))))))}}]),a}(n.Component),G=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("span",null,"Home"))}}]),a}(n.Component),K=a(414),$=a.n(K),Q=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement($.a,{style:this.props.style,title:this.props.title,columns:this.props.columns,data:this.props.data,options:{selection:!0,exportButton:!0,pageSizeOptions:[30,60,120,240,1e3],pageSize:30},components:{Toolbar:function(t){return l.a.createElement("div",null,l.a.createElement(K.MTableToolbar,t),l.a.createElement(B.a,{variant:"middle",style:{marginBottom:10}}),e.props.toolBar)}},actions:[{tooltip:"Remove All Selected Users",icon:"delete",onClick:function(e,t){return alert("You want to delete "+t.length+" rows")}},{icon:"print",tooltip:"Print Selecteds",onClick:function(e,t){return alert("You printed "+t.length)}}]}))}}]),a}(n.Component),X=a(172),Z="http://localhost/app/api/api",ee=localStorage.token;ee||(ee=localStorage.token=Math.random().toString(36).substr(-8));var te={Accept:"application/json",Authorization:ee},ae=function(e,t){return fetch("".concat(Z,"/").concat(e).concat(t?"/".concat(t):""),{headers:te}).then((function(e){return e.json()})).then((function(e){return e}))},ne=function(e,t){return fetch("".concat(Z,"/").concat(e,"/").concat(t.id),{method:"PUT",headers:Object(X.a)(Object(X.a)({},te),{},{"Content-Type":"application/json"}),body:JSON.stringify({model:t})}).then((function(e){return e.json()}))},le=a(593),re=a.n(le),oe=a(206),ie=a.n(oe),ce=a(947),se=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={columns:[{title:"#",field:"id",type:"numeric"},{title:"Code",field:"code"},{title:"Description",field:"description"},{title:"Address",field:"address"},{field:"inactive",title:"Active Job?",render:function(e){return l.a.createElement(ce.a,{checked:1!==e.inactive&&!e.inactive,onChange:function(){return n.enableDisableJob(e.id)},color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}})}},{field:"edit",title:"Edit",render:function(e){return l.a.createElement("div",null,l.a.createElement(p.b,{to:"/jobs/edit/".concat(e.id)},l.a.createElement(ie.a,null)))}},{field:"fire_register",title:"Fire Register",render:function(e){return l.a.createElement("div",null,l.a.createElement(p.b,{to:"/reports/jobs/fire/".concat(e.id)},l.a.createElement(re.a,null)))}}],jobs:[]},n}return Object(c.a)(a,[{key:"loadData",value:function(e){var t=this;ae(e).then((function(e){t.setState((function(){return{data:e,loading:!1}}))}))}},{key:"enableDisableJob",value:function(e){var t=this.state.data.map((function(t){return t.id!==e?t:Object.assign({},t,{inactive:!t.inactive})}));this.setState((function(){return{data:t}})),ne("jobs",t.filter((function(t){return t.id===e}))[0]).then((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){this.loadData("jobs")}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(Q,{style:{maxWidth:"80%",marginLeft:"10%",padding:10},columns:this.state.columns,table:"jobs",title:"Jobs",data:this.state.data,isLoading:this.state.loading}))}}]),a}(n.Component),ue=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={columns:[{title:"#",field:"id",type:"numeric"},{title:"User",field:"username"},{title:"Administrator",field:"description",render:function(e){return e.administrator?"Yes":"No"}},{title:"Date Created",field:"created_at",type:"date"},{field:"inactive",title:"Active?",render:function(e){return l.a.createElement(ce.a,{checked:!(1!==e.enabled&&!e.enabled),onChange:function(){return n.enableDisableUser(e.id)},color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}})}},{field:"edit",title:"Edit",render:function(e){return l.a.createElement("div",null,l.a.createElement(p.b,{to:"/users/edit/".concat(e.id)},l.a.createElement(ie.a,null)))}}],data:[]},n}return Object(c.a)(a,[{key:"loadData",value:function(e){var t=this;ae(e).then((function(e){t.setState((function(){return{data:e,loading:!1}}))}))}},{key:"componentDidMount",value:function(){this.loadData("users")}},{key:"updateUser",value:function(e){console.log(e),ne("users",e).then(this.loadData("users"))}},{key:"enableDisableUser",value:function(e){var t=this.state.data.map((function(t){return t.id!==e?t:Object.assign({},t,{enabled:!t.enabled})}));this.setState((function(){return{data:t}})),ne("users",t.filter((function(t){return t.id===e}))[0]).then((function(e){console.log(e)}))}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(Q,{style:{maxWidth:"80%",marginLeft:"10%",padding:10},columns:this.state.columns,table:"users",title:"Users",data:this.state.data,isLoading:this.state.loading}))}}]),a}(n.Component),de=a(503),me=a(402),pe=a(412),he=a(403),be=a(936),ge=a(938),fe=a(937),ye=a(945),Ee=a(946),ve=a(404),Ce=a(944);var we=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={showInactive:!1,selectedCompany:"A",openDialogDisable:!1,columns:[{title:"#",field:"id",width:5},{title:"Name",field:"name",render:function(e){return l.a.createElement("span",null,e.name.toLowerCase().replace(/\b\w/g,(function(e){return e.toUpperCase()})))}},{title:"D.O.B",field:"dob",type:"date"},{title:"Phone",field:"phone"},{title:"RDO",field:"rdo_bal"},{title:"PLD",field:"pld"},{title:"Annual Leave Balance",field:"anl"},{title:"Role",field:"location",render:function(e){return l.a.createElement("span",null,n.getRole(e.location))}},{title:"Apprentice Year",field:"apprentice_year"},{title:"Apprentice Rollover",field:"anniversary_dt",type:"date"},{field:"inactive",title:"Active?",export:!1,render:function(e){return l.a.createElement(ce.a,{checked:1!==e.inactive&&!e.inactive,onChange:function(){return n.enableDisableEmployee(e.id)},color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}})}},{title:"Job",field:"job_code"},{field:"edit",title:"Edit",export:!1,render:function(e){return l.a.createElement("div",null,l.a.createElement(p.b,{to:"/employees/".concat(e.id)},l.a.createElement(ie.a,null)))}}],employees:[]},n}return Object(c.a)(a,[{key:"toggleInactives",value:function(){this.setState((function(e,t){return{showInactive:!e.showInactive}})),this.loadData("employees")}},{key:"handleDialog",value:function(){}},{key:"enableDisableEmployee",value:function(e){var t=this,a=this.state.data.map((function(t){return t.id!==e?t:Object.assign({},t,{inactive:!t.inactive})}));this.setState((function(){return{data:t.filterEmployees(a)}})),ne("employees",a.filter((function(t){return t.id===e}))[0]).then((function(e){console.log(e)}))}},{key:"getRole",value:function(e){switch(e){case"P":return"Plumber";case"O":return"Office";case"A":return"Apprentice";case"L":return"Labourer";default:return"-"}}},{key:"loadData",value:function(e){var t=this;ae(e).then((function(e){t.setState((function(){return{data:t.filterEmployees(e),loading:!1}}))}))}},{key:"filterCompany",value:function(e){var t=this;return console.log("Filter company",this.state.selectedCompany),"A"===this.state.selectedCompany?(console.log("Returned all companies"),e):(console.log("Returned Company",this.state.selectedCompany),e.filter((function(e){return e.company===t.state.selectedCompany})))}},{key:"filterInactives",value:function(e){return this.state.showInactive?e:e.filter((function(e){return!e.inactive}))}},{key:"filterEmployees",value:function(e){var t=this.filterInactives(e);return this.filterCompany(t)}},{key:"update",value:function(e){ne("employees",e).then((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){this.loadData("employees")}},{key:"changeCompany",value:function(e){this.setState((function(){return{selectedCompany:e}})),this.loadData("employees")}},{key:"render",value:function(){var e=this,t=l.a.createElement(Ce.a,{"aria-label":"outlined primary button group",style:{minWidth:"200px",marginLeft:"10px"}},l.a.createElement(ve.a,{variant:"contained",color:"primary",style:{width:"100%",padding:"10px"},component:p.b,to:"/employees/add "},"Add")),a=l.a.createElement(de.a,{value:"inactives",control:l.a.createElement(ce.a,{checked:this.state.showInactive,onChange:function(t){return e.toggleInactives(t)},color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}}),label:"Show Inactives",labelPlacement:"bottom"}),n=l.a.createElement(me.a,{style:{width:200}},l.a.createElement(he.a,{id:"demo-simple-select-label"},"Select Company"),l.a.createElement(pe.a,{labelId:"select-company-label",id:"select-company-label",onChange:function(t){return e.changeCompany(t.target.value)},value:this.state.selectedCompany},l.a.createElement(k.a,{value:"A"},"All"),l.a.createElement(k.a,{value:"C"},"Construction"),l.a.createElement(k.a,{value:"M"},"Maintenance"))),r=l.a.createElement("div",null,t,a,n),o=l.a.createElement("div",null,l.a.createElement(be.a,{open:this.state.openDialogDisable,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description"},l.a.createElement(Ee.a,{id:"scroll-dialog-title"},"Inactivate Employee"),l.a.createElement(fe.a,null,l.a.createElement(ye.a,null,"Are you sure you want to inactivate this employee?")),l.a.createElement(ge.a,null,l.a.createElement(ve.a,{onClick:function(){return e.handleDialog(!1)},color:"primary"},"Cancel"),l.a.createElement(ve.a,{onClick:function(){return e.handleDialog(!0)},color:"primary"},"Ok"))));return l.a.createElement("div",null,l.a.createElement(Q,{toolBar:r,style:{maxWidth:"90%",marginLeft:"5%"},columns:this.state.columns,table:"employees",title:"Employees",data:this.state.data,isLoading:this.state.loading}),o)}}]),a}(n.Component),ke=a(84),je=a(490),De=a(7),Oe=a(209),Te=(a(705),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={isLoading:!0,id:null,name:"",dob:"",phone:"",bonus:"",bonus_type:"",rdo_bal:"",pld:"",anl:"",anniversary_dt:"",apprentice_year:"",location:"",company:"",inactive:"0"},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e,t,a=this;this.props.employee_id?(e="employees",t=this.props.employee_id,fetch("".concat(Z,"/").concat(e,"/").concat(t),{headers:te}).then((function(e){return e.json()})).then((function(e){return e}))).then((function(e){a.setState((function(){return{id:e.id,name:e.name,dob:e.dob,phone:e.phone,bonus:e.bonus,car_allowance:e.car_allowance,bonus_type:e.bonus_type,rdo_bal:e.rdo_bal,pld:e.pld,anl:e.anl,anniversary_dt:e.anniversary_dt,apprentice_year:e.apprentice_year,location:e.location,company:e.company,inactive:e.inactive,isLoading:!1}}))})):this.setState((function(){return{isLoading:!1}}))}},{key:"handleSave",value:function(e){var t,a,n=this;(t="employees",a=e,fetch("".concat(Z,"/").concat(t).concat(a.id?"/".concat(a.id):""),{method:a.id?"PUT":"POST",headers:Object(X.a)(Object(X.a)({},te),{},{"Content-Type":"application/json"}),body:JSON.stringify(a)}).then((function(e){return e.json()}))).then((function(e){console.log(e),n.props.history.goBack()}))}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState((function(){return Object(ke.a)({},a,n)}))}},{key:"render",value:function(){var e,t,a,n,r,o=this;return l.a.createElement("div",null,l.a.createElement(g.a,{variant:"h3",component:"h2",className:this.props.classes.paper,style:{textAlign:"center"}},this.props.action),l.a.createElement(Oe.a,{elevation:3,className:this.props.classes.paper},l.a.createElement("form",{className:this.props.classes.root,noValidate:!0,autoComplete:"off"},l.a.createElement("div",null,l.a.createElement(je.a,{required:!0,label:"Name",value:this.state.name,variant:"outlined",InputLabelProps:{shrink:!0},name:"name",onChange:function(e){return o.handleChange(e)}}),l.a.createElement(je.a,{id:"dob",label:"D.O.B",type:"date",variant:"outlined",value:this.state.dob,InputLabelProps:{shrink:!0},name:"dob",onChange:function(e){return o.handleChange(e)}}),l.a.createElement(je.a,{id:"phone",label:"Phone",variant:"outlined",value:this.state.phone?this.state.phone:"",InputLabelProps:{shrink:!0},name:"phone",onChange:function(e){return o.handleChange(e)}}),l.a.createElement(je.a,(e={id:"bonus",label:"Bonus",name:"bonus",type:"number",variant:"outlined",value:this.state.bonus?this.state.bonus:"",InputLabelProps:{shrink:!0}},Object(ke.a)(e,"name","bonus"),Object(ke.a)(e,"onChange",(function(e){return o.handleChange(e)})),e)),l.a.createElement(je.a,{id:"bonus_type",select:!0,label:"Bonus Type",value:this.state.bonus_type?this.state.bonus_type:"",variant:"outlined",name:"bonus_type",onChange:function(e){return o.handleChange(e)}},l.a.createElement("option",{key:"N",value:"N"},"None"),l.a.createElement("option",{key:"F",value:"F"},"Foremen"),l.a.createElement("option",{key:"L",value:"L"},"Leading Hand")),l.a.createElement(je.a,(t={id:"car_allowance",label:"Car Allowance",name:"car_allowance",type:"number",variant:"outlined",value:this.state.car_allowance?this.state.car_allowance:"",InputLabelProps:{shrink:!0}},Object(ke.a)(t,"name","car_allowance"),Object(ke.a)(t,"onChange",(function(e){return o.handleChange(e)})),t)),l.a.createElement(je.a,(a={id:"rdo_bal",label:"RDO Balance",name:"rdo_bal",type:"number",variant:"outlined",value:this.state.rdo_bal?this.state.rdo_bal:"",InputLabelProps:{shrink:!0}},Object(ke.a)(a,"name","rdo_bal"),Object(ke.a)(a,"onChange",(function(e){return o.handleChange(e)})),a)),l.a.createElement(je.a,(n={id:"pld_bal",label:"PLD Balance",name:"pld_bal",type:"number",variant:"outlined",value:this.state.pld?this.state.pld:"",InputLabelProps:{shrink:!0}},Object(ke.a)(n,"name","pld"),Object(ke.a)(n,"onChange",(function(e){return o.handleChange(e)})),n)),l.a.createElement(je.a,(r={id:"anl_bal",label:"Annual Leave Balance",name:"anl_bal",type:"number",variant:"outlined",value:this.state.anl?this.state.anl:"",InputLabelProps:{shrink:!0}},Object(ke.a)(r,"name","anl"),Object(ke.a)(r,"onChange",(function(e){return o.handleChange(e)})),r)),l.a.createElement(je.a,{id:"anniversary_dt",label:"Apprentice Anniversary Date",type:"date",variant:"outlined",value:null===this.state.anniversary_dt?"":this.state.anniversary_dt,InputLabelProps:{shrink:!0},name:"anniversary_dt",onChange:function(e){return o.handleChange(e)}}),l.a.createElement(je.a,{id:"apprentice_year",select:!0,label:"Apprentice Year",value:null===this.state.apprentice_year?"":this.state.apprentice_year,variant:"outlined",name:"apprentice_year",onChange:function(e){return o.handleChange(e)}},l.a.createElement("option",{key:"",value:""},"-"),l.a.createElement("option",{key:"1",value:"1"},"1st"),l.a.createElement("option",{key:"2",value:"2"},"2nd"),l.a.createElement("option",{key:"3",value:"3"},"3rd"),l.a.createElement("option",{key:"4",value:"4"},"4rd")),l.a.createElement(je.a,{id:"role",select:!0,label:"Role",value:this.state.location,variant:"outlined",name:"location",onChange:function(e){return o.handleChange(e)}},l.a.createElement("option",{key:"P",value:"P"},"Plumber"),l.a.createElement("option",{key:"A",value:"A"},"Apprentice"),l.a.createElement("option",{key:"O",value:"O"},"Office"),l.a.createElement("option",{key:"L",value:"L"},"Labourer")),l.a.createElement(je.a,{id:"company",select:!0,label:"Company",value:this.state.company,variant:"outlined",name:"company",onChange:function(e){return o.handleChange(e)}},l.a.createElement("option",{key:"C",value:"C"},"Construction"),l.a.createElement("option",{key:"M",value:"M"},"Maintenance")),l.a.createElement(je.a,{id:"inactive",select:!0,label:"Inactive?",value:this.state.inactive?"1":"0",variant:"outlined",name:"inactive",onChange:function(e){return o.handleChange(e)}},l.a.createElement("option",{key:"1",value:"1"},"Yes"),l.a.createElement("option",{key:"0",value:"0"},"No")),l.a.createElement("div",null,l.a.createElement(Ce.a,{"aria-label":"outlined primary button group",style:{width:"80%",marginLeft:"10%"}},l.a.createElement(ve.a,{variant:"contained",color:"secondary",style:{width:"50%",padding:"10px"},component:p.b,to:"/employees"},"Cancel"),l.a.createElement(ve.a,{variant:"contained",color:"primary",style:{width:"50%",padding:10},onClick:function(){return o.handleSave(o.state)}},"Save")))))))}}]),a}(n.Component)),xe=Object(d.f)(Object(De.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),display:"flex",flexWrap:"wrap"}},paper:{width:"40%",marginLeft:"30%",padding:10},button:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(2)}}}}))(Te));var Se=function(){var e=Object(d.e)().id;return l.a.createElement(xe,{action:"Edit Employee",employee_id:e})};var _e=function(){return l.a.createElement(xe,{action:"Add Employee"})},Pe=a(417),Ae=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={numPages:null,pageNumber:1},n.onDocumentLoadSuccess=n.onDocumentLoadSuccess.bind(Object(m.a)(n)),n.goToPrevPage=n.goToPrevPage.bind(Object(m.a)(n)),n.goToNextPage=n.goToNextPage.bind(Object(m.a)(n)),n}return Object(c.a)(a,[{key:"onDocumentLoadSuccess",value:function(e){var t=e.numPages;this.setState({numPages:t})}},{key:"goToPrevPage",value:function(){this.setState((function(e){return{pageNumber:e.pageNumber-1}}))}},{key:"goToNextPage",value:function(){this.setState((function(e){return{pageNumber:e.pageNumber+1}}))}},{key:"render",value:function(){var e=this.state,t=e.pageNumber,a=e.numPages;return l.a.createElement("div",null,l.a.createElement("nav",null,l.a.createElement("button",{onClick:this.goToPrevPage},"Prev"),l.a.createElement("button",{onClick:this.goToNextPage},"Next")),l.a.createElement("div",{style:{width:"100%"}},l.a.createElement(Pe.Document,{file:"/templates/TFN_declaration_form_signature.pdf",onLoadSuccess:this.onDocumentLoadSuccess},l.a.createElement(Pe.Page,{pageNumber:5,width:600}))),l.a.createElement("p",null,"Page ",t," of ",a))}}]),a}(n.Component),Le=a(25),Ie=a(33),Ne=Le.StyleSheet.create({page:{width:600,padding:"1cm"},section:{margin:10,padding:10,flexGrow:1},table:{tableView:{marginTop:"70px"},tableHead:{fontSize:5}}}),Be=[],Me=new Date,Re={name:.5,dob:.3,phone:.3,job:.3,apprentice_year:.3,anniversary_dt:.3},Ve=function(){return l.a.createElement(Le.Document,null,l.a.createElement(Le.Page,{size:"A4",style:Ne.page,debug:!1},l.a.createElement(Le.View,null,l.a.createElement(Le.Text,{style:{textAlign:"right",fontStyle:"italic",fontSize:10},fixed:!0},"Printed: ",Me.toLocaleDateString()),l.a.createElement(Le.Image,{style:{position:"absolute",right:0,top:5,width:"100px"},src:"/img/logo.jpg"}),l.a.createElement(Le.View,{style:{flex:1}},l.a.createElement(Le.Text,{style:{textAlign:"center",fontStyle:"italic",fontSize:15}},"LIST OF EMPLOYEES")),l.a.createElement(Le.View,{style:Ne.table.tableView},l.a.createElement(Ie.Table,{data:Be},l.a.createElement(Ie.TableHeader,{style:Ne.table.tableHead},l.a.createElement(Ie.TableCell,{weighting:Re.name,textAlign:"center",style:{fontSize:"10pt"}},"Name"),l.a.createElement(Ie.TableCell,{weighting:Re.dob,textAlign:"center"},"D.O.B"),l.a.createElement(Ie.TableCell,{weighting:Re.phone,textAlign:"center"},"Phone"),l.a.createElement(Ie.TableCell,{weighting:Re.role,textAlign:"center"},"Role"),l.a.createElement(Ie.TableCell,{weighting:Re.job,textAlign:"center"},"Job"),l.a.createElement(Ie.TableCell,{weighting:Re.apprentice_year,textAlign:"center"},"Apprentice Year"),l.a.createElement(Ie.TableCell,{weighting:Re.anniversary_dt,textAlign:"center"},"Apprentice Rollover")),l.a.createElement(Ie.TableBody,null,l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.name},weighting:Re.name}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.dob},weighting:Re.dob}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.phone},weighting:Re.phone}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.role},weighting:Re.role}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.job},weighting:Re.job}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.apprentice_year},weighting:Re.apprentice_year}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.anniversary_dt},weighting:Re.anniversary_dt})))))))},ze=function(){return l.a.createElement(Le.PDFViewer,{width:"100%",height:900},l.a.createElement(Ve,null))},Fe=Le.StyleSheet.create({page:{width:600,padding:"1cm"}}),We=Le.StyleSheet.create({title:{textAlign:"center",borderStyle:"solid",borderWidth:1,borderColor:"black",backgroundColor:"#ff9900",fontSize:"12pt",fontWeight:"bold",height:30,padding:"8px 0"},row:{flexDirection:"row"},rowsTitle:{textAlign:"center",borderStyle:"solid",borderWidth:1,borderColor:"black",width:100,fontSize:"12pt"},rowsDetail:{textAlign:"left",borderStyle:"solid",borderWidth:1,borderColor:"black",width:535,fontSize:"12pt",paddingLeft:5},logo:{textAlign:"left",borderStyle:"solid",borderWidth:1,borderColor:"black",width:150,paddingLeft:5,borderBottom:0,borderTop:0}}),Ue=Le.StyleSheet.create({header:{textAlign:"center",backgroundColor:"#ff9900",height:25,fontSize:"10pt"},cell:{textAlign:"center",fontSize:"10pt"},photo:{height:"47.85px"}}),Je=((new Date).toLocaleDateString(),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={project:{name:"",date:(new Date).toLocaleDateString()},penetrations:[],isLoading:!0},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;ae("fire_identification",this.props.match.params.id).then((function(t){e.setState((function(){return{penetrations:t,isLoading:!1,project:{name:t[0].description,date:(new Date).toLocaleDateString()}}}))}))}},{key:"render",value:function(){var e=this.state.project;return this.state.isLoading?l.a.createElement("h1",null,"Loading..."):l.a.createElement(Le.PDFViewer,{width:"100%",height:900},l.a.createElement(Le.Document,null,l.a.createElement(Le.Page,{size:"A4",style:Fe.page,debug:!1,orientation:"landscape"},l.a.createElement(Le.View,{fixed:!0},l.a.createElement(Le.View,{debug:!1},l.a.createElement(Le.Text,{style:We.title},"PENETRATION INSPECTION")),l.a.createElement(Le.View,{debug:!1,style:We.row},l.a.createElement(Le.Text,{style:We.rowsTitle},"Project Name:"),l.a.createElement(Le.Text,{style:We.rowsDetail},e.name),l.a.createElement(Le.Text,{style:We.logo})),l.a.createElement(Le.View,{debug:!1,style:We.row},l.a.createElement(Le.Text,{style:We.rowsTitle},"Contact:"),l.a.createElement(Le.Text,{style:We.rowsDetail},"Smart Plumbing Solutions"),l.a.createElement(Le.Text,{style:We.logo})),l.a.createElement(Le.View,{debug:!1,style:We.row},l.a.createElement(Le.Text,{style:We.rowsTitle},"Phone:"),l.a.createElement(Le.Text,{style:We.rowsDetail},"1300 007 6278"),l.a.createElement(Le.Text,{style:We.logo})),l.a.createElement(Le.View,{debug:!1,style:We.row},l.a.createElement(Le.Text,{style:We.rowsTitle},"Address:"),l.a.createElement(Le.Text,{style:We.rowsDetail},"1/17 Chester Street, Annandale NSW 2038"),l.a.createElement(Le.Text,{style:We.logo})),l.a.createElement(Le.View,{debug:!1,style:We.row},l.a.createElement(Le.Text,{style:We.rowsTitle},"Date:"),l.a.createElement(Le.Text,{style:We.rowsDetail},e.date),l.a.createElement(Le.Text,{style:[We.logo,{borderBottom:1}]}),l.a.createElement(Le.Image,{style:{position:"absolute",right:20,top:-55,width:"100px"},src:"/img/logo.jpg"})),l.a.createElement(Le.View,{style:{marginTop:15}},l.a.createElement(Ie.TableHeader,null,l.a.createElement(Ie.TableCell,{style:Ue.header,weighting:.7},"Reference"),l.a.createElement(Ie.TableCell,{style:Ue.header},"Drawing"),l.a.createElement(Ie.TableCell,{style:Ue.header},"Photo"),l.a.createElement(Ie.TableCell,{style:Ue.header},"FRL"),l.a.createElement(Ie.TableCell,{style:Ue.header},"Installed By"),l.a.createElement(Ie.TableCell,{style:Ue.header},"Installation Date"),l.a.createElement(Ie.TableCell,{style:Ue.header},"Manufacturer")))),l.a.createElement(Le.View,null,l.a.createElement(Ie.Table,{data:this.state.penetrations},l.a.createElement(Ie.TableBody,null,l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.fire_number},style:Ue.cell,weighting:.7}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.drawing},style:Ue.cell}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return l.a.createElement(Le.Image,{style:Ue.photo,src:e.fire_photo})}}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.fire_resist_level},style:Ue.cell}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.install_by},style:Ue.cell}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.formated_date},style:Ue.cell}),l.a.createElement(Ie.DataTableCell,{getContent:function(e){return e.manufacturer},style:Ue.cell})))))))}}]),a}(n.Component)),He=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement(q,null),l.a.createElement(d.a,{exact:!0,path:"/",component:G}),l.a.createElement(d.a,{exact:!0,path:"/jobs",component:se}),l.a.createElement(d.a,{exact:!0,path:"/users",component:ue}),l.a.createElement(d.a,{exact:!0,path:"/employees",component:we}),l.a.createElement(d.a,{exact:!0,path:"/employees/add",component:_e}),l.a.createElement(d.a,{exact:!0,path:"/employees/:id",component:Se}),l.a.createElement(d.a,{exact:!0,path:"/reports/employees",component:ze}),l.a.createElement(d.a,{exact:!0,path:"/reports/jobs/fire/:id",component:Je}),l.a.createElement(d.a,{exact:!0,path:"/pdf",component:Ae}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(p.a,null,l.a.createElement(He,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[613,1,2]]]);
//# sourceMappingURL=main.77a08ee5.chunk.js.map