import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDevicesApi } from '../../../../state';

type FileDownloadListItemProps = {
  title: string;
  subtitle: string;
  disabled: boolean;
  filecontent?: string;
  fileurl?: string;
  filename: string;
};

const FileDownloadListItem: React.FC<FileDownloadListItemProps> = ({
  title,
  subtitle,
  disabled,
  fileurl,
  filecontent,
  filename,
}) => {
  const onDownload = () => {
    const element = document.createElement('a');
    if (filecontent) {
      const file = new Blob([filecontent], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
    } else if (fileurl) {
      element.href = fileurl;
    }
    element.download = filename;
    element.target = '_blank';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    setTimeout(() => {
      document.body.removeChild(element);
    }, 1000);
  };
  return (
    <ListItem
      secondaryAction={
        <Button variant='outlined' disabled={disabled} onClick={onDownload}>
          Download
        </Button>
      }>
      <ListItemText primary={title} secondary={subtitle} />
    </ListItem>
  );
};

type GenerateCertificateModalProps = {
  deviceId?: string;
  open: boolean;
  onCancel: () => void;
};

export const GenerateCertificateModal: React.FC<
  GenerateCertificateModalProps
> = ({ deviceId, open, onCancel }) => {
  const DevicesApi = useDevicesApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<{
    pem: string;
    publicKey: string;
    privateKey: string;
  }>({ pem: '', publicKey: '', privateKey: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (open) {
      getNewCertificates();
    } else {
      setCertificates({ pem: '', publicKey: '', privateKey: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const getNewCertificates = async () => {
    if (!deviceId) return;
    setErrorMessage('');
    setLoading(true);
    try {
      const res = await DevicesApi.createCertificates(deviceId);
      setCertificates(res);
    } catch (error) {
      console.error(error);
      setErrorMessage((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open}>
      {loading && <LinearProgress />}
      <DialogTitle>Download certificates and keys</DialogTitle>
      <DialogContent>
        {Boolean(errorMessage) && (
          <Alert severity='error'>{errorMessage}</Alert>
        )}
        <Typography variant='body2' paragraph>
          Download certificate and key files to install on your device so that
          it can connect to AWS.
        </Typography>
        <Typography variant='h5' paragraph>
          Key files
        </Typography>
        <Typography variant='caption' paragraph>
          The key files are unique to this certificate and can't be downloaded
          after you leave this page. Download them now and save them in a secure
          place.
        </Typography>
        <Alert severity='warning'>
          This is the only time you can download the key files for this
          certificate.
        </Alert>
        <List>
          <FileDownloadListItem
            title='Device certificate'
            subtitle={`${deviceId}.pem.crt`}
            disabled={loading || !certificates.pem}
            filecontent={certificates.pem}
            filename={`${deviceId}.pem.crt`}
          />
          <Divider />
          <FileDownloadListItem
            title='Public key file'
            subtitle={`${deviceId}.public.pem.key`}
            disabled={loading || !certificates.publicKey}
            filecontent={certificates.publicKey}
            filename={`${deviceId}.public.pem.key`}
          />
          <Divider />
          <FileDownloadListItem
            title='Private key file'
            subtitle={`${deviceId}.private.pem.key`}
            disabled={loading || !certificates.privateKey}
            filecontent={certificates.privateKey}
            filename={`${deviceId}.private.pem.key`}
          />
        </List>
        <Typography variant='h5' paragraph>
          Root CA Certificates
        </Typography>
        <Typography variant='caption'>
          Download the root CA certificate file that corresponds to the type of
          data endpoint and cipher suite you're using. You can also download the
          root CA certificates later.
        </Typography>
        <List>
          <FileDownloadListItem
            title='Amazon trust services endpoint'
            subtitle='RSA 2048 bit key: Amazon Root CA 1'
            disabled={loading}
            filename='AmazonRootCA1.pem'
            fileurl='https://www.amazontrust.com/repository/AmazonRootCA1.pem'
          />
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onCancel} disabled={loading}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
