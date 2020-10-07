---
title: 基于Arduino的蓝牙遥控+自动循迹小车
date: 2020-09-06 20:16:32
author: 胡梓锐
top: true
cover: false
password: 
toc: false
mathjax: true
summary: 基于Arduino的蓝牙遥控+自动循迹小车
categories: Arduino
tags:
  - Study
---

# **华东师范大学软件学院课程项目报告**



## 前言：

这是自己为了完成华师大创客实践课程期末作业而做的一个简易小车，效果其实就是小车按照指定路线巡线跑，做的比较简陋，就当自己分享在博客里留个纪念了。



## 项目简介：

本项目是基于Arduino制作的一个智能循迹小车，小车完成的主要功能是能够自主识别黑色（或白色）引导线并根据黑线（或白色）实现快速稳定的循线行驶。小车系统以Arduino单片机为系统控制处理器。系统采用三路红外传感获取赛道信息，以便控制小车在偏转赛道时及时差速矫正，采用一红外避障模块进行前方道路的避障。在智能循迹的同时，还可以通过连接蓝牙模块，手动遥控让小车模拟全国机动车驾驶标准化考试的不同考核内容，如：倒车入库，S弯行驶、预警鸣笛、正确使用转向灯、侧方位停车等。此外，对整个控制软件进行设计和程序的编制以及程序的调试，并最终完成软件和硬件的融合，实现小车的预期功能。 

 

 

 

 

## 项目背景：

当前世界正在经历一场革命性的变化。正在全球展开的信息和信息技术革命，正以前所未有的方式对社会变革的方向起着决定作用，其结果必定导致信息社会在全球的实现。具体表现为，首先，在生产活动的范围广泛的工作过程中，引入了信息处理技术，从而使这些部门的自动化达到一个新的水平；其次，电讯与计算机系统合而为一，可以在几秒钟内将信息传递到全世界的任何地方，从而使人类活动各方面表现出信息活动的特征；最后，信息和信息机器成了一切活动的积极参与者，甚至参与了人类的知觉活动、概念活动和原动性活动。在此进展中，信息/知识正在以系统的方式被应用于变革物质资源，正在替代劳动成为国民生产中“附加值”的源泉。这种革命性不仅会改变生产过程，更重要的是它将通过改变社会的通讯和传播结构而催生出一个新时代、新社会。在这个社会中，信息/知识成了社会的主要财富，信息/知识流成了社会发展的主要动力，信息/情报源成了新的权力源。随着信息技术的普及，信息的获取将进一步实现民主化、平等化，这反映在社会政治关系和经济竞争上也许会有新的形式和内容，而胜负则取决于谁享有信息源优势。信息和信息技术的本质特点，在社会和经济发展方面也必将带来全新的格局。

 

智能化，归根结底，是人工智能技术发展带来的一种智能产品，它能够实现智能操控、管理以及升级等功能，赋予产品智能的性能，这是不同于普通产品，所以算是历史潮流发展的重要进程。所以智能化的小车可以代替人们在恶劣的环境下或者耗费大量时间人力的环境下完成一些人类无法介入的特殊任务。

 

 

 

## 主要功能与应用场景：

 

智能车作为现代社会的新产物，以及它的安全、节能、环保、智能化和信息化越来越受到人们的关注，在智能车的基础上开发出来的产品已经成为自动化物流运输、柔性生产组织等系统的关键设备。与此同时智能小车是机器人学中的一类，是具有自主性、适应性和交互性等于一体的综合系统。它融合了自动系统、人工智能、机械工程、信息融合、传感器技术、以及计算机等多门学科的最新研究结果。对智能小车的研究不仅具有理论意义而且具有实际价值。他可以代替人们在恶劣的环境下完成一些人类无法介入的特殊任务，可以作为自动运输机器人、采矿机器人、家用自动清洁机、服务机器人等。同时小车可以作为玩具的发展方向,为中国玩具市场技术含量的缺乏进行一定的弥补，实现经济收益形成商业价值。本项目设计立足于蓝牙模块的遥控及红外循迹对小车进行多种情况的模拟，通过调整PWM占空比控制小车左右两轮的速度以实现转向，从而使小车能够沿着黑线自动行驶，达到自动寻迹的目的，同时模拟的线路情况与全国机动车[驾驶证](https://baike.baidu.com/item/驾驶证)考核科目二考试相关联，通过小车的循迹进行标准化考试部分考核内容的演示模拟。

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image002.jpg)

 

 

 

 

## 技术原理：

（下列作图皆由绘图软件Fritzing绘制完成）

 

l Arduino 连线图：

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image004.jpg)

 

 

l PCB模块

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image006.jpg)

 

 

l 原理图：

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image008.jpg)

 

 

 

 

 

 

 

l 流程图：

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image009.png)

#### 工作原理

  TCRT5000传感器具有一对红外线发射与接收管，发射管发射出一定频率的红外线，当发射出的红外线没有被反射回来或被反射回来但强度不够大时，光敏三极管一直处于关断状态，此时模块的输出端为低电平，指示二极管一直处于熄灭状态；被检测物体出现在检测范围内时，红外线被反射回来且强度足够大，光敏三极管饱和，此时模块的输出端为高电平，指示二极管被点亮。该传感器模块对环境光线适应能力强，其当检测方向遇到障碍物(反射面)时，红外线反射回来被接收管接收,经过比较器电路处理之后，绿色指示灯会亮起，同时信号输出接口输出数字信号(一个低电平信号)，可通过电位器旋钮调节检测距离，有效距离范围2~30cm，工作电压为3.3V-5V。

 

  由于黑色具有较强的吸收能力，当循迹模块发射的红外线照射到黑线时，红外线将会被黑线吸收，导致循迹模块上光敏三极管处于关闭状态，此时模块上一个LED熄灭。在没有检测到黑线时，模块上两个LED都保持高亮。循迹模块安装
  循迹模块的工作一般要求距离待检测的黑线距离1-2cm，这里我用铜柱固定循迹模块，每个模块之间可以留1cm左右的距离。传感器在接收到反射不同的距离的时候“AO”引脚电压会不同，是模拟信号，“DO”是数字信号输出。因为在这里我们只用判断是否检测到黑线，因此使用“DO”数字信号即可，当然如果用模拟口，通过串口显示台查看再人为规定探测范围也是可以的。

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image011.jpg)

#### **完整代码：**

```c++
*/**

 ** @Author: Wind-Gone Hu* 

 ** @Date: 2020-08-13 15:39:33* 

 ** @Last Modified by: Wind-Gone Hu*

 ** @Last Modified time: 2020-08-13 16:52:44*

 **/*

*#include* <MsTimer2.h>

*#include* "interface.h"

void flash() *//**中断处理函数，改变灯的状态*

{

  static boolean output = HIGH;

  digitalWrite(led_1, output);

  output = !output;

}

 

const int threshold = 200;

void setup()

{

  *// put your setup code here, to run once:*

  Serial.begin(9600);

  pinMode(leftMotor1_1, OUTPUT);

  pinMode(leftMotor1_2, OUTPUT);

  pinMode(leftMotor2_1, OUTPUT);

  pinMode(leftMotor2_2, OUTPUT);

  pinMode(rightMotor1_1, OUTPUT);

  pinMode(rightMotor1_2, OUTPUT);

  pinMode(rightMotor2_1, OUTPUT);

  pinMode(rightMotor2_2, OUTPUT);

  pinMode(led_2, OUTPUT);

  pinMode(led_1, OUTPUT);

  pinMode(led_3, OUTPUT);

  pinMode(alarm, OUTPUT);

  pinMode(trac1, INPUT);

  pinMode(trac2, INPUT);

  pinMode(trac3, INPUT);

  pinMode(trac4, INPUT);

}

 

void loop()

{

  if (Serial.available() > 0) *//* *蓝牙判断行驶情况*

  {

​    char c = Serial.read();

​    *switch* (c)

​    {

​    *case* '1':

​      n = analogRead(A0);

​      *if* (n <= threshold) *//**对光线强度进行判断，小于预设值关闭**LED,**否则就点亮*

​      {

​        digitalWrite(led_3, HIGH);

​      }

​      *else*

​      {

​        digitalWrite(led_3, LOW);

​      }

​      tracing_forward();

​      *break*;

​    *case* '2':

​      tracing_back();

​      *break*;

​    *case* '3':

​      tracing_back();

​      MsTimer2::set(500, flash); *//* *中断设置函数，每* *500ms* *进入一次中断*

​      MsTimer2::start();     *//**开始计时*

​      *break*;

​    *case* '0':

​      digitalWrite(led_1, LOW);

​      digitalWrite(led_2, LOW);

​      *break*;

​    *default*:

​      digitalWrite(led_1, LOW);

​      digitalWrite(led_2, LOW);

​      ;

​    }

  }

}

*//**前进*

void motor_forword()

{

  Serial.println("FORWARD"); *//**输出状态*

  digitalWrite(leftMotor1_1, HIGH);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, HIGH);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, HIGH);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, HIGH);

  digitalWrite(rightMotor2_2, LOW);

  delay(1);

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(9);

}

*//**后退*

void motor_backward()

{

  Serial.println("BACKWARD"); *//**输出状态*

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, HIGH);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, HIGH);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, HIGH);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, HIGH);

  delay(2);

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(8);

}

*//**前进左转*

void motor_left_fo()

{

  Serial.println("TURN LEFT"); *//**输出状态*

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, HIGH);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, HIGH);

  digitalWrite(rightMotor2_2, LOW);

  delay(8);

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(2);

  digitalWrite(led_1, HIGH);

}

*//**前进右转*

void motor_right_fo()

{

  Serial.println("TURN RIGHT"); *//**输出状态*

  digitalWrite(leftMotor1_1, HIGH);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, HIGH);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(8);

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(2);

}

*//**后退右转*

void motor_right_ba()

{

  Serial.println("TURN RIGHT"); *//**输出状态*

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, HIGH);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, HIGH);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(8);

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(2);

}

 

*//**后退左转*

void motor_left_ba()

{

  Serial.println("TURN LEFT"); *//**输出状态*

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, HIGH);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, HIGH);

  delay(8);

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

  delay(2);

  digitalWrite(led_1, HIGH);

}

*//**停止*

void motor_stop()

{

  Serial.println("STOP"); *//**输出状态*

  digitalWrite(leftMotor1_1, LOW);

  digitalWrite(leftMotor1_2, LOW);

  digitalWrite(leftMotor2_1, LOW);

  digitalWrite(leftMotor2_2, LOW);

  digitalWrite(rightMotor1_1, LOW);

  digitalWrite(rightMotor1_2, LOW);

  digitalWrite(rightMotor2_1, LOW);

  digitalWrite(rightMotor2_2, LOW);

}

 

*//**驱动车辆行驶*

void motorRun(int cmd)

{

  *switch* (cmd)

  {

  *case* FORWARD:

​    motor_forword();

​    *break*;

 

  *case* BACKWARD:

​    motor_backward();

​    *break*;

 

  *case* TURNLEFT_FO:

​    motor_left_fo();

​    *break*;

 

  *case* TURNRIGHT_FO:

​    motor_right_fo();

​    *break*;

  *case* TURNLEFT_BA:

​    motor_left_ba();

​    *break*;

 

  *case* TURNRIGHT_BA:

​    motor_right_ba();

​    *break*;

  *default*:

​    motor_stop();

  }

}

 

void tracing_forward()

{

  int barrier = analogRead(trac4);

  Serial.println(barrier);

  int data[3];

  data[0] = digitalRead(trac1);

  data[1] = digitalRead(trac2);

  data[2] = digitalRead(trac3);

  *if* (barrier >= 500) *//**如果检测到障碍物车辆*

  {

​    *if* (!data[0] && data[1] && !data[2]) *//**左右都没有检测到黑线*

​    {

​      motorRun(FORWARD);

​      Serial.println(1);

​      digitalWrite(led_1, LOW);

​      digitalWrite(led_2, LOW);

​    }

 

​    *if* (data[1] || data[2]) *//**右边检测到黑线*

​    {

​      motorRun(TURNRIGHT_FO);

​      digitalWrite(led_1, HIGH);

​      digitalWrite(led_2, LOW);

​      Serial.println(2);

​    }

 

​    *if* (data[0] || data[1]) *//**左边检测到黑线*

​    {

​      motorRun(TURNLEFT_FO);

​      digitalWrite(led_2, HIGH);

​      digitalWrite(led_1, LOW);

​      Serial.println(3);

​    }

 

​    *else* *if* (data[0] && data[2]) *//**左右都检测到黑线是停止*

​    {

​      motorRun(STOP);

​      Serial.println(4);

​      digitalWrite(led_1, HIGH);

​      digitalWrite(led_2, HIGH);

​      delay(300);

​    }

​    *else*

​    {

​      Serial.println(5);

​      motorRun(STOP);

​      digitalWrite(led_1, HIGH);

​      digitalWrite(led_2, HIGH);

​    }

 

​    Serial.print(data[0]);

​    Serial.print("---");

​    Serial.print(data[1]);

​    Serial.print("---");

​    Serial.print(data[2]);

​    Serial.print("---");

​    Serial.println(data[3]);

  }

  *else*

  {

​    motorRun(STOP);

​    *for* (int i = 0; i < 80; i++) *//**输出一个频率的声音，周期**2ms**，**f=500Hz*

​    {

​      digitalWrite(alarm, HIGH); *//**发声音*

​      delay(1);         *//**保持* *1ms*

​      digitalWrite(alarm, LOW); *//**不发声音*

​      delay(1);

​    }

​    *for* (int i = 0; i < 100; i++) *//**输出另一个频率的声音，周期**4ms**，**f=250Hz*

​    {

​      digitalWrite(alarm, HIGH); *//**发声音*

​      delay(2);         *// 2ms*

​      digitalWrite(alarm, LOW); *//**不发声音*

​      delay(2);         *//**延时* *2ms*

​    }

​    Serial.println(6);

 

​    digitalWrite(led_1, HIGH);

​    digitalWrite(led_2, HIGH);

  }

}

 

void tracing_back()

{

  int data[3];

  data[0] = digitalRead(trac1);

  data[1] = digitalRead(trac2);

  data[2] = digitalRead(trac3);

  *// data[3] = digitalRead(12);*

 

  *if* (data[0] && data[2]) *//**左右都检测到黑线是停止*

  {

​    motorRun(STOP);

​    Serial.println(4);

​    digitalWrite(led_1, HIGH);

​    digitalWrite(led_2, HIGH);

  }

  *else*{

   *if* (!data[0] && data[1] && !data[2]) *//**左右都没有检测到黑线*

  {

​    motorRun(BACKWARD);

​    Serial.println(1);

​    digitalWrite(led_1, LOW);

​    digitalWrite(led_2, LOW);

  }

 

  *if* (data[1] || data[2] && !data[0]) *//**右边检测到黑线*

  {

​    motorRun(TURNRIGHT_BA);

​    digitalWrite(led_1, HIGH);

​    digitalWrite(led_2, LOW);

​    Serial.println(2);

  }

 

  *if* (data[0] || data[1] &&!data[2]) *//**左边检测到黑线*

  {

​    motorRun(TURNLEFT_BA);

​    digitalWrite(led_2, HIGH);

​    digitalWrite(led_1, LOW);

​    Serial.println(3);

  }

  }

  Serial.print(data[0]);

  Serial.print("---");

  Serial.print(data[1]);

  Serial.print("---");

  Serial.print(data[2]);

  Serial.print("---");

  Serial.println(data[3]);

}
```

 

 

 

 

**代码详解：**

 

首先读取蓝牙模块，判断即将运行的小车应该按照哪一种模式前行，如接受到信号为1，小车将按既定线路直行通过路口，接受到信号为2，小车将按照指定路线倒车入库，信号为3，小车或将进行侧方位停车，中间穿插信号灯与蜂鸣器的运作。

```c++
if (Serial.available() > 0) *//* *蓝牙判断行驶情况*

  {

​    char c = Serial.read();

​    *switch* (c)

​    {

​    *case* '1':

​      n = analogRead(A0);

​      *if* (n <= threshold) *//**对光线强度进行判断，小于预设值关闭**LED,**否则就点亮*

​      {

​        digitalWrite(led_3, HIGH);

​      }

​      *else*

​      {

​        digitalWrite(led_3, LOW);

​      }

​      tracing_forward();

​      *break*;

​    *case* '2':

​      tracing_back();

​      *break*;

​    *case* '3':

​      tracing_back();

​      MsTimer2::set(500, flash); *//* *中断设置函数，每* *500ms* *进入一次中断*

​      MsTimer2::start();     *//**开始计时*

​      *break*;

​    *case* '0':

​      digitalWrite(led_1, LOW);

​      digitalWrite(led_2, LOW);

​      *break*;

​    *default*:

​      digitalWrite(led_1, LOW);

​      digitalWrite(led_2, LOW);

​      ;

​    }

```

小车装有4个TCRT5000，从最右边模块开始读入数据，放入data[]数组中，三个红外传感器进行寻线，一个红外传感器进行避障

```c++
int barrier = analogRead(trac4);  
int data[3];  
data[0] = digitalRead(trac1);  
data[1] = digitalRead(trac2);  
data[2] = digitalRead(trac3); 

```

4个模块可能存在的检测状态如下，其中“1”表示检测到黑线，“0”代表没有检测到黑线：

 

| Data[0] | Data[1] | Data[2] | 小车运动状态 |
| ------- | ------- | ------- | ------------ |
| 0       | 1       | 0       | 前进         |
| 0       | 0       | 0       | 停止         |
| 1       | 1       | 0       | 左转         |
| 1       | 0       | 0       | 左转         |
| 0       | 1       | 1       | 右转         |
| 0       | 0       | 1       | 右转         |
| 1       | 0       | 1       | 停止         |
| 1       | 1       | 1       | 停止         |

 

 

第一种情况，左右两个模块都没有检测到黑线时，中间模块检测到黑线，直行：

```c++
if(!data[0] && data[1] && !data[2])  //左右都没有检测到黑线
{
        motorRun(FORWARD);
        Serial.println(1);
        digitalWrite(led_1, LOW);
        digitalWrite(led_2, LOW); 
}
```

 

 

右边任意一个模块检测到黑线时，右转：

```c++
if(data[2] || data[1])  //右边检测到黑线
{
        motorRun(TURNRIGHT_FO);
        digitalWrite(led_1, HIGH);
        digitalWrite(led_2, LOW);
        Serial.println(2);
} 
```

 

左边任意一个模块检测到黑线时，左转：

```c++
if(data[1] || data[0])  //左边检测到黑线
{
        motorRun(TURNLEFT_FO);
        digitalWrite(led_2, HIGH);
        digitalWrite(led_1, LOW);
        Serial.println(3); 
}
 
```

 

当左右两个模块都检测到黑线时，说明已经运动到轨道终点，此时停止运动：

```c++
if(data[0] && data[2])  //左右都检测到黑线是停止
{
        motorRun(STOP);
        Serial.println(4);
        digitalWrite(led_1, HIGH);
        digitalWrite(led_2, HIGH);
        delay(300); 
}
```

 

 

 

 

 

 

## 实现方法与步骤：

### **准备材料**

###### **黑色电工胶布**

  黑色胶布用于搭建小车运行的“轨道”，选用黑色宽度18mm左右的即可。

l ![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image013.jpg)

 

###### **循迹&&避障模块**

在此我们使用循迹模块TCRT5000，该模块体积小，灵敏度较高，还可以通过转动上面的电位器来调节检测范围。

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image015.png)

 

###### **蓝牙模块**

 

蓝牙模块用于控制小车不同线路的运行情况，如倒车、前进、控制方向等，循迹是小车自主寻迹，无需蓝牙控制

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image017.jpg)

 

###### **跑道的搭建**   

找一块干净的地面，贴上准备好的黑色电工胶布。由于小车自身结构的原因，转弯的时候尽可能增大转弯半径，在跑道尽头如图中那样拉一条黑色横线，用于小车识别终点。

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image019.jpg)

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image021.jpg)

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image023.jpg)

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image025.jpg)

##  

## 循迹效果展示

 

 

在起点出准备出发

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image027.jpg)

 

 

 

 

 

 

 

 

弯道中

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image029.jpg)

 

 

 

识别到终点后停止

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image031.jpg)

 

 

倒车入库

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image033.jpg)

 

 

候车区等待：

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image035.jpg)

S弯绕行

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image037.jpg)

 

 

侧方位停车

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image039.jpg)

 

 

 

 

 



遇到障碍车辆（鸣笛+双跳led灯）

 

![img](%E5%9F%BA%E4%BA%8EArduino%E7%9A%84%E8%93%9D%E7%89%99%E9%81%A5%E6%8E%A7-%E8%87%AA%E5%8A%A8%E5%BE%AA%E8%BF%B9%E5%B0%8F%E8%BD%A6./clip_image041.jpg)

 

 

## 关键技术或创新点：

 

#### 模块特色：

1. 采用TCRT5000红外反射传感器
2. 检测距离：1mm~8mm适用，焦点距离为2.5mm
3.  比较器输出，信号干净，波形好，驱动能力强，超过15mA。
4. 工作电压3.3V-5V
5.  输出形式 ：数字开关量输出（0和1）
6. 设有固定螺栓孔、铜柱，方便拆卸安装
7. 配备8.5*5.5cm面包板
8. 使用L298N驱动电机驱动小车
9. 稳定的LM2596S DC-DC 降压模块

 

#### 关键技术：

1. L298N驱动电机
2. TCRT5000红外反射传感器
3. C++程序设计语言
4. Arduino芯片
5. 智能小车搭建

 

 

#### 思维创新：

1. 制作智能小车的人也有不少，但结合当下非常普遍的科目二考试进行机动车行驶的示范模拟，还算是个有意思的想法。

2. 智能小车除却循迹，还可以结合led灯，光敏电阻，蜂鸣器，电位器进行很多现实中机动车的功能，如：转向灯、鸣笛、感受光线强弱打开不同强度的灯光。

 

 

 

## 个人贡献：

该项目由本人独立完成  

 

 

## 项目心得总结：

本次项目是由本人独立完成的一个智能小车，最后的效果囿于经费有限，只能说大概实现了我一开始的想法：进行规范化的科目二演示教学，但最后还是留有不少遗憾，一方面是因为红外传感器受光线影响较大，灵敏度不是很好，我在实验过程中深受折磨，调试很久都很难达到预期标准，等快递换器件也耗了不短的时间，二来则是由于小车重量偏大，所使用的电机不能很好的控制其运动。

但总体上自己还是收获良多，通过查询资料，思考代码，组合拼装，自己仍然乐在其中，也非常享受这个软硬件结合的项目制作。因为之前一直有在从事web/App开发，但对于硬件这一块知之甚少，很少有亲手搭建的环节，所以这次期末作业对于我个人而言是一个很好的契机，推动我去研究，去学习，在此也非常庆幸选上了陈闻杰老师嵌入式方向的这门课。

在我独立拼装的过程中其实也遇到很多问题，比如说硬件的排列布局、零件的纷繁杂乱、电压的合理选择，这些最终都通过自主研究搭建出了一个还算不错的成品，所以自己还是深感欣慰，希望以后的自己依然能保持这份热忱，在科学研究的领域不断向前。


