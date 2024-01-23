(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const B={main:document.querySelector("main"),loader:document.querySelector(".loader"),errWindow:document.querySelector(".modal-error"),errOut:document.querySelector(".error__para"),errBtn:document.querySelector(".error__btn"),quoteSection:document.querySelector(".section-quote"),blockQuote:document.querySelector(".quote__blockquote"),quoteOut:document.querySelector(".quote__para"),authorOut:document.querySelector(".quote__author"),refreshBtn:document.querySelector(".quote__refresh-btn"),refreshIcon:document.querySelector(".refresh-btn__icon"),timeSection:document.querySelector(".section-time"),sunIcon:document.querySelector(".time__sun-icon"),moonIcon:document.querySelector(".time__moon-icon"),greetingOut:document.querySelector(".time__para"),clockOut:document.querySelector(".time__current-time-title"),timezoneAbrOut:document.querySelector(".time__current-time-para"),locationOut:document.querySelector(".time__place-para"),moreOut:document.querySelector(".time__more-para"),moreBtn:document.querySelector(".time__more-btn"),moreBtnIcon:document.querySelector(".more-btn__down-icon"),infoSection:document.querySelector(".section-info"),timezoneOut:document.querySelector("#timezone"),dayOfYearOut:document.querySelector("#day-of-year"),dayOfWeekOut:document.querySelector("#day-of-week"),weekNumOut:document.querySelector("#week-number")},c=e=>new Promise(t=>setTimeout(t,e)),{main:s,loader:P,errWindow:_,errOut:A,errBtn:E,quoteSection:p,blockQuote:S,quoteOut:f,authorOut:O,refreshBtn:j,refreshIcon:d,timeSection:W,sunIcon:b,moonIcon:T,greetingOut:g,clockOut:z,timezoneAbrOut:N,locationOut:D,moreOut:I,moreBtn:y,moreBtnIcon:v,infoSection:m,timezoneOut:Q,dayOfYearOut:$,dayOfWeekOut:F,weekNumOut:U}=B;j.addEventListener("click",x);async function x(){L();const e=setInterval(L,750);S.style.opacity="0";const t=await G();t.quote?(f.style.color="",f.textContent=t.quote,O.textContent=t.author):(f.textContent=`Quote request failed with error: ${t}`,f.style.color="#ff0000b7",O.textContent=""),S.style.opacity="",clearInterval(e)}async function G(){return await fetch("https://dummyjson.com/quotes/random").then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>(console.log("Quote API: ",e),e)).catch(e=>(console.log(e),e))}async function L(){d.style.transform="rotate(0.5turn)",await c(300),d.style.transform="rotate(360deg)",await c(300),d.style.transition="none",await c(50),d.style.transform="rotate(0deg)",await c(50),d.style.transition=""}const M="/clock-app/assets/bg-desc-tab-day-xiX3mCD-.jpg",R="/clock-app/assets/bg-desc-tab-night-5M6zqzpo.jpg",Y="/clock-app/assets/bg-image-daytime-dJtLGd7C.jpg",H="/clock-app/assets/bg-image-nighttime-7nFHseSV.jpg";s.classList.add("disabled");s.style.opacity="0";C();E.addEventListener("click",C);y.addEventListener("click",h);async function C(){_.classList.add("disabled");const e=await J(),t=await K(e.ip);t.countryCode=e.country,t?V(t):_.classList.remove("disabled")}async function J(){return await fetch("https://api.country.is").then(e=>e.json()).then(e=>(console.log("IP API:",e),e)).catch(e=>console.log("IP API: ",e))}async function K(e){return await fetch(`https://worldtimeapi.org/api/ip/${e}`).then(t=>t.json()).then(t=>(console.log("World Time API:",t),t)).catch(t=>{console.log("World Time API: ",t),A.textContent=`Fail to get your data (${t}). Please try again!`})}async function V({datetime:e,timezone:t,abbreviation:i,countryCode:r,day_of_year:o,day_of_week:n,week_number:l}){const q=e.slice(e.indexOf("T")+1,e.indexOf("T")+6),u=Number(q.slice(0,2));x(),X(q,u,t,i,r),Z(t,o,n,l);const a=new Image;window.innerWidth>=768?u>=5&&u<18?a.src=M:a.src=R:u>=5&&u<18?a.src=Y:a.src=H,a.onload=async()=>{console.log("BG Image: ","loaded"),w()},a.onerror=async()=>{console.log("BG Image: ","error"),w()}}function X(e,t,i,r,o){t>=5&&t<12?(g.textContent="good morning",s.classList.add("main_day"),m.classList.add("section-info_day"),b.classList.remove("disabled")):t>=12&&t<18?(g.textContent="good afternoon",s.classList.add("main_day"),m.classList.add("section-info_day"),b.classList.remove("disabled")):(s.classList.add("main_night"),m.classList.add("section-info_night"),g.textContent="good evening",T.classList.remove("disabled")),window.innerWidth>767&&(g.textContent+=", it's currently"),z.textContent=e,N.textContent=r;const n=i.split("/")[1];D.textContent=`in ${n.split("_").join(" ")}, ${o}`}function Z(e,t,i,r){Q.textContent=e,$.textContent=t,F.textContent=i,U.textContent=r}async function w(){s.classList.remove("disabled"),await c(50),W.style.opacity="1",s.style.opacity="",P.classList.add("disabled")}async function h(){m.classList.add("section-info_open"),p.classList.add("section-quote_hidden"),v.style.transform="rotate(0.5turn)",I.textContent="less",await c(700),p.classList.add("disabled"),y.removeEventListener("click",h),y.addEventListener("click",k)}async function k(){m.classList.remove("section-info_open"),v.style.transform="",await c(680),I.textContent="more",p.classList.remove("disabled"),await c(20),p.classList.remove("section-quote_hidden"),y.removeEventListener("click",k),y.addEventListener("click",h)}
//# sourceMappingURL=index.js.map
