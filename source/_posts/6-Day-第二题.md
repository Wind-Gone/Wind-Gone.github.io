---
title: 6_Day--第二题
date: 2020-09-23 18:58:52
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第六天
categories: Leetcode
tags:
  - 6_Day
  - 字符串
---

# Day 6

## 题目地址

https://leetcode-cn.com/problems/reverse-words-in-a-string-ii/





## 题目描述

```text
给定一个字符串，逐个翻转字符串中的每个单词。

示例：

输入: ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
输出: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
注意：

单词的定义是不包含空格的一系列字符
输入字符串中不会包含前置或尾随的空格
单词与单词之间永远是以单个空格隔开的
进阶：使用 O(1) 额外空间复杂度的原地解法。
```



## 前置知识

字符串



## 公司

- VMware|2
- 亚马逊 Amazon
- 优步 Uber
- 阿里巴巴
- Facebook 脸书
- 苹果 Apple
- 彭博 Bloomberg
- 腾讯 Tencent
- 奥多比 Adobe
- 百度



## 标签

- 字符串



## 方法一：双指针

### 思路

- 先对每个单词进行翻转，然后对句子进行翻转即可。

  对单词反转后，单词的组合就变得随机混乱，比如 person 变成了 nosrep，并且此时每个单词的相对位置没变。

  再对句子进行一次翻转，不仅把每个单词变正常了，且每个单词的相对位置进行了翻转。

  翻转的函数实现很简单，给定 str 和待翻转的索引区间即可。

### 代码

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-23 19:11:58 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-23 19:11:58 
 */
class Solution {
public void reverseWords(char[] str) {
        int i = 0;
        for (int j = 0; j < str.length; j++) { // aTbTc
            if (str[j] == ' ') {
                reverse(str, i, j);
                i = j + 1;
            }
        }
        reverse(str, i, str.length); // 最后一个单词末尾没有空格
        reverse(str, 0, str.length); // 整体再翻转一次
    }

    /**
     * 将 str 的 [i, j] 进行翻转，如 "the" 转换后变成 “eht”
     * 注意，[i,j] 是左闭右开
     *
     * @param str
     * @param i
     * @param j
     */
    private void reverse(char[] str, int i, int j) {
        for (int k = i; k < (i + j) / 2; k++) {
            char tmp = str[k];  // 位置 k 的元素
            int g = j - 1 - k + i;  // 位置 k 的对称位置
            str[k] = str[g];
            str[g] = tmp;
        }
    }
}
```



### 运行结果：

![image-20200922204200669](6-Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./image-20200923192042117.png)

### **复杂度分析**

- 时间复杂度：O(N) 其中 N 为字符串 s的长度，线性遍历字符串。
- 空间复杂度：O(1)


