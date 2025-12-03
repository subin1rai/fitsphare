import React, { useState } from "react";
import axiosInstance from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Detail = () => {
    const router = useNavigate();
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [profile, setProfile] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("weight", weight);
    formData.append("height_ft", heightFt);
    formData.append("height_in", heightIn);
    formData.append("birthday", birthday);
    if (profile) formData.append("photo", profile); // <-- important

    const res = await axiosInstance.put("/auth/personalize", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Updated:", res.data);
    toast.success("Profile updated successfully");
      router("/dashboard"); // navigate after login

  } catch (error) {
    console.error(error);
    alert("Error updating profile");
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md rounded-lg bg-card text-card-foreground shadow-xl">

        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <h3 className="text-2xl font-bold">Personalize Your Profile</h3>
          <p className="text-sm text-muted-foreground">
            Add your details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 pt-0 space-y-4">
<div className="space-y-2">
  <label className="text-sm font-medium">Upload Profile Photo</label>

  {/* Preview Circle (Clickable) */}
  <div
    className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#daff0d] flex items-center justify-center bg-gray-100 cursor-pointer mx-auto"
    onClick={() => document.getElementById("profileInput").click()}
  >
    {profilePreview ? (
      <img
        src={profilePreview}
        alt="Profile Preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-gray-400 text-xs text-center">Click to upload</span>
    )}
  </div>

  {/* Hidden File Input */}
  <input
    id="profileInput"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setProfile(file); // for backend upload
        setProfilePreview(URL.createObjectURL(file)); // for preview
      }
    }}
  />
</div>




            {/* GENDER */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <select
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#daff0d]"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* WEIGHT */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (kg)</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#daff0d]"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

    

            {/* HEIGHT */}
            <div className="flex gap-3">
              <div className="space-y-2 w-1/2">
                <label className="text-sm font-medium">Height (ft)</label>
                <input
                  type="number"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#daff0d]"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                />
              </div>

              <div className="space-y-2 w-1/2">
                <label className="text-sm font-medium">Height (in)</label>
                <input
                  type="number"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#daff0d]"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                />
              </div>
            </div>

            {/* BIRTHDAY */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Birthday</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#daff0d]"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col p-6 pt-0 space-y-4">
            <button
              type="submit"
              className="w-full bg-[#daff0d] text-black py-2 rounded-md hover:opacity-90 font-semibold"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Detail;
