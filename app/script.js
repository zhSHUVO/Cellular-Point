const searchPhone = () => {
    const searchResult = document.getElementById("search-bar");
    const searchText = searchResult.value;
    searchResult.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (phones) => {
    console.log(phones);
};
