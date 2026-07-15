"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ShieldCheck,
  User,
  Phone,
  Briefcase,
} from "lucide-react";

import {
  InputField,
  SelectField,
  TextAreaField,
  UploadField,
  FormSection,
  FormButtons,
} from "@/components/FormFields";

// Import your dummy data
import { subjectsData } from "@/lib/data";

/* ==========================================================
    Static Options
========================================================== */

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

// Dynamically generate subject options from your data.ts file
const subjectOptions = subjectsData.map((subject) => ({
  label: subject.name,
  value: subject.name,
}));

/* ==========================================================
    Validation Schema
========================================================== */

const schema = z.object({
  // Authentication
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters."),

  // Personal
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  gender: z.enum(["Male", "Female"], {
    message: "Please select a gender.",
  }),
  dob: z.string().min(1, "Date of birth is required."),

  // Professional
  employeeId: z.string().min(1, "Employee ID is required."),
  subject: z.string().min(1, "Subject is required."),
  qualification: z.string().min(1, "Qualification is required."),
  experience: z.string().min(1, "Experience is required (e.g., '5 Years')."),

  // Contact & Additional
  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number."),
  bloodGroup: z.string().min(1, "Blood group is required."),
  address: z.string().min(5, "Address is required."),
  image: z.any().optional(),
});

type Inputs = z.infer<typeof schema>;

interface TeacherFormProps {
  type: "create" | "update";
  data?: Partial<Inputs>;
}

export default function TeacherForm({ type, data }: TeacherFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {type === "create" ? "Create Teacher" : "Update Teacher"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {type === "create"
            ? "Add a new teacher to the school management system."
            : "Update the teacher's profile in the school management system."}
        </p>
      </div>

      {/* ================================================= */}
      {/* AUTHENTICATION                                    */}
      {/* ================================================= */}
      <FormSection
        title="Authentication Information"
        subtitle="Portal login credentials."
        icon={ShieldCheck}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <InputField
            label="Username"
            name="username"
            register={register}
            error={errors.username}
            required
            placeholder="jane.smith"
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
            placeholder="teacher@school.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            required
            placeholder="********"
          />
        </div>
      </FormSection>

      {/* ================================================= */}
      {/* PERSONAL INFORMATION                              */}
      {/* ================================================= */}
      <FormSection
        title="Personal Information"
        subtitle="Basic teacher details."
        icon={User}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            required
          />
          <SelectField
            label="Gender"
            name="gender"
            register={register}
            error={errors.gender}
            required
            options={genderOptions}
          />
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            error={errors.dob}
            required
          />
        </div>
      </FormSection>

      {/* ================================================= */}
      {/* PROFESSIONAL INFORMATION                          */}
      {/* ================================================= */}
      <FormSection
        title="Professional Information"
        subtitle="Academic role and credentials."
        icon={Briefcase}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <InputField
            label="Employee ID"
            name="employeeId"
            register={register}
            error={errors.employeeId}
            required
            placeholder="EMP-2024-042"
          />
          {/* Using the dynamic subjectsData from lib/data.ts */}
          <SelectField
            label="Primary Subject"
            name="subject"
            register={register}
            error={errors.subject}
            required
            options={subjectOptions}
          />
          <InputField
            label="Highest Qualification"
            name="qualification"
            register={register}
            error={errors.qualification}
            required
            placeholder="M.Sc. in Mathematics"
          />
          <InputField
            label="Years of Experience"
            name="experience"
            register={register}
            error={errors.experience}
            required
            placeholder="5 Years"
          />
        </div>
      </FormSection>

      {/* ================================================= */}
      {/* CONTACT & ADDITIONAL DETAILS                      */}
      {/* ================================================= */}
      <FormSection
        title="Contact & Additional Details"
        subtitle="Contact info, medical, and profile photo."
        icon={Phone}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          
          <InputField
            label="Phone Number"
            name="phone"
            register={register}
            error={errors.phone}
            required
            placeholder="9876543210"
          />
          <SelectField
            label="Blood Group"
            name="bloodGroup"
            register={register}
            error={errors.bloodGroup}
            required
            options={bloodGroupOptions}
          />

          <div className="md:col-span-2">
            <TextAreaField
              label="Residential Address"
              name="address"
              register={register}
              error={errors.address}
              required
              rows={3}
              placeholder="Enter complete residential address..."
            />
          </div>

          <div className="md:col-span-2">
            <UploadField
              label="Profile Photo"
              name="image"
              register={register}
            />
          </div>
        </div>
      </FormSection>

      {/* ================================================= */}
      {/* ACTION BUTTONS                                    */}
      {/* ================================================= */}
      <FormButtons
        submitLabel={
          type === "create" ? "Create Teacher" : "Update Teacher"
        }
      />
    </form>
  );
}