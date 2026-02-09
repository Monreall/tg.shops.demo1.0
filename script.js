const shops = [
  {
    id: 1,
    name: "Магазин 1",
    workTime: "10:00 – 21:00",
    address: "ул. Центральная, 15",
    description: "Одежда и аксессуары для повседневной жизни.",
    telegram: "https://t.me/shop1",
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200"
    ]
  },
  {
    id: 2,
    name: "Магазин 2",
    workTime: "09:00 – 20:00",
    address: "пр. Мира, 42",
    description: "Косметика и товары для ухода.",
    telegram: "https://t.me/shop2",
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200"
    ]
  },
  {
    id: 3,
    name: "Магазин 3",
    workTime: "11:00 – 22:00",
    address: "ул. Парковая, 7",
    description: "Кофейня с авторскими напитками.",
    telegram: "https://t.me/shop3",
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200"
    ]
  }
];

const shopsContainer = document.getElementById('shops');
const detailsScreen = document.getElementById('shop-details');

const shopName = document.getElementById('shop-name');
const shopDescription = document.getElementById('shop-description');
const shopTime = document.getElementById('shop-time');
const shopAddress = document.getElementById('shop-address');
const shopImages = document.getElementById('shop-images');
const shopTelegram = document.getElementById('shop-telegram');
const backBtn = document.getElementById('back-btn');




function renderShops() {
  shopsContainer.innerHTML = '';

  shops.forEach(shop => {
    const div = document.createElement('div');
    div.className = 'shop';
    div.textContent = shop.name;

    div.onclick = () => openShop(shop.id);

    shopsContainer.appendChild(div);
  });
}



renderShops();

function openShop(id) {
  const shop = shops.find(s => s.id === id);

  shopsContainer.classList.add('hidden');
  detailsScreen.classList.remove('hidden');

  shopName.textContent = shop.name;
  shopDescription.textContent = shop.description;
  shopTime.textContent = shop.workTime;
  shopAddress.textContent = shop.address;

  shopImages.innerHTML = '';
  shop.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    shopImages.appendChild(img);
  });

  shopTelegram.href = shop.telegram;
}




backBtn.onclick = () => {
  detailsScreen.classList.add('hidden');
  shopsContainer.classList.remove('hidden');
};


//const tg = window.Telegram.WebApp;

// сообщаем Telegram, что приложение готово
//tg.ready();

// делаем фон под стиль Telegram
//document.body.style.background = tg.themeParams.bg_color || '#ffffff';

// пример: показываем имя пользователя (если есть)
//if (tg.initDataUnsafe?.user) {
  //console.log('Пользователь:', tg.initDataUnsafe.user.first_name);
//}
