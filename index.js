(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const A={main:document.querySelector("main"),loader:document.querySelector(".loader"),errWindow:document.querySelector(".modal-error"),errOut:document.querySelector(".error__para"),errBtn:document.querySelector(".error__btn"),quoteSection:document.querySelector(".section-quote"),blockQuote:document.querySelector(".quote__blockquote"),quoteOut:document.querySelector(".quote__para"),authorOut:document.querySelector(".quote__author"),refreshBtn:document.querySelector(".quote__refresh-btn"),refreshIcon:document.querySelector(".refresh-btn__icon"),timeSection:document.querySelector(".section-time"),sunIcon:document.querySelector(".time__sun-icon"),moonIcon:document.querySelector(".time__moon-icon"),greetingOut:document.querySelector(".time__para"),clockOut:document.querySelector(".time__current-time-title"),timezoneAbrOut:document.querySelector(".time__current-time-para"),locationOut:document.querySelector(".time__place-para"),moreOut:document.querySelector(".time__more-para"),moreBtn:document.querySelector(".time__more-btn"),moreBtnIcon:document.querySelector(".more-btn__down-icon"),infoSection:document.querySelector(".section-info"),timezoneOut:document.querySelector("#timezone"),dayOfYearOut:document.querySelector("#day-of-year"),dayOfWeekOut:document.querySelector("#day-of-week"),weekNumOut:document.querySelector("#week-number")},s=e=>new Promise(t=>setTimeout(t,e)),{main:u,loader:D,errWindow:_,errOut:L,errBtn:W,quoteSection:p,blockQuote:w,quoteOut:y,authorOut:S,refreshBtn:z,refreshIcon:m,timeSection:oe,sunIcon:$,moonIcon:F,greetingOut:g,clockOut:I,timezoneAbrOut:Q,locationOut:U,moreOut:k,moreBtn:f,moreBtnIcon:v,infoSection:h,timezoneOut:Y,dayOfYearOut:H,dayOfWeekOut:M,weekNumOut:R}=A;z.addEventListener("click",x);async function x(){O();const e=setInterval(O,750);w.style.opacity="0";const t=await V();t.quote?(y.style.color="",y.textContent=t.quote,S.textContent=t.author):(y.textContent=`Quote request failed with error: ${t}`,y.style.color="#ff0000b7",S.textContent=""),w.style.opacity="",clearInterval(e)}async function V(){return await fetch("https://dummyjson.com/quotes/random").then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>e).catch(e=>(console.log(e),e))}async function O(){m.style.transform="rotate(0.5turn)",await s(300),m.style.transform="rotate(360deg)",await s(300),m.style.transition="none",await s(50),m.style.transform="rotate(0deg)",await s(50),m.style.transition=""}const G="/clock-app/assets/bg-desc-tab-day-0ttc9Nja.jpg",J="/clock-app/assets/bg-desc-tab-night-Vfrw9YZN.jpg",K="/clock-app/assets/bg-image-daytime-dJtLGd7C.jpg",Z="/clock-app/assets/bg-image-nighttime-7nFHseSV.jpg";u.classList.add("disabled");u.style.opacity="0";C();W.addEventListener("click",C);f.addEventListener("click",q);async function C(){_.classList.add("disabled"),await s(300);const e=await X(),t=await B(e);e&&t?(t.countryCode=e.country,ee(t)):_.classList.remove("disabled")}async function X(){return await fetch("https://api.country.is/").then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>(sessionStorage.setItem("ip",e.ip),e)).catch(e=>{console.log("IP API: ",e),L.textContent=`Fail to get your IP (${e}). Please try again!`})}async function B(e){if(e)return await fetch(`https://worldtimeapi.org/api/ip/${sessionStorage.getItem("ip")}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>t).catch(t=>{console.log("World Time API: ",t),L.textContent=`Fail to get time zone data from your IP (${t}). Please try again!`})}function ee({datetime:e,timezone:t,abbreviation:r,countryCode:i,day_of_year:o,day_of_week:n,week_number:c}){const{time:l,hours:d,seconds:N}=j(e);x(),te(l,d,t,r,i),E(t,o,n,c),setTimeout(T,(60-N)*1e3);const a=new Image;window.innerWidth>=768?d>=5&&d<18?a.src=G:a.src=J:d>=5&&d<18?a.src=K:a.src=Z,a.onload=async()=>{b()},a.onerror=async()=>{b()}}function te(e,t,r,i,o){const n=l=>{l==="day"?(u.classList.add("main_day"),h.classList.add("section-info_day"),$.classList.remove("disabled")):(u.classList.add("main_night"),h.classList.add("section-info_night"),F.classList.remove("disabled"))};t>=5&&t<12?(g.textContent="good morning",n("day")):t>=12&&t<18?(g.textContent="good afternoon",n("day")):(g.textContent="good evening",n("night")),window.innerWidth>767&&(g.textContent+=", it's currently"),I.textContent=e,Q.textContent=i;const c=r.split("/")[1];U.textContent=`in ${c.split("_").join(" ")}, ${o}`}function E(e,t,r,i){Y.textContent=e,H.textContent=t,M.textContent=r,R.textContent=i}async function b(){u.classList.remove("disabled"),await s(50),u.style.opacity="",D.classList.add("disabled")}async function q(){h.classList.add("section-info_open"),p.classList.add("section-quote_hidden"),v.style.transform="rotate(0.5turn)",k.textContent="less",await s(700),p.classList.add("disabled"),f.removeEventListener("click",q),f.addEventListener("click",P)}async function P(){h.classList.remove("section-info_open"),v.style.transform="",await s(680),k.textContent="more",p.classList.remove("disabled"),await s(20),p.classList.remove("section-quote_hidden"),f.removeEventListener("click",P),f.addEventListener("click",q)}async function T(){const e=await B(1),{datetime:t,timezone:r,day_of_year:i,day_of_week:o,week_number:n}=e,{time:c,seconds:l}=j(t);setTimeout(T,(60-l)*1e3),I.textContent=c,E(r,i,o,n)}function j(e){const t=e.slice(e.indexOf("T")+1,e.indexOf("T")+9),r=t.slice(0,-3),i=Number(r.slice(0,2)),o=t.slice(-2);return{time:r,hours:i,seconds:o}}
//# sourceMappingURL=index.js.map
