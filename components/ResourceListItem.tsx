import { Database } from "@/types/supabase";
import { format } from "date-fns";
import { ResourceConsumedButton } from "./ResourceConsumedButton";
import { DocumentTextIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

type Resource = Database["public"]["Tables"]["resource"]["Row"];

type Props = {
  resource: Resource;
};

export const ResourceListItem = ({ resource }: Props) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-2">
        <ResourceIcon resourceType={resource.type} />
        {resource.type}
      </div>
      <p>
        <a target="_blank" href={resource.link}>
          {resource.title}
        </a>
      </p>
      <p>
        {format(resource.created_at, "do MMM, yyyy")} -{" "}
        {resource.consume_time_seconds
          ? resource.consume_time_seconds / 60.0
          : ""}
        min
      </p>
      <p>{resource.notes}</p>
      <ResourceConsumedButton resourceId={resource.id} />
    </div>
  );
};

type ResourceIconProps = {
  resourceType: Resource["type"];
};
const ResourceIcon = ({ resourceType }: ResourceIconProps) => {
  switch (resourceType) {
    case "video":
      return <VideoCameraIcon className="w-4 h-4" />;
    default:
      return <DocumentTextIcon className="w-4 h-4" />;
  }
};
