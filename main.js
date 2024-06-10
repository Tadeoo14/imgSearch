const formEl = document.querySelector('form');
const SearchEl = document.querySelector('#search');
const resultEl = document.querySelector('.result');
const showMoreEl  = document.querySelector('#btn-show-more');

let page = 1;

const {VITE_API_URL: apiUrl, VITE_ACCESS_KEY: accessKey} = import.meta.env;
console.log(apiUrl, accessKey);


async function searchImages() {
  let inputData = SearchEl.value || "random";
  const url = `${apiUrl}?page=${page}&query=${inputData}&client_id=${accessKey}`;

  //Constructor de URL
  const newUrl = new URL(apiUrl);
  newUrl.searchParams.append('page', page);
  newUrl.searchParams.append('query', inputData);
  newUrl.searchParams.append('client_id', accessKey);

  const response = await fetch(newUrl);
  const {results} = await response.json();

  if(page===1) {
    resultEl.innerHTML = "";
  }

  results.map((result) =>{
    const imageWrapper = document.createElement("article")
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.urls.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt.description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    resultEl.appendChild(imageWrapper);

  });
  page++;

  if(page>1) {
    showMoreEl.style.display = "block";
  }

}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreEl.addEventListener('click', () => searchImages());



