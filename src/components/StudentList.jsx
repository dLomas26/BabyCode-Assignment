import React, { useEffect, useState } from 'react';
import axios from '../api';

export default function StudentList({ filterCourse, onSelectStudent, refresh }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/students', { params: filterCourse ? { course: filterCourse } : {} })
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  }, [filterCourse, refresh]);

  if (loading) return <div className="text-center p-4">Loading students...</div>;
  if (!students.length) return <div className="text-center p-4">No students found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Course</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {students.map(s => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{s.name}</td>
              <td className="px-4 py-2">{s.email}</td>
              <td className="px-4 py-2">{s.course}</td>
              <td className="px-4 py-2">{s.age}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 underline hover:text-blue-700"
                  onClick={() => onSelectStudent(s.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
