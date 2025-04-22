import React from "react";

// Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProjectForm from "./ProjectForm";

const CreateProject = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl">Create Project</h2>
      </CardHeader>
      <CardContent>
        <ProjectForm />
      </CardContent>
    </Card>
  );
};

export default CreateProject;
