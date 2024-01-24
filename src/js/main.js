import { delay } from "./dom-and-common-func"
import { errWindow, errOut, errBtn, main, loader, timeSection, infoSection, sunIcon, moonIcon, greetingOut, clockOut, timezoneAbrOut, locationOut, moreOut, moreBtn, moreBtnIcon, quoteSection, timezoneOut, dayOfYearOut, dayOfWeekOut, weekNumOut } from "./dom-and-common-func"
import { refreshQuote as buildQuoteSection } from "./quote"
import dayBgUrlBig from "../img/desctop-tablet/bg-desc-tab-day.jpg"
import nightBgUrlBig from "../img/desctop-tablet/bg-desc-tab-night.jpg"
import dayBgUrlSmall from "../img/mobile/bg-image-daytime.jpg"
import nightBgUrlSmall from "../img/mobile/bg-image-nighttime.jpg"

main.classList.add("disabled")
main.style.opacity = "0"
fetchAllData()

errBtn.addEventListener("click", fetchAllData)
moreBtn.addEventListener("click", openInfo)

// FUNCTIONS

// Fetch Data -------------------------------

// Fetch, check, and start build function
async function fetchAllData() {
  errWindow.classList.add("disabled")
  await delay(300)
  const dataFromIp = await fetchIpData()
  const timeData = await fetchTimeData(dataFromIp)
  if (dataFromIp && timeData) {
    timeData.countryCode = dataFromIp.country
    buildAll(timeData)
  } else {
    errWindow.classList.remove("disabled")
  }
}

// Fetch IP data
async function fetchIpData() {
  return await fetch('https://api.country.is/')
    .then(res => {
      if (!res.ok) throw new Error(res.status)
      return res.json()
    })
    .then(data => {
      sessionStorage.setItem("ip", data.ip)
      return data
    })
    .catch(err => {
      console.log("IP API: ", err)
      errOut.textContent = `Fail to get your IP (${err}). Please try again!`
    });
}


// Fetch Timezone data
async function fetchTimeData(ipFetchFeedback) {
  if (ipFetchFeedback) {
    return await fetch(`https://worldtimeapi.org/api/ip/${sessionStorage.getItem("ip")}`)
      .then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then(data => {
        return data
      })
      .catch(err => {
        console.log("World Time API: ", err)
        errOut.textContent = `Fail to get time zone data from your IP (${err}). Please try again!`
      })
  }
}


// Build sections with fetched data---------------------------------------------------

// General build
function buildAll({ datetime, timezone, abbreviation, countryCode, day_of_year, day_of_week, week_number }) {
  const {time, hours, seconds} = calcDateTime(datetime)

  buildQuoteSection()
  buildTimeSection(time, hours, timezone, abbreviation, countryCode)
  buildInfoSection(timezone, day_of_year, day_of_week, week_number)

// Start time update cicle
  setTimeout(updateTime, (60 - seconds) * 1000)


  // Check bg image to avoid remove loader before bg loaded
  const bgImg = new Image()
  if (window.innerWidth >= 768) {
    hours >= 5 && hours < 18 ? bgImg.src = dayBgUrlBig :
      bgImg.src = nightBgUrlBig
  } else {
    hours >= 5 && hours < 18 ? bgImg.src = dayBgUrlSmall :
      bgImg.src = nightBgUrlSmall
  }
  
  bgImg.onload = async () => {
    unHideMain()
  }
  bgImg.onerror = async () => {
    unHideMain()
  }
}

// Time Section
function buildTimeSection(time, hours, timezone, abbreviation, countryCode) {
  const buildDayOrNight = (dayTime) => {
    if (dayTime === "day") {
      main.classList.add("main_day")
      infoSection.classList.add("section-info_day")
      sunIcon.classList.remove("disabled")
    } else {
      main.classList.add("main_night")
      infoSection.classList.add("section-info_night")
      moonIcon.classList.remove("disabled")
    }
  }

  if (hours >= 5 && hours < 12) {
    greetingOut.textContent = "good morning"
    buildDayOrNight("day")
  } else if (hours >= 12 && hours < 18) {
    greetingOut.textContent = "good afternoon"
    buildDayOrNight("day")
  } else {
    greetingOut.textContent = "good evening"
    buildDayOrNight("night")
  }
  if (window.innerWidth > 767) greetingOut.textContent += ", it's currently"

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
// Unhide main

async function unHideMain() {
  main.classList.remove("disabled")
  await delay(50)
  main.style.opacity = ""
  loader.classList.add("disabled")
}

// Open/Close Info section ----------------------------------
async function openInfo() {
  infoSection.classList.add("section-info_open")
  quoteSection.classList.add("section-quote_hidden")
  moreBtnIcon.style.transform = "rotate(0.5turn)"
  moreOut.textContent = "less"
  await delay(700)
  quoteSection.classList.add("disabled")

  moreBtn.removeEventListener("click", openInfo)
  moreBtn.addEventListener("click", closeInfo)
}

async function closeInfo() {
  infoSection.classList.remove("section-info_open")
  moreBtnIcon.style.transform = ""
  await delay(680)
  moreOut.textContent = "more"
  quoteSection.classList.remove("disabled")
  await delay(20)
  quoteSection.classList.remove("section-quote_hidden")

  moreBtn.removeEventListener("click", closeInfo)
  moreBtn.addEventListener("click", openInfo)
}

// Update time
async function updateTime() {
  const timeData = await fetchTimeData(1)
  const { datetime, timezone, day_of_year, day_of_week, week_number } = timeData
  const {time, seconds} = calcDateTime(datetime)

  setTimeout(updateTime, (60 - seconds) * 1000)
  clockOut.textContent = time
  buildInfoSection(timezone, day_of_year, day_of_week, week_number)
}



function calcDateTime(datetime) {
  const fullTime = datetime.slice(datetime.indexOf("T") + 1, datetime.indexOf("T") + 9)
  const time = fullTime.slice(0, -3)
  const hours = Number(time.slice(0, 2))
  const seconds = fullTime.slice(-2)
  return {time, hours, seconds}
}
