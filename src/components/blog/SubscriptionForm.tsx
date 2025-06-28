
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Define form schema
const subscriptionSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

const SubscriptionForm: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: SubscriptionFormValues) => {
    // In a real app, you would send this data to your backend
    console.log('Subscription email:', data.email);
    
    // Store in localStorage for demo purposes
    const subscribers = JSON.parse(localStorage.getItem('blog_subscribers') || '[]');
    if (!subscribers.includes(data.email)) {
      subscribers.push(data.email);
      localStorage.setItem('blog_subscribers', JSON.stringify(subscribers));
      
      // Show success toast
      toast({
        title: 'Successfully subscribed',
        description: 'Thank you for subscribing to our blog updates!',
      });
      
      // Reset form
      form.reset();
    } else {
      toast({
        title: 'Already subscribed',
        description: 'This email is already subscribed to our updates.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Subscribe to Blog Updates</h3>
        <p className="text-sm text-gray-600">Get the latest posts delivered straight to your inbox</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex">
                    <Input 
                      placeholder="Your email address" 
                      type="email"
                      className="rounded-r-none focus:ring-blue-500"
                      {...field} 
                    />
                    <Button 
                      type="submit" 
                      className="rounded-l-none"
                    >
                      Subscribe
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      
      <p className="text-xs text-center mt-4 text-gray-500">
        No spam ever. We only send relevant content and updates.
      </p>
    </div>
  );
};

export default SubscriptionForm;
