---
title: 3_Day--第二题
date: 2020-09-20 19:36:06
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第仨天
categories: Leetcode
tags:
  - Study
  - 3_Day
  - DFS
---

# Day 3

## 题目地址

https://leetcode-cn.com/problems/increasing-subsequences/





## 题目描述

```text
给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。

示例:

输入: [4, 6, 7, 7]
输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
说明:

给定数组的长度不会超过15。
数组中的整数范围是 [-100,100]。
给定数组中可能包含重复数字，相等的数字应该被视为递增的一种情况。
```

## 前置知识

深度优先搜索



## 公司



- Aetion

- 快手

- 雅虎 Yahoo

- 奥多比 Adobe

- 亚马逊 Amazon

- 苹果 Apple

- 美团点评

- 腾讯 Tencent

- 高盛集团 Goldman Sachs

- 甲骨文 Oracle

  



## 标签

- DFS



## 方法一：滑动窗口法



### 思路

- 这道题思路个人认为还是蛮容易想的（如果熟悉indexOf函数的话），这个函数的作用就是返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1，如果不为-1的话就继续下去一直寻找字符串匹配的位置。
- 这里需要注意的第一点是最后返回类型指定了`int[][]`，所以ArrayList类型需要在最后进行类型转换
- 记得最终的排序！



### 代码

```java
class Solution {
    public int[][] indexPairs(String text, String[] words) {
        List<Integer[]> temp_list = new  ArrayList<>();
        int wordlength = 0;
        for (String word: words) {
            wordlength = word.length();
            int index = text.indexOf(word);
            while(index!=-1){
                Integer []temp = {index, index+wordlength-1};
                temp_list.add(temp);
                index = text.indexOf(word,index+1);
            }
        }
        int [][] ans = new int[temp_list.size()][2];
        for(int i=0;i<temp_list.size();i++){
            ans[i][0] = temp_list.get(i)[0];
            ans[i][1] = temp_list.get(i)[1];
        }
        Arrays.sort(ans, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        return ans;
    }
    
}
```

### 运行结果：

![image-20200920190552767](3_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200920190552767.png)

### **复杂度分析**

- 时间复杂度：O(N) 这里的匹配采用了 String.indexOf() 进行操作，因此复杂度较高
- 空间复杂度：O(N)





## 方法二：（题解）



### 思路

- 遍历 words 的每一个单词 word。定义窗口大小 windowSize = word.length()；
  - 遍历字符串 text：
  - 如果 text.substring(i, i + windowSize) 和 word 一样，则保存一对索引 [i,i+i + windowSize - 1]
- 遍历的结束条件是：不满足 i <= text.length() - windowSize 则结束；
- 遍历完一个 word ，接着遍历下一个，知道遍历完所有的 word；
- 最终得到的 ans[][] 需要排序（提示的第 6 条有说明这个条件）



### 代码

```java
class Solution {
    public int[][] indexPairs(String text, String[] words) {
        int windowSize;
        List<Integer[]> lists = new ArrayList<>();
        for (String word : words) {
            windowSize = word.length();
            for (int i = 0; i <= text.length() - windowSize; i++) {
                if (word.equals(text.substring(i, i + windowSize))) {
                    Integer[] target = new Integer[2];
                    target[0] = i;
                    target[1] = i + windowSize - 1;
                    lists.add(target);
                }
            }
        }
        int[][] ans = new int[lists.size()][2];
        for (int j = 0; j < lists.size(); j++) {
            ans[j][0] = lists.get(j)[0];
            ans[j][1] = lists.get(j)[1];
        }
        Arrays.sort(ans, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        return ans;
}
```

### 运行结果：

![image-20200920191602867](3_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200920191602867.png)

### **复杂度分析**

- 时间复杂度：O(N)
- 空间复杂度：O(N)