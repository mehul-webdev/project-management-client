import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import ProjectManagementImage from "../../assets/project-management.avif";
import { UserLogin } from "@/api/authentication";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const response = await UserLogin(values);

    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full flex">
      <div className="hidden lg:block w-full lg:w-2/3 h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ProjectManagementImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
      <div className="w-full lg:w-1/3 p-4 lg:p-8 flex items-center justify-center flex-col">
        <h2 className="text-3xl mb-1">Welcome Back</h2>
        <p className="text-xs text-gray-400">Please login to your account</p>
        <div className="w-full mt-10 mb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
        <Separator orientation="horizontal" className="w-full" />

        <div className="w-full my-5 flex items-center justify-center">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <FaGoogle className="text-[var(--color-google-icon)]" />{" "}
            <span>Login with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
