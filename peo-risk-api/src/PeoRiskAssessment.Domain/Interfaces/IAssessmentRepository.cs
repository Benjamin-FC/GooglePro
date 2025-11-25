using PeoRiskAssessment.Domain.Entities;

namespace PeoRiskAssessment.Domain.Interfaces
{
    public interface IAssessmentRepository
    {
        Task<Assessment> AddAsync(Assessment assessment);
        Task<Assessment?> GetByIdAsync(int id);
        Task<IEnumerable<Assessment>> GetAllAsync();
        Task<bool> SaveChangesAsync();
    }
}
