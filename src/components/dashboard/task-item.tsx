"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  tags?: Tag[];
  dueDate?: string;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function TaskItem({
  id,
  title,
  completed,
  tags = [],
  dueDate,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-3 rounded-md border ${completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"} flex items-center justify-between group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={completed}
          onCheckedChange={(checked) =>
            onToggleComplete(id, checked as boolean)
          }
          className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
        />
        <div className="flex flex-col min-w-0">
          <span
            className={`text-sm ${completed ? "line-through text-gray-500" : "text-gray-800"} truncate`}
          >
            {title}
          </span>
          {(tags.length > 0 || dueDate) && (
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {dueDate && (
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                  {new Date(dueDate).toLocaleDateString()}
                </span>
              )}
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full"
                  style={
                    tag.color
                      ? { backgroundColor: `${tag.color}20`, color: tag.color }
                      : {}
                  }
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex gap-1 ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(id)}
          className="h-8 w-8 text-gray-500 hover:text-blue-600"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="h-8 w-8 text-gray-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
