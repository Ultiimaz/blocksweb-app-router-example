"use client";
import ClientComponent from "@/settings/components/client-component";
import { useSuspenseQuery } from "@tanstack/react-query";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Debug = () => {
  const { data: todos } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json() as Promise<Todo[]>;
    },
  });
  return (
    <div>
      <ClientComponent todos={todos} />
    </div>
  );
};

Debug.schema = {
  displayName: "Feature Section",
  options: [
    {
      name: "feature1",
      type: "component",
      label: "Feature 1",
    },
  ],
};

export default Debug;
