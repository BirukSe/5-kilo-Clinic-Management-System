import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams } from 'react-router-dom';

import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
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
  diagnosis: z.string().min(2, {
    message: 'diagnosis must be at least 2 characters.',
  }),
  illness: z.string().min(2, {
    message: 'illness must be at least 2 characters.',
  }),
});

// AddPatient component
const AddPatient = () => {
  const navigate=useNavigate();
  const {id}=useParams();
  // Initialize the useForm hook with zod resolver for validation
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Define the onSubmit function
  const onSubmit = async (data) => {
    console.log('Form Submitted:', data);
    try{
      const response=await fetch(`https://five-kilo-clinic-management-system-1.onrender.com/doctor/addpatient/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      alert('Appointment Scheduled! You will be contacted soon');
      navigate('/patient');


    }
    catch(error){
      console.log(error);
    }
    
    // You can handle form submission logic here, such as making API requests
  
  };

  return (
    <div>
      <h1 className="font-extrabold text-5xl flex justify-center text-custom-unknown">Appointment Registration</h1>
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
                    Patient email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-bold text-xl">Diagnosis</FormLabel>
                  <FormControl>
                    <Input placeholder="diagnosis" {...field} />
                  </FormControl>
                  <FormDescription>
                  Patients diagnosis
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="illness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-bold text-xl">Illness</FormLabel>
                  <FormControl>
                    <Input placeholder="illbess" {...field} />
                  </FormControl>
                  <FormDescription>
                   Patient illness
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

export default AddPatient;
