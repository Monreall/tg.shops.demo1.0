
const shops = [
  {
    id: 1,
    name: "Магазин 1",
    description: "Одежда и аксессуары для повседневной жизни.",
    workTime: "10:00 – 21:00",
    address: "Тотурбиева, напротив Севиллы",
    telegram: "https://t.me/monreall",
    cover: 'covers/1.jpg',

    images: ["images/shop.jpeg",
            'images/shop.jpeg',
            "images/shop.jpeg",
          ]
    
  },
  {
    id: 2,
    name: "Магазин 2",
    description: "Магазин сотовой связи.",
    workTime: "09:00 – 20:00",
    address: "Напротив ТЦ Джинан",
    telegram: "https://t.me/monreall",
    cover: "covers/2.jpg",
    images: ["images/mobile.jpg",
            'images/mobile.jpg',
            "images/mobile.jpg",
          ]
  },
  {
    id: 3,
    name: "Магазин 3",
    description: "Кофейня с авторскими напитками.",
    workTime: "11:00 – 22:00",
    address: "Возле ворот главного рынка",
    telegram: "https://t.me/monreall",
    cover: "covers/3.jpg",
    images: ["images/coffee.jpg",
            'images/coffee.jpg',
            "images/coffee.jpg",
          ]

    
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
  <img src="${shop.cover}">
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

  shopImages.innerHTML = "";

  shop.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy"; // ← ВОТ ОН
    shopImages.appendChild(img);
});
}
backBtn.onclick = () => {
  details.classList.add("hidden");
  shopsContainer.classList.remove("hidden");
};

renderShops();