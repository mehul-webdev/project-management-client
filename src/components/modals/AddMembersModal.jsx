import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckUserExists } from "@/api/users";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { addProjectMembers, getProjectDetails } from "@/api/projects";
import { handleGetProjectDetails } from "@/store/projects";
import { useDispatch } from "react-redux";

const AddMembersModal = ({ projectMembers, id, isOpen, setOpen }) => {
  const dispatch = useDispatch();
  const [addedMembers, setAddedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    const { email } = values;

    const isExists = projectMembers.find((ele) => ele.email === email);

    if (isExists || addedMembers.includes(email)) {
      form.setError("email", {
        type: "manual",
        message: "Member already exists",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await CheckUserExists(email);

      if (!response.isExists) {
        form.setError("email", {
          type: "manual",
          message: response.message,
        });
        return;
      }

      setAddedMembers((prev) => [
        ...prev,
        {
          email,
          id: response.id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.log("error while check users exists", err);
    } finally {
      setLoading(false);
    }
  };

  const saveMembers = async () => {
    const idsData = [];

    addedMembers.forEach((member) => idsData.push(member.id));

    try {
      setLoading(true);
      const response = await addProjectMembers({
        id,
        data: idsData,
      });

      if (response.success) {
        toast.success(response.message);
        dispatch(handleGetProjectDetails(id));
        setOpen(false);
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Error while saving project members");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  console.log(isOpen);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full max-w-sm items-start space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Valid Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!form.formState.isValid}>
              Add Member
            </Button>
          </div>
        </form>
      </Form>

      <div className="min-h-16">
        {addedMembers.length === 0 && (
          <div className="flex items-center justify-center h-16">
            <p>No Member Added</p>
          </div>
        )}
        {addedMembers.length !== 0 && (
          <ul className="space-y-2">
            {addedMembers.map((member, index) => (
              <li
                key={index}
                className="p-2 bg-foreground text-background shadow-md rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="flex gap-4 items-center">
                    <Mail size={18} />{" "}
                    <span className="text-sm">{member.email}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Separator />
      <DialogFooter>
        <Button type="button" onClick={saveMembers}>
          {loading ? "Loading..." : "Save"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default AddMembersModal;
