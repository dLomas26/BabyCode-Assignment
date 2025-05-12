import React, { useState } from 'react';
import axios from '../api';

export default function StudentForm({ onStudentAdded, requireLogin, user }) {
  const [form, setForm] = useState({ name: '', email: '', course: '', age: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!form.name || !form.email || !form.course || !form.age) return 'All fields are required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Invalid email.';
    if (isNaN(Number(form.age)) || Number(form.age) < 1) return 'Invalid age.';
    return '';
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    if (requireLogin && !user) return setError('Login required to add student.');
    setLoading(true);
    try {
      await axios.post('/api/students', form);
      setForm({ name: '', email: '', course: '', age: '' });
      onStudentAdded && onStudentAdded();
    } catch {
      setError('Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3 bg-white rounded p-4 shadow max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-center font-bold">Add New Student</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input input-bordered w-full" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input input-bordered w-full" />
      <input name="course" placeholder="Course" value={form.course} onChange={handleChange} className="input input-bordered w-full" />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="input input-bordered w-full" />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="bg-red-50 btn btn-primary w-full" disabled={loading}>{loading ? 'Adding...' : 'Add Student'}</button>
    </form>
  );
}
