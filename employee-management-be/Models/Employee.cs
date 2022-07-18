using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace employee_management_be.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }        
        public string Gender { get; set; }
        public string Age { get; set; }
        public string Salary { get; set; }
        public string Phone { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
    }
}