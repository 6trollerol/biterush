const API_URL = "https://biterush-api-0z6r.onrender.com";
const productURL = `${API_URL}/products`;
const searchBar = document.querySelector('.search')

if(localStorage.getItem("isLoggedIn") === "false"){
    window.location.href = './login.html';
}

document.getElementById('signOutBtn').addEventListener('click', function() {
    window.location.href = './login.html';
    localStorage.setItem("isLoggedIn", false)
    localStorage.removeItem("username");
    localStorage.removeItem("role");
 });

 function searchItem(){
  searchInput = searchBar.value.trim()
  searchPrd = []
  fetch(productURL)
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      if (p.name.include())
        searchPrd.push(p)
    })
  })

    

}

fetch(productURL)
  .then(res => res.json())
  .then(data => {
    const containers = {
      'pizza': document.querySelector('.pizza-container'),
      'salad': document.querySelector('.salad-container'),
      'hamburger': document.querySelector('.hamburger-container'),
      'chicken wings': document.querySelector('.chicken-wings-container'),
      'sushi': document.querySelector('.sushi-container'),
      'soup': document.querySelector('.soup-container'),
      'drink': document.querySelector('.drink-container')
    };

    data.forEach(item => {
      const product = `
    <div class="card shadow-md bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:bg-gray-750 transition-all border border-gray-700 h-full flex flex-col">
          <div class="card-body text-center p-4 flex flex-col flex-grow">
            <!-- Product Image -->
            <a href="product-details.html?id=${item.id}">
              <img
                src="${item.img || 'https://via.placeholder.com/200x200/374151/FFFFFF?text=No+Image'}"
                alt="${item.name}"
                class="mb-4 h-40 w-full object-contain bg-gray-700 rounded"
                onerror="this.onerror=null; this.src='https://via.placeholder.com/200x200/374151/FFFFFF?text=No+Image'"
              />
              <h3 class="text-gray-100 text-lg font-medium mb-2">${item.name}</h3>
            </a>

            <!-- Badges -->
            <div class="flex justify-center gap-2 mb-3">
              <span class="badge badge-soft badge-success px-3 py-1 rounded-full text-xs bg-green-600 text-white">${item.type}</span>
            </div>

            <!-- Divider -->
            <div class="divider my-2 border-gray-700"></div>

            <div class="flex items-center justify-between">
              <span class="text-gray-100 text-xl font-semibold">${item.price}</span>
              <div class="flex gap-2">
                <button class="btn btn-circle btn-text btn-secondary p-2 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors" aria-label="Circle Soft Icon Button">
                  <span class="icon-[tabler--heart] size-5.5 shrink-0"></span>
                </button>
                <button class="btn btn-circle btn-text btn-secondary p-2 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors" aria-label="Circle Soft Icon Button">
                  <span class="icon-[tabler--shopping-cart] size-5.5 shrink-0"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
          `;
      const container = containers[item.type];
      if (container) {
        container.innerHTML += product;
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

