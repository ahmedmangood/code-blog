"use client";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const handleFormSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: formData.get("pitch") as string,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);
      const result = await createPitch(prevState, formData, pitch);
      console.log(result);
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        router.push(`/startup/${result.id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your fields and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation faild", status: "Error" };
      }
    }
    toast({
      title: "Error",
      description: "An unexpected error has occurred",
      variant: "destructive",
    });
    return {
      ...prevState,
      error: "An unexpected error has occurred",
      status: "ERROR",
    };
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form className="startup-form" action={formAction}>
      {/* Title */}
      <div>
        <label className="startup-form_label" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      {/* Description */}
      <div>
        <label className="startup-form_label" htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      {/* Category */}
      <div>
        <label className="startup-form_label" htmlFor="category">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education ...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      {/* Image URL */}
      <div>
        <label className="startup-form_label" htmlFor="link">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      {/* Pitch Editor */}
      <div data-color-mode="light">
        <label className="startup-form_label" htmlFor="pitch">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
