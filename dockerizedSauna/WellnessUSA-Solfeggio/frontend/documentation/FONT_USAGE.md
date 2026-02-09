# SCANDIA Font System Usage Guide

## Overview

The SCANDIA font system provides standardized typography for the WellnessUSA application with 10 font levels (L-1 through L-10) and 4 weight options (light, normal, medium, bold).

## CSS Classes

### Font Levels

Use font level classes to set the size:

```tsx
<div className="font-L-1">Smallest text (10-12px)</div>
<div className="font-L-2">Small text (12-14px)</div>
<div className="font-L-3">Regular text (14-16px)</div>
<div className="font-L-4">Medium text (16-18px)</div>
<div className="font-L-5">Large text (18-22px)</div>
<div className="font-L-6">Extra large (20-24px)</div>
<div className="font-L-7">Heading 1 (24-28px)</div>
<div className="font-L-8">Heading 2 (28-32px)</div>
<div className="font-L-9">Heading 3 (32-40px)</div>
<div className="font-L-10">Display text (40-48px)</div>
```

### Font Weights

Add weight classes to modify font weight:

```tsx
<div className="font-L-5 font-light">Light weight text</div>
<div className="font-L-5 font-normal">Normal weight text</div>
<div className="font-L-5 font-medium">Medium weight text</div>
<div className="font-L-5 font-bold">Bold weight text</div>
```

### Combined Classes

Use combined classes for convenience:

```tsx
<div className="font-L-5-bold">Large bold text</div>
<div className="font-L-3-light">Small light text</div>
<div className="font-L-7-medium">Heading with medium weight</div>
```

## React Component Usage

### Basic Font Component

```tsx
import { Font } from '@/components/shared/font'

<Font level={5} weight="bold">
  This is level 5 bold text
</Font>
```

### Pre-configured Components

```tsx
import { FontL1, FontL5, FontL8 } from '@/components/shared/font'

<FontL1 weight="light">Small light text</FontL1>
<FontL5 weight="normal">Regular text</FontL5>
<FontL8 weight="bold">Large heading</FontL8>
```

### With Custom Styling

```tsx
import { Font } from '@/components/shared/font'

<Font 
  level={6} 
  weight="medium"
  className="custom-class"
  style={{ color: '#ffffff' }}
  as="h1"
>
  Custom styled heading
</Font>
```

### Helper Functions

```tsx
import { getFontClass, getFontStyle } from '@/components/shared/font'

// Get className string
const className = getFontClass(5, 'bold') // "font-L-5 font-bold font-scandia"

// Get style object
const style = getFontStyle(5, 'bold') // { fontFamily: '...', fontSize: '...', ... }
```

## Examples

### Button Text

```tsx
<button className="font-L-4-bold">
  Click Me
</button>
```

### Page Title

```tsx
<h1 className="font-L-9-bold">
  Welcome to WellnessUSA
</h1>
```

### Body Text

```tsx
<p className="font-L-3-normal">
  This is regular body text that will be responsive.
</p>
```

### Card Labels

```tsx
<span className="font-L-2-light">
  Category Label
</span>
```

## Responsive Behavior

All font levels use `clamp()` for responsive sizing:
- Minimum size (mobile)
- Viewport-based size (tablet)
- Maximum size (desktop)

This ensures text scales smoothly across all device sizes.
