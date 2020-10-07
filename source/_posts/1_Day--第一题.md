---
title: 1_Day---第一题
date: 2020-09-17 21:40:09
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第一天
categories: Leetcode
tags:
  - Day1
  - String

---

# Day1--第一题

## 题目地址

https://leetcode-cn.com/problems/remove-vowels-from-a-string/submissions/



## 题目描述

```text
给你一个字符串 S，请你删去其中的所有元音字母（ 'a'，'e'，'i'，'o'，'u'），并返回这个新字符串。

 

示例 1：

输入："leetcodeisacommunityforcoders"
输出："ltcdscmmntyfrcdrs"
示例 2：

输入："aeiou"
输出：""
 

提示：

S 仅由小写英文字母组成。
1 <= S.length <= 1000
```
## 前置知识

字符串



## 公司

- 亚马逊 Amazon
- 苹果 Apple
- 雅虎 Yahoo
- 奥多比 Adobe



## 标签

[字符串](https://leetcode-cn.com/tag/string/)



## 方法一

### 思路

- 一遍搜索，判断字符串中是否包含需要排除的字符
- 这里由于字符数量较少，可以用&&连接，否则可以通过一个数组存储指定排除字符
- 最后返回结果字符串



### 代码

```c++
class Solution {
public:
    string removeVowels(string S) {
        string result = "";
        for(int i = 0 ; i < S.length(); i++){
            if(S[i]!='a' && S[i] != 'e'&& S[i]!='i' && S[i] != 'o'&& S[i] != 'u'){
                result+=S[i];
            }
        }
        return result;
    }
};
```
------



```python
class Solution(object):
    def removeVowels(self, S):
        """
        :type S: str
        :rtype: str
        """
        return ''.join([i for i in S if i not in ['a', 'e', 'i', 'o', 'u']])
```
------



```java
class Solution {
    public String removeVowels(String S) {
        String str = "aeiou";
        StringBuilder sb = new StringBuilder();
        for(char c : S.toCharArray()) {
            if(str.indexOf(c) == -1) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
```
### **复杂度分析**

- 时间复杂度：O(N)
- 空间复杂度：O(N)







## 方法二：

### 思路

- 同上，但这次通过调用C++ 中 api函数,每次删除一个元素即可，无需开辟额外空间
- 函数原型如下：

```c++
basic_string & erase(size_type pos=0, size_type n=npos);
即从给定起始位置pos处开始删除, 要删除字符的长度为n, 返回值修改后的string对象引用
```
### 代码

```c++
class Solution {
public:
    string removeVowels(string S) {
        for(int i = 0 ; i  < S.length(); i++){
            if(S[i] =='a' || S[i] == 'e'|| S[i] =='i' || S[i] == 'o' || S[i] == 'u'){
                S.erase(i,1);
                i--;
            }
        }
        return S;
    }
};
```




##### 二次精简：

```c++
class Solution {
public:
    string removeVowels(string S) {
        for(auto it = S.begin(); it != S.end();){
            if((*it) == 'a' || (*it) == 'e' || (*it) == 'i' || (*it) == 'o' || (*it) == 'u'){
                S.erase(it);
                continue;
            }
            ++it;
        }
        return S;
    }
};
```
### **复杂度分析**

- 时间复杂度：O(N)
- 空间复杂度：O(1)

