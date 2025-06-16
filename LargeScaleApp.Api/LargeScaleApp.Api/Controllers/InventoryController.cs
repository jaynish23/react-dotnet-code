using Microsoft.AspNetCore.Mvc;
using LargeScaleApp.Api.Data;
using LargeScaleApp.Api.Models;

namespace LargeScaleApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly DataAccess _dataAccess;

        public InventoryController(IConfiguration configuration)
        {
            _dataAccess = new DataAccess(configuration);
        }

        [HttpGet]
        public IActionResult GetInventory([FromQuery] int page = 1)
        {
            try
            {
                int pageSize = 1000; // 1,000 records per page
                int startId = 11000; // Start from ID 11,000
                int totalRows = 15000; // Fetch 15,000 rows
                int maxPages = (totalRows + pageSize - 1) / pageSize; // Ceiling division
                if (page < 1 || page > maxPages)
                    return BadRequest($"Page number out of range for Inventory (must be between 1 and {maxPages}).");

                int adjustedStartId = startId + (page - 1) * pageSize;
                var inventory = _dataAccess.GetInventory(adjustedStartId, pageSize);
                return Ok(inventory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching inventory: {ex.Message}");
            }
        }
    }
}