import React, { useEffect, useState } from 'react';
import axios from '../api';

export default function StudentDetails({ id, requireLogin, user, onClose }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (requireLogin && !user) {
      setError('Login required to view details.');
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get(`/api/students/${id}`)
      .then(res => setStudent(res.data))
      .catch(() => setError('Student not found.'))
      .finally(() => setLoading(false));
  }, [id, requireLogin, user]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-2">{student.name}</h2>
        <div><b>Email:</b> {student.email}</div>
        <div><b>Course:</b> {student.course}</div>
        <div><b>Age:</b> {student.age}</div>
      </div>
    </div>
  );
}
