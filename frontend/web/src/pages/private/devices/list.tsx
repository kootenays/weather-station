import { AddRounded, ArrowRightAltRounded } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { SearchTableResult } from './table';

export const DeviceListPage: React.FC = () => {
  return (
    <div>
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='overline'>Devices</Typography>
          <Button variant='outlined' size='small' startIcon={<AddRounded />}>
            Add Device
          </Button>
        </CardContent>
        <SearchTableResult
          columns={[
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'createdAt', headerName: 'Created on', flex: 1 },
            { field: 'updatedAt', headerName: 'Last Updated', flex: 1 },
            { field: 'status', headerName: 'Status', flex: 1 },
            {
              field: 'action',
              headerName: 'View',
              align: 'right',
              headerAlign: 'right',
              renderCell: (params) => {
                return (
                  <Link to={params.row.id.toString()}>
                    <IconButton>
                      <ArrowRightAltRounded />
                    </IconButton>
                  </Link>
                );
              },
            },
          ]}
          data={[
            {
              id: 1,
              name: 'Device 1',
              createdAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              updatedAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              status: 'ACTIVE',
            },
            {
              id: 2,
              name: 'Device 2',
              createdAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              updatedAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              status: 'INACTIVE',
            },
            {
              id: 3,
              name: 'Device 3',
              createdAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              updatedAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              status: 'ACTIVE',
            },
            {
              id: 4,
              name: 'Device 4',
              createdAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              updatedAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              status: 'ACTIVE',
            },
            {
              id: 5,
              name: 'Device 5',
              createdAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              updatedAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              status: 'ACTIVE',
            },
            {
              id: 6,
              name: 'Device 6',
              createdAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              updatedAt: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
              status: 'ACTIVE',
            },
          ]}
        />
      </Card>
    </div>
  );
};
