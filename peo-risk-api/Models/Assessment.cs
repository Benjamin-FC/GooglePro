namespace PeoRiskApi.Models
{
    public class Assessment
    {
        public int Id { get; set; }
        public DateTime SubmittedAt { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public int? Employees { get; set; }
        public int? YearsInBusiness { get; set; }
        public string? AnnualRevenue { get; set; }
        public string? Industry { get; set; }
        public string? WorkersCompCoverage { get; set; }
        public string? SafetyProgram { get; set; }
        public string? CalOshaPermit { get; set; }
        public string? PreviousClaims { get; set; }
        
        // Store all answers as JSON for flexibility
        public string AnswersJson { get; set; } = "{}";
    }
}
