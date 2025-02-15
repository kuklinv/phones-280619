import {PhonesCatalogComponent} from './phones-catalog/phones-catalog.component.js'
import {PhoneDetailsComponent} from './phone-details/phone-details.component.js'
import {PhonesService} from './phones.service.js'
import {ShoppingCartComponent} from "./shopping-cart/shoppingCart.component.js";
import {FilterComponent} from "./filter/filter.component.js";

export class PhonesComponent {
    constructor({element}) {
        this._element = element;
        this._render();
        this._initCatalog();
        this._initDetails();
        this._initCart();
        this._initFilter();

    }

    _initCatalog() {
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            onPhoneSelect: (phoneid) => {
                const phonesDetails = PhonesService.getOneById(phoneid);
                this._catalog.hide();
                this._details.show(phonesDetails);
            },
            addToBasket: (phoneid) => {
                this._shoppingCart.add(phoneid);
            }
        });
        this._showFilteredPhones();
    }

    _initDetails() {
        this._details = new PhoneDetailsComponent({
            element: this._element.querySelector('.phone-details'),
            backButtonSelect: () => {
                this._showFilteredPhones();
                this._details.hide();
            },
            addToBasket: (phoneid) => {
                this._shoppingCart.add(phoneid);
            }
        });
    }

    _initCart() {
        this._shoppingCart = new ShoppingCartComponent({
            element: this._element.querySelector('.shopping-cart')
        });
    }

    _initFilter() {
        this._filter = new FilterComponent({
            element: this._element.querySelector('.filter'),
            search: (text) => {
                this.text = text;
                this._showFilteredPhones();
            },
            change: (orderBy) => {
                this.orderBy = orderBy;
                this._showFilteredPhones();
            }
        });
    }

    _showFilteredPhones() {
        PhonesService.getAll({text: this.text, orderBy: this.orderBy})
          .then(phones => this._catalog.show(phones));
    }
    _render() {
        this._element.innerHTML = `
            <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
            <section class="filter"></section>

            <section class="shopping-cart"></section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
            <div class="phones-catalog"></div>
            <div class="phone-details"></div>
        </div>
    </div>`
    }

}
