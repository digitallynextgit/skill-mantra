"use client"
import HireSection from "@/components/Hirewithus";
import MultiStepForm from "@/components/MultiStepForm";

const page = () => {
  return (
    <>
      <HireSection />
      <div className="flex items-center justify-center py-10 bg-blue-90">
        <MultiStepForm />
      </div>
    </>
  );
};

export default page;
