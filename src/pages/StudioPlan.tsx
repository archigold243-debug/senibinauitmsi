import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const StudioPlan = () => {
  const [image, setImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top bar with back button */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="text-xl font-light">Upload Studio Plan</h1>
        <div />
      </div>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto">
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">
            Choose an image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-primary file:text-white hover:file:bg-primary/90"
          />
        </label>

        {/* Preview Area */}
        <div className="border rounded-lg bg-white shadow p-4">
          {image ? (
            <img
              src={image}
              alt="Uploaded Plan"
              className="max-w-full h-auto mx-auto rounded"
            />
          ) : (
            <p className="text-gray-500 text-center py-10">
              No image uploaded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioPlan;
