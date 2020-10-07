---
title: 6_Day--第一题
date: 2020-09-23 09:14:49
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

https://leetcode-cn.com/problems/reverse-words-in-a-string/





## 题目描述

```text
给定一个字符串，逐个翻转字符串中的每个单词。

 

示例 1：

输入: "the sky is blue"
输出: "blue is sky the"
示例 2：

输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
示例 3：

输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 

说明：

无空格字符构成一个单词。
输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 

进阶：

请选用 C 语言的用户尝试使用 O(1) 额外空间复杂度的原地解法。
```



## 前置知识

字符串

## 公司



- 微软 Microsoft|9

- 字节跳动|7

- Facebook 脸书|5

- 亚马逊 Amazon|4

- 苹果 Apple|3

- 腾讯 Tencent|2

- 谷歌 Google|2

  



## 标签

- 字符串



## 方法一：双指针



### 思路

- ##### 算法解析：

  - 倒序遍历字符串 *s* ，记录单词左右索引边界 begin , end (初始化begin=end，通过不断扫描边界进行begin和end的缩小)；
  - 每确定一个单词的边界，则将其添加至单词列表 sBuilder ；
    - 如果begin处不为空格，则begin--，直到遇到begin为空格
    - 遇到begin处为空格时，begin--，end的边界进行缩放，赋值为begin
  - 最终，将单词列表拼接为字符串，并返回即可。

### 代码

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-23 18:50:14 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-23 18:50:14 
 */
class Solution {
    public String reverseWords(String s) {
        s = s.trim();
        int end = s.length() -1, begin = end;
        StringBuilder sBuilder = new StringBuilder();
        while(begin>=0){
            while(begin>=0 && s.charAt(begin)!=' ')
            begin--;
                sBuilder.append(s.substring(begin+1,end+1) + " ");
            while(begin>=0 && s.charAt(begin)==' ')
            begin--;
            end=begin;
        }
        return sBuilder.toString().trim();
    }

}
```



### 运行结果：

![image-20200922204200669](6-Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200923185921939.png)

### **复杂度分析**

- 时间复杂度：O(N) 其中 N 为字符串 s的长度，线性遍历字符串。
- 空间复杂度：O(N)，新建的 StringBuilder(Java) 中的字符串总长度 ≤*N* ，占用 O(N)大小的额外空间。















## 方法二：



### 思路

- 将每一个单词内部进行字母的翻转，最终对整个字符串进行翻转，那么就能获得结果。

- ```tex
  the sky is blue
  => eht yks si eulb  每个单词内翻转
  => blue is sky the  最后整个字符串翻转，得到结果
  ```

  由于在Java中String是一个不可变对象（类是`final`的，大部分属性都是`final`的），所以在Java中有关字符串的结构性操作都是新建了一个**新的对象**，开销比较大。

  所以涉及到较多的字符串改动最好使用`StringBuilder`来进行替代。

### 代码

```java
class Solution {
    public String reverseWords(String s) {
        StringBuilder sb = new StringBuilder();
        StringBuilder res = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == ' ') {
                if (sb.length() == 0)
                    continue;
                res.append(sb.reverse());
                res.append(' ');
                sb = new StringBuilder();
            } else {
                sb.append(c);
            }
        }
        if (sb.length() > 0) 
            res.append(sb.reverse());
        return res.reverse().toString().trim();
    }
}
```



### 运行结果：

![image-20200922204200669](6-Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200923185302883.png)

### **复杂度分析**

- 时间复杂度：O(N) 
- 空间复杂度：O(N)





