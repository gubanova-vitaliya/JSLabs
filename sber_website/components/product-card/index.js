export class ProductCardComponent {
    constructor(parent, deleteCallback, detailsCallback) {
        this.parent = parent;
        this.deleteCallback = deleteCallback;
        this.detailsCallback = detailsCallback;
    }

    getHTML(data) {
        return (
            `
            <div class="card" style="width: 18rem;" data-id="${data.id}">
                <img src="${data.src}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="d-flex justify-content-between">
                        <a href="#" class="btn btn-success details-btn">Подробнее</a>
                        <button class="btn btn-danger delete-btn">Удалить</button>
                    </div>
                </div>
            </div>
            `
        );
    }
    
    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Добавляем обработчики событий
        const cardElement = this.parent.querySelector(`[data-id="${data.id}"]`);
        cardElement.querySelector('.delete-btn').addEventListener('click', () => {
            this.deleteCallback(data.id);
        });
        
        cardElement.querySelector('.details-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.detailsCallback(data);
        });
    }
}