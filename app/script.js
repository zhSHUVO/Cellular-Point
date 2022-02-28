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

// display search result
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById("phone-card");
    phones.forEach((phone) => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col", "d-flex", "justify-content-center");
        div.innerHTML = `
            <div class="card text-center w-75">
                <img
                    src="${phone.image}"
                    class="card-img-top w-75 mx-auto p-3"
                    alt=""
                    
                />
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <a href="#" class="btn detail-button">See Details</a>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
};
