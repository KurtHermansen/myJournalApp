import React, { useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

        try {
            const response = await fetch("/api/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, email, password }),
            });
        
            const data = await response.json();
        
            if (response.ok && data.token) {
              localStorage.setItem('token', data.token);
              router.push("/dashboard"); // Adjust the redirect route as needed
            } else {
              // Optionally, update UI to show error message to user
              console.error(data.message || 'Signup failed');
            }
          } catch (error) {
            console.error("An error occurred:", error);
            // Optionally, update UI to show network error message to user
          }
        };

	return (
		<div className="bg-primary-100 min-h-screen flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 max-w-md mx-auto">
				<h1 className="text-primary-500 text-3xl font-serif mb-4">
					My Journal
				</h1>
				<p className="text-primary-300 mb-6">
					Your personal space to capture thoughts, ideas, and
					memories.
				</p>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center"
				>
					<div className="w-full mb-4">
						<label
							htmlFor="username"
							className="text-primary-300 block mb-2"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							className="w-full px-3 py-2 border border-primary-300 rounded-lg"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="w-full mb-4">
						<label
							htmlFor="email"
							className="text-primary-300 block mb-2"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							className="w-full px-3 py-2 border border-primary-300 rounded-lg"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="w-full mb-6">
						<label
							htmlFor="password"
							className="text-primary-300 block mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full px-3 py-2 border border-primary-300 rounded-lg"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors"
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
};

export default HomePage;
