// global
const searchResult = document.getElementById("phone-card");
const phoneDetails = document.getElementById("detail-card");
const notFound = document.getElementById("not-found");

// getting phone data
const searchPhone = () => {
    const searchResult = document.getElementById("search-bar");
    const searchText = searchResult.value;
    searchResult.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.data));
};

// spinner
const toggleSpinner = (displyStyle) => {
    document.getElementById("spinner").style.display = displyStyle;
};
// see more
const toggleMore = (displyStyle) => {
    document.getElementById("see-more").style.display = displyStyle;
};

// display search result
const displaySearchResult = (phones) => {
    // cleaning previous output
    phoneDetails.innerHTML = "";
    searchResult.innerHTML = "";
    notFound.innerHTML = "";

    // spinner
    toggleSpinner("block");

    // error checking for invalid search
    if (phones.length == 0) {
        console.log("not found");
        const div = document.createElement("div");
        div.innerHTML = `
        <p>No Phone Found! Recheck your seach term and try again.</p>
        `;
        notFound.appendChild(div);
    } else {
        phones.slice(0, 20).forEach((phone) => {
            console.log(phone);
            const div = document.createElement("div");
            div.classList.add("col", "d-flex", "justify-content-center");
            div.innerHTML = `
            <div  class="card text-center w-75">
                <img
                    src="${phone.image}"
                    class="card-img-top w-75 mx-auto p-3 "
                    alt=""
                />
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <a href="#" onclick="loadPhoneDetail('${phone.slug}')" class="btn detail-button shadow-none">See Details</a>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        });

        // showing show more button according to the phone display
        toggleSpinner("none");
        if (phones.length > 20) {
            toggleMore("block");
        } else {
            toggleMore("none");
        }
    }
};

// getting single phone data
const loadPhoneDetail = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhoneDetail(data));
};

// disply single phone details
const displayPhoneDetail = (phone) => {
    // cleaning previous output
    phoneDetails.innerHTML = "";

    // variable for other infos
    let wlan = "no info available";
    let bluetooth = "no info available";
    let gps = "no info available";
    let nfc = "no info available";
    let radio = "no info available";
    let usb = "no info available";

    if (phone.data.others != null) {
        others = JSON.parse(JSON.stringify(phone.data.others));
        wlan = others.WLAN;
        bluetooth = others.Bluetooth;
        gps = others.GPS;
        nfc = others.NFC;
        radio = others.Radio;
        usb = others.USB;
    }

    // release date check
    let release = phone.data.releaseDate;
    if (release == "") {
        release = "No release date found!";
    }

    // display to the screen
    const div = document.createElement("div");
    div.classList.add("col", "d-flex", "justify-content-center");
    div.innerHTML = `
            <div  class="card text-center px-3">
                <img
                    src="${phone.data.image}"
                    class="card-img-top w-50 mx-auto p-3 "
                    alt=""
                />
                <div class="card-body">
                    <h5 class="card-title">${phone.data.name}</h5>
                    <p class="card-text"><span>Manufacturer:</span> ${phone.data.brand}</p>
                    <p class="card-text"><span>Release:</span> ${release}</p>
                    <p class="card-text"><span>Storage:</span> ${phone.data.mainFeatures.storage}</p>
                    <p class="card-text"><span>Memory:</span> ${phone.data.mainFeatures.memory}</p>
                    <p class="card-text"><span>Display:</span> ${phone.data.mainFeatures.displaySize}</p>
                    <p class="card-text"><span>Chipset:</span> ${phone.data.mainFeatures.chipSet}</p>
                    <p class="card-text"><span>Sensors Data:</span> ${phone.data.mainFeatures.sensors}</p>
                    <p class="card-text"><span>Others:</span><br>WLAN: ${wlan}<br>Bluetooth: ${bluetooth}<br>GPS: ${gps}<br>NFC: ${nfc}<br>Radio: ${radio}<br>USB: ${usb}</p>
                </div>
            </div>
        `;
    phoneDetails.appendChild(div);
};
