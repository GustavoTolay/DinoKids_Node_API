import{r as b,R,a as t,j as h,F as v,C as q}from"./index-ab2bd05b.js";import{N as B,C as F}from"./navbar-5739d693.js";import{F as K}from"./floatingButton-5b89e9fb.js";import{u as G}from"./index.esm-a3ad1bb3.js";var E={};Object.defineProperty(E,"__esModule",{value:!0});var $=E.loadMercadoPago=void 0;const I="https://sdk.mercadopago.com/js/v2",J=/^https:\/\/sdk\.mercadopago\.com\/js\/v2\/?(\?.*)?$/,z="MercadoPago has already been initialized in your window, please remove the duplicate import",U="MercadoPago.js not available",W="Failed to load MercadoPago.js",X=()=>{for(var c=document.querySelectorAll(`script[src^="${I}"`),l=0;l<c.length;l++){var a=c[l];if(J.test(a.src))return a}return null},Z=()=>{const c=document.createElement("script");c.src=I;const l=document.head||document.body;if(!l)throw new Error("Expected document.body or document.head not to be null. MercadoPago requires a <body> or a <head> element, please add on your project.");return l.appendChild(c),c};let S=null;const V=()=>(S!==null||(S=new Promise((c,l)=>{if(typeof window>"u"){c(null);return}if(window.MercadoPago){console.warn(z),c(window.MercadoPago);return}try{let a=X();a?console.warn(z):a||(a=Z()),a.addEventListener("load",()=>{window.MercadoPago?c(window.MercadoPago):l(new Error(U))}),a.addEventListener("error",()=>{l(new Error(W))})}catch(a){l(a);return}})),S);$=E.loadMercadoPago=V;var Y=globalThis&&globalThis.__awaiter||function(c,l,a,i){function s(o){return o instanceof a?o:new a(function(e){e(o)})}return new(a||(a=Promise))(function(o,e){function m(n){try{r(i.next(n))}catch(d){e(d)}}function u(n){try{r(i.throw(n))}catch(d){e(d)}}function r(n){n.done?o(n.value):s(n.value).then(m,u)}r((i=i.apply(c,l||[])).next())})};class p{static getInstance(){return Y(this,void 0,void 0,function*(){if(this.publicKey)return this.loadedInstanceMercadoPago||(yield $(),this.loadedInstanceMercadoPago=!0),this.instanceMercadoPago=new window.MercadoPago(this.publicKey,this.options),this.instanceMercadoPago;console.error("Expected the PUBLIC_KEY to render the MercadoPago SDK React")})}}p.publicKey=null;p.options={};p.instanceMercadoPago=void 0;p.loadedInstanceMercadoPago=!1;function H(c,l){return Object.keys(c).length===Object.keys(l).length&&Object.keys(c).every(i=>Object.prototype.hasOwnProperty.call(l,i)&&c[i]===l[i])}const Q=(c,l)=>{const a=Object.assign(Object.assign({},l),{frontEndStack:"react"});p.publicKey=c!==p.publicKey?c:p.publicKey,p.options=H(p.options,a)?p.options:a},ee=200;var te=globalThis&&globalThis.__awaiter||function(c,l,a,i){function s(o){return o instanceof a?o:new a(function(e){e(o)})}return new(a||(a=Promise))(function(o,e){function m(n){try{r(i.next(n))}catch(d){e(d)}}function u(n){try{r(i.throw(n))}catch(d){e(d)}}function r(n){n.done?o(n.value):s(n.value).then(m,u)}r((i=i.apply(c,l||[])).next())})};const ne=()=>te(void 0,void 0,void 0,function*(){}),ae=()=>{},oe=c=>{console.error(c)};var ie=globalThis&&globalThis.__awaiter||function(c,l,a,i){function s(o){return o instanceof a?o:new a(function(e){e(o)})}return new(a||(a=Promise))(function(o,e){function m(n){try{r(i.next(n))}catch(d){e(d)}}function u(n){try{r(i.throw(n))}catch(d){e(d)}}function r(n){n.done?o(n.value):s(n.value).then(m,u)}r((i=i.apply(c,l||[])).next())})};const ce=({settings:c,name:l,divId:a,controller:i})=>ie(void 0,void 0,void 0,function*(){const s=yield p.getInstance(),o=s==null?void 0:s.bricks();window[i]=yield o==null?void 0:o.create(l,a,c)}),le=({onReady:c=ae,onError:l=oe,onSubmit:a=ne,customization:i,initialization:s,locale:o})=>(b.useEffect(()=>{let e;const m={settings:{initialization:s,customization:i,locale:o,callbacks:{onReady:c,onSubmit:a,onError:l}},name:"wallet",divId:"walletBrick_container",controller:"walletBrickController"};return e=setTimeout(()=>{ce(m)},ee),()=>{var u;clearTimeout(e),(u=window.walletBrickController)===null||u===void 0||u.unmount()}},[i,s,c,l,a]),R.createElement("div",{id:"walletBrick_container"}));globalThis&&globalThis.__awaiter;globalThis&&globalThis.__awaiter;globalThis&&globalThis.__awaiter;globalThis&&globalThis.__awaiter;globalThis&&globalThis.__awaiter;globalThis&&globalThis.__awaiter;globalThis&&globalThis.__awaiter;const j={"San Salvador de Jujuy":"zone1","Buenos Aires":"zone4",Catamarca:"zone2",Chaco:"zone3",Chubut:"zone4",Córdoba:"zone3",Corrientes:"zone3","Entre Ríos":"zone3",Formosa:"zone3",Jujuy:"zone2","La Pampa":"zone4","La Rioja":"zone3",Mendoza:"zone4",Misiones:"zone3",Neuquén:"zone4","Río Negro":"zone4",Salta:"zone2","San Juan":"zone4","San Luis":"zone4","Santa Cruz":"zone4","Santa Fe":"zone3","Santiago del Estero":"zone2","Tierra del Fuego":"zone4",Tucumán:"zone2"},re=Object.keys(j),se={zone1:{shipping:{"0.5":1071,1:1154,2:1267,3:1274,5:1288}},zone2:{shipping:{"0.5":1186,1:1384,2:1425,3:1505,5:1784}},zone3:{shipping:{"0.5":1290,1:1508,2:1557,3:1697,5:1999}},zone4:{shipping:{"0.5":1296,1:1519,2:1646,3:1811,5:2206}}},de=c=>{const l=[5,3,2,1,.5];let a=.5;return l.forEach(i=>{i>=c&&(a=i)}),a},ue=(c,l,a)=>{const s=de(c);return a=="withdraw"?0:(console.log({weight:c,state:l,type:a}),l&&c&&a&&l!="default"?Math.round(se[j[l]][a][s]*.9):0)},me={publicKey:"TEST-bcc2fda6-e58f-427b-a9d2-845b300cd98f"};function he({hidden:c,methods:l,onSubmit:a,disabled:i}){const{register:s,handleSubmit:o,formState:{errors:e},watch:m}=l,u=m("ship_mode");return t("form",{onSubmit:o(a),className:"mt-3 text-start",hidden:c,children:h("fieldset",{disabled:i,children:[t("h5",{className:"fw-semibold",children:"Seleccione su método de envío:"}),h("div",{className:"form-check form-check-inline mb-2",children:[t("input",{...s("ship_mode",{required:!0}),type:"radio",value:"withdraw",className:"form-check-input border-dark-subtle"}),t("label",{className:"form-check-label",children:"Retiro en Sucursal"})]}),h("div",{className:"form-check form-check-inline mb-2",children:[t("input",{...s("ship_mode",{required:!0}),type:"radio",value:"shipping",className:"form-check-input border-dark-subtle"}),t("label",{className:"form-check-label",children:"Envío a Domicilio"})]}),t("hr",{className:"mt-1 mb-2"}),u=="withdraw"?t("div",{className:"card p-0 mb-0",children:h("div",{className:"card-body",children:[t("h5",{className:"card-title fw-semibold text-primary",children:"Nuestra sucursal"}),t("hr",{className:"m-0"}),t("p",{className:"card-text mt-2 mb-1",children:"S. S. de Jujuy, Necochea 43, Local 2."}),t("p",{className:"card-text mb-1",children:"Lunes a Viernes de 10:00 a 14:00 y de 18:00 a 22:00."}),t("p",{className:"card-text",children:"Sábados de 10:00 a 14:00."})]})}):t(v,{}),t("label",{className:"form-label mb-0 mt-2",children:"Nombre"}),t("input",{...s("fullname",{required:!0,pattern:/^(?![\s.]+$)[a-zA-Z\s.]*$/}),className:`form-control border-dark-subtle ${e.fullname&&"is-invalid"}`}),e.fullname&&t("div",{className:"invalid-feedback m-0",children:e.fullname.type=="pattern"?"Sólo letras y espacios":"Nombre requerido"}),u=="shipping"?h(v,{children:[t("label",{className:"form-label mb-0 mt-2",children:"Provincia"}),h("select",{...s("state",{required:!0,pattern:/^(?!default$)/}),className:`form-select border-dark-subtle ${e.state&&"is-invalid"}`,children:[t("option",{value:"default",children:"Seleccione su Provincia"}),re.map((r,n)=>t("option",{value:r,children:r},n))]}),e.state&&t("div",{className:"invalid-feedback m-0",children:e.state.type=="pattern"?"Seleccione una opción":"Seleccione una provincia"}),t("label",{className:"form-label mb-0 mt-2",children:"Localidad"}),t("input",{...s("locality",{required:!0,pattern:/^[\w\s.]*$/}),className:`form-control border-dark-subtle ${e.locality&&"is-invalid"}`}),e.locality&&t("div",{className:"invalid-feedback m-0",children:e.locality.type=="pattern"?"Sin caracteres especiales":"Localidad requerida"}),t("label",{className:"form-label mb-0 mt-2",children:"Calle"}),t("input",{...s("street",{required:!0,pattern:/^[\w\s.]*$/}),className:`form-control border-dark-subtle ${e.street&&"is-invalid"}`}),e.street&&t("div",{className:"invalid-feedback m-0",children:e.street.type=="pattern"?"Sin caracteres especiales":"Calle requerida"}),t("label",{className:"form-label mb-0 mt-2",children:"Número"}),t("input",{...s("number",{required:!0,pattern:/^[0-9]*$/}),className:`form-control border-dark-subtle ${e.number&&"is-invalid"}`}),e.number&&t("div",{className:"invalid-feedback m-0",children:e.number.type=="pattern"?"Sólo números":"Número requerido"}),t("label",{className:"form-label mb-0 mt-2",children:"Departamento (opcional)"}),t("input",{...s("apartment",{pattern:/^[\w\s.]*$/}),className:`form-control border-dark-subtle ${e.apartment&&"is-invalid"}`}),e.apartment&&t("div",{className:"invalid-feedback m-0",children:e.apartment.type=="pattern"&&"Sin caracteres especiales"}),t("label",{className:"form-label mb-0 mt-2",children:"Piso (opcional)"}),t("input",{...s("floor",{pattern:/^[0-9]*$/}),className:`form-control border-dark-subtle ${e.floor&&"is-invalid"}`}),e.floor&&t("div",{className:"invalid-feedback m-0",children:e.floor.type=="pattern"&&"Sin caracteres especiales"}),t("label",{className:"form-label mb-0 mt-2",children:"Código Postal"}),t("input",{...s("postal_code",{required:!0,pattern:/^[0-9]*$/}),className:`form-control border-dark-subtle ${e.postal_code&&"is-invalid"}`}),e.postal_code&&t("div",{className:"invalid-feedback m-0",children:e.postal_code.type=="pattern"?"Sólo números":"Código postal requerido"})]}):t(v,{}),t("label",{className:"form-label mb-0 mt-2",children:"Teléfono (opcional)"}),t("input",{...s("phone",{pattern:/^[0-9]*$/}),className:`form-control border-dark-subtle ${e.phone&&"is-invalid"}`}),e.phone&&t("div",{className:"invalid-feedback m-0",children:e.phone.type=="pattern"&&"Solo números"}),t("label",{className:"form-label mb-0 mt-2",children:"Email (opcional)"}),t("input",{...s("email",{pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}),className:`form-control border-dark-subtle ${e.email&&"is-invalid"}`}),e.email&&t("div",{className:"invalid-feedback m-0",children:e.email.type=="pattern"&&"Email inválido"}),t("label",{className:"form-label mb-0 mt-2",children:"Observaciones (opcional)"}),t("textarea",{...s("observations",{pattern:/^[\w\s.]*$/}),className:`form-control border-dark-subtle ${e.observations&&"is-invalid"}`}),e.observations&&t("div",{className:"invalid-feedback m-0",children:e.observations.type=="pattern"&&"Sin caracteres especiales"}),t("div",{className:"text-center mt-2",hidden:i,children:t("input",{type:"submit",value:"Aceptar",className:"btn btn-primary"})})]})})}Q(me.publicKey);function Ne(){const{cartList:c,cartPrice:l}=b.useContext(q),a=c.map(f=>({id:f.size_id,quantity:f.quantity,unit_price:f.price})),[i,s]=b.useState(),[o,e]=b.useState(!0),[m,u]=b.useState(!1),r=G({defaultValues:{ship_mode:"withdraw"}}),n=r.watch("state"),d=r.watch("ship_mode");console.log({state:n,shipMode:d});const x=ue(.5,n,d),C={items:a,shipments:{cost:x,mode:"not_specified"}},L=()=>{console.log(C),fetch("https://dinokids.site/payment/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(C)}).then(f=>f.json()).then(f=>{console.log(f),console.log(f.id),s(f.id),e(!1)}).catch(f=>{console.error(f.json())})},P=()=>o&&m?h(v,{children:[t("br",{}),t("div",{className:"spinner-border text-primary mt-3",role:"status",children:t("span",{className:"visually-hidden",children:"Loading..."})})]}):o||!m?t(v,{}):t(le,{initialization:{preferenceId:i},customization:{texts:{action:"pay",valueProp:"security_safety"}}}),[N,w]=b.useState("detalle"),O=()=>h(v,{children:[t("li",{className:"nav-item",value:"detalle",onClick:()=>{k||w("detalle")},children:t("a",{className:`nav-link ${N=="detalle"&&"active"} ${k&&"disabled"}`,href:"#",children:"Detalle"})}),t("li",{className:"nav-item",value:"envio",onClick:()=>{k||w("envio")},children:t("a",{className:`nav-link ${N=="envio"&&"active"} ${k&&"disabled"}`,href:"#",children:"Info. de Envío"})}),t("li",{className:"nav-item",value:"pago",onClick:()=>{y&&(w("pago"),_(!0))},children:t("a",{className:`nav-link ${N=="pago"&&"active"} ${(!y||k)&&"disabled"}`,href:"#",children:"Pago"})})]}),A=l+x,[y,T]=b.useState(!1),D=f=>{w("pago"),console.log(f),T(!0),_(!0)},[g,_]=b.useState(!1),[k,M]=b.useState(!1);return h("div",{className:"App container-fluid p-0 m-0 min-vh-100 d-flex flex-column",children:[t(B,{categories:null,hideCart:!0}),t("div",{className:"row m-0 flex-grow-1",children:h("div",{className:"row m-0 mb-5 checkout_main mt-3",children:[t("ul",{className:"nav nav-tabs justify-content-center",children:O()}),h("div",{className:"col-sm-6 col-lg-6 col-xl-4 col-12 px-lg-5 h-100 mx-auto",children:[N=="detalle"&&h(v,{children:[t("h5",{className:"text-start fw-semibold mt-3",children:"Detalle:"}),t(F,{hideButtons:g}),t("hr",{className:"m-0 mt-2"}),h("div",{className:"row",children:[h("h5",{className:"text-start fw-semibold mt-3 col-7",children:["Total: $",l]}),h("div",{className:"col-5 my-auto",children:[t("button",{className:"btn btn-primary mt-auto",hidden:g,onClick:()=>{w("envio"),_(!0)},children:"Aceptar"}),t("button",{className:"btn btn-danger mt-auto",hidden:!g,onClick:()=>{_(!1)},children:"Modificar"})]})]})]}),t(he,{hidden:N!=="envio",methods:r,onSubmit:D,disabled:y}),t("div",{className:"text-center mt-2",hidden:!y||N!=="envio",children:t("button",{className:"btn btn-danger",onClick:()=>{T(!1)},children:"Modificar"})}),N=="pago"&&t(v,{children:h("div",{className:"text-start",children:[t("h5",{className:"fw-semibold mt-3",children:"Realizar pago:"}),t("div",{className:"card p-3",children:h("div",{className:"card-body",children:[t("h4",{className:"card-title m-0",children:"Resumen"}),t("h6",{className:"cart-subtitle text-primary fw-semibold mb-4",children:d=="shipping"?"Envío a Domicilio":"Retiro en Sucursal"}),h("div",{className:"card-text row",children:[t("p",{className:"col-8",children:"Carrito:"}),h("p",{className:"col-4",children:["$",l]})]}),h("div",{className:"card-text row",children:[t("p",{className:"col-8",children:"Envío:"}),h("p",{className:"col-4",children:["$",x]})]}),t("hr",{className:"m-0 mb-2"}),h("div",{className:"card-text row",children:[t("p",{className:"col-8 m-0",children:"Total:"}),h("p",{className:"col-4 m-0",children:["$",A]})]})]})}),h("div",{className:"text-center",children:[t("button",{className:"btn btn-primary mt-2",hidden:m,onClick:()=>{y&&g&&(u(!0),M(!0),e(!0),L())},children:"Aceptar"}),t("button",{className:"btn btn-danger mt-2",hidden:!m,onClick:()=>{M(!1),u(!1)},children:"Modificar"}),P()]})]})})]})]})}),t(K,{})]})}export{Ne as default};