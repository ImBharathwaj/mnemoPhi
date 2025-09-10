# mnemoPhi API Endpoints (MVP)

**Base URL:** `https://api.mnemophi.com/v1`

---

## 1. User Endpoints

### 1.1 Create User
- **Endpoint:** `POST /users`
- **Description:** Create a new user identity
- **Request Body:**
```json
{
  "email": "user@example.com",
  "metadata": {
    "name": "John Doe",
    "age": 25
  }
}
```
- **Response:**
```json
{
  "id": "user_12345",
  "email": "user@example.com",
  "createdAt": "2025-09-09T12:00:00Z"
}
```

### 1.2 Get User
- **Endpoint:** `GET /users/{userId}`
- **Description:** Retrieve user details
- **Response:**
```json
{
  "id": "user_12345",
  "email": "user@example.com",
  "metadata": {...},
  "createdAt": "2025-09-09T12:00:00Z"
}
```

---

## 2. Consent Endpoints

### 2.1 Grant Consent
- **Endpoint:** `POST /users/{userId}/consents`
- **Description:** Grant consent for a category/type
- **Request Body:**
```json
{
  "clientId": "client_abc",
  "category": "marketing",
  "status": "granted"
}
```
- **Response:**
```json
{
  "consentId": "consent_67890",
  "userId": "user_12345",
  "clientId": "client_abc",
  "category": "marketing",
  "status": "granted",
  "timestamp": "2025-09-09T12:30:00Z"
}
```

### 2.2 Revoke Consent
- **Endpoint:** `PUT /users/{userId}/consents/{consentId}`
- **Description:** Revoke existing consent
- **Request Body:**
```json
{
  "status": "revoked"
}
```
- **Response:**
```json
{
  "consentId": "consent_67890",
  "status": "revoked",
  "timestamp": "2025-09-09T13:00:00Z"
}
```

### 2.3 Get User Consents
- **Endpoint:** `GET /users/{userId}/consents`
- **Description:** Retrieve all consents for a user
- **Response:**
```json
[
  {
    "consentId": "consent_67890",
    "clientId": "client_abc",
    "category": "marketing",
    "status": "granted",
    "timestamp": "2025-09-09T12:30:00Z"
  }
]
```

---

## 3. Client (Business) Endpoints

### 3.1 Create Client
- **Endpoint:** `POST /clients`
- **Description:** Register a new business client
- **Request Body:**
```json
{
  "name": "Acme Corp",
  "email": "contact@acme.com"
}
```
- **Response:**
```json
{
  "clientId": "client_abc",
  "apiKey": "api_123456",
  "createdAt": "2025-09-09T12:00:00Z"
}
```

### 3.2 Get Client
- **Endpoint:** `GET /clients/{clientId}`
- **Description:** Retrieve client info
- **Response:**
```json
{
  "clientId": "client_abc",
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "createdAt": "2025-09-09T12:00:00Z"
}
```

### 3.3 List Client Users
- **Endpoint:** `GET /clients/{clientId}/users`
- **Description:** List all users who have granted consent to this client
- **Response:**
```json
[
  {
    "userId": "user_12345",
    "email": "user@example.com",
    "consentStatus": "granted",
    "categories": ["marketing"]
  }
]
```

### 3.4 Export Consents
- **Endpoint:** `GET /clients/{clientId}/consents/export`
- **Description:** Export all consent records (CSV / JSON)
- **Response:** File download or JSON array

---

## 4. Admin / Common Endpoints

### 4.1 List Consent Categories
- **Endpoint:** `GET /categories`
- **Description:** Retrieve predefined consent categories
- **Response:**
```json
[
  "marketing",
  "analytics",
  "personalization",
  "cookies"
]
```

### 4.2 Add New Consent Category
- **Endpoint:** `POST /categories`
- **Description:** Add new consent category (Admin only)
- **Request Body:**
```json
{
  "category": "newsletters"
}
```
- **Response:**
```json
{
  "category": "newsletters",
  "createdAt": "2025-09-09T12:45:00Z"
}
```

---

## 5. SDK Integration Endpoints

> The SDK will internally call the above endpoints for operations like grant, revoke, and fetch status.

- `POST /users/{userId}/consents` → grant consent  
- `PUT /users/{userId}/consents/{consentId}` → revoke consent  
- `GET /users/{userId}/consents` → fetch user consents  

---

## Notes
- All endpoints use **HTTPS only**  
- Authentication:  
  - **Business clients:** API key in header `x-api-key`  
  - **Dashboard users:** JWT in `Authorization` header  
- Timestamps use **ISO 8601 UTC**  
- Responses in **JSON format**
```

