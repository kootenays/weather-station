import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDevicesApi } from '../../../state';

type Inputs = {
  name: string;
};

export const CreateDevicePage: React.FC = () => {
  const navigate = useNavigate();
  const { create } = useDevicesApi();
  const { control, handleSubmit, register } = useForm<Inputs>({
    defaultValues: { name: '' },
  });
  const { isDirty } = useFormState({ control });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await create(data.name);
      if (!res) {
        throw new Error('Something went wrong');
      }
      navigate(`/admin/devices/${res.id}`);
      return;
    } catch (error) {
      console.error(error);
      setErrorMessage((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom>
        Create a new device
      </Typography>
      <Card>
        <CardContent>
          {Boolean(errorMessage) && (
            <Alert severity='error'>{errorMessage}</Alert>
          )}
          <TextField label='Device Name' fullWidth {...register('name')} />
        </CardContent>
        <Divider />
        <CardActions>
          <LoadingButton
            variant='contained'
            disabled={!isDirty}
            onClick={handleSubmit(onSubmit)}
            loading={loading}>
            Create
          </LoadingButton>
        </CardActions>
      </Card>
    </div>
  );
};
