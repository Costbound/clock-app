import { delay } from "./dom-and-common-func"
import {blockQuote, refreshBtn, refreshIcon, quoteOut, authorOut} from "./dom-and-common-func"

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

async function quoteRequest() {
    return await fetch('https://dummyjson.com/quotes/random')
        .then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        })
        .then(data => {
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


export {refreshQuote}