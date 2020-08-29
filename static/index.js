const searchForm = document.querySelector('form');
const rTemp = document.querySelector('template');
const resultArea = document.querySelector('#restaurant-results');
const hostname = this.location.origin;
 

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  resultArea.innerHTML = '';
  const query = e.target.querySelector('#restaurant-name').value;
  if (query === '') {
    return
  }
  e.target.querySelector('#restaurant-name').value = '';
  const res = await fetch(`${hostname}/locations/${query}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'POST', 
  })
  console.log(res);
  const json = await res.json();
  populateData(json);
});

function populateData(result) {

  const newResult = rTemp.content.cloneNode(true);
  newResult.querySelector('.result-title').innerText = result.name;
  newResult.querySelector('.result-neighborhood').innerText = result.location.locality;
  newResult.querySelector('.result-address').innerText = result.location.address;
  newResult.querySelector('.result-price').innerText = '$'.repeat(result.price);
  newResult.querySelector('.result-thumbnail').src = result.thumbnail;
  newResult.querySelector('.result-website').href = result.url;
  resultArea.appendChild(newResult);

}