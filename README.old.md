# 🧠 Smart Insurance Application Portal

## 📌 Project Overview

This is a **React.js frontend** application for a **Smart Insurance Application Portal**, where users can apply for different types of insurance via **dynamically generated forms** and **view/manage submissions** through a customizable list view.

The application integrates with an external API to:
- Fetch form structures
- Submit completed applications
- View submitted applications in a sortable, filterable, and customizable list

---

## 🛠️ Core Requirements

### 1. Dynamic Form Rendering

- Fetch the form schema via an API.
- Dynamically render form fields (no hardcoded forms).
- Support nested form sections (e.g., Address, Vehicle Details).
- Show/hide fields based on user input.
- Some fields must fetch options dynamically from an API (e.g., states based on selected country).
- Validate form data before submission.

#### Conditional Field Examples:
- **Home Insurance:** Show "Security System Type" *only if* "Do you have a security system?" = Yes
- **Car Insurance:** Show "Number of Accidents" *only if* "Have you had any accidents?" = Yes
- **Health Insurance:** Show "Pregnancy Status" *only if* "Gender" = Female

### 2. Form Submission

- Save application data via API call.
- Optional: implement **autosave draft** on field change.

### 3. Customizable List View

- Display submitted applications using an API.
- Allow dynamic selection of visible columns.
- Add support for:
  - Pagination
  - Sorting (ascending/descending)
  - Search and filter capabilities

#### Example Submission Table:
| Name       | Age | Insurance Type | City        | Status   |
|------------|-----|----------------|-------------|----------|
| John Doe   | 28  | Health         | New York    | Pending  |
| Jane Smith | 32  | Life           | Los Angeles | Approved |

---

## 🔗 API Endpoints

Base URL: `https://assignment.devotel.io`

| Functionality          | Endpoint                                | Method |
|------------------------|------------------------------------------|--------|
| Get Form Structure     | `/api/insurance/forms`                  | GET    |
| Submit Form Data       | `/api/insurance/forms/submit`           | POST   |
| Get Submitted Forms    | `/api/insurance/forms/submissions`      | GET    |

#### Example Response for Submissions:
```json
{
  "columns": ["Full Name", "Age", "Insurance Type", "City", "Status"],
  "data": [
    {
      "id": "1",
      "Full Name": "John Doe",
      "Age": 28,
      "Insurance Type": "Health",
      "City": "New York",
      "Status": "Pending"
    },
    {
      "id": "2",
      "Full Name": "Jane Smith",
      "Age": 32,
      "Insurance Type": "Life",
      "City": "Los Angeles",
      "Status": "Approved"
    }
  ]
}
````

---

## 🌟 Bonus Features (Optional but Appreciated)

* 🔄 **Autosave drafts**
* 🌙 **Dark mode toggle**
* 🌍 **Multi-language (localization) support**
* 🧪 **Unit tests with Jest and React Testing Library**
* 🧲 **Drag-and-drop field reordering**

---

## ⚙️ Tech Stack

* React.js (with Hooks)
* Context API or Redux (if needed for global state)
* Axios/Fetch for API integration
* TailwindCSS, Material UI, or styled-components (for styling)
* React Table (for list view)
* Yup + React Hook Form or Formik (for form validation)

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── FormRenderer/
│   ├── ListView/
│   └── Common/
├── pages/
│   ├── ApplicationFormPage.jsx
│   └── SubmissionListPage.jsx
├── services/
│   └── api.js
├── context/
├── hooks/
├── utils/
├── App.js
└── index.js
```

---

Ensure environment variables and API base URL are configured properly.

---

## 🧠 Assumptions

* The form API response provides field-level metadata (e.g., type, required, visibility rules).
* The list API returns dynamic `columns` and `data`.
* No authentication is needed for this assignment.
* The application only uses the provided APIs (mock or live).

---

## 📎 Submission Checklist

* ✅ Hosted version (Vercel/Netlify) \[optional]
* ✅ Public GitHub repository with code
* ✅ README.md with:

  * Setup instructions
  * API details
  * Assumptions made

---

## 👨‍💻 Author

**Frontend Developer Code Assignment - Mohsen Amini**

---
