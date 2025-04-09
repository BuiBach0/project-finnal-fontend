import { useQuery } from "@tanstack/react-query";
import { getProjectByIdQueryFn} from "@/lib/api";
import { ProjectByIdPayloadType } from "@/types/api.type";

const useGetProjectById = ({
  workspaceId,
  projectId,
 
}: ProjectByIdPayloadType) => {
  const query = useQuery({
    queryKey: ["allprojects", workspaceId, projectId,],
    queryFn: () =>
      getProjectByIdQueryFn ({
        workspaceId,
        projectId,
       
      }),
    staleTime: 0,
  });
  return query;
};

export default useGetProjectById;
