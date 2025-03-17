"use client";
import React from "react";
import { Text } from "@/components/text/Text";

export const ExerciseSolutionView = ({
  answer,
  type,
}: {
  answer: string;
  type: "wrong" | "correct" | "solution";
}) => {
  switch (type) {
    case "solution":
      return (
        <div className="max-h-36 overflow-y-auto p-2 w-full flex flex-col bg-bgColor_attention_muted border border-borderColor_attention_emphasis rounded-md">
          <h3 className="text-xl font-semibold text-fgColor_attention">
            Korrekt
          </h3>
          <Text className="text-fgColor_attention">{`Die Antwort lautet: ${answer}`}</Text>
        </div>
      );
    case "wrong":
      return (
        <div className=" max-h-36 overflow-y-auto p-2 w-full flex flex-col bg-bgColor_danger_muted border border-borderColor_danger_emphasis rounded-md">
          <h3 className="text-xl font-semibold text-fgColor_danger">
            Inkorrekt
          </h3>
          <Text className="text-fgColor_danger">{`Die Antwort lautet: ${answer}`}</Text>
        </div>
      );
    case "correct":
      return (
        <div className=" max-h-36 overflow-y-auto p-2 w-full flex flex-col bg-bgColor_success_muted border border-borderColor_success_emphasis rounded-md">
          <h3 className="text-xl font-semibold text-fgColor_success">
            Korrekt
          </h3>
          <Text className="text-fgColor_success">{`Die Antwort lautet: ${answer}`}</Text>
        </div>
      );
  }
};
