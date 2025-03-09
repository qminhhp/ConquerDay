"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TaskInputProps {
  onAddTask: (taskText: string) => void;
  placeholder?: string;
}

export default function TaskInput({
  onAddTask,
  placeholder = "What do you need to do today?",
}: TaskInputProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white border-gray-200 focus-visible:ring-blue-500"
      />
      <Button type="submit" disabled={!taskText.trim()} className="shrink-0">
        <PlusCircle className="h-5 w-5 mr-1" />
        Add
      </Button>
    </form>
  );
}
