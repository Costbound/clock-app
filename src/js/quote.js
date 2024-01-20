import axios from "axios"
axios.defaults.headers.common["X-Api-Key"] = ""

const delay = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }

const quoteOut = document.querySelector(".quote__para")
const authorOut = document.querySelector(".quote__author")
const quoteOutputs = [quoteOut, authorOut]
const refreshBtn = document.querySelector(".quote__refresh-btn")
const refreshIcon = document.querySelector(".refresh-btn__icon");
refreshQuote()



refreshBtn.addEventListener("click", refreshQuote)

async function refreshQuote() {
    refreshIcon.style.animationIterationCount = "infinite"
    quoteOutputs.forEach(output => output.style.opacity = "0")
    await delay(300)
    quoteOutputs.forEach(output => output.textContent = "")
    const quote = await quoteRequest()
    if (quote.quote) {
        quoteOut.style.color = ""
        quoteOut.textContent = quote.quote
        authorOut.textContent = quote.author
    } else {
        quoteOut.textContent = `Quote request failed with error: ${quote.response.status} ${quote.code}`
        quoteOut.style.color = "#ff0000b7"
        authorOut.textContent = "" 
    }
    quoteOutputs.forEach(output => output.style.opacity = "")
    refreshIcon.style.animationIterationCount = ""
}

function quoteRequest() {
        return axios("https://api.api-ninjas.com/v1/quotes")
            .then(res => {
            return res.data[0]
            })
            .catch(err => {
                console.log(err)
                return err
            })
}

