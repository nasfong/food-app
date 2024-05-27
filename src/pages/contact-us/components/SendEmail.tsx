import { useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import { CircularProgress } from "@mui/material";

const SendEmail = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    emailjs
      .sendForm('service_6jqrb75', 'template_wpky89l', form.current, {
        publicKey: 'aRRyJxsQvrnBObs2T',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          (form.current as any)?.reset();
          setOpen(true)
          setMessage('Email sent successfully!')
        },
        (error) => {
          console.log('FAILED...', error.text);
          setMessage(error.text)
        },
      )
      .finally(() => setLoading(false))
  };
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className='form-to'>Send us a message</div>
        <div className='title'>CONTACT FORM</div>
      </div>
      {open && (
        <div className="bg-teal-100 border-t-4 border-teal-500 text-teal-900 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">{message}</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setOpen(false)}>
            <svg className="fill-current h-6 w-6 text-teal-900" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      )}
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={sendEmail} ref={form}>
        <div className="flex space-x-3 mb-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name *</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="user_name"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email *</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="user_email"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            name='message'
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            className="bg-black hover:bg-[--color] text-white py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            <div className="flex items-center space-x-2">
              <span>
                Send Email
              </span>
              {loading && (
                <CircularProgress size="1rem" color='inherit' />
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendEmail
