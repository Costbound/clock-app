const domElements = {
    main: document.querySelector("main"),
    loader: document.querySelector(".loader"),
    // Error
    errWindow: document.querySelector(".modal-error"),
    errOut: document.querySelector(".error__para"),
    errBtn: document.querySelector(".error__btn"),
    // Quote
    quoteSection: document.querySelector(".section-quote"),
    blockQuote: document.querySelector(".quote__blockquote"),
    quoteOut: document.querySelector(".quote__para"),
    authorOut: document.querySelector(".quote__author"),
    refreshBtn: document.querySelector(".quote__refresh-btn"),
    refreshIcon: document.querySelector(".refresh-btn__icon"),

    // Time
    timeSection: document.querySelector(".section-time"),
    sunIcon: document.querySelector(".time__sun-icon"),
    moonIcon: document.querySelector(".time__moon-icon"),
    greetingOut: document.querySelector(".time__para"),
    clockOut: document.querySelector(".time__current-time-title"),
    timezoneAbrOut: document.querySelector(".time__current-time-para"),
    locationOut: document.querySelector(".time__place-para"),
    moreOut: document.querySelector(".time__more-para"),
    moreBtn: document.querySelector(".time__more-btn"),
    moreBtnIcon: document.querySelector(".more-btn__down-icon"),
    // Info
    infoSection: document.querySelector(".section-info"),
    timezoneOut: document.querySelector("#timezone"),
    dayOfYearOut: document.querySelector("#day-of-year"),
    dayOfWeekOut: document.querySelector("#day-of-week"),
    weekNumOut: document.querySelector("#week-number"),
}


export const delay = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }
export const {
    main,
    loader,
    errWindow,
    errOut,
    errBtn,
    quoteSection,
    blockQuote,
    quoteOut,
    authorOut,
    refreshBtn,
    refreshIcon,
    timeSection,
    sunIcon,
    moonIcon,
    greetingOut,
    clockOut,
    timezoneAbrOut,
    locationOut,
    moreOut,
    moreBtn,
    moreBtnIcon,
    infoSection,
    timezoneOut,
    dayOfYearOut,
    dayOfWeekOut,
    weekNumOut,
} = domElements
