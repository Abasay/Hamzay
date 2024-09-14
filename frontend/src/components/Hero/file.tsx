"use client";
import { useState } from "react";
import axios from "axios";

const UploadProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // Make sure the key matches the server-side handler

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzk1ZjJmZjAxZDFiZDg5MjlkNjA3ZCIsImlhdCI6MTcyNDUxOTY1MSwiZXhwIjoxNzI0NjA2MDUxfQ.vTtYTPfQ1pK0jI9_REwPriE8X1KZ0ZxhN9lKxbSZ9Ew"; // Replace with your actual token retrieval logic

      const response = await axios.put(
        "https://api-auth.katabenterprises.com/api/dashboard/rider/upload-profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authorization
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        setMessage("Profile image uploaded successfully!");
      } else {
        setMessage("Failed to upload profile image.");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setMessage("An error occurred while uploading the profile image.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadProfileImage;
