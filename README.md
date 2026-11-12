# MUI X: missing columns after controlled visibility change

Minimal reproduction for a MUI X Data Grid bug.

When a controlled `columnVisibilityModel` makes columns visible, the last columns are not rendered. This only happens if the detail panel is enabled and all columns use `flex`.

## Run

```bash
npm install
npm run dev
```

Click "Toggle "Location" and "Customer"". After the columns appear, "Weight" and "Ship (last column)" are missing.
