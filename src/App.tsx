import { useState } from 'react';
import { GridTable } from "./components/GridTable";
import { TPlayers } from './types/global';
import { GameInterface } from './components/GameInterface';
import clsx from 'clsx';

const lineNumber = 6

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<TPlayers>('blue')
  const [score, setScore] = useState<Record<TPlayers, number>>({ red: 0, blue: 0 })
  const [desc, setDesc] = useState<{
    fillLines: Record<string, TPlayers>,
    fillRects: Record<string, TPlayers>
  }>(
    { fillLines: {}, fillRects: {} }
  )

  // Закрашиваем линию
  const changeLine = (x: number, y: number, position: 'vertical' | 'horizontal') => {
    const currentLineName = `${x}-${y}-${position}`

    setDesc(prev => ({
      ...prev,
      fillLines: {
        ...prev.fillLines,
        [currentLineName]: currentPlayer
      }
    }))

    console.log(x, y, position);
    checkRect(x, y, position)
  }

  const checkRect = (x: number, y: number, position: 'vertical' | 'horizontal') => {
    const res: Record<string, TPlayers> = {}

    if (position === 'horizontal') {
      console.log(position);
      // проверка верхнего квадрата
      if (
        y !== 0
        && desc.fillLines[`${x}-${y - 1}-vertical`]
        && desc.fillLines[`${x}-${y - 1}-horizontal`]
        && desc.fillLines[`${x + 1}-${y - 1}-vertical`]
      ) {
        res[`${x}-${y - 1}`] = currentPlayer
      }

      // проверка нижнего квадрата
      if (
        y !== lineNumber
        && desc.fillLines[`${x}-${y}-vertical`]
        && desc.fillLines[`${x}-${y + 1}-horizontal`]
        && desc.fillLines[`${x + 1}-${y}-vertical`]
      ) {
        res[`${x}-${y}`] = currentPlayer
      }
    } else {
      // проверка левого квадрата
      if (
        x !== 0
        && desc.fillLines[`${x - 1}-${y}-horizontal`]
        && desc.fillLines[`${x - 1}-${y}-vertical`]
        && desc.fillLines[`${x - 1}-${y + 1}-horizontal`]
      ) {
        res[`${x - 1}-${y}`] = currentPlayer
      }

      // проверка правого квадрата
      if (
        x !== lineNumber
        && desc.fillLines[`${x}-${y}-horizontal`]
        && desc.fillLines[`${x + 1}-${y}-vertical`]
        && desc.fillLines[`${x}-${y + 1}-horizontal`]
      ) {
        res[`${x}-${y}`] = currentPlayer
      }
    }

    const isNotEmpty = Object.values(res).length

    if (isNotEmpty) {
      setScore(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + isNotEmpty }))
      setDesc(prev => ({ ...prev, fillRects: { ...prev.fillRects, ...res } }))
    } else {
      setCurrentPlayer(currentPlayer === 'blue' ? 'red' : 'blue')
    }

    console.log(desc.fillRects);

    setTimeout(() => {
      if (Object.values(desc.fillRects).length + isNotEmpty === lineNumber * lineNumber) {
        console.log('End');
        alert(score.blue > score.red ? 'Blue win!' : 'Red win!')
      }
    }, 800)
  }


  return (
    <div className={clsx('container', {
      '_red': currentPlayer === 'red',
      '_blue': currentPlayer === 'blue'
    })}>
      <GridTable
        changeLine={changeLine}
        desc={desc}
        currentPlayer={currentPlayer}
        lineNumber={lineNumber}
      />
      <GameInterface currentPlayer={currentPlayer} score={score} />
    </div>
  )
}

export default App
