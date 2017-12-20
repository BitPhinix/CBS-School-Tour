export class SearchProvider {
    static RoomMax : number = 300;
    static RoomMin : number = 0;
    static SpecialRooms : string[] = ["Sekretariat", "Lehrerzimmer", "Physiklabor"];
    static autoCompleteContainer = document.getElementById("autoCompleteContainer");

    static registerSearchBox(element : HTMLElement) {
        element.addEventListener("input", (e: Event) => this.handleSearchBoxChange(<HTMLInputElement> e.target))
    }

    static handleSearchBoxChange(element: HTMLInputElement) {
        const result = SearchProvider.autocomplete(element.value);

        let child;
        while (child = SearchProvider.autoCompleteContainer.firstChild)
            SearchProvider.autoCompleteContainer.removeChild(child);


        for (let text of result) {
            let li = document.createElement("li");
            let p = document.createElement("p");
            let i = document.createElement("i");
            i.setAttribute("class", "fa fa-map-marker");
            p.innerText = text;

            li.setAttribute("class", "autoComplete row");
            li.appendChild(i);
            li.appendChild(p);

            SearchProvider.autoCompleteContainer.appendChild(li);
        }
    }

    static autocomplete(text: string) : string[] {
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