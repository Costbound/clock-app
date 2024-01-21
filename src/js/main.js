import delay from "./quote"

const errWindow = document.querySelector(".modal-error")
const errOut = document.querySelector(".error__para")
const errBtn = document.querySelector(".error__btn")
const main = document.querySelector("main")
const loader = document.querySelector(".loader")
const timeSection = document.querySelector(".section-time")
const sunIcon = document.querySelector(".time__sun-icon")
const moonIcon = document.querySelector(".time__moon-icon")
const greetingOut = document.querySelector(".time__para")
const clockOut = document.querySelector(".time__current-time-title")
const timeZoneAbr = document.querySelector(".time__current-time-para")
const locationOut = document.querySelector(".time__place-para")


main.classList.add("disabled")
main.style.opacity = "0"
checkFetches()

errBtn.addEventListener("click", checkFetches)

// FUNCTIONS

// Fetch Data -------------------------------

// Fetch, check, and start build function
async function checkFetches() {
  errWindow.classList.add("disabled")
  const dataFromIp = await fetchIpData()
  const timeData = await fetchTimeData(dataFromIp.ip)
  if (timeData) {
    buildApplication(timeData, dataFromIp.country)
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
  return await fetch(`http://worldtimeapi.org/api/ip/${ip}`)
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


// Build sections with fetched data

// General build
async function buildApplication(timeData, country) {
  const currentTime = timeData.datetime.slice(timeData.datetime.indexOf("T") + 1, timeData.datetime.indexOf("T") + 6)
  const currentHours = Number(currentTime.slice(0, 2))

  if (currentHours >= 5 && currentHours < 12) {
    greetingOut.textContent = "good morning"
    main.classList.add("main_day")
    sunIcon.classList.remove("disabled")
  } else if (currentHours >= 12 && currentHours < 18) {
    greetingOut.textContent = "good afternoon"
    main.classList.add("main_day")
    sunIcon.classList.remove("disabled")
  } else {
    main.classList.add("main_night")
    greetingOut.textContent = "good evening"
    moonIcon.classList.remove("disabled")
  }

  clockOut.textContent = currentTime
  timeZoneAbr.textContent = timeData.abbreviation
  const city = timeData.timezone.split("/")[1]
  locationOut.textContent = `in ${city.split("_").join(" ")}, ${country}`

  main.classList.remove("disabled")
  await delay(50)
  timeSection.style.opacity = "1"
  main.style.opacity = ""
  loader.classList.add("disabled")
}
