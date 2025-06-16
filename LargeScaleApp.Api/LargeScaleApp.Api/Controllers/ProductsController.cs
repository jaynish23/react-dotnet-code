//using Microsoft.AspNetCore.Mvc;
//using LargeScaleApp.Api.Data;
//using LargeScaleApp.Api.Models;

//namespace LargeScaleApp.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProductsController : ControllerBase
//    {
//        private readonly DataAccess _dataAccess;

//        public ProductsController(IConfiguration configuration)
//        {
//            _dataAccess = new DataAccess(configuration);
//        }

//        //[HttpGet]
//        //public IActionResult GetProducts([FromQuery] int page = 1)
//        //{
//        //    try
//        //    {
//        //        int pageSize = 1000; // 1,000 records per page
//        //        int startPage = 3; // Start from page 3 to fetch 3,000 rows
//        //        if (page < startPage || page > startPage + 2) // Limit to 3,000 rows (3 pages)
//        //            return BadRequest("Page number out of range for Products (must be between 3 and 5).");

//        //        var products = _dataAccess.GetProducts(page, pageSize);
//        //        return Ok(products);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return StatusCode(500, $"Error fetching products: {ex.Message}");
//        //    }
//        //}

//    }
//}
using Microsoft.AspNetCore.Mvc;
using LargeScaleApp.Api.Data;
using LargeScaleApp.Api.Models;

namespace LargeScaleApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DataAccess _dataAccess;

        public ProductsController(IConfiguration configuration)
        {
            _dataAccess = new DataAccess(configuration);
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery] int page = 1)
        {
            try
            {
                int pageSize = 1000; // 1,000 records per page
                int startPage = 3; // Start from page 3 to fetch 3,000 rows
                if (page < startPage || page > startPage + 2) // Limit to pages 3–5
                    return BadRequest("Page number out of range for Products (must be between 3 and 5).");

                var products = _dataAccess.GetProducts(page, pageSize);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching products: {ex.Message}");
            }
        }
    }
}