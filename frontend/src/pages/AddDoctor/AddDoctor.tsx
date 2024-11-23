
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import {  FieldValues } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
   username: z.string().min(2, {
    message: 'username must be at least 2 characters.',
  }),
  specialization: z.string().min(2, {
    message: 'specialization must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'illness must be at least 2 characters.',
  }),
});

// AddPatient component
const AddDoctor = () => {
  const navigate=useNavigate();
  
  // Initialize the useForm hook with zod resolver for validation
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Define the onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues)  => {
    console.log('Form Submitted:', data);
    try{
      const response=await fetch(`https://five-kilo-clinic-management-system-1.onrender.com/auth/addDoctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if(response.ok){
        alert('Doctor added successfully');
      navigate('/admin');
        
      }
      


    }
    catch(error){
      console.log(error);
    }
    
    // You can handle form submission logic here, such as making API requests
  
  };

  return (
    <div>
      <h1 className="font-extrabold text-5xl flex justify-center text-black">Add New Doctor</h1>
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-bold text-xl">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Doctors email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-bold text-xl">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                  choose username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-bold text-xl">Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="specialization" {...field} />
                  </FormControl>
                  <FormDescription>
                   What did you specailize in?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-bold text-xl">Password</FormLabel>
                  <FormControl>
                    <Input  type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your password
                  </FormDescription>
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

export default AddDoctor;
