import { FC, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { setNewPasswordFormTexts } from '@/components/setNewPasswordForm/texts';
import { appPaths } from '@/configs/appPaths';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { setNewPasswordSchema } from '@/components/setNewPasswordForm/validations';
import { NoOobCode } from '@/components/setNewPasswordForm/components/NoOobCode';
import { PasswordSet } from '@/components/setNewPasswordForm/components/PasswordSet';
import { SetNewPasswordData } from '@/components/setNewPasswordForm/types';

export const SetNewPasswordForm: FC<{
    oobCode?: string;
    setNewPassword: (val: SetNewPasswordData) => Promise<boolean>;
}> = ({ oobCode, setNewPassword }) => {
    const [isReset, setIsReset] = useState(false);

    const form = useForm<z.infer<typeof setNewPasswordSchema>>({
        resolver: zodResolver(setNewPasswordSchema),
        defaultValues: {
            password: '',
            repeatPassword: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof setNewPasswordSchema>) => {
        if (!oobCode) return;
        if (await setNewPassword({ password: values.password, oobCode })) setIsReset(true);
    };

    if (!oobCode) return <NoOobCode />;

    if (isReset) return <PasswordSet />;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">{setNewPasswordFormTexts.title}</CardTitle>
                        <CardDescription>{setNewPasswordFormTexts.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="gap-3 flex flex-col">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{setNewPasswordFormTexts.inputs.password.label}</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder={setNewPasswordFormTexts.inputs.password.placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="repeatPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{setNewPasswordFormTexts.inputs.repeatPassword.label}</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder={setNewPasswordFormTexts.inputs.repeatPassword.placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <div className="grid grid-cols-2 gap-3 grow">
                            <Link href={appPaths.auth.login} className={cn([buttonVariants({ variant: 'secondary' }), 'grow'])}>
                                {setNewPasswordFormTexts.buttons.backToLogin}
                            </Link>
                            <Button type="submit" className="grow" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? setNewPasswordFormTexts.buttons.loading : setNewPasswordFormTexts.buttons.submit}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};
