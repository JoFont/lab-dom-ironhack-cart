// ITERATION 1

let $products = document.querySelectorAll(".product");
let $productContainer = document.querySelector("tbody");


const $newProduct = document.querySelector(".create-product");

$newProduct.addEventListener("click", e => {

  let $name = $newProduct.querySelector("input[type='text']");
  const name = $name.value;

  let $price = $newProduct.querySelector("input[type='number']");
  const price = $price.value;

  if(e.target.id === "create") {
    if(name !== "" && price > 0) {
      let tr = document.createElement("tr");
      tr.setAttribute("class", "product");
      tr.innerHTML = `
      <td class="name">
        <span>${name}</span>
      </td>
      <td class="price">$<span>${price}</span></td>
      <td class="quantity">
        <input type="number" value="1" min="0" placeholder="Quantity" />
      </td>
      <td class="subtotal">$<span>${price}</span></td>
      <td class="action">
        <button class="btn btn-remove">Remove</button>
      </td>
      `;

      $productContainer.appendChild(tr);
      $name.value = "";
      $price.value = "";
      updateTotal();

    } else {
      alert("Please fill required fields!");
    }
  }
  
});

$productContainer.addEventListener("change", e => {

  if(e.target.parentNode.className.includes("quantity")) {
    let $price = e.target.parentNode.previousSibling.previousSibling.querySelector("span");
    let $subtotal = e.target.parentNode.nextSibling.nextSibling.querySelector("span");

    $subtotal.innerText = e.target.value * Number($price.innerText);
    
    updateTotal();
  }
})


$productContainer.addEventListener("click", e => {
  if(e.target.className.includes("btn-remove")) {
    let $item = e.target.parentNode.parentNode;
    $productContainer.removeChild($item);
  }
});

const updateTotal = () => {
  let $productList = document.querySelectorAll(".product");
  let $total = document.getElementById("total-value").querySelector("span");

  let totalPrice = 0;
  
  [...$productList].forEach(product => {
    let t = product.querySelector(".subtotal").querySelector("span")

    totalPrice += parseInt(t.innerText);
  });
  
  $total.innerText = totalPrice;
}