import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Components
import DateInput from "@/components/FormInputs/DateInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import MultiSelect from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GetUsers } from "@/api/users";
import { useDispatch } from "react-redux";
import { updateToaster } from "@/store/uiSlice";
import { addNewProject } from "@/api/projects";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getSidebarProjectNames } from "@/store/projects";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  projectDescription: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(1000, {
      message: "Description must be less than 1000 characters",
    }),
  projectStartDate: z.date({
    message: "Date is required.",
  }),
  projectEndDate: z.date({
    message: "Date is required.",
  }),
  projectMembers: z.array(z.string()).min(1, "Please select at least one user"),
});

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
  const [handleMultiSelectOptions, setHandleMultiSelectOptions] = useState([]);
  const [multiSelectInputText, setMultiSelectInputText] = useState("");
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectStartDate: null,
      projectEndDate: null,
      users: [],
    },
  });

  async function onSubmit(values) {
    const result = formSchema.safeParse(values);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      Object.entries(errors).forEach(([key, messages]) => {
        if (messages) {
          form.setError(key, { type: "manual", message: messages[0] });
        }
      });
      return;
    }

    // Form Submit Function
    try {
      setLoadingFormSubmit(true);
      const response = await addNewProject(values);

      if (response.success) {
        toast.success(response.message);
        dispatch(getSidebarProjectNames());
        navigate(`/project/${response.id}`);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingFormSubmit(false);
    }
  }

  const handleSelectSearch = useCallback(
    async (searchText) => {
      setMultiSelectInputText(searchText);
      try {
        const response = await GetUsers({ ["email"]: searchText });

        if (response.success) {
          const optionsArr = [];

          response.users.forEach((user) => {
            optionsArr.push({
              label: user.email,
              value: user.email,
              storeData: user._id,
            });
          });

          setHandleMultiSelectOptions(optionsArr);
        }
      } catch (err) {
        setHandleMultiSelectOptions([]);
        dispatch(
          updateToaster({
            type: "error",
            message: err.message || "Something Went Wrong",
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <TextInput
              field={field}
              label="Project Name"
              placeholder="Please enter project name"
              id="projectName"
              value={field.value}
            />
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <TextareaInput
              field={field}
              label="Project Description"
              placeholder="Please enter project description"
              id="projectDescription"
              value={field.value}
            />
          )}
        />
        <div className="flex gap-5 items-center">
          <div className="w-full md:w-1/2">
            <FormField
              control={form.control}
              name="projectStartDate"
              render={({ field }) => (
                <DateInput
                  field={field}
                  label="Project Start Date"
                  form={form}
                  placeholder="Please select start date"
                  error={!!form.formState.errors.projectStartDate}
                />
              )}
            />
          </div>
          <div className="w-full md:w-1/2">
            <FormField
              control={form.control}
              name="projectEndDate"
              render={({ field }) => (
                <DateInput
                  field={field}
                  label="Project End Date"
                  form={form}
                  placeholder="Please select end date"
                  error={!!form.formState.errors.projectStartDate}
                />
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="projectMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Users</FormLabel>
              <FormControl>
                <MultiSelect
                  options={handleMultiSelectOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!form.formState.errors.users}
                  searchPlaceHolder="Please search user email id"
                  placeholder="Please select team members"
                  handleSelectSearch={handleSelectSearch}
                  multiSelectInputText={multiSelectInputText}
                  setHandleMultiSelectOptions={setHandleMultiSelectOptions}
                  setMultiSelectInputText={setMultiSelectInputText}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loadingFormSubmit}>
          {!loadingFormSubmit ? "Submit" : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
