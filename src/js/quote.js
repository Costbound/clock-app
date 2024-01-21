import axios from "axios"
axios.defaults.headers.common["X-Api-Key"] = ""

const delay = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }

const blockQuote = document.querySelector(".quote__blockquote")
const quoteOut = document.querySelector(".quote__para")
const authorOut = document.querySelector(".quote__author")
const refreshBtn = document.querySelector(".quote__refresh-btn")
const refreshIcon = document.querySelector(".refresh-btn__icon");
refreshQuote()


refreshBtn.addEventListener("click", refreshQuote)

async function refreshQuote() {
    animateIconOnRefreshing()
    const iconAnimInterval = setInterval(animateIconOnRefreshing, 750)
    blockQuote.style.opacity = "0"
    const quote = await quoteRequest()
    if (quote.quote) {
        quoteOut.style.color = ""
        quoteOut.textContent = quote.quote
        authorOut.textContent = quote.author
    } else {
        quoteOut.textContent = `Quote request failed with error: ${quote}`
        quoteOut.style.color = "#ff0000b7"
        authorOut.textContent = "" 
    }
    blockQuote.style.opacity = ""
    clearInterval(iconAnimInterval)
}

function quoteRequest() {
    return fetch('https://dummyjson.com/quotes/random')
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(data => {
            console.log("Quote API: ", data)
            return data
        })
        .catch(err => {
            console.log(err)
            return err
        })

}


async function animateIconOnRefreshing() {
    refreshIcon.style.transform = "rotate(0.5turn)"
    await delay(300)
    refreshIcon.style.transform = "rotate(360deg)"
    await delay(300)
    refreshIcon.style.transition = "none"
    await delay(50)
    refreshIcon.style.transform = "rotate(0deg)"
    await delay(50)
    refreshIcon.style.transition = ""
}


export default delay