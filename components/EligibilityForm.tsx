import { useState, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  category: string;
  dob: string;
  email: string;
  contact: string;
  state: string;
  city: string;
  address: string;
  income: string;
  qualification: string;
  college: string;
  passingYear: string;
  accounting: string;
  termsAccepted: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const EligibilityForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    category: 'General',
    dob: '',
    email: '',
    contact: '',
    state: '',
    city: '',
    address: '',
    income: '',
    qualification: '',
    college: '',
    passingYear: '',
    accounting: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    // First name validation - only alphabets
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name should only contain alphabets';
    }

    // Last name validation - only alphabets
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain alphabets';
    }

    // Date of birth validation - max till 2006
    const dob = new Date(formData.dob);
    const maxDate = new Date('2006-12-31');
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (dob > maxDate) {
      newErrors.dob = 'You must be born on or before 2006';
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Contact validation - exactly 10 digits
    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact number must be exactly 10 digits';
    }

    // State validation - only alphabets and spaces
    if (!/^[A-Za-z\s]+$/.test(formData.state)) {
      newErrors.state = 'State should only contain alphabets';
    }

    // City validation - only alphabets and spaces
    if (!/^[A-Za-z\s]+$/.test(formData.city)) {
      newErrors.city = 'City should only contain alphabets';
    }

    // Address validation - only alphabets, numbers, spaces and basic punctuation
    if (!/^[A-Za-z0-9\s,.-]+$/.test(formData.address)) {
      newErrors.address = 'Address contains invalid characters';
    }

    // Income validation - only numbers
    if (!/^\d+$/.test(formData.income)) {
      newErrors.income = 'Income should only contain numbers';
    }

    // Qualification validation - only alphabets, spaces, and dots
    if (!/^[A-Za-z.\s]+$/.test(formData.qualification)) {
      newErrors.qualification = 'Qualification should only contain alphabets';
    }

    // College validation - only alphabets and spaces
    if (!/^[A-Za-z\s]+$/.test(formData.college)) {
      newErrors.college = 'Institute name should only contain alphabets';
    }

    // Passing year validation - exactly 4 digits between 1900-2023
    if (!/^\d{4}$/.test(formData.passingYear)) {
      newErrors.passingYear = 'Passing year must be exactly 4 digits';
    } else {
      const year = parseInt(formData.passingYear);
      if (year < 1900 || year > 2023) {
        newErrors.passingYear = 'Please enter a valid year between 1900 and 2023';
      }
    }

    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          category: 'General',
          dob: '',
          email: '',
          contact: '',
          state: '',
          city: '',
          address: '',
          income: '',
          qualification: '',
          college: '',
          passingYear: '',
          accounting: '',
          termsAccepted: false
        });
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-sm font-medium text-gray-700">
      {children} <span className="text-red-500">*</span>
    </span>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#21345c] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="mb-4">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank you!</h2>
          <p className="text-gray-600 mb-6">Your submission has been sent.</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-[#21345c] text-white px-6 py-2 rounded-md hover:bg-[#2fded5] transition-colors duration-200"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#21345c] min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg relative">
        {isSubmitting && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21345c] mb-3"></div>
              <p className="text-[#21345c] font-medium">Submitting...</p>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-bold text-center text-[#21345c] mb-8">
          Check Your Eligibility For Scholarship
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <RequiredLabel>First Name</RequiredLabel>
              <input
                type="text"
                id="first-name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.firstName ? 'border-red-500' : ''}`}
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <RequiredLabel>Last Name</RequiredLabel>
              <input
                type="text"
                id="last-name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.lastName ? 'border-red-500' : ''}`}
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <RequiredLabel>Gender</RequiredLabel>
              <div className="mt-1 space-x-4">
                {['Male', 'Female', 'Others'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="form-radio text-[#21345c]"
                      required
                    />
                    <span className="ml-2 text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <RequiredLabel>Category</RequiredLabel>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm"
                required
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="ST">ST</option>
                <option value="SC">SC</option>
              </select>
            </div>

            <div>
              <RequiredLabel>Date of Birth</RequiredLabel>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                max="2006-12-31"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.dob ? 'border-red-500' : ''}`}
                required
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
            <div>
              <RequiredLabel>E-mail ID</RequiredLabel>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <RequiredLabel>Contact No.</RequiredLabel>
              <input
                type="tel"
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.contact ? 'border-red-500' : ''}`}
                required
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>

            <div>
              <RequiredLabel>State</RequiredLabel>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.state ? 'border-red-500' : ''}`}
                required
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>

            <div>
              <RequiredLabel>City</RequiredLabel>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.city ? 'border-red-500' : ''}`}
                required
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div className="col-span-2">
              <RequiredLabel>Current Address</RequiredLabel>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={2}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.address ? 'border-red-500' : ''}`}
                required
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <RequiredLabel>Annual Family Income</RequiredLabel>
              <input
                type="text"
                id="income"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.income ? 'border-red-500' : ''}`}
                required
              />
              {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income}</p>}
            </div>

            <div>
              <RequiredLabel>Education Qualification</RequiredLabel>
              <input
                type="text"
                id="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.qualification ? 'border-red-500' : ''}`}
                placeholder="e.g. B.com, M.com, Bsc......."
                required
              />
              {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
            </div>

            <div>
              <RequiredLabel>Institute Name</RequiredLabel>
              <input
                type="text"
                id="college"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.college ? 'border-red-500' : ''}`}
                required
              />
              {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
            </div>

            <div>
              <RequiredLabel>Passing Year</RequiredLabel>
              <input
                type="text"
                id="passing-year"
                value={formData.passingYear}
                onChange={(e) => setFormData({...formData, passingYear: e.target.value})}
                maxLength={4}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a27e1] focus:ring-[#2a27e1] text-sm ${errors.passingYear ? 'border-red-500' : ''}`}
                required
              />
              {errors.passingYear && <p className="text-red-500 text-xs mt-1">{errors.passingYear}</p>}
            </div>

            <div>
              <RequiredLabel>Basic knowledge of accounting?</RequiredLabel>
              <div className="mt-1 space-x-4">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="accounting"
                      value={option}
                      checked={formData.accounting === option}
                      onChange={(e) => setFormData({...formData, accounting: e.target.value})}
                      className="form-radio text-[#21345c]"
                      required
                    />
                    <span className="ml-2 text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                className="form-checkbox text-[#21345c]"
              />
              <span className="ml-2 text-sm text-gray-700">
                I accept the <a href="/terms" className="text-[#2a27e1] hover:underline" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#21345c] text-white py-2 px-4 rounded-md hover:bg-[#2fded5] transition-colors duration-200 text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EligibilityForm;
