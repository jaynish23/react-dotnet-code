using Microsoft.AspNetCore.Mvc;
using LargeScaleApp.Api.Data;
using LargeScaleApp.Api.Models;

namespace LargeScaleApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly DataAccess _dataAccess;

        public CustomersController(IConfiguration configuration)
        {
            _dataAccess = new DataAccess(configuration);
        }

        [HttpGet]
        public IActionResult GetCustomers([FromQuery] int page = 1)
        {
            try
            {
                int pageSize = 1000; // 1,000 records per page
                if (page < 1 || page > 13) // Limit to 13,000 rows (13 pages)
                    return BadRequest("Page number out of range for Customers (must be between 1 and 13).");

                var customers = _dataAccess.GetCustomers(page, pageSize);
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching customers: {ex.Message}");
            }
        }
    }
}