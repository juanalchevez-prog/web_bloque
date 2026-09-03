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
    send.disabled = !(terms.checked && cond.checked)
}

terms.addEventListener("click",show)
cond.addEventListener("click",show)

const loadData = async ()=>{
    const res = await fetch("./country-region-data.json")
    const data = await res.json()
    console.log(data)
    data.array.forEach(element => {
        const option = document.createElement("option")
        option.textContent = element.countryName
        option.value = element.countryShortCode
        country.appendChild(option)
    });
    country.addEventListener("change",()=>{
        console.log(e.target.value)
        data.forEach((elem)=>{
            if (elem.countryShortCode === e.target.value){
                region.options.length = 1
                elem.regions.forEach((el)=>{
                    const option = document.createElement("option")
                    option.textContent = el.Name
                    option.value = el.ShortCode
                    region.appendChild(option)
                })
            }

        })
    })
}
loadData()