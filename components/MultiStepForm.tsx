// components/MultiStepForm.tsx
import React, { useState } from "react";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const getSubOptions = (skill: string) => {
    const options: Record<string, string[]> = {
      "Income Tax": ["TDS Knowledge", "Return filing", "Challan payment"],
      GST: ["Computation of GST", "Filing of GSTR 1", "Reconciliation"],
      Accounting: ["Entries of Tally", "Books Finalisation", "Depreciation"],
      "Audit Support": ["Prepare Audit Data", "Communication to Auditor"],
      Excel: ["Basic Excel", "Advanced Excel"],
    };
    return options[skill] || [];
  };

  const formSteps = [
    {
      title: "Job Title",
      content: (
        <input
          type="text"
          name="JobTitle"
          placeholder="Enter Your Job Title"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleInputChange(e)}
        />
      ),
      validate: () => !!formData.JobTitle,
    },
    {
      title: "Gender",
      content: (
        <div>
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender} className="block">
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={(e) => handleInputChange(e)}
                className="mr-2"
              />
              {gender}
            </label>
          ))}
        </div>
      ),
      validate: () => !!formData.gender,
    },
    {
      title: "Personality Type",
      content: (
        <div>
          {[ 
            "ISTJ - The Logistician", "ISFJ—The Defender", "INFJ - The Advocate", 
            "INTJ—The Architect", "ISTP - The Virtuoso", "ISFP - The Adventurer", 
            "INFP - The Mediator", "INTP—The Logician", "ESTP - The Entrepreneur", 
            "ESFP - The Entertainer", "ENFP - The Campaigner", "ENTP - The Debater", 
            "ESTJ—The Executive", "ESFJ - The Consul", "ENFJ—The Protagonist", 
            "ENTJ—The Commander" 
          ].map((type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                name="personality"
                value={type}
                onChange={(e) => handleCheckboxChange(e, "personality")}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.personality?.length > 0,
    },
    {
      title: "Preferred Location (City)",
      content: (
        <input
          type="text"
          name="location"
          placeholder="Enter Your Preferred Location"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleInputChange(e)}
        />
      ),
      validate: () => !!formData.location,
    },
    {
      title: "Site Preference",
      content: (
        <div>
          {["Onsite", "Remote", "Hybrid"].map((preference) => (
            <label key={preference} className="block">
              <input
                type="checkbox"
                name="sitePreference"
                value={preference}
                onChange={(e) => handleCheckboxChange(e, "sitePreference")}
                className="mr-2"
              />
              {preference}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.sitePreference?.length > 0,
    },
    {
      title: "Location Preference",
      content: (
        <div>
          {["Same as the office Location", "Willing to relocate", "Within 50 km Radius"].map((preference) => (
            <label key={preference} className="block">
              <input
                type="checkbox"
                name="locationPreference"
                value={preference}
                onChange={(e) => handleCheckboxChange(e, "locationPreference")}
                className="mr-2"
              />
              {preference}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.locationPreference?.length > 0,
    },
    {
      title: "Availability Preference",
      content: (
        <div>
          {["Immediate", "Within 15 Days", "Within 30 Days"].map((availability) => (
            <label key={availability} className="block">
              <input
                type="checkbox"
                name="availabilityPreference"
                value={availability}
                onChange={(e) => handleCheckboxChange(e, "availabilityPreference")}
                className="mr-2"
              />
              {availability}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.availabilityPreference?.length > 0,
    },
    {
      title: "Communication Skills",
      content: (
        <div>
          {["Hindi", "English", "Regional"].map((language) => (
            <label key={language} className="block">
              <input
                type="checkbox"
                name="communication"
                value={language}
                onChange={(e) => handleCheckboxChange(e, "communication")}
                className="mr-2"
              />
              {language}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.communication?.length > 0,
    },
    {
      title: "Experience",
      content: (
        <div>
          {["0 - 1 Year", "2 - 3 Years", "3 - 5 Years", "5+ Years"].map((experience) => (
            <label key={experience} className="block">
              <input
                type="checkbox"
                name="experience"
                value={experience}
                onChange={(e) => handleCheckboxChange(e, "experience")}
                className="mr-2"
              />
              {experience}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.experience?.length > 0,
    },
    {
      title: "Preferred Industry",
      content: (
        <input
          type="text"
          name="industry"
          placeholder="Enter your preferred industry"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleInputChange(e)}
        />
      ),
      validate: () => !!formData.industry,
    },
    {
      title: "Salary Expectation (₹ per month)",
      content: (
        <div>
          {["Upto ₹20,000", "₹20,000-₹30,000", "₹30,000-₹40,000", "₹40,000-₹50,000", "₹50,000+"].map((salary) => (
            <label key={salary} className="block">
              <input
                type="checkbox"
                name="salary"
                value={salary}
                onChange={(e) => handleCheckboxChange(e, "salary")}
                className="mr-2"
              />
              {salary}
            </label>
          ))}
        </div>
      ),
      validate: () => formData.salary?.length > 0,
    },
    {
      title: "Suggestions (if any)",
      content: (
        <input
          type="text"
          name="suggestion"
          placeholder="Write Your Suggestion"
          required
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleInputChange(e)}
        />
      ),
      validate: () => !!formData.suggestion,
    },
    {
      title: "Review Your Choices",
      content: (
        <div id="review">
          {Object.entries(formData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </p>
          ))}
        </div>
      ),
      validate: () => true, // Always allow review step
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear the error when user starts typing
    if (error) setError("");
  };

  const handleRadioChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: string
) => {
  const { value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  if (error) setError("");
};
  
const handleCheckboxChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: string
) => {
  const { checked, value } = e.target;

  setFormData((prev) => {
    const currentValues = prev[field] || [];
    const updatedValues = checked
      ? [...currentValues, value]
      : currentValues.filter((val: string) => val !== value);

    // Set error if more than one checkbox is selected
    if (updatedValues.length > 1) {
      setError("Please select only one option.");
    } else {
      setError("");
    }

    return {
      ...prev,
      [field]: updatedValues,
    };
  });
};

const handleNext = () => {
  if (formSteps[currentStep].validate()) {
    setCurrentStep((prev) => prev + 1);
  } else {
    setError("Please fill out all fields.");
  }
};

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/form2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setError("An error occurred during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container p-10 bg-white rounded-2xl">
  <h1 className="text-center text-5xl font-medium text-blue-90 mb-6">Find Your Best Match</h1>
  <h2 className="py-4 text-2xl">{formSteps[currentStep].title}</h2>
  <div>{formSteps[currentStep].content}</div>
  {error && <p className="error text-red-700">{error}</p>}
  
  {!isSubmitted && (
    <div className="actions flex gap-6 justify-between">
      {currentStep > 0 && (
        <button
          onClick={handlePrevious}
          className="btn bg-[#24D3D4] px-4 py-2 text-white mt-4 rounded-lg"
        >
          Previous
        </button>
      )}
      {currentStep < formSteps.length - 1 && (
        <button
          onClick={handleNext}
          className="btn bg-blue-90 px-4 py-2 text-white mt-4 rounded-lg"
          disabled={!!error}
        >
          Next
        </button>
      )}
      {currentStep === formSteps.length - 1 && !isLoading && (
        <button
          onClick={handleSubmit}
          className="btn bg-green-500 px-4 py-2 text-white mt-4 rounded-lg"
        >
          Submit
        </button>
      )}
      {isLoading && (
        <p className="bg-[#24D3D4] px-4 py-2 text-white mt-4 rounded-lg">
          Submitting, please wait...
        </p>
      )}
    </div>
  )}

  {isSubmitted && (
    <div className="success-message p-6 bg-green-100 text-green-700 rounded-lg mt-6">
      <h2 className="text-xl font-semibold">Form Submitted Successfully!</h2>
      <p>Your form has been submitted. Thank you for your response.</p>
    </div>
  )}
</div>

  );
};

export default MultiStepForm;
