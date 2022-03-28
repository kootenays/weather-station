import type { Device, SensorData } from '@klic-weather-station/backend';
import { PrivateApiClient } from './client';
import type { ApiResponse } from './interfaces';

export const DevicesApi = {
  /**
   * Create a single device
   */
  create: async (name: string): Promise<Device | null> => {
    const res = await PrivateApiClient.post<ApiResponse<Device>>('devices', {
      name,
    });
    return res.data.data;
  },
  /**
   * List all devices that you are allowed to see
   */
  list: async () => {
    const res = await PrivateApiClient.get<ApiResponse<Device[]>>('devices');
    return res.data.data;
  },
  /**
   * List all the sensor data for a particular device.
   * @param deviceId The id of the device to get the data for
   */
  listData: async (deviceId: string) => {
    const res = await PrivateApiClient.get<ApiResponse<SensorData[]>>(
      `devices/${deviceId}/data`
    );
    return res.data.data;
  },
};
