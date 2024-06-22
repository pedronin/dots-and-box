
import { FC, useState } from 'react';
import styles from './GridTable.module.scss';
import { TPlayers } from '../../types/global';
import clsx from 'clsx';

interface IGridTableProps {
  changeLine: (x: number, y: number, position: 'vertical' | 'horizontal') => void;
  desc: {
    fillLines: Record<string, TPlayers>;
    fillRects: Record<string, TPlayers>;
  };
  currentPlayer: TPlayers;
  lineNumber: number;
}

export const GridTable: FC<IGridTableProps> = ({ changeLine, desc, currentPlayer,lineNumber }) => {
  const [lastLine, setLastLine] = useState('')

  const changeLineHandler = (x: number, y: number, position: 'vertical' | 'horizontal') => {
    const currentLineName = `${x}-${y}-${position}`
    if (desc.fillLines[currentLineName]) return
    changeLine(x, y, position)
    setLastLine(currentLineName)
  }

  return (
    <>
      <div className={styles.desc}>
        {[... new Array(lineNumber * lineNumber)].map((_, i) => {
          const isVisibleLeft = true
          const isVisibleTop = true
          const isVisibleRight = i % lineNumber === lineNumber - 1
          const isVisibleBottom = i >= lineNumber * (lineNumber - 1)

          const leftPosition = [i % lineNumber, Math.floor(i / lineNumber), 'vertical']
          const topPosition = [i % lineNumber, Math.floor(i / lineNumber), 'horizontal']
          const rightPosition = [i % lineNumber + 1, Math.floor(i / lineNumber), 'vertical']
          const bottomPosition = [i % lineNumber, Math.floor(i / lineNumber) + 1, 'horizontal']

          return (
            <div
              className={clsx(styles.desc__item, styles[`desc__item_${currentPlayer}-init`], {
                [styles[`desc__item_${desc.fillRects[`${i % lineNumber}-${Math.floor(i / lineNumber)}`]}`]]: desc.fillRects[`${i % lineNumber}-${Math.floor(i / lineNumber)}`],
              })}
              key={i}
            >
              {isVisibleLeft && (
                <div
                  onClick={() => changeLineHandler(...leftPosition)}
                  className={clsx(styles.desc__item_leftLine, styles.desc__item_line, {
                    [`${styles[`desc__item_line_${desc.fillLines[leftPosition.join('-')]}`]}`]: desc.fillLines[leftPosition.join('-')],
                    [styles.desc__item_line_fill]: desc.fillLines[leftPosition.join('-')] && lastLine !== leftPosition.join('-')
                  })}
                >
                </div>
              )}

              {isVisibleTop && (
                <div
                  onClick={() => changeLineHandler(...topPosition)}
                  className={clsx(styles.desc__item_topLine, styles.desc__item_line, {
                    [`${styles[`desc__item_line_${desc.fillLines[topPosition.join('-')]}`]}`]: desc.fillLines[topPosition.join('-')],
                    [styles.desc__item_line_fill]: desc.fillLines[topPosition.join('-')] && lastLine !== topPosition.join('-')
                  })}
                >
                </div>
              )}

              {isVisibleRight && (
                <div
                  onClick={() => changeLineHandler(...rightPosition)}
                  className={clsx(styles.desc__item_rightLine, styles.desc__item_line, {
                    [`${styles[`desc__item_line_${desc.fillLines[rightPosition.join('-')]}`]}`]: desc.fillLines[rightPosition.join('-')],
                    [styles.desc__item_line_fill]: desc.fillLines[rightPosition.join('-')] && lastLine !== rightPosition.join('-')
                  })}
                >
                </div>
              )}

              {isVisibleBottom && (
                <div
                  onClick={() => changeLineHandler(...bottomPosition)}
                  className={clsx(styles.desc__item_bottomLine, styles.desc__item_line, {
                    [`${styles[`desc__item_line_${desc.fillLines[bottomPosition.join('-')]}`]}`]: desc.fillLines[bottomPosition.join('-')],
                    [styles.desc__item_line_fill]: desc.fillLines[bottomPosition.join('-')] && lastLine !== bottomPosition.join('-')
                  })}
                >
                </div>
              )}

              {/* Точки по углам ячеек */}
              <span className={`${styles.desc__item_circle_LeftTop} ${styles.desc__item_circle}`}></span>
              {isVisibleBottom && (
                <span className={`${styles.desc__item_circle_LeftBottom} ${styles.desc__item_circle}`}></span>
              )}
              {isVisibleRight && (
                <span className={`${styles.desc__item_circle_RightTop} ${styles.desc__item_circle}`}></span>
              )}
              {(isVisibleRight && isVisibleBottom) && (
                <span className={`${styles.desc__item_circle_RightBottom} ${styles.desc__item_circle}`}></span>
              )}
            </div>
          )
        })}
      </div >
    </>
  )
}