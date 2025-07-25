'use client';

import React, { useState } from 'react';


type Course = {
    
    title: string;
    description: string;

};

export default function CourseForm() {
    const [form, setForm] = useState<Omit<Course, 'createdAt'>>({
  
        title: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const course: Course = {
            ...form,
          
        };

        try {
            const response = await fetch('/api/course', {
                method: 'POST',
               
                body: JSON.stringify(course),
            });

            if (!response.ok) {
                throw new Error('Failed to create course');
            }

            const data = await response.json();
            console.log('Course created:', data);
            // Optionally, reset the form or redirect
            setForm({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating course:', error);
        }
        
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label className="block mb-1">ID</label>
               
            </div>
            <div>
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}