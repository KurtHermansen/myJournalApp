// dashboard.tsx
import React, { useState, useEffect } from "react";
const jwt_decode = require("jwt-decode");
import NewNotebookModal from "../components/NewNotebookModal";
import NotebookCard from "../components/NotebookCard";

interface Notebook {
	id: number;
	title: string;
	description: string;
}

const DashboardPage = () => {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [userName, setUserName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [notebooks, setNotebooks] = useState<Notebook[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const decoded = jwt_decode(token);
				if (decoded && decoded.username) {
					setUserName(decoded.username);
					fetchNotebooks(token);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, []);

	const fetchNotebooks = async (token: string) => {
        console.log("Token:", token);
		try {
			const response = await fetch("/api/getNotebook", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
            console.log("Response Status:", response.status);
			if (!response.ok) {
				console.error(
					"Failed to fetch notebooks, Status:",
					response.status

				);
				return;
			}

			const data = await response.json();
            console.log("Fetched Data:", data);
			console.log("Fetched notebooks:", data); // Log the fetched data
			setNotebooks(data);
		} catch (error) {
			console.error("Error fetching notebooks:", error);
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
				<header className="bg-primary-400 text-white p-4 font-serif text-3xl">
					My Journal - Welcome, {userName}
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
						{notebooks.length === 0 ? (
							<p>No notebooks found.</p>
						) : (
							notebooks.map((notebook) => {
								console.log("Rendering notebook:", notebook); // Log each notebook being rendered
								return (
									<NotebookCard
										key={notebook.id}
										title={notebook.title}
										description={notebook.description}
										onNewEntry={() =>
											handleNewEntry(notebook.id)
										}
									/>
								);
							})
						)}
					</div>
					<NewNotebookModal
						isOpen={isModalOpen}
						onClose={handleModalClose}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
