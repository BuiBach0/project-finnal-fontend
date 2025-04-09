import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import EditTaskForm from "./edit-task-form";
// import { useQuery } from "@tanstack/react-query";
// import useWorkspaceId from "@/hooks/use-workspace-id";
// import useProjectId from "@/hooks/use-project-id ";
// import { getTaskByIdQueryFn } from "@/lib/api";
import { TaskType } from '../../../types/api.type';

const EditTaskDialog = (props:{ taskId?: TaskType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const {taskId}= props
  // const validTaskId = typeof taskId === "string" ? taskId : "";
  // const workspaceId = useWorkspaceId();
  // const projectId = useProjectId();
  // const { data } = useQuery({
  //   queryKey: ["singleTask", taskId],
  //   queryFn: () =>
  //     getTaskByIdQueryFn({
  //       workspaceId,
  //       projectId,
  //       taskId: validTaskId,
  //     }),
  //   staleTime: Infinity,
  //   enabled: !!projectId,
    
  // });
 
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger >
          <Button className="bg-transparent border-none shadow-none text-black hover:bg-gray-50 text-start">
             Edit Task 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <EditTaskForm
           task={taskId}
            onClose={onClose} 
           />
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default EditTaskDialog;
