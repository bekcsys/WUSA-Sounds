# Components folder structure and layout

## Tree

```
components/
  C1Root-Top/
    C1Root-Top.js           # Root: logo area + button area
    index.js
    C2LogoContainer/
      C2-LogoContainer.js   # Logo section wrapper
      C2b-Logo.js           # Logo image (with optional border)
    C3ButtonContainer/
      C3-ButtonContainer.js # Button area wrapper (centers grey container)
      C3b-greyContainer.js  # Grey rounded box; contains buttons
      C3c-buttonsL1.js      # Single menu button (logo + label)
  C1Root-Bottom-Footer/
    C1Root-Bottom-Footer.js # Footer wrapper
    Footer.js               # Footer text
  MenuButtonContainer.js    # Standalone; uses layout.buttonsContainer
```

## Layout hierarchy (App.js)

- **Outer**: `SafeAreaView` (safeArea-OuterLayout) > `View` (innerLayout).
- **Main content**: Flex container with:
  - **Top**: `C1RootTop` (fills remaining height).
  - **Bottom**: `C1RootBottomFooter` (below, no flex grow).

Inside `C1RootTop`:

- **Top half**: `C2LogoContainer` (logo).
- **Bottom half**: `C3ButtonContainer` (menu buttons).

Inside `C3ButtonContainer`:

- Content is **centered** (vertical and horizontal).
- **C3bGreyContainer** is the only direct content; it has `maxWidth/maxHeight: 100%` so it never leaves C3ButtonContainer.
- **C3cButtonsL1** (menu buttons) are always inside C3bGreyContainer (tablet: strip or 2x2; mobile: 2x2).

## Levels

| Level | Role | Examples |
|-------|------|----------|
| Root (App) | Screen layout: top block + footer | C1RootTop, C1RootBottomFooter |
| C1Root-Top | Top block: logo + buttons | C1Root-Top.js |
| Section | One vertical region | C2LogoContainer, C3ButtonContainer |
| Container | Wrapper (centering, clipping) | C3-ButtonContainer, C3b-greyContainer, C1Root-Bottom-Footer |
| Leaf | UI piece (image, button, text) | C2b-Logo, C3c-buttonsL1, Footer |

## Exports

- **C1Root-Top/index.js**: Default `C1RootTop`; named `C3ButtonContainer`, `C3bGreyContainer`, `C3cButtonsL1`.
- **C1Root-Bottom-Footer**: No index; App imports `C1Root-Bottom-Footer/C1Root-Bottom-Footer.js` for `C1RootBottomFooter`.

## Naming

- **C1**: Top block (welcome). **C2**: Logo. **C3**: Buttons (C3b = grey box, C3c = button row). **C1Root-Bottom**: Footer.
- Files use kebab-case where needed (e.g. `C1Root-Top.js`, `C3c-buttonsL1.js`); component names are PascalCase (e.g. `C1RootTop`, `C3cButtonsL1`).
