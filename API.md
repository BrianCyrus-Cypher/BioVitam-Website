# BioVitam API Documentation

The BioVitam API provides a RESTful interface for accessing organic agricultural data and submitting contact requests.

**Base URL**: `http://localhost:5000/api` (Development)

## Endpoints

### 1. Get Company Information
`GET /company`
Returns general company data, mission, and structure.

**Response**:
```json
{
  "name": "BioVitam",
  "vision": "...",
  "history": "...",
  "certifications": []
}
```

### 2. Get Products
`GET /products`
Returns a list of all bio-fortified organic fertilizers.

### 3. Get Clientele/Success Stories
`GET /clientele`
Returns all success stories and feedback from farmers.

### 4. Get Manufacturing Process
`GET /process-steps`
Returns the 5-step technical guide for the fermentation process.

### 5. Get Timeline
`GET /timeline`
Returns the historical journey of the company.

### 6. Contact Form Submission
`POST /contact`
Submits a contact inquiry.

**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about NPK ratios",
  "message": "..."
}
```

## Error Responses
- `400 Bad Request`: Missing required fields in POST requests.
- `429 Too Many Requests`: Rate limit exceeded (if enabled).
- `500 Internal Server Error`: Server-side issues.
