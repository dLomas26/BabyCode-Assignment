
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 700 });

function getLocalStudents() {
  const data = localStorage.getItem('students');
  if (data) return JSON.parse(data);
  return [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', course: 'Math', age: 20 },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', course: 'Science', age: 22 },
    { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', course: 'History', age: 19 },
  ];
}
function setLocalStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}
let students = getLocalStudents();


mock.onGet('/api/students').reply(config => {
  students = getLocalStudents(); 
  const course = config.params?.course;
  let filtered = students;
  if (course) {
    filtered = students.filter(s => s.course === course);
  }
  return [200, filtered];
});


mock.onPost('/api/students').reply(config => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
  students.push(newStudent);
  setLocalStudents(students);
  return [201, newStudent];
});

mock.onGet(/\/api\/students\/\d+/).reply(config => {
  students = getLocalStudents();
  const id = Number(config.url.split('/').pop());
  const student = students.find(s => s.id === id);
  if (student) return [200, student];
  return [404];
});

export default axios;