import { FC, useState } from 'react';
import { Button, Modal, NumberInput, Select, Stack, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { TransactionType } from 'types';

import { categories } from '../../data/mockData';

import SelectItem from './components/SelectItem';

type TransitionModalProps = {
  opened: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  addNewTransition: (newTransition: TransactionType) => void;
};

const TransactionModal: FC<TransitionModalProps> = ({
  opened,
  setIsOpenModal,
  addNewTransition,
}) => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [selectAmount, setSelectAmount] = useState<number | undefined>(0);
  const [note, setNote] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const areValuesField = (selectCategory && selectAmount && selectedDate);

  const onAddTransaction = (): void => {
    const category = selectCategory || categories[0].value;
    const date = selectedDate || new Date();
    const amount = selectAmount || 0;

    const id = String(Date.now());
    const createdAt = new Date();

    const newTransition: TransactionType = { id, category, amount, note, date, createdAt };

    if (areValuesField) {
      addNewTransition(newTransition);
    }

    setIsOpenModal(false);
  };

  return (
    <Modal
      title="Add new transaction"
      opened={opened}
      onClose={() => setIsOpenModal(false)}
    >
      <Stack spacing="lg" justify="center" align="stretch">
        <NumberInput
          value={selectAmount}
          onChange={(e) => setSelectAmount(e)}
        />

        <Select
          placeholder="Select category"
          clearable
          searchable
          allowDeselect
          data={categories}
          itemComponent={SelectItem}
          value={selectCategory}
          onChange={setSelectCategory}
        />

        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
        />

        <Button onClick={onAddTransaction} disabled={!areValuesField}>+ Add transaction</Button>
      </Stack>
    </Modal>
  );
};

export default TransactionModal;
