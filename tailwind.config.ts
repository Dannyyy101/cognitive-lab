import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bgColor_default: "var(--bgColor-default)",
        bgColor_muted: "var(--bgColor-muted)",
        bgColor_inset: "var(--bgColor-inset)",
        bgColor_disabled: "var(--bgColor-disabled)",
        bgColor_emphasis: "var(--bgColor-emphasis)",
        bgColor_transparent: "var(--bgColor-transparent)",
        bgColor_inverse: "var(--bgColor-inverse)",

        // Borders
        borderColor_default: "var(--borderColor-default)",
        borderColor_muted: "var(--borderColor-muted)",
        borderColor_emphasis: "var(--borderColor-emphasis)",
        borderColor_disabled: "var(--borderColor-disabled)",
        borderColor_transparent: "var(--borderColor-transparent)",
        borderColor_translucent: "var(--borderColor-translucent)",

        // Foregrounds
        fgColor_default: "var(--fgColor-default)",
        fgColor_muted: "var(--fgColor-muted)",
        fgColor_onEmphasis: "var(--fgColor-onEmphasis)",
        fgColor_disabled: "var(--fgColor-disabled)",
        fgColor_link: "var(--fgColor-link)",
        fgColor_white: "var(--fgColor-white)",

        // Shadows
        shadow_resting_xsmall: "var(--shadow-resting-xsmall)",
        shadow_resting_small: "var(--shadow-resting-small)",
        shadow_resting_medium: "var(--shadow-resting-medium)",
        shadow_floating_small: "var(--shadow-floating-small)",
        shadow_floating_medium: "var(--shadow-floating-medium)",
        shadow_floating_large: "var(--shadow-floating-large)",
        shadow_floating_xlarge: "var(--shadow-floating-xlarge)",
        shadow_inset: "var(--shadow-inset)",

        // Neutral
        fgColor_neutral: "var(--fgColor-neutral)",
        bgColor_neutral_muted: "var(--bgColor-neutral-muted)",
        bgColor_neutral_emphasis: "var(--bgColor-neutral-emphasis)",
        borderColor_neutral_muted: "var(--borderColor-neutral-muted)",
        borderColor_neutral_emphasis: "var(--borderColor-neutral-emphasis)",

        // Accent
        fgColor_accent: "var(--fgColor-accent)",
        bgColor_accent_muted: "var(--bgColor-accent-muted)",
        bgColor_accent_emphasis: "var(--bgColor-accent-emphasis)",
        borderColor_accent_muted: "var(--borderColor-accent-muted)",
        borderColor_accent_emphasis: "var(--borderColor-accent-emphasis)",

        // Success
        fgColor_success: "var(--fgColor-success)",
        bgColor_success_muted: "var(--bgColor-success-muted)",
        bgColor_success_emphasis: "var(--bgColor-success-emphasis)",
        borderColor_success_muted: "var(--borderColor-success-muted)",
        borderColor_success_emphasis: "var(--borderColor-success-emphasis)",

        // Attention
        fgColor_attention: "var(--fgColor-attention)",
        bgColor_attention_muted: "var(--bgColor-attention-muted)",
        bgColor_attention_emphasis: "var(--bgColor-attention-emphasis)",
        borderColor_attention_muted: "var(--borderColor-attention-muted)",
        borderColor_attention_emphasis: "var(--borderColor-attention-emphasis)",

        // Severe
        fgColor_severe: "var(--fgColor-severe)",
        bgColor_severe_muted: "var(--bgColor-severe-muted)",
        bgColor_severe_emphasis: "var(--bgColor-severe-emphasis)",
        borderColor_severe_muted: "var(--borderColor-severe-muted)",
        borderColor_severe_emphasis: "var(--borderColor-severe-emphasis)",

        // Danger
        fgColor_danger: "var(--fgColor-danger)",
        bgColor_danger_muted: "var(--bgColor-danger-muted)",
        bgColor_danger_emphasis: "var(--bgColor-danger-emphasis)",
        borderColor_danger_muted: "var(--borderColor-danger-muted)",
        borderColor_danger_emphasis: "var(--borderColor-danger-emphasis)",

        // Open
        fgColor_open: "var(--fgColor-open)",
        bgColor_open_muted: "var(--bgColor-open-muted)",
        bgColor_open_emphasis: "var(--bgColor-open-emphasis)",
        borderColor_open_muted: "var(--borderColor-open-muted)",
        borderColor_open_emphasis: "var(--borderColor-open-emphasis)",

        // Closed
        fgColor_closed: "var(--fgColor-closed)",
        bgColor_closed_muted: "var(--bgColor-closed-muted)",
        bgColor_closed_emphasis: "var(--bgColor-closed-emphasis)",
        borderColor_closed_muted: "var(--borderColor-closed-muted)",
        borderColor_closed_emphasis: "var(--borderColor-closed-emphasis)",

        // Done
        fgColor_done: "var(--fgColor-done)",
        bgColor_done_muted: "var(--bgColor-done-muted)",
        bgColor_done_emphasis: "var(--bgColor-done-emphasis)",
        borderColor_done_muted: "var(--borderColor-done-muted)",
        borderColor_done_emphasis: "var(--borderColor-done-emphasis)",

        // Sponsors
        fgColor_sponsors: "var(--fgColor-sponsors)",
        bgColor_sponsors_muted: "var(--bgColor-sponsors-muted)",
        bgColor_sponsors_emphasis: "var(--bgColor-sponsors-emphasis)",
        borderColor_sponsors_muted: "var(--borderColor-sponsors-muted)",
        borderColor_sponsors_emphasis: "var(--borderColor-sponsors-emphasis)",
      },
    },
  },
  plugins: [],
} satisfies Config;