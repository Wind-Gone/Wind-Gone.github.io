---
title: 4_Day--第一题
date: 2020-09-21 20:45:07
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第四天
categories: Leetcode
tags:
  - 4_Day
  - 设计
---



# Day 4

## 题目地址

https://leetcode-cn.com/problems/design-tic-tac-toe/





## 题目描述

```text
请在 n × n 的棋盘上，实现一个判定井字棋（Tic-Tac-Toe）胜负的神器，判断每一次玩家落子后，是否有胜出的玩家。

在这个井字棋游戏中，会有 2 名玩家，他们将轮流在棋盘上放置自己的棋子。

在实现这个判定器的过程中，你可以假设以下这些规则一定成立：

      1. 每一步棋都是在棋盘内的，并且只能被放置在一个空的格子里；

      2. 一旦游戏中有一名玩家胜出的话，游戏将不能再继续；

      3. 一个玩家如果在同一行、同一列或者同一斜对角线上都放置了自己的棋子，那么他便获得胜利。

示例:

给定棋盘边长 n = 3, 玩家 1 的棋子符号是 "X"，玩家 2 的棋子符号是 "O"。

TicTacToe toe = new TicTacToe(3);

toe.move(0, 0, 1); -> 函数返回 0 (此时，暂时没有玩家赢得这场对决)
|X| | |
| | | |    // 玩家 1 在 (0, 0) 落子。
| | | |

toe.move(0, 2, 2); -> 函数返回 0 (暂时没有玩家赢得本场比赛)
|X| |O|
| | | |    // 玩家 2 在 (0, 2) 落子。
| | | |

toe.move(2, 2, 1); -> 函数返回 0 (暂时没有玩家赢得比赛)
|X| |O|
| | | |    // 玩家 1 在 (2, 2) 落子。
| | |X|

toe.move(1, 1, 2); -> 函数返回 0 (暂没有玩家赢得比赛)
|X| |O|
| |O| |    // 玩家 2 在 (1, 1) 落子。
| | |X|

toe.move(2, 0, 1); -> 函数返回 0 (暂无玩家赢得比赛)
|X| |O|
| |O| |    // 玩家 1 在 (2, 0) 落子。
|X| |X|

toe.move(1, 0, 2); -> 函数返回 0 (没有玩家赢得比赛)
|X| |O|
|O|O| |    // 玩家 2 在 (1, 0) 落子.
|X| |X|

toe.move(2, 1, 1); -> 函数返回 1 (此时，玩家 1 赢得了该场比赛)
|X| |O|
|O|O| |    // 玩家 1 在 (2, 1) 落子。
|X|X|X|
```



## 前置知识

基本设计思想

## 公司



- 谷歌 Google|4

- 优步 Uber|3

- DoorDash|2

- 彭博 Bloomberg|2

- Salesforce|2]

- 奥多比 Adobe

- Walmart Labs

- 思科 Cisco

- TripleByte

- 字节跳动

  



## 标签

- 合理设计



## 方法一：



### 思路

- 定义三个数组：rows[]、cols[]、dig[]。

  玩家一在 (r,c) 坐标放入一个棋子，我们就让 rows[r]++、cols[c]++，意思是 r 行和 c 列放入了玩家一的棋子。

  如果是(r,c)在左上到右下的斜线里，对 dig[0]++，如果是在右上到左下的斜线里，dig[1]++。

  玩家二和上面一样的操作，只不过是把++换成--。

  这样处理的好处是：每放入一颗棋子，对三个数组++或--后。我们进行以下判断：

  1、rows[r] == n 是否成立，若成立，说明 r 行一定执行了 n 次 +1 操作，换句话说，r 行放了 n 个玩家一的棋子，即玩家一获胜；

  2、cols[c] == n 是否成立，和上一条一样的原理；

  3、dig[0] == n 是否成立，即左上到右下的斜线是否全是玩家 1 的棋子；

  4、dig[1] == n 是否成立，即右上到左下的斜线是否全是玩家 1 的棋子。

  需要注意的是，若网格是 3 × 3 ,此时 rows[r] = 1，不能理解为 r 行有玩家一的 1 颗棋子，因为它也可能是放了两颗玩家一的棋子和一颗玩家二的棋子，即加了两次 1，减了依次 1，最终是 1 。

  我们不关心这些数组等于的其他值，我们只关心是否等于 n，只有当某一行或者某一列或者某一斜线全是某一个玩家的棋子，它的值才能取到 n 或者 -n。只要掺杂了不同玩家的棋子，或者有空位，就不可能取到 n 或者 -n ，即此时游戏尚未结束。



### 代码

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-21 20:45:01 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-21 20:45:01 
 */
class TicTacToe {
    int[] rows, cols, dig;
    int n;
    /** Initialize your data structure here. */
    public TicTacToe(int n) {
        rows = new int[n];
        cols = new int[n];
        dig = new int[2];
        this.n = n;
    }
    
    /** Player {player} makes a move at ({row}, {col}).
        @param row The row of the board.
        @param col The column of the board.
        @param player The player, can be either 1 or 2.
        @return The current winning condition, can be either:
                0: No one wins.
                1: Player 1 wins.
                2: Player 2 wins. */
    public int move(int row, int col, int player) {
        boolean gameresult = false;
        if(player == 1){
            rows[row]++;
            cols[col]++;
            if(row==col)
                dig[0]++;
            if(row+col==n-1)
                dig[1]++;
            gameresult = rows[row] == n ||    // 若第 row 行全是玩家 1 的棋子，那么 rows[row] 的值就是 n
                    cols[col] == n ||   // 若第 col 行全是玩家 1 的棋子，那么 cols[col] 的值就是 n
                    (row == col && dig[0] == n) ||  // 若左上到右下全是玩家 1 的棋子，那么 dig[0] 的值就是 n
                    (row + col == n - 1 && dig[1] == n);    // 若右上到左下全是玩家 1 的棋子，那么 dig[1] 的值就是 n
            return gameresult ? player : 0;      
        }
        else{
            rows[row]--;
            cols[col]--;
            if(row==col)
                dig[0]--;
            if(row+col==n-1)
                dig[1]--;
            gameresult = rows[row] == -n ||   
                    cols[col] == -n ||   
                    (row == col && dig[0] == -n) ||  
                    (row + col == n - 1 && dig[1] == -n);   
            return gameresult ? player : 0;      
        }
    }
}

/**
 * Your TicTacToe object will be instantiated and called as such:
 * TicTacToe obj = new TicTacToe(n);
 * int param_1 = obj.move(row,col,player);
 */
```

### 运行结果：

![image-20200921205156619](4_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200921205156619.png)

### **复杂度分析**

- 时间复杂度：O(1) 
- 空间复杂度：O(N)



### 简化（题解）

所谓的一行代码完美求解，思想与我的基本一致，当然可读性未必有上面的好

```java
class TicTacToe {
    int[] rows, cols, dig;
    int n;
    public TicTacToe(int n) {
        rows = new int[n];
        cols = new int[n];
        dig = new int[2];
        this.n = n;
    }
    public int move(int row, int col, int player) {
        return ((player == 1 && rows[row]++ == n-1 | cols[col]++ == n-1 | (row == col && dig[0]++ == n-1) | (row + col == n-1 && dig[1]++ == n-1)) || (player == 2 && rows[row]-- == 1-n | cols[col]-- == 1-n | (row == col && dig[0]-- == 1-n) | (row + col == n-1 && dig[1]-- == 1-n))) ? player : 0; 
    }
}
```

![image-20200921205211330](4_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200921205211330.png)





补充一个采用DFS的python代码：

虽然耗时更多，但深度优先搜索思想还是利用蛮到位的

```python
class TicTacToe:
    def __init__(self, n: int):
        self.grid = [[0] * n for _ in range(n)]
        self.mark = ['_','X','O']
        self.n = n

    def move(self, row: int, col: int, player: int) -> int:
        self.grid[row][col] = self.mark[player]
        def dfs(start, d):
            i, j = start[0], start[1]
            for x, y in d:
                ni, nj = i+x, j+y
                if (ni,nj) not in visited:
                    if 0<= ni < self.n and 0 < =nj < self.n:
                        if self.grid[ni][nj]==self.mark[player]:
                            visited.add((ni,nj))
                            dfs((ni,nj),d)

        directions = [[(-1,0),(1,0)],[(0,-1),(0,1)],[(-1,1),(1,-1)],[(1,1),(-1,-1)]]
        for d in directions:
            visited = set([(row,col)])
            dfs((row,col),d)
            if len(visited) == self.n:
                return player
        return 0
'''
执行用时：208 ms, 在所有 Python3 提交中击败了18.18%的用户
内存消耗：16.4 MB, 在所有 Python3 提交中击败了5.40%的用户
'''
```

