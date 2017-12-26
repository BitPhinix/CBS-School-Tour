export class SlideOut {

    constructor(sliderOut: HTMLElement, ...toggles: HTMLElement[])
    {
        if(toggles)
            for (let toggle of toggles)
                toggle.addEventListener("click", ev => this.HandleToggleClick());
    }

    HandleToggleClick() {

    }
}