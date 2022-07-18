using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using employee_management_be.Models;
using System.Collections.Generic;
using System;
using Newtonsoft.Json;

namespace employee_management_be.Controllers
{
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiController
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi_conn"].ConnectionString);

        
        [HttpPost]
        [Route("Registration")]
        public string Registration(Employee employee)
        {
            string msg = "";
            if (employee != null)
            {
                SqlCommand cmd = new SqlCommand("usp_AddEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                cmd.Parameters.AddWithValue("@Name", employee.Name);
                cmd.Parameters.AddWithValue("@Gender", employee.Gender);
                cmd.Parameters.AddWithValue("@Age", employee.Age);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                cmd.Parameters.AddWithValue("@Phone", employee.Phone);
                cmd.Parameters.AddWithValue("@EmailId", employee.EmailId);
                cmd.Parameters.AddWithValue("@Password", employee.Password);
                cmd.Parameters.Add("@ErrorMessage", SqlDbType.VarChar, 100);
                cmd.Parameters["@ErrorMessage"].Direction = ParameterDirection.Output;
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i > 0)
                {
                    msg = "Employee registered successfully.";
                }
                else
                {
                    msg = Convert.ToString(cmd.Parameters["@ErrorMessage"].Value);
                }
            }
            return msg;
        }

        [HttpPost]
        [Route("Login")]
        public string Login(Employee employee)
        {
            string msg = "";
            if (employee != null)
            {
                SqlDataAdapter da = new SqlDataAdapter("usp_Login", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@EmailId", employee.EmailId);
                da.SelectCommand.Parameters.AddWithValue("@Password", employee.Password);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    msg = "Login successful.";
                }
                else
                {
                    msg = "Error";
                }
            }
            return msg;
        }

        [HttpPost]
        [Route("EmployeeList")]
        public List<Employee> EmployeeList(Employee employee)
        {
            List<Employee> lstEmployees = new List<Employee>();
            if (employee != null)
            {
                SqlDataAdapter da = new SqlDataAdapter("usp_EmployeeList", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@EmailId", employee.EmailId);
                da.SelectCommand.Parameters.AddWithValue("@Type", employee.Type);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Employee emp = new Employee();
                        emp.EmployeeId = Convert.ToInt32(dt.Rows[i]["EmployeeId"]);
                        emp.Name = Convert.ToString(dt.Rows[i]["Name"]);
                        emp.Gender = Convert.ToString(dt.Rows[i]["Gender"]);
                        emp.Age = Convert.ToString(dt.Rows[i]["Age"]);
                        emp.Salary = Convert.ToString(dt.Rows[i]["Salary"]);
                        emp.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                        emp.EmailId = Convert.ToString(dt.Rows[i]["EmailId"]);
                        emp.Password = Convert.ToString(dt.Rows[i]["Password"]);
                        lstEmployees.Add(emp);
                    }
                }
                else
                {
                    lstEmployees = null;
                }
            }
            return lstEmployees;
        }

        [HttpPost]
        [Route("ResetPassword")]
        public string ResetPassword(Employee employee)
        {
            string msg = "";
            if (employee != null)
            {
                SqlCommand cmd = new SqlCommand("usp_ResetPassword", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmailId", employee.EmailId);
                cmd.Parameters.AddWithValue("@Password", employee.Password);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i > 0)
                {
                    msg = "Password changed.";
                }                
                else
                {
                    msg = "Error";
                }
            }
            return msg;
        }

        [HttpPost]
        [Route("Delete")]
        public string Delete(Employee employee)
        {
            string msg = "";
            if (employee != null)
            {
                SqlCommand cmd = new SqlCommand("usp_DeleteEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i > 0)
                {
                    msg = "Employee deleted";
                }
                else
                {
                    msg = "Error";
                }
            }
            return msg;
        }

    }
}

