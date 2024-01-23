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
  const dataFromIp = await fetchIpData()
  const timeData = await fetchTimeData()
  timeData.countryCode = dataFromIp.country
  if (timeData) {
    buildAll(timeData)
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
      sessionStorage.setItem("ip", data.ip)
      return data
    })
      .catch(error => console.log("IP API: ", error));
}


// Fetch Timezone data
async function fetchTimeData() {
  return await fetch(`https://worldtimeapi.org/api/ip/${sessionStorage.getItem("ip")}`)
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
function buildAll({ datetime, timezone, abbreviation, countryCode, day_of_year, day_of_week, week_number }) {
  const fullTime = datetime.slice(datetime.indexOf("T") + 1, datetime.indexOf("T") + 9)
  const time = fullTime.slice(0, -3)
  const hours = Number(time.slice(0, 2))
  const seconds = fullTime.slice(-2)

  buildQuoteSection()
  buildTimeSection(time, hours, timezone, abbreviation, countryCode)
  buildInfoSection(timezone, day_of_year, day_of_week, week_number)

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
    console.log("BG Image: ", "loaded")
    unHideMain()
  }
  bgImg.onerror = async () => {
    console.log("BG Image: ", "error")
    unHideMain()
  }

  // Update time
  setTimeout(() => {
    updateTime()
    setInterval(updateTime, 60000)
  }, (60 - seconds) * 1000)
}

// Time Section
function buildTimeSection(time, hours, timezone, abbreviation, countryCode) {

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
  timeSection.style.opacity = "1"
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
  const timeData = await fetchTimeData()
  const {datetime, timezone, day_of_year, day_of_week, week_number} = timeData
  const time = datetime.slice(datetime.indexOf("T") + 1, datetime.indexOf("T") + 6)
  clockOut.textContent = time
  buildInfoSection(timezone, day_of_year, day_of_week, week_number)
}
