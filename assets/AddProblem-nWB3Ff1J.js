import{b as t,j as e,w as l,B as W,a as $}from"./Toast-HXcL_fi9.js";import{S as z,p as Q,i as n,E as q,j as G,R as o,v as h}from"./index-eEqesgXg.js";import{h as y}from"./moment-WSJ9un1t.js";import"./iconBase-GgTCjT5Y.js";import{a as J}from"./axios-L6U4YIEh.js";const x=[z.define(Q)],Z=()=>{document.title="Add Problem";const[u,C]=t.useState(),[p,D]=t.useState(),[j,T]=t.useState(),[g,S]=t.useState(),[i,d]=t.useState([]),[M,k]=t.useState(),[c,E]=t.useState(0),[m,B]=t.useState(0),[v,F]=t.useState(y().format("YYYY-MM-DDTHH:mm")),[N,Y]=t.useState(y().format("YYYY-MM-DDTHH:mm")),[b,H]=t.useState(),[f,I]=t.useState(),[w,A]=t.useState();t.useEffect(()=>{d(i),k({hours:c,minutes:m})},[i,c,m]);const L=()=>{d([...i,""])},P=(s,a)=>{const r=[...i];r[s]=a,d(r)},R=async()=>{try{const s={title:u,level:j,description:g,code:p,testCases:i,workTime:M,baseFunction:f,baseMain:w,baseImport:b,startDate:v,endDate:N};await J.post("http://localhost:8001/problems",s,{withCredentials:!0}).then(a=>{console.log(a),$("/dashboard/problems")}).catch(a=>{console.log(a)})}catch(s){return s}};return e.jsxs("div",{children:[e.jsxs("div",{className:"header my-4 flex justify-between",children:[e.jsx("h1",{className:"font-semibold text-xl",children:"Add problem"}),e.jsx("div",{className:"buttons",children:e.jsx("button",{className:"bg-blue-500 text-white px-3 py-1 rounded",onClick:R,children:"Submit"})})]}),e.jsx("div",{className:"container bg-slate-100 shadow-lg rounded-lg p-3",children:e.jsxs("div",{className:"grid gap-y-6",children:[e.jsxs("div",{className:"title",children:[e.jsx("h4",{className:"font-semibold mb-3",children:"Title"}),e.jsx("input",{className:"w-full rounded-xl border-none shadow-md",type:"text",name:"title",id:"title",value:u,onChange:s=>C(s.target.value)})]}),e.jsxs("div",{className:"codeLevel grid grid-cols-2 gap-x-6",children:[e.jsxs("div",{className:"code",children:[e.jsx("h4",{className:"font-semibold mb-3",children:"Code"}),e.jsx("input",{className:"w-full rounded-xl border-none shadow-md",type:"text",name:"code",id:"code",value:p,onChange:s=>D(s.target.value)})]}),e.jsxs("div",{className:"level",children:[e.jsxs("div",{className:"flex items-center mb-3",children:[e.jsx("h4",{className:"font-semibold me-2",children:"Level"}),e.jsx(l,{content:"Define the problem difficulty 1-3",style:"light",className:"w-fit",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsx("input",{className:"w-full rounded-xl border-none shadow-md",type:"number",min:"1",max:"3",name:"level",id:"level",value:j,onChange:s=>T(s.target.value)})]})]}),e.jsxs("div",{className:"description",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h4",{className:"font-semibold my-3 me-2",children:"Description"}),e.jsx(l,{content:"Describe the problem and the expected solution, including examples, using Markdown. This will help students understand the problem and its expected output.",style:"light",className:"w-1/2",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsx("div",{className:"editor rounded-lg",children:e.jsx(q,{value:g,onChange:S,preview:"live"})})]}),e.jsxs("div",{className:"testCases",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h4",{className:"font-semibold my-3 me-2",children:"Test Cases"}),e.jsx(l,{content:`Enter at least 2 values separated by commas. The last value represents the expected result of the function, while the preceding values are the input parameters for the function.

For example, for a function add(a, b) that returns a + b  . Test cases should be defined as '1,2,3' or '2,2,4', where the last value is the expected result and the preceding values are the function parameters.`,style:"light",className:"w-1/2",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsxs(W,{size:"sm",id:"btn-addTest",className:"me-4 w-16 h-10",color:"success",onClick:L,children:[e.jsx(G,{className:"mr-2 h-3 w-3"})," Test"]})]}),e.jsx("div",{id:"testCasesContainer",className:"flex flex-wrap",children:i.map((s,a)=>e.jsx("input",{className:"w-1/6 rounded-xl border-none shadow-md me-3 mb-3",type:"text",value:s,onChange:r=>P(a,r.target.value)},a))})]}),e.jsxs("div",{className:"timeDueDate grid grid-cols-2",children:[e.jsxs("div",{className:"workTime",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("h4",{className:"font-semibold my-3 me-2",children:["Work Time"," ",e.jsx("small",{className:"text-gray-500",children:"(Hours : Minutes)"})]}),e.jsx(l,{content:"Estimated time this problem should be solved",style:"light",className:"w-fit",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{className:"rounded-xl border-none shadow-md",type:"number",min:"0",name:"hours",id:"hours",value:c,onChange:s=>E(s.target.value)}),e.jsx("div",{className:"mx-3",children:":"}),e.jsx("input",{className:"rounded-xl border-none shadow-md",type:"number",min:"0",name:"minute",id:"minute",value:m,onChange:s=>B(s.target.value)})]})]}),e.jsxs("div",{className:"dueDate",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("h4",{className:"font-semibold my-3 me-2",children:["Due Date",e.jsx("small",{className:"text-gray-500",children:"(Start Date - End Date)"})]}),e.jsx(l,{content:"Due date this problem is assign to the students",style:"light",className:"w-fit",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{className:"w-60 rounded-xl border-none shadow-md p-2",type:"datetime-local",name:"startDate",id:"startDate",value:v,onChange:s=>F(s.target.value)}),e.jsx("div",{className:"mx-3",children:"-"}),e.jsx("input",{className:"w-60 rounded-xl border-none shadow-md p-2",type:"datetime-local",name:"endDate",id:"endDate",value:N,onChange:s=>Y(s.target.value)})]})]})]}),e.jsxs("div",{className:"baseFunction",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h4",{className:"font-semibold my-3 me-2",children:"Base Function"}),e.jsx(l,{content:"Function with paramater for the solution to be write with",style:"light",className:"w-fit",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsx("div",{className:"p-2 bg-[#1e1e1e] rounded-md w-full",children:e.jsx("div",{className:"text-left items-center",height:"100vh",children:e.jsx(o,{className:"text-sm rounded",height:"15vh",value:f,theme:h,extensions:x,onChange:(s,a)=>{I(s)}})})})]}),e.jsxs("div",{className:"importMain flex",children:[e.jsxs("div",{className:"baseImport w-1/2 me-3",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h4",{className:"font-semibold my-3 me-2",children:"Base Import"}),e.jsx(l,{content:"Necessary import to run the program",style:"light",className:"w-fit",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsx("div",{className:"p-2 bg-[#1e1e1e] rounded-md me-3",children:e.jsx("div",{className:"text-left items-center",height:"100vh",children:e.jsx(o,{className:"text-sm rounded",height:"15vh",value:b,theme:h,extensions:x,onChange:(s,a)=>{H(s)}})})})]}),e.jsxs("div",{className:"baseMain w-1/2 ms-3",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h4",{className:"font-semibold my-3 me-2",children:"Base Main"}),e.jsx(l,{content:e.jsxs("p",{children:["Test Case handler to help run this program to get if the result is as expected or not ",e.jsx("br",{}),"Pattern : print(functionName($","test[0]",") == $","test[1]",") ",e.jsx("br",{}),"Test varible use to define test cases."]}),style:"light",className:"w-fit",placement:"right",children:e.jsx(n,{className:"text-gray-500"})})]}),e.jsx("div",{className:"p-2 bg-[#1e1e1e] rounded-md me-3",children:e.jsx("div",{className:"text-left items-center",height:"100vh",children:e.jsx(o,{className:"text-sm rounded",height:"15vh",value:w,theme:h,extensions:x,onChange:(s,a)=>{A(s)}})})})]})]})]})})]})};export{Z as A};