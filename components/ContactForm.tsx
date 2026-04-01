import React, { useState } from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { accountTypes, stateCityData } from "@/constants";
import Loader from "@/components/ui/Loader";

type StateKeys = keyof typeof stateCityData;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  emailAddress: z.string().email("Invalid email address"),
  accountType: z.enum([
    "student",
    "Working Professional",
    "CA/CS Pursuing",
    "Govt Job Preparation",
  ]),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  otherCity: z.string().optional(), 
});

type FormValues = z.infer<typeof formSchema>;

const CounselingForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<StateKeys | "">("");
  const [isOtherCity, setIsOtherCity] = useState(false); // Track if "Others" is selected
  const cities = selectedState ? stateCityData[selectedState] : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Use watch to monitor the city input
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      emailAddress: "",
      accountType: "student",
      state: "",
      city: "",
      otherCity: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Watch the city field to determine if "Others" is selected
  const selectedCity = watch("city");

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6 text-center">
        Enroll for Free Demo Class
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col text-black">
          <input
            id="name"
            {...register("name")}
            placeholder="Name"
            className={`p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col">
          <input
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            })}
            placeholder="Phone No."
            maxLength={10}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const input = e.currentTarget;
              input.value = input.value.replace(/[^0-9]/g, "");
            }}
            className={`p-2 border rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Email Address Field */}
        <div className="flex flex-col">
          <input
            id="emailAddress"
            {...register("emailAddress")}
            type="email"
            placeholder="Email ID"
            className={`p-2 border rounded ${
              errors.emailAddress ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.emailAddress && <p className="text-red-500 text-sm">{errors.emailAddress.message}</p>}
        </div>

        {/* Account Type Field */}
        <div className="flex flex-col">
          <select
            id="accountType"
            {...register("accountType")}
            className={`p-2 border rounded ${
              errors.accountType ? "border-red-500" : "border-gray-300"
            }`}
          >
            {accountTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.accountType && <p className="text-red-500 text-sm">{errors.accountType.message}</p>}
        </div>

        {/* State and City Fields */}
        <div className="flex flex-col space-y-4">
          <div>
            <select
              id="state"
              {...register("state", { required: "State is required" })}
              onChange={(e) => {
                setSelectedState(e.target.value as StateKeys);
                setIsOtherCity(false); // Reset other city input when state changes
              }}
              className={`p-2 border rounded w-full ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select State
              </option>
              {Object.keys(stateCityData).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          <div>
            <select
              id="city"
              {...register("city", { required: "City is required" })}
              disabled={!selectedState}
              onChange={(e) => {
                setIsOtherCity(e.target.value === "Others"); // Check if "Others" is selected
              }}
              className={`p-2 border rounded w-full ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              <option value="Others">Others</option> {/* Add "Others" option */}
            </select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          {/* Additional Input for "Other City" */}
          {isOtherCity && (
            <div className="flex flex-col">
              <input
                id="otherCity"
                {...register("otherCity", { required: "Please specify your city" })}
                placeholder="Enter your city"
                className={`p-2 border rounded ${
                  errors.otherCity ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.otherCity && <p className="text-red-500 text-sm">{errors.otherCity.message}</p>}
            </div>
          )}
        </div>

        {/* Submit Button and Loader */}
        <div className="flex items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-90 text-white px-4 py-2 rounded flex-1"
          >
            Submit
          </button>
          {loading && <Loader className="ml-2" />}
        </div>
      </form>
    </div>
  );
};

export default CounselingForm;
