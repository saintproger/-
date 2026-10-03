// Премиальная база данных коллекции
const products = [
    { 
        id: 1, 
        title: "L'Étoile Diamond Ring", 
        category: "jewelry", 
        desc: "Исключительное кольцо из белого золота 18 карат. Дизайн разработан в Парижском ателье и подчёркивает безупречную чистоту камня.", 
        price: "1 250 000 ₽",
        images: [
            "https://unsplash.com",
            "https://unsplash.com"
        ],
        details: ["Материал: Белое золото 18K", "Камень: Бриллиант «Ашер» 2.5ct", "Сертификат: GIA 2026", "Сделано во Франции"]
    },
    { 
        id: 2, 
        title: "Or Noir Eau de Parfum", 
        category: "perfume", 
        desc: "Селективный парфюм, раскрывающийся глубокими древесными аккордами. Флакон выполнен из гранёного чёрного хрусталя ручной работы.", 
        price: "34 000 ₽",
        images: [
            "https://unsplash.com",
            "https://unsplash.com"
        ],
        details: ["Объем: 100 мл", "Группа: Древесно-восточные", "Ноты: Чёрный уд, амбра, мадагаскарская ваниль", "Стойкость: до 24 часов"]
    },
    { 
        id: 3, 
        title: "Croco Tailored Clutch", 
        category: "accessories", 
        desc: "Вечерний клатч строгого силуэта. Каждое изделие имеет уникальный природный рисунок кожи и создается индивидуально под заказ.", 
        price: "480 000 ₽",
        images: [
            "https://unsplash.com",
            "https://unsplash.com"
        ],
        details: ["Кожа: Нильский крокодил (матовая)", "Фурнитура: Палладиевое напыление", "Размер: 22 х 12 х 4 см", "В комплекте: Шёлковый пыльник"]
    },
    { 
        id: 4, 
        title: "Saphir Éternel Necklace", 
        category: "jewelry", 
        desc: "Колье с глубокими кашмирскими сапфирами в окружении россыпи бриллиантов огранки «маркиз».", 
        price: "2 890 000 ₽",
        images: [
            "https://unsplash.com",
            "https://unsplash.com"
                ],
        details: ["Камни: Кашмирские сапфиры 4.2ct", "Огранка бриллиантов: «Маркиз»", "Плетение: Ручное, платина 950", "Лимитированная серия"]
    },
    { 
        id: 5, 
        title: "Mystique Rose Essence", 
        category: "perfume", 
        desc: "Концентрированное парфюмерное масло на основе лепестков дамасской розы, собранных на рассвете.", 
        price: "42 000 ₽",
        images: [
            "https://unsplash.com",
            "https://unsplash.com"
        ],
        details: ["Тип: Парфюмерный экстракт (масло)", "Основа: Дамасская роза", "Объем: 30 мл", "Страна: Оман"]
    },
    { 
        id: 6, 
        title: "Silk Heritage Scarf", 
        category: "accessories", 
        desc: "Шёлковый платок со сложным архивным орнаментом, подшитый вручную мастерами в Лионе.", 
        price: "65 000 ₽",
        images: [
            "https://unsplash.com",
            "https://unsplash.com"
        ],
        details: ["Материал: 100% натуральный шёлк", "Обработка края: Ручной роуль", "Размер: 90 х 90 см", "Фабрика: Лион, Франция"]
    }
];

const catalogGrid = document.getElementById('catalogGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('#filterGroup .btn');
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

let currentFilter = 'all';
let searchQuery = '';

function renderCatalog() {
    catalogGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #8c8c8c; font-weight:300; padding: 60px; font-size:13px; letter-spacing:1px;">НЕТ СОВПАДЕНИЙ В КОЛЛЕКЦИИ</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('onclick', `openProductDetails(${product.id})`);
        
        const displayImg = (product.images && product.images.length > 0) ? product.images[0] : '';
        
        card.innerHTML = `
            <div class="img-wrapper"> 
                <img class="product-img" src="${displayImg}" alt="${product.title}" loading="lazy">
            </div> 
            <div class="product-info"> 
                <span class="product-category">${getCategoryName(product.category)}</span> 
                <h3 class="product-title">${product.title}</h3> 
                <p class="product-desc">${product.desc}</p> 
                <div class="product-price">${product.price}</div> 
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const names = { jewelry: "Ювелирные изделия ", perfume: "Парфюмерия", accessories: "Аксессуары", clothes:"Одежда" };
    return names[cat] || cat;
}

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCatalog();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderCatalog();
    });
});

function openProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalTitle').innerText = product.title;
    document.getElementById('modalDesc').innerText = product.desc;
    document.getElementById('modalPrice').innerText = product.price;
    document.getElementById('modalCategory').innerText = getCategoryName(product.category);

    const mainImg = document.getElementById('modalMainImg');
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = ''; 

    if (product.images && product.images.length > 0) {
        mainImg.style.display = "block";
        mainImg.src = product.images[0]; 

        product.images.forEach((imgUrl, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgUrl;
            thumb.className = `thumb-img ${index === 0 ? 'active' : ''}`;
            
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = imgUrl;
                    mainImg.style.opacity = '1';
                }, 150);
            });
            
            thumbnailsContainer.appendChild(thumb);
        });
    } else {
        mainImg.style.display = "none";
    }

    const detailsContainer = document.getElementById('modalDetails');
    detailsContainer.innerHTML = ''; 
    
    if (product.details && product.details.length > 0) {
        product.details.forEach(detailText => {
            const li = document.createElement('li');
            li.innerText = detailText;
            detailsContainer.appendChild(li);
        });
    }

    modal.style.display = 'flex';
}

closeModal.addEventListener('click', (e) => { e.stopPropagation(); modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

renderCatalog();
