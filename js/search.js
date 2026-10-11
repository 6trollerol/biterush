const productURL = "/products";
const searchBar = document.querySelector('.search');

const keyword = new URLSearchParams(window.location.search).get("name");
document.getElementById("searchTerm").textContent = keyword;

document.getElementById('signOutBtn').addEventListener('click', function() {
  window.location.href = './login.html';
  localStorage.setItem("isLoggedIn", false)
  localStorage.removeItem("username");
  localStorage.removeItem("role");
});

if(localStorage.getItem("isLoggedIn") === "false"){
  window.location.href = './login.html';
}


fetch(productURL)
  .then(res => res.json())
  .then(data => {
    const results = data.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    const container = document.getElementById("searchResults");
    const countEl = document.getElementById("count");

    countEl.textContent = results.length;

    results.forEach(item => {
      const product = `
        <div class="card shadow-md bg-gray-800 rounded-lg border border-gray-700 p-4">
          <a href="product-details.html?id=${item.id}">
            <img src="${item.img}" class="h-40 w-full object-contain mb-3 rounded bg-gray-700">
            <h3 class="text-white font-semibold">${item.name}</h3>
          </a>
          <p class="text-gray-400 text-sm mt-1">${item.type}</p>
          <p class="text-white font-bold mt-2">${item.price}</p>
        </div>
      `;
      container.innerHTML += product;
    });
  })
  .catch(err => console.error(err));

  searchBar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const keyword = searchBar.value.trim();
      if (keyword !== "") {
        window.location.href = `search.html?name=${encodeURIComponent(keyword)}`;
      }
    }
  });