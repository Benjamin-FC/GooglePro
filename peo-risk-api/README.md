# PEO Risk Assessment API

ASP.NET Core Web API with Entity Framework Core and In-Memory Database for storing risk assessment responses.

## Features

- **ASP.NET Core 8.0** Web API
- **Entity Framework Core** with In-Memory Database
- **CORS** enabled for React frontend
- **Swagger/OpenAPI** documentation
- RESTful endpoints for assessment management

## API Endpoints

### POST /api/assessments
Submit a new risk assessment.

**Request Body:**
```json
{
  "answers": {
    "company_profile": {
      "companyName": "Acme Corp",
      "state": "FL",
      "employees": "50",
      "yearsInBusiness": "10",
      "size": "medium"
    },
    "industry": "Construction",
    "workersComp": "yes",
    "safetyProgram": "yes"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "submittedAt": "2024-01-15T10:30:00Z",
  "message": "Assessment submitted successfully"
}
```

### GET /api/assessments
Get all submitted assessments.

### GET /api/assessments/{id}
Get a specific assessment by ID.

## Running the API

1. Navigate to the API directory:
```bash
cd peo-risk-api
```

2. Run the API:
```bash
dotnet run
```

The API will start on `http://localhost:5000` and `https://localhost:5001`.

3. Access Swagger UI:
Open `https://localhost:5001/swagger` in your browser to test the API.

## Database

The API uses an **In-Memory Database** which means:
- Data is stored in memory during runtime
- Data is lost when the application stops
- Perfect for development and testing
- No database setup required

To use a persistent database (SQL Server, PostgreSQL, etc.), update the `Program.cs` file to use a different database provider.

## CORS Configuration

CORS is configured to allow requests from `http://localhost:5173` (React dev server).

## Project Structure

```
peo-risk-api/
├── Controllers/
│   └── AssessmentsController.cs   # API endpoints
├── Data/
│   └── AssessmentDbContext.cs     # EF Core DbContext
├── DTOs/
│   └── AssessmentDTOs.cs          # Data Transfer Objects
├── Models/
│   └── Assessment.cs              # Assessment entity model
└── Program.cs                     # App configuration
```

## Development

To add new features:
1. Update the `Assessment` model if needed
2. Add new properties to DTOs
3. Update the controller logic
4. The in-memory database will automatically reflect changes
