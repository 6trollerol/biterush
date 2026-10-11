if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
} else if (localStorage.getItem("role") !== "admin") {
  window.location.href = "index.html";
}

const productURL = "/products";
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imgURLInput = document.getElementById("img");
const ingredientsInput = document.getElementById("ingredients");
const descriptionInput = document.getElementById("description");
const typeInput = document.getElementById("type");
const addButton = document.getElementById("addProductBtn");
const productTable = document.getElementById("productTable");

fetch(productURL)
.then(res => res.json())
.then(data => {
    data.forEach(item => {
        const product = `
            <tr class="border-b border-gray-700 hover:bg-gray-700/50">
            <td class="p-3">
                <img src="${item.img}" class="h-12 w-12 object-cover rounded" alt="${item.name}" >
            </td>
            <td class="text-gray-300 p-3">${item.name}</td>
            <td class="text-gray-300 p-3 capitalize">${item.type}</td>
            <td class="text-gray-300 p-3">${item.price}</td>
            <td class="p-3 space-x-2">
                <button onclick="openEditModal('${item.id}')" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white">Edit</button>
                <button onclick="deleteProduct('${item.id}')" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">Delete</button>
            </td>
            </tr>
        `;
        productTable.innerHTML +=product;
    });
})
.catch(err => {
    console.error("Error:", err);
    productTable.innerHTML = '<tr><td colspan="5" class="text-center p-4 text-red-400">Error loading products</td></tr>';
});



addButton.addEventListener("click", () => {
    addProduct();
});

function addProduct() {
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const img = imgURLInput.value.trim();
    const ingredients = ingredientsInput.value.trim();
    const description = descriptionInput.value.trim();
    const type = typeInput.value;

    const newProduct = {
        name,
        price,
        img,
        ingredients,
        description,
        type
    };

    fetch(productURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
        alert("Product added successfully!");
        clearForm();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Server error! Please try again.");
    });
}

function clearForm() {
    nameInput.value = "";
    priceInput.value = "";
    imgURLInput.value = "";
    ingredientsInput.value = "";
    descriptionInput.value = "";
    typeInput.selectedIndex = 0;
}

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editIdInput = document.getElementById("editId");
const editNameInput = document.getElementById("editName");
const editPriceInput = document.getElementById("editPrice");
const editImgInput = document.getElementById("editImg");
const editIngredientsInput = document.getElementById("editIngredients");
const editDescriptionInput = document.getElementById("editDescription");
const editTypeInput = document.getElementById("editType");
const cancelEditBtn = document.getElementById("cancelEditBtn");

function openEditModal(id) {
    fetch(`${productURL}/${id}`)
        .then(res => res.json())
        .then(product => {
            editIdInput.value = product.id;
            editNameInput.value = product.name;
            editPriceInput.value = product.price;
            editImgInput.value = product.img;
            editIngredientsInput.value = product.ingredients;
            editDescriptionInput.value = product.description;
            editTypeInput.value = product.type;
            editModal.classList.remove("hidden");
            editModal.classList.add("flex");
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Error loading product data!");
        });
}

function closeEditModal() {
    editModal.classList.add("hidden");
    editModal.classList.remove("flex");
}

function updateProduct(e) {
    e.preventDefault();
    const id = editIdInput.value;
    const updatedProduct = {
        name: editNameInput.value.trim(),
        price: editPriceInput.value.trim(),
        img: editImgInput.value.trim(),
        ingredients: editIngredientsInput.value.trim(),
        description: editDescriptionInput.value.trim(),
        type: editTypeInput.value
    };

    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.img || 
        !updatedProduct.ingredients || !updatedProduct.description) {
        alert("Please fill in all fields!");
        return;
    }

    fetch(`${productURL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(res => res.json())
    .then(data => {
        alert("Product updated successfully!");
        closeEditModal();
        location.reload();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Error updating product!");
    });
}
editForm.addEventListener("submit", updateProduct);
cancelEditBtn.addEventListener("click", closeEditModal);


function deleteProduct(id) {
    const confirmDelete = confirm("Do you want to delete this item?");
    if (confirmDelete == false) {
        return;
    }

    fetch(`${productURL}/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert("Product deleted successfully!");
        location.reload();
    })
    .catch(err=> {
        alert("Error deleting product.");
    });
}