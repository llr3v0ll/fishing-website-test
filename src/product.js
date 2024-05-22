const lS = localStorage.getItem("product"),
  wrap = document.querySelector(".wrapper"),
  decrease = document.querySelector("#decrease"),
  increase = document.querySelector("#increase"),
  inp = document.querySelector(".num-inp"),
  add = document.querySelector("#add-to-cart");

decrease.addEventListener("click", () => {
  if (inp.value > 1) {
    inp.value -= 1;
  }
});
increase.addEventListener("click", () => {
  inp.value = Number(inp.value) + 1;
});

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      if (product.name == lS) {
        const title = document.querySelector("#prod-title"),
          img = document.querySelector("#prod-img"),
          price = document.querySelector("#prod-price"),
          desc = document.querySelector("#prod-desc");

        title.innerText = `${product.name}`;
        img.src = product.img;
        price.innerText = `$${product.price}`;
        desc.innerText = product.description;
      }
    });
  });

add.addEventListener("click", () => {
  const cartAr = JSON.parse(localStorage.getItem("cart")) || [];
  const quantity = Number(inp.value);
  cartPush(cartAr, lS, quantity);
  updateCartNum();
});
