import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { FormSchema } from "../services/api";
import api from "../services/api";

interface FormContextType {
  loading: boolean;
  error: string | null;
  formSchemas: FormSchema[];
  selectedFormId: string | null;
  setSelectedFormId: (id: string | null) => void;
  getFormById: (id: string) => FormSchema | undefined;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSchemas, setFormSchemas] = useState<FormSchema[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormSchemas = async () => {
      try {
        setLoading(true);
        setError(null);

        const schemas = await api.getFormSchemas();
        setFormSchemas(schemas);

        // Auto-select the first form if available
        if (schemas.length > 0 && !selectedFormId) {
          setSelectedFormId(schemas[0].id);
        }
      } catch (err) {
        console.error("Error fetching form schemas:", err);
        setError("Failed to load form schemas. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormSchemas();
  }, [selectedFormId]);

  const getFormById = (id: string) => {
    return formSchemas.find((form) => form.id === id);
  };

  const value = {
    loading,
    error,
    formSchemas,
    selectedFormId,
    setSelectedFormId,
    getFormById,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormContext;
