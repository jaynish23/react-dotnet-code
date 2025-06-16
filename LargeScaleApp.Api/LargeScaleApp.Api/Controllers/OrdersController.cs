using Microsoft.AspNetCore.Mvc;
using LargeScaleApp.Api.Data;
using LargeScaleApp.Api.Models;

namespace LargeScaleApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataAccess _dataAccess;

        public OrdersController(IConfiguration configuration)
        {
            _dataAccess = new DataAccess(configuration);
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            try
            {
                var orders = _dataAccess.GetOrders(1500, 2100); // Fetch 600 rows (1500 to 2100)
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching orders: {ex.Message}");
            }
        }
    }
}