import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import { styles } from './about-styles';

import { styles as sharedStyles } from '../../styles/shared-styles'

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-about')
export class AppAbout extends LitElement {
  static styles = [
    sharedStyles,
    styles
  ]

  @property() elementDms = {
    top1: '',
    top2: '',
    middle1: '',
    middle2: '',
    bottom1: '',
    bottom2: ''
  }

  @property() value = ['foo', ['lol', 'lak', [1, '2', '3']], {q:1}];

  constructor() {
    super();
    // Update value with nested arrays to test
    this.takeValuesAndPrint(this.value)('last')
  }

  firstUpdated(): void {
    // Get dimensions at starting
    this.getDimensions();
    // Event listener, get dimensions when resizing
    window.addEventListener('resize',
    () => this.getDimensions());
  }

  getDimensions() {
    Object.keys(this.elementDms).forEach(id => {
      this.elementDms = {
        ...this.elementDms,
        [id]: this.calculateDimension(id)
      }
    });
  }

  calculateDimension(id: string) {
    const elem = this.shadowRoot?.querySelector('#'+id);
    const width = elem? getComputedStyle(elem).getPropertyValue('width').replace('px', '') : null;
    const height = elem? getComputedStyle(elem).getPropertyValue('height').replace('px', '') : null;
    return width+'x'+height;
  }

  takeValuesAndPrint(...args: any[]) {
    args.forEach((val: any) => {
      if(typeof val === 'string' || typeof val === 'number') {
        // Is a number or string
        console.log(val)
      }  else if (Array.isArray(val)) {
        // Is an array
        this.takeValuesAndPrint(...val)
      } else {
        // Is an object -> convert to array
        this.takeValuesAndPrint(...Object.entries(val))
      }

    });
    return (val: any) => this.takeValuesAndPrint(val)
  }

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Test 1: Try to resize :)</h2>
        <first-container>
          <card id="top1">
            Top 1
            <p>${this.elementDms.top1}</p>
          </card>
          <card id="top2">
            Top 2
            <p>${this.elementDms.top2}</p>
          </card>
        </first-container>
        <second-container>
          <card id="middle1">
            Middle 1
            <p>${this.elementDms.middle1}</p>
          </card>
          <card id="middle2">
            Middle 2
            <p>${this.elementDms.middle2}</p>
          </card>
        </second-container>
        <third-container>
          <card id="bottom1">
            Bottom 1
            <p>${this.elementDms.bottom1}</p>
          </card>
          <card id="bottom2">
            Bottom 2
            <p>${this.elementDms.bottom2}</p>
          </card>
        </third-container>

        <h2>Test 2: Review function takeValuesAndPrint and open the dev tool</h2>

  </main>
    `;
  }
}
