"use client";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; 

export default function MatchPage() {
  const [mode, setMode] = useState<"2" | "4">("2");

  return (
    <div className="p-6">
      

      {/* Mode Selector */}
      <Select value={mode} onValueChange={(value: "2" | "4") => setMode(value)}>

        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">2 Players</SelectItem>
          <SelectItem value="4">4 Players</SelectItem>
        </SelectContent>
      </Select>

      {/* Render the correct UI based on mode */}
      {mode === "2" ? <TwoPlayerMatch /> : <FourPlayerMatch />}
    </div>
  );
}

function TwoPlayerMatch() {
  return <div className="mt-4 p-4 border rounded-lg">2 Player Match Content</div>;
}

function FourPlayerMatch() {
  return <div className="mt-4 p-4 border rounded-lg">4 Player Match Content</div>;
}
