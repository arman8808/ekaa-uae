import React, { useState, useRef, useCallback } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { BsSend } from "react-icons/bs";
import ContactLocations from "../utils/ContactLocations";

// Constants for better maintainability
const ANIMATION_CONFIG = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  },
};

const COUNTRIES = [
  { value: "", label: "Select Country" },
  { value: "US", label: "United States" },
  { value: "IN", label: "India" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
];

const FORM_VALIDATION = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phoneNumber: { required: true, pattern: /^\+?[\d\s\-\(\)]{10,}$/ },
  country: { required: true },
  zipCode: { required: true, minLength: 3 },
  message: { required: true, minLength: 0 },
  acceptPrivacyPolicy: { required: true },
};

// Custom hooks for better separation of concerns
const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    const validation = FORM_VALIDATION[name];
    if (!validation) return "";

    if (validation.required && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (validation.minLength && value.length < validation.minLength) {
      return `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least ${validation.minLength} characters`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      if (name === "email") return "Please enter a valid email address";
      if (name === "phoneNumber") return "Please enter a valid phone number";
    }

    return "";
  }, []);

  const validateForm = useCallback(
    (data) => {
      const newErrors = {};
      Object.keys(FORM_VALIDATION).forEach((field) => {
        const error = validateField(field, data[field]);
        if (error) newErrors[field] = error;
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateField]
  );

  return { errors, validateField, validateForm, setErrors };
};

const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const submitForm = useCallback(async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL + "contact"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      return { success: true, data: result };
    } catch (error) {
      const errorMessage =
        error.message || "Failed to send message. Please try again.";
      setSubmitStatus({ type: "error", message: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitForm, isSubmitting, submitStatus };
};

// Reusable components
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={ANIMATION_CONFIG.staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  options = [],
  className = "",
  ...props
}) => {
  const baseInputClasses = `
    w-full border rounded-md px-4 py-3 font-poppins text-base
    focus:outline-none focus:ring-2 transition-all duration-300
    ${
      error
        ? "border-red-500 focus:ring-red-300 bg-red-50"
        : "border-[#6E2D79] focus:ring-purple-300 bg-white"
    }
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#6E2D79]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={baseInputClasses}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${baseInputClasses} resize-vertical min-h-[120px]`}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseInputClasses}
          {...props}
        />
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const StatusMessage = ({ status }) => {
  if (!status) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-md mb-6 ${
        status.type === "success"
          ? "bg-green-50 border border-green-200 text-green-800"
          : "bg-red-50 border border-red-200 text-red-800"
      }`}
    >
      {status.message}
    </motion.div>
  );
};

// Main component
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    message: "",
    acceptPrivacyPolicy: false,
  });

  const [touchedFields, setTouchedFields] = useState({});
  const { errors, validateField, validateForm, setErrors } =
    useFormValidation(formData);
  const { submitForm, isSubmitting, submitStatus } = useFormSubmission();

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors, setErrors]
  );

  const handleFieldBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouchedFields((prev) => ({ ...prev, [name]: true }));

      if (touchedFields[name] || value) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touchedFields, validateField, setErrors]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();

      if (!validateForm(formData)) {
        setTouchedFields(
          Object.keys(FORM_VALIDATION).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {})
        );
        return;
      }

      const result = await submitForm(formData);
      if (result.success) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          country: "",
          zipCode: "",
          message: "",
          acceptPrivacyPolicy: false,
        });
        setTouchedFields({});
        setErrors({});
      }
    },
    [formData, validateForm, submitForm, setErrors]
  );

  return (
    <div className="bg-purple-50 min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_CONFIG.staggerContainer}
        className="relative z-10 text-center pt-20 pb-16"
      >
        <motion.h1
          variants={ANIMATION_CONFIG.fadeInUp}
          className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#6E2D79] font-poppins mb-4"
        >
          Contact Us
        </motion.h1>
        <motion.p
          variants={ANIMATION_CONFIG.fadeInUp}
          className="font-normal text-[#6E2D79] font-poppins text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          We'd Love to Hear From You!
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <AnimatedSection className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={ANIMATION_CONFIG.fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            <StatusMessage status={submitStatus} />

            <div className="space-y-6">
              {/* First Name and Last Name */}
              <motion.div variants={ANIMATION_CONFIG.fadeInLeft}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your first name"
                    error={touchedFields.firstName ? errors.firstName : ""}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your last name"
                    error={touchedFields.lastName ? errors.lastName : ""}
                    required
                  />
                </div>
              </motion.div>

              {/* Email and Phone Number */}
              <motion.div variants={ANIMATION_CONFIG.fadeInRight}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your email address"
                    error={touchedFields.email ? errors.email : ""}
                    required
                  />
                  <FormField
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="+1 (555) 123-4567"
                    error={touchedFields.phoneNumber ? errors.phoneNumber : ""}
                    required
                  />
                </div>
              </motion.div>

              {/* Country and Zip Code */}
              <motion.div variants={ANIMATION_CONFIG.fadeInLeft}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Country"
                    type="select"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    options={COUNTRIES}
                    error={touchedFields.country ? errors.country : ""}
                    required
                  />
                  <FormField
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter zip code"
                    error={touchedFields.zipCode ? errors.zipCode : ""}
                    required
                  />
                </div>
              </motion.div>

              {/* Message */}
              <motion.div variants={ANIMATION_CONFIG.fadeInRight}>
                <FormField
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="Tell us how we can help you..."
                  error={touchedFields.message ? errors.message : ""}
                  required
                  rows={5}
                />
              </motion.div>

              {/* Privacy Policy Checkbox */}
              <motion.div variants={ANIMATION_CONFIG.fadeInUp}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptPrivacyPolicy"
                    name="acceptPrivacyPolicy"
                    checked={formData.acceptPrivacyPolicy}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="mt-1 h-4 w-4 text-[#6E2D79] focus:ring-[#6E2D79] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="acceptPrivacyPolicy"
                    className="text-sm text-[#6E2D79]"
                  >
                    I accept the{" "}
                    <motion.a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6E2D79] underline font-medium"
                      whileHover={{ color: "#4b0082" }}
                    >
                      Privacy Policy
                    </motion.a>{" "}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                {touchedFields.acceptPrivacyPolicy &&
                  errors.acceptPrivacyPolicy && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium mt-2"
                    >
                      {errors.acceptPrivacyPolicy}
                    </motion.p>
                  )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={ANIMATION_CONFIG.fadeInUp}>
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={
                    !isSubmitting
                      ? {
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(110,45,121,0.3)",
                        }
                      : {}
                  }
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full inline-flex justify-center items-center text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#6E2D79] px-8 py-4 gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={!isSubmitting ? { x: -5 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.span>
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    whileHover={!isSubmitting ? { x: 5, rotate: 45 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <BsSend size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
            <ContactLocations />
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactUsPage;
