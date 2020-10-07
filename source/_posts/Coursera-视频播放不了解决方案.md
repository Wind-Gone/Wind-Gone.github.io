---
title: Coursera 视频播放不了解决方案
date: 2020-09-17 16:40:23
author: 胡梓锐
top: false
cover: false
password: 123456
toc: false
mathjax: false
summary: 关于Coursera视频无法加载的解决方案
categories: Software Installment
tags:
  - Study
---

## Coursera 无法播放视频解决方案

![Coursera视频打不开终极办法](Coursera-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E4%B8%8D%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88./v2-48e560f8ea9a518b15eabc3d6bed6d8d_1440w.jpg)

https://www.zhihu.com/question/57464534

1. 用这个[在线解析工具](https://ping.eu/nslookup/) 在输入框里输入域名 d3c33hcgiwev3.cloudfront.net 

   （如果打不开这个在线解析工具，可以百度找其他的在线解析工具）他就会返回一连串的ip地址。

![image-20200917082033890](Coursera-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E4%B8%8D%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88./image-20200917082033890.png)

2. 打开我的电脑，然后输入

```text
C:\Windows\System32\drivers\etc
```

找到名为host的文件，用文本编辑器打开（我用的是Vs code）。

![image-20200917082039475](Coursera-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E4%B8%8D%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88./image-20200917082039475.png)

在host文件末尾输入 刚才在线解析工具输出的地址，按照以下格式（中间三空格）。然后保存

```text
13.35.253.167    d3c33hcgiwev3.cloudfront.net
13.35.253.88    d3c33hcgiwev3.cloudfront.net
13.35.253.19    d3c33hcgiwev3.cloudfront.net
13.35.253.70    d3c33hcgiwev3.cloudfront.net
```

![image-20200917082043414](Coursera-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E4%B8%8D%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88./image-20200917082043414.png)





3.然后打开终端，刷新dns的缓存

按住win+R打开运行对话框，框里输入cmd，点击确定。

![image-20200917082220381](Coursera-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E4%B8%8D%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88./image-20200917082220381.png)

```text
ipconfig/flushdns
```

4. 刷新coursera网页，如果依然无法播放，清除浏览器的cookies和缓存。
5. 再刷新coursera网页，如果还是无法播放。尝试用代理，并开启全局模式。
6. 如果做完以上操作，依然无法播放。恭喜你，遇到的情况和我一样，关闭浏览器，重启电脑。再打开coursera，应该就能播放了。