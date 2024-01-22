import { delay } from "./dom-and-common-func"
import { errWindow, errOut, errBtn, main, loader, timeSection, infoSection, sunIcon, moonIcon, greetingOut, clockOut, timezoneAbrOut, locationOut, moreBtn, moreBtnIcon, quoteSection, timezoneOut, dayOfYearOut, dayOfWeekOut, weekNumOut } from "./dom-and-common-func"
import { refreshQuote as buildQuoteSection } from "./quote"

main.classList.add("disabled")
main.style.opacity = "0"
checkFetches()

errBtn.addEventListener("click", checkFetches)
moreBtn.addEventListener("click", openInfo)

// FUNCTIONS

// Fetch Data -------------------------------

// Fetch, check, and start build function
async function checkFetches() {
  errWindow.classList.add("disabled")
  const dataFromIp = await fetchIpData()
  const timeData = await fetchTimeData(dataFromIp.ip)
  timeData.countryCode = dataFromIp.country
  if (timeData) {
    buildApplication(timeData)
  } else {
    errWindow.classList.remove("disabled")
  }
}

// Fetch IP data
async function fetchIpData() {
  return await fetch('https://api.country.is')
    .then(response => response.json())
    .then(data => {
        console.log("IP API:", data)
        return data
    })
      .catch(error => console.log("IP API: ", error));
}


// Fetch Timezone data
async function fetchTimeData(ip) {
  return await fetch(`https://worldtimeapi.org/api/ip/${ip}`)
      .then(res => res.json())
    .then(data => {
      console.log("World Time API:", data)
      return data
      })
      .catch(err => {
        console.log("World Time API: ", err)
        errOut.textContent = `Fail to get your data (${err}). Please try again!`
      })
}


// Build sections with fetched data---------------------------------------------------

// General build
async function buildApplication({ datetime, timezone, abbreviation, countryCode, day_of_year, day_of_week, week_number }) {
  buildQuoteSection()
  buildTimeSection(datetime, timezone, abbreviation, countryCode)
  buildInfoSection(timezone, day_of_year, day_of_week, week_number)

  main.classList.remove("disabled")
  await delay(50)
  timeSection.style.opacity = "1"
  main.style.opacity = ""
  loader.classList.add("disabled")
}

// Time Section
function buildTimeSection(datetime, timezone, abbreviation, countryCode) {
  const time = datetime.slice(datetime.indexOf("T") + 1, datetime.indexOf("T") + 6)
  const hours = Number(time.slice(0, 2))

  if (hours >= 5 && hours < 12) {
    greetingOut.textContent = "good morning"
    main.classList.add("main_day")
    infoSection.classList.add("section-info_day")
    sunIcon.classList.remove("disabled")
  } else if (hours >= 12 && hours < 18) {
    greetingOut.textContent = "good afternoon"
    main.classList.add("main_day")
    infoSection.classList.add("section-info_day")
    sunIcon.classList.remove("disabled")
  } else {
    main.classList.add("main_night")
    infoSection.classList.add("section-info_night")
    greetingOut.textContent = "good evening"
    moonIcon.classList.remove("disabled")
  }

  clockOut.textContent = time
  timezoneAbrOut.textContent = abbreviation
  const city = timezone.split("/")[1]
  locationOut.textContent = `in ${city.split("_").join(" ")}, ${countryCode}`

}

// Info Section
function buildInfoSection(timezone, dayOfYear, dayOfWeek, weekNumber) {
  timezoneOut.textContent = timezone
  dayOfYearOut.textContent = dayOfYear
  dayOfWeekOut.textContent = dayOfWeek
  weekNumOut.textContent = weekNumber
}

// Open/Close Info section ----------------------------------
async function openInfo() {
  infoSection.classList.add("section-info_open")
  quoteSection.classList.add("section-quote_hidden")
  moreBtnIcon.style.transform = "rotate(0.5turn)"
  await delay(700)
  quoteSection.classList.add("disabled")

  moreBtn.removeEventListener("click", openInfo)
  moreBtn.addEventListener("click", closeInfo)
}

async function closeInfo() {
  infoSection.classList.remove("section-info_open")
  moreBtnIcon.style.transform = ""
  await delay(680)
  quoteSection.classList.remove("disabled")
  await delay(20)
  quoteSection.classList.remove("section-quote_hidden")

  moreBtn.removeEventListener("click", closeInfo)
  moreBtn.addEventListener("click", openInfo)
}
