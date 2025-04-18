export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  lightBlue: string;
  borderColor: string;
  buttonColor: string;
  lightBlueHover: string;
  grey: string;
  darkBlue: string;
  darkBlueHover: string;
  cardText: string;
  lightgrey: string;
  checkboxColor: string;
}

export const lightTheme: ThemeColors = {
  primary: '#f28913',
  background: '#FFFFFF',
  text: '#1A1C1E',
  lightBlue: '#4D81E7',
  borderColor: '#6C7278',
  buttonColor: '#1D61E7',
  lightBlueHover: '#3270E9',
  grey: '#6C7278',
  darkBlue: '#3975EA',
  darkBlueHover: '#6B4EFF',
  cardText: '#E7E7FF',
  lightgrey: '#979C9E',
  checkboxColor: '#1F81B9',
};

export const darkTheme: ThemeColors = {
  primary: '#f28913',
  background: '#121212',
  text: '#1A1C1E',
  lightBlue: '#4D81E7',
  borderColor: '#6C7278',
  buttonColor: '#1D61E7',
  lightBlueHover: '#3270E9',
  grey: '#6C7278',
  darkBlue: '#3975EA',
  darkBlueHover: '#6B4EFF',
  cardText: '#E7E7FF',
  lightgrey: '#979C9E',
  checkboxColor: '#1F81B9',
};

export type ThemeColorKey = keyof ThemeColors;
