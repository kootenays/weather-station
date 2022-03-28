import { SensorData } from '@klic-weather-station/backend';
import { RefreshRounded, VpnKeyRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TableCard } from '../../../../components';
import { useDevicesApi } from '../../../../state';
import { GenerateCertificateModal } from './certificate';

/**
 * A page to show the details of a particular device. It should show the device
 * details such as the name and allow users to generate new keys for this device
 * as well as see the sensor data coming through.
 */
export const DeviceDetailPage: React.FC = () => {
  const DevicesApi = useDevicesApi();
  const { deviceId } = useParams<{ deviceId: string }>();

  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [certificateModalOpen, setCertificateModalOpen] =
    useState<boolean>(false);

  // Load data on mount
  useEffect(() => {
    onLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoadData = async () => {
    if (!deviceId) return;
    setLoading(true);
    try {
      const res = await DevicesApi.listData(deviceId);
      setData(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onGenerateCertificate = () => {
    setCertificateModalOpen(true);
  };

  const onCancelModal = () => {
    setCertificateModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        style={{ flex: 0 }}>
        <Typography variant='h3' gutterBottom>
          Device {deviceId}
        </Typography>
        <div>
          <Button
            variant='outlined'
            color='info'
            startIcon={<VpnKeyRounded />}
            onClick={onGenerateCertificate}>
            Generate certificates
          </Button>
        </div>
      </Box>
      <TableCard
        title='Device 1 - Sensor Data'
        Action={
          <Button
            variant='outlined'
            startIcon={<RefreshRounded />}
            onClick={onLoadData}>
            Refresh
          </Button>
        }
        columns={[
          {
            field: 'timestamp',
            headerName: 'Timestamp',
            width: 200,
            valueFormatter: ({ value }: { value: any }): string => {
              if (!value || typeof value !== 'string') return '';
              return DateTime.fromSQL(value).toLocaleString(
                DateTime.DATETIME_SHORT_WITH_SECONDS
              );
            },
          },
          { field: 'humidity', headerName: 'Humidity', flex: 1 },
          { field: 'temperature', headerName: 'Temperature', flex: 1 },
          { field: 'barometric_pressure', headerName: 'Pressure', flex: 1 },
          { field: 'wind_speed', headerName: 'Wind Speed', flex: 1 },
          { field: 'wind_direction', headerName: 'Wind Direction', flex: 1 },
        ]}
        data={data}
        loading={loading}
      />
      <GenerateCertificateModal
        deviceId={deviceId || ''}
        open={certificateModalOpen}
        onCancel={onCancelModal}
      />
    </>
  );
};
