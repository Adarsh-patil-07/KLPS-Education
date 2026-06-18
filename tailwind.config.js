export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface": "#161d1f",
        "tertiary-fixed-dim": "#4de082",
        "surface-variant": "#dde4e6",
        "surface-bright": "#f4fafd",
        "surface-container-highest": "#dde4e6",
        "on-secondary": "#ffffff",
        "surface-dim": "#d4dbdd",
        "background": "#f4fafd",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#ffba20",
        "secondary-fixed-dim": "#81cfff",
        "primary": "#7c5800",
        "secondary-container": "#00baff",
        "on-secondary-container": "#004663",
        "on-tertiary": "#ffffff",
        "secondary-fixed": "#c6e7ff",
        "on-tertiary-fixed": "#00210c",
        "on-primary-fixed-variant": "#5e4200",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-fixed-variant": "#005227",
        "on-background": "#161d1f",
        "outline-variant": "#d5c4ab",
        "on-primary-fixed": "#271900",
        "primary-fixed": "#ffdea8",
        "error-container": "#ffdad6",
        "primary-container": "#ffb800",
        "on-error": "#ffffff",
        "inverse-on-surface": "#ebf2f4",
        "on-secondary-fixed-variant": "#004c6b",
        "tertiary-fixed": "#6dfe9c",
        "on-tertiary-container": "#005e2d",
        "surface-container-low": "#eef5f7",
        "secondary": "#00658d",
        "on-primary-container": "#6b4c00",
        "on-secondary-fixed": "#001e2d",
        "surface": "#f4fafd",
        "inverse-surface": "#2b3234",
        "surface-container-high": "#e2e9ec",
        "on-surface-variant": "#514532",
        "surface-tint": "#7c5800",
        "surface-container": "#e8eff1",
        "inverse-primary": "#ffba20",
        "outline": "#837560",
        "on-error-container": "#93000a",
        "on-primary": "#ffffff",
        "tertiary": "#006d36",
        "tertiary-container": "#4ade80"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "16px",
        "touch-target-min": "48px",
        "container-margin": "24px",
        "card-gap": "24px",
        "unit": "8px"
      },
      fontFamily: {
        "body-lg": ["Poppins"],
        "display-lg-mobile": ["Outfit"],
        "headline-md": ["Outfit"],
        "display-lg": ["Outfit"],
        "body-md": ["Poppins"],
        "label-bold": ["Poppins"]
      },
      fontSize: {
        "body-lg": ["20px", {"lineHeight": "30px", "fontWeight": "500"}],
        "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-md": ["18px", {"lineHeight": "28px", "fontWeight": "500"}],
        "label-bold": ["16px", {"lineHeight": "20px", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
