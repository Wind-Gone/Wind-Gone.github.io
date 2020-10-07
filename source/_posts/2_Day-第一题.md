---
title: 2_Day---第一题
date: 2020-09-19 10:33:04
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第二天
categories: Leetcode
tags:
  - 2_Day
  - 动态规划
---

# Day 2

## 题目地址

https://leetcode-cn.com/problems/paint-house/





## 题目描述

```text
假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的矩阵来表示的。

例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。请你计算出粉刷完所有房子最少的花费成本。

注意：

所有花费均为正整数。

示例：

输入: [[17,2,17],[16,16,5],[14,3,19]]
输出: 10
解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
     最少花费: 2 + 5 + 3 = 10。
```
## 前置知识

动态规划



## 公司

- 推特 Twitter|19
- 微软 Microsoft|2
- 谷歌 Google
- Visa|
- Paypal
- 亚马逊 Amazon
- 思科 Cisco
- eBay
- Pocket Gems
- Dropbox



## 标签

动态规划





## 方法一

### 思路

首先简化一下题目的意思：

1. （红，蓝，绿）可选，且价格因房而异。
2. 要求相邻的房子颜色不同。
3. 输出：最小的花费

每刷一个房子都需要保证**当前尽量最优**，而且当前的决策**受到之前的决策的影响**，这是一个非常明显的：最优子结构+子问题重叠。所以使用dp八九不离十。我一开始的想法是没有使用很严密的动态规划，但也用到了动态规划思想，即基于前一状态来进行当前状态的决策。遇到这类题目可能需要先大概列一下前几种情况，比如说：

现在有0到n-1个房子

- 刷第 0 排房子时：
  选择红色，则截至到第 0 排，总花费是 R0；
  选择蓝色，则截至到第 0 排，总花费是 B0；
  选择绿色，则截至到第 0 排，总花费是 G0；
  总共有三种花费方案：[R0,B0,G0]
- 刷第 1 排房子时:
  选择红色，那么上一层只能是蓝色或绿色并且截至到上一排总花费最低的，截至到本排，总话费是 R1 + min(B0,G0)
  选择蓝色，那么上一层只能是红色或绿色并且截至到上一排总花费最低的，截至到本排，总话费是 B1 + min(R0,G0)
  选择绿色，那么上一层只能是红色或蓝色并且截至到上一排总花费最低的，截至到本排，总话费是 G1 + min(R0,B0)
  总共有三种花费方案：[R1 + min(B0,G0), B1 + min(R0,G0), G1 + min(R0,B0)]

- 以此类推，每遍历到一排，都可以计算出当前排选择的颜色和所需的成本。

那么问题就简化为每一层的成本加上上一层除却该层已涂过色的其余颜色的最小方案成本，最后再从costs数组的三个维度找到最小方案。

**官方题解有一张树图更容易加深理解**

![在这里插入图片描述](2_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMjU2L3Blcm11dGF0aW9uX3RyZWUucG5n)



### 代码

```java
class Solution {
    public int minCost(int[][] costs) {
        if(costs.length == 0)
          return 0;
        int length = costs.length-1;
        for(int i=0;i < length;i++){
            costs[i+1][0] += Math.min(costs[i][1],costs[i][2]);
            costs[i+1][1] += Math.min(costs[i][0],costs[i][2]);
            costs[i+1][2] += Math.min(costs[i][0],costs[i][1]);
        }
        return Math.min(Math.min(costs[length][0],costs[length][1]),costs[length][2]);  
    }
}
```
### 运行结果：

![image-20200919111200671](2_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200919111200671.png)

### **复杂度分析**

- 时间复杂度：O(N)
- 空间复杂度：O(N)



## 方法二（参考题解）

### 思路

- 用更严密的dp来做的话，就需要我们开始分析首要部分：**转移的状态**。

- 每一次决策我们要考虑的有当前刷的是什么房子，当前刷什么颜色，所以**状态至少是二维的**。

- 那么我们不妨令dp[i, j] 表示i位置的房子，刷上j颜色后所用的最小总成本

- 当前状态与子问题可以列为：

  - dp[i] [j]= 第i个房子第j个颜色所用的最小花费+min{除j颜色的第i-1个房子的最小成花费}
  - 有状态转移方程：

  1. `dp[i, j] = costs[i, j], h == 0`
  2. `dp[i+1, j] = costs[i+1, j] + min(dp[i, (c+1)%3], dp[i, (c+2)%3]), h != 0`
  3. 那么初始化了h=0的情况之后，就很容易写出递推的过程



### 代码



```java
class Solution {
    public int minCost(int[][] costs) {
        if(costs.length == 0)
          return 0;
        int length = costs.length-1;
        int[][] dp = new int[length+2][3];
        dp[0][0] = costs[0][0];
        dp[0][1] = costs[0][1];
        dp[0][2] = costs[0][2];
		for(int i = 0; i < length ; i++){
            for(int j = 0; j < 3;j++){
                dp[i+1][j] = costs[i+1][j] + Math.min(dp[i][(j+1)%3],dp[i][(j+2)%3]);
            }
        }
        return Math.min(Math.min(dp[length][0], dp[length][1]), dp[length][2]);
    }
}
```
### 运行结果：

### ![image-20200919111140266](2_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200919111140266.png)

### **复杂度分析**

- 时间复杂度：O(N^2)，也可以简化为	 O（N）
- 空间复杂度：O(N)





### 优化：

参考：https://leetcode-cn.com/problems/paint-house/solution/dp-by-beney-2/

- 从上边的循环代码可以发现，实际上`dp`数组每一次只使用了`dp[n][X]`和`dp[n-1][X]`，即`dp`数组的外围每一次只使用了**相邻的两个维度**，所以外围没有必要使用n的长度。故可以将外围降成2维，通过**滚动数组**来进行进一步优化。
- 意思就是说我们可以用两层数组滚动的进行数据的求和，无需保存中间过程中的所有数据，这个想法真的很妙。
- 虽然时间复杂度量级没有变化，但是由于数组比较小，所以底层的运行的时候数据命中率会比较高，速度会有提升。



### 代码

```java
class Solution {
    public int minCost(int[][] costs) {
        if(costs.length == 0)
          return 0;
        int length = costs.length-1;
        int pos = 0;
        int[][] dp = new int[2][3];
        dp[0][0] = costs[0][0];
        dp[0][1] = costs[0][1];
        dp[0][2] = costs[0][2];
        for(int i = 0; i < length ; i++){
            pos ^= 1;
            for(int j = 0; j < 3;j++){
                dp[pos][j] = costs[i+1][j] + Math.min(dp[pos^1][(j+1)%3],dp[pos^1][(j+2)%3]);
            }
        }
       
        return Math.min(Math.min(dp[pos][0], dp[pos][1]), dp[pos][2]);
}
```
### 运行结果：

![image-20200919111122927](2_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200919111122927.png)

### **复杂度分析**

- 时间复杂度：O(N^2)
- 空间复杂度：O(1)