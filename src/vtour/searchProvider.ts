export class SearchProvider {
    static RoomMax : number = 300;
    static RoomMin : number = 0;
    static SpecialRooms : string[] = ["Sekretariat", "Lehrerzimmer", "Physiklabor"];

    private static searchBoxes : {inputElement: HTMLElement, container: HTMLElement}[] = [];
    private static swapButtons : {button: HTMLElement, input1: HTMLInputElement, input2: HTMLInputElement}[] = [];

    static registerSwapButton(button: HTMLElement, input1: HTMLElement, input2: HTMLElement) {
        button.addEventListener("click", (e: Event) => this.handleSwapButtonClick(<HTMLInputElement> e.target) )
        SearchProvider.swapButtons.push({button: button, input1: <HTMLInputElement> input1, input2: <HTMLInputElement> input2});
    }

    static registerSearchBox(element : HTMLElement, autoCompleteContainer : HTMLElement) {
        element.addEventListener("input", (e: Event) => this.handleSearchBoxChange(<HTMLInputElement> e.target));
        element.addEventListener("click", (e: Event) => this.handleSearchBoxChange(<HTMLInputElement> e.target));
        SearchProvider.searchBoxes.push({inputElement: element, container: autoCompleteContainer});
    }

    private static handleSwapButtonClick (button: HTMLElement){
        const info = SearchProvider.swapButtons.find(value => value.button === button);

        const text1 = info.input1.value;
        info.input1.value = info.input2.value;
        info.input2.value = text1;
    }

    private static getContainer(element: HTMLInputElement) : HTMLElement {
        const container = SearchProvider.searchBoxes.find(value => value.inputElement === element).container;
        SearchProvider.searchBoxes.sort((a, b) => a.inputElement === element ? 0 : 1);
        return container;
    }

    private static clearContainer(container: HTMLElement) {
        let child;
        while (child = container.firstChild)
            container.removeChild(child);
    }

    static handleSearchBoxChange(element: HTMLInputElement) {
        const result = SearchProvider.autoComplete(element.value);
        const container = SearchProvider.getContainer(element);

        SearchProvider.clearContainer(container);

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
        SearchProvider.clearContainer(ul);
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