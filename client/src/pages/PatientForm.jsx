import { React, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import axios from 'axios';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

const PatientForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        gender: '',
        height: 0,
        weight: 0,
        wbcCount: 0,
        rbcCount: 0,
        haemoglobinCount: 0,
    });

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/user', formData);
            console.log(response.data);
            // Handle success case
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Patient Form" />
            <form onSubmit={handleSubmit} className="w-full mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />
                </div>
            <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
                    Age
                </label>
                <input
                    id="age"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.age}
                    onChange={(e) =>
                        setFormData({ ...formData, age: parseInt(e.target.value) })
                    }
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                    Gender
                </label>
                <select
                    id="gender"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.gender}
                    onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                    }
                    required
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="height" className="block text-gray-700 font-bold mb-2">
                    Height (in cm)
                </label>
                <input
                    id="height"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:
          focus:shadow-outline"
                    value={formData.height}
                    onChange={(e) =>
                        setFormData({ ...formData, height: parseInt(e.target.value) })
                    }
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="weight" className="block text-gray-700 font-bold mb-2">
                    Weight (in kg)
                </label>
                <input
                    id="weight"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.weight}
                    onChange={(e) =>
                        setFormData({ ...formData, weight: parseInt(e.target.value) })
                    }
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="wbcCount" className="block text-gray-700 font-bold mb-2">
                    WBC Count
                </label>
                <input
                    id="wbcCount"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.wbcCount}
                    onChange={(e) =>
                        setFormData({ ...formData, wbcCount: parseInt(e.target.value) })
                    }
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="rbcCount" className="block text-gray-700 font-bold mb-2">
                    RBC Count
                </label>
                <input
                    id="rbcCount"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.rbcCount}
                    onChange={(e) =>
                        setFormData({ ...formData, rbcCount: parseInt(e.target.value) })
                    }
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="haemoglobinCount" className="block text-gray-700 font-bold mb-2">
                    Haemoglobin Count
                </label>
                <input
                    id="haemoglobinCount"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.haemoglobinCount}
                    onChange={(e) =>
                        setFormData({ ...formData, haemoglobinCount: parseInt(e.target.value) })
                    }
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </button>
        </form>
        </div>
    );
}

export default PatientForm;
