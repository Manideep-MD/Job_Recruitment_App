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
  cardDescriptionText: string;
  placeholderTextColor: string
}

export const lightTheme: ThemeColors = {
  primary: '#f28913',
  background: '#FFFFFF',
  text: '#141414',
  lightBlue: '#4D81E7',
  borderColor: '#E4E5E8',
  buttonColor: '#1D61E7',
  lightBlueHover: '#3270E9',
  grey: '#6C7278',
  darkBlue: '#3975EA',
  darkBlueHover: '#6B4EFF',
  cardText: '#E7E7FF',
  lightgrey: '#979C9E',
  checkboxColor: '#1F81B9',
  cardDescriptionText: '#141414B2',
  placeholderTextColor:'#BBBBBB'
};

export const darkTheme: ThemeColors = {
  primary: '#f28913',
  background: '#121212',
  text: '#1A1C1E',
  lightBlue: '#4D81E7',
  borderColor: '#E4E5E8',
  buttonColor: '#1D61E7',
  lightBlueHover: '#3270E9',
  grey: '#6C7278',
  darkBlue: '#3975EA',
  darkBlueHover: '#6B4EFF',
  cardText: '#E7E7FF',
  lightgrey: '#979C9E',
  checkboxColor: '#1F81B9',
  cardDescriptionText: '#141414B2',
  placeholderTextColor:'#BBBBBB'
};

export type ThemeColorKey = keyof ThemeColors;
