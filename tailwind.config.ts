import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
      fontSize: {
        h1: '48px',
        h2: '44px',
        h3: '32px',
        b1: '24px',
        b2: '20px',
        b3: '16px',
      },
      colors: {
        font_gray: '#B0B0B0',
        font_dark_gray: '#7E7E7E',
        bg_light_gray: '#B1B1B1',
        font_black: '#393939',
        divider: '#E2E2E2',
        main_orange: '#FB7E23',
        bg_orange: '#FFF9F5',
        disabled_orange: '#FFEADB',
        accent_orange: '#F9CFB2',
        btn_disabled: '#E9E9E9',
        icon_gray: '#DEDEDE',
        alert_delete: '#FF5555',
        light_orange: '#FFF9F5',
        default_disabled: '#A1A1A1',
      },
      boxShadow: {
        card_shadow: '0px 19px 64px 8px rgba(0, 0, 0, 0.04)',
      },
    },
  },

  plugins: [require('daisyui')],
};
export default config;
