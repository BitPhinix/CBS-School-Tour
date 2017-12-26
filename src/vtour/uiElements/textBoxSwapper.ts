export class TextBoxSwapper {
    textBox1: HTMLInputElement;
    textBox2: HTMLInputElement;
    
    constructor(textBox1: HTMLInputElement, textBox2: HTMLInputElement, ...swapButtons: HTMLElement[]) {
        this.textBox1 = textBox1;
        this.textBox2 = textBox2;
        
        for (let button of swapButtons)
            this.registerSwapButton(button);
    }

    registerSwapButton(button: HTMLElement) {
        button.addEventListener("click", ev => this.swap());
    }
    
    swap() {
        const temp = this.textBox1.value;
        this.textBox1.value = this.textBox2.value;
        this.textBox2.value = temp;
    }
}