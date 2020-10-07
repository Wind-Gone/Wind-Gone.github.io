---
title: 2_Day---第二题
date: 2020-09-19 11:34:53
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
  - 队列
  - Resonable Design
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

队列设计



## 公司

- 亚马逊 Amazon|10
- 优步 Uber|6
- 彭博 Bloomberg|5
- 推特 Twitter|2
- 酷家乐
- 奥多比 Adobe
- 苹果 Apple
- GoDaddy
- Indeed
- Quora|



## 标签

队列

设计





## 方法一：数组或列表

### 思路

我们可以用数组或列表来记录所有传入的值。然后从中取出对应的元素来计算平均值。
![在这里插入图片描述](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMzQ2LzM0Nl9hcnJheS5wbmc)

- 我们初始化 `queue` 和`size` 来存储数据流的数据和移动窗口 `n` 的大小。
- 每次调用都将`val`加入数组之中，然后判断当前队列的长度`len`是否小于实际要求的`size`，如果成立，则取前`len`个元素求解
- 否则，则取索引从`size-len`开始的`size`个元素。

### 代码——1

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-19 12:47:14 
 * @Last Modified by: Wind-Gone Hu
 * @Last Modified time: 2020-09-19 12:47:44
 */
class MovingAverage {
    int size;
    List queue = new ArrayList<Integer>() ;     
    /** Initialize your data structure here. */
    public MovingAverage(int size) {
        this.size = size;
    }
    
public double next(int val) {
        queue.add(val);
		int len = queue.size();
        double sum = 0;
        if(	len < size ){
            for(int i=0;i < len;i++){
                sum+= Integer.parseInt(String.valueOf(queue.get(i)));
            }
        return sum/len; 
        }
        else{
            for(int i = len-size;i < len;i++){
                sum+=Integer.parseInt(String.valueOf(queue.get(i)));
            }
            return sum/size;
        }
    }
}

/**
 * Your MovingAverage object will be instantiated and called as such:
 * MovingAverage obj = new MovingAverage(size);
 * double param_1 = obj.next(val);
 */
```

### 运行结果：

![image-20200919130304405](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./image-20200919130304405.png)



### 代码——2

```java
//每次调用 `next(val)`，首先将 `val` 添加到 `queue` 中，然后我们从 `queue` 取最后 `n` 个元素计算平均值
class MovingAverage {
  int size;
  List queue = new ArrayList<Integer>();
  public MovingAverage(int size) {
    this.size = size;
  }
  public double next(int val) {
    queue.add(val);
    // calculate the sum of the moving window
    int windowSum = 0;
    for(int i = Math.max(0, queue.size() - size); i < queue.size(); ++i)
      windowSum += (int)queue.get(i);
    return windowSum * 1.0 / Math.min(queue.size(), size);
  }
}
```

### 运行结果：

![image-20200919130731530](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./image-20200919130731530.png)



### **复杂度分析**

- 时间复杂度：O(N），其中 *N* 是移动窗口的大小，每次调用 `next(val)`，我们需要从 `queue `中检索 N个元素。
- 空间复杂度：O(M)，是 `queue` 的大小。







## 方法二：双端队列

参考：https://leetcode-cn.com/problems/moving-average-from-data-stream/solution/shu-ju-liu-zhong-de-yi-dong-ping-jun-zhi-by-leetco/

### 思路：

- 我们可以比方法一使用更优的时间复杂度和空间复杂度。
- 上一种解法思路虽然容易，但很大的问题就在于每次都将元素加入`queue`中，造成了大量无用数据的累积，没有很好利用好数组空间
- 所以我们 需要考虑是否可以定期remove一定元素，通过这种方式以便更好利用数组
- 我们会注意到并不需要存储数据流中的所有值，只需要数据流中的最后 `n` 个值。
- 根据移动窗口的定义，在每个步骤中，我们向窗口添加一个新元素，同时从窗口中删除第一个元素。这里，我们可以应用一种称为双端队列的数据结构（`deque`）来实现移动窗口，它在两端删除或添加元素将具有常数的时间复杂度（O(1)）；使用双端队列，我们可以将空间复杂度降低到 O(*N*)，其中 N*N* 是移动窗口的大小。
  ![在这里插入图片描述](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMzQ2LzM0Nl9kZXF1ZS5wbmc)

- 其次，为了计算移动窗口元素的总和 `sum`，我们不需要遍历窗口的全部元素。
- 我们可以保留前一个移动窗口的总和 `sum`，然后为了得到新的移动窗口的总和，我们只需要 `sum+=new_val,sum-=first_val`，这样就可以得到新的总和，其中 `new_val` 为添加的值，`first_val` 为原移动窗口中的第一个值，这样可以将时间复杂度降低到常数。
- 核心逻辑为：

```java
if (queue.size() > this.size) {
            sum -= queue.remove();
        }
```





### 代码：

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-19 12:55:51 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-19 12:55:51 
 */
class MovingAverage {
    int size;
    List queue = new ArrayList<Integer>() ;     
    /** Initialize your data structure here. */
    public MovingAverage(int size) {
        this.size = size;
    }
	public double next(int val) {
        sum += val;
        queue.add(val);
        int len = queue.size();
        sum = len>this.size?sum-Integer.parseInt(String.valueOf(queue.remove(0))):sum; 
        return sum/queue.size();
    }
class MovingAverage {
    int size;
    List queue = new ArrayList<Integer>() ;     
    /** Initialize your data structure here. */
    public MovingAverage(int size) {
        this.size = size;
    }
	public double next(int val) {
        sum += val;
        queue.add(val);
        int len = queue.size();
        sum = len>this.size?sum-Integer.parseInt(String.valueOf(queue.remove(0))):sum; 
        return sum/queue.size();
    }
```



### 运行结果：

![image-20200919130315587](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./image-20200919130315587.png)



### **复杂度分析**

- 时间复杂度：O(1)。
- 空间复杂度：O(*N*)，移动窗口的大小。







## 方法三：基于数组的循环队列

### 思路：

- 除了 `deque` 之外，还可以应用另一种有趣的数据结构，称为循环队列 `circular queue`，它是一个环形的队列。
  ![在这里插入图片描述](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMzQ2LzM0Nl9jaXJjdWxhcl9xdWV1ZS5wbmc)

- 循环队列的主要优点是，通过向循环队列中添加新元素，它会自动丢弃最旧的元素。与 `deque` 不同，我们不需要显式地删除最旧的元素。
- 循环队列的另一个优点是，一个指针就足以跟踪队列的两端，不像 `deque` 那样，我们必须为每一端保留一个指针。



### **算法：**

无需使用任何库，可以轻松实现具有固定大小数组的循环队列。关键是 `head` 和 `tail` 元素的关系，我们可以用以下公式：
$$
\text{tail} = (\text{head} + 1) \mod \text{size}
$$
换句话说，`tail` 元素就在 `head` 元素的旁边。一旦我们向前移动 `head`，我们将覆盖前面的 `tail` 元素。
![在这里插入图片描述](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMzQ2LzM0Nl9zbmFrZS5wbmc)





### 代码：

```java
class MovingAverage {
  int size, head = 0, count = 0;
  double windowSum = 0.0;
  int[] queue;
  public MovingAverage(int size) {
    this.size = size;
    queue = new int[size];
  }

  public double next(int val) {
    ++count;
    // calculate the new sum by shifting the window
    int tail = (head + 1) % size;
    windowSum = windowSum - queue[tail] + val;
    // move on to the next head
    head = (head + 1) % size;
    queue[head] = val;
    return windowSum / Math.min(size, count);
  }
}
```



### 运行结果：



![image-20200919132029740](2_Day-%E7%AC%AC%E4%BA%8C%E9%A2%98./image-20200919132029740.png)



### **复杂度分析**

- 时间复杂度：O(1)。我们可以看到在 `next(val)` 函数中没有循环。
- 空间复杂度：O(*N*)，循环队列使用的大小。