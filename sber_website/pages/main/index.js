export class MainPage {
    constructor() {
        this.root = document.getElementById('app');
        this.products = this.getSberCards();
        this.transactions = this.getDemoTransactions();
        this.loginHistory = '110111011111101110';
        this.render();
    }

    getSberCards() {
        return [
            {
                id: 1,
                title: "СберПрайм",
                description: "Подписка на лучшие условия",
                image: "https://cdn-icons-png.flaticon.com/512/196/196578.png",
                details: "Полный список привилегий для подписчиков"
            },
            {
                id: 2,
                title: "Кэшбэк до 30%",
                description: "Вернем деньги за покупки",
                image: "https://cdn-icons-png.flaticon.com/512/2553/2553629.png",
                details: "Условия получения максимального кэшбэка"
            },
            {
                id: 3,
                title: "Инвестиции",
                description: "Начните инвестировать от 1000₽",
                image: "https://cdn-icons-png.flaticon.com/512/2721/2721614.png",
                details: "Портфель под ваши цели с аналитикой рисков"
            },
            {
                id: 4,
                title: "Ипотека 5%",
                description: "Льготные условия для семей",
                image: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
                details: "Специальная ставка для семей с детьми"
            }
        ];
    }

    getDemoTransactions() {
        return [
            {category: "Кафе", amount: 500},
            {category: "Супермаркет", amount: 3500},
            {category: "Кафе", amount: 700},
            {category: "Транспорт", amount: 2000},
            {category: "Супермаркет", amount: 4200},
            {category: "Аптека", amount: 800}
        ];
    }

    countIdentic(arr, key) {
        const counts = {};
        arr.forEach(item => counts[item[key]] = (counts[item[key]] || 0) + 1);
        return Object.entries(counts)
                   .filter(([_, count]) => count > 1)
                   .map(([category, count]) => `${category}: ${count} раза`);
    }

    calculateAverage(arr, key) {
        if (arr.length === 0) return 0;
        const sum = arr.reduce((acc, item) => acc + item[key], 0);
        return (sum / arr.length).toFixed(2);
    }

    maxSuccessSequence(logs) {
        if (!logs) return 0;
        return Math.max(...logs.split('0').map(s => s.length));
    }

    isPalindrome(input) {
        const str = String(input).replace(/\s/g, '');
        return str === str.split('').reverse().join('');
    }

    render() {
        this.root.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <div class="d-flex justify-content-between mb-4">
                        <h2><i class="bi bi-percent"></i> Специальные предложения</h2>
                        <button id="add-product-btn" class="btn btn-sber">
                            <i class="bi bi-plus-circle"></i> Добавить
                        </button>
                    </div>
                    <div id="products-container" class="row"></div>
                </div>
                
                <div class="col-md-4">
                    <h2 class="mb-4"><i class="bi bi-graph-up"></i> Аналитика</h2>
                    
                    <div class="analytics-card">
                        <h5><i class="bi bi-repeat"></i> Повторяющиеся расходы</h5>
                        <div id="repeat-transactions" class="my-2"></div>
                        <div class="input-group mb-2">
                            <input type="text" id="new-transaction-category" class="form-control" 
                                   placeholder="Категория">
                            <input type="number" id="new-transaction-amount" class="form-control" 
                                   placeholder="Сумма">
                            <button id="add-transaction-btn" class="btn btn-light">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <small class="text-muted">Добавьте новые транзакции</small>
                    </div>
                    
                    <div class="analytics-card">
                        <h5><i class="bi bi-calculator"></i> Средний чек</h5>
                        <div id="average-check" class="my-2"></div>
                        <button id="reset-transactions-btn" class="btn btn-sm btn-outline-light">
                            Сбросить транзакции
                        </button>
                        <small class="text-muted">По всем категориям</small>
                    </div>
                    
                    <div class="analytics-card">
                        <h5><i class="bi bi-shield-lock"></i> Активность</h5>
                        <div id="login-streak" class="my-2"></div>
                        <div class="input-group mb-2">
                            <input type="text" id="login-history-input" class="form-control" 
                                   value="${this.loginHistory}" placeholder="История входов (1/0)">
                            <button id="update-login-btn" class="btn btn-light">
                                <i class="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>
                        <small class="text-muted">1 - успешный вход, 0 - пропущенный день</small>
                    </div>
                    
                    <div class="palindrome-checker mt-3">
                        <h5><i class="bi bi-credit-card"></i> Проверка карты</h5>
                        <p>Является ли номер вашей карты палиндромом?</p>
                        
                        <div class="input-group mb-2">
                            <input type="text" id="card-number-input" class="form-control" 
                                   placeholder="Введите номер карты">
                            <button id="check-palindrome-btn" class="btn btn-light">
                                <i class="bi bi-check-circle"></i>
                            </button>
                        </div>
                        
                        <div id="palindrome-result" class="alert" style="display:none"></div>
                    </div>
                </div>
            </div>
        `;

        this.renderProducts();
        this.renderAnalytics();
        this.setupEventListeners();
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        this.products.forEach(product => {
            const html = `
                <div class="col-md-6" id="product-${product.id}">
                    <div class="card product-card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-sber details-btn" data-id="${product.id}">
                                    <i class="bi bi-info-circle"></i> Подробнее
                                </button>
                                <button class="btn btn-danger delete-btn" data-id="${product.id}">
                                    <i class="bi bi-trash"></i> Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    }

    renderAnalytics() {
        // Повторяющиеся расходы
        const repeats = this.countIdentic(this.transactions, 'category');
        document.getElementById('repeat-transactions').innerHTML = 
            repeats.length ? repeats.join('<br>') : 'Нет повторяющихся операций';
        
        // Средний чек
        const avgCheck = this.calculateAverage(this.transactions, 'amount');
        document.getElementById('average-check').innerHTML = `
            <span class="badge bg-primary">${avgCheck} ₽</span>
            <small>из ${this.transactions.length} транзакций</small>
        `;
        
        // Последовательные входы
        const maxStreak = this.maxSuccessSequence(this.loginHistory);
        document.getElementById('login-streak').innerHTML = `
            <span class="badge bg-success">Рекорд: ${maxStreak}</span>
            <small>текущая серия: ${this.loginHistory.split('0').pop().length}</small>
        `;
    }

    setupEventListeners() {
        // Добавление продукта
        document.getElementById('add-product-btn').addEventListener('click', () => {
            if (this.products.length === 0) return;
            
            const lastProduct = this.products[this.products.length - 1];
            const newProduct = {
                ...lastProduct,
                id: Date.now(),
                title: `${lastProduct.title} (копия)`
            };
            
            this.products.push(newProduct);
            this.renderProducts();
            this.setupDynamicEventListeners();
        });

        // Добавление транзакции
        document.getElementById('add-transaction-btn').addEventListener('click', () => {
            const categoryInput = document.getElementById('new-transaction-category');
            const amountInput = document.getElementById('new-transaction-amount');
            
            if (!categoryInput.value || !amountInput.value) return;
            
            this.transactions.push({
                category: categoryInput.value,
                amount: parseFloat(amountInput.value)
            });
            
            categoryInput.value = '';
            amountInput.value = '';
            this.renderAnalytics();
        });

        // Сброс транзакций
        document.getElementById('reset-transactions-btn').addEventListener('click', () => {
            this.transactions = this.getDemoTransactions();
            this.renderAnalytics();
        });

        // Обновление истории входов
        document.getElementById('update-login-btn').addEventListener('click', () => {
            const input = document.getElementById('login-history-input');
            if (/^[01]+$/.test(input.value)) {
                this.loginHistory = input.value;
                this.renderAnalytics();
            } else {
                alert('Введите только 0 и 1 (0 - пропущенный день, 1 - успешный вход)');
            }
        });

        // Проверка палиндрома
        document.getElementById('check-palindrome-btn').addEventListener('click', () => {
            const cardNumber = document.getElementById('card-number-input').value.replace(/\s/g, '');
            const resultDiv = document.getElementById('palindrome-result');
            
            if (!cardNumber) {
                resultDiv.textContent = 'Введите номер карты';
                resultDiv.className = 'alert alert-warning';
                resultDiv.style.display = 'block';
                return;
            }
            
            if (this.isPalindrome(cardNumber)) {
                resultDiv.innerHTML = `
                    <strong>Поздравляем!</strong> Ваша карта с номером ${cardNumber} 
                    является палиндромом! <br>
                    <a href="#" class="alert-link text-white">Узнайте о специальных условиях</a>
                `;
                resultDiv.className = 'alert alert-success';
            } else {
                resultDiv.textContent = `Номер ${cardNumber} не является палиндромом`;
                resultDiv.className = 'alert alert-light';
            }
            
            resultDiv.style.display = 'block';
        });

        this.setupDynamicEventListeners();
    }

    setupDynamicEventListeners() {
        document.getElementById('products-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
                const button = e.target.classList.contains('delete-btn') ? e.target : e.target.closest('.delete-btn');
                const productId = parseInt(button.dataset.id);
                this.deleteProduct(productId);
            }
            
            if (e.target.classList.contains('details-btn') || e.target.closest('.details-btn')) {
                const button = e.target.classList.contains('details-btn') ? e.target : e.target.closest('.details-btn');
                const productId = parseInt(button.dataset.id);
                this.showProductDetails(productId);
            }
        });
    }

    deleteProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
            productElement.remove();
        }
    }

    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        this.root.innerHTML = `
            <div class="details-page">
                <div class="card border-0">
                    <img src="${product.image}" class="card-img-top" style="max-height: 300px; object-fit: contain;">
                    <div class="card-body">
                        <h2 class="card-title">${product.title}</h2>
                        <p class="card-text lead">${product.description}</p>
                        <div class="card-text">
                            <h5>Подробности:</h5>
                            <p>${product.details}</p>
                        </div>
                        <button id="back-btn" class="btn btn-sber mt-3">
                            <i class="bi bi-arrow-left"></i> Назад к предложениям
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('back-btn').addEventListener('click', () => {
            this.render();
        });
    }
}