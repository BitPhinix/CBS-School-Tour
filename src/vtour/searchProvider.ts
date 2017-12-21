export class SearchProvider {
    static RoomMax : number = 300;
    static RoomMin : number = 0;
    static SpecialRooms : string[] = ["Sekretariat", "Lehrerzimmer", "Physiklabor"];

    private static searchBoxes : {inputElement: HTMLElement, container: HTMLElement}[] = [];

    static registerSearchBox(element : HTMLElement, autoCompleteContainer : HTMLElement) {
        element.addEventListener("input", (e: Event) => this.handleSearchBoxChange(<HTMLInputElement> e.target));
        element.addEventListener("click", (e: Event) => this.handleSearchBoxChange(<HTMLInputElement> e.target));
        SearchProvider.searchBoxes.push({inputElement: element, container: autoCompleteContainer});
    }

    static handleSearchBoxChange(element: HTMLInputElement) {
        const result = SearchProvider.autoComplete(element.value);
        const container = SearchProvider.searchBoxes.find(value => value.inputElement === element).container;
        SearchProvider.searchBoxes.sort((a, b) => a.inputElement === element ? 0 : 1);

        let child;
        while (child = container.firstChild)
            container.removeChild(child);

        for (let text of result) {
            let li = document.createElement("li");
            let p = document.createElement("p");
            let i = document.createElement("i");

            i.setAttribute("class", "fa fa-map-marker");
            li.setAttribute("class", "autoComplete row");
            li.addEventListener("click", (e: Event) => this.handleLiClick(<HTMLElement> e.target));
            p.innerText = text;

            li.appendChild(i);
            li.appendChild(p);

            container.appendChild(li);
        }
    }

    static handleLiClick(element: HTMLElement) {
        let ul = element;
        while (ul && ul.tagName != "UL")
            ul = ul.parentElement;

        if(!ul)
            return;

        const input = <HTMLInputElement> SearchProvider.searchBoxes.find(value => value.container == ul).inputElement;
        input.value = element.outerText;
        SearchProvider.handleSearchBoxChange(input);
    }

    static autoComplete(text: string) : string[] {
        text = text.toLowerCase().trim();

        if(text == "")
            return [];

        const result = SearchProvider.SpecialRooms.filter(value => value.toLowerCase().includes(text));
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if(number <= SearchProvider.RoomMax && number >= SearchProvider.RoomMin)
            result.push("Raum " + number);

        return result;
    }
}