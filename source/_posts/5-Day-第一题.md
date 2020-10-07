---
title: 5_Day--第一题
date: 2020-09-22 18:39:29
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
  - 字符串
---

# Day 5

## 题目地址

https://leetcode-cn.com/problems/remove-comments/





## 题目描述

```text
给一个 C++ 程序，删除程序中的注释。这个程序source是一个数组，其中source[i]表示第i行源码。 这表示每行源码由\n分隔。

在 C++ 中有两种注释风格，行内注释和块注释。

字符串// 表示行注释，表示//和其右侧的其余字符应该被忽略。

字符串/* 表示一个块注释，它表示直到*/的下一个（非重叠）出现的所有字符都应该被忽略。（阅读顺序为从左到右）非重叠是指，字符串/*/并没有结束块注释，因为注释的结尾与开头相重叠。

第一个有效注释优先于其他注释：如果字符串//出现在块注释中会被忽略。 同样，如果字符串/*出现在行或块注释中也会被忽略。

如果一行在删除注释之后变为空字符串，那么不要输出该行。即，答案列表中的每个字符串都是非空的。

样例中没有控制字符，单引号或双引号字符。比如，source = "string s = "/* Not a comment. */";" 不会出现在测试样例里。（此外，没有其他内容（如定义或宏）会干扰注释。）

我们保证每一个块注释最终都会被闭合， 所以在行或块注释之外的/*总是开始新的注释。

最后，隐式换行符可以通过块注释删除。 有关详细信息，请参阅下面的示例。

从源代码中删除注释后，需要以相同的格式返回源代码。

示例 1:

输入: 
source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]

示例代码可以编排成这样:
/*Test program */
int main()
{ 
  // variable declaration 
int a, b, c;
/* This is a test
   multiline  
   comment for 
   testing */
a = b + c;
}

输出: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]

编排后:
int main()
{ 
  
int a, b, c;
a = b + c;
}

解释: 
第 1 行和第 6-9 行的字符串 /* 表示块注释。第 4 行的字符串 // 表示行注释。
示例 2:

输入: 
source = ["a/*comment", "line", "more_comment*/b"]
输出: ["ab"]
解释: 原始的 source 字符串是 "a/*comment\nline\nmore_comment*/b", 其中我们用粗体显示了换行符。删除注释后，隐含的换行符被删除，留下字符串 "ab" 用换行符分隔成数组时就是 ["ab"].
注意:

source的长度范围为[1, 100].
source[i]的长度范围为[0, 80].
每个块注释都会被闭合。
给定的源码中不会有单引号、双引号或其他控制字符。
```



## 前置知识

字符串

## 公司



- 优步 Uber|3

- 今日头条

- 奇虎360

- 网易

- 亚马逊 Amazon

- 奥多比 Adobe

- Facebook 脸书

- Hulu

- 快手

- 字节跳动

  



## 标签

- 字符串



## 方法一：



### 思路

- 这道题我的思路其实就是重点考虑块注释和行注释的位置关系，主体其实就包含两种情况：
  1. 该字符串包含“/*”，出现的位置记为indexBlock，但同时它可以包含“//”，也可以不包含，如果包含，则出现的位置记为indexLine，隐含关系（indexLine < indexBlock）, 则我们就只需用一个变量存储indexBlock之前的数据，同时往后一直找结束符“ */”，位置记为endblock，一旦找到，就把souce[i]更新为变量和endblock之后的所有字符，这个时候需要i--，因为for循环会自动进行一步i++，就相当于还是当前的数据项，我们将其加入res结果链表中
  2. 该字符串包含“//”, 但同时它可以包含“/*”，也可以不包含，隐含关系（indexLine > indexBlock）, 由于行注释的一个特点在于将整个一行全部注释掉，那么我们只需要将‘“//”之前的所有字符替换掉当前的soure[i]即可
- 展示图如下：

![image-20200922204643387](5-Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200922204643387.png)

### 代码

```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-22 20:29:51 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-22 20:29:51 
 */
class Solution {
    public List<String> removeComments(String[] source) {
        List<String> res = new ArrayList<>();
        for(int i=0; i<source.length; i++){
            int indexBlock = source[i].indexOf("/*");
            int indexLine = source[i].indexOf("//");
            if(indexBlock!=-1 && (indexLine==-1 || indexBlock < indexLine)){
                String tmp = source[i].substring(0,indexBlock);
                source[i] = source[i].substring(indexBlock+2,source[i].length());
                while(source[i].indexOf("*/") == -1){
                    i++;
                }
                int endBlock = source[i].indexOf("*/");
                source[i] = tmp +source[i--].substring(endBlock+2);
            }
            else if(indexLine!=-1 && (indexBlock == -1 || indexBlock > indexLine    )){
                source[i] = source[i--].substring(0,indexLine);
            }
            else{
                if(!source[i].isEmpty())
                res.add(source[i]);
            }
        }
        return res;   
    }
}
```



### 运行结果：

![image-20200922204200669](5-Day-%E7%AC%AC%E4%B8%80%E9%A2%98./image-20200922204200669.png)

### **复杂度分析**

- 时间复杂度：O(N) 
- 空间复杂度：O(N)











### 题解：

我在题解上看到一个写的有点冗长，但可能更便于理解的一个思路



```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-22 19:49:05 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-22 19:49:05 
 */
class Solution {

    List<String> ans=new ArrayList();
    boolean  booEnd=true; //指示代码注释块是否一一匹配
    String   tep=new String();
    public List<String> removeComments(String[] source) {
        for(String str:source){
            //以前的 /* 和 */ 都一一匹配了吗
            if(booEnd){
                //匹配了，寻找下一个注释
                findNew(str);
            }else{
                findOld(str);
            }
        }
        return ans;

    }
    // 寻找下一个注释
    public void findNew(String str){
        int  index1=  str.indexOf("//");
        int  index2=  str.indexOf("/*");
        //1. //先于/*
        if(index1>-1&& (index2==-1||index1<index2)){
            addList( str.substring(0,index1));
            return;
        }

        //2.  /* 先于//
        if(index2>-1&& (index1==-1||index2<index1)){
            //寻找 */，但是过滤 /*/的情况
            int indexLast =str.indexOf("*/",index2+2);
            //判断当前字符串中是否有 */
            if(indexLast!=-1){
                //再剩余字符中循环筛选其他注释
                findNew( str.substring(0,index2)+str.substring(indexLast+2,str.length()));
                booEnd=true;
                tep="";

            }else{
                //没有匹配到 */,标记后续字符串中寻找
                booEnd=false;
                tep= str.substring(0,index2);
            }

            return;
        }
        addList(str);
    }

    // 寻找 */
    public void findOld(String str){
        //匹配了
        int indexLast =str.indexOf("*/");
        //是否匹配到 */
        if(indexLast==-1){
            return;
        }else{
            tep=tep+str.substring(indexLast+2,str.length());
            booEnd=true;
            //循环筛选其他注释
            findNew(tep);
        }

    }

    // 判空，插入list
    public void addList(String str){

        if(str.length()!=0){
            ans.add(str);
        }

    }
}
```



