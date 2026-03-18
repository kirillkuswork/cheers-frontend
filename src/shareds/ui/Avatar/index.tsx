/* eslint-disable @next/next/no-img-element */
import { Verified, ProfileRaw } from '@/shareds/assets/icons';
import styles from './styles.module.scss';

interface IProps {
  imgUrl: string;
  isExpert?: boolean;
}

export const Avatar = ({
  imgUrl,
  isExpert = false,
}: IProps) => (
  <div className={styles.wrapper}>
    <div className={styles.imgWrapper}>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="avatar"
          className={styles.img}
          draggable={false}
        />
      ) : <ProfileRaw width={64} heigth={64} fill="#262626" />}
    </div>

    {isExpert && (
      <div className={styles.iconWrapper}>
        <div className={styles.icon}>
          <Verified />
        </div>
      </div>
    )}
  </div>
);

export default Avatar;
