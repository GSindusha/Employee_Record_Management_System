CREATE DATABASE EMS;

USE [EMS]

CREATE TABLE [dbo].[EmployeeManagement](
	[EmployeeID] [int] NOT NULL,
	[NAME] [varchar](100) NULL,
	[Gender] [varchar](100) NULL,
	[Age] [varchar](100) NULL,
	[Salary] [varchar](100) NULL,
	[Phone] [varchar](100) NULL,
	[EmailId] [varchar](100) NULL,
	[Password] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON EM

SELECT * FROM EmployeeManagement;

CREATE PROC usp_AddEmployee(@EmployeeId INT, @NAME VARCHAR(100), @Gender VARCHAR(100), @Age VARCHAR(100),    
@Salary VARCHAR(100), @Phone VARCHAR(100), @EmailId VARCHAR(100), @Password VARCHAR(100),  
@ErrorMessage VARCHAR(MAX) OUTPUT)    
AS    
BEGIN    
IF EXISTS ( SELECT 1 FROM EmployeeManagement WHERE EmployeeId = @EmployeeId)  
BEGIN  
 SET @ErrorMessage = 'Employee ID already exists.';  
END  
ELSE IF EXISTS ( SELECT 1 FROM EmployeeManagement WHERE EmailId = @EmailId)  
BEGIN  
 SET @ErrorMessage = 'Email ID already exist.';  
END  
ELSE  
BEGIN  
 INSERT INTO EmployeeManagement(EmployeeID,NAME,Gender,Age,Salary,Phone,EmailId,Password)    
 VALUES(@EmployeeID,@NAME,@Gender,@Age,@Salary,@Phone,@EmailId,@Password);    
 END  
END 

CREATE PROC usp_EmployeeList(@EmailId VARCHAR(100), @Type VARCHAR(100))    
AS    
BEGIN    
IF @Type = 'I'    
BEGIN    
 SELECT * FROM EmployeeManagement WHERE EmailId = @EmailId;    
 END    
IF @Type = 'All'    
BEGIN    
 SELECT * FROM EmployeeManagement WHERE EmailId != 'admin' and Password != 'admin';    
 END    
 IF @Type = 'SE'    
BEGIN    
 SELECT * FROM EmployeeManagement WHERE EmployeeID = @EmailId AND EmailId != 'admin' and Password != 'admin';    
 END    
END    

CREATE PROC usp_ResetPassword(@EmailId VARCHAR(100), @Password VARCHAR(100))  
AS  
BEGIN  
 Update EmployeeManagement SET Password = @Password WHERE EmailId = @EmailId;  
END

CREATE PROC usp_Login(@EmailId VARCHAR(100), @Password VARCHAR(100))  
AS  
BEGIN  
 SELECT * FROM EmployeeManagement WHERE EmailId = @EmailId and Password =@Password;  
END

CREATE PROC usp_DeleteEmployee(@EmployeeId int)    
AS    
BEGIN    
 DELETE FROM EmployeeManagement WHERE EmployeeId = @EmployeeId;    
END

INSERT INTO EmployeeManagement(EmployeeId,EmailId,Password) VALUES(0,'admin','admin')
