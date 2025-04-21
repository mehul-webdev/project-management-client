import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProjectForm from "./ProjectForm";

const CreateProject = () => {
  const FormSchema = z.object({
    projectName: z.string().min(2, {
      message: "Project name should be atleast 2 characters",
    }),
    projectDescription: z
      .string()
      .min(2, {
        message: "Project Description should be atleast 2 characters",
      })
      .max(1000, {
        message: "Project Description should be less than 1000 characters",
      }),
    projectStartDate: z.date({ message: "Please select project start date" }),
    projectEndDate: z.date({ message: "Please select project end date" }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
    },
  });

  const onSubmit = (values) => {
    console.log("the values are", values);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl">Create Project</h2>
      </CardHeader>
      <CardContent>
        <ProjectForm form={form} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default CreateProject;
