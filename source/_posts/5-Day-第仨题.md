---
title: 5_Day--第仨题
date: 2020-09-22 21:11:28
tags:
---









```java
/*
 * @Author: Wind-Gone Hu 
 * @Date: 2020-09-22 21:30:37 
 * @Last Modified by:   Wind-Gone Hu 
 * @Last Modified time: 2020-09-22 21:30:37 
 */
class TrafficLight {
    private Semaphore lightcontrol;
    private boolean green_road1;
    private boolean green_road2;
    public TrafficLight() {
        green_road1 = true;
        green_road2 = false;
        lightcontrol = new Semaphore(1,true);
    }

    public void carArrived(
        int carId,           // ID of the car
        int roadId,          // ID of the road the car travels on. Can be 1 (road A) or 2 (road B)
        int direction,       // Direction of the car
        Runnable turnGreen,  // Use turnGreen.run() to turn light to green on current road
        Runnable crossCar    // Use crossCar.run() to make car cross the intersection 
    ) {
        try{
        lightcontrol.acquire();
        if(green_road1 && roadId == 1 || green_road2 && roadId ==2){
            crossCar.run();
        }
        else if(!green_road1 && roadId ==1){
            turnGreen.run();
            green_road1 = true;
            green_road2 = false;
            crossCar.run();
        }
        else if(!green_road2 && roadId ==2){
            turnGreen.run();
            green_road2 = true;
            green_road1 = false;
            crossCar.run();
        }
        lightcontrol.release();}
        catch (InterruptedException e) {
                e.printStackTrace();
            }
    }


}
```



```java
class TrafficLight {

    public TrafficLight() {
        
    }
    boolean road1IsGreen = true;
    
    public synchronized void carArrived(
        int carId,           // ID of the car
        int roadId,          // ID of the road the car travels on. Can be 1 (road A) or 2 (road B)
        int direction,       // Direction of the car
        Runnable turnGreen,  // Use turnGreen.run() to turn light to green on current road
        Runnable crossCar    // Use crossCar.run() to make car cross the intersection 
    ) {
        if ((roadId == 1) != road1IsGreen) {
            turnGreen.run();
            road1IsGreen = !road1IsGreen;
        }
        crossCar.run();
    }
}
```









