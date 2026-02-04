# BioVitam API Documentation

The BioVitam API provides endpoints for fetching company data, products, field events, and managing administrative content.

## Base URL
`http://localhost:5000/api`

## Authentication
Admin endpoints require a secret key passed in the headers:
- `x-admin-key`: `<YOUR_ADMIN_SECRET_KEY>`

State-mutating endpoints (POST, PUT, DELETE) also require a valid CSRF token.

---

## Content Endpoints (Public)

### GET `/company`
Returns general company profiles and metadata.

### GET `/products`
Returns a list of agricultural products.

### GET `/events`
Returns all field stories and events.

---

## Management Endpoints (Admin Required)

### POST `/events`
Add a new field story to the archives.
- **Body**:
  ```json
  {
    "title": "Story Title",
    "date": "2024-05-20",
    "location": "Regional Hub",
    "image": "image_name_or_url",
    "description": "Full narrative..."
  }
  ```

### PUT `/events/reorder`
Update the sequence of stories in the gallery.
- **Body**:
  ```json
  {
    "events": [ { "id": 123, ... }, { "id": 456, ... } ]
  }
  ```

### PUT `/events/:id`
Update metadata for an existing story.

### DELETE `/events/:id`
Expunge a story from the records.

### POST `/v1/upload`
Upload a new asset to Cloudinary.
- **Request**: `multipart/form-data` with a `file` field.
- **Response**:
  ```json
  {
    "url": "https://cloudinary.com/...",
    "thumbnailUrl": "...",
    "format": "webp"
  }
  ```

---

## System Endpoints

### GET `/health`
Check API gateway status.

### GET `/csrf-token`
Fetch a fresh CSRF token for state-mutating requests.

---

## Error Handling
Standard error responses follow this format:
```json
{
  "error": "Error message description"
}
```
Common status codes:
- `400`: Bad Request (Missing fields/Invalid data)
- `403`: Unauthorized (Invalid Admin Key)
- `500`: Internal Server Error
