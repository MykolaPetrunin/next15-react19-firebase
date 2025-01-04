import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {FC} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {signUpSchema} from "@/components/signUpForm/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SignUpData} from "@/components/signUpForm/types";


export const SignUpForm: FC<{ back: () => void; signUp: (val: SignUpData) => Promise<void> }> =
    ({back, signUp}) => {

        const form = useForm<z.infer<typeof signUpSchema>>({
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                email: "",
                password: "",
                repeatPassword: "",
            },
        })

        const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
            await signUp({email: values.email, password: values.password});
        }

        return (
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="repeatPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Repeat password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Repeat password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <Button type="button" variant="secondary" className="grow" onClick={back}>
                                        Back
                                    </Button>
                                    <Button type="submit" className="grow" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting ? "Loading..." : "Sign Up"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        )
    }
