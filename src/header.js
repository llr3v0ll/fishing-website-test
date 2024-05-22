const searchI = document.querySelector("#search_icon"),
  sForm = document.querySelector(".search-form-wrapper"),
  rForm = document.querySelector(".search-form-header");
headerSection = document.querySelector("header");

searchI.addEventListener("click", () => {
  if (sForm.style.transform.slice(-6, -3) > 0) {
    sForm.style = `
      transform: translateY(0);
    `;
  } else {
    sForm.style = `
      transform: translateY(${headerSection.offsetHeight}px);
  `;
  }
});

rForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("filter", `${rForm.children[0].value}`);
  window.location.pathname = "src/catalog.html";
});

const catalog = document.querySelector(".header-catalog");
catalog.addEventListener("click", () => {
  localStorage.removeItem("filter");
});

updateCartNum();

function updateCartNum() {
  const count = document.querySelector(".cart-number"),
    items = JSON.parse(localStorage.getItem("cart")) || undefined;
  var counter = 0;
  if (items) {
    count.style.display = "flex";
    items.forEach((item) => {
      counter += item.quantity;
    });
  } else {
    count.style.display = "none";
  }
  count.innerText = counter;
}
function cartPush(cartAr, item, quantity) {
  if (cartAr.length > 0) {
    let itemFound = false;
    for (let i = 0; i < cartAr.length; i++) {
      if (cartAr[i].name == item) {
        cartAr[i].quantity += quantity;
        itemFound = true;
        break;
      }
    }
    if (!itemFound) {
      cartAr.push({ name: item, quantity: 1 });
    }
  } else {
    cartAr.push({ name: item, quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cartAr));
}
