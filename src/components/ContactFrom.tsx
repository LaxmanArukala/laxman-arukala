import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from "emailjs-com";

// Set to true to show the contact form again.
const FORM_ENABLED: boolean = false;

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
  "mt-2 block w-full border-0 border-b border-fg/50 bg-transparent px-0 py-2.5 text-fg placeholder-fg/60 focus:border-fg focus:outline-none focus:ring-0";

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

  if (!FORM_ENABLED) {
    return (
      <div role="status">
        <p className="font-display text-lg font-semibold">Contact form temporarily unavailable</p>
        <p className="mt-1 text-sm leading-relaxed">
          Our form service is currently down. Let&apos;s talk on email, mobile or WhatsApp, and I&apos;ll get
          back to you as soon as possible.
        </p>
      </div>
    );
  }

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
              <ErrorMessage name="name" component="div" className="mt-2 text-sm font-medium text-fg" />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow">Email</label>
              <Field id="email" type="email" name="email" autoComplete="email" placeholder="you@company.com" className={fieldClass} />
              <ErrorMessage name="email" component="div" className="mt-2 text-sm font-medium text-fg" />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="eyebrow">Subject</label>
            <Field id="subject" type="text" name="subject" placeholder="What are we building?" className={fieldClass} />
            <ErrorMessage name="subject" component="div" className="mt-2 text-sm font-medium text-fg" />
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
            <ErrorMessage name="message" component="div" className="mt-2 text-sm font-medium text-fg" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-fg px-7 py-3 text-sm font-medium text-surface hover:bg-fg/85 disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
