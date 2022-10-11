import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const styles = css`

  card {
    width: 100%
    border: azure;
    border-width: 2px;
    border-style: groove;
    background: gray;
    flex-grow: 1;
    height: 5em;
    padding: 1em
  }

  first-container {
    display: flex;
    flex-direction: row;
  }

  second-container {
    display: flex;
    flex-direction: row;
  }

  second-container card:not(:first-child) {
    flex-grow: 2
  }

  second-container card {
    height: 15em;
  }

  second-container card:not(:first-child) {
    flex-grow: 2
  }

  third-container {
    display: flex;
    flex-direction: row;
  }

  third-container card:not(:first-child) {
    display: none;
  }

  third-container card {
    height: 3em;
  }

  @media(max-width: 1024px) {
    second-container card:first-child {
      display: none;
    }
  }

  @media(max-width: 800px) {

    first-container {
      flex-direction: column;
    }

    third-container {
      flex-direction: column;
    }

    third-container card:not(:first-child) {
      display: block;
    }

  }

  print-container {
    margin: 2em
    height: 5em;
  }

`;