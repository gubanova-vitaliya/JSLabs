import { ProductCardComponent } from '../../components/product-card/index.js';
import { DetailsPage } from '../details/index.js';

export class MainPage {
    constructor() {
        this.root = document.getElementById('app');
        this.data = this.getData();
        this.nextId = this.data.length + 1;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://cdn-icons-png.flaticon.com/512/196/196578.png",
                title: "СберПрайм",
                text: "Подписка на лучшие условия по кредитам и вкладам",
                details: "СберПрайм — это подписка, которая дает вам особые условия по кредитам, вкладам и другим финансовым продуктам."
            },
            {
                id: 2,
                src: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                title: "Кэшбэк до 30%",
                text: "Вернем деньги за покупки у партнеров",
                details: "Получайте кэшбэк до 30% при оплате картой Сбербанка у наших партнеров."
            },
            {
                id: 3,
                src: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
                title: "Ипотека 5%",
                text: "Льготная ипотека для семей с детьми",
                details: "Специальная ипотечная программа для семей с детьми по ставке от 5% годовых."
            },
            {
                id: 4,
                src: "https://cdn-icons-png.flaticon.com/512/2721/2721614.png",
                title: "Инвестиции",
                text: "Начните инвестировать от 1000 рублей",
                details: "Платформа для инвестиций с минимальным порогом входа и обучающими материалами."
            },
            {
                id: 5,
                src: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
                title: "Страхование",
                text: "Защита для вас и вашей семьи",
                details: "Различные программы страхования жизни, здоровья и имущества."
            },
            {
                id: 6,
                src: "https://cdn-icons-png.flaticon.com/512/2553/2553629.png",
                title: "Бизнес онлайн",
                text: "Все для предпринимателей",
                details: "Комплексные решения для бизнеса: расчётный счёт, эквайринг, кредиты."
            }
        ];
    }

    deleteCard(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.renderCards();
    }

    showDetails(data) {
        this.root.innerHTML = '';
        const detailsPage = new DetailsPage(data, () => this.render());
        detailsPage.render();
    }

    addNewCard() {
        if (this.data.length === 0) return;
        
        const lastCard = this.data[this.data.length - 1];
        const newCard = {
            ...lastCard,
            id: this.nextId++,
            title: `${lastCard.title} (копия)`
        };
        
        this.data.push(newCard);
        this.renderCards();
    }

    renderCards() {
        const pageRoot = document.getElementById('main-page');
        pageRoot.innerHTML = '';
        
        this.data.forEach((item) => {
            const productCard = new ProductCardComponent(
                pageRoot, 
                (id) => this.deleteCard(id),
                (data) => this.showDetails(data)
            );
            productCard.render(item);
        });
    }

    render() {
        this.root.innerHTML = `
            <div class="d-flex justify-content-end mb-3">
                <button id="add-card-btn" class="btn btn-primary">Добавить карточку</button>
            </div>
            <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
        `;
        
        this.renderCards();
        
        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.addNewCard();
        });
    }
}