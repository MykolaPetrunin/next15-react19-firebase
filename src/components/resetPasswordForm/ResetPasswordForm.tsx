import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { resetPasswordSchema } from '@/components/resetPasswordForm/validations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { resetPasswordFormTexts } from '@/components/resetPasswordForm/texts';
import { ResetPasswordData } from '@/components/resetPasswordForm/types';

export const ResetPasswordForm: FC<{
    back: () => void;
    resetPassword: (email: ResetPasswordData) => Promise<boolean>;
}> = ({ back, resetPassword }) => {
    const [isEmailSent, setIsEmailSent] = useState(false);

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
        if (await resetPassword(values)) setIsEmailSent(true);
    };

    if (isEmailSent)
        return (
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">{resetPasswordFormTexts.success.title}</CardTitle>
                    <CardDescription>{resetPasswordFormTexts.success.subTitle}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button type="button" variant="secondary" className="grow" onClick={back}>
                        {resetPasswordFormTexts.buttons.back}
                    </Button>
                </CardFooter>
            </Card>
        );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">{resetPasswordFormTexts.title}</CardTitle>
                        <CardDescription>{resetPasswordFormTexts.subTitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{resetPasswordFormTexts.input.label}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={resetPasswordFormTexts.input.placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <div className="grid grid-cols-2 gap-3 grow">
                            <Button type="button" variant="secondary" className="grow" onClick={back}>
                                {resetPasswordFormTexts.buttons.back}
                            </Button>
                            <Button type="submit" className="grow" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? resetPasswordFormTexts.buttons.loading : resetPasswordFormTexts.buttons.submit}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};
