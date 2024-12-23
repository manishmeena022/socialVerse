export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md max-h-md px-4 py-8 bg-white shadow-lg sm:rounded-lg">
      <div className="flex flex-col items-center justify-center w-full mb-4">
        <h1 className="text-3xl font-bold">Signup</h1>
        <p className="text-gray-500">Create an account</p>
      </div>
      <div className="mt-4">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}