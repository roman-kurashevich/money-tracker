import { FC, memo } from 'react';
import moment from 'moment';
import { Avatar, Group, Stack, Text, useMantineTheme } from '@mantine/core';

import { IconX } from '@tabler/icons';
import { useStyles } from './styles';

import { categories } from '../../data/mockData';

type TransactionProps = {
  id: string;
  category: string;
  date: Date;
  amount: number;
  deleteTransaction: (id: string) => void;
};

const Transaction: FC<TransactionProps> = ({ id, category, date, amount, deleteTransaction }) => {
  const { colors } = useMantineTheme();

  const { classes } = useStyles();

  console.log('RENDER TRANSACTION');

  const getImage = (categoryValue: string) => categories
    .find((item) => item.value === categoryValue)?.image;

  console.log(getImage(category));

  return (
    <Group
      position="apart"
      key={amount}
      className={classes.transactionContainer}
      align="center"
    >
      <Group>
        <Avatar size="lg" src={getImage(category)} />

        <Stack spacing={0}>
          <Text size="sm">{category}</Text>

          <Text size="xs">{moment(date).format('LL')}</Text>
        </Stack>
      </Group>

      <Stack align="flex-end">
        <IconX size={16} className={classes.closeIcon} onClick={() => deleteTransaction(id)} />
        <Text color={colors.orange[6]}>{amount}</Text>
      </Stack>

    </Group>
  );
};

export default memo(Transaction);
