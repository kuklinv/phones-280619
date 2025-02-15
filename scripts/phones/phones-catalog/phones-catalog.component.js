import {BaseComponent} from "../../shared/componets/base.component.js";
import {PhonesService} from "../phones.service.js";

export const phones = PhonesService.getAll();

export class PhonesCatalogComponent extends BaseComponent {
    constructor({element, onPhoneSelect, addToBasket}) {
        super({element});
        this._phones = [];                             // TODO теперь не будет работать кнопка назад в частности
        this._onPhoneSelect = onPhoneSelect;
        this._addToBasket = addToBasket;
        this._element.addEventListener('click', (e) => {
            let phoneEl = e.target.closest('.phone');
            let toCart = e.target.closest('.addToCart');   // TODO else dont work
            if (phoneEl) {
                return this._onPhoneSelect(phoneEl.dataset.phoneId);
            }
            if (toCart) {
                return this._addToBasket(toCart.dataset.phoneId);
            }

        })
    }
    show(phones) {
        this._phones = phones;
        this._render();
        super.show();
    }

    _render() {                                      // TODO НЕ ВИДИТ что за THIS._PHONES!
        this._element.innerHTML = `
                    <ul class="phones">
                 ${this._phones.map((phone) => `                              
               <li class="thumbnail phone" data-phone-id=${phone.id}>
                    <a href="#!/phones/${phone.id}" class="thumb">
                        <img alt="${phone.name}" src="${phone.imageUrl}">
                    </a>

                    <div class="phones__btn-buy-wrapper">
                        <a class="btn btn-success addToCart">
                            Add
                        </a>
                    </div>

                    <a href="#!/phones/${phone.id}">${phone.name}</a>
                    <p>${phone.snippet}</p>
                </li>`).join('')}   
            </ul>
        `
    }

}
