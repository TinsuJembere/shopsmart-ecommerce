import React, { useState, useEffect } from "react";
import { PencilLine, Bell, Settings, User, LogOut } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex items-center justify-between p-4 absolute top-[50px] left-[50px]">
      <Link to="/">
        <svg
          className="w-6 h-6 text-white cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
    </div>
  );
}

function ProfilePage() {
  const [activeView, setActiveView] = useState(null);
  const [notification, setNotification] = useState("Allow");
  const [showSettings, setShowSettings] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        if (res.data.avatar) {
          setAvatar(res.data.avatar);
        }
        console.log("Fetched user:", res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        const formData = new FormData();
        formData.append("avatar", file);
        const token = localStorage.getItem("token");
        axios
          .post("https://shopsmart-ecommerce.onrender.com/api/users/upload-avatar", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setUser(res.data.user);
          })
          .catch((err) => console.error("Avatar upload error:", err));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = user._id
      await axios.put(
        `https://shopsmart-ecommerce.onrender.com/api/users/${id}`,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-[url('src/assets/images/registerbg.jpg')] flex flex-col items-center justify-center px-4 py-8 md:flex-row md:gap-10">
      <Header />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xs p-4">
        <div className="flex items-center space-x-4 p-2">
          <div className="relative">
            <img
              src={avatar || "src/assets/images/avatar.avif"}
              alt="Avatar"
              className="w-14 h-14 rounded-full object-cover"
            />
            <label
              htmlFor="avatarInput"
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer"
              title="Change Avatar"
            >
              <PencilLine className="w-4 h-4 text-gray-500" />
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <div className="font-semibold text-sm">{user?.name || "Your name"}</div>
            <div className="text-gray-400 text-xs">{user?.email || "email@example.com"}</div>
          </div>
        </div>
        <hr className="my-4" />

        <div
          className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 rounded cursor-pointer"
          onClick={() => setActiveView("profile")}
        >
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </div>
          <span>{">"}</span>
        </div>

        <div
          className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 rounded cursor-pointer"
          onClick={() => setShowSettings(true)}
        >
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </div>
          <span>{">"}</span>
        </div>

        <div className="relative">
          <div
            className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => setNotification((prev) => (prev === "Allow" ? "Mute" : "Allow"))}
          >
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notification</span>
            </div>
            <span>{notification}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 rounded cursor-pointer">
          <button onClick={handleLogout} className="flex items-center space-x-2">
            <Link to="/login" className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </Link>
          </button>
        </div>
      </div>

      {activeView === "profile" && user && (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg mt-8 md:mt-0 p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img src={avatar} className="w-14 h-14 rounded-full object-cover" alt="Avatar" />
              <div>
              <div className="font-semibold text-sm">{user?.name}</div>
              </div>
            </div>
            <button onClick={() => setActiveView(null)} className="text-gray-400 font-bold">
              ✕
            </button>
          </div>
          <hr />
          <div className="mt-4 space-y-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Name</span>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="text-gray-500 border-b border-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <span>Email</span>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="text-gray-500 border-b border-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <span>Phone</span>
              <input
                type="tel"
                value={user.phone || ""}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="text-gray-500 border-b border-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <input
                type="text"
                value={user.location || ""}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                className="text-gray-500 border-b border-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      )}

      {showSettings && (
        <div className="absolute top-10 right-10 w-64 bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Settings</span>
            <button onClick={() => setShowSettings(false)}>✕</button>
          </div>
          <div className="text-sm space-y-4">
            <div className="flex justify-between">
              <span>Theme</span>
              <span className="text-gray-500">Light</span>
            </div>
            <div className="flex justify-between">
              <span>Language</span>
              <span className="text-gray-500">Eng</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
