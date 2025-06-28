
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Define the form schema
const questionFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  question: z.string().min(10, { message: 'Question must be at least 10 characters' }),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface QuestionFormProps {
  blogId: number;
  onSuccess?: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ blogId, onSuccess }) => {
  const { toast } = useToast();
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      name: '',
      email: '',
      question: '',
    },
  });

  const onSubmit = (data: QuestionFormValues) => {
    // In a real app, you would send this data to your backend
    console.log('Question submitted:', { ...data, blogId });
    
    // Store in localStorage for demo purposes
    const questions = JSON.parse(localStorage.getItem('blog_questions') || '[]');
    questions.push({
      id: Date.now(),
      blogId,
      name: data.name,
      email: data.email,
      question: data.question,
      createdAt: new Date().toISOString(),
      answers: [],
    });
    localStorage.setItem('blog_questions', JSON.stringify(questions));
    
    // Show success toast
    toast({
      title: 'Question submitted',
      description: 'Your question has been submitted and will be answered soon.',
    });
    
    // Reset form
    form.reset();
    
    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Ask a Question</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Question</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What would you like to ask about this topic?" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto">
            Submit Question
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;
