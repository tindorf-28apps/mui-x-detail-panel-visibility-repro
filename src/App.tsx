import * as React from 'react';
import { DataGridPro, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid-pro';

// All columns use `flex`. With fixed `width` values the bug does not occur.
const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1.2 },
  { field: 'location', headerName: 'Location', flex: 1 }, // hidden initially
  { field: 'customer', headerName: 'Customer', flex: 1 }, // hidden initially
  { field: 'remark', headerName: 'Remark', flex: 1.5 },
  { field: 'weight', headerName: 'Weight', flex: 0.8 },
  { field: 'ship', headerName: 'Ship (last column)', flex: 2 },
];

const rows = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  category: 'Category',
  location: 'Location',
  customer: 'Customer',
  remark: 'Remark',
  weight: 1000 + i,
  ship: `Ship ${i}`,
}));

export function App() {
  // Controlled column visibility model. With an uncontrolled model the bug does not occur.
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({
    location: false,
    customer: false,
  });

  const toggleColumns = () =>
    setColumnVisibilityModel((model) => {
      const visible = model.location === false;
      return { ...model, location: visible, customer: visible };
    });

  return (
    <div style={{ width: 1400, padding: 16 }}>
      <button onClick={toggleColumns}>Toggle "Location" and "Customer"</button>
      <div style={{ height: 400, marginTop: 8 }}>
        <DataGridPro
          rows={rows}
          columns={columns}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
          // Detail panel enabled. Without it the bug does not occur.
          getDetailPanelContent={() => <div style={{ padding: 16 }}>Detail</div>}
          getDetailPanelHeight={() => 'auto'}
        />
      </div>
    </div>
  );
}
