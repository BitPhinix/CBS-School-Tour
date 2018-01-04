export class AutoComplete {
    RoomMax : number = 300;
    RoomMin : number = 0;
    SpecialRooms : string[] = ["Sekretariat", "Lehrerzimmer", "Physiklabor"];

    container : HTMLElement;
    activeSearchBox: HTMLInputElement;

    constructor(container: HTMLElement, ...searchBoxes: HTMLElement[]) {
        this.container = container;

        if(searchBoxes)
            for (let searchBox of searchBoxes)
                this.registerSearchBox(searchBox);

        window.addEventListener("click", (e: Event) => this.handleDocumentClick(e));
    }

    registerSearchBox(element : HTMLElement) {
        element.addEventListener("input", (e: Event) => this.handleSearchBoxChange(<HTMLInputElement> e.target));
        element.addEventListener("click", (e: Event) => this.handleSearchBoxClick(e));
    }

    private clearContainer() {
        let child;
        while (child = this.container.firstChild)
            this.container.removeChild(child);
    }

    handleSearchBoxClick(event: Event) {
        event.stopPropagation();
        this.handleSearchBoxChange(<HTMLInputElement> event.target);
    }

    handleSearchBoxChange(element: HTMLInputElement) {
        this.activeSearchBox = element;

        const result = this.autoComplete(element.value);
        this.clearContainer();

        for (let text of result) {
            let li = document.createElement("li");
            let p = document.createElement("p");
            let i = document.createElement("i");

            i.setAttribute("class", "fa fa-map-marker");
            li.setAttribute("class", "autoComplete row");
            li.addEventListener("click", (e: Event) => this.handleLiClick(e));
            p.innerText = text;

            li.appendChild(i);
            li.appendChild(p);

            this.container.appendChild(li);
        }
    }

    isInContainer(element: HTMLElement) {
        let ul = element;

        while (ul && ul.tagName != "UL")
            ul = ul.parentElement;

        return ul && ul === this.container;
    }

    handleDocumentClick(event: Event) {
        if(this.container.children || this.container.children.length < 1)
            this.clearContainer();
    }

    handleLiClick(event: Event) {
        const element = <HTMLElement> event.target;

        if(!this.isInContainer(element))
            return;

        this.activeSearchBox.value = element.outerText;
        this.activeSearchBox.dispatchEvent(new Event("input"));
        this.clearContainer();
    }

     autoComplete(text: string) : string[] {
        text = text.toLowerCase().trim();

        if(text == "")
            return [];

        const result = this.SpecialRooms.filter(value => value.toLowerCase().includes(text));
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if(number <= this.RoomMax && number >= this.RoomMin)
            result.push("Raum " + number);

        return result;
    }
}