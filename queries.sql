-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select c.CategoryName, p.ProductName
from Category as c
join Product as p
on p.CategoryId= c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select o.Id as orderId , s.CompanyName
from [Order] as o
join Shipper as s
on o.shipVia = s.id
where o.OrderDate < '2012-08-09'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select o.Quantity, p.ProductName from 
OrderDetail as o
join Product as p
on p.id = o.productId
where o.OrderId = 10251
ORDER BY p.ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
 select o.Id as 'Order Id',
 c.CompanyName 'Customer Company Name',
 e.LastName as 'Employee LastName'
 from [Order] as o
 join Customer as c
 on o.customerId = c.id
 join Employee as e
 on o.employeeId = e.id

 --Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT CategoryName , count() as count
 from Categories as c
 join Products as p
 on c.CategoryID = p.CategoryID
 Group By CategoryName

--Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.
SELECT OrderID, sum(Quantity) as ItemCount
FROM [OrderDetails]
Group by OrderID