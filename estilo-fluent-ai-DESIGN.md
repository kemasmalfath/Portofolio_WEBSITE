# Design System: Estilo Fluent AI

## 1. Definição do Estilo

- **Nome:** Estilo Fluent AI
- **Tipo:** Clean, Professional, Adaptive
- **Keywords:** AI, productivity, cloud, enterprise, intelligent, adaptive, clean, professional, modern, integrated
- **Era:** 2026+ AI-Powered Productivity
- **Light/Dark:** ✓ Full / ✓ Full (com alternância de tema)

## 2. Paleta de Cores

- **Primárias:** Azul Corporativo #0078D4, Branco #FFFFFF, Cinza Escuro #2F2F2F, Cinza Claro #F2F2F2
- **Secundárias:** Verde-azulado #008080, Verde #107C10, Roxo #5C2D91, Laranja #FF8C00

## 3. Efeitos Visuais

Fluent Design System, sombras sutis, gradientes dinâmicos, micro-interações suaves, tipografia clara (sans-serif), elementos adaptativos, animações de transição de dados, ícones minimalistas.

## 4. AI Prompt Keywords

Design a clean and professional landing page for an AI assistant. Use: Fluent Design principles, corporate blue accents, subtle shadows, dynamic gradients, smooth micro-interactions, clear typography, adaptive elements, AI data transition animations, integrated and modern feel.

## 5. CSS Technical

```css
background: #FFFFFF, color: #2F2F2F, box-shadow: 0 4px 8px rgba(0,0,0,0.1), border-radius: 4px, font-family: "Segoe UI, Arial, sans-serif", transition: all 0.3s ease-in-out, background-image: linear-gradient(to bottom right, #F2F2F2, #FFFFFF), .fluent-shadow, .assistant-animation.
```

## 6. Design System Variables

```css
--corp-blue: #0078D4, --white: #FFFFFF, --dark-grey: #2F2F2F, --light-grey: #F2F2F2, --fluent-shadow-strength: 0.1, --border-radius-sm: 4px, --font-ui: "Segoe UI, Arial, sans-serif".
```

## 7. Checklist de Implementação

- ☐ Princípios Fluent Design
- ☐ Sombras sutis
- ☐ Gradientes dinâmicos
- ☐ Tipografia clara
- ☐ Elementos adaptativos
- ☐ Foco em produtividade com IA.

## 8. Visual Theme & Atmosphere

Estilo Fluent AI — Design tech-inspired com ai, productivity, cloud. Template e prompt pronto para IA. Estilo Estilo Fluent AI representa uma tendência moderna em design UI/UX web com foco em tech-inspired.

- Density: 3/10 — Airy
- Variance: 3/10 — Restrained
- Motion: 4/10 — Subtle

## 9. Color Palette & Roles

- **Azul Corporativo** (#0078D4) — Accent highlight, links and focus states
- **Branco** (#FFFFFF) — Light surface, card backgrounds
- **Cinza Escuro** (#2F2F2F) — Dark surface, primary background
- **Cinza Claro** (#F2F2F2) — Secondary text, borders, muted elements
- **Verde-azulado** (#008080) — Success states, positive indicators
- **Verde** (#107C10) — Success states, positive indicators
- **Roxo** (#5C2D91) — Accent color, emphasis elements
- **Laranja** (#FF8C00) — Warm accent, call-to-action secondary

## 10. Typography Rules

- **Display / Hero:** Segoe UI — Weight 700, tight tracking, used for headline impact
- **Body:** Segoe UI — Weight 400, 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** Segoe UI — 0.875rem, weight 500, slight letter-spacing
- **Monospace:** JetBrains Mono — Used for code, metadata, and technical values

Scale:
- Hero: clamp(2.5rem, 5vw, 4rem)
- H1: 2.25rem
- H2: 1.5rem
- Body: 1rem / 1.6
- Small: 0.875rem

## 11. Component Stylings

- **Primary Button:** Rounded (4px) shape. Accent color fill. Hover: 8% darken + subtle lift shadow. Active: -1px translate tactile press. Font weight 600. No outer glows.
- **Secondary / Ghost Button:** Outline variant. 1.5px border in muted color. Text in primary color. Hover: subtle background fill.
- **Cards:** Rounded (4px) corners. Surface background. Subtle shadow (0 2px 12px rgba(0,0,0,0.06)). 1px border stroke.
- **Inputs:** Label above input. 1px border stroke. Focus ring: 2px accent color offset 2px. Error text below in semantic red. No floating labels.
- **Navigation:** Primary surface background. Active item: accent color indicator. Font weight 500 when active.
- **Skeletons:** Shimmer animation matching component dimensions. No circular spinners.
- **Empty States:** Icon-based composition with descriptive text and action button.

## 12. Layout Principles

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(4rem, 8vw, 8rem).
- **Hero layout:** Split-screen (text left, visual right).
- **Feature sections:** Zig-zag alternating text+image rows. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. No horizontal overflow.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).

## 13. Motion & Interaction

- **Physics:** Ease-out curves, 200-300ms duration. Smooth and predictable.
- **Entry animations:** Fade + translate-Y (16px → 0) over 420ms ease-out. Staggered cascades for lists: 80ms between items.
- **Hover states:** Subtle color shift + shadow adjustment over 200ms.
- **Page transitions:** Fade only (200ms).
- **Performance:** Only transform and opacity animated. No layout-triggering properties.

## 14. Anti-Patterns (Banned)

- No emojis in UI — use icon system only (Lucide, Heroicons)
- No pure black (#000000) — use off-black or charcoal variants
- No oversaturated accent colors (saturation cap: 80%)
- No 3-column equal-width feature layouts — use zig-zag or asymmetric grid
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos

## Contexto Histórico

Estilo Estilo Fluent AI representa uma tendência moderna em design UI/UX web com foco em tech-inspired.

## Caso de Uso

Landing pages, Websites modernas
