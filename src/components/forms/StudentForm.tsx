"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ShieldCheck,
  User,
  BookOpen,
  Phone,
  HeartPulse,
} from "lucide-react";

import {
  InputField,
  SelectField,
  TextAreaField,
  UploadField,
  FormSection,
  FormButtons,
} from "@/components/FormFields";

/* ==========================================================
    Validation Schema
========================================================== */

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters."),

  email: z
    .string()
    .email("Enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters."),

  firstName: z
    .string()
    .min(1, "First name is required."),

  lastName: z
    .string()
    .min(1, "Last name is required."),

  gender: z.enum(["Male", "Female"]),

  dob: z.string().min(1, "Date of birth is required."),
  
  admissionNumber: z
    .string()
    .min(1, "Admission number is required."),

  grade: z
    .string()
    .min(1, "Grade is required."),

  section: z
    .string()
    .min(1, "Section is required."),

  rollNumber: z
    .string()
    .min(1, "Roll number is required."),

  phone: z.string().regex(
    /^[0-9]{10}$/,
    "Enter a valid 10-digit phone number."
  ),

  parentPhone: z.string().regex(
    /^[0-9]{10}$/,
    "Enter a valid 10-digit phone number."
  ),

  address: z
    .string()
    .min(5, "Address is required."),

  bloodGroup: z
    .string()
    .min(1, "Blood group is required."),

  allergies: z.string().optional(),

  image: z.any().optional(),
});

type Inputs = z.infer<typeof schema>;

interface StudentFormProps {
  type: "create" | "update";
  data?: Partial<Inputs>;
}

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const gradeOptions = Array.from(
  { length: 12 },
  (_, i) => ({
    label: `Grade ${i + 1}`,
    value: `Grade ${i + 1}`,
  })
);

const sectionOptions = [
  { label: "Section A", value: "A" },
  { label: "Section B", value: "B" },
  { label: "Section C", value: "C" },
  { label: "Section D", value: "D" },
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

export default function StudentForm({
  type,
  data,
}: StudentFormProps) {
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
    <form
      onSubmit={onSubmit}
      className="space-y-8"
    >
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          {type === "create"
            ? "Create Student"
            : "Update Student"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Fill in the information below to
          {type === "create"
            ? " register a new student."
            : " update the student profile."}
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
            placeholder="john.doe"
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
            placeholder="student@school.com"
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
        subtitle="Basic student details."
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
      {/* ACADEMIC INFORMATION                              */}
      {/* ================================================= */}

      <FormSection
        title="Academic Information"
        subtitle="Student academic details and class allocation."
        icon={BookOpen}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          <InputField
            label="Admission Number"
            name="admissionNumber"
            register={register}
            error={errors.admissionNumber}
            required
            placeholder="ADM-2026-001"
          />

          <SelectField
            label="Grade"
            name="grade"
            register={register}
            error={errors.grade}
            required
            options={gradeOptions}
          />

          <SelectField
            label="Section"
            name="section"
            register={register}
            error={errors.section}
            required
            options={sectionOptions}
          />

          <InputField
            label="Roll Number"
            name="rollNumber"
            register={register}
            error={errors.rollNumber}
            required
            placeholder="25"
          />

        </div>
      </FormSection>

      {/* ================================================= */}
      {/* CONTACT INFORMATION                               */}
      {/* ================================================= */}

      <FormSection
        title="Contact Information"
        subtitle="Student and guardian contact details."
        icon={Phone}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <InputField
            label="Student Phone"
            name="phone"
            register={register}
            error={errors.phone}
            required
            placeholder="9876543210"
          />

          <InputField
            label="Parent Phone"
            name="parentPhone"
            register={register}
            error={errors.parentPhone}
            required
            placeholder="9876543210"
          />

          <div className="md:col-span-2">

            <TextAreaField
              label="Residential Address"
              name="address"
              register={register}
              error={errors.address}
              required
              rows={4}
              placeholder="Enter complete residential address..."
            />

          </div>

        </div>
      </FormSection>

      {/* ================================================= */}
      {/* MEDICAL INFORMATION                               */}
      {/* ================================================= */}

      <FormSection
        title="Medical Information"
        subtitle="Medical details and student profile photo."
        icon={HeartPulse}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          <SelectField
            label="Blood Group"
            name="bloodGroup"
            register={register}
            error={errors.bloodGroup}
            required
            options={bloodGroupOptions}
          />

          <InputField
            label="Allergies"
            name="allergies"
            register={register}
            error={errors.allergies}
            placeholder="Optional"
          />

          <UploadField
            label="Profile Photo"
            name="image"
            register={register}
          />

        </div>

      </FormSection>

      {/* ================================================= */}
      {/* ACTION BUTTONS                                    */}
      {/* ================================================= */}

      <FormButtons
        submitLabel={
          type === "create"
            ? "Create Student"
            : "Update Student"
        }
      />

    </form>
  );
}