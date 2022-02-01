import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    // 在 state 中配置一个数独二维数组
    sudoku: [
      ['.', '.', '.', '4', '.', '.', '.', '3', '.'],
      ['7', '.', '4', '8', '.', '.', '1', '.', '2'],
      ['.', '.', '.', '2', '3', '.', '4', '.', '9'],
      ['.', '4', '.', '5', '.', '9', '.', '8', '.'],
      ['5', '.', '.', '.', '.', '.', '9', '1', '3'],
      ['1', '.', '.', '.', '8', '.', '2', '.', '4'],
      ['.', '.', '.', '.', '.', '.', '3', '4', '5'],
      ['.', '5', '1', '9', '4', '.', '7', '2', '.'],
      ['4', '7', '3', '.', '5', '.', '.', '9', '1']
    ]
  }

  // TODO：解数独
  solveSudoku = async () => {
    setTimeout(()=>{
      console.log(1)
    },500)
    const { sudoku } = this.state
    // 判断填入的数字是否有效，参考上面的代码，这里不再重复
    const isValid = (row, col, num) => {
      const numString = num.toString()
      // 判断行里是否重复
      for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === numString) {
          return false
        }
      }
      // 判断列里是否重复
      for (let i = 0; i < 9; i++) {
        if (sudoku[i][col] === numString) {
          return false
        }
      }
      // 判断九宫格里是否重复
      const startRow = parseInt(row / 3) * 3
      const startCol = parseInt(col / 3) * 3
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (sudoku[i][j] === numString) {
            return false
          }
        }
      }
      return true
    }
    // 脱离事件流，调用 setState
    const setSudoku = async (row, col, value) => {
      sudoku[row][col] = value
      return new Promise(resolve => {
        setTimeout(() => {
          this.setState({
            sudoku
          }, () => resolve())
        },500)
      })
    }
    // 递归+回溯的方式进行解题
    const solve = async (row, col) => {
      if (col >= 9) {
        col = 0
        row += 1
        if (row >= 9) return true
      }
      if (sudoku[row][col] !== '.') {
        return solve(row, col + 1)
      }
    for (let num = 1; num <= 9; num++) {
      if (!isValid(row, col, num)) {
        continue
      }

      await setSudoku(row, col, num.toString())

      if (await solve(row, col + 1)) {
        return true
      }

      await setSudoku(row, col, '.')
    }
      return false
    }
    // 进行解题
    solve(0, 0)
  }

  render() {
    const { sudoku } = this.state
    return (
      <div className="container">
        <div className="wrapper">
          {/* 遍历二维数组，生成九宫格 */}
          {sudoku.map((list, row) => (
            /* div.row 对应数独的行 */
            <div className="row" key={`row-${row}`}>
              {list.map((item, col) => (
                /* span 对应数独的每个格子 */
                <span key={`box-${col}`}>{item !== '.' && item}</span>
              ))}
            </div>
          ))}
          <div className="row"><button onClick={this.solveSudoku}>开始做题</button></div>
        </div>
      </div>
    );
  }
}

export default App;

