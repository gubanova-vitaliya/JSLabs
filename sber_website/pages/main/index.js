import { ProductCardComponent } from '../../components/product-card/index.js';

export class MainPage {
    constructor() {
        this.root = document.getElementById('app');
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://cdn-icons-png.flaticon.com/512/196/196578.png",
                title: "СберПрайм",
                text: "Подписка на лучшие условия по кредитам и вкладам"
            },
            {
                id: 2,
                src: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                title: "Кэшбэк до 30%",
                text: "Вернем деньги за покупки у партнеров"
            },
            {
                id: 3,
                src: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
                title: "Ипотека 5%",
                text: "Льготная ипотека для семей с детьми"
            },
            {
                id: 4,
                src: "https://cdn-icons-png.flaticon.com/512/2721/2721614.png",
                title: "Инвестиции",
                text: "Начните инвестировать от 1000 рублей"
            },
            {
                id: 5,
                src:"https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
                title: "Страхование",
                text: "Защита для вас и вашей семьи"
            },
            {
                id: 6,
                src:"https://cdn-icons-png.flaticon.com/512/2553/2553629.png",
                title: "Бизнес онлайн",
                text: "Все для предпринимателей"
            }
        ];
    }

    render() {
        this.root.innerHTML = `
            <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
        `;
        
        const pageRoot = document.getElementById('main-page');
        const data = this.getData();
        
        data.forEach((item) => {
            const productCard = new ProductCardComponent(pageRoot);
            productCard.render(item);
        });
    }
}