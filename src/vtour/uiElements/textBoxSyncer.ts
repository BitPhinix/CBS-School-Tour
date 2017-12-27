export class TextBoxSyncer {
    textBoxes: HTMLInputElement[] = [];
    
    constructor(...textBoxes: HTMLElement[]) {
        for (let textBox of textBoxes)
            this.registerTextBox(<HTMLInputElement> textBox);
    }

    registerTextBox(textBox: HTMLInputElement) {
        textBox.addEventListener("input", (e: Event) => this.update((<HTMLInputElement> e.target).value));
        this.textBoxes.push(textBox);
    }
    
    update(text: string) {
        for (let textBox of this.textBoxes)
            textBox.value = text;
    }
}