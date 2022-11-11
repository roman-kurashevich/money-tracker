import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';

import { TransactionModal } from 'components';
import Transaction from 'components/Transaction';

import { TransactionType } from 'types';

import { useStyles } from './styles';

const Home: NextPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [transactionList, setTransactionList] = useState<TransactionType[]>([]);
  const [sortCategory, setSortCategory] = useState<[string, string]>(['date', 'asc']);

  const { classes } = useStyles();

  const { colors } = useMantineTheme();

  console.log('RENDER HOME');

  const addNewTransition = ({ id, category, amount, note, date, createdAt }: TransactionType) => {
    const newTransaction = {
      id,
      category,
      amount,
      note,
      date,
      createdAt,
    };

    setTransactionList([...transactionList, newTransaction]);
  };

  const totalAmount = useMemo(
    () => transactionList.reduce((total, item) => total + item.amount, 0),
    [transactionList],
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactionList(transactionList.filter((transaction) => transaction.id !== id));
  }, [transactionList]);

  const sortType = (category: string) => {
    if (sortCategory[0] === category) {
      if (sortCategory[1] === 'asc') {
        setSortCategory(() => [category, 'desc']);
      }
      if (sortCategory[1] === 'desc') {
        setSortCategory(() => [category, 'asc']);
      }
    }
    if (sortCategory[0] !== category) {
      setSortCategory(() => [category, 'asc']);
    }
    // sort();
  };

  const sortedTransactionList = useMemo(() => {
    const copyTransactionList = transactionList.concat();
    copyTransactionList
      .sort((a: TransactionType, b: TransactionType) => {
        // @ts-ignore
        if (a[sortCategory[0]] > b[sortCategory[0]]) {
          return sortCategory[1] === 'asc' ? 1 : -1;
        }
        // @ts-ignore
        if (a[sortCategory[0]] < b[sortCategory[0]]) {
          return sortCategory[1] === 'asc' ? -1 : 1;
        }

        return 0;
      });

    return copyTransactionList;
  }, [sortCategory, transactionList]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Stack className={classes.main}>
        <Group position="apart" className={classes.header}>
          <Button className={classes.button} onClick={() => setIsOpenModal(true)}>+</Button>

          <Stack spacing={0} align="flex-end">
            <Text size="sm">TOTAL AMOUNT</Text>
            <Text size="lg" color={colors.orange[6]}>{totalAmount}</Text>
          </Stack>
        </Group>

        <Group className={classes.filtersContainer}>
          <Button className={classes.button} onClick={() => sortType('date')}>date</Button>
          <Button className={classes.button} onClick={() => sortType('amount')}>amount</Button>
          <Button className={classes.button} onClick={() => sortType('category')}>category</Button>
        </Group>

        {sortedTransactionList.map((transaction) => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            category={transaction.category}
            date={transaction.date}
            amount={transaction.amount}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </Stack>

      <TransactionModal
        opened={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        addNewTransition={addNewTransition}
      />
    </>
  );
};

export default Home;
