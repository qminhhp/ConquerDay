import DashboardNavbar from "@/components/dashboard-navbar";
import Sidebar from "@/components/dashboard/sidebar";
import TaskInput from "@/components/dashboard/task-input";
import TaskList from "@/components/dashboard/task-list";
import FocusModeButton from "@/components/dashboard/focus-mode-button";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch tasks from Supabase
  const { data: tasks } = await supabase
    .from("tasks")
    .select(
      `
      id,
      title,
      description,
      completed,
      due_date,
      project,
      priority
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch tags for each task
  const { data: taskTags } = await supabase.from("task_tags").select(`
      task_id,
      tags:tag_id(id, name, color)
    `);

  // Process tasks with their tags
  const processedTasks =
    tasks?.map((task) => {
      const tags =
        taskTags
          ?.filter((tt) => tt.task_id === task.id)
          .map((tt) => tt.tags)
          .filter(Boolean) || [];

      return {
        ...task,
        tags,
        dueDate: task.due_date,
      };
    }) || [];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Today's Tasks</h1>
              <FocusModeButton onEnterFocusMode={() => {}} />
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-6">
                <TaskInput
                  onAddTask={() => {}}
                  placeholder="What do you need to do today?"
                />
              </div>

              <TaskList
                tasks={processedTasks}
                onToggleComplete={() => {}}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
