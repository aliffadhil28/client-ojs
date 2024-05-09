import{r as L,j as e,T as t,a as C,b as u,N as m,B as N,S as d,A as x,c as w,R as I}from"./Toast-v6hpJLx4.js";import"./iconBase-Qe4RONN1.js";import{L as i,c as A,R,P as T}from"./Problems-UIOMLpqA.js";import{C as F}from"./Code-_ixvqLup.js";import{h as k}from"./moment-WSJ9un1t.js";import{l as Y}from"./helper-7EjJiDbg.js";import{u as H,a as S,b as B,O as f}from"./index-owATBqM6.js";import{L as M}from"./Login-uMqI5WKd.js";import{P as E}from"./ProblemDetails-N9g2-9rc.js";import{A as O}from"./AddProblem-2qZlQIVg.js";import{a as P}from"./axios-L6U4YIEh.js";import{A as D,a as j}from"./AuthContext-nGIo6CXm.js";import{F as U,a as z,b as G,c as J,d as _,e as W}from"./index-fcdK9NxH.js";import{P as $}from"./Profile-x01WkxpT.js";import{U as q}from"./Users-5UR19qQu.js";import"./buttonThemes-SzMD2y27.js";var p={},v=L;p.createRoot=v.createRoot,p.hydrateRoot=v.hydrateRoot;const K={root:{base:"bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 sticky z-50 top-0",rounded:{on:"rounded",off:""},bordered:{on:"border",off:""},inner:{base:"mx-auto flex flex-wrap items-center justify-between",fluid:{on:"",off:"container"}}},brand:{base:"flex items-center"},collapse:{base:"w-full md:block md:w-auto",list:"mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",hidden:{on:"hidden",off:""}},link:{base:"flex py-2 pr-4 pl-3 md:p-2",active:{on:"rounded hover:text-white bg-[#6251DD] text-white *:mx-auto md:*:m-2",off:"bg-gray-100 rounded text-center text-black hover:text-white hover:bg-[#6251DD] *:mx-auto md:*:m-2"},disabled:{on:"text-gray-400 hover:cursor-not-allowed dark:text-gray-600",off:""}},toggle:{base:"inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",icon:"h-6 w-6 shrink-0"}},Q=()=>{document.title="Home";const a=H().data;return e.jsx("div",{className:"overflow-x-auto",children:e.jsxs(t,{hoverable:!0,children:[e.jsxs(t.Head,{children:[e.jsx(t.HeadCell,{children:"Code"}),e.jsx(t.HeadCell,{children:"Title"}),e.jsx(t.HeadCell,{children:"Due Date"}),e.jsx(t.HeadCell,{children:"Level"}),e.jsx(t.HeadCell,{children:"Actions"})]}),e.jsx(t.Body,{className:"divide-y",children:a.map((s,n)=>{const l=new DOMParser().parseFromString(Y(s.level),"text/html");return e.jsxs(t.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800",children:[e.jsx(t.Cell,{className:"whitespace-nowrap font-medium text-gray-900 dark:text-white",children:s.code}),e.jsx(t.Cell,{children:s.title}),e.jsxs(t.Cell,{children:[k(s.startDate).format("HH:mm DD-MM-YYYY")," -"," ",k(s.endDate).format("HH:mm DD-MM-YYYY")]}),e.jsx(t.Cell,{children:e.jsx("div",{dangerouslySetInnerHTML:{__html:l.body.innerHTML}})}),e.jsx(t.Cell,{children:e.jsx("a",{href:`/solve/${s.id}`,className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500",children:"Solve"})})]},n)})})]})})},V=()=>e.jsx("div",{children:"Register"}),b=async r=>{try{return(await P.get(r,{withCredentials:!0})).data}catch(a){if(a.response.status==401)return C("/login")}},h=async(r,a)=>{try{return(await P.get(r+"/"+a,{withCredentials:!0})).data}catch(s){if(console.log(s),s.response.status===401)return C("/login")}},X=({children:r})=>{const{user:a}=u.useContext(D);S().pathname;function n(){localStorage.removeItem("userProfile")}return e.jsxs("div",{children:[e.jsxs(m,{base:!0,rounded:!0,theme:K,children:[e.jsx(m.Brand,{href:"#",children:e.jsx("span",{className:"self-center whitespace-nowrap text-xl font-semibold dark:text-white",children:e.jsx(i,{to:"/",children:"Cakra Online Judge"})})}),e.jsx(m.Toggle,{}),e.jsx(m.Collapse,{children:a&&e.jsxs("div",{className:"link ms-auto flex flex-col w-full justify-center gap-2 md:flex-row",children:[e.jsx(m.Link,{children:e.jsx(i,{to:"/profile",children:a==null?void 0:a.username})}),a.role==="admin"&&e.jsx(m.Link,{children:e.jsx(i,{to:"/dashboard/problems",children:"Dashboard"})}),e.jsx(N,{size:"xs",onClick:n,color:"dark",children:e.jsx(i,{to:"/login",children:"Logout"})})]})})]}),e.jsx("div",{className:"my-5",children:r})]})},Z={root:{base:"h-full",collapsed:{on:"w-16",off:"w-64"},inner:"h-full overflow-y-auto overflow-x-hidden rounded-lg bg-gray-50 py-4 px-3 dark:bg-gray-800"},collapse:{button:"group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",icon:{base:"h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",open:{off:"",on:"text-gray-900"}},label:{base:"ml-3 flex-1 whitespace-nowrap text-left",icon:{base:"h-6 w-6 transition ease-in-out delay-0",open:{on:"rotate-180",off:""}}},list:"space-y-2 py-2"},cta:{base:"mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",color:{blue:"bg-cyan-50 dark:bg-cyan-900",dark:"bg-dark-50 dark:bg-dark-900",failure:"bg-red-50 dark:bg-red-900",gray:"bg-alternative-50 dark:bg-alternative-900",green:"bg-green-50 dark:bg-green-900",light:"bg-light-50 dark:bg-light-900",red:"bg-red-50 dark:bg-red-900",purple:"bg-purple-50 dark:bg-purple-900",success:"bg-green-50 dark:bg-green-900",yellow:"bg-yellow-50 dark:bg-yellow-900",warning:"bg-yellow-50 dark:bg-yellow-900"}},item:{base:"flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",active:"bg-gray-100 dark:bg-gray-700",collapsed:{insideCollapse:"group w-full pl-8 transition duration-75",noIcon:"font-bold"},content:{base:"px-3 flex-1 whitespace-nowrap"},icon:{base:"h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",active:"text-gray-700 dark:text-gray-100"},label:"",listItem:""},items:{base:""},itemGroup:{base:"mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"},logo:{base:"mb-5 flex items-center pl-2.5",collapsed:{on:"hidden",off:"self-center whitespace-nowrap text-xl font-semibold dark:text-white"},img:"mr-3 h-6 sm:h-7"}},ee=({status:r,count:a})=>{const[s,n]=u.useState(a);let o;switch(r){case 401:o="Access Unauthorized";break;case 404:o="Page Not Found";break;default:o="Unknown error";break}return u.useEffect(()=>{const l=setInterval(()=>{n(c=>c-1)},1e3);return()=>clearInterval(l)},[]),e.jsx("div",{children:e.jsx("section",{className:"bg-white dark:bg-gray-900 ",children:e.jsx("div",{className:"container flex items-center min-h-screen px-6 py-12 mx-auto",children:e.jsxs("div",{className:"flex flex-col items-center max-w-sm mx-auto text-center",children:[e.jsx("p",{className:"p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800",children:e.jsx(U,{})}),e.jsxs("h1",{className:"mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl",children:[r," | ",o]}),e.jsxs("p",{className:"mt-4 text-gray-500 dark:text-gray-400",children:["You'll be redirect back to home in ",e.jsx("strong",{children:s})," seconds"]}),e.jsxs("div",{className:"flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto",children:[e.jsxs("button",{className:"flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700",children:[e.jsx(z,{}),e.jsx("span",{children:"Go back"})]}),e.jsx("button",{className:"w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600",children:"Take me home"})]})]})})})})},re=({children:r})=>{const{user:a}=u.useContext(D),s=B(),o=S().pathname,l=5;a.role!="admin"&&setInterval(()=>{s("/")},l*1e3);function c(){localStorage.removeItem("userProfile")}return e.jsx("div",{children:a.role!=="admin"?e.jsx(ee,{status:401,count:l}):e.jsxs("div",{className:"h-screen p-4 grid grid-cols-5",children:[e.jsx(d,{theme:Z,"aria-label":"Sidebar with content separator example",children:e.jsx(d.Items,{children:e.jsxs(d.ItemGroup,{children:[e.jsx(d.Item,{icon:G,children:e.jsx(i,{to:"/",children:"Home"})}),e.jsx(d.Item,{...o==="/dashboard/problems"?{active:!0}:{},icon:J,children:e.jsx(i,{to:"/dashboard/problems",children:"Problem"})}),e.jsx(d.Item,{...o==="/dashboard/users"?{active:!0}:{},icon:_,children:e.jsx(i,{to:"/dashboard/users",children:"User"})}),e.jsx(d.Item,{href:"#",icon:W,children:e.jsx(N,{size:"xs",className:"bg-gray-5 w-full justify-start ms-0 hover:bg-gray-50",onClick:c,color:"white",children:e.jsx(i,{to:"/login",children:"Logout"})})})]})})}),e.jsx("div",{className:"ms-4 col-span-4",children:r})]})})},te=()=>{document.title="Submissions";const a=H().data;return e.jsxs("div",{className:"flex flex-col prose lg:prose-xl",children:[e.jsx("div",{className:"flex justify-between",children:e.jsx("h1",{className:"my-3 font-bold",children:"Submitions"})}),e.jsx(x,{collapseAll:!0,children:a.map((s,n)=>{const o=s.submitions;return e.jsxs(x.Panel,{children:[e.jsxs(x.Title,{children:[e.jsx("b",{children:s.username})," (",s.noInduk,")"]}),e.jsx(x.Content,{children:e.jsxs(t,{children:[e.jsxs(t.Head,{children:[e.jsx(t.HeadCell,{children:"No"}),e.jsx(t.HeadCell,{children:"Test Pass"}),e.jsx(t.HeadCell,{children:"Working Time"}),e.jsx(t.HeadCell,{children:"Success"})]}),e.jsx(t.Body,{children:o.map((l,c)=>{const g=l.workTime;return e.jsxs(t.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800",children:[e.jsx(t.Cell,{children:c+1}),e.jsx(t.Cell,{children:l.testPass}),e.jsx(t.Cell,{children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"hour",children:String(g.hours).padStart(2,"0")}),":",e.jsx("div",{className:"minutes",children:String(g.minutes).padStart(2,"0")}),":",e.jsx("div",{className:"seconds",children:String(g.seconds).padStart(2,"0")})]})}),e.jsx(t.Cell,{children:l.success?e.jsx(w,{className:"flex justify-center",color:"success",children:"Success"}):e.jsx(w,{className:"flex justify-center",color:"failure",children:"Failure"})})]},c)})})]})})]},n)})})]})},y=({children:r})=>e.jsx(e.Fragment,{children:r});function ae(){return e.jsx(y,{children:e.jsx(j,{children:e.jsx(f,{})})})}function se(){return e.jsx(y,{children:e.jsx(j,{children:e.jsx(X,{children:e.jsx(f,{})})})})}function oe(){return e.jsx(y,{children:e.jsx(j,{children:e.jsx(re,{children:e.jsx(f,{})})})})}const le=A([{element:e.jsx(se,{}),children:[{path:"/",element:e.jsx(Q,{}),loader:async()=>{const r=await b("http://localhost:8001/problems");return r==null&&(window.location.href="/login"),r}},{path:"/solve/:id",element:e.jsx(F,{}),loader:async({params:r})=>await h("http://localhost:8001/problems",r.id)},{path:"/profile",element:e.jsx($,{}),loader:async()=>{const a=JSON.parse(localStorage.getItem("userProfile")).id;return await h("http://localhost:8001/submition/user",a)}}]},{element:e.jsx(oe,{}),children:[{path:"/dashboard/problems",element:e.jsx(T,{}),loader:async()=>await b("http://localhost:8001/problems")},{path:"/dashboard/problems/:id",element:e.jsx(E,{}),loader:async({params:r})=>await h("http://localhost:8001/problems",r.id)},{path:"/dashboard/problems/add",element:e.jsx(O,{})},{path:"/dashboard/solutions/:id",element:e.jsx(te,{}),loader:async({params:r})=>await h("http://localhost:8001/submition/solutions",r.id)},{path:"/dashboard/users",element:e.jsx(q,{}),loader:async()=>await b("http://localhost:8001/users")}]},{element:e.jsx(ae,{}),children:[{path:"/login",element:e.jsx(M,{})},{path:"/register",element:e.jsx(V,{})}]}]);p.createRoot(document.getElementById("root")).render(e.jsx(I.StrictMode,{children:e.jsx(R,{router:le})}));
