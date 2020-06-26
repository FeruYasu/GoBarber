import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;
      background: string;
      text: string;
      calendar: string;
      inputBackground: string;
      card: string;
      cardtext: string;
    };
  }
}
