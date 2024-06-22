import { FC } from 'react';
import styles from './GameInterface.module.scss';
import { TPlayers } from '../../types/global';

interface IGameInterfaceProps {
  currentPlayer: TPlayers,
  score: Record<TPlayers, number>,
}

export const GameInterface: FC<IGameInterfaceProps> = ({ currentPlayer, score }) => {
  return (
    <>
      <h1 className={styles.currentPlayer}>{currentPlayer}</h1>
      <div className={styles.score}>
        <div className={styles.score__wrap}>
          <span className={styles.score_red}>{score.red}</span>
          <span>:</span>
          <span className={styles.score_blue}>{score.blue}</span>
        </div>
      </div>
    </>
  )
}