import{b as o,f as c,j as f}from"./Toast-VCx9N5bt.js";import{a}from"./axios-L6U4YIEh.js";const h=o.createContext(),x=({children:i})=>{const r=c(),[l,s]=o.useState(()=>{let t=localStorage.getItem("userProfile");return t?JSON.parse(t):r("/login")}),n=async t=>{let e=await a.post("http://localhost:8001/auth/login",t,{withCredentials:!0});localStorage.setItem("userProfile",JSON.stringify(e.data.user)),s(e.data.user),r("/")},u=async t=>{let e=await a.post("http://localhost:8001/auth/refresh-token",t,{withCredentials:!0});localStorage.setItem("userProfile",JSON.stringify(e.data.user)),s(e.data.user)};return f.jsx(h.Provider,{value:{user:l,login:n,refresh:u},children:i})};export{h as A,x as a};
