import { createStyles } from '@mantine/core';

export const useStyles = createStyles(({ colors }) => ({
  main: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: 400,
    padding: 10,
    borderRadius: 10,
    background: 'white',
  },
  filtersContainer: {
    width: 400,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    background: colors.gray[7],
    borderRadius: 10,
  },
}));
