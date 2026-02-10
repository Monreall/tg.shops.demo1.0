const shops = [
  {
    id: 1,
    name: "Магазин 1",
    description: "Одежда и аксессуары",
    workTime: "10:00 – 21:00",
    address: "ул. Центральная, 15",
    telegram: "https://t.me/shop1",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 2,
    name: "Магазин 2",
    description: "Косметика и уход",
    workTime: "09:00 – 20:00",
    address: "пр. Мира, 42",
    telegram: "https://t.me/shop2",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 3,
    name: "Магазин 3",
    description: "Кофейня",
    workTime: "11:00 – 22:00",
    address: "ул. Парковая, 7",
    telegram: "https://t.me/shop3",
    image: "https://via.placeholder.com/300x200"
  }
];

const shopsContainer = document.getElementById("shops");
const details = document.getElementById("shop-details");

const shopName = document.getElementById("shop-name");
const shopDescription = document.getElementById("shop-description");
const shopTime = document.getElementById("shop-time");
const shopAddress = document.getElementById("shop-address");
const shopImages = document.getElementById("shop-images");
const shopTelegram = document.getElementById("shop-telegram");
const backBtn = document.getElementById("back-btn");

function renderShops() {
  shopsContainer.innerHTML = "";

  shops.forEach(shop => {
    const card = document.createElement("div");
    card.className = "shop-card";
    card.innerHTML = `
      <img src="${shop.image}">
      <div class="shop-info">
        <h3>${shop.name}</h3>
        <p>${shop.description}</p>
        <p>⏰ ${shop.workTime}</p>
        <p>📍 ${shop.address}</p>
      </div>
    `;
    card.onclick = () => openShop(shop);
    shopsContainer.appendChild(card);
  });
}

function openShop(shop) {
  shopsContainer.classList.add("hidden");
  details.classList.remove("hidden");

  shopName.textContent = shop.name;
  shopDescription.textContent = shop.description;
  shopTime.textContent = shop.workTime;
  shopAddress.textContent = shop.address;
  shopTelegram.href = shop.telegram;

  shopImages.innerHTML = `<img src="${shop.image}">`;
}

backBtn.onclick = () => {
  details.classList.add("hidden");
  shopsContainer.classList.remove("hidden");
};

renderShops();
