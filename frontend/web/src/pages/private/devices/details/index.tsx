import { RefreshRounded, VpnKeyRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { TableCard } from '../../../../components';

// Fake data until real one is shown
const data = Array.from(Array(5)).map((_, index) => ({
  id: index,
  createdAt: DateTime.local()
    .minus({ minutes: 5 * index })
    .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
  humidity: Math.round(Math.random() * 100),
  temperature: Math.round(Math.random() * 100),
  barometric_pressure: Math.round(Math.random() * 100),
  wind_speed: Math.round(Math.random() * 100),
  wind_direction: Math.round(Math.random() * 360),
}));

/**
 * A page to show the details of a particular device. It should show the device
 * details such as the name and allow users to generate new keys for this device
 * as well as see the sensor data coming through.
 */
export const DeviceDetailPage: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3' gutterBottom>
          Device 1
        </Typography>
        <div>
          <Button variant='outlined' color='info' startIcon={<VpnKeyRounded />}>
            Generate new keys
          </Button>
        </div>
      </Box>
      <TableCard
        title='Device 1 - Sensor Data'
        Action={
          <Button variant='outlined' startIcon={<RefreshRounded />}>
            Refresh
          </Button>
        }
        columns={[
          { field: 'createdAt', headerName: 'Timestamp', width: 200 },
          { field: 'humidity', headerName: 'Humidity', flex: 1 },
          { field: 'temperature', headerName: 'Temperature', flex: 1 },
          { field: 'barometric_pressure', headerName: 'Pressure', flex: 1 },
          { field: 'wind_speed', headerName: 'Wind Speed', flex: 1 },
          { field: 'wind_direction', headerName: 'Wind Direction', flex: 1 },
        ]}
        data={data}
      />
    </div>
  );
};
