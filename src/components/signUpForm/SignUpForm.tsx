import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FC} from "react";

export const SignUpForm: FC<{ back: () => void }> =
    ({back}) => {
        return (
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Sign Up</CardTitle>
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
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input id="password" type="password" required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="repeatPassword">Repeat password</Label>
                                        </div>
                                        <Input id="repeatPassword" type="password" required/>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button type="button" variant="secondary" className="grow" onClick={back}>
                                            Back
                                        </Button>
                                        <Button type="submit" className="grow">
                                            Sign Up
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
