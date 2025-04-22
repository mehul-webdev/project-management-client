import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { camelToTitleCase, getInitials } from "@/lib/utils";
import { handleGetProjectDetails } from "@/store/projects";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Project = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    data: projectDetails,
    error,
  } = useSelector((state) => state.projects.projectDetails);

  useEffect(() => {
    dispatch(handleGetProjectDetails(id));
  }, [id, dispatch]);

  const {
    projectName = "",
    projectDescription = "",
    projectStartDate = "",
    projectEndDate = "",
    projectMembers = [],
    projectStatus = "",
    projectTasks = [],
    createdBy,
  } = projectDetails;

  return (
    <Card>
      {Object.keys(projectDetails).length !== 0 && (
        <>
          <CardHeader>
            <div className="flex items-start justify-between gap-x-2">
              <div className="flex flex-col gap-2">
                <CardTitle className={`text-lg md:text-2xl`}>
                  {projectName}
                </CardTitle>

                <Badge>{camelToTitleCase(projectStatus)}</Badge>
              </div>

              <Link to="/create-project">
                <Button className="cursor-pointer" size={"sm"}>
                  Create Project
                </Button>
              </Link>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col flex-3/6">
                <CardTitle className={` text-lg mb-2 md:text-xl`}>
                  Project Details
                </CardTitle>
                <div className="flex flex-col">
                  <CardDescription
                    style={{ whiteSpace: "pre-line" }}
                    className="flex flex-col"
                  >
                    <span>Created By: {createdBy?.name}</span>
                    <span>
                      Start Date: {format(projectStartDate, "dd MMM yyyy")}
                    </span>
                    <span>
                      End Date: {format(projectEndDate, "dd MMM yyyy")}
                    </span>
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-col flex-1/6 ">
                <CardTitle className={`text-lg mb-2 md:text-xl`}>
                  Team Members
                </CardTitle>
                <div className="flex gap-1">
                  {projectMembers.slice(0, 2).map((member) => {
                    return (
                      <Tooltip key={member._id}>
                        <TooltipTrigger>
                          <Avatar key={member._id}>
                            <AvatarImage
                              src={member?.image}
                              alt="User Avatar"
                            />
                            <AvatarFallback className="text-xs">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>{member.email}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                  {projectMembers.length > 2 && (
                    <Tooltip key="remaining-members">
                      <TooltipTrigger>
                        <Avatar>
                          <AvatarFallback className="text-xs">
                            +{projectMembers.length - 2}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent className="cursor-pointer">
                        View More
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="ml-4 cursor-pointer">
                        Add Members
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <Separator className="my-8" />
            <CardTitle className={`text-lg mb-4 md:text-xl`}>
              Project Overview
            </CardTitle>
            <CardDescription style={{ whiteSpace: "pre-line" }}>
              {projectDescription}
            </CardDescription>

            <Separator className="my-8" />

            <div className="flex justify-between items-center gap-2 mb-6">
              <CardTitle className={`text-lg mb-4 md:text-xl`}>
                Project Tasks
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Create Tasks</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {projectTasks.length === 0 ? (
              <div className="w-full h-52 flex items-center justify-center">
                <p className="text-2xl">No Tasks Available</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectTasks.map((task) => (
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Project;
