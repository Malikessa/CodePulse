using CodePulse.Models.Domain;

namespace CodePulse.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategories();
        Task<Category> GetCategoryById(Guid id);
        Task<Category> AddCategory(Category category);
        Task<Category> UpdateCategory(Category category);
        Task<bool> DeleteCategory(Guid id);
    }
}
