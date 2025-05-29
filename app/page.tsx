/* eslint-disable @next/next/no-img-element */
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
import { Separator } from "@/components/ui/separator";

interface MemorialData {
  fullName: string;
  title: string;
  birthDate: string;
  deathDate: string;
  quote: string;
  lifeHighlights: string;
  funeralDate: string;
  funeralTime: string;
  funeralLocation: string;
  funeralAddress: string;

  sosDate: string;
  sosTime: string;
  sosLocation: string;
  sosAddress: string;

  familyMessage: string;
  survivedBy: string;
  photo: string;
}

export default function ElegantMemorialFlyer() {
  const [memorialData, setMemorialData] = useState<MemorialData>({
    fullName: "Prof. Ogbonnaya Ofor (Dee Nnaa)",
    title: "Beloved Father, Professor & Community Leader",
    birthDate: "January 8, 1939",
    deathDate: "April 30, 2025",
    quote:
      "A life well lived is a precious gift, of hope and strength and grace, from someone who has made our world a brighter, better place.",
    lifeHighlights:
      "A devoted father, accomplished professor, and pillar of his community. He touched countless lives with his wisdom, kindness, and unwavering dedication to family and service.",
    funeralDate: "August 28, 2025",
    funeralTime: "10:00 AM",
    funeralLocation: "Ofor's residence, Bende Town, Bende LGA, Abia state",
    funeralAddress: "",

    sosDate: "August 22, 2025",
    sosTime: "04:00 PM",
    sosLocation: "Redemption Housing Estate, Obinze, Imo State.",
    sosAddress: "",

    familyMessage:
      "Though we are deeply saddened by our loss, we celebrate a life beautifully lived and a legacy that will forever remain in our hearts.",
    survivedBy:
      "His Wife, Children, Grandchildren, Extended Family and a host of Mentees.",
    photo: "/image/Daddy.jpg",
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof MemorialData, value: string) => {
    setMemorialData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAge = (birthDate: string, deathDate: string): number => {
    const birth = new Date(birthDate);
    const death = new Date(deathDate);
    let age = death.getFullYear() - birth.getFullYear();
    const monthDiff = death.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && death.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setMemorialData((prev) => ({
  //         ...prev,
  //         photo: e.target?.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const downloadCard = async () => {
    if (cardRef.current) {
      // Get the content directly from the card reference
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: "#f5f5dc",
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
              <CardHeader className="text-black text-2xl">
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
                {/* <div>
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
                </div> */}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="text-black text-2xl">
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
              <CardHeader className="text-black text-2xl">
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">
                    Funeral Service
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="funeralDate"
                        className="text-slate-700 font-medium"
                      >
                        Date
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
                        Time
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
                      Location
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
                </div>

                <Separator orientation="horizontal" className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">
                    Service of Songs
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="sosDate"
                        className="text-slate-700 font-medium"
                      >
                        Date
                      </Label>
                      <Input
                        id="sosDate"
                        value={memorialData.sosDate}
                        onChange={(e) =>
                          handleInputChange("sosDate", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="sosTime"
                        className="text-slate-700 font-medium"
                      >
                        Time
                      </Label>
                      <Input
                        id="sosTime"
                        value={memorialData.sosTime}
                        onChange={(e) =>
                          handleInputChange("sosTime", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="sosLocation"
                      className="text-slate-700 font-medium"
                    >
                      Location
                    </Label>
                    <Input
                      id="sosLocation"
                      value={memorialData.sosLocation}
                      onChange={(e) =>
                        handleInputChange("sosLocation", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="sosAddress"
                      className="text-slate-700 font-medium"
                    >
                      Address
                    </Label>
                    <Input
                      id="sosAddress"
                      value={memorialData.sosAddress}
                      onChange={(e) =>
                        handleInputChange("sosAddress", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <Separator orientation="horizontal" className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">
                    Family Message
                  </h3>
                  <div>
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
                    "linear-gradient(135deg, #f5f5dc 0%, #f0e6cc 25%, #e6d9b8 50%, #d9cca5 75%, #c9bd91 100%)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  height: "1050px",
                }}
              >
                {/* Elegant border overlay */}
                <div className="absolute inset-4 border-2 border-amber-800/30 rounded-lg"></div>
                <div className="absolute inset-6 border border-amber-700/20 rounded-lg"></div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8B4513 2px, transparent 2px)`,
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
                      <div className="inline-block px-6 py-2 bg-amber-800/10 rounded-full border border-amber-800/30 mb-4">
                        <p className="text-amber-900 text-sm font-medium tracking-wider uppercase">
                          In Loving Memory
                        </p>
                      </div>
                      <h1 className="text-amber-950 text-3xl font-bold mb-2 tracking-wide">
                        {memorialData.fullName}
                      </h1>
                      <p className="text-amber-800 text-lg italic">
                        {memorialData.title}
                      </p>
                    </div>

                    {/* Photo Section */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-full h-48 rounded-2xl overflow-hidden border-4 border-amber-800/50 shadow-2xl">
                          {memorialData.photo ? (
                            <img
                              src={memorialData.photo}
                              alt="Memorial photo"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                              <Upload className="h-12 w-12 text-amber-800" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex flex-col items-center justify-center">
                          <span className="text-slate-800 text-xs mb-4 items-center font-bold italic">
                            {calculateAge(
                              memorialData.birthDate,
                              memorialData.deathDate
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-4 px-6 py-3 bg-amber-800/10 rounded-full backdrop-blur-sm">
                        <span className="text-amber-950 mb-4 font-semibold">
                          {memorialData.birthDate}
                        </span>
                        <div className="w-8 h-px bg-amber-800"></div>
                        <span className="text-amber-950 mb-4 font-semibold">
                          {memorialData.deathDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {/* Quote */}
                    <div className="text-center px-4">
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 text-4xl text-amber-800/30 font-serif">
                          &apos;
                        </div>
                        <p className="text-amber-950/90 text-base text-italic leading-relaxed px-6">
                          {memorialData.quote}
                        </p>
                        <div className="absolute -bottom-2 -right-2 text-4xl text-amber-800/30 font-serif">
                          &apos;
                        </div>
                      </div>
                    </div>

                    {/* Life Highlights */}
                    <div className="px-2">
                      <p className="text-amber-950/80 text-sm leading-relaxed text-center">
                        {memorialData.lifeHighlights}
                      </p>
                    </div>

                    {/* Service Information */}
                    <div className="bg-amber-800/5 rounded-lg p-4 backdrop-blur-sm border border-amber-800/10 flex text-center justify-between">
                      <div className="text-left">
                        <h3 className="text-amber-800 text-sm font-semibold mb-2 text-center">
                          Funeral Service
                        </h3>
                        <div className="text-center space-y-1">
                          <p className="text-amber-950 text-sm font-medium">
                            {memorialData.funeralDate} at{" "}
                            {memorialData.funeralTime}
                          </p>
                          <p className="text-amber-950/80 text-sm">
                            {memorialData.funeralLocation}
                          </p>
                          <p className="text-amber-950/70 text-sm">
                            {memorialData.funeralAddress}
                          </p>
                        </div>
                      </div>
                      <Separator
                        orientation={"vertical"}
                        className="text-center"
                      />
                      <div>
                        <h3 className="text-amber-800 text-sm font-semibold mb-2 text-center">
                          Service of Songs
                        </h3>
                        <div className="text-center space-y-1">
                          <p className="text-amber-950 text-sm font-medium">
                            {memorialData.sosDate} at {memorialData.sosTime}
                          </p>
                          <p className="text-amber-950/80 text-sm">
                            {memorialData.sosLocation}
                          </p>
                          <p className="text-amber-950/70 text-sm">
                            {memorialData.sosAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-4">
                    {/* Family Message */}
                    <div>
                      <p className="text-amber-950/70 text-sm italic text-center leading-relaxed mb-4">
                        {memorialData.familyMessage}
                      </p>
                      <p className="text-amber-800 text-sm text-center">
                        Survived by: {memorialData.survivedBy}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-amber-800/20">
                      <p className="text-amber-800 text-xs font-medium tracking-widest uppercase">
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
