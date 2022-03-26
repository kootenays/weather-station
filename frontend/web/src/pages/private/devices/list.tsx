import { Device } from '@klic-weather-station/backend';
import { AddRounded, ArrowRightAltRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TableCard } from '../../../components';
import { useDevicesApi } from '../../../state';

const formatSqlDateToString = ({ value }: { value: any }): string => {
  if (!value || typeof value !== 'string') return '';
  return DateTime.fromSQL(value).toLocaleString(DateTime.DATETIME_MED);
};

/**
 * A page to show a list of all the devices that is allowed to be viewed by the
 * current user.
 */
export const DeviceListPage: React.FC = () => {
  const DevicesApi = useDevicesApi();

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load data on mount
  useEffect(() => {
    onLoadDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoadDevices = async () => {
    setLoading(true);
    try {
      const res = await DevicesApi.list();
      setDevices(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <TableCard
      title='Devices'
      Action={
        <Button variant='outlined' size='small' startIcon={<AddRounded />}>
          Add Device
        </Button>
      }
      columns={[
        { field: 'name', headerName: 'Name', flex: 1 },
        {
          field: 'created_at',
          headerName: 'Created on',
          flex: 1,
          valueFormatter: formatSqlDateToString,
        },
        {
          field: 'updated_at',
          headerName: 'Last Updated',
          flex: 1,
          valueFormatter: formatSqlDateToString,
        },
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
      data={devices}
      loading={loading}
    />
  );
};
