export class SlideOut {
    opened: boolean = false;
    slideOut: HTMLElement;

    constructor(slideOut: HTMLElement, ...toggles: HTMLElement[])
    {
        if(toggles)
            for (let toggle of toggles)
                this.registerToggle(toggle);

        slideOut.style.marginLeft = "-1000px";
        slideOut.style.transition = "margin 0.2s ease";
        this.slideOut = slideOut;
    }

    registerToggle(toggle: HTMLElement) {
        toggle.addEventListener("click", ev => this.toggle());
    }

    toggle() {
        if(this.opened)
            this.slideOut.style.marginLeft = "-1000px";
        else
            this.slideOut.style.marginLeft = "0";

        this.opened = !this.opened;
    }
}