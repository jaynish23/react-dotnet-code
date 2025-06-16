using Microsoft.AspNetCore.Mvc;
using LargeScaleApp.Api.Data;
using LargeScaleApp.Api.Models;

namespace LargeScaleApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly DataAccess _dataAccess;

        public SuppliersController(IConfiguration configuration)
        {
            _dataAccess = new DataAccess(configuration);
        }

        [HttpGet]
        public IActionResult GetSuppliers([FromQuery] int page = 1)
        {
            try
            {
                int pageSize = 1000; // 1,000 records per page
                if (page < 1 || page > 10) // Limit to 10,000 rows (10 pages)
                    return BadRequest("Page number out of range for Suppliers (must be between 1 and 10).");

                var suppliers = _dataAccess.GetSuppliers(page, pageSize);
                return Ok(suppliers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching suppliers: {ex.Message}");
            }
        }
    }
}