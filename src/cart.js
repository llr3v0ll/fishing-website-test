const products = document.querySelector(".products");

const items = JSON.parse(localStorage.getItem("cart"));
const promises = items.map((item) => {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        if (product.name == item.name) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
          <div class="left">
            <img src="${product.img}" />
            <div class="text-cont">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
            </div>
          </div>
          <div class="quantity">
            <button id="decrease"><</button>
            <input type="number" min="1" value="${
              item.quantity
            }" class="num-inp" onKeyDown="return false" onchange="akmg()" />
            <button id="increase">></button>
            <svg id="del-but" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white" />
              <path d="M5 7.5H19L18 21H6L5 7.5Z" stroke="currentColor" stroke-linejoin="round" />
              <path d="M15.5 9.5L15 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 9.5V19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.5 9.5L9 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8" stroke="currentColor" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="${product.price} prc" >$${(
            product.price * item.quantity
          ).toFixed(2)}</h3>
          `;
          products.appendChild(card);
        }
      });
    });
});

Promise.all(promises).then(() => {
  const decrease = document.querySelectorAll("#decrease");
  const increase = document.querySelectorAll("#increase");
  const dels = document.querySelectorAll("#del-but");
  const total = document.querySelector("#total");

  decrease.forEach((decreaseI) => {
    decreaseI.addEventListener("click", (e) => {
      const inp = e.currentTarget.parentNode.children[1];
      if (inp.value > 1) {
        const price = e.currentTarget.parentNode.parentNode.children[2];
        const toRemove = Number(price.classList[0]);
        var priceNum = Number(price.innerText.replace("$", ""));
        price.innerText = `$${(priceNum - toRemove).toFixed(2)}`;
        inp.value -= 1;
        changeCart(inp, false);
        updateTotal(total);
      }
    });
  });

  increase.forEach((increaseI) => {
    increaseI.addEventListener("click", (e) => {
      const price = e.currentTarget.parentNode.parentNode.children[2];
      const toAdd = Number(price.classList[0]);
      var priceNum = Number(price.innerText.replace("$", ""));
      price.innerText = `$${(priceNum + toAdd).toFixed(2)}`;
      const inp = e.currentTarget.parentNode.children[1];
      inp.value = Number(inp.value) + 1;
      changeCart(inp, true);
      updateTotal(total);
    });
  });

  dels.forEach((del) => {
    del.addEventListener("click", (e) => {
      const itms = JSON.parse(localStorage.getItem("cart"));
      const newAr = [];
      itms.forEach((itm) => {
        if (
          itm.name !=
          e.currentTarget.parentNode.parentNode.children[0].children[1]
            .children[0].innerText
        ) {
          console.log("plm");
          newAr.push(itm);
        }
        localStorage.setItem("cart", JSON.stringify(newAr));
        location.reload();
      });
    });
  });

  updateTotal(total);
});
function changeCart(inp, bool) {
  const itms = JSON.parse(localStorage.getItem("cart"));
  itms.forEach((itm) => {
    if (
      itm.name ==
      inp.parentNode.parentNode.children[0].children[1].children[0].innerText
    ) {
      if (bool) {
        itm.quantity += 1;
      } else {
        itm.quantity -= 1;
      }
    }
  });
  localStorage.setItem("cart", JSON.stringify(itms));
}

function updateTotal(total) {
  var totalI = 0;
  document.querySelectorAll(".card").forEach((item) => {
    totalI += Number(item.children[2].innerText.replace("$", ""));
  });
  total.innerText = `$${totalI.toFixed(2)}`;
}
