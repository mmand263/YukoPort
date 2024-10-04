// Scroll-triggered animation for content items
const items = document.querySelectorAll('.content-item');

// Function to show items on scroll
const showItemsOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('show');
        }
    });
};

// Initial state: add the scroll event listener
window.addEventListener('scroll', showItemsOnScroll);
