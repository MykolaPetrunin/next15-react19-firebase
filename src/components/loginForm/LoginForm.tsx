import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loginFormSchema } from '@/components/loginForm/validations';
import { SignInData } from '@/components/loginForm/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginFormTexts } from '@/components/loginForm/texts';

export const LoginForm: FC<{
    signUp: () => void;
    resetPassword: () => void;
    signIn: (val: SignInData) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}> = ({ signUp, resetPassword, signIn, signInWithGoogle }) => {
    const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleGoogleSignIn = useCallback(async () => {
        setIsGoogleSignInLoading(true);
        await signInWithGoogle();
        setIsGoogleSignInLoading(false);
    }, [signInWithGoogle]);

    const onSubmit = useCallback(
        async (values: z.infer<typeof loginFormSchema>) => {
            await signIn(values);
        },
        [signIn]
    );

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">{loginFormTexts.title}</CardTitle>
                    <CardDescription>{loginFormTexts.subTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                    disabled={form.formState.isSubmitting || isGoogleSignInLoading}
                                    onClick={handleGoogleSignIn}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    {loginFormTexts.buttons.google}
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">{loginFormTexts.delimiter}</span>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{loginFormTexts.inputs.email.label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={form.formState.isSubmitting || isGoogleSignInLoading}
                                                        placeholder={loginFormTexts.inputs.email.placeholder}
                                                        {...field}
                                                    />
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
                                                <FormLabel className="flex items-center justify-between gap-3">
                                                    {loginFormTexts.inputs.password.label}
                                                    <a
                                                        href="#"
                                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            resetPassword();
                                                        }}
                                                    >
                                                        {loginFormTexts.buttons.forgotPassword}
                                                    </a>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        disabled={form.formState.isSubmitting || isGoogleSignInLoading}
                                                        placeholder={loginFormTexts.inputs.password.placeholder}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isGoogleSignInLoading}>
                                        {form.formState.isSubmitting ? loginFormTexts.buttons.loading : loginFormTexts.buttons.login}
                                    </Button>
                                </form>
                            </Form>
                            <div className="text-center text-sm">
                                {`${loginFormTexts.dontHaveAccount} `}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signUp();
                                    }}
                                    className="underline underline-offset-4"
                                >
                                    {loginFormTexts.buttons.signUp}
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
