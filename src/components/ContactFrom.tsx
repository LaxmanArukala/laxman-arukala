import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from "emailjs-com";
import { ArrowUpRight } from 'lucide-react';

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().min(10, 'Message should be at least 10 characters').required('Message is required'),
});

interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const fieldClass =
  "peer mt-2 block w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-lg text-white placeholder-white/25 transition-colors focus:border-accent focus:outline-none focus:ring-0";

export default function ContactFrom() {
  const handleFormSubmit = (
    values: ContactValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (b: boolean) => void },
  ) => {
    emailjs
      .send(
        "service_x2kdf9f", // EmailJS service ID
        "template_vthksuk", // EmailJS template ID
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
        "hPq4qnVBq05HnuijY" // EmailJS public key
      )
      .then(
        () => {
          alert("✅ Thanks for reaching out! I’ll get back to you soon.");
          resetForm();
        },
        (error) => {
          console.error("Email send error:", error.text);
          alert("❌ Oops! Something went wrong. Please try again later.");
        }
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', subject: '', message: '' }}
      validationSchema={contactSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-8" noValidate>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="eyebrow">Name</label>
              <Field id="name" type="text" name="name" autoComplete="name" placeholder="Your name" className={fieldClass} />
              <ErrorMessage name="name" component="div" className="mt-2 text-sm text-red-400" />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow">Email</label>
              <Field id="email" type="email" name="email" autoComplete="email" placeholder="you@company.com" className={fieldClass} />
              <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-400" />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="eyebrow">Subject</label>
            <Field id="subject" type="text" name="subject" placeholder="What are we building?" className={fieldClass} />
            <ErrorMessage name="subject" component="div" className="mt-2 text-sm text-red-400" />
          </div>

          <div>
            <label htmlFor="message" className="eyebrow">Message</label>
            <Field
              id="message"
              as="textarea"
              name="message"
              rows={4}
              placeholder="Tell me about the project"
              className={`${fieldClass} resize-none`}
            />
            <ErrorMessage name="message" component="div" className="mt-2 text-sm text-red-400" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition-colors hover:border-accent hover:bg-accent disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Send Message"}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </Form>
      )}
    </Formik>
  );
}
