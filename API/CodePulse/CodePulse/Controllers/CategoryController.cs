using CodePulse.Data;
using CodePulse.Models.Domain;
using CodePulse.Models.DTO;
using CodePulse.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpGet("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await categoryRepository.GetCategories();
            return Ok(categories);
        }

        [HttpGet("GetCategoryById")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var category = await categoryRepository.GetCategoryById(id);

            if(category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory(CreateCategoryRequestDto request)
        {
            // Map DTO to Domain Model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle=request.UrlHandle
            };

            await categoryRepository.AddCategory(category);

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);

        }

        [HttpPut("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory(Category category)
        {
            var updatedCategory = await categoryRepository.UpdateCategory(category);

            if(updatedCategory == null)
            {
                return NotFound();
            }

            return Ok(updatedCategory);
        }

        [HttpDelete("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var success = await categoryRepository.DeleteCategory(id);

            if (!success)
            {
                return NotFound();
            }

            return Ok(success);
        }

    }
}
