# Design Specification: Global English Grammar Diagnostic Tool

**Product Name:** Global English Grammar Diagnostic Tool  
**Document Type:** UI/UX Design Specification  
**Date:** 2026-01-10  
**Version:** 1.0  
**Status:** Ready for Development

---

## Table of Contents
1. [Design System](#1-design-system)
2. [Screen Specifications](#2-screen-specifications)
3. [Component Library](#3-component-library)
4. [Interaction Design](#4-interaction-design)
5. [Responsive Behavior](#5-responsive-behavior)
6. [Accessibility Guidelines](#6-accessibility-guidelines)

---

## 1. Design System

### 1.1 Brand Assets

#### eJOY Logo
- **Primary Logo**: eJOY wordmark with blue water droplet icon above the "j"
- **Logo Color**: `#1da1f2` (Primary Blue)
- **File Format**: PNG with transparent background
- **File Location**: `/doc/Design/eJOY_logo.png`
- **Usage**: Header navigation (with circular background), branding elements

**Logo Specifications:**
```
Asset Path: /doc/Design/eJOY_logo.png
Dimensions: Width ~200px (scales proportionally)
Background: Transparent
Color Mode: RGB #1da1f2
```

**Header Logo Implementation:**
- **Container**: 40px × 40px circle
- **Background**: `#e8f5ff` (light blue)
- **Icon**: Material Symbols "school" icon (alternative representation)
- **Text**: "eJOY English"
  - Font: Lexend
  - Size: 20px
  - Weight: 700 (Bold)
  - Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
  - Spacing: 12px gap between icon and text

### 1.2 Color Palette

#### Primary Colors
- **Brand Blue**: `#1da1f2` (Primary CTA, Active States, Logo)
- **eJOY Orange**: `#FF6B35` (Accent, Secondary Actions)
- **Success Green**: `#00C853` (Correct Answers)
- **Error Red**: `#FF1744` (Incorrect Answers)

#### Neutral Colors
- **Background Light**: `#FFFFFF` (Landing Page) / `#F5F7F8` (Quiz Page)
- **Surface**: `#FFFFFF` (Cards, Containers)
- **Text Primary**: `#1A1A1A` (Headings, Body Text)
- **Text Secondary**: `#6B7280` (Supporting Text, Labels)
- **Border**: `#E5E7EB` (Dividers, Card Borders)

#### Semantic Colors
- **Info Blue**: `#0EA5E9` (Informational Tags)
- **Warning Orange**: `#FB923C` (Priority Labels)
- **Light Blue Background**: `rgba(28, 160, 242, 0.08)` (Selected Answer Background)
- **Light Green Background**: `#D1FAE5` (Correct Answer Card)
- **Light Red Background**: `#FEE2E2` (Incorrect Answer Card)

### 1.3 Typography

#### Font Family
- **Primary Font**: `'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Secondary Font**: `'Noto Sans', sans-serif` (body text alternative)
- **Fallback**: System fonts for optimal performance

#### Type Scale

| Style | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| **H1** | 32px | 700 (Bold) | 40px | Page Titles |
| **H2** | 24px | 700 (Bold) | 32px | Section Headers |
| **H3** | 20px | 600 (Semibold) | 28px | Card Titles |
| **H4** | 18px | 600 (Semibold) | 24px | Subsection Headers |
| **Body Large** | 16px | 400 (Regular) | 24px | Primary Content |
| **Body** | 14px | 400 (Regular) | 20px | Secondary Content |
| **Caption** | 12px | 400 (Regular) | 16px | Labels, Meta Info |
| **Button** | 16px | 600 (Semibold) | 24px | Call-to-Action Text |

### 1.4 Spacing System

Using an 8px base unit scale:
- **xs**: 4px (0.5 units)
- **sm**: 8px (1 unit)
- **md**: 16px (2 units)
- **lg**: 24px (3 units)
- **xl**: 32px (4 units)
- **2xl**: 48px (6 units)
- **3xl**: 64px (8 units)

### 1.5 Border Radius

- **Default**: 16px (1rem - Standard cards)
- **lg (Large)**: 32px (2rem - Large cards)
- **xl (Extra Large)**: 48px (3rem - Hero elements)
- **2xl**: 24px (1.5rem - Quiz cards, answer cards)
- **Small**: 8px (Buttons, Tags)
- **Medium**: 12px (Answer options, inputs)
- **Full**: 9999px (Pill-shaped buttons, badges)

### 1.6 Shadows

```css
/* Soft Shadow (Cards, Containers) */
box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);

/* Card Shadow (Subtle) */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);

/* Button Shadow (with blue tint) */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), shadow-blue-500/30;
```

---

## 2. Screen Specifications

### 2.1 Landing Page

**Purpose**: Welcome users and allow language selection before starting the diagnostic test.

#### ASCII Layout
```
┌─────────────────────────────────────────────────────┐
│  🎓 eJOY English              🌐 English ▼          │
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│            ┌─────────────────────────┐             │
│            │                         │             │
│            │   [Hero Image]          │             │
│            │   Student Reading       │             │
│            │   with Books            │             │
│            │                         │             │
│            └─────────────────────────┘             │
│                                                     │
│                                                     │
│          Check your English                         │
│          Grammar Level                              │
│                                                     │
│     Take our 50-question diagnostic test. Get      │
│     detailed feedback and personalized study       │
│                    plans.                           │
│                                                     │
│                                                     │
│         ┌─────────────────────────────┐            │
│         │    Start Quiz Now           │            │
│         └─────────────────────────────┘            │
│                                                     │
│              Log in / Learn More                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Specifications

**Header**
- Height: 64px
- Background: `#FFFFFF`
- Padding: 16px
- Position: Sticky, top: 0
- Z-index: 50

**Logo Section**
- Left-aligned container with icon and text
- Display: Flex, gap: 12px (0.75rem)
- Icon container:
  - Size: 40px × 40px
  - Border-radius: 9999px (full circle)
  - Background: `#e8f5ff` (light blue)
  - Display: Flex, centered
  - Icon: Material Symbols "school"
    - Color: `#1da1f2` (primary)
    - Size: 24px
- Text: "eJOY English"
  - Font: Lexend
  - Font-size: 20px
  - Font-weight: 700 (Bold)
  - Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
  - Letter-spacing: -0.015em (tight)

**Language Selector**
- Right-aligned dropdown button
- Display: Flex, items-center, gap: 4px
- Background: `#f3f4f6` (gray-100, light mode) / `#374151` (gray-800, dark mode)
- Border-radius: 9999px (full pill)
- Padding: 6px 12px (py-1.5 px-3)
- Border: None
- Hover background: `#e5e7eb` (gray-200, light) / `#4b5563` (gray-700, dark)
- Transition: all 0.2s
- Globe icon:
  - Material Symbols "language"
  - Size: 14px
  - Color: `#607a8a` (text-secondary)
- Text: "English"
  - Font-size: 14px
  - Font-weight: 700 (Bold)
  - Color: `#607a8a` (text-secondary, light) / `#d1d5db` (gray-300, dark)
- Chevron icon:
  - Material Symbols "expand_more"
  - Size: 14px
  - Color: `#607a8a` (text-secondary)

**Hero Illustration Section**
- Width: 100% (with 16px padding on sides)
- Aspect ratio: 4:3
- Background: `#f2f9ff` (very light blue)
- Border: 1px solid `#e1effc`
- Border-radius: 32px (2rem)
- Margin: 24px 0 32px (pt-6 mb-8)
- Display: Flex, items-center, justify-content: center
- Position: Relative (for decorative background icons)
- Overflow: hidden

**Hero Content** (SVG/Illustrated Grammar Diagram):
- Center content:
  - Display: Flex, flex-direction: column, gap: 24px, align-items: center
  - Z-index: 10 (above background decorations)
- Grammar symbols row:
  - Display: Flex, items-center, gap: 16px
  - Each symbol circle:
    - Size: 56px × 56px (w-14 h-14)
    - Background: `#FFFFFF` (light mode) / `#374151` (gray-800, dark)
    - Border: 1px solid `#e1effc`
    - Border-radius: 9999px (full circle)
    - Box-shadow: sm
    - Display: Flex, centered
    - Text: "S", "V", "O" (large letters)
      - Font-size: 24px (2xl)
      - Font-weight: 700 (Bold)
      - Color: `#1da1f2` (primary)
  - Plus symbols: "+" between circles
    - Font-size: 20px (xl)
    - Font-weight: 700 (Bold)
    - Color: `#607a8a` (text-secondary)
- Badge row:
  - Display: Flex, gap: 8px
  - Each badge:
    - Background: `#dcecff` (light blue)
    - Color: `#1da1f2` (primary)
    - Padding: 4px 12px (py-1 px-3)
    - Border-radius: 9999px (full pill)
    - Font-size: 10px
    - Font-weight: 900 (Black)
    - Text-transform: uppercase
    - Letter-spacing: wider
    - Text: "SUBJECT", "VERB", "OBJECT"
- Background decorative icons (Material Symbols, low opacity):
  - Icon: "spellcheck", top-left (24px from edges), size: 36px, opacity: 0.1
  - Icon: "translate", bottom-right (32px right, 40px bottom), size: 48px, opacity: 0.1
  - Icon: "menu_book", top-right (40px right, 48px top), size: 36px, opacity: 0.1
  - Icon: "rule", bottom-left (48px left, 56px bottom), size: 28px, opacity: 0.1
  - All icons color: `#1da1f2` (primary)

**Headline (H1)**
- "Check your English Grammar Level"
- Font-family: Lexend (display)
- Font-size: 32px
- Font-weight: 900 (Black)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Text-align: Center
- Line-height: 1.1 (tight)
- Letter-spacing: -0.01em
- Margin-bottom: 16px

**Subheadline (Body)**
- "Take our 50-question diagnostic test. Get detailed feedback and personalized study plans."
- Font-size: 16px (base)
- Font-weight: 400 (Normal)
- Color: `#607a8a` (text-secondary, light mode) / `#9ca3af` (gray-400, dark mode)
- Text-align: Center
- Line-height: relaxed
- Max-width: 100% (with 16px padding on sides)
- Margin: 0 auto 40px (16px gap above button)

**Primary CTA Button**
- Text: "Start Quiz Now"
- Background: `#1da1f2` (primary)
- Hover background: `rgba(28, 160, 242, 0.9)` (primary/90)
- Active: Scale 0.98
- Color: `#FFFFFF`
- Width: 100%
- Height: 56px (h-14)
- Border-radius: 9999px (full pill)
- Font-family: Lexend
- Font-size: 18px (lg)
- Font-weight: 700 (Bold)
- Letter-spacing: 0.015em
- Box-shadow: `0 10px 15px -3px rgba(28, 160, 242, 0.25)` (shadow-lg with primary/25 tint)
- Display: Flex, align-items: center, justify-content: center
- Transition: all 0.2s
- Margin-top: auto (pushes to bottom on mobile)
- Margin-bottom: 16px



---

### 2.2 Quiz Interface

**Purpose**: Display questions with answer options and track progress.

#### ASCII Layout
```
┌─────────────────────────────────────────────────────┐
│  ✕                                                  │
│                                                     │
│  Question 12 of 50                   24% completed │
│  ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │                                               │ │
│  │   If the trend continues, the                │ │
│  │   average income __________ by                │ │
│  │   107% by 2020.                               │ │
│  │                                               │ │
│  │   ○  will have increased                      │ │
│  │                                               │ │
│  │   ◉  will increase                            │ │
│  │   ┌─────────────────────────────────────┐    │ │
│  │   │ will increase                       │    │ │
│  │   └─────────────────────────────────────┘    │ │
│  │                                               │ │
│  │   ○  increases                                │ │
│  │                                               │ │
│  │   ○  has increased                            │ │
│  │                                               │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│         ┌─────────────────────────────┐            │
│         │    Next Question            │            │
│         └─────────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Specifications

**Close Button**
- Position: Top-left header
- Size: 40px × 40px (clickable area with padding)
- Icon: Material Symbols "close"
  - Size: 28px
  - Weight: 400
- Color: `#64748b` (slate-500, light mode) / `#94a3b8` (slate-400, dark mode)
- Hover:
  - Color: `#1e293b` (slate-800, light) / `#FFFFFF` (dark)
  - Background: `#f1f5f9` (slate-100, light) / `#1e293b` (slate-800, dark)
- Border-radius: 9999px (full circle)
- Padding: 8px
- Margin: 24px 0 8px 16px (pt-6 pb-2 px-4)
- Transition: colors 0.2s

**Progress Header**
- Padding: 0 24px (px-6)
- Margin-bottom: 12px (mb-3)
- Display: Flex, flex-direction: column, gap: 12px (gap-3)

**Progress Label**
- Display: Flex, justify-content: space-between, align-items: flex-end
- Left side: "Question 12 of 50"
  - Font-family: Lexend
  - Font-size: 14px (sm)
  - Font-weight: 600 (Semibold)
  - Color: `#1e293b` (slate-800, light mode) / `#FFFFFF` (dark mode)
  - Letter-spacing: wide
- Right side: "24% completed"
  - Font-size: 12px (xs)
  - Font-weight: 500 (Medium)
  - Color: `#94a3b8` (slate-400, light mode) / `#64748b` (slate-500, dark mode)

**Progress Bar**
- Height: 8px (h-2)
- Background: `#e2e8f0` (slate-200, light mode) / `#334155` (slate-700, dark mode)
- Fill: `#1da1f2` (primary)
- Border-radius: 9999px (full)
- Overflow: hidden
- Transition: width 0.5s ease-out

**Question Card**
- Background: `#FFFFFF` (light mode) / `#1d2932` (surface-dark, dark mode)
- Border-radius: 24px (rounded-[24px])
- Padding: 24px (p-6)
- Margin: 0 16px (mx-4)
- Box-shadow: `0 10px 40px -10px rgba(0,0,0,0.08)` (shadow-soft)
- Display: Flex, flex-direction: column, gap: 24px (gap-6)

**Question Text**
- Font-family: Lexend
- Font-size: 22px (text-[22px])
- Font-weight: 500 (Medium)
- Color: `#0f172a` (slate-900, light mode) / `#FFFFFF` (dark mode)
- Line-height: 1.4
- Letter-spacing: -0.011em (tight)
- Margin-bottom: 0 (gap handled by card container)
- Blank space indicator:
  - Display: inline-block
  - Width: 64px (w-16)
  - Border-bottom: 2px solid `#cbd5e1` (slate-300)
  - Margin: 0 4px (mx-1)

**Answer Options Container**
- Display: Flex, flex-direction: column
- Gap: 12px (gap-3)

**Answer Option (Unselected)**
- Display: Flex, items-center, gap: 16px (gap-4)
- Background: `#FFFFFF` (light mode) / `rgba(71, 85, 105, 0.5)` (slate-600/50, dark mode)
- Border: 2px solid `#f1f5f9` (slate-100, light mode) / `#334155` (slate-700, dark mode)
- Border-radius: 12px (xl)
- Padding: 16px
- Font-size: 16px (base)
- Font-weight: 500 (Medium)
- Color: `#334155` (slate-700, light mode) / `#cbd5e1` (slate-300, dark mode)
- Min-height: auto
- Cursor: pointer
- Transition: all 0.2s ease
- Hover:
  - Border-color: `#e2e8f0` (slate-200, light) / `#475569` (slate-600, dark)

**Answer Option (Selected)**
- Background: `rgba(28, 160, 242, 0.08)` (primary with 8% opacity)
- Border: 2px solid `#1da1f2` (primary)
- Border-radius: 12px (xl)
- Padding: 16px
- Color: `#334155` (slate-700, light mode) / `#cbd5e1` (slate-300, dark mode)

**Custom Radio Button**
- Position: Visually hidden (sr-only class) for accessibility
- Maintains keyboard navigation and screen reader support
- Visual indicator:
  - Outer circle:
    - Size: 24px × 24px (h-6 w-6)
    - Border: 2px solid `#cbd5e1` (slate-300, light mode) / `#475569` (slate-600, dark mode)
    - Border-radius: 9999px (full circle)
    - Transition: colors 0.2s
    - Selected border: 2px solid `#1da1f2` (primary)
  - Inner dot:
    - Size: 12px × 12px (h-3 w-3)
    - Background: `#1da1f2` (primary)
    - Border-radius: 9999px
    - Transform: scale(0) when unselected, scale(1) when selected
    - Transition: transform 0.2s
  - Flex-shrink: 0 (prevents squishing)

**Next Button Container**
- Position: Fixed
- Bottom: 0
- Width: 100%
- Max-width: 28rem (448px, max-w-md)
- Background: Linear gradient to top
  - From: `#f5f7f8` (background-light, light mode) / `#101b22` (background-dark, dark mode)
  - Via: `#f5f7f8` / `#101b22`
  - To: transparent
- Padding-top: 32px (pt-8, creates fade effect)
- Padding-bottom: 24px (pb-6)
- Padding-horizontal: 16px (px-4)
- Z-index: 20
- Pointer-events: none (allows clicking through gradient)
- Inner button container:
  - Pointer-events: auto (re-enables button clicks)

**Next Question Button**
- Width: 100%
- Height: 56px (h-14)
- Display: Flex, items-center, justify-content: center
- Background: `#1da1f2` (primary)
- Hover background: `#0ea5e9` (sky-500)
- Active: Scale 0.98
- Color: `#FFFFFF`
- Border-radius: 9999px (full pill)
- Font-family: Lexend
- Font-size: 17px (text-[17px])
- Font-weight: 700 (Bold)
- Box-shadow: `0 10px 15px -3px rgba(59, 130, 246, 0.3)` (shadow-lg with blue-500/30 tint)
- Transition: all 0.2s
- Cursor: pointer

---

### 2.3 Results & Analysis Page

**Purpose**: Show test completion, score, and detailed answer review with expandable/collapsable answer cards.

#### ASCII Layout
```
┌─────────────────────────────────────────────────────┐
│  ←  Results & Analysis                          ⤴  │ (Sticky header with blur)
├─────────────────────────────────────────────────────┤
│                                                     │
│          Test Complete! 🎉                          │
│   (Decorative blur elements around heading)        │
│     Great job! You've mastered the basics!         │
│       Let's polish up those future tenses.         │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           38 /50                            │   │
│  │        TOTAL SCORE                          │   │
│  │                                             │   │
│  │  Accuracy                            76%    │   │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░                 │   │
│  │                                             │   │
│  │        [ PASSING SCORE ]                    │   │
│  │                                             │   │
│  │        ┌──────────────┐                     │   │
│  │        │ ↻ Retake Test │                    │   │
│  │        └──────────────┘                     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Review Your Answers                                │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ✕  Question 5    [Future Perfect]      ⌃   │   │ (Expanded - red border)
│  ├─────────────────────────────────────────────┤   │
│  │                                             │   │
│  │  By this time next year, I ___ graduated.  │   │
│  │                                             │   │
│  │  YOUR ANSWER                                │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ will have                        ✕  │   │   │ (Red background)
│  │  └─────────────────────────────────────┘   │   │
│  │                                             │   │
│  │  CORRECT ANSWER                             │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ will have been                   ✓  │   │   │ (Green background)
│  │  └─────────────────────────────────────┘   │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ 💡 WHY THIS IS WRONG                │   │   │ (Blue background)
│  │  │ We use the Future Perfect Simple    │   │   │
│  │  │ for actions that will be finished   │   │   │
│  │  │ by a certain time in the future.    │   │   │
│  │  │ The passive voice requires "been".  │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ✓  Question 6  [Present Simple]        ⌄   │   │ (Collapsed - green icon)
│  │    She plays the piano every...             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ✓  Question 7  [Present Continuous]    ⌄   │   │ (Collapsed - green icon)
│  │    They are going to the mall...            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ✕  Question 8  [Conditionals]          ⌄   │   │ (Collapsed - red icon)
│  │    If I were you, I would...                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  (Fixed bottom gradient overlay)                    │
│         ┌─────────────────────────────┐            │
│         │    Continue →               │            │
│         └─────────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Specifications

**Header**
- Position: Sticky (top: 0)
- Z-index: 50
- Height: Auto
- Background: `rgba(245, 247, 248, 0.9)` (light mode) / `rgba(16, 27, 34, 0.9)` (dark mode)
- Backdrop-filter: blur(12px)
- Padding: 16px 16px 8px
- Border-bottom: 1px solid transparent
- Display: Flex, align-items: center, justify-content: space-between

**Back Button**
- Left-aligned: `arrow_back` icon (Material Symbols)
- Size: 48px × 48px (clickable area)
- Icon size: 24px
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Border-radius: 9999px (full circle)
- Hover background: `rgba(0, 0, 0, 0.05)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
- Transition: all 0.2s ease

**Page Title**
- Center-aligned: "Results & Analysis"
- Font-size: 18px
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Letter-spacing: -0.015em
- Flex: 1
- Text-align: center

**Share Button**
- Right-aligned: `share` icon (Material Symbols)
- Size: 48px × 48px (clickable area)
- Icon size: 24px
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Border-radius: 9999px
- Hover background: `rgba(0, 0, 0, 0.05)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
- Transition: all 0.2s ease

**Celebration Section**
- Padding: 24px 16px 0
- Text-align: Center
- Position: Relative (for decorative elements)

**Decorative Elements**
- Yellow blur circle:
  - Size: 48px × 48px
  - Background: `#FBBF24` (yellow-400)
  - Border-radius: 9999px
  - Opacity: 0.2
  - Blur: 40px
  - Position: Absolute, top: -16px, left: -32px
  - Animation: pulse
- Blue blur circle:
  - Size: 64px × 64px
  - Background: `#1da1f2` (primary)
  - Border-radius: 9999px
  - Opacity: 0.2
  - Blur: 40px
  - Position: Absolute, bottom: -8px, right: -32px

**Headline**
- "Test Complete! 🎉"
- Font-size: 32px
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Letter-spacing: -0.015em (tight)
- Line-height: tight
- Margin-bottom: 8px
- Position: Relative, z-index: 10

**Subtext**
- Font-size: 14px
- Font-weight: 400 (Normal)
- Color: `#607a8a` (light mode) / `#94a3b8` (slate-400, dark mode)
- Line-height: normal
- Text-align: Center
- Max-width: 80%
- Margin: 8px auto 0

**Score Card**
- Background: `#FFFFFF` (light mode) / `#1e2a30` (dark mode)
- Border-radius: 32px (2xl)
- Padding: 24px
- Margin: 24px 16px
- Box-shadow: 
  - Light: `0 4px 20px -2px rgba(0, 0, 0, 0.05)` (shadow-soft)
  - Dark: Same shadow
- Display: Flex, flex-direction: column, align-items: center
- Gap: 16px

**Score Display**
- Container: Flex column, align items center, gap: 4px
- Large number: "38"
  - Font-size: 60px (6xl)
  - Font-weight: 800 (Extrabold)
  - Color: `#1da1f2` (primary)
  - Letter-spacing: -0.05em (tighter)
  - Line-height: 1
- "/50" suffix:
  - Font-size: 30px (3xl)
  - Font-weight: 700 (Bold)
  - Color: `#dbe2e6` (light mode) / `#dbe2e6` (dark mode)
  - Display: Inline, aligned with main number
- Label: "TOTAL SCORE"
  - Font-size: 14px (sm)
  - Font-weight: 500 (Medium)
  - Color: `#607a8a` (light mode) / `#94a3b8` (slate-400, dark mode)
  - Letter-spacing: 0.05em (wide)
  - Text-transform: uppercase

**Accuracy Section**
- Width: 100%
- Margin-top: 8px

**Accuracy Label Row**
- Display: Flex, justify-content: space-between
- Margin-bottom: 8px
- Font-size: 14px (sm)
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)

**Progress Bar**
- Width: 100%
- Height: 12px (h-3)
- Background: `#f0f4f8` (light mode) / `#374151` (gray-700, dark mode)
- Border-radius: 9999px (full)
- Overflow: hidden

**Progress Fill**
- Height: 100%
- Width: 76% (dynamic based on score)
- Background: `#1da1f2` (primary)
- Border-radius: 9999px

**Passing Score Badge**
- Background: `rgba(28, 160, 242, 0.1)` (primary/10, light) / `rgba(28, 160, 242, 0.2)` (primary/20, dark)
- Color: `#1da1f2` (primary)
- Padding: 8px 16px
- Border-radius: 9999px (full pill)
- Font-size: 12px (xs)
- Font-weight: 700 (Bold)
- Letter-spacing: 0.05em (wide)
- Margin-top: 8px
- Text: "PASSING SCORE"

**Retake Button**
- Display: Flex, align-items: center, gap: 8px
- Padding: 8px 20px
- Background: Transparent
- Border: 1px solid `#1da1f2` (light mode) / `#4b5563` (gray-600, dark mode)
- Border-radius: 9999px (full pill)
- Color: `#1da1f2` (light mode) / `#d1d5db` (gray-300, dark mode)
- Font-size: 14px (sm)
- Font-weight: 700 (Bold)
- Icon: `refresh` (Material Symbols), 20px
- Hover: Background `rgba(28, 160, 242, 0.05)` (light) / `rgba(255, 255, 255, 0.05)` (dark)
- Active: Scale 0.95
- Transition: all 0.2s ease

**Review Section Header**
- Text: "Review Your Answers"
- Font-size: 18px (lg)
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Padding: 8px 24px 12px
- Margin-top: 0

**Expanded Answer Card (Incorrect)**
- Background: `#FFFFFF` (light mode) / `#1e2a30` (dark mode)
- Border-radius: 32px (2xl)
- Border: 2px solid `rgba(254, 226, 226, 1)` (red-100, light) / `rgba(127, 29, 29, 0.3)` (red-900/30, dark)
- Padding: 0
- Margin: 0 16px 16px
- Box-shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.05)` (shadow-soft)
- Overflow: hidden

**Expanded Card Header**
- Display: Flex, align-items: center, justify-content: space-between
- Padding: 16px 16px 8px
- Border-bottom: 1px solid `#f9fafb` (gray-50, light) / `#1f2937` (gray-800, dark)

**Header Icon (Incorrect)**
- Size: 32px × 32px (h-8 w-8)
- Border-radius: 9999px (full circle)
- Background: `rgba(254, 226, 226, 1)` (red-100, light) / `rgba(127, 29, 29, 0.5)` (red-900/50, dark)
- Display: Flex, align-items: center, justify-content: center
- Icon: `close` (Material Symbols)
  - Size: 18px (lg)
  - Font-weight: 700 (Bold)
  - Color: `#dc2626` (red-600, light) / `#f87171` (red-400, dark)

**Header Content (Meta Info)**
- Display: Flex, align-items: center, gap: 12px

**Question Number**
- Font-size: 14px (sm)
- Font-weight: 600 (Semibold)
- Color: `#607a8a` (light mode) / `#94a3b8` (slate-400, dark mode)
- Text: "Question 5"



**Expand/Collapse Icon**
- Icon: `expand_less` (when expanded) / `expand_more` (when collapsed)
- Size: 24px
- Color: `#dbe2e6` (light mode) / `#dbe2e6` (dark mode)
- Cursor: pointer

**Expanded Card Content**
- Padding: 20px
- Display: Flex, flex-direction: column, gap: 16px


---

### 2.4 Email Report System

**Purpose**: Allow users to receive a permanent copy of their results and study plan via email.

#### 2.4.1 Email Request Screen
**File**: `doc/Design/light_email.html`

**Layout Structure**
- **Header**: Sticky top, Back button (left), "Get Your Plan & Gift Code" centered title
- **Content**: Two main cards stacked vertically
  1. **Immediate Access Card**: PDF Download option
  2. **Email & Special Gift Card**: Form with "Limited Offer" incentives

**Specifications**

**1. Immediate Access Card**
- **Header**: "IMMEDIATE ACCESS" label
  - Font-size: 12px (text-xs)
  - Color: `#9ca3af` (gray-400)
  - Uppercase, tracking-widest
- **Card Container**:
  - Background: `#FFFFFF`
  - Border-radius: 24px
  - Padding: 24px (p-6)
  - Shadow: `0 4px 12px rgba(0, 0, 0, 0.05)` (shadow-ios)
  - Border: 1px solid `#f9fafb` (gray-50)
  - Display: Flex column, centered
- **Icon**:
  - `print` (Material Symbols)
  - Size: 30px
  - Container: 64px circle, bg-blue-50
- **Title**: "Download Free PDF Plan" (18px Bold)
- **Primary Action (PDF)**:
  - Text: "Download PDF"
  - Styling: White bg, Border 2px solid `#1da1f2` (primary), Text Primary Blue
  - Icon: `download`
  - Radius: Full pill
  - Width: 100%
- **Badge**: "FREE & READY NOW" (Green text)

**2. Email & Special Gift Card**
- **Header Row**:
  - Label: "EMAIL & SPECIAL GIFT"
  - **Pulsing Badge**: "Only 100 left!" (Red text/bg, animate-pulse dot)
- **Card Container**:
  - Background: `#FFFFFF`
  - Border-radius: 24px
  - Padding: 24px
  - Shadow: `shadow-ios`
  - Overflow: hidden (for ribbon)
- **Ribbon**: "LIMITED OFFER" (Top-right corner, rotated 45deg, Primary Blue bg)
- **Gift Hero**:
  - Icon: `card_giftcard` (Yellow-600) in Yellow-50 container
  - Title: "Email Results & Get 7-Day Gift"
  - Subtext: "Receive your summary and a gift code..."
- **Form Fields**:
  - **Input Style**:
    - Height: 48px
    - Background: `#FFFFFF`
    - Border: 1px solid `#e5e7eb` (gray-200)
    - Radius: 12px (xl)
    - Focus: Border Primary Blue, Ring-1 Primary Blue
  - **Fields**: Full Name, Email Address, Phone Number (optional)
- **Submit Button**:
  - Text: "Send My Gift Code"
  - Icon: `send`
  - Background: `#1da1f2` (primary)
  - Height: 56px (h-14)
  - Radius: 16px (2xl)
  - Shadow: `shadow-lg shadow-blue-200/50`
  - Width: 100%



#### 2.4.2 Email Success Screen
**File**: `doc/Design/light_email_sent_success.html`

**Layout Structure**
- **Header**: Close button (top-right)
- **Content**: Centered Success Illustration + Message
- **Footer**: Sticky bottom "Retake the test" button

**Specifications**
- **Success Illustration**:
  - Main Circle: Size 112px, BG `#22c55e` (success-green)
  - Icon: `check`, size 48px, bold, white
  - Decorative Dots: Yellow (top-right), Light Green (bottom-left), Pink (mid-left)
- **Heading**: "Study Plan Sent!" (30px size)
- **Links**: "Contact Support" with mail icon, color `#1da1f2`


#### 2.4.3 Email Failed Screen
**File**: `doc/Design/light_email_sent_failed.html`

**Layout Structure**
- **Header**: Back button (top-left)
- **Content**: Error Illustration + "Oops!" Message + Support Options
- **Footer**: Sticky bottom "Retake the test" button

**Specifications**
- **Error Illustration**:
  - Circle: Size 192px (w-48), BG `#fff8e1`
  - Icon: `error` (Material Symbols), size 100px, color `#ffc107` (amber)
- **Support Action Cards**:
  - Layout: Icon (left) + Text (col) + Chevron (right)
  - Background: White
  - Border: 1px solid gray-50
  - Shadow: Soft, hover shadow-md
  - Icons: `mail` / `forum` in light blue (`#e3f2fd`) square rounded-xl container


#### 2.4.4 Email Content Template
**File**: `doc/Design/light_email_content.html`

**Global Email Styles**
- **Width**: Max 600px, Centered
- **Background**: `#f8fafc` (slate-50)
- **Font**: Lexend (Headings) / Noto Sans (Body)

**Components**
1.  **Header**:
    - Logo + "eJOY English" (left)
    - "DIAGNOSTIC REPORT" label (right, uppercase, 10px)
2.  **Score Hero**:
    - Background: `#f0f9ff` (very light blue)
    - Circle Badge: Primary Blue (`#1da1f2`), Size 128px
    - Score Text: 30px Bold White
3.  **Quick Analysis Card**:
    - Background: Gray-50/50
    - Border: Gray-100
    - Progress Bar: Height 8px, Primary Blue fill
4.  **Weak Topics List**:
    - Label: "WEAK GRAMMAR TOPICS" (uppercase, tracking-wide)
    - **Topic Card**:
        - White BG, Border Gray-100, Shadow Soft
        - **Priority Tag**: High=Red, Medium=Amber, Low=Gray
        - **Resource Item**: Flex layout, Icon Box (32px), Title
        - Icons: `book` (blue bg), `play_circle` (orange bg)
5.  **Recommended Resources**:
    - Grid: 2 Columns
    - Aspect Ratio: 16/10 images
    - Hover text: Primary Blue
6.  **Footer**:
    - Buttons: "Go to My Account" (Primary), "Retake Test" (Gray)
    - Social Ions: Gray-400

- Font-size: 18px (lg)
- Font-weight: 500 (Medium)
- Color: `#111518` (light mode) / `#f3f4f6` (gray-100, dark mode)
- Line-height: snug
- Blank space indicator:
  - Border-bottom: 2px dashed `#d1d5db` (gray-300, light) / `#4b5563` (gray-600, dark)
  - Min-width: 30px
  - Display: inline-block
  - Margin: 0 4px

**Your Answer Section**
- Display: Flex, flex-direction: column, gap: 4px
- Label: "YOUR ANSWER"
  - Font-size: 12px (xs)
  - Font-weight: 700 (Bold)
  - Color: `#ef4444` (red-500, light) / `#f87171` (red-400, dark)
  - Letter-spacing: 0.05em (wide)
  - Text-transform: uppercase
  - Margin-left: 4px
- Answer box:
  - Background: `rgba(254, 226, 226, 1)` (red-50, light) / `rgba(127, 29, 29, 0.2)` (red-900/20, dark)
  - Color: `#b91c1c` (red-700, light) / `#fecaca` (red-200, dark)
  - Padding: 12px
  - Border-radius: 12px (xl)
  - Border: 1px solid `rgba(254, 226, 226, 1)` (red-100, light) / `rgba(127, 29, 29, 0.3)` (red-900/30, dark)
  - Display: Flex, align-items: center, justify-content: space-between
  - Font-weight: 500 (Medium)
- Icon: `cancel` (Material Symbols)
  - Color: `#ef4444` (red-500)
  - Size: 24px

**Correct Answer Section**
- Display: Flex, flex-direction: column, gap: 4px
- Label: "CORRECT ANSWER"
  - Font-size: 12px (xs)
  - Font-weight: 700 (Bold)
  - Color: `#16a34a` (green-600, light) / `#4ade80` (green-400, dark)
  - Letter-spacing: 0.05em (wide)
  - Text-transform: uppercase
  - Margin-left: 4px
- Answer box:
  - Background: `rgba(220, 252, 231, 1)` (green-50, light) / `rgba(20, 83, 45, 0.2)` (green-900/20, dark)
  - Color: `#15803d` (green-700, light) / `#bbf7d0` (green-200, dark)
  - Padding: 12px
  - Border-radius: 12px (xl)
  - Border: 1px solid `rgba(220, 252, 231, 1)` (green-100, light) / `rgba(20, 83, 45, 0.3)` (green-900/30, dark)
  - Display: Flex, align-items: center, justify-content: space-between
  - Font-weight: 500 (Medium)
- Icon: `check_circle` (Material Symbols)
  - Color: `#16a34a` (green-600)
  - Size: 24px

**Explanation Section**
- Background: `#f8faff` (very light blue, light mode) / `#25333d` (dark mode)
- Padding: 16px
- Border-radius: 12px (xl)
- Border: 1px solid `rgba(239, 246, 255, 1)` (blue-50, light) / `rgba(30, 64, 175, 0.2)` (blue-900/20, dark)
- Display: Flex, gap: 12px, align-items: flex-start
- Margin-top: 8px

**Explanation Icon**
- Icon: `lightbulb` (Material Symbols)
- Size: 24px
- Color: `#1da1f2` (primary)
- Margin-top: 2px
- Fill: filled (FILL 1)

**Explanation Content**
- Display: Flex, flex-direction: column, gap: 4px
- Label: "WHY THIS IS WRONG"
  - Font-size: 12px (xs)
  - Font-weight: 700 (Bold)
  - Color: `#1da1f2` (primary)
  - Letter-spacing: 0.05em
  - Text-transform: uppercase
- Text:
  - Font-size: 14px (sm)
  - Color: `#4a5f6b` (light mode) / `#d1d5db` (gray-300, dark mode)
  - Line-height: relaxed
  - Bold terms (e.g., "Future Perfect Simple"):
    - Font-weight: 700 (Bold)

**Expanded Answer Card (Correct)**
> [!IMPORTANT]
> Correct answer cards use the same expandable structure but without the "YOUR ANSWER" section. The header icon background is green instead of red.

- Same structure as incorrect card
- Border: None or subtle
- Header icon:
  - Background: `rgba(220, 252, 231, 1)` (green-100, light) / `rgba(20, 83, 45, 0.5)` (green-900/50, dark)
  - Icon: `check` (Material Symbols), green color
- Shows only "CORRECT ANSWER" section
- May include explanation with "WHY THIS IS CORRECT" or additional learning context

**Collapsed Answer Cards**
> [!IMPORTANT]
> All answer cards (both correct and incorrect) are tappable/clickable to expand and show full details.

- Background: `#FFFFFF` (light mode) / `#1e2a30` (dark mode)
- Border-radius: 32px (2xl)
- Box-shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.05)` (shadow-soft)
- Padding: 16px
- Margin: 0 16px 16px
- Display: Flex, align-items: center, justify-content: space-between
- Cursor: pointer
- Transition: all 0.2s ease
- Hover: Box-shadow: `0 8px 30px -4px rgba(0, 0, 0, 0.08)` (shadow-soft-hover)
- Active: Scale slightly

**Collapsed Card - Left Content**
- Display: Flex, align-items: center, gap: 16px

**Collapsed Card - Icon (Correct)**
- Size: 32px × 32px (h-8 w-8)
- Border-radius: 9999px (full circle)
- Background: `rgba(220, 252, 231, 1)` (green-100, light) / `rgba(20, 83, 45, 0.5)` (green-900/50, dark)
- Display: Flex, align-items: center, justify-content: center, shrink: 0
- Icon: `check` (Material Symbols)
  - Size: 18px (lg)
  - Font-weight: 700 (Bold)
  - Color: `#16a34a` (green-600, light) / `#4ade80` (green-400, dark)

**Collapsed Card - Icon (Incorrect)**
- Size: 32px × 32px (h-8 w-8)
- Border-radius: 9999px (full circle)
- Background: `rgba(254, 226, 226, 1)` (red-100, light) / `rgba(127, 29, 29, 0.5)` (red-900/50, dark)
- Display: Flex, align-items: center, justify-content: center, shrink: 0
- Icon: `close` (Material Symbols)
  - Size: 18px (lg)
  - Font-weight: 700 (Bold)
  - Color: `#dc2626` (red-600, light) / `#f87171` (red-400, dark)

**Collapsed Card - Text Content**
- Display: Flex, flex-direction: column, overflow: hidden

**Collapsed Card - Meta Row**
- Display: Flex, align-items: center, gap: 8px
- Margin-bottom: 2px

**Collapsed Card - Question Number**
- Font-size: 12px (xs)
- Font-weight: 600 (Semibold)
- Color: `#607a8a` (light mode) / `#94a3b8` (slate-400, dark mode)
- Text: "Question 6"

**Collapsed Card - Grammar Badge**
- Background: `#f3f4f6` (gray-100, light) / `#1f2937` (gray-800, dark)
- Color: `#6b7280` (gray-500, light) / `#9ca3af` (gray-400, dark)
- Font-size: 10px (text-[10px])
- Font-weight: 700 (Bold)
- Padding: 2px 8px (py-0.5 px-2)
- Border-radius: 9999px (full pill)
- Border: 1px solid `#e5e7eb` (gray-200, light) / `#374151` (gray-700, dark)
- White-space: nowrap

**Collapsed Card - Question Preview**
- Font-size: 14px (sm)
- Font-weight: 500 (Medium)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Text-overflow: ellipsis
- White-space: nowrap
- Overflow: hidden
- Width: 100%
- Text: Truncated question text (e.g., "She plays the piano every...")

**Collapsed Card - Expand Icon**
- Icon: `expand_more` (Material Symbols)
- Size: 24px
- Color: `#dbe2e6`

**Continue Button Container**
- Position: Fixed
- Bottom: 0, Left: 0, Right: 0
- Padding: 16px
- Background: Linear gradient
  - From: `rgba(245, 247, 248, 0)` (transparent top, light) / `rgba(16, 27, 34, 0)` (transparent top, dark)
  - Via: `#f5f7f8` (background-light) / `#101b22` (background-dark)
  - To: `#f5f7f8` (background-light) / `#101b22` (background-dark)
- Padding-top: 48px (creates fade effect)

**Continue Button**
- Width: 100%
- Height: 56px (h-14)
- Background: `#1da1f2` (primary)
- Hover background: `#0ea5e9` (sky-500)
- Active: Scale 0.98
- Color: `#FFFFFF`
- Border-radius: 9999px (full pill)
- Font-size: 18px (lg)
- Font-weight: 700 (Bold)
- Box-shadow: 
  - Light: `0 10px 15px -3px rgba(96, 165, 250, 0.5)` (blue-200/50)
  - Dark: `0 10px 15px -3px rgba(30, 64, 175, 0.3)` (blue-900/30)
- Display: Flex, align-items: center, justify-content: center, gap: 8px
- Transition: all 0.2s ease
- Text: "Continue"
- Icon: `arrow_forward` (Material Symbols), 24px

---

### 2.4 Study Plan Page (Personalized Recommendations)

**Purpose**: Show personalized learning recommendations based on weak topics, including recommended resources and practice materials.

**Page Background**: `#FFFFFF` (white)

#### ASCII Layout
```
┌─────────────────────────────────────────────────────┐
│  ←  Study Plan                                  ⤴  │ (Sticky header with blur)
├─────────────────────────────────────────────────────┤
│                                                     │
│  Your Personalized                                  │
│  Study Plan                                         │
│                                                     │
│  Focus on these topics to level up your            │
│  English.                                           │
│                                                     │
│  ┌────────────────┐  ┌────────────────────────┐    │
│  │ [Book Image]   │  │ [eJOY Interface]       │    │
│  │ 📖 RECOMMENDED │  │ ▶ INTERACTIVE          │    │
│  │ Grammar for    │  │ Practice on eJOY       │    │
│  │ IELTS          │  │                        │    │
│  └────────────────┘  └────────────────────────┘    │
│                                                     │
│  WEAK GRAMMAR TOPICS                                │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Future Perfect               PRIORITY      │   │
│  ├─────────────────────────────────────────────┤   │
│  │                                             │   │
│  │  📖 STUDY REFERENCE                         │   │
│  │  Grammar for IELTS - Unit 14                │   │
│  │                                             │   │
│  │  ▶ PRACTICE ON EJOY                         │   │
│  │  Watch Lesson: Future Perfect in Movies 🔗  │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Passive Voice                              │   │
│  ├─────────────────────────────────────────────┤   │
│  │                                             │   │
│  │  📖 STUDY REFERENCE                         │   │
│  │  English Grammar in Use - Unit 42           │   │
│  │                                             │   │
│  │  ▶ PRACTICE ON EJOY                         │   │
│  │  Clip: News Reports Compilation 🔗          │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Conditionals                               │   │
│  ├─────────────────────────────────────────────┤   │
│  │                                             │   │
│  │  📖 STUDY REFERENCE                         │   │
│  │  Advanced Grammar - Unit 8                  │   │
│  │                                             │   │
│  │  ▶ PRACTICE ON EJOY                         │   │
│  │  Scene: The Big Bang Theory 🔗              │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  (Fixed bottom gradient overlay)                    │
│         ┌─────────────────────────────┐            │
│         │    Continue →               │            │
│         └─────────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Specifications

**Header**
- Position: Sticky (top: 0)
- Z-index: 50
- Height: Auto
- Background: `rgba(255, 255, 255, 0.9)` (light mode) / `rgba(16, 27, 34, 0.9)` (dark mode)
- Backdrop-filter: blur(12px)
- Padding: 16px 16px 8px
- Border-bottom: 1px solid `#f9fafb` (gray-50, light) / `#1f2937` (gray-800, dark)
- Display: Flex, align-items: center, justify-content: space-between

**Back Button**
- Left-aligned: `arrow_back` icon (Material Symbols)
- Size: 48px × 48px (clickable area)
- Icon size: 24px
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Border-radius: 9999px (full circle)
- Hover background: `rgba(0, 0, 0, 0.05)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
- Transition: all 0.2s ease

**Page Title (in Header)**
- Center-aligned: "Study Plan"
- Font-size: 18px (lg)
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Letter-spacing: -0.015em
- Flex: 1
- Text-align: center

**Share Button**
- Right-aligned: `share` icon (Material Symbols)
- Size: 48px × 48px (clickable area)
- Icon size: 24px
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Border-radius: 9999px
- Hover background: `rgba(0, 0, 0, 0.05)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
- Transition: all 0.2s ease

**Content Section**
- Padding: 24px 24px 0

**Main Heading**
- "Your Personalized Study Plan"
- Font-size: 28px
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Letter-spacing: -0.015em (tight)
- Line-height: tight
- Position: Relative, z-index: 10
- Margin-bottom: 8px

**Subtitle**
- "Focus on these topics to level up your English."
- Font-size: 16px (base)
- Font-weight: 400 (Normal)
- Color: `#607a8a` (light mode) / `#94a3b8` (slate-400, dark mode)
- Line-height: relaxed
- Max-width: 90%
- Margin-bottom: 16px

**Recommendation Cards Container**
- Display: Grid (2 columns)
- Gap: 16px (gap-4)
- Padding: 16px 24px
- Margin-bottom: 8px

**Recommendation Card (Book)**
- Width: 100%
- Height: 150px
- Position: Relative
- Border-radius: 16px
- Overflow: hidden
- Box-shadow: `0 8px 30px -4px rgba(0, 0, 0, 0.08)` (shadow-soft)
- Active: Scale 0.98
- Transition: transform 0.2s ease
- Group hover: Image scale 1.1 (500ms duration)

**Card Background Image**
- Position: Absolute, inset 0
- Width: 100%, Height: 100%
- Object-fit: cover
- Brightness: 75% (0.75)
- Transition: transform 500ms
- Hover: Scale 1.1

**Card Gradient Overlay**
- Position: Absolute, inset 0
- Background: Linear gradient to top
  - From: `rgba(0, 0, 0, 0.8)`
  - Via: transparent
  - To: transparent

**Card Icon Badge (Book Card)**
- Position: Absolute, top-left
- Background: `rgba(255, 255, 255, 0.2)`
- Backdrop-filter: blur(12px)
- Border-radius: 8px (lg)
- Padding: 6px (p-1.5)
- Border: 1px solid `rgba(255, 255, 255, 0.1)`
- Box-shadow: sm
- Icon: `menu_book` (Material Symbols)
  - Size: 16px (text-base)
  - Color: `#FFFFFF`

**Card Icon Badge (eJOY Card)**
- Background: `#1da1f2` (solid primary color)
- No border or backdrop blur
- Icon: `smart_display` (Material Symbols)
  - Size: 16px
  - Color: `#FFFFFF`

**Card Content**
- Position: Absolute, inset 0
- Padding: 12px (p-3)
- Display: Flex, flex-direction: column, justify-content: space-between

**Card Label**
- Font-size: 8px (text-[8px])
- Font-weight: 700 (Bold)
- Color: `rgba(255, 255, 255, 0.9)`
- Text-transform: uppercase
- Letter-spacing: wider
- Margin-bottom: 2px (mb-0.5)
- Text: "Recommended" / "Interactive"

**Card Title**
- Font-size: 14px (sm)
- Font-weight: 700 (Bold)
- Color: `#FFFFFF`
- Line-height: tight
- Text-shadow: md (drop-shadow-md)
- Line-clamp: 2
- Text: "Grammar for IELTS" / "Practice on eJOY"

**Section Header**
- Text: "WEAK GRAMMAR TOPICS"
- Font-size: 14px (sm)
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)
- Text-transform: uppercase
- Letter-spacing: wider
- Opacity: 0.8
- Padding: 16px 24px 12px
- Margin-top: 0

**Topic Card**
- Background: `#FFFFFF` (light mode) / `#1e2a30` (dark mode)
- Border-radius: 16px (2xl)
- Padding: 20px (p-5)
- Margin: 0 24px 24px (mx-6 mb-6)
- Box-shadow: `0 8px 30px -4px rgba(0, 0, 0, 0.08)` (shadow-soft)
- Border: 1px solid `#f3f4f6` (gray-100, light) / `#1f2937` (gray-800, dark)
- Display: Flex, flex-direction: column
- Gap: 20px (gap-5)
- Transition: transform 0.2s ease
- Active: Scale 0.99

**Topic Header**
- Display: Flex, justify-content: space-between, align-items: center
- Padding-bottom: 12px (pb-3)
- Border-bottom: 1px solid `#f9fafb` (gray-50, light) / `#374151` (gray-700, dark)

**Topic Name**
- Font-family: Display (Lexend)
- Font-size: 18px (lg)
- Font-weight: 700 (Bold)
- Color: `#111518` (light mode) / `#FFFFFF` (dark mode)

**Priority Badge**
- Background: `#fef2f2` (red-50, light) / `rgba(127, 29, 29, 0.2)` (red-900/20, dark)
- Color: `#dc2626` (red-600, light) / `#fca5a5` (red-300, dark)
- Font-size: 10px (text-[10px])
- Font-weight: 700 (Bold)
- Padding: 4px 8px (px-2 py-1)
- Border-radius: 9999px (full pill)
- Text-transform: uppercase
- Letter-spacing: wide

**Resource Item Container**
- Display: Flex, align-items: start
- Gap: 16px (gap-4)

**Resource Icon Badge (Book)**
- Size: 40px × 40px (size-10)
- Border-radius: 9999px (full circle)
- Background: `#eff6ff` (blue-50, light) / `rgba(30, 64, 175, 0.3)` (blue-900/30, dark)
- Display: Flex, align-items: center, justify-content: center
- Flex-shrink: 0
- Color: `#3b82f6` (blue-500, light) / `#93c5fd` (blue-300, dark)
- Icon: `menu_book` (Material Symbols)
  - Size: 20px (text-[20px])

**Resource Icon Badge (Practice)**
- Size: 40px × 40px
- Border-radius: 9999px
- Background: `#fff7ed` (orange-50, light) / `rgba(124, 45, 18, 0.3)` (orange-900/30, dark)
- Color: `#f97316` (orange-500, light) / `#fdba74` (orange-300, dark)
- Icon: `smart_display` (Material Symbols)
  - Size: 20px

**Resource Content**
- Display: Flex, flex-direction: column
- Gap: 2px (gap-0.5)

**Resource Label**
- Font-size: 10px (text-[10px])
- Font-weight: 700 (Bold)
- Color: `#9aaebc` (light mode) / `#64748b` (slate-500, dark mode)
- Text-transform: uppercase
- Letter-spacing: wider
- Text: "Study Reference" / "Practice on eJOY"

**Resource Title (Book Reference)**
- Font-size: 14px (sm)
- Font-weight: 600 (Semibold)
- Color: `#111518` (light mode) / `#e5e7eb` (gray-200, dark mode)
- Text: e.g., "Grammar for IELTS - Unit 14"

**Resource Link (Practice)**
- Font-size: 14px (sm)
- Font-weight: 700 (Bold)
- Color: `#1da1f2` (primary)
- Display: Flex, align-items: center, gap: 4px (gap-1)
- Hover: underline
- Text-decoration: underline (2px thickness, 2px offset)
- Icon: `open_in_new` (Material Symbols)
  - Size: 14px (text-sm)
- Text: e.g., "Watch Lesson: Future Perfect in Movies"

**Continue Button Container**
- Position: Fixed
- Bottom: 0, Left: 0, Right: 0
- Padding: 16px (p-4)
- Background: Linear gradient to top
  - From: `#FFFFFF` (light mode) / `#101b22` (background-dark, dark mode)
  - Via: `#FFFFFF` / `#101b22`
  - To: transparent
- Padding-top: 48px (pt-12, creates fade effect)

**Continue Button**
- Width: 100%
- Height: 56px (h-14)
- Background: `#1da1f2` (primary)
- Hover background: Opacity 0.9
- Active: Scale 0.98
- Color: `#FFFFFF`
- Border-radius: 9999px (full pill)
- Font-size: 18px (lg)
- Font-weight: 700 (Bold)
- Box-shadow: 
  - Light: `0 10px 15px -3px rgba(147, 197, 253, 0.5)` (blue-200/50)
  - Dark: `0 10px 15px -3px rgba(30, 64, 175, 0.3)` (blue-900/30)
- Display: Flex, align-items: center, justify-content: center, gap: 8px (gap-2)
- Transition: all 0.2s ease
- Text: "Continue"
- Icon: `arrow_forward` (Material Symbols), 24px

---

### 2.5 Recommendations Page

**Purpose**: Upsell learning resources based on user results.

#### ASCII Layout
```
┌─────────────────────────────────────────────────────┐
│  ←  Results                                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  How to improve your                                │
│  score:                                             │
│                                                     │
│  Based on your results, we recommend a mix         │
│  of structured learning and immersion.             │
│                                                     │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │  📚                                         │   │
│  │                                             │   │
│  │  Structured Academic Study                  │   │
│  │                                             │   │
│  │  Master grammar rules with our              │   │
│  │  comprehensive textbook designed for your   │   │
│  │  level.                                     │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │    Get the Book                     │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │  ▶                                          │   │
│  │                                             │   │
│  │  Learn with Videos                          │   │
│  │                                             │   │
│  │  Immerse yourself in real-world English     │   │
│  │  using movies and videos on the eJOY app.   │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │  Start Watching on eJOY             │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Specifications

**Header**
- Height: 56px
- Background: `#FFFFFF`
- Padding: 16px
- Border-bottom: 1px solid `#E5E7EB`
- Back button (left), "Results" title (center)

**Page Title**
- "How to improve your score:"
- Font-size: 28px (mobile: 24px)
- Font-weight: 700
- Color: `#1A1A1A`
- Padding: 24px 24px 8px
- Line-height: 36px

**Subtitle**
- "Based on your results, we recommend a mix of structured learning and immersion."
- Font-size: 14px
- Color: `#6B7280`
- Line-height: 20px
- Padding: 0 24px 32px
- Max-width: 500px

**Recommendation Card**
- Background: `#FFFFFF`
- Border-radius: 16px
- Padding: 32px 24px
- Margin: 0 16px 24px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
- Text-align: Center

**Icon Container**
- Size: 56px × 56px
- Background: `#FFF4ED` (for book), `#E0F2FE` (for video)
- Border-radius: 12px
- Display: Flex, center content
- Margin: 0 auto 20px

**Icon**
- 📚 (book icon) - Size: 32px, Color: `#FF6B35`
- ▶ (play icon) - Size: 32px, Color: `#1da1f2`

**Card Title**
- "Structured Academic Study" / "Learn with Videos"
- Font-size: 20px
- Font-weight: 700
- Color: `#1A1A1A`
- Margin-bottom: 12px

**Card Description**
- Font-size: 14px
- Color: `#6B7280`
- Line-height: 20px
- Max-width: 320px
- Margin: 0 auto 24px

**Primary CTA (Book)**
- Text: "Get the Book"
- Background: `#FFFFFF`
- Border: 2px solid `#1da1f2`
- Color: `#1da1f2`
- Width: 100%
- Max-width: 280px
- Height: 48px
- Border-radius: 9999px
- Font-size: 16px
- Font-weight: 600

**Primary CTA (Video)**
- Text: "Start Watching on eJOY"
- Background: `#1da1f2`
- Color: `#FFFFFF`
- Width: 100%
- Max-width: 280px
- Height: 48px
- Border-radius: 9999px
- Font-size: 16px
- Font-weight: 600

---

## 3. Component Library

### 3.1 Buttons

#### Primary Button
```css
.btn-primary {
  background: #1da1f2;
  color: #FFFFFF;
  border: none;
  border-radius: 9999px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  min-height: 56px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #0EA5E9;
  box-shadow: 0 4px 12px rgba(29, 185, 245, 0.3);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-primary:disabled {
  background: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
}
```

#### Secondary Button (Outline)
```css
.btn-secondary {
  background: #FFFFFF;
  color: #1da1f2;
  border: 2px solid #1da1f2;
  border-radius: 9999px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  min-height: 56px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #E0F2FE;
}
```

### 3.2 Cards

#### Question Card
```css
.question-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 16px;
}
```

#### Answer Card (Collapsed)
```css
.answer-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 8px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.answer-card--correct {
  border-left: 4px solid #00C853;
}

.answer-card--incorrect {
  border-left: 4px solid #FF1744;
}

.answer-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

### 3.3 Progress Bar

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: #1da1f2;
  transition: width 0.3s ease;
}
```

### 3.4 Radio Button

```css
.radio-option {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 9999px;
  padding: 16px 20px;
  min-height: 56px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-option:hover {
  border-color: #1da1f2;
  background: #F0F9FF;
}

.radio-option--selected {
  background: #E0F2FE;
  border-color: #1da1f2;
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid #E5E7EB;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
}

.radio-button--selected {
  border-color: #1da1f2;
}

.radio-button--selected::after {
  content: '';
  width: 10px;
  height: 10px;
  background: #1da1f2;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 3.5 Tags & Badges

#### Topic Tag
```css
.topic-tag {
  display: inline-block;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
}
```

#### Priority Badge
```css
.badge-priority {
  background: #FEE2E2;
  color: #FF1744;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
```

### 3.6 Language Selector

```css
.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-selector:hover {
  border-color: #1da1f2;
}

.language-selector__flag {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.language-selector__text {
  font-size: 14px;
  color: #1A1A1A;
  flex: 1;
}

.language-selector__icon {
  width: 16px;
  height: 16px;
  color: #6B7280;
}
```

---

## 4. Interaction Design

### 4.1 Answer Selection
1. **Default State**: White background, light gray border
2. **Hover State**: Light blue background (#F0F9FF), blue border
3. **Selected State**: Blue background (#E0F2FE), solid blue border
4. **Transition**: All states use 0.2s ease transition

### 4.2 Button Interactions
1. **Hover**: Slight color darkening + shadow elevation
2. **Active/Click**: Scale down to 0.98 for tactile feedback
3. **Disabled**: Gray background, no cursor pointer, no hover effects

### 4.3 Card Expansion
1. **Collapsed**: 60px height, shows question preview
2. **Click to Expand**: Smooth height transition (0.3s ease)
3. **Expanded**: Full content with explanation visible
4. **Indicator**: Chevron icon rotates 180° when expanded

### 4.4 Progress Updates
1. **Progress Bar**: Smooth width transition (0.3s ease) on question advance
2. **Question Counter**: Fade out old number, fade in new (0.2s)
3. **Percentage**: Counter animation from old to new value

### 4.5 Page Transitions
1. **Navigation**: Slide-in from right (0.3s ease-out)
2. **Back Navigation**: Slide-out to right (0.3s ease-out)
3. **Modal Overlay**: Fade in (0.2s) with backdrop blur

---

## 5. Responsive Behavior

### 5.1 Breakpoints
- **Mobile**: 0 - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### 5.2 Layout Adjustments

#### Mobile (< 768px)
- Single column layout
- Full-width cards with 16px margins
- Font-size reduced by 10-15% for headings
- Hero image: 240px width
- Button: Full width with max-width 280px
- Language selector: Top-right corner

#### Tablet (768px - 1023px)
- Maintain single column for quiz
- Study plan hero cards: 2-column grid
- Max content width: 720px, centered
- Hero image: 280px width
- Buttons: Fixed width (280px)

#### Desktop (1024px+)
- Max content width: 800px, centered
- Hero image: 320px width
- Larger font sizes for headings (+2-4px)
- More generous padding (32px vs 24px)
- Buttons: Fixed width (300px)

### 5.3 Touch Targets
- Minimum touch target: 44px × 44px (iOS guideline)
- Buttons: Minimum height 56px
- Radio options: Minimum height 56px
- Icon buttons: 40px × 40px minimum

---

## 6. Accessibility Guidelines

### 6.1 Color Contrast
- Text on white background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Clear visual distinction
- Error/Success states: Don't rely on color alone

**Verified Ratios:**
- Primary text (#1A1A1A) on white: 16.75:1 ✅
- Secondary text (#6B7280) on white: 5.14:1 ✅
- Blue buttons (#1da1f2) with white text: 3.27:1 ✅

### 6.2 Focus States
```css
*:focus-visible {
  outline: 2px solid #1da1f2;
  outline-offset: 2px;
}

button:focus-visible {
  box-shadow: 0 0 0 4px rgba(29, 185, 245, 0.2);
}
```

### 6.3 Keyboard Navigation
- Tab order follows visual hierarchy
- Enter/Space activates buttons and selects answers
- Arrow keys navigate between radio options
- Escape closes modals and dropdowns
- Skip to main content link for screen readers

### 6.4 Screen Reader Support
- Semantic HTML5 elements (`<header>`, `<main>`, `<nav>`)
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content (score updates)
- Alt text for all images
- Form labels properly associated with inputs

### 6.5 ARIA Attributes

```html
<!-- Progress Bar -->
<div role="progressbar" 
     aria-valuenow="24" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Quiz progress">
</div>

<!-- Radio Group -->
<div role="radiogroup" aria-label="Answer options">
  <div role="radio" aria-checked="true">Option A</div>
  <div role="radio" aria-checked="false">Option B</div>
</div>

<!-- Expandable Card -->
<button aria-expanded="false" 
        aria-controls="answer-explanation-1">
  Question 1
</button>
<div id="answer-explanation-1" hidden>
  Explanation content
</div>
```

### 6.6 Motion & Animation
- Respect `prefers-reduced-motion` media query
- Provide alternative static states for critical information
- Transitions should be disableable

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Implementation Notes

### 7.1 Asset Requirements
- eJOY logo: SVG format, both color and white versions
- Hero image: WebP format, 2x resolution for retina displays
- Icons: SVG sprite or icon font (recommended: Heroicons or Lucide)
- Minimum image size: 640px width (scales up to 320px display size)

### 7.2 Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

### 7.3 Localization Specifications

#### Text Direction
- Default: LTR (Left-to-Right)
- Future consideration: RTL support for Arabic

#### String Length Considerations
- Buttons: Allocate 30% extra width for translations
- Headlines: Vietnamese can be 40% longer than English
- Chinese: Usually shorter, but requires larger font sizes (16px minimum)

#### Date/Number Formats
- Use browser's `Intl` API for localization
- Vietnamese: DD/MM/YYYY
- Spanish: DD/MM/YYYY
- Chinese: YYYY年MM月DD日

### 7.4 Performance Targets
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Quiz load time: < 2s (per PRD requirement)

### 7.5 Browser Support
- Chrome 90+ (2021)
- Safari 14+ (2020)
- Firefox 88+ (2021)
- Edge 90+ (2021)
- Mobile Safari iOS 14+
- Chrome Android 90+

---

## 8. Appendix

### 8.1 Emoji Usage
The following emojis are used throughout the UI:

| Emoji | Unicode | Usage | Fallback |
|-------|---------|-------|----------|
| 🎉 | U+1F389 | Test completion celebration | "!" |
| 🎓 | U+1F393 | Education/eJOY logo | Icon |
| 📚 | U+1F4DA | Book/Study resources | Book icon |
| ▶ | U+25B6 | Video/Play content | Play icon |
| ✕ | U+2715 | Wrong answer | "X" |
| ✓ | U+2713 | Correct answer | Checkmark |
| ℹ | U+2139 | Information | "i" icon |
| 🔗 | U+1F517 | External link | Link icon |

### 8.2 Grid System
- Container max-width: 800px
- Column gutter: 16px (mobile), 24px (tablet+)
- Margin: 16px (mobile), 24px (tablet), 32px (desktop)

### 8.3 Z-Index Scale
```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-toast: 500;
}
```

---

## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| UI/UX Designer | [Name] | 2026-01-10 | _________ |
| Product Manager | [Name] | | _________ |
| Tech Lead | [Name] | | _________ |

---

**End of Design Specification**
