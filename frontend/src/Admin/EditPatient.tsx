import { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams } from 'react-router-dom';

import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  diagnosis: z.string().min(2, {
    message: 'username must be at least 2 characters.',
  }),
  illness: z.string().min(2, {
    message: 'specialization must be at least 2 characters.',
  }),
});

// EditDoctor component
const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize the useForm hook with zod resolver for validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      diagnosis: '',
      
      illness: '',
    },
  });

  // Fetch the doctor details when the component mounts
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`https://five-kilo-clinic-management-system-1.onrender.com/patient/${id}`);
        const data = await response.json();
        console.log(data);

        // Set the default values in React Hook Form using setValue
        form.reset({
          name: data.name,
          email: data.email,
          diagnosis: data.diagnosis,
          illness: data.illness
        });
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    };

    fetchDoctor();
  }, [id, form]);

  // Define the onSubmit function
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form Submitted:', data);
    try {
      const response = await fetch(`https://five-kilo-clinic-management-system-1.onrender.com/patient/editPatient/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if(response.ok){
        alert('Doctor updated successfully');
        navigate('/admin');

      }
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="font-extrabold text-5xl flex justify-center text-black">Edit Patient Page</h1>
      <div>
        {/* Form component with react-hook-form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xl">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xl">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>Doctor's email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xl">Diagnosis</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>What did you diagnose?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="illness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xl">Illness</FormLabel>
                  <FormControl>
                    <Input placeholder="specialization" {...field} />
                  </FormControl>
                  <FormDescription>What is your illness?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditPatient;
