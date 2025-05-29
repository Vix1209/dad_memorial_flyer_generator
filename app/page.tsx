"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, Heart } from "lucide-react";
import html2canvas from "html2canvas";
import Image from "next/image";

interface MemorialData {
  fullName: string;
  title: string;
  birthDate: string;
  deathDate: string;
  birthPlace: string;
  quote: string;
  lifeHighlights: string;
  funeralDate: string;
  funeralTime: string;
  funeralLocation: string;
  funeralAddress: string;
  familyMessage: string;
  survivedBy: string;
  photo: string;
}

export default function ElegantMemorialFlyer() {
  const [memorialData, setMemorialData] = useState<MemorialData>({
    fullName: "Ogbonnaya Ofor",
    title: "Beloved Father, Professor & Community Leader",
    birthDate: "January 8, 1941",
    deathDate: "April 31, 2025",
    birthPlace: "",
    quote:
      "A life well lived is a precious gift, of hope and strength and grace, from someone who has made our world a brighter, better place.",
    lifeHighlights:
      "A devoted father, accomplished professor, and pillar of his community. He touched countless lives with his wisdom, kindness, and unwavering dedication to family and service.",
    funeralDate: "August 28, 2025",
    funeralTime: "10:00 AM",
    funeralLocation: "",
    funeralAddress: "",
    familyMessage:
      "Though we are deeply saddened by our loss, we celebrate a life beautifully lived and a legacy that will forever remain in our hearts.",
    survivedBy: "His loving children, grandchildren, and extended family",
    photo: "/image/Daddy.jpg",
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof MemorialData, value: string) => {
    setMemorialData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMemorialData((prev) => ({
          ...prev,
          photo: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      // Get the content directly from the card reference
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: "#1e293b",
        windowWidth: 1200,
        windowHeight: 1600,
      });

      const link = document.createElement("a");
      link.download = `memorial-${memorialData.fullName
        .replace(/\s+/g, "-")
        .toLowerCase()}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Memorial Flyer Creator
          </h1>
          <p className="text-slate-600">
            Create a beautiful tribute to honor your loved one
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-slate-700 font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={memorialData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="mt-1"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <Label htmlFor="title" className="text-slate-700 font-medium">
                    Title/Description
                  </Label>
                  <Input
                    id="title"
                    value={memorialData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., Beloved Father, Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="birthDate"
                      className="text-slate-700 font-medium"
                    >
                      Birth Date
                    </Label>
                    <Input
                      id="birthDate"
                      value={memorialData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="deathDate"
                      className="text-slate-700 font-medium"
                    >
                      Passing Date
                    </Label>
                    <Input
                      id="deathDate"
                      value={memorialData.deathDate}
                      onChange={(e) =>
                        handleInputChange("deathDate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="birthPlace"
                    className="text-slate-700 font-medium"
                  >
                    Birth Place
                  </Label>
                  <Input
                    id="birthPlace"
                    value={memorialData.birthPlace}
                    onChange={(e) =>
                      handleInputChange("birthPlace", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="photo" className="text-slate-700 font-medium">
                    Upload Photo
                  </Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <CardTitle>Life & Legacy</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="quote" className="text-slate-700 font-medium">
                    Memorial Quote
                  </Label>
                  <Textarea
                    id="quote"
                    value={memorialData.quote}
                    onChange={(e) => handleInputChange("quote", e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="lifeHighlights"
                    className="text-slate-700 font-medium"
                  >
                    Life Highlights
                  </Label>
                  <Textarea
                    id="lifeHighlights"
                    value={memorialData.lifeHighlights}
                    onChange={(e) =>
                      handleInputChange("lifeHighlights", e.target.value)
                    }
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="survivedBy"
                    className="text-slate-700 font-medium"
                  >
                    Survived By
                  </Label>
                  <Input
                    id="survivedBy"
                    value={memorialData.survivedBy}
                    onChange={(e) =>
                      handleInputChange("survivedBy", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="funeralDate"
                      className="text-slate-700 font-medium"
                    >
                      Service Date
                    </Label>
                    <Input
                      id="funeralDate"
                      value={memorialData.funeralDate}
                      onChange={(e) =>
                        handleInputChange("funeralDate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="funeralTime"
                      className="text-slate-700 font-medium"
                    >
                      Service Time
                    </Label>
                    <Input
                      id="funeralTime"
                      value={memorialData.funeralTime}
                      onChange={(e) =>
                        handleInputChange("funeralTime", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="funeralLocation"
                    className="text-slate-700 font-medium"
                  >
                    Service Location
                  </Label>
                  <Input
                    id="funeralLocation"
                    value={memorialData.funeralLocation}
                    onChange={(e) =>
                      handleInputChange("funeralLocation", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="funeralAddress"
                    className="text-slate-700 font-medium"
                  >
                    Address
                  </Label>
                  <Input
                    id="funeralAddress"
                    value={memorialData.funeralAddress}
                    onChange={(e) =>
                      handleInputChange("funeralAddress", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="familyMessage"
                    className="text-slate-700 font-medium"
                  >
                    Family Message
                  </Label>
                  <Textarea
                    id="familyMessage"
                    value={memorialData.familyMessage}
                    onChange={(e) =>
                      handleInputChange("familyMessage", e.target.value)
                    }
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-800">Preview</h2>
              <Button
                onClick={downloadCard}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800"
              >
                <Download className="h-4 w-4" />
                Download JPG
              </Button>
            </div>

            {/* Memorial Flyer */}
            <div className="flex justify-center">
              <div
                ref={cardRef}
                className="w-full relative shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  height: "1200px", // Fixed height to ensure content is properly spaced
                }}
              >
                {/* Elegant border overlay */}
                <div className="absolute inset-4 border-2 border-amber-300/30 rounded-lg"></div>
                <div className="absolute inset-6 border border-amber-200/20 rounded-lg"></div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                      backgroundSize: "50px 50px",
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  {/* Top Section */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center">
                      <div className="inline-block px-6 py-2 bg-amber-300/10 rounded-full border border-amber-300/30 mb-4">
                        <p className="text-amber-200 text-sm font-medium tracking-wider uppercase">
                          In Loving Memory
                        </p>
                      </div>
                      <h1 className="text-white text-3xl font-bold mb-2 tracking-wide">
                        {memorialData.fullName}
                      </h1>
                      <p className="text-amber-200 text-lg italic">
                        {memorialData.title}
                      </p>
                    </div>

                    {/* Photo Section */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-300/50 shadow-2xl">
                          {memorialData.photo ? (
                            <img
                              src={memorialData.photo || "/placeholder.svg"}
                              alt="Memorial photo"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                              <Upload className="h-12 w-12 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center">
                          <Heart className="h-4 w-4 text-slate-800" />
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
                        <span className="text-white font-semibold">
                          {memorialData.birthDate}
                        </span>
                        <div className="w-8 h-px bg-amber-300"></div>
                        <span className="text-white font-semibold">
                          {memorialData.deathDate}
                        </span>
                      </div>
                      <p className="text-amber-200 text-sm mt-2">
                        {memorialData.birthPlace}
                      </p>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {/* Quote */}
                    <div className="text-center px-4">
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 text-4xl text-amber-300/30 font-serif">
                          &apos;
                        </div>
                        <p className="text-white/90 text-base italic leading-relaxed px-6">
                          {memorialData.quote}
                        </p>
                        <div className="absolute -bottom-2 -right-2 text-4xl text-amber-300/30 font-serif">
                          &apos;
                        </div>
                      </div>
                    </div>

                    {/* Life Highlights */}
                    <div className="px-2">
                      <p className="text-white/80 text-sm leading-relaxed text-center">
                        {memorialData.lifeHighlights}
                      </p>
                    </div>

                    {/* Service Information */}
                    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <h3 className="text-amber-300 text-sm font-semibold mb-2 text-center">
                        Memorial Service
                      </h3>
                      <div className="text-center space-y-1">
                        <p className="text-white text-sm font-medium">
                          {memorialData.funeralDate} at{" "}
                          {memorialData.funeralTime}
                        </p>
                        <p className="text-white/80 text-sm">
                          {memorialData.funeralLocation}
                        </p>
                        <p className="text-white/70 text-sm">
                          {memorialData.funeralAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-4">
                    {/* Family Message */}
                    <div>
                      <p className="text-white/70 text-sm italic text-center leading-relaxed mb-4">
                        {memorialData.familyMessage}
                      </p>
                      <p className="text-amber-200 text-sm text-center">
                        Survived by: {memorialData.survivedBy}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-amber-300/20">
                      <p className="text-amber-300 text-xs font-medium tracking-widest uppercase">
                        Forever in Our Hearts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
