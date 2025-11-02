import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from "emailjs-com";
import { 
  
  Send,
  
} from 'lucide-react';

 const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().min(10, 'Message should be at least 10 characters').required('Message is required'),
  });
export default function ContactFrom() {
    const handleFormSubmit = (values: any, { resetForm }: any) => {
        console.log('Submitted:', values);
         emailjs
            .send(
                "service_x2kdf9f", // ✅ Replace with your EmailJS service ID
                "template_vthksuk", // ✅ Replace with your EmailJS template ID
                {
                name: values.name,
                email: values.email,
                subject: values.subject,
                message: values.message,
                },
                "hPq4qnVBq05HnuijY" // ✅ Replace with your EmailJS public key
            )
            .then(
                (result) => {
                    console.log("Email sent:", result.text);
                    alert("✅ Thanks for reaching out! I’ll get back to you soon.");
                    resetForm();
                },
                (error) => {
                    console.error("Email send error:", error.text);
                    alert("❌ Oops! Something went wrong. Please try again later.");
                }
            );
        // alert('Thanks for reaching out! I will get back to you soon.');
        // resetForm();
    };
  return (
     <Formik
        initialValues={{ name: '', email: '', subject: '', message: '' }}
        validationSchema={contactSchema}
        onSubmit={handleFormSubmit}
        >
        {() => (
            <Form className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <div>
                <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                <Field
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
                <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                <Field
                type="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
                <label htmlFor="subject" className="block font-medium text-gray-700">Subject</label>
                <Field
                type="text"
                name="subject"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="subject" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
                <label htmlFor="message" className="block font-medium text-gray-700">Message</label>
                <Field
                as="textarea"
                name="message"
                rows={5}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="message" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
                <Send size={20} />
                Send Message
            </button>
            </Form>
        )}
        </Formik>
  )
}
