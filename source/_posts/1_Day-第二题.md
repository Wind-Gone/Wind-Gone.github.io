---
title: 1_Day---第二题
date: 2020-09-17 23:42:50
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

# Day 2

## 题目地址

https://leetcode-cn.com/problems/bold-words-in-string/





## 题目描述

```text
给定一个关键词集合 words 和一个字符串 S，将所有 S 中出现的关键词加粗。所有在标签 <b> 和 </b> 中的字母都会加粗。

返回的字符串需要使用尽可能少的标签，当然标签应形成有效的组合。

例如，给定 words = ["ab", "bc"] 和 S = "aabcd"，需要返回 "a<b>abc</b>d"。注意返回 "a<b>a<b>b</b>c</b>d" 会使用更多的标签，因此是错误的。

 

注：

words 长度的范围为 [0, 50]。
words[i] 长度的范围为 [1, 10]。
S 长度的范围为 [0, 500]。
所有 words[i] 和 S 中的字符都为小写字母。
 
```



## 前置知识

字符串



## 公司

- 谷歌 Google
- 亚马逊 Amazon
- 字节跳动
- 华为
- Facebook 脸书



## 标签

[字符串](https://leetcode-cn.com/tag/string/)





## 方法一

### 思路

- 直接遍历，通过一个sign数组遍历指定字符串，标记所有需要加粗的位置

- 开辟一个新字符串，result，结果返回result

- 如果标记值不为1，则result += S[i]，否则即需要开始处理/<b/>, /</b>>

- 代码思想不难，处理细节上需注意即可

  



### 代码



```java
class Solution {
    public String boldWords(String[] words, String S) {
        boolean[] sign = new boolean[S.length()];
        for(String word:words){
            int index = S.indexOf(word); //查找第一个匹配子串的位置
            int length = word.length();
            while(index!=-1){ //查找所有匹配子串的位置
                for(int j = index ;j<index+length;j++){
                    sign[j] = true;
                }     
                index = S.indexOf(word,index+1);
        	}
        }
	   StringBuilder result = new StringBuilder("");
        for(int i = 0 ; i<sign.length;){
            if(!sign[i]){
                result.append(S.charAt(i++));
            }
            else{
                result.append("<b>");
                while(i<sign.length && sign[i]){
                    result.append(
                        S.charAt(
                            i++
                        )
                    );
                }
                result.append("</b>");
                   }
        }
        return result.toString();
    }
}
```



### **复杂度分析**

- 时间复杂度：O(N)
- 空间复杂度：O(N)



## 方法二

### 思路

- 1.将words建立成一颗字典树用于查找
- 2.遍历字符串S,创建变量pre用于存储上一段加粗字段的最后一个位置
- 3.pre初始化为-1,在字符串中找到一个单词，判断这个单词是否在pre之后，若是则重新定义pre且加入"<b>"
- 4.细节：遍历到pre位置字符串加入"</b>",注意：最后字符串遍历完还需判断pre是否等于字符串长度
- 5.进一步优化：pre等于字符串长度时，可直接退出（代码自行实现）



### 代码



```c++
class Solution {
public:
    struct Node{
        Node* a[26];
        bool flag;
    };
    Node *root;
    string boldWords(vector<string>& words, string S) {
        root=new Node();
        for(int i=0;i<words.size();i++){
            Node *p=root;
			for(int j=0;j<words[i].size();j++){
                if(p->a[words[i][j]-'a']==NULL) 
					p->a[words[i][j]-'a']=new Node();
				p=p->a[words[i][j]-'a'];
            }
            p->flag=true;
        }
		
        string res="";
        int pre=-1,idx; //注意考虑边界
        for(int i=0;S[i];i++){
            idx=i;
            Node *p=root;
            while(S[idx]&&p->a[S[idx]-'a']){
                p=p->a[S[idx++]-'a'];
                if(p->flag){
                    if(i<=pre){
                        if(pre<=idx) pre=idx;   
                    } 
                    else{
                        res+="<b>";
                        pre=idx;
                    }
                }
            }
            if(i==pre) res+="</b>";
            res+=S[i];
        }
        if(S.length()==pre) res=res + "</b>";
        return res;
    }
};
```



### **复杂度分析**

- 时间复杂度：O(N)
- 空间复杂度：O(N)











