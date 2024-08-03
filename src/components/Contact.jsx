'use client'
import { useState } from "react"
import { CONTACT } from "../constants"
import { Toaster, toast } from "react-hot-toast"
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    else if (!formData.email) errors.email = 'Email is required';
    else if(!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    else if (!formData.message) errors.message = 'Message is required';
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
    } else {
      setErrors({})
      setIsSending(true)

      emailjs.send(
        'anastasiia',
        'template_16oh63n',
        formData,
        'wVGeZN02Ec9zamWMp'
      ).then(res => {
        console.log('SUCCESS', res.status, res.text);
        toast.success('Message send successfully');
        setFormData({name: '', email: '', message: ''});
      }).catch(error => {
        console.log('FAILED...', error);
        toast.error('Failed to send message. Please try again later');
      }).finally(() => setIsSending(false))
    }
  }

  return (
    <section className="container mx-auto py-16" id="contact">
        <h2 className="mb-8 text-center text-3xl lg:text-4xl">Contact Us</h2>
        <div className="text-neutral-400">
            {CONTACT.map(detail => (
                <p key={detail.key} className="my-20 border-b-2 border-dotted border-neutral-700 pb-12 text-center text-2xl tracking-tighter lg:text-3xl">
                    {detail.value}
                </p>
            ))}
        </div>
        <div className="mx-auto max-w-xl p-4">
          <Toaster/>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input 
                type="text" 
                id="name" 
                name='name' 
                value={formData.name} 
                placeholder="Name" 
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-slate-800 bg-transparent px-3 py-2 text-lg focus:border-gray-400 focus:outline-none"/>
              {errors.name && (
                <p className="text-sm text-pink-700">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <input 
                type="text" 
                id="email" 
                name='email' 
                value={formData.email} 
                placeholder="Email" 
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-slate-800 bg-transparent px-3 py-2 text-lg focus:border-gray-400 focus:outline-none"/>
              {errors.email && (
                <p className="text-sm text-pink-700">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <textarea 
                id="message" 
                name='message' 
                value={formData.message} 
                placeholder="Message" 
                onChange={handleChange}
                rows={4}
                className="w-full appearance-none rounded-lg border border-slate-800 bg-transparent px-3 py-2 text-lg focus:border-gray-400 focus:outline-none"/>
              {errors.message && (
                <p className="text-sm text-pink-700">{errors.message}</p>
              )}
            </div>
            <button className={`w-full rounded bg-gray-300 px-4 py-2 text-lg font-semibold text-slate-950 hover:text-teal-800 ${isSending ? 'cursor-not-allowed opacity-50' : ''} `} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
    </section>
  )
}

export default Contact