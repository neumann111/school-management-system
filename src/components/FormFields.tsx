"use client";

import { useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { LucideIcon, Upload } from "lucide-react";

/* ==========================================================
    Shared Types
========================================================== */

type BaseProps<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  required?: boolean;
};

const inputClasses =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const errorInputClasses =
  "border-red-400 focus:border-red-500 focus:ring-red-100";

/* ==========================================================
    Input Field
========================================================== */

type InputFieldProps<TFormValues extends FieldValues> =
  BaseProps<TFormValues> & {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
  };

export function InputField<TFormValues extends FieldValues>({
  label,
  name,
  register,
  error,
  required,
  type = "text",
  placeholder,
}: InputFieldProps<TFormValues>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`${inputClasses} ${
          error ? errorInputClasses : ""
        }`}
      />

      <div className="min-h-[18px]">
        {error && (
          <p className="text-xs font-medium text-red-500">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

/* ==========================================================
    Select Field
========================================================== */

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<TFormValues extends FieldValues> =
  BaseProps<TFormValues> & {
    options: Option[];
  };

export function SelectField<
  TFormValues extends FieldValues,
>({
  label,
  name,
  register,
  error,
  required,
  options,
}: SelectFieldProps<TFormValues>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        id={name}
        {...register(name)}
        className={`${inputClasses} ${
          error ? errorInputClasses : ""
        }`}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="min-h-[18px]">
        {error && (
          <p className="text-xs font-medium text-red-500">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

/* ==========================================================
    TextArea
========================================================== */

type TextAreaFieldProps<
  TFormValues extends FieldValues,
> = BaseProps<TFormValues> & {
  rows?: number;
  placeholder?: string;
};

export function TextAreaField<
  TFormValues extends FieldValues,
>({
  label,
  name,
  register,
  error,
  required,
  rows = 4,
  placeholder,
}: TextAreaFieldProps<TFormValues>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className={`resize-none rounded-xl border bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all duration-200 ${inputClasses} ${
          error ? errorInputClasses : ""
        }`}
      />

      <div className="min-h-[18px]">
        {error && (
          <p className="text-xs font-medium text-red-500">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

/* ==========================================================
    Upload Field
========================================================== */

type UploadFieldProps<
  TFormValues extends FieldValues,
> = BaseProps<TFormValues>;

export function UploadField<
  TFormValues extends FieldValues,
>({
  label,
  name,
  register,
}: UploadFieldProps<TFormValues>) {
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <label
        htmlFor={name}
        className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 transition hover:border-indigo-400 hover:bg-indigo-50"
      >
        <Upload className="mb-2 h-6 w-6 text-indigo-500" />

        <span className="font-medium text-slate-700">
          Upload Photo
        </span>

        <span className="mt-1 text-xs text-slate-500">
          JPG, PNG (Max 2 MB)
        </span>

        {fileName && (
          <span className="mt-2 text-xs font-medium text-indigo-600">
            {fileName}
          </span>
        )}
      </label>

      <input
        id={name}
        type="file"
        accept="image/*"
        {...register(name, {
          onChange: (e) => {
            if (e.target.files?.length) {
              setFileName(e.target.files[0].name);
            }
          },
        })}
        className="hidden"
      />
    </div>
  );
}

/* ==========================================================
    Form Section
========================================================== */

type FormSectionProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export function FormSection({
  title,
  subtitle,
  icon: Icon,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
          <Icon size={18} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

      </div>

      {children}
    </section>
  );
}

/* ==========================================================
    Buttons
========================================================== */

type FormButtonsProps = {
  submitLabel: string;
};

export function FormButtons({
  submitLabel,
}: FormButtonsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

      <button
        type="button"
        className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 hover:shadow-lg"
      >
        {submitLabel}
      </button>

    </div>
  );
}