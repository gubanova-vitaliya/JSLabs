export class AnalyticsCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(title, value, description) {
        return `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title text-success">
                            <i class="bi bi-currency-exchange"></i> ${title}
                        </h5>
                        <div class="card-text py-2">
                            ${value}
                        </div>
                        <small class="text-muted">
                            <i class="bi bi-info-circle"></i> ${description}
                        </small>
                    </div>
                </div>
            </div>
        `;
    }

    render(title, value, description) {
        const html = this.getHTML(title, value, description);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}