const products = [
  {name:"Potato Chips", price:20, category:"snacks", img:"https://images.unsplash.com/photo-1585238342024-78d387f4a707"},
  {name:"Almonds", price:120, category:"nuts", img:"https://images.unsplash.com/photo-1590086782792-42dd2350140d"},
  {name:"Marie Biscuits", price:30, category:"biscuits", img:"https://images.unsplash.com/photo-1589987607627-8a6e92cba6f6"},
  {name:"Cold Drink", price:40, category:"drinks", img:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13"},
  {name:"Rice", price:60, category:"ration", img:"https://images.unsplash.com/photo-1586201375761-83865001e31c"}
];

let cart = [];

function displayProducts(list){
  let container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach((p,i)=>{
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add</button>
      </div>
    `;
  });
}

displayProducts(products);

document.getElementById("searchInput").addEventListener("keyup", function(){
  let val = this.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(val)));
});

function filterProducts(cat){
  if(cat==="all") displayProducts(products);
  else displayProducts(products.filter(p => p.category===cat));
}

function addToCart(i){
  cart.push(products[i]);
  updateCart();
}

function updateCart(){
  let list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";
  cart.forEach(item=>{
    total += item.price;
    list.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
  });
  document.getElementById("total").innerText = total;
}

function orderWhatsApp(){
  let phone="919876543210";
  let msg="Order:%0A";
  cart.forEach(i=> msg+=`${i.name} - ₹${i.price}%0A`);
  msg+=`Total: ₹${document.getElementById("total").innerText}`;
  window.open(`https://wa.me/${phone}?text=${msg}`);
}

// PWA install
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  let btn = document.createElement("button");
  btn.innerText = "Install App";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    deferredPrompt.prompt();
  });
});
