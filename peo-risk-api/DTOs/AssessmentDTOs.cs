namespace PeoRiskApi.DTOs
{
    public class SubmitAssessmentRequest
    {
        public Dictionary<string, object> Answers { get; set; } = new();
    }

    public class AssessmentResponse
    {
        public int Id { get; set; }
        public DateTime SubmittedAt { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
