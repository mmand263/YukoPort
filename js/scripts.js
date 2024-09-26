// Scroll-triggered animation for content items
const items = document.querySelectorAll('.content-item');

const showItemsOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if(itemTop < triggerBottom) {
            item.classList.add('show');
        } else {
            item.classList.remove('show');
        }
    });
};

window.addEventListener('scroll', showItemsOnScroll);
