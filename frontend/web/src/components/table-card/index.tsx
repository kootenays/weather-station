import { Card, CardContent, Typography } from '@mui/material';
import { Table, TableProps } from './table';

type TableCardProps = {
  title: string;
  Action?: React.ReactNode;
} & TableProps;

export const TableCard: React.FC<TableCardProps> = ({
  title,
  Action,
  ...tableProps
}) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='overline'>{title}</Typography>
        {Action}
      </CardContent>
      <Table {...tableProps} />
    </Card>
  );
};
