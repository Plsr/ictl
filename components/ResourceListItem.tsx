import { Database } from "@/types/supabase";
import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ResourceConsumedButton } from "./ResourceConsumedButton";

type Resource = Database["public"]["Tables"]["resource"]["Row"];

type Props = {
  resource: Resource;
};

export const ResourceListItem = ({ resource }: Props) => {
  return (
    <div className="py-4">
      <div>
        <p className="text-slate-500">
          {format(resource.created_at, "do MMM, yyyy")} -{" "}
          {resource.consume_time_seconds
            ? resource.consume_time_seconds / 60.0
            : ""}
          min
        </p>
        <div className="flex gap-4">
          <a className="text-lg font-bold" target="_blank" href={resource.link}>
            {resource.title}
          </a>
          {/* TODO: Different color based on resource type (own component) */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 rounded-lg border border-slate-600">
            <ResourceIcon resourceType={resource.type} />
            {resource.type}
          </div>
        </div>
      </div>
      {resource.notes && (
        <div className="mt-2">
          <span className="uppercase font-bold text-sm text-neutral-400">
            Notes
          </span>
          <p>{resource.notes}</p>
        </div>
      )}
      <div className="flex gap-3 mt-4">
        <ResourceConsumedButton resourceId={resource.id} />{" "}
        <span className="text-neutral-700">/</span>
        <span className="flex flex-row items-center gap-1 text-blue-500">
          <PencilIcon className="w-4 h-4" />
          Edit
        </span>
        <span className="text-neutral-700">/</span>
        <span className="flex flex-row items-center gap-1  text-rose-500">
          <TrashIcon className="w-4 h-4" /> Delete
        </span>
      </div>
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
