using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeoRiskApi.Data;
using PeoRiskApi.DTOs;
using PeoRiskApi.Models;
using System.Text.Json;

namespace PeoRiskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssessmentsController : ControllerBase
    {
        private readonly AssessmentDbContext _context;
        private readonly ILogger<AssessmentsController> _logger;

        public AssessmentsController(AssessmentDbContext context, ILogger<AssessmentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<AssessmentResponse>> SubmitAssessment([FromBody] SubmitAssessmentRequest request)
        {
            try
            {
                // Extract company profile data
                var companyProfile = request.Answers.ContainsKey("company_profile") 
                    ? JsonSerializer.Deserialize<Dictionary<string, object>>(request.Answers["company_profile"].ToString() ?? "{}")
                    : new Dictionary<string, object>();

                var assessment = new Assessment
                {
                    SubmittedAt = DateTime.UtcNow,
                    CompanyName = companyProfile.ContainsKey("companyName") ? companyProfile["companyName"]?.ToString() ?? "" : "",
                    State = companyProfile.ContainsKey("state") ? companyProfile["state"]?.ToString() ?? "" : "",
                    Employees = companyProfile.ContainsKey("employees") && int.TryParse(companyProfile["employees"]?.ToString(), out int emp) ? emp : null,
                    YearsInBusiness = companyProfile.ContainsKey("yearsInBusiness") && int.TryParse(companyProfile["yearsInBusiness"]?.ToString(), out int years) ? years : null,
                    AnnualRevenue = companyProfile.ContainsKey("size") ? companyProfile["size"]?.ToString() : null,
                    Industry = request.Answers.ContainsKey("industry") ? request.Answers["industry"]?.ToString() : null,
                    WorkersCompCoverage = request.Answers.ContainsKey("workersComp") ? request.Answers["workersComp"]?.ToString() : null,
                    SafetyProgram = request.Answers.ContainsKey("safetyProgram") ? request.Answers["safetyProgram"]?.ToString() : null,
                    CalOshaPermit = request.Answers.ContainsKey("calOshaPermit") ? request.Answers["calOshaPermit"]?.ToString() : null,
                    PreviousClaims = request.Answers.ContainsKey("previousClaims") ? request.Answers["previousClaims"]?.ToString() : null,
                    AnswersJson = JsonSerializer.Serialize(request.Answers)
                };

                _context.Assessments.Add(assessment);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Assessment submitted successfully. ID: {AssessmentId}, Company: {CompanyName}", 
                    assessment.Id, assessment.CompanyName);

                return Ok(new AssessmentResponse
                {
                    Id = assessment.Id,
                    SubmittedAt = assessment.SubmittedAt,
                    Message = "Assessment submitted successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error submitting assessment");
                return StatusCode(500, new { message = "An error occurred while submitting the assessment" });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assessment>>> GetAllAssessments()
        {
            var assessments = await _context.Assessments
                .OrderByDescending(a => a.SubmittedAt)
                .ToListAsync();

            return Ok(assessments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Assessment>> GetAssessment(int id)
        {
            var assessment = await _context.Assessments.FindAsync(id);

            if (assessment == null)
            {
                return NotFound();
            }

            return Ok(assessment);
        }
    }
}
