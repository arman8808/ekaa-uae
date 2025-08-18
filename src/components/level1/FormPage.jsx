import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { registrationService } from "../../services/registrationService";



// Custom Hook for API calls with proper error handling
const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (requestFn) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage = err.message || "Request failed. Please try again.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { makeRequest, loading, error, setError };
};

// Error Alert Component
const ErrorAlert = ({ error, onClose }) => (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <p className="text-sm text-red-700 mt-1">{error}</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600">
        ×
      </button>
    </div>
  </div>
);

// Success Alert Component
const SuccessAlert = ({ message }) => (
  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
    <div className="flex items-center">
      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
      <div>
        <h3 className="text-sm font-medium text-green-800">Success</h3>
        <p className="text-sm text-green-700 mt-1">{message}</p>
      </div>
    </div>
  </div>
);

// Form Validation with comprehensive rules
const validateForm = (formData) => {
  const errors = {};

  // Required fields validation
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "mobileNo",
    "city",
    "dob",
    "occupation",
    "levelName",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].toString().trim() === "") {
      errors[field] = `${field
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()} is required`;
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone number validation (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (formData.mobileNo && !phoneRegex.test(formData.mobileNo)) {
    errors.mobileNo = "Mobile number must be 10 digits";
  }

  // Terms acceptance
  if (!formData.termsandcondition) {
    errors.termsandcondition = "You must accept the terms and conditions";
  }

  // City field validation - only check if it's empty
  if (!formData.city || formData.city.toString().trim() === "") {
    errors.city = "Please select a program from the options above";
  }

  return errors;
};

// Form Data Builder - Ensures proper API payload structure
const buildFormDataPayload = (formData) => {
  const payload = new FormData();

  // Append all form fields with proper data types
  Object.entries(formData).forEach(([key, value]) => {
    let formattedValue = value;

    // Convert boolean to string for API compatibility
    if (typeof value === "boolean") {
      formattedValue = value.toString();
    }
    // Handle null/undefined values
    else if (value === null || value === undefined) {
      formattedValue = "";
    }

    payload.append(key, formattedValue);
  });

  return payload;
};

// Thank You Component - Extracted for better organization
const ThankYouMessage = () => (
  <div
    className="bg-white rounded-lg max-w-md w-full p-8 text-center"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="mb-6">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
      <p className="text-lg text-gray-600 leading-relaxed">
        Thank you for Registration. Payment link has been sent on your registered
        Mail ID
      </p>
    </div>
  </div>
);

// Form Input Component - Reusable input field with error handling
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  readOnly = false,
  placeholder = "",
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      } ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}`}
    />
    {error && <p className="red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Form Textarea Component
const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  rows = 3,
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const FormCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <div className="form-group">
      <label className="text-[#6E2D79]">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-1 custom-checkbox"
        />
        {label}
      </label>
    </div>
  );
};

// Form Select Component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  options = [],
  placeholder = "Select...",
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Custom hook for form data management
const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateMultipleFields = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return { formData, updateField, updateMultipleFields, setFormData };
};

// Main Form Component
function FormPage({ onClose = () => {}, event }) {
  const { formData, updateField, updateMultipleFields } = useFormData({
    firstName: "",
    middleName: "",
    lastName: "",
    nameAsCertificate: "",
    currentAddress: "",
    permanenetAddress: "",
    city: event ? `${event.location} | ${event.name} | ${event.date}` : "",
    venue: "",
    timeslot: "",
    TelNo: "",
    mobileNo: "",
    email: "",
    dob: "",
    occupation: "",
    courseDetailDate: "",
    courseDetailTime: "",
    courseDetailVenue: "",
    hearAbout: "",
    communicationPreferences: false,
    termsandcondition: false,
    isSameAddress: false,
    levelName: event?.level || "1", // Default to level 1 if not provided
  });

  const [showThankYou, setShowThankYou] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { makeRequest, loading, error, setError } = useApiCall();

  // Debug: Log the event object
  console.log("FormPage received event:", event);
  
  // Generate city options from the selected event
  const cityOptions = event ? [
    {
      value: `${event.location} | ${event.name} | ${event.date}`,
      label: `${event.location} | ${event.name} | ${event.date}`,
    }
  ] : [];
  
  // Debug: Log city options
  console.log("City options generated:", cityOptions);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    console.log(`Input change: ${name} = ${newValue} (type: ${type})`);
    updateField(name, newValue);

    // Auto-fill nameAsCertificate
    if (name === "firstName" || name === "middleName" || name === "lastName") {
      const firstName = name === "firstName" ? value : formData.firstName;
      const middleName = name === "middleName" ? value : formData.middleName;
      const lastName = name === "lastName" ? value : formData.lastName;

      updateMultipleFields({
        [name]: newValue,
        nameAsCertificate: `${firstName} ${middleName} ${lastName}`
          .trim()
          .replace(/\s+/g, " "),
      });
    }

    if (name === "isSameAddress" && checked) {
      updateMultipleFields({
        isSameAddress: checked,
        permanenetAddress: formData.currentAddress,
      });
    }
    if (name === "currentAddress" && formData.isSameAddress) {
      updateField("permanenetAddress", value);
    }

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("=== FORM SUBMISSION STARTED ===");
    console.log("Form submit triggered");
    setError(null);

    // Log current form data
    console.log("Current form data:", formData);
    console.log("Form data keys:", Object.keys(formData));
    console.log("Form data values:", Object.values(formData));

    // Validate form
    const errors = validateForm(formData);
    console.log("Validation errors:", errors);
    console.log("Number of validation errors:", Object.keys(errors).length);
    
    if (Object.keys(errors).length > 0) {
      console.log("❌ Form validation failed with errors:", errors);
      setFormErrors(errors);
      setError("Please fix the errors below before submitting");
      const firstErrorField = document.querySelector(".border-red-500");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    console.log("✅ Form validation passed, proceeding with submission...");

    try {
      console.log("Preparing form submission...");

      // Ensure all required fields are populated with default values if empty
      const submissionData = {
        ...formData,
        // Set default values for required fields that might be empty
        nameAsCertificate: formData.nameAsCertificate || `${formData.firstName} ${formData.lastName}`.trim(),
        currentAddress: formData.currentAddress || "Not provided",
        permanenetAddress: formData.permanenetAddress || formData.currentAddress || "Not provided",
        venue: formData.venue || "Not provided",
        timeslot: formData.timeslot || "Not specified",
        TelNo: formData.TelNo || formData.mobileNo || "Not provided",
        courseDetailDate: formData.courseDetailDate || "Not specified",
        courseDetailTime: formData.courseDetailTime || "Not specified",
        courseDetailVenue: formData.courseDetailVenue || "Not specified",
        hearAbout: formData.hearAbout || "Not specified",
        // Ensure boolean fields are properly set
        communicationPreferences: formData.communicationPreferences || false,
        termsandcondition: formData.termsandcondition || false,
        isSameAddress: formData.isSameAddress || false,
        levelName: formData.levelName || "1"
      };

      console.log("Enhanced submission data:", submissionData);

      // Build FormData payload
      const payload = buildFormDataPayload(submissionData);

      // Enhanced payload logging
      console.log("Form Data Payload Contents:");
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      // Also log the raw submission data for comparison
      console.log("Raw submission data being sent:", submissionData);

      // Make actual API call using the registration service
      console.log("Making API request to registration service");
      console.log("API URL will be:", import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/');
      
      const response = await makeRequest(() =>
        registrationService.submitRegistration(payload)
      );

      console.log("Registration successful - Full response:", response);
      
      if (response.success) {
        setShowThankYou(true);
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration failed - Error details:", {
        message: err.message,
        stack: err.stack,
        response: err.response,
      });

      setError(`Submission failed: ${err.message || "Unknown error"}`);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const FormRadioGroup = ({
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    options = [],
    className = "",
  }) => (
    <div className={className}>
      <label className="block text-sm font-semibold text-[#6E2D79] mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
            relative flex items-start p-4 border rounded-lg cursor-pointer
            transition-all duration-200
            ${
              value === option.value
                ? "border-[#6E2D79] bg-[#F9F0FF]"
                : "border-gray-200 hover:border-[#C183B2]"
            }
          `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`flex items-center h-5`}>
              <div
                className={`
              flex items-center justify-center w-5 h-5 rounded-full border
              ${value === option.value ? "border-[#6E2D79]" : "border-gray-300"}
            `}
              >
                {value === option.value && (
                  <div className="w-3 h-3 rounded-full bg-[#6E2D79]"></div>
                )}
              </div>
            </div>
            <span className="ml-3 block text-sm text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Update city field when event changes
  useEffect(() => {
    if (event) {
      const cityValue = `${event.location} | ${event.name} | ${event.date}`;
      updateField("city", cityValue);
      console.log("City field updated to:", cityValue);
    }
  }, [event, updateField]);

  // How did you hear about us options
  const hearAboutOptions = [
    "Facebook",
    "Instagram",
    "Google",
    "LinkedIn",
    "Friends/Relatives",
    "Other",
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[111111]"
      onClick={handleOverlayClick}
    >
      {showThankYou ? (
        <ThankYouMessage />
      ) : (
        <div
          className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-[#6E2D79]">
              Registration Form - {event?.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Display */}
            {error && (
              <ErrorAlert error={error} onClose={() => setError(null)} />
            )}

            {/* Personal Information */}
            <div>
              <div className="bg-[#F8F1FF] h-[2px] mb-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                  required
                />

                <FormInput
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />

                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formErrors.lastName}
                  required
                />

                <FormInput
                  label="Name as on Certificate"
                  name="nameAsCertificate"
                  value={formData.nameAsCertificate}
                  onChange={handleInputChange}
                  readOnly
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  required
                />

                <FormInput
                  label="Mobile Number"
                  name="mobileNo"
                  type="tel"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  error={formErrors.mobileNo}
                  required
                />

                <FormInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  error={formErrors.dob}
                  required
                />

                <FormInput
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  error={formErrors.occupation}
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#6E2D79] mb-4">
                Address Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <FormTextarea
                  label="Current Address"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  rows={3}
                />
                <FormCheckbox
                  label="Permanent address is same as current address"
                  name="isSameAddress"
                  checked={formData.isSameAddress}
                  onChange={handleInputChange}
                />
                <FormTextarea
                  label="Permanent Address"
                  name="permanenetAddress"
                  value={formData.permanenetAddress}
                  onChange={handleInputChange}
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <FormRadioGroup
                    label="Selected Program"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={formErrors.city}
                    options={cityOptions}
                    required
                  />
                </div>
              </div>
            </div>

            {/* How did you hear about us */}
            <div>
              <h2 className="text-xl font-semibold text-[#6E2D79] mb-6">
                How did you hear about this course?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hearAboutOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hearAbout"
                      value={option}
                      checked={formData.hearAbout === option}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2]"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Communication Preferences */}
            <div>
              <h2 className="text-xl font-semibold text-[#4A2C82]">
                Communication Preferences
              </h2>
              <div className="bg-[#F8F1FF] h-[2px] my-4"></div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="communicationPreferences"
                  checked={formData.communicationPreferences}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2] mt-1"
                />
                <span className="text-sm text-[#C183B2]">
                  Yes, I am interested in receiving mailers/SMS from EKAA
                  Integrated Clinical Hypnotherapy Foundation about future
                  courses
                </span>
              </label>
            </div>

            {/* Terms and Conditions */}
            <div>
              <h2 className="text-xl font-semibold text-[#4A2C82]">
                Terms and Conditions
              </h2>
              <div className="bg-[#F8F1FF] h-[2px] my-4"></div>
              <div className="border p-4 rounded-lg text-sm text-[#C183B2] space-y-2">
                <p>
                  I confirm that I am over 18 years of age and choose to attend
                  this workshop / course of my own free will.
                </p>
                <p>
                  I confirm that I have no mental / psychological ailment /
                  disorder and am not on any psychiatric / psychological
                  treatment/s and/or drug/s.
                </p>
                <p>
                  I also discharge the organization from any obligation
                  whatsoever that may arise during the workshop/course.
                </p>
                <p>
                  I have read and understood the aims and objectives of the
                  course curriculum.
                </p>
              </div>
              <label className="flex items-start space-x-3 mt-4">
                <input
                  type="checkbox"
                  name="termsandcondition"
                  checked={formData.termsandcondition}
                  onChange={handleInputChange}
                  className={`w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2] mt-1 ${
                    formErrors.termsandcondition ? "border-red-500" : ""
                  }`}
                />
                <span className="text-sm text-[#6E2D79]">
                  I agree to the terms and conditions mentioned above. *
                </span>
              </label>
              {formErrors.termsandcondition && (
                <p className="text-red-500 text-xs mt-1 ml-7">
                  {formErrors.termsandcondition}
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                disabled={loading}
              >
                Cancel
              </button>

                                            <button
                 type="submit"
                 disabled={loading}
                 className={`px-6 py-2 bg-[#6E2D79] text-white rounded-md transition-colors flex items-center justify-center min-w-[140px] cursor-pointer ${
                   loading
                     ? "opacity-50 cursor-not-allowed"
                     : "hover:bg-[#5a2465]"
                 }`}
               >
                 {loading ? (
                   <>
                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                     Submitting...
                   </>
                 ) : (
                   "Submit Registration"
                 )}
               </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = `
  .form-checkbox-group {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  
  .custom-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #6E2D79;
    border-radius: 4px;
    margin-right: 8px;
    position: relative;
    cursor: pointer;
  }
  
  .custom-checkbox:checked {
    background-color: #6E2D79;
  }
  
  .custom-checkbox:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .checkbox-label {
    cursor: pointer;
    user-select: none;
  }
`;

// Add the styles to the head (if using plain JS)
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default FormPage;
