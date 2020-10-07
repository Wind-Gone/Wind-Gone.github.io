---
title: Sql_Test
date: 2020-09-02 09:44:14
author: 胡梓锐
top: false
cover: false
password: 
toc: false
mathjax: false
summary: 关于sql语法的简单练习
categories: MySQL
tags:
  - Study
---



# sql practice

## Database System Concepts Sixth Edition

[TOC]



##### 3.11 Write the following queries in SQL, using the university schema.

###### a. Find the names of all students who have taken at least one Comp.Sci. course; make sure there are no duplicate names in the result.

```sql
select distinct name 
from student natural join takes natural join course
where dept_name = 'Comp.Sci'
```



###### b. Find the IDs and names of all students who have not taken any course offering before Spring 2009.

```sql
select id,name
from student 
except
(select id,name from student natural join takes where year < 2009)
```



###### c. For each department, find the maximum salary of instructors in that department. You may assume that every department has at least one instructor.

```sql
select max(salary)
from instructor
group by dept_name
```



###### d. Find the lowest, across all departments, of the per-department maximum salary computed by the preceding query.

```sql
with max_salary(value) as 
	(select max(salary)
    from instructor
    group by dept_name)
    
   select min(max_salary.value)
   from max_salary
```



##### 3.12 Write the following queries in SQL, using the university schema.

###### a. Create a new course “CS-001”, titled “Weekly Seminar”, with 0 credits.

```sql
insert into course("CS-001","Weekly Seminar",'Comp. Sci.',0)
```



###### b. Create a section of this course in Autumn 2009, with section id of 1.

```sql
insert into section values ('CS-001', 1, 'Autumn', 2009)
```



###### c. Enroll every student in the Comp. Sci. department in the above  section.

```sql
insert into takes select id,'CS-001', 1,'Autumn', 2009 from student where dept_name = 'Comp. Sci. '
```



###### d. Delete enrollments in the above section where the student’s name is Chavez.

```sql
delete from takes 
where course id= 'CS-001' and section id = 1 and year = 2009 and semester = 'Autumn' and id in 
(select id from student where name ='Chavez')
```



###### e. Delete the course CS-001. What will happen if you run this delete statement without first deleting offerings (sections) of this course.

```sql
delete from takes
where course id = 'CS-001'
delete from section
where course id = 'CS-001'
delete from course
where course id = 'CS-001'
```



###### f. Delete all takes tuples corresponding to any section of any course with the word “database” as a part of the title; ignore case when matching the word with the title.



```sql
delete from takes
where course_id in
(select course_id from course where lower(title) like '%database%')
```



##### 3.14 Consider the insurance database of Figure 3.18, where the primary keys are underlined. Construct the following SQL queries for this 

##### relational database.

###### a. Find the number of accidents in which the cars belonging to “John Smith” were involved.

###### 

```sql
select count(distinct report_number)
from accident natrual join participated natrual join owns natrual join person,
where person.name='John Smith'
```



###### b. Update the damage amount for the car with license number “AABB2000” in the accident with report number “AR2197” to $3000.

```sql
update participated
set damage_amount = 3000
where license = 'AABB2000' and report_number = 'AR2197'
```



##### 3.15 Consider the bank database of Figure 3.19, where the primary keys are underlined. Construct the following SQL queries for this relational database.

> ```mysql
> branch(branch_name, branch_city, assets)
> customer (customer_name, customer_street, customer_city)
> loan (loan_number, branch_name, amount)
> borrower (customer_name, loan_number)
> account (account_number, branch_name, balance )
> depositor (customer_name, account_number)
> ```

###### a. Find all customers who have an account at all the branches located in “Brooklyn”.

```sql
with branch_count as 
(select count(*) from branch where branch_city = 'Brooklyn')
select customer_name 
from customer x
where branch_count = 
(select count (distinct branch_name) 
from customer y natural join depositor natural join account natural join branch 
 where x.customer_name = y.customer_name)
```



###### b. Find out the total sum of all loan amounts in the bank.

```sql
select sum(amount)
from loan
```



###### c. Find the names of all branches that have assets greater than those of at least one branch located in “Brooklyn”.

```sql
select branch_name
from branch
where asserts > some 
(select asserts from branch where branch_city = 'Brooklyn')
```



##### 3.16 Consider the employee database of Figure 3.20,where the primary keys are underlined. Give an expression in SQL for each of the following queries.

###### a. Find the names of all employees who work for First Bank Corporation.

```sql
select employee_name 
from employee natural join works
where company_name = 'First Bank Corporation'
```



###### b. Find all employees in the database who live in the same cities as the companies for which they work.

```sql
第一次写法：
select employee_name
from employee e natural join works natural join company c
where e.city = c.city

后来觉得这里用自然连接不太合适，因为name不是个良好的可以做主码的属性，比如说有多位员工叫作惠铭，那么存储在works表中的数据亦有多个关于不同惠铭的信息，那么做自然连接时就会产生大量的冗余且错乱的数据，所以这里需要我们明确指定属性的对应相等
select employee_name
from employee e natural join works w natural join company c
where e.city = c.city and w.company_name = c.company_name and e.employee_name = w.employee_name 
```



###### c. Find all employees in the database who live in the same cities and on the same streets as do their managers.

```sql
select A.employee_name 
from emloyee A , employee B ,manager C 
where A.employee_city = B.employee_city and B.employee_name = C.manager_name and A.street = B.street 
```



###### d. Find all employees who earn more than the average salary of all employees of their company.



```sql
select employee_name
from employee X
where salary > 
(select avg(salary)
from works Y
where X.company_name= Y.company_name

```



###### e. Find the company that has the smallest payroll.

```sql
select company_name
from works
group by company_name
having sum(salary) < all  (select sum(salary)
from works
group by company_name
```

