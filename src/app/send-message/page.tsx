"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";

const SENDCHAMP_API_KEY = process.env.NEXT_PUBLIC_SENDCHAMP_API_KEY!;

export default function SendMessagePage() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnnouncement({
      ...announcement,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.sendchamp.com/api/v1/sms/send",
        {
          to: ["+2349030310682", "+2349074919559"],
          message: `${announcement.title}: ${announcement.description}`,
          sender_name: "Sendchamp",
          route: "dnd",
        },
        {
          headers: {
            Authorization: `Bearer ${SENDCHAMP_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <h1 className="mb-9 text-3xl text-black">Send Announcement</h1>
        <form onSubmit={handleSubmit} className="w-[500px]">
          <div className="mb-9 text-black flex flex-col">
            <label htmlFor="title">Announcement Title</label>
            <input
              className="rounded-md h-9 outline-none p-3"
              type="text"
              id="title"
              name="title"
              value={announcement.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-9 text-black flex flex-col">
            <label htmlFor="description">Announcement Description</label>
            <textarea
              className="rounded-md p-3 outline-none h-[200px] resize-none"
              id="description"
              name="description"
              placeholder="Enter a message"
              value={announcement.description}
              // onChange={handleInputChange}
              required
            />
          </div>
          <button className="bg-indigo-500 p-2 text-white mt-5" type="submit">Send Message</button>
        </form>
      </div>
    </DefaultLayout>
  );
}
