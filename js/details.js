const productURL = "/products";
const productId = new URLSearchParams(window.location.search).get("id");
fetch(`${productURL}?id=${productId}`)
.then(res => res.json())
.then(data => { 
    const productImg = document.getElementById("productImage");
    productImg.src = data[0].img;
    const productName = document.getElementById("productName");
    productName.textContent = data[0].name;
    const productPrice = document.getElementById("productPrice");
    productPrice.textContent = data[0].price;
    const productType = document.getElementById("productType");
    productType.textContent = data[0].type;
    const productIngredients = document.getElementById("productIngredients");
    productIngredients.textContent = data[0].ingredients;
    const productDescription = document.getElementById("productDescription");
    productDescription.textContent = data[0].description;

})
.catch(err => {
    console.log(err);
});

if (localStorage.getItem("isLoggedIn")=== false){
    window.location.href="login.html"
}

document.getElementById('signOutBtn').addEventListener('click', function() {
    window.location.href = './login.html';
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("username");
    localStorage.removeItem("role");
 });