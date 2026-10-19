const radio = document.getElementById("radio1")
const hidden = document.getElementById("hidden")
const country = document.getElementById("country")
const region = document.getElementById("region")
const term = document.getElementById("terms")
const cond = document.getElementById("cond")
const send = document.getElementById("send")

hidden.style.display = "none";

radio.addEventListener("click",()=>{
    hidden.style.display = "block"
})

send.disabled = true;
const show = ()=>{
    send.disabled = !(term.checked && cond.checked)
}

term.addEventListener("click",show)
cond.addEventListener("click",show)

const loadData = async ()=>{
    const res = await fetch("./country-region-data.json")
    const data = await res.json()

    data.forEach(element => {
        const option = document.createElement("option")
        option.textContent = element.countryName
        option.value = element.countryShortCode
        country.appendChild(option)
    })

    country.addEventListener("change", (e)=>{
        region.options.length = 1
        const elem = data.find(c => c.countryShortCode === e.target.value)
        if (!elem) return
        elem.regions.forEach((el)=>{
            const option = document.createElement("option")
            option.textContent = el.name
            option.value = el.shortCode
            region.appendChild(option)
        })
    })
}
loadData()
