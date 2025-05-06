import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Define your translations here
const resources = {
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.apply": "Apply",
      "nav.submissions": "Submissions",
      // Home Page
      "home.welcome": "Welcome to Smart Insurance Portal",
      "home.tagline":
        "Protect what matters most with our tailored insurance solutions. Complete your application online in minutes.",
      "home.getStarted": "Get Started",
      "home.ourProducts": "Our Insurance Products",
      "home.loadingProducts": "Loading available insurance products...",
      "home.applyNow": "Apply Now",
      "home.whyChooseUs": "Why Choose Us?",
      "home.fastEasy": "Fast & Easy",
      "home.fastEasyDesc":
        "Complete your application online in minutes with our intuitive form process.",
      "home.customizedCoverage": "Customized Coverage",
      "home.customizedCoverageDesc":
        "Tailored insurance solutions designed to meet your specific needs.",
      "home.support247": "24/7 Support",
      "home.support247Desc":
        "Our customer service team is available around the clock to assist you.",
      // Application Page
      "application.title": "Insurance Application",
      "application.selectInsuranceType": "Select Insurance Type",
      "application.formSubmittedSuccess":
        "Your application has been submitted successfully! Redirecting to submissions page...",
      // FormRenderer
      "form.submit": "Submit",
      "form.saving": "Saving...",
      "form.saved": "Draft saved",
      "form.errorSaving": "Error saving draft",
      "form.submittedSuccess": "Form submitted successfully!",
      "form.errorSubmitting":
        "An error occurred while submitting the form. Please try again.",
      // Submissions Page
      "submissions.title": "My Submissions",
      "submissions.noSubmissions": "You have no submissions yet.",
      "submissions.viewDetails": "View Details",
      "submissions.status.pending": "Pending",
      "submissions.status.approved": "Approved",
      "submissions.status.rejected": "Rejected",
      // General
      fieldRequired: "{{fieldName}} is required",
      invalidEmail: "Invalid email address",
      mustBeNumber: "Must be a number",
      minValue: "Minimum value is {{min}}",
      maxValue: "Maximum value is {{max}}",
      minLength: "Minimum length is {{minLength}} characters",
      maxLength: "Maximum length is {{maxLength}} characters",
      invalidFormat: "Invalid {{fieldName}} format",
    },
  },
  es: {
    translation: {
      // Navbar
      "nav.home": "Inicio",
      "nav.apply": "Aplicar",
      "nav.submissions": "Envíos",
      // Home Page
      "home.welcome": "Bienvenido al Portal de Seguros Inteligente",
      "home.tagline":
        "Proteja lo que más importa con nuestras soluciones de seguros personalizadas. Complete su solicitud en línea en minutos.",
      "home.getStarted": "Empezar",
      "home.ourProducts": "Nuestros Productos de Seguros",
      "home.loadingProducts": "Cargando productos de seguros disponibles...",
      "home.applyNow": "Aplicar Ahora",
      "home.whyChooseUs": "¿Por Qué Elegirnos?",
      "home.fastEasy": "Rápido y Fácil",
      "home.fastEasyDesc":
        "Complete su solicitud en línea en minutos con nuestro proceso de formulario intuitivo.",
      "home.customizedCoverage": "Cobertura Personalizada",
      "home.customizedCoverageDesc":
        "Soluciones de seguros personalizadas diseñadas para satisfacer sus necesidades específicas.",
      "home.support247": "Soporte 24/7",
      "home.support247Desc":
        "Nuestro equipo de atención al cliente está disponible las 24 horas para ayudarle.",
      // Application Page
      "application.title": "Solicitud de Seguro",
      "application.selectInsuranceType": "Seleccione el Tipo de Seguro",
      "application.formSubmittedSuccess":
        "¡Su solicitud ha sido enviada con éxito! Redirigiendo a la página de envíos...",
      // FormRenderer
      "form.submit": "Enviar",
      "form.saving": "Guardando...",
      "form.saved": "Borrador guardado",
      "form.errorSaving": "Error al guardar el borrador",
      "form.submittedSuccess": "¡Formulario enviado con éxito!",
      "form.errorSubmitting":
        "Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo.",
      // Submissions Page
      "submissions.title": "Mis Envíos",
      "submissions.noSubmissions": "Aún no tiene envíos.",
      "submissions.viewDetails": "Ver Detalles",
      "submissions.status.pending": "Pendiente",
      "submissions.status.approved": "Aprobado",
      "submissions.status.rejected": "Rechazado",
      // General
      fieldRequired: "{{fieldName}} es obligatorio",
      invalidEmail: "Dirección de correo electrónico inválida",
      mustBeNumber: "Debe ser un número",
      minValue: "El valor mínimo es {{min}}",
      maxValue: "El valor máximo es {{max}}",
      minLength: "La longitud mínima es de {{minLength}} caracteres",
      maxLength: "La longitud máxima es de {{maxLength}} caracteres",
      invalidFormat: "Formato de {{fieldName}} inválido",
    },
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Fallback language if detection fails
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      // Order and from where user language should be detected
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"], // Cache the language in localStorage
    },
  });

export default i18n;
