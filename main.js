
async function fetchProfileData() {
    try {

        const response = await fetch('http://localhost:5000/api/profile');
        const data = await response.json();

        document.getElementById('pub-count').innerText = data.stats.published;
        document.getElementById('down-count').innerText = data.stats.downloads;
        document.getElementById('likes-count').innerText = data.stats.likes;
        

        document.querySelector('.username').innerText = data.username;

    } catch (error) {
        console.error("Не вдалося завантажити дані з бекенду:", error);
    }
}


window.addEventListener('DOMContentLoaded', fetchProfileData);

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.scroll-container');
    if (!slider) return; 

    let isDown = false;
    let startX;
    let scrollLeft;

    // Коли затиснули кнопку миші
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    // Коли мишка вилетіла за межі блока категорій
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    // Рух мишкою
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; 
        e.preventDefault();  
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; // Швидкість скролу (можна поставити 3 для швидшого)
        slider.scrollLeft = scrollLeft - walk;
        e.preventDefault()
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cart[data-href]");

    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            // Якщо клікнули на кнопку або на елемент всередині кнопки — нікуди не переходимо
            if (event.target.closest("button")) {
                return; 
            }
            
            // Інакше — переходимо на сторінку схеми
            const url = card.getAttribute("data-href");
            if (url) {
                window.location.href = url;
            }
        });
    });
});