import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FC} from "react";

export const ResetPasswordForm: FC<{ back: () => void }> =
    ({back}) => {
        return (
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Reset Password</CardTitle>
                        <CardDescription>
                            Please enter your email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button type="button" variant="secondary" className="grow" onClick={back}>
                                            Back to Login
                                        </Button>
                                        <Button type="submit" className="grow">
                                            Send Reset Link
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
