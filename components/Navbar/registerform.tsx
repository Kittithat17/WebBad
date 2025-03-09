"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  age: string;
  gender: string;
  rank: string;
  date: string;
  image: File | null;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    rank: "",
    date: "",
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("rank", form.rank);
    formData.append("date", form.date);
    if (form.image) {
      formData.append("image", form.image);
    }

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="w-full max-w-lg h-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-lg outline-none "
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-lg outline-none "
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-lg outline-none "
          required
        />
        <select
          name="rank"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-lg outline-none "
          required
        >
          <option value="">Select Rank</option>
          <option value="Level 1">Level 1</option>
          <option value="Level 2">Level 2</option>
          <option value="Level 3">Level 3</option>
          <option value="Level 4">Level 4</option>
        </select>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-lg outline-none "
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border rounded-lg text-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
