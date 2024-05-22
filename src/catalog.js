const prodWrap = document.querySelector(".products");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("prod-card");
      product.categories.forEach((category) => {
        div.classList.add(`${category}`);
      });

      const a = document.createElement("a");
      a.href = "product.html";

      const img = document.createElement("img");
      img.src = product.img;

      const title = document.createElement("p");
      title.classList.add("itm-title");
      title.innerText = product.name;

      const price = document.createElement("p");
      price.classList.add("price");
      price.innerText = `$${product.price}`;

      const button = document.createElement("button");
      button.innerText = "Add To Cart";

      a.appendChild(img);
      a.appendChild(title);
      a.appendChild(price);
      div.appendChild(a);
      div.appendChild(button);
      prodWrap.appendChild(div);
    });

    const allProd = document.querySelectorAll(".prod-card");
    allProd.forEach((prodCard) => {
      prodCard.children[0].addEventListener("click", (event) => {
        var itmName = event.currentTarget.children[1].innerText;
        localStorage.setItem("product", itmName);
      });
    });
    allProd.forEach((prodCard) => {
      prodCard.children[1].addEventListener("click", (event) => {
        const cartAr = JSON.parse(localStorage.getItem("cart")) || [];
        const item = event.target.parentNode.children[0].children[1].innerText;
        const quantity = 1;
        cartPush(cartAr, item, quantity);
        updateCartNum();
      });
    });
    // SEARCH BAR
    const searchInput = document.querySelector("#searchinp");
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toUpperCase();
      applyFilter(allProd, filter);
    });
    const filt = localStorage.getItem("filter");
    if (filt) {
      searchInput.value = filt;
      applyFilter(allProd, filt.toUpperCase());
    }

    // SELECT FILTER
    const select = document.querySelector("#select-box");
    const arrow = document.querySelector(".arrow-ic");

    select.addEventListener("focus", () => {
      arrow.style.rotate = "0deg";
    });
    select.addEventListener("focusout", () => {
      arrow.style.rotate = "180deg";
    });

    select.onchange = () => {
      allProd.forEach((product) => {
        if (select.value == "All") {
          product.classList.remove("hidden");
        } else if (select.value == "Rods") {
          product.classList[1] == "rods"
            ? product.classList.remove("hidden")
            : product.classList.add("hidden");
        } else if (select.value == "Lines & Hooks") {
          product.classList[1] == "lines-&-hooks"
            ? product.classList.remove("hidden")
            : product.classList.add("hidden");
        } else if (select.value == "Lures") {
          product.classList[1] == "lures"
            ? product.classList.remove("hidden")
            : product.classList.add("hidden");
        }
      });
      select.blur();
    };
  });

function applyFilter(allProd, filter) {
  allProd.forEach((item) => {
    const textName = item.childNodes[0].children[1].textContent.toUpperCase();
    if (textName.indexOf(filter) > -1) {
      item.classList.remove("hidden2");
    } else {
      item.classList.add("hidden2");
    }
  });
}
