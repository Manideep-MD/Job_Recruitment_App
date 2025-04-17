export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  light: string;
  lightHover: string;
  lightActive: string;
  normal: string;
  normalHover: string;
  normalActive: string;
  dark: string;
  darkHover: string;
  darkActive: string;
  darker: string;
  grey:string
}

export const lightTheme: ThemeColors = {
  primary: '#f28913',
  background: '#FFFFFF',
  text: '#1A1C1E',
  light: '#eae6ff',
  lightHover: '#dfd9ff',
  lightActive: '#bdb0ff',
  normal: '#2b00ff',
  normalHover: '#2700e6',
  normalActive: '#2200cc',
  dark: '#2000bf ',
  darkHover: '#1a0099',
  darkActive: '#130073',
  darker: '#0f0059',
  grey:'#6C7278'
};

export const darkTheme: ThemeColors = {
  primary: '#f28913',
  background: '#121212',
  text: '#1A1C1E',
  light: '#eae6ff',
  lightHover: '#dfd9ff',
  lightActive: '#bdb0ff',
  normal: '#2b00ff',
  normalHover: '#2700e6',
  normalActive: '#2200cc',
  dark: '#2000bf ',
  darkHover: '#1a0099',
  darkActive: '#130073',
  darker: '#0f0059',
  grey:'#6C7278'
};

export type ThemeColorKey = keyof ThemeColors;
