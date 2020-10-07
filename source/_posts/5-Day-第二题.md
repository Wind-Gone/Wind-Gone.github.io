---
title: 5_Day--第二题
date: 2020-09-22 20:54:41
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: Leetcode 刷题第五天
categories: Leetcode
tags:
  - 5_Day
  - Tree
---

# Day 5

## 题目地址

https://leetcode-cn.com/problems/boundary-of-binary-tree/





## 题目描述

```
给定一棵二叉树，以逆时针顺序从根开始返回其边界。边界按顺序包括左边界、叶子结点和右边界而不包括重复的结点。 (结点的值可能重复)

左边界的定义是从根到最左侧结点的路径。右边界的定义是从根到最右侧结点的路径。若根没有左子树或右子树，则根自身就是左边界或右边界。注意该定义只对输入的二叉树有效，而对子树无效。

最左侧结点的定义是：在左子树存在时总是优先访问，如果不存在左子树则访问右子树。重复以上操作，首先抵达的结点就是最左侧结点。

最右侧结点的定义方式相同，只是将左替换成右。

示例 1

输入:
  1
   \
    2
   / \
  3   4

输出:
[1, 3, 4, 2]

解析:
根不存在左子树，故根自身即为左边界。
叶子结点是3和4。
右边界是1，2，4。注意逆时针顺序输出需要你输出时调整右边界顺序。
以逆时针顺序无重复地排列边界，得到答案[1,3,4,2]。
 

示例 2

输入:
    ____1_____
   /          \
  2            3
 / \          / 
4   5        6   
   / \      / \
  7   8    9  10  
       
输出:
[1,2,4,7,8,9,10,6,3]

解析:
左边界是结点1,2,4。(根据定义，4是最左侧结点)
叶子结点是结点4,7,8,9,10。
右边界是结点1,3,6,10。(10是最右侧结点)
以逆时针顺序无重复地排列边界，得到答案 [1,2,4,7,8,9,10,6,3]。
```



## 前置知识

树

## 公司



- 奥多比 Adobe|2

- 谷歌 Google

- 彭博 Bloomberg

- Coursera

- 英伟达 NVIDIA

- Visa

- 雅虎 Yahoo

- Facebook 脸书

- 高盛集团 Goldman Sachs

- 领英 LinkedIn

  



## 标签

- 树



## 方法一：



### 思路

- **算法**

  一个简单的方法是将问题划分成三个子问题：左边界、叶子节点和右边界。

  - 左边界：我们沿左边遍历这棵树，不断向 res数组中添加节点，并保证当前节点不是叶子节点。如果位于某个节点，我们发现不存在左孩子，但存在右孩子，我们就将右孩子放入 res 中并重复过程。下面的模拟描述了这个过程。
  - 叶子节点：我们调用递归程序 `addLeaves(res, root)`，每次调用改变根节点。如果当前节点是叶子节点，就会加入 res数组；否则，我们递归调用左孩子作为新根节点进行递归，然后是右孩子。下面的过程模拟了这个过程。
  - 右边界：和处理左边界同样的步骤。但此时我们沿着右边遍历。如果不存在右孩子，我们就向左孩子移动。同时，不直接将访问到的元素放入 res 数组中，而是放入一个栈，在完成遍历之后从栈中弹出元素并加入 res数组。下面的过程模拟了这个步骤。

### 代码

```java

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {

    public boolean isLeaf(TreeNode t) {
        return t.left == null && t.right == null;
    }

    public void addLeaves(List<Integer> res, TreeNode root) {
        if (isLeaf(root)) {
            res.add(root.val);
        } else {
            if (root.left != null) {
                addLeaves(res, root.left);
            }
            if (root.right != null) {
                addLeaves(res, root.right);
            }
        }
    }

    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        ArrayList<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        if (!isLeaf(root)) {
            res.add(root.val);
        }
        TreeNode t = root.left;
        while (t != null) {
            if (!isLeaf(t)) {
                res.add(t.val);
            }
            if (t.left != null) {
                t = t.left;
            } else {
                t = t.right;
            }

        }
        addLeaves(res, root);
        Stack<Integer> s = new Stack<>();
        t = root.right;
        while (t != null) {
            if (!isLeaf(t)) {
                s.push(t.val);
            }
            if (t.right != null) {
                t = t.right;
            } else {
                t = t.left;
            }
        }
        while (!s.empty()) {
            res.add(s.pop());
        }
        return res;
    }
}
```



### 运行结果：

![image-20200922204200669](file://E:/hu/P-WEB/MyBlog/MyBlog/source/_posts/5-Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200922204200669.png?lastModify=1600779300)

### **复杂度分析**

- 时间复杂度：O(N)，一次完整的叶子节点遍历，和两次深度的遍历。
- 空间复杂度：O(N)，res和 stack 的空间开销。