import { Box, LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridOverlay,
  GridColDef,
  GridEventListener,
  GridEvents,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

/**
 * Turn the loading state to be a single line above instead of a spinner
 */
const CustomLoadingOverlay: React.FC = () => (
  <GridOverlay>
    <div style={{ position: 'absolute', top: 0, width: '100%' }}>
      <LinearProgress />
    </div>
  </GridOverlay>
);

const CustomNoResultsOverlay: React.FC = () => (
  <GridOverlay>
    No results were found, please adjust your filters and try again.
  </GridOverlay>
);

export type TableProps = {
  columns: GridColDef[];
  onRowDoubleClick?: (id: string) => void;
  data: any[];
  loading?: boolean;
};

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  onRowDoubleClick,
  loading,
}) => {
  const navigate = useNavigate();
  const handleRowDoubleClick: GridEventListener<GridEvents.rowDoubleClick> = ({
    row,
  }) => {
    // If a handler was provided, then use that
    if (onRowDoubleClick) {
      return onRowDoubleClick(row.id);
    }
    // Otherwise try and navigate to that id
    navigate(row.id);
  };
  return (
    <DataGrid
      rows={data}
      columns={columns.map((val) => ({
        // The default behaviour of Data Grid sets render cell as the
        // priority. Which means when we set valueFormatter, it gets
        // ignored. So this will make sure taht it only does it for
        // when no valueFormatter was specified.
        // https://mui.com/components/data-grid/columns/#render-cell
        ...(val.valueFormatter
          ? {}
          : {
              // Make sure if it is just text, that it will be clipped
              renderCell: ({ value }) => (
                <Box
                  component='span'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                  {value}
                </Box>
              ),
            }),
        ...val,
        // All columns are not sortable or resizable at the moment
        sortable: false,
        resizable: false,
      }))}
      paginationMode='server'
      filterMode='server'
      disableColumnMenu
      components={{
        LoadingOverlay: CustomLoadingOverlay,
        NoRowsOverlay: CustomNoResultsOverlay,
        NoResultsOverlay: CustomNoResultsOverlay,
      }}
      density='compact'
      rowHeight={60}
      rowCount={25}
      onRowDoubleClick={handleRowDoubleClick}
      loading={loading}
    />
  );
};
