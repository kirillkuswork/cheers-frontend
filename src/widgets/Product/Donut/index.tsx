import React, { FC, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart } from 'primereact/chart';
import { IDonutItemInfoProps } from '@/widgets/Product/Donut/types';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IDonutProps {
  data: IDonutItemInfoProps[] | undefined;
  className?: string;
}

export const Donut: FC<IDonutProps> = ({ data, className }) => {
  const [chartData] = useState({
    datasets: [
      {
        data: data?.map((note) => note.percent),
        backgroundColor: data?.map((note) => note.color),
        hoverBorderScale: 0,
        hoverBorderWidth: 0,
        borderWidth: 2,
        spacing: 5,
      },
    ],
  });

  const [lightOptions] = useState({
    width: '100%',
    cutout: '60%',
    borderRadius: 10,
    spacing: 5,
    weight: 1,
    animation: {
      animateRotate: false,
    },
    plugins: {
      legend: null,
      tooltip: null,
    },
  });

  return (
    <Chart
      type="doughnut"
      data={chartData}
      options={lightOptions}
      className={clsx(styles.donut, className)}
    />
  );
};
