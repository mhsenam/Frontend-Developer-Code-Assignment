import axios from "axios";

const API_BASE_URL = "https://assignment.devotel.io";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
  dependsOn?: {
    field: string;
    value: string | boolean;
  };
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  sections: FormSection[];
}

export interface FormSubmission {
  id: string;
  [key: string]: any;
}

export const api = {
  // Get available form schemas
  getFormSchemas: async (): Promise<FormSchema[]> => {
    const response = await apiClient.get("/api/insurance/forms");
    return response.data;
  },

  // Submit form data
  submitForm: async (formData: any): Promise<FormSubmission> => {
    const response = await apiClient.post(
      "/api/insurance/forms/submit",
      formData
    );
    return response.data;
  },

  // Get list of submitted forms
  getSubmissions: async (): Promise<{
    columns: string[];
    data: FormSubmission[];
  }> => {
    const response = await apiClient.get("/api/insurance/forms/submissions");
    return response.data;
  },
};

export default api;
