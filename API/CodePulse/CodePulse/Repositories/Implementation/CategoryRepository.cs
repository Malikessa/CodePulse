using CodePulse.Data;
using CodePulse.Models.Domain;
using CodePulse.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<Category>> GetCategories()
        {
            return await dbContext.Categories.ToListAsync();
        }
        public async Task<Category> GetCategoryById(Guid id)
        {
            return await dbContext.Categories.FindAsync(id);
        }
        public async Task<Category> AddCategory(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }
        public async Task<Category> UpdateCategory(Category category)
        {
            dbContext.Categories.Update(category);
            await dbContext.SaveChangesAsync();

            return category;

        }
        public async Task<bool> DeleteCategory(Guid id)
        {
            var category = await dbContext.Categories.FindAsync(id);

            if (category != null)
            {
                dbContext.Categories.Remove(category);
                await dbContext.SaveChangesAsync();

                return true;
            }

            return false;
        }
    }
}
