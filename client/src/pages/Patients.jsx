import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import axios from "axios"
import { Header } from '../components';
import { useState, useEffect } from 'react';
const Patients = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/admin')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log(users)
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Paitents" />
      <div>
        <h1>Patients</h1>
        <table className="w-full max-w-md mx-auto my-4 text-sm md:text-base border border-gray-300 divide-y divide-gray-300">
          <thead className="bg-gray-100 text-gray-700 font-bold">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Gender</th>
              <th className="py-2 px-4">Height</th>
              <th className="py-2 px-4">Weight</th>
              <th className="py-2 px-4">WBC Count</th>
              <th className="py-2 px-4">RBC Count</th>
              <th className="py-2 px-4">Haemoglobin Count</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {users.map(patient => (
              <tr key={patient.id}>
                <td className="py-2 px-4">{patient.id}</td>
                <td className="py-2 px-4">{patient.name}</td>
                <td className="py-2 px-4">{patient.age}</td>
                <td className="py-2 px-4">{patient.gender}</td>
                <td className="py-2 px-4">{patient.height}</td>
                <td className="py-2 px-4">{patient.weight}</td>
                <td className="py-2 px-4">{patient.wbc}</td>
                <td className="py-2 px-4">{patient.rbc}</td>
                <td className="py-2 px-4">{patient.hema}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Patients;
