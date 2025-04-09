import { useQuery } from "@tanstack/react-query";
import { getTaskByIdQueryFn } from "@/lib/api";
import { TaskByIdPayloadType } from "@/types/api.type";

const useGetTaskById = ({
  workspaceId,
  projectId,
  taskId,
}: TaskByIdPayloadType) => {
  const query = useQuery({
    queryKey: ["allprojects", workspaceId, projectId, taskId],
    queryFn: () =>
      getTaskByIdQueryFn({
        workspaceId,
        projectId,
        taskId,
      }),
    staleTime: 0,
  });
  return query;
};

export default useGetTaskById;
