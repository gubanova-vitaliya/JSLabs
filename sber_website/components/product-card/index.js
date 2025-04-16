export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card" style="width: 18rem;">
                <img src="${data.src}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <a href="#" class="btn btn-success">Подробнее</a>
                </div>
            </div>
            `
        );
    }
    
    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}