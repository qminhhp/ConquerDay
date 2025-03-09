"use client";

import { useState } from "react";
import TaskItem from "./task-item";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  tags?: Tag[];
  dueDate?: string;
  project?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  // Get all unique tags from tasks
  const allTags = tasks.reduce<Tag[]>((acc, task) => {
    if (task.tags) {
      task.tags.forEach((tag) => {
        if (!acc.some((t) => t.id === tag.id)) {
          acc.push(tag);
        }
      });
    }
    return acc;
  }, []);

  // Filter tasks by tag if a filter is active
  const filteredIncompleteTasks = activeFilter
    ? incompleteTasks.filter((task) =>
        task.tags?.some((tag) => tag.id === activeFilter),
      )
    : incompleteTasks;

  const filteredCompletedTasks = activeFilter
    ? completedTasks.filter((task) =>
        task.tags?.some((tag) => tag.id === activeFilter),
      )
    : completedTasks;

  return (
    <div className="space-y-4">
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={activeFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="text-xs h-8"
          >
            <Filter className="h-3 w-3 mr-1" />
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag.id}
              variant={activeFilter === tag.id ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setActiveFilter(tag.id === activeFilter ? null : tag.id)
              }
              className="text-xs h-8"
              style={
                tag.color && activeFilter !== tag.id
                  ? { borderColor: tag.color, color: tag.color }
                  : {}
              }
            >
              {tag.name}
            </Button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {filteredIncompleteTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            tags={task.tags}
            dueDate={task.dueDate}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {filteredCompletedTasks.length > 0 && (
        <div className="mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-gray-500 mb-2 w-full justify-between"
          >
            <span>Completed ({filteredCompletedTasks.length})</span>
            {showCompleted ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {showCompleted && (
            <div className="space-y-2 mt-2">
              {filteredCompletedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No tasks yet. Add your first task above!</p>
        </div>
      )}
    </div>
  );
}
