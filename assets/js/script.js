const author = document.querySelector(".name");
const changeBgBtn = document.querySelector("#changeBg");
const copyBtn = document.querySelector("#copy");
const downloadBtn = document.querySelector("#download");
const soundBtn = document.querySelector("#sound");
const soundEffect = document.querySelector("#soundEffect");
const soundIcon = document.querySelector("#sound i");
const alertMsg = document.querySelector("#alert");
const card = document.querySelector(".card");
const body = document.body;

const bgModal = document.querySelector("#bgModal");
const galleryGrid = document.querySelector("#galleryGrid");
const closeModalBtn = document.querySelector("#closeModal");

const API = "https://api.quotable.io/random";

// Список фонових зображень
const backgrounds = [
    "assets/img/background1.jpg",
    "assets/img/background2.jpg",
    "assets/img/background3.jpg",
    "assets/img/background4.jpg",
    "assets/img/background5.jpg",
    "assets/img/background6.jpg",
    "assets/img/background7.jpg",
    "assets/img/background8.jpg",
    "assets/img/background9.jpg",
    "assets/img/background10.jpg",
    "assets/img/background11.jpg"
];

// Функція для зміни фону
function setBackground(url) {
    body.style.background = `url("${url}") no-repeat center center fixed`;
    body.style.backgroundSize = `cover`;
}

// Заповнення галереї зображеннями
function populateGallery() {
    // Додаємо 11 зображень з масиву
    backgrounds.forEach(url => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `<img src="${url}" alt="Фонове зображення">`;
        galleryItem.addEventListener('click', () => {
            setBackground(url);
            bgModal.classList.remove('active');
        });
        galleryGrid.appendChild(galleryItem);
    });

    // Додаємо опцію для завантаження власного зображення
    const uploadItem = document.createElement('div');
    uploadItem.classList.add('upload-item');
    uploadItem.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i><p>Завантажити власне фото</p>`;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    uploadItem.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackground(e.target.result);
                bgModal.classList.remove('active');
            };
            reader.readAsDataURL(file);
        }
    });

    uploadItem.appendChild(fileInput);
    galleryGrid.appendChild(uploadItem);
}

// Event Listeners
changeBgBtn.addEventListener("click", () => {
    bgModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    bgModal.classList.remove('active');
});

// Закриття модального вікна при кліку на оверлей
bgModal.addEventListener('click', (e) => {
    if (e.target === bgModal) {
        bgModal.classList.remove('active');
    }
});

copyBtn.addEventListener("click", () => {
    const textToCopy = `"${document.querySelector(".quote").textContent}" - ${author.textContent}`;
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alertMsg.classList.add("show");
    setTimeout(() => {
        alertMsg.classList.remove("show");
    }, 1000);
});

soundBtn.addEventListener("click", () => {
    if (soundEffect.paused) {
        soundEffect.play();
        soundIcon.classList.remove("fa-volume-high");
        soundIcon.classList.add("fa-volume-xmark");
    } else {
        soundEffect.pause();
        soundEffect.currentTime = 0; // Reset to the beginning
        soundIcon.classList.remove("fa-volume-xmark");
        soundIcon.classList.add("fa-volume-high");
    }
});

downloadBtn.addEventListener('click', () => {
    // Додаємо тимчасовий клас, щоб приховати елементи, які не мають бути на зображенні
    document.body.classList.add('capture-mode');

    // Захоплюємо весь body
    html2canvas(document.body, {
        useCORS: true,
        scale: 2, // Вища роздільна здатність для кращої якості
    }).then(canvas => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'quote.png';
        a.click();

        // Після захоплення видаляємо тимчасовий клас
        document.body.classList.remove('capture-mode');
    });
});

// Initial setup
populateGallery();