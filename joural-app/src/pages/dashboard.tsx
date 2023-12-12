import React, { useState, useEffect } from "react";
import NewNotebookModal from "../components/NewNotebookModal";
import NotebookCard from "../components/NotebookCard";
import { useRouter } from 'next/router';

interface Notebook {
	id: number;
	title: string;
	description: string;
}

const DashboardPage = () => {
	const [userName, setUserName] = useState(""); // Update this based on your app's logic
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const router = useRouter();

	useEffect(() => {
		fetchNotebooks();
		// Retrieve and set the username from session storage
		const storedUsername = sessionStorage.getItem("username");
		if (storedUsername) {
			setUserName(storedUsername);
		}
	}, []);

	const fetchNotebooks = async () => {
		const userId = sessionStorage.getItem("userId");
		console.log("user ID: ", userId);
		if (userId) {
			try {
				const response = await fetch(
					`/api/getNotebooks?userId=${userId}`
				);
				if (response.ok) {
					const notebooksData = await response.json();
					setNotebooks(notebooksData); // Update state with fetched notebooks
				} else {
					console.error("Failed to fetch notebooks");
				}
			} catch (error) {
				console.error("Error fetching notebooks:", error);
			}
		} else {
			console.log("No userId found");
		}
	};

	const handleNewEntry = (notebookId: number) => {
		// Handle the action for a new entry
		console.log("New Entry for Notebook:", notebookId);
	};

	const handleCreateNewBook = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleCreateNotebook = (title: string, description: string) => {
		console.log(
			"Creating new notebook with Title:",
			title,
			"Description:",
			description
		);
		// Here you can add logic to create a new notebook
		setIsModalOpen(false);
	};
	const refreshNotebooks = () => {
		fetchNotebooks();
	};

	const handleLogout = () => {
		// Clear session storage
		sessionStorage.clear();

		// Redirect to login page or home page
		// This depends on how your routing is set up. Adjust as needed.
		window.location.href = "/";
	};

	return (
		<div className="bg-primary-200 min-h-screen flex">
			<div className="w-60 bg-primary-300 p-4">
				<div className="text-white font-serif text-xl mb-6">
					My Journal
				</div>
				<ul className="text-white">
					<li className="mb-4">
						<button
							className="w-full text-left"
							onClick={handleCreateNewBook}
						>
							Create New Book
						</button>
					</li>
				</ul>
			</div>

			<div className="flex-1 bg-primary-100">
				<header className="flex bg-primary-400 text-white p-4 font-serif text-3xl">
					My Journal - Welcome, {userName}
					{/* Logout Button */}
					<button
						onClick={handleLogout}
						className="float-right ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
					>
						Logout
					</button>
				</header>
				<div className="p-6">
					<div className="flex flex-wrap justify-center">
						<div className="p-4 cursor-pointer transform transition duration-300 hover:scale-105">
							<div className="relative w-48 h-64">
								{/* Book Spine */}
								<div className="absolute left-0 top-0 w-3 h-full bg-primary-500"></div>

								{/* Book Cover */}
								<div className="absolute left-3 top-0 w-full h-full bg-white shadow-lg overflow-hidden">
									<div className="h-1/5 bg-primary-300 flex items-center justify-center">
										<p className="text-white text-lg font-bold">
											Title
										</p>
									</div>
									<div className="h-4/5 p-4 bg-primary-200  flex flex-col justify-between">
										<div className="bg-white border border-black rounded-lg text-center h-1/3">
											<p className="text-black text-sm">
												Description
											</p>
										</div>

										<button
											className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors"
											onClick={handleCreateNewBook}
										>
											+ New Notebook
										</button>
									</div>
								</div>
							</div>
						</div>
						{notebooks.map((notebook) => {
                                const handleNotebookClick = () => {
                                  router.push(`/notebook/${notebook.id}`);
                                };
                              
                                return (
                                  <div onClick={handleNotebookClick} key={notebook.id}>
                                    <NotebookCard
                                      title={notebook.title}
                                      description={notebook.description}
                                      onNewEntry={() => handleNewEntry(notebook.id)}
                                    />
                                  </div>
                                )})}
					</div>
					<NewNotebookModal
						isOpen={isModalOpen}
						onClose={handleModalClose}
						onRefresh={refreshNotebooks}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
