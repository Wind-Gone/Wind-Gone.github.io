---
title: 3_Day--第一题
date: 2020-09-20 19:01:49
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第三天
categories: Leetcode
tags:
  - 3_Day
  - 字符串
  - 字典树
---

# Day 3

## 题目地址

https://leetcode-cn.com/problems/index-pairs-of-a-string/





## 题目描述

```text
给出 字符串 text 和 字符串列表 words, 返回所有的索引对 [i, j] 使得在索引对范围内的子字符串 text[i]...text[j]（包括 i 和 j）属于字符串列表 words。

 

示例 1:

输入: text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]
输出: [[3,7],[9,13],[10,17]]
示例 2:

输入: text = "ababa", words = ["aba","ab"]
输出: [[0,1],[0,2],[2,3],[2,4]]
解释: 
注意，返回的配对可以有交叉，比如，"aba" 既在 [0,2] 中也在 [2,4] 中
 

提示:

所有字符串都只包含小写字母。
保证 words 中的字符串无重复。
1 <= text.length <= 100
1 <= words.length <= 20
1 <= words[i].length <= 50
按序返回索引对 [i,j]（即，按照索引对的第一个索引进行排序，当第一个索引对相同时按照第二个索引对排序）。
```

## 前置知识

字符串



## 公司



- 亚马逊 Amazon

  



## 标签

- 字符串
- 字典树





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





## 方法三：（题解）

### 介绍：

#### **前缀树的结构**

Trie树，又叫字典树、前缀树（Prefix Tree）、单词查找树或键树，是一种多叉树结构。如下图：

![这里写图片描述](3_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./20170502145925107)

上图是一棵Trie树，表示了关键字集合{“a”, “to”, “tea”, “ted”, “ten”, “i”, “in”, “inn”} 。从上图可以归纳出Trie树的基本性质：

**①根节点不包含字符，除根节点外的每一个子节点都包含一个字符。**
**②从根节点到某一个节点，路径上经过的字符连接起来，为该节点对应的字符串。**
**③每个节点的所有子节点包含的字符互不相同。**
**④从第一字符开始有连续重复的字符只占用一个节点，比如上面的to，和ten，中重复的单词t只占用了一个节点。**

#### **前缀树的应用**

**1、前缀匹配**
**2、字符串检索**
**3、词频统计**
**4、字符串排序**





### 思路

- 采用Trie树这种方法算是我做完这道题最大的收获了，前两种其实思路一致，只是调函数不同区别而已，这道题我没想到用字典树去解决算是个不小的遗憾
- 主体思路就是先根据给的字符串数组构建字典树，然后用双指针来遍历所有的子串；
  



### 代码

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-20 19:29:50 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-20 19:29:50 
 */
class Solution {

    static class TrieNode {
    // 存储数据节点
    private char data;

    // 每层的节点都有26个子节点
    private TrieNode[] p = new TrieNode[26];

    private boolean isEndFlag = false;

    public TrieNode(char data) {
        this.data = data;
    }
}
public int[][] indexPairs(String text, String[] words) {
    Map<Integer, List<Integer>> map = new LinkedHashMap<>();
    int totalNum = 0;
    // 无意义的字符串
    TrieNode root = new TrieNode('/');

    for (String str : words) {
        insert(root, str, 0);
    }
    for (int i = 0; i <= text.length() - 1; i++) {
        for (int j = i + 1; j <= text.length(); j++) {
            if (find(root, text.substring(i, j))) {
                totalNum++;
                if (map.containsKey(i)) {
                    map.get(i).add(j - 1);
                } else {
                    List<Integer> list = new ArrayList<>();
                    list.add(j - 1);
                    map.put(i, list);
                }
            }
        }
    }
    int[][] ans = new int[totalNum][];
    int cnt = 0;
    for (Map.Entry<Integer, List<Integer>> entry : map.entrySet()) {
        for (int i : entry.getValue()) {
            ans[cnt++] = new int[] {entry.getKey(),i};
        }
    }
    return ans;
}


/**
 * 比较的逻辑是一层一层比
 *
 * @param root
 * @param str
 * @return
 */
private boolean find(TrieNode root, String str) {
    TrieNode p = root;
    for (int i = 0; i < str.length(); i++) {
        char c = str.charAt(i);
        int index = c - 'a';
        // 如果你的字符串比我的最长的字典还长，直接返回未匹配
        if (p.p[index] == null) {
            return false;
        }
        if (p.p[index].data == c) {
            p = p.p[index];
        } else {
            return false;
        }
    }
    // 如果匹配完成之后，看看最后的节点是否是结束节点
    return p.isEndFlag;
}

/**
 * 给定一个字典树，我们要插入一个字符串的顺序是什么样子的呢？
 * 插入是从根节点，一级一级加的，这个是可以用递归吗
 *
 * @param root
 * @param str
 */
private void insert(TrieNode root, String str, int i) {
    if(str==null||str.length()==0)
            return;
    if (i == str.length()) {
        root.isEndFlag = true;
        return;
    }
    int index = str.charAt(i) - 'a';
    if (root.p[index] == null) {
        TrieNode node = new TrieNode(str.charAt(i));
        root.p[index] = node;
        insert(node, str, i + 1);
    } else {
        insert(root.p[index], str, i + 1);
    }
}
}
```

### 运行结果：

![image-20200920192940757](3_Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200920192940757.png)

### **复杂度分析**

- 时间复杂度： O(k) + O(n^2) 其中k是字符数组的所有字符串的长度；n是要比较字符串的长度
- 空间复杂度：O(N)













