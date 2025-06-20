import React from 'react'
interface InputBoxProps {
    label: string;
    type: string;
    placeholder: string;
    id: string;
    onChange?: any; // You can specify a more specific type if needed
    value?: string; 
    }

export default function InputBox({ label, type, placeholder, id ,onChange,value}: InputBoxProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
      <input type={type} id={id} value={value}  onChange={
onChange
      } className="border border-gray-400 outline-0  focus:ring-1 focus:ring-blue-600 dark:border-gray-700 rounded-lg w-full p-2" />
    </div>
  )
}
