import { sign_in } from "@/constant/constant";
import { useState } from "react"
import Swal from "sweetalert2";

const SignIn = () => {
  const [error, setError] = useState<any>({
    username: false,
    password: false
  })
  const [formInput, setFormInput] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormInput({ ...formInput, [name]: inputValue });
    setError({
      [name]: !value,
    })
  };

  const onSubmit = (e: any) => {
    e.preventDefault()
    setError({
      username: !formInput.username,
      password: !formInput.password
    })
    if ((formInput.username === sign_in.username) && (formInput.password === sign_in.password)) {
      Swal.fire({
        icon: "success",
        title: "Contract",
        text: "Welcome to administrator",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('admin', '1')
          window.location.reload()
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not admin!!!",
      })
    }
  }
  return (
    <div className="min-h-[72vh] flex items-center justify-center">
      {!localStorage.getItem('admin') ? (
        <form className="w-full max-w-xs" onSubmit={onSubmit}>
          <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className={`shadow appearance-none ${error.username ? `border border-red-500` : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={formInput.username}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className={`shadow appearance-none ${error.password ? `border border-red-500` : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
                placeholder="******************"
                name="password"
                onChange={handleChange}
                value={formInput.password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                {/* Forgot Password? */}
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs">&copy;2023 Maom Khmer Cuisine</p>
        </form>
      ) : (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
          <p className="text-lg font-semibold">Congratulations</p>
          <p>You are admin. can you Create, Edit and Delete items in this website!</p>
        </div>
      )}
    </div>
  )
}

export default SignIn