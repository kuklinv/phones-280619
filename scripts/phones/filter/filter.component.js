import {BaseComponent} from "../../shared/componets/base.component.js";

export class FilterComponent extends BaseComponent{
    constructor ({element, search, change}) {
        super({element});
        this._search = search;
        this._change = change;
        this._render();
        this._element.querySelector('.search').addEventListener('input', (e) => {
            let text = e.target.value;
            // console.log(searchEl);
            this._search(text);
            return;
        });
        this._element.querySelector('.sort').addEventListener('change', (e) => {
            let orderBy = e.target.value;
            // console.log(changeEl);
            this._change(orderBy);
            return;
        });
    }
    _render () {
        this._element.innerHTML = `
                <p><i class="fas fa-search"></i>    Search:<input class="search"></p>
                <p><i class="fas fa-sort"></i>    Sort by:
                    <select class="sort">
                        <option value="name">Alphabetical</option>
                        <option value="age">Newest</option>
                    </select>
                </p>
        `;
    }
}